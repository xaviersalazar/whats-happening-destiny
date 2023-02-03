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
        h1
        css={{
          marginTop: "$12",
          marginBottom: "$0",
          "@sm": {
            fontSize: "$5xl",
          },
          "@md": {
            fontSize: "$6xl",
          },
        }}
      >
        Nothing found here
      </Text>
      <Text b weight="thin" size="$md">
        Return to <Link href="/">home</Link>
      </Text>
    </Box>
  </Page>
);

export default NoMatch;
