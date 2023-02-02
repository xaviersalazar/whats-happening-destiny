import { useState } from "react";
import { Navbar as NextUiNavbar, Link, styled } from "@nextui-org/react";

type Item = {
  name: string;
  href: string;
};

const menuItems: Array<Item> = [
  { name: "HOME", href: "/" },
  { name: "DAILY", href: "/daily" },
  { name: "WEEKLY", href: "/weekly" },
  { name: "DUNGEONS", href: "/dungeons" },
  { name: "RAIDS", href: "/raids" },
  { name: "SEASON", href: "/season" },
];

const Box = styled("div", {
  boxSizing: "border-box",
});

const Navbar = () => {
  const [currMenuItem, setCurrMenuItem] = useState<number>(0);

  return (
    <Box css={{ maxW: "100%" }}>
      <NextUiNavbar
        variant="sticky"
        css={{
          paddingTop: "$10",
          paddingLeft: "$10",
          paddingRight: "$10",
        }}
      >
        <NextUiNavbar.Brand showIn="xs">
          <NextUiNavbar.Toggle aria-label="toggle navigation" />
        </NextUiNavbar.Brand>
        <NextUiNavbar.Content
          enableCursorHighlight
          hideIn="xs"
          activeColor="primary"
          variant="underline-rounded"
        >
          {menuItems.map(({ name }, index) => (
            <NextUiNavbar.Link
              key={index}
              isActive={index === currMenuItem}
              href="#"
              itemCss={{
                fontWeight: "$thin",
              }}
              onClick={() => setCurrMenuItem(index)}
            >
              {name}
            </NextUiNavbar.Link>
          ))}
        </NextUiNavbar.Content>
        <NextUiNavbar.Content>
          <NextUiNavbar.Link color="inherit" href="#">
            WHDestiny
          </NextUiNavbar.Link>
        </NextUiNavbar.Content>
        <NextUiNavbar.Collapse>
          {menuItems.map(({ name }, index) => (
            <NextUiNavbar.CollapseItem key={index}>
              <Link
                color="primary"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {name}
              </Link>
            </NextUiNavbar.CollapseItem>
          ))}
        </NextUiNavbar.Collapse>
      </NextUiNavbar>
    </Box>
  );
};

export default Navbar;
