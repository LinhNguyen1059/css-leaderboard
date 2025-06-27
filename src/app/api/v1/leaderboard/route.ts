import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  addDays,
  subDays,
} from "date-fns";

function getRange(mode: string, date: Date) {
  if (mode === "day") {
    const start = startOfDay(date);
    return {
      start,
      end: addDays(start, 1),
      prevStart: subDays(start, 1),
      prevEnd: start,
    };
  }
  if (mode === "week") {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return {
      start,
      end: addDays(start, 7),
      prevStart: subDays(start, 7),
      prevEnd: start,
    };
  }
  const start = startOfMonth(date);
  return {
    start,
    end: addDays(start, 31),
    prevStart: subDays(start, 31),
    prevEnd: start,
  };
}

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") ?? "week";
  const date = new Date(req.nextUrl.searchParams.get("date") ?? Date.now());
  const { start, end, prevStart, prevEnd } = getRange(mode, date);

  const [{ data: cur }, { data: prev }, curErr, prevErr] = await Promise.all([
    supabase
      .from("daily_scores")
      .select("name, score")
      .gte("match_date", start.toISOString().slice(0, 10))
      .lt("match_date", end.toISOString().slice(0, 10)),
    supabase
      .from("daily_scores")
      .select("name, score")
      .gte("match_date", prevStart.toISOString().slice(0, 10))
      .lt("match_date", prevEnd.toISOString().slice(0, 10)),
    Promise.resolve(null),
    Promise.resolve(null),
  ]);

  if (curErr || prevErr) {
    console.error(curErr || prevErr);
    return NextResponse.json(
      { error: (curErr || prevErr)?.message },
      { status: 500 }
    );
  }

  // Aggregate scores
  const agg = (rows: any[]) =>
    Object.values(
      rows.reduce((acc: Record<string, any>, r: any) => {
        acc[r.name] ??= { name: r.name, score: 0 };
        acc[r.name].score += r.score;
        return acc;
      }, {})
    );

  const curAgg = agg(cur!);
  const prevAgg = agg(prev!);

  curAgg.sort((a, b) => a.score - b.score);
  prevAgg.sort((a, b) => a.score - b.score);

  const prevRank = new Map(prevAgg.map((p, i) => [p.name, i + 1]));

  const result = curAgg.map((p, i) => {
    const rank = i + 1;
    const pr = prevRank.get(p.name);
    const trend =
      pr == null ? "new" : rank < pr ? "up" : rank > pr ? "down" : "same";
    return { name: p.name, score: p.score, rank, trend };
  });

  return NextResponse.json({ data: result });
}
