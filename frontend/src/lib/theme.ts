import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#E6F7FF",
    100: "#BAE7FF",
    200: "#91D5FF",
    300: "#69C0FF",
    400: "#40A9FF",
    500: "#1890FF",
    600: "#096DD9",
    700: "#0050B3",
    800: "#003A8C",
    900: "#002766"
  }
};

const fonts = {
  body: "Inter, system-ui, sans-serif",
  heading: "Inter, system-ui, sans-serif"
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme = extendTheme({
  colors,
  fonts,
  config
});

export default theme; 