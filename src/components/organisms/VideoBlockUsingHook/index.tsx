import { useRef } from "react";
import useVideoPlayer from "hooks/useVideoPlayer";
import { VideoContainer } from "components/molecules/VideoContainer";

interface VideoBlockProps {
  isLoading: boolean;
  setLoading: (e: boolean) => void;
}

export const VideoBlock = ({ isLoading, setLoading }: VideoBlockProps) => {
  const videoElement = useRef<HTMLVideoElement>(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleAudioVolume,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  } = useVideoPlayer(videoElement);

  return (
    <VideoContainer
      isLoading={isLoading}
      setLoading={setLoading}
      forwardedRef={videoElement}
      playerState={playerState}
      togglePlay={togglePlay}
      handleOnTimeUpdate={handleOnTimeUpdate}
      handleVideoProgress={handleVideoProgress}
      handleVideoSpeed={handleVideoSpeed}
      handleAudioVolume={handleAudioVolume}
      toggleMute={toggleMute}
      toggleFullscreen={toggleFullscreen}
    />
  );
};
