import { useState } from "react";
import { Navbar as NextUiNavbar, Link, styled, Image } from "@nextui-org/react";
import logoWhiteUrl from "../../assets/logo-white.png";

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Box css={{ maxW: "100%" }}>
      <NextUiNavbar
        variant="floating"
        css={{
          paddingTop: "$10",
          paddingLeft: "$10",
          paddingRight: "$10",
          justifyContent: "space-between",
        }}
        containerCss={{
          paddingLeft: "$10",
          paddingRight: "$10",
          marginLeft: "$0 !important",
          marginRight: "$0 !important",
          maxWidth: "100%",
        }}
      >
        <NextUiNavbar.Brand showIn="xs">
          <NextUiNavbar.Toggle
            aria-label="toggle navigation"
            onChange={() => setIsMenuOpen(!isMenuOpen)}
          />
        </NextUiNavbar.Brand>
        <NextUiNavbar.Content
          enableCursorHighlight
          hideIn="xs"
          activeColor="neutral"
          variant="highlight-rounded"
        >
          {menuItems.map(({ name }, index) => (
            <NextUiNavbar.Link
              key={index}
              isActive={index === currMenuItem}
              href="#"
              itemCss={{
                fontWeight: index === currMenuItem ? "$black" : "$thin",
                fontSize: "$xs",
              }}
              onClick={() => setCurrMenuItem(index)}
            >
              {name}
            </NextUiNavbar.Link>
          ))}
        </NextUiNavbar.Content>
        <NextUiNavbar.Content>
          <NextUiNavbar.Link
            href="#"
            css={{
              display: isMenuOpen ? "none" : "initial",
            }}
          >
            <Image
              src={logoWhiteUrl}
              width={128}
              alt="logo"
              css={{
                position: "relative",
                bottom: "$9",
                paddingTop: "$12",
              }}
            />
          </NextUiNavbar.Link>
        </NextUiNavbar.Content>
        <NextUiNavbar.Collapse
          css={{
            paddingTop: "$16",
          }}
        >
          {menuItems.map(({ name }, index) => (
            <NextUiNavbar.CollapseItem
              key={index}
              css={{
                paddingLeft: "$8",
                paddingRight: "$8",
              }}
            >
              <Link
                color="text"
                css={{
                  minWidth: "100%",
                  fontWeight: index === currMenuItem ? "$black" : "$thin",
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
