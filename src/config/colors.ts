import { DefaultTheme } from "styled-components";

type Colors = {
  light: DefaultTheme;
  dark: DefaultTheme;
  [key: string]: DefaultTheme;
};

// when adding a new color, make sure to add it to the DefaultTheme interface in styled.d.ts

const colors: Colors = {
  light: {
    primary: "#3b3adb",
    secondary: "#8786F3",
    accent: "#3F3CFB",
    textPrimary: "#070711",
    textSecondary: "#a0a0a0",
    white: "#F9FDFD",
    background: "#F9FDFD",
    black: "#000000",
    error: "#ff6347",
    banner: "#f1f1f1",
    youtube: "#ff0000",
    facebook: "#4267B2",
    telegram: "#2AABEE",
  },
  dark: {
    primary: "#3b3adb",
    secondary: "#0E0C79",
    accent: "#3F3CFB",
    textPrimary: "#EDEDF8",
    textSecondary: "#a0a0a0",
    white: "#ffffff",
    background: "#040410",
    black: "#000000",
    error: "#ff6347",
    banner: "#10101b",
    youtube: "#ff0000",
    facebook: "#4267B2",
    telegram: "#2AABEE",
  },
};

export default colors;
