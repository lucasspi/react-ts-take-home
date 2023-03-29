import { useRef, useState } from "react";
import { Box, Button, Image } from "@chakra-ui/react";
import useVideoPlayer from "hooks/useVideoPlayer";
import { VELOCITY_OPTIONS } from "constants/velocityOptions";

import { Dropdown } from "components/molecules/Dropdown";
import { ScreenControllers } from "components/molecules/ScreenControllers";
import { VolumeBlock } from "components/molecules/VolumeBlock";
import { SliderInput } from "components/atoms/SliderInput";
import { VideoOverlay } from "components/atoms/VideoOverlay";

import playSvg from "assets/icons/play-icon.svg";
import pauseSvg from "assets/icons/pause-icon.svg";
import expandSvg from "assets/icons/expand-icon.svg";
import { VideoSource } from "components/atoms/VideoSource";

interface VideoBlockProps {
  isLoading: boolean;
  setLoading: (e: boolean) => void;
}

const VIDEO_URL =
  "https://ours-wellness-testing-public.s3.us-west-2.amazonaws.com/video-1080+(1).mp4";

export const VideoBlock = ({ isLoading, setLoading }: VideoBlockProps) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [mouseHover, setMouseHover] = useState(false);
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
    <Box
      visibility={isLoading ? "hidden" : "visible"}
      id="video-wrapper"
      display="flex"
      position="relative"
      width="100%"
      justifyContent="center"
      overflow={["visible", "hidden"]}
      onMouseLeave={() => setMouseHover(false)}
      onMouseEnter={() => setMouseHover(true)}
    >
      <VideoSource
        id="videoId"
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        onClick={togglePlay}
        onLoadedData={() => setLoading(false)}
        url={VIDEO_URL}
      />

      <ScreenControllers
        onClick={togglePlay}
        mouseHover={mouseHover}
        progress={playerState.progress}
        isPlaying={playerState.isPlaying}
      />

      {/* Background Overlay */}
      <VideoOverlay
        onClick={togglePlay}
        visible={
          mouseHover ||
          playerState.progress === 100 ||
          (!playerState.progress && !playerState.isPlaying)
        }
      />
      <Box
        position="absolute"
        bottom="16px"
        width={["100%", "96%"]}
        height="48px"
        background="#00000080"
        backdropFilter="blur(4px)"
        borderBottomRadius="16px"
        zIndex={2}
        transform={[
          "translateY(150%)",
          mouseHover ? "translateY(0%)" : "translateY(165%)",
        ]}
        transition="all 0.4s ease-in-out;"
      >
        <SliderInput
          sx={{
            position: "absolute",
            top: "-6px",
            border: "none",
            height: "6px",
            width: "100%",
            background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${playerState.progress}%, #ffffff30 ${playerState.progress}%, #ffffff30 100%)`,
          }}
          min={0}
          max={100}
          value={playerState.progress}
          onChange={(e) => handleVideoProgress(e)}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={1}
        >
          <Box display="flex" alignItems="center" gap={["0px", "16px"]}>
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

            <Box ml={[2, 12]} color="white" display="flex">
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
        </Box>
      </Box>
    </Box>
  );
};
