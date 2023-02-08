import { styled } from "@nextui-org/react";

interface ImageProps {
  src: string;
  className: string;
}

const Image = styled("img", {
  maxWidth: "initial",
  background: "$almostBlack",
  borderRadius: "50%",
  padding: "$1",
  position: "relative",
  top: "0.25rem",
});

const ModifierImage = ({ src, className }: ImageProps) => (
  <Image src={src} className={className} />
);

export default ModifierImage;
