import { ReactNode } from "react";
import { Box, Button } from "@chakra-ui/react";

interface VideoActionIconProps {
  onClick: () => void;
  visible: boolean;
  children: ReactNode;
}

export const VideoActionIcon = ({
  onClick,
  visible,
  children,
}: VideoActionIconProps) => {
  if (!visible) {
    return null;
  }
  return (
    <Box position="absolute" top="40%" zIndex={3}>
      <Button onClick={onClick}>{children}</Button>
    </Box>
  );
};
