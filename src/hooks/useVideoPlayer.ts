import { useState, useEffect, ChangeEvent, RefObject } from "react";
import { convertSecondsInMinutes } from "utils/timeConvert";

const useVideoPlayer = (videoElement: RefObject<HTMLVideoElement>) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    volume: 1,
    duration: "00:00",
    fullscreen: false,
    currentTime: "00:00",
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement?.current?.play()
      : videoElement.current?.pause();

    if (videoElement.current?.duration) {
      setPlayerState({
        ...playerState,
        duration: convertSecondsInMinutes(videoElement.current.duration),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress =
      ((videoElement?.current?.currentTime || 0) /
        (videoElement.current?.duration || 0)) *
      100;

    if (progress === 100) {
      videoElement.current?.pause();
    }

    setPlayerState({
      ...playerState,
      progress,
      currentTime: convertSecondsInMinutes(
        videoElement.current?.currentTime || 0
      ),
      isPlaying: progress === 100 ? false : playerState.isPlaying,
    });
  };

  const handleVideoProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    if (videoElement.current?.currentTime) {
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
    }
    setPlayerState({
      ...playerState,
      progress: manualChange,
      currentTime: convertSecondsInMinutes(
        videoElement.current?.currentTime || 0
      ),
    });
  };

  const handleVideoSpeed = (speed: number) => {
    if (videoElement.current?.playbackRate) {
      videoElement.current.playbackRate = speed;
    }
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const handleAudioVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    if (videoElement?.current?.volume || videoElement?.current?.volume === 0) {
      videoElement.current.volume = manualChange;
    }

    setPlayerState({
      ...playerState,
      volume: manualChange,
    });
  };

  const toggleMute = () => {
    if (videoElement?.current?.volume || videoElement?.current?.volume === 0) {
      videoElement.current.volume = playerState.volume ? 0 : 1;
    }
    setPlayerState({
      ...playerState,
      volume: playerState.volume ? 0 : 1,
    });
  };

  const toggleFullscreen = () => {
    if (videoElement.current?.requestFullscreen) {
      videoElement.current?.requestFullscreen();
    }

    setPlayerState({
      ...playerState,
      fullscreen: !playerState.fullscreen,
    });
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleAudioVolume,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  };
};

export default useVideoPlayer;
