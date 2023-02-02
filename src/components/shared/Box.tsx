import { CSS, styled } from "@nextui-org/react";

interface BorderBoxProps {
  css: CSS;
  children: any;
}

const BorderBox = styled("div", {
  boxSizing: "border-box",
});

const Box = ({ css, children }: BorderBoxProps) => (
  <BorderBox css={css}>{children}</BorderBox>
);

export default Box;
