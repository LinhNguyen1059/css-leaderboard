import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { map, matchDate, stabs, chats, mapUrl } = body;

  const { data: log, error: logError } = await supabase
    .from("game_logs")
    .upsert([{ map, map_url: mapUrl, match_date: matchDate, chats }], {
      onConflict: "match_date",
      ignoreDuplicates: false,
    })
    .select()
    .single();

  if (logError || !log) {
    console.error(logError);
    return NextResponse.json({ error: logError?.message }, { status: 500 });
  }

  const logId = log.id;

  if (stabs && stabs.length > 0) {
    const { error: deleteError } = await supabase
      .from("stabs")
      .delete()
      .eq("log_id", logId);

    if (deleteError) {
      console.error(deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    const { error: stabError } = await supabase
      .from("stabs")
      .insert(stabs.map((s: any) => ({ ...s, log_id: logId })));

    if (stabError) {
      console.error(stabError);
      return NextResponse.json({ error: stabError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, log_id: logId });
}

export async function GET(req: NextRequest) {
  const matchDate = req.nextUrl.searchParams.get("matchDate");

  if (!matchDate) {
    return NextResponse.json({ error: "Missing matchDate" }, { status: 400 });
  }

  const { data: logs, error: logError } = await supabase
    .from("game_logs")
    .select("*")
    .eq("match_date", matchDate)
    .limit(1);

  if (logError) {
    return NextResponse.json({ error: "Log not found" }, { status: 404 });
  }

  if (!logs || logs.length === 0) {
    return NextResponse.json({ logs: null, stabs: null }, { status: 200 });
  }

  const logId = logs[0].id;

  const { data: stabs, error: stabError } = await supabase
    .from("stabs")
    .select("*")
    .eq("log_id", logId)
    .order("time");

  if (stabError) {
    return NextResponse.json({ error: stabError.message }, { status: 500 });
  }

  return NextResponse.json({
    logs: logs[0],
    stabs,
  });
}
