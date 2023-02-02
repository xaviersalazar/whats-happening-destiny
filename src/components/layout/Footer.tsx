import { Link } from "@nextui-org/react";
import { Box } from "../shared";

const Footer = () => (
  <Box
    css={{
      background: "$almostBlack",
      paddingLeft: "$12",
      paddingRight: "$12",
      paddingTop: "$16",
      paddingBottom: "$16",
    }}
  >
    <Link href="#">@xaviersalazar</Link>
  </Box>
);

export default Footer;
