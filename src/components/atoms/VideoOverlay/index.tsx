import { Box } from "@chakra-ui/react";

interface VideoOverlayProps {
  onClick: () => void;
  visible: boolean;
}

export const VideoOverlay = ({ onClick, visible }: VideoOverlayProps) => (
  <Box
    bottom={0}
    position="absolute"
    transition="300ms"
    opacity={visible ? 1 : 0}
    background="linear-gradient(transparent, #00000033)"
    zIndex={1}
    width="100%"
    height="70%"
    onClick={onClick}
  />
);
