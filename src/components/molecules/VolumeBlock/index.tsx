import { Box, Button, Image } from "@chakra-ui/react";
import { ChangeEvent, useMemo } from "react";

import { SliderInput } from "components/atoms/SliderInput";
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
    <Box display="flex" alignItems="center" px={[2, 0]}>
      <Button onClick={onClick}>{volumeIcon}</Button>
      <Box display={["none", "flex"]}>
        <SliderInput
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleAudioVolume(e)}
          sx={{
            height: "4px",
            width: "100%",
            background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${
              volume * 100
            }%, #ffffff30 ${volume * 100}%, #ffffff30 100%)`,
            borderRadius: "2px",
          }}
        />
      </Box>
    </Box>
  );
};
