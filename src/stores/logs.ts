import { create } from "zustand";
import { LIST_VIEW, LOG_STEP } from "@/constants/Game";
import { ChatCount, GameError, LogsInfo } from "@/types/game";

interface LogsStoreState {
  listView: LIST_VIEW;
  logStep: LOG_STEP;
  logsTmp?: LogsInfo;
  logs?: LogsInfo;
  stab: string;
  chatSelected?: ChatCount;
  openChatPopup: boolean;
  error: GameError;
  date: Date;
}

interface LogsStoreActions {
  setProps: (props: Partial<LogsStoreState>) => void;
  setLogsInfoProps: (props: Partial<LogsInfo>) => void;
  setLogsTmpInfoProps: (props: Partial<LogsInfo>) => void;
  setErrorProps: (props: Partial<GameError>) => void;
}

type LogsStore = LogsStoreState & LogsStoreActions;

const initialState: LogsStoreState = {
  listView: LIST_VIEW.STAB,
  logStep: LOG_STEP.IMPORT,
  logs: undefined,
  stab: "",
  chatSelected: undefined,
  openChatPopup: false,
  error: {
    map: "",
    stab: "",
  },
  date: new Date(),
};

const useLogsStore = create<LogsStore>()(set => ({
  ...initialState,
  setProps: props => set(state => ({ ...state, ...props })),
  clearProps: () => set(initialState),
  setLogsInfoProps: props =>
    set(state => ({
      logs: {
        ...state.logs,
        ...props,
      },
    })),
  setLogsTmpInfoProps: props =>
    set(state => ({
      logsTmp: {
        ...state.logsTmp,
        ...props,
      },
    })),
  setErrorProps: props =>
    set(state => ({
      error: {
        ...state.error,
        ...props,
      },
    })),
}));

export default useLogsStore;
