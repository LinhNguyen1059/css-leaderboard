import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { matchDate, scores } = await req.json();

  const { data, error } = await supabase
    .from("daily_scores")
    .upsert(
      scores.map((s: { name: string; score: number }) => ({
        name: s.name,
        score: s.score,
        match_date: matchDate,
      })),
      { onConflict: "name,match_date" }
    )
    .select();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}
