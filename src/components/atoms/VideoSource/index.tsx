import { ChangeEvent, RefObject } from "react";

interface VideoSourceProps {
  id: string;
  ref: RefObject<HTMLVideoElement>;
  onTimeUpdate: (e: ChangeEvent<HTMLVideoElement>) => void;
  onClick: () => void;
  onLoadedData: () => void;
  url: string;
}

export const VideoSource = ({
  id,
  ref,
  onTimeUpdate,
  onClick,
  onLoadedData,
  url,
}: VideoSourceProps) => (
  <video
    id={id}
    ref={ref}
    playsInline
    preload="auto"
    tabIndex={-1}
    onTimeUpdate={onTimeUpdate}
    onClick={onClick}
    onLoadedData={onLoadedData}
  >
    <source src={url} type="video/mp4" />
  </video>
);
