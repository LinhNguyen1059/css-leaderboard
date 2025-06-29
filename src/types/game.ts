export interface Stab {
  killer: string;
  victim: string;
  time: string;
}

export interface Chat {
  player: string;
  message: string;
  time: string;
}

export interface LogsInfo {
  map?: string;
  mapUrl?: string;
  matchDate?: string;
  stabs?: Stab[];
  chats?: Chat[];
}

export interface ChatCount {
  player: string;
  count: number;
  data: Chat[];
  rank: number;
}

export interface GameError {
  map: string;
  stab: string;
}
