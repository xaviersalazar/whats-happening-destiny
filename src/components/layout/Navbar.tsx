import { useRef, useState } from "react";
import {
  Navbar as NextUiNavbar,
  Link as NextUiLink,
  styled,
  Image,
} from "@nextui-org/react";
import logoWhiteUrl from "../../assets/logo-white.png";
import { useNavigate } from "react-router-dom";

type Item = {
  name: string;
  href: string;
};

const menuItems: Array<Item> = [
  { name: "HOME", href: "/" },
  { name: "DUNGEONS", href: "/dungeons" },
  { name: "RAIDS", href: "/raids" },
  { name: "SEASON", href: "/season" },
];

const Box = styled("div", {
  boxSizing: "border-box",
});

const Navbar = () => {
  const navigate = useNavigate();

  const navbarToggleRef = useRef() as any;

  const [currMenuItem, setCurrMenuItem] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onItemClicked = (href: string, index: number) => {
    setCurrMenuItem(index);
    navigate(href);
    isMenuOpen && navbarToggleRef.current.click();
  };

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
            ref={navbarToggleRef}
            onChange={() => setIsMenuOpen(!isMenuOpen)}
          />
        </NextUiNavbar.Brand>
        <NextUiNavbar.Content
          enableCursorHighlight
          hideIn="xs"
          activeColor="neutral"
          variant="highlight-rounded"
        >
          {menuItems.map(({ name, href }, index) => (
            <NextUiNavbar.Link
              key={index}
              isActive={index === currMenuItem}
              itemCss={{
                fontWeight: index === currMenuItem ? "$black" : "$thin",
                fontSize: "$xs",
              }}
              onClick={() => onItemClicked(href, index)}
            >
              {name}
            </NextUiNavbar.Link>
          ))}
        </NextUiNavbar.Content>
        <NextUiNavbar.Content>
          <NextUiNavbar.Link
            css={{
              display: isMenuOpen ? "none" : "initial",
            }}
            onClick={() => onItemClicked("/", 0)}
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
            "& ul": {
              borderBottomLeftRadius: "$3xl",
              borderBottomRightRadius: "$3xl",
            },
          }}
        >
          {menuItems.map(({ name, href }, index) => (
            <NextUiNavbar.CollapseItem
              key={index}
              css={{
                paddingLeft: "$8",
                paddingRight: "$8",
              }}
            >
              <NextUiLink
                color="text"
                css={{
                  minWidth: "100%",
                  fontWeight: index === currMenuItem ? "$black" : "$thin",
                }}
                onClick={() => onItemClicked(href, index)}
              >
                {name}
              </NextUiLink>
            </NextUiNavbar.CollapseItem>
          ))}
        </NextUiNavbar.Collapse>
      </NextUiNavbar>
    </Box>
  );
};

export default Navbar;
