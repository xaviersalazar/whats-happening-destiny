import { CSS, styled } from "@nextui-org/react";

interface BorderBoxProps {
  css: CSS;
  children?: any;
  [x: string]: any;
}

const BorderBox = styled("div", {
  boxSizing: "border-box",
});

const Box = ({ css, children, ...rest }: BorderBoxProps) => (
  <BorderBox css={css} {...rest}>
    {children}
  </BorderBox>
);

export default Box;
