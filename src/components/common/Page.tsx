import { styled, Text } from "@nextui-org/react";
import Box from "./Box";

interface PageProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Page = ({ title, subTitle, children }: PageProps) => (
  <Box
    css={{
      height: "100%",
      paddingTop: "$12",
      paddingBottom: "$12",
      paddingLeft: "$10",
      paddingRight: "$10",
    }}
  >
    <Text
      weight="black"
      css={{
        lineHeight: "$xs",
        fontSize: "$6xl",
        marginBottom: "$0",
        "@xs": {
          fontSize: "$7xl",
        },
        "@sm": {
          fontSize: "$8xl",
        },
      }}
    >
      {title}
    </Text>
    <Text
      b
      weight="thin"
      css={{
        marginLeft: "$2",
        "@xs": {
          fontSize: "$sm",
        },
        "@sm": {
          fontSize: "$md",
        },
      }}
    >
      {subTitle}
    </Text>
    {children}
  </Box>
);

export default Page;
