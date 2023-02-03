import { Text } from "@nextui-org/react";
import Box from "./Box";

interface PageProps {
  title: string;
  subTitle: string;
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
      h1
      weight="black"
      css={{
        lineHeight: "$xs",
        marginBottom: "$0",
        "@xs": {
          fontSize: "$6xl",
        },
        "@sm": {
          fontSize: "$7xl",
        },
        "@md": {
          fontSize: "$8xl",
        },
      }}
    >
      {title}
    </Text>
    <Text b weight="thin" size="$sm">
      {subTitle}
    </Text>
    {children}
  </Box>
);

export default Page;
