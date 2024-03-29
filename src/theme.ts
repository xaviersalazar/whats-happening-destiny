import { createTheme } from "@nextui-org/react";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      // semantic colors
      primary50: "#FEEEE4",
      primary100: "#FEE7DB",
      primary200: "#FDCAB8",
      primary300: "#F9A693",
      primary400: "#F38376",
      primary500: "#EB4D4B",
      primary600: "#CA3641",
      primary700: "#A9253A",
      primary800: "#881733",
      primary900: "#700E2E",
      success50: "#F1FDE5",
      success100: "#F2FCD8",
      success200: "#E3FAB1",
      success300: "#CAF088",
      success400: "#B0E167",
      success500: "#8BCE39",
      success600: "#6EB129",
      success700: "#53941C",
      success800: "#3C7712",
      success900: "#2B620A",
      secondary50: "#DAF4FD",
      secondary100: "#CFFEFB",
      secondary200: "#9FFCFD",
      secondary300: "#6FEFFB",
      secondary400: "#4BDCF8",
      secondary500: "#11BFF4",
      secondary600: "#0C95D1",
      secondary700: "#0870AF",
      secondary800: "#05508D",
      secondary900: "#033975",
      warning50: "#FFF9D8",
      warning100: "#FEF7CB",
      warning200: "#FEED98",
      warning300: "#FEDF65",
      warning400: "#FDD23F",
      warning500: "#FCBD00",
      warning600: "#D89C00",
      warning700: "#B57E00",
      warning800: "#926200",
      warning900: "#784E00",
      error50: "#FEE7E4",
      error100: "#FEEADB",
      error200: "#FED1B8",
      error300: "#FEB194",
      error400: "#FD937A",
      error500: "#FC624E",
      error600: "#D83E39",
      error700: "#B5272D",
      error800: "#921828",
      error900: "#780E24",

      // brand colors
      primaryLight: "$primary100",
      primaryLightHover: "$primary200",
      primaryLightActive: "$primary300",
      primaryLightContrast: "$primary500",
      primary: "$primary500",
      primaryBorder: "$primary400",
      primaryBorderHover: "$primary500",
      primarySolidHover: "$primary600",
      primarySolidContrast: "$white",
      primaryShadow: "$primary400",
      secondaryLight: "$secondary100",
      secondaryLightHover: "$secondary200",
      secondaryLightActive: "$secondary300",
      secondaryLightContrast: "$secondary500",
      secondary: "$secondary500",
      secondaryBorder: "$secondary400",
      secondaryBorderHover: "$secondary500",
      secondarySolidHover: "$secondary600",
      secondarySolidContrast: "$white",
      secondaryShadow: "$secondary400",
      successLight: "$success100",
      successLightHover: "$success200",
      successLightActive: "$success300",
      successLightContrast: "$success500",
      success: "$success500",
      successBorder: "$success400",
      successBorderHover: "$success500",
      successSolidHover: "$success600",
      successSolidContrast: "$white",
      successShadow: "$success400",
      warningLight: "$warning100",
      warningLightHover: "$warning200",
      warningLightActive: "$warning300",
      warningLightContrast: "$warning500",
      warning: "$warning500",
      warningBorder: "$warning400",
      warningBorderHover: "$warning400",
      warningSolidHover: "$warning600",
      warningSolidContrast: "$white",
      warningShadow: "$warning400",
      errorLight: "$error100",
      errorLightHover: "$error200",
      errorLightActive: "$error300",
      errorLightContrast: "$error500",
      error: "$error500",
      errorBorder: "$error400",
      errorBorderHover: "$error500",
      errorSolidHover: "$error600",
      errorSolidContrast: "$white",
      errorShadow: "$error400",

      // custom colors
      almostBlack: "#0c0f0a",
    },
    space: {},
    fonts: {},
  },
});

export default theme;
