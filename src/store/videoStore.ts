import { ChangeEvent, RefObject } from "react";
import { create } from "zustand";
import { convertSecondsInMinutes } from "utils/timeConvert";

export interface VideoState {
  isPlaying: boolean;
  progress: number;
  speed: number;
  volume: number;
  duration: string;
  fullscreen: boolean;
  currentTime: string;
}

interface IVideoStore {
  playerState: VideoState;
  videoEl: RefObject<HTMLVideoElement> | null;
  storeElement: (el: RefObject<HTMLVideoElement>) => void;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (event: ChangeEvent<HTMLInputElement>) => void;
  handleVideoSpeed: (speed: number) => void;
  handleAudioVolume: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
}

const initialState = {
  playerState: {
    isPlaying: false,
    progress: 0,
    speed: 1,
    volume: 1,
    duration: "00:00",
    fullscreen: false,
    currentTime: "00:00",
  },
  videoEl: null,
};

export const useVideoStore = create<IVideoStore>((set) => ({
  ...initialState,
  storeElement: (el: RefObject<HTMLVideoElement>) =>
    set((state) => ({
      ...state,
      videoEl: el,
      playerState: {
        ...state.playerState,
        duration: convertSecondsInMinutes(el.current?.duration || 0),
      },
    })),

  togglePlay: () =>
    set((state) => {
      state.playerState.isPlaying
        ? state.videoEl?.current?.pause()
        : state.videoEl?.current?.play();
      return {
        ...state,
        playerState: {
          ...state.playerState,
          isPlaying: !state.playerState.isPlaying,
          duration: convertSecondsInMinutes(
            state.videoEl?.current?.duration || 0
          ),
        },
      };
    }),

  handleOnTimeUpdate: () =>
    set((state) => {
      const progress =
        ((state.videoEl?.current?.currentTime || 0) /
          (state.videoEl?.current?.duration || 0)) *
        100;

      if (progress === 100) {
        state.videoEl?.current?.pause();
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          progress,
          currentTime: convertSecondsInMinutes(
            state.videoEl?.current?.currentTime || 0
          ),
          isPlaying: progress === 100 ? false : state.playerState.isPlaying,
        },
      };
    }),

  handleVideoProgress: (event: ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const manualChange = Number(event.target.value);
      if (state.videoEl?.current?.currentTime) {
        state.videoEl.current.currentTime =
          (state.videoEl?.current.duration / 100) * manualChange;
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          progress: manualChange,
          currentTime: convertSecondsInMinutes(
            state.videoEl?.current?.currentTime || 0
          ),
        },
      };
    }),

  handleVideoSpeed: (speed: number) =>
    set((state) => {
      if (state.videoEl?.current?.playbackRate) {
        state.videoEl.current.playbackRate = speed;
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          speed,
        },
      };
    }),

  handleAudioVolume: (event: ChangeEvent<HTMLInputElement>) =>
    set((state) => {
      const manualChange = Number(event.target.value);
      if (
        state.videoEl?.current?.volume ||
        state.videoEl?.current?.volume === 0
      ) {
        state.videoEl.current.volume = manualChange;
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          volume: manualChange,
        },
      };
    }),

  toggleMute: () =>
    set((state) => {
      if (
        state.videoEl?.current?.volume ||
        state.videoEl?.current?.volume === 0
      ) {
        state.videoEl.current.volume = state.playerState.volume ? 0 : 1;
        state.videoEl.current.muted = state.playerState.volume ? true : false;
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          volume: state.playerState.volume ? 0 : 1,
        },
      };
    }),

  toggleFullscreen: () =>
    set((state) => {
      if (state.videoEl?.current?.requestFullscreen) {
        state.videoEl?.current?.requestFullscreen();
      }
      return {
        ...state,
        playerState: {
          ...state.playerState,
          fullscreen: !state.playerState.fullscreen,
        },
      };
    }),
}));
