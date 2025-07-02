import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { matchDate, scores, logId } = await req.json();

  if (!matchDate || !Array.isArray(scores) || !logId) {
    return NextResponse.json(
      { error: "Invalid input - matchDate, scores, and logId are required" },
      { status: 400 }
    );
  }

  const today = new Date(matchDate);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const { data: prevScores, error: prevError } = await supabase
    .from("daily_scores")
    .select("name, total_kills, total_deaths, total_map_score")
    .eq("match_date", yesterdayStr);

  if (prevError) {
    console.error(prevError);
    return NextResponse.json({ error: prevError.message }, { status: 500 });
  }

  const prevMap = new Map(
    prevScores?.map(p => [
      p.name,
      {
        total_kills: p.total_kills,
        total_deaths: p.total_deaths,
        total_map_score: p.total_map_score,
      },
    ]) ?? []
  );

  const finalScores = scores.map((s: any) => {
    const prevData = prevMap.get(s.name) || {
      total_kills: 0,
      total_deaths: 0,
      total_map_score: 0,
    };
    return {
      name: s.name,
      match_date: matchDate,
      kills: s.kills || 0,
      total_kills: prevData.total_kills + (s.kills || 0),
      deaths: s.deaths || 0,
      total_deaths: prevData.total_deaths + (s.deaths || 0),
      score: s.score,
      total_map_score: prevData.total_map_score + s.score,
      log_id: logId,
    };
  });

  const { error: upsertError, data: upsertData } = await supabase
    .from("daily_scores")
    .upsert(finalScores, { onConflict: "name,match_date,log_id" });

  if (upsertError) {
    console.error(upsertError);
    return NextResponse.json({ error: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: upsertData });
}
