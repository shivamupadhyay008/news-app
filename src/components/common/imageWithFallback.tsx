import styled from "@emotion/styled";
import { useState } from "react";

interface ImageWithFallbackedInterface {
  initialSrc: string;
  alt: string;
  fallbackSrc: string;
}
const ImageCard = styled.img`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
  border-radius: 6px;
`;
export const ImageWithFallback: React.FC<ImageWithFallbackedInterface> = ({
  initialSrc,
  alt,
  fallbackSrc,
}) => {
  const [src, setSrc] = useState(initialSrc || fallbackSrc);
  const handleError = () => {
    setSrc(fallbackSrc);
  };
  return <ImageCard src={src} alt={alt} onError={handleError} />;
};
