import { useEffect, useRef } from "react";
import { useVideoStore } from "store/videoStore";
import { VideoContainer } from "components/molecules/VideoContainer";

interface VideoBlockProps {
  isLoading: boolean;
  setLoading: (e: boolean) => void;
}

export const VideoBlock = ({ isLoading, setLoading }: VideoBlockProps) => {
  const videoElement = useRef<HTMLVideoElement>(null);

  const playerState = useVideoStore((state) => state.playerState);
  const storeElement = useVideoStore((state) => state.storeElement);
  const togglePlay = useVideoStore((state) => state.togglePlay);
  const handleOnTimeUpdate = useVideoStore((state) => state.handleOnTimeUpdate);
  const handleVideoProgress = useVideoStore(
    (state) => state.handleVideoProgress
  );
  const handleVideoSpeed = useVideoStore((state) => state.handleVideoSpeed);
  const handleAudioVolume = useVideoStore((state) => state.handleAudioVolume);
  const toggleMute = useVideoStore((state) => state.toggleMute);
  const toggleFullscreen = useVideoStore((state) => state.toggleFullscreen);

  useEffect(() => {
    if (videoElement.current) {
      storeElement(videoElement);
    }
  }, [videoElement, storeElement]);

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
