import { ChangeEvent, RefObject } from "react";

interface VideoSourceProps {
  id: string;
  forwardedRef: RefObject<HTMLVideoElement>;
  onTimeUpdate: (e: ChangeEvent<HTMLVideoElement>) => void;
  onClick: () => void;
  onLoadedData: () => void;
  url: string;
}

export const VideoSource = ({
  id,
  forwardedRef,
  onTimeUpdate,
  onClick,
  onLoadedData,
  url,
}: VideoSourceProps) => (
  <video
    id={id}
    ref={forwardedRef}
    playsInline
    autoPlay
    preload="auto"
    tabIndex={-1}
    onTimeUpdate={onTimeUpdate}
    onClick={onClick}
    onLoadedData={onLoadedData}
  >
    <source src={url} type="video/mp4" />
  </video>
);
