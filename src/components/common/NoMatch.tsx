import { Link, Text } from "@nextui-org/react";
import Page from "./Page";
import Box from "./Box";

const NoMatch = () => (
  <Page>
    <Box
      css={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Text
        weight="black"
        className="text-6xl md:text-7xl xl:text-8xl"
        css={{
          lineHeight: "$xs",
          marginBottom: "$0",
          marginTop: "$12",
        }}
      >
        Nothing found here
      </Text>
      <Text weight="thin" size="$md">
        Return to <Link href="/">home</Link>
      </Text>
    </Box>
  </Page>
);

export default NoMatch;
