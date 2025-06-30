import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST: Save full game log
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { map, matchDate, stabs, chats, mapUrl } = body;

  // Create/update game_log entry with embedded chats JSONB (one record per day)
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

  // Delete existing stabs for this log and insert new ones
  if (stabs && stabs.length > 0) {
    // First delete existing stabs for this log
    const { error: deleteError } = await supabase
      .from("stabs")
      .delete()
      .eq("log_id", logId);

    if (deleteError) {
      console.error(deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Then insert new stabs
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

// GET: Fetch game log with stabs + chats
export async function GET(req: NextRequest) {
  const matchDate = req.nextUrl.searchParams.get("matchDate");

  if (!matchDate) {
    return NextResponse.json({ error: "Missing matchDate" }, { status: 400 });
  }

  // Get the log
  const { data: logs, error: logError } = await supabase
    .from("game_logs")
    .select("*")
    .eq("match_date", matchDate)
    .limit(1);

  if (logError || !logs?.[0]) {
    return NextResponse.json({ error: "Log not found" }, { status: 404 });
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
    log: logs[0],
    stabs,
    chats: logs[0].chats ?? [],
  });
}
