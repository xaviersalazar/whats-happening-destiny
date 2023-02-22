import { Text } from "@nextui-org/react";
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
      className="text-6xl md:text-7xl xl:text-8xl"
      css={{
        lineHeight: "$xs",
        marginBottom: "$0",
      }}
    >
      {title}
    </Text>
    <Text
      className="text-sm font-light md:text-base"
      css={{
        marginLeft: "$2",
      }}
    >
      {subTitle}
    </Text>
    {children}
  </Box>
);

export default Page;
