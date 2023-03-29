import { Box, Button, Image } from "@chakra-ui/react";
import { ChangeEvent, useMemo } from "react";

import highVolumeSvg from "assets/icons/high-volume-icon.svg";
import medVolumeSvg from "assets/icons/med-volume-icon.svg";
import muteVolumeSvg from "assets/icons/mute-volume-icon.svg";

interface VolumeBlockProps {
  volume: number;
  handleAudioVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const VolumeBlock = ({
  volume,
  handleAudioVolume,
  onClick,
}: VolumeBlockProps) => {
  const volumeIcon = useMemo(() => {
    if (!volume) {
      return <Image src={muteVolumeSvg} alt="mute volume icon" />;
    }
    if (volume < 0.5) {
      return <Image src={medVolumeSvg} alt="medium volume icon" />;
    }

    return <Image src={highVolumeSvg} alt="high volume icon" />;
  }, [volume]);

  return (
    <Box display="flex" alignItems="center">
      <Button onClick={onClick}>{volumeIcon}</Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => handleAudioVolume(e)}
      />
    </Box>
  );
};
