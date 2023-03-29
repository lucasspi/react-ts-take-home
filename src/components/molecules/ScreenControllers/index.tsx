import { Image } from "@chakra-ui/react";

import { VideoActionIcon } from "components/atoms/VideoActionIcon";
import playVideoSvg from "assets/images/play.svg";
import pauseVideoSvg from "assets/images/pause.svg";
import watchAgainSvg from "assets/images/watch-again.svg";
import { useMemo } from "react";

interface ScreenControllersProps {
  onClick: () => void;
  isPlaying: boolean;
  progress: number;
  mouseHover: boolean;
}

export const ScreenControllers = ({
  onClick,
  isPlaying,
  progress,
  mouseHover,
}: ScreenControllersProps) => {
  const showPlayIcon = useMemo(
    () =>
      (mouseHover && !isPlaying && progress !== 100) ||
      (!progress && !isPlaying),
    [mouseHover, isPlaying, progress]
  );
  const showPauseIcon = useMemo(
    () => mouseHover && !!progress && isPlaying,
    [mouseHover, isPlaying, progress]
  );

  return (
    <>
      {/* Big Play button */}
      <VideoActionIcon onClick={onClick} visible={showPlayIcon}>
        <Image src={playVideoSvg} alt="Play video" />
      </VideoActionIcon>

      {/* Big Pause button */}
      <VideoActionIcon onClick={onClick} visible={showPauseIcon}>
        <Image src={pauseVideoSvg} alt="Pause video" />
      </VideoActionIcon>

      {/* Watch again button */}
      <VideoActionIcon onClick={onClick} visible={progress === 100}>
        <Image src={watchAgainSvg} alt="Watch again" />
      </VideoActionIcon>
    </>
  );
};
