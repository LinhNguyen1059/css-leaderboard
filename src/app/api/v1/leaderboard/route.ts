import { NextResponse, NextRequest } from "next/server";
import { subDays, formatDate } from "date-fns";

import { supabase } from "@/lib/supabase";
import { RANK_TREND } from "@/constants/Game";

export async function GET(req: NextRequest) {
  const matchDate = req.nextUrl.searchParams.get("matchDate");
  const currentDate = new Date(matchDate || new Date());
  const prevDate = subDays(currentDate, 1);
  const prevMatchDate = formatDate(prevDate, "yyyy-MM-dd");

  const [{ data: cur, error: curErr }, { data: prev, error: prevErr }] =
    await Promise.all([
      supabase.from("daily_scores").select("*").eq("match_date", matchDate),
      supabase.from("daily_scores").select("*").eq("match_date", prevMatchDate),
    ]);

  if (curErr || prevErr) {
    console.error(curErr || prevErr);
    return NextResponse.json(
      { error: (curErr || prevErr)?.message },
      { status: 500 }
    );
  }

  const agg = (rows: any[]) =>
    Object.values(
      rows.reduce((acc: Record<string, any>, r: any) => {
        acc[r.name] ??= {
          name: r.name,
          kills: 0,
          deaths: 0,
          score: 0,
          total_kills: 0,
          total_deaths: 0,
          total_map_score: 0,
        };
        acc[r.name].kills += r.kills;
        acc[r.name].total_kills += r.total_kills;
        acc[r.name].deaths += r.deaths;
        acc[r.name].total_deaths += r.total_deaths;
        acc[r.name].score += r.score;
        acc[r.name].total_map_score = r.total_map_score;
        return acc;
      }, {})
    );

  const curAgg = agg(cur!);
  const prevAgg = agg(prev!);

  curAgg.sort((a, b) => a.total_map_score - b.total_map_score);
  prevAgg.sort((a, b) => a.total_map_score - b.total_map_score);

  const prevRank = new Map(prevAgg.map((p, i) => [p.name, i + 1]));

  const result = curAgg.map((p, i) => {
    const rank = i + 1;
    const pr = prevRank.get(p.name);
    const trend =
      pr == null
        ? RANK_TREND.SAME
        : rank < pr
          ? RANK_TREND.UP
          : rank > pr
            ? RANK_TREND.DOWN
            : RANK_TREND.SAME;
    return {
      name: p.name,
      kills: p.kills,
      totalKills: p.total_kills,
      deaths: p.deaths,
      totalDeaths: p.total_deaths,
      score: p.score,
      rank,
      trend,
      totalMapScore: p.total_map_score,
    };
  });

  return NextResponse.json({ data: result });
}
