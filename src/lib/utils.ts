import { Chat, ChatCount, LogsInfo } from "@/types/game";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseFileContent(content: string) {
  if (!content) {
    throw new Error("Content is empty");
  }

  const lines = content.split("\n");
  const stabs: { killer: string; victim: string; time: string }[] = [];
  const chats: { player: string; message: string; time: string }[] = [];

  let matchDate = "";

  for (const line of lines) {
    const timeMatch = line.match(
      /^L (\d{2})\/(\d{2})\/(\d{4}) - (\d{2}:\d{2}:\d{2}):/
    );
    if (!timeMatch) continue;

    const [, month, day, year, time] = timeMatch;
    matchDate = `${year}-${month}-${day}`;

    // Find stabs
    const killMatch = line.match(
      /"(.+?)<\d+><[^>]+><[^>]*>" killed "(.+?)<\d+><[^>]+><[^>]*>" with "knife"/
    );
    if (killMatch) {
      const [, killer, victim] = killMatch;
      stabs.push({ killer, victim, time });
      continue;
    }

    // Find say or say_team
    const chatMatch = line.match(
      /"(.+?)<\d+><[^>]+><[^>]*>" say(_team)? "(.+?)"/
    );
    if (chatMatch) {
      const [, player, , message] = chatMatch;
      chats.push({ player, message, time });
      continue;
    }
  }

  return { matchDate, stabs, chats };
}

export function countOccurrences(data: any[], key: "killer" | "victim") {
  if (!Array.isArray(data) || data.length === 0) {
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data) {
    const name = row[key];
    counts[name] = (counts[name] || 0) + 1;
  }
  return counts;
}

export function formatStabCounts(counts: Record<string, number>) {
  return Object.entries(counts)
    .map(([name, count]) => `${name} x${count}`)
    .join(", ");
}

export function groupChatsByPlayer(chats: Chat[]): ChatCount[] {
  const grouped: Record<string, { count: number; data: Chat[] }> = {};

  for (const chat of chats) {
    const { player } = chat;
    if (!grouped[player]) grouped[player] = { count: 0, data: [] };
    grouped[player].count++;
    grouped[player].data.push(chat);
  }

  const result = Object.entries(grouped)
    .map(([player, { count, data }]) => ({ player, count, data, rank: 0 }))
    .sort((a, b) => b.count - a.count);

  result.forEach((item, index) => {
    item.rank = index + 1;
    item.data.sort((a, b) => a.time.localeCompare(b.time));
  });

  return result;
}

export function parseGameLogToScores(log: LogsInfo) {
  if (!log || !log.stabs || log.stabs.length === 0) {
    return {
      matchDate: log?.matchDate || "",
      scores: [],
    };
  }

  const killMap: Record<string, number> = {};
  const deathMap: Record<string, number> = {};

  for (const stab of log.stabs) {
    killMap[stab.killer] = (killMap[stab.killer] || 0) + 1;
    deathMap[stab.victim] = (deathMap[stab.victim] || 0) + 1;
  }

  // Get all unique players
  const allPlayers = new Set([
    ...Object.keys(killMap),
    ...Object.keys(deathMap),
  ]);

  const scores = Array.from(allPlayers).map(name => {
    const kills = killMap[name] || 0;
    const deaths = deathMap[name] || 0;
    const score = kills - deaths;

    return { name, kills, deaths, score };
  });

  return {
    matchDate: log.matchDate,
    scores,
  };
}
