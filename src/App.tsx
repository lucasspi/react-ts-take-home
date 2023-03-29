import { useRef } from "react";
import { Box, Button, Container, Image } from "@chakra-ui/react";

import useVideoPlayer from "./hooks/useVideoPlayer";
import { VELOCITY_OPTIONS } from "./contants/velocityOptions";
import playSvg from "./assets/icons/play-icon.svg";
import pauseSvg from "./assets/icons/pause-icon.svg";

import expandSvg from "./assets/icons/expand-icon.svg";
import { Dropdown } from "./components/Dropdown";
import { VolumeBlock } from "./components/VolumeBlock";

const videoURL =
  "https://ours-wellness-testing-public.s3.us-west-2.amazonaws.com/video-1080+(1).mp4";

export default function App() {
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
    <Box height="100vh" width="100%" bg="#F0EAE5">
      <Container display="flex" flexDir="column" alignItems="center" p={[2, 8]}>
        <Box maxW="720px">
          <Box
            id="video-wrapper"
            display="flex"
            position="relative"
            width="100%"
            justifyContent="center"
            overflow="hidden"
          >
            <video
              id="videoId"
              autoPlay
              playsInline
              preload="auto"
              tabIndex={-1}
              ref={videoElement}
              onTimeUpdate={handleOnTimeUpdate}
              onClick={togglePlay}
            >
              <source src={videoURL} type="video/mp4" />
            </video>
            <div className="overlay" />
            <div className="controls">
              <input
                type="range"
                className="progress-range"
                min="0"
                max="100"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
              />
              <div className="controls-actions">
                <Box display="flex" alignItems="center" gap="16px">
                  <Button onClick={togglePlay}>
                    {!playerState.isPlaying ? (
                      <Image src={playSvg} alt="play icon" />
                    ) : (
                      <Image src={pauseSvg} alt="pause icon" />
                    )}
                  </Button>
                  <VolumeBlock
                    volume={playerState.volume}
                    handleAudioVolume={handleAudioVolume}
                    onClick={toggleMute}
                  />

                  <Box ml={12} color="white">
                    {playerState.currentTime} / {playerState.duration}
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Dropdown
                    title="Playback Speed"
                    value={playerState.speed}
                    onChange={(e) => handleVideoSpeed(e)}
                    options={VELOCITY_OPTIONS}
                  />
                  <Box display="flex" alignItems="center" ml={4}>
                    <Button onClick={toggleFullscreen}>
                      <Image src={expandSvg} alt="expand video icon" />
                    </Button>
                  </Box>
                </Box>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
