export interface Theme {
  id: string;
  name: string;
  bg: string;
  fg: string;
  accent: string;
  accent2: string;
  muted: string;
  border: string;
  btnBg: string;
  logoFilter: string;
}

export const themes: Theme[] = [
  {
    // Negro. Como vestirse todo de negro y que funcione.
    id: "standard",
    name: "Standard",
    bg: "#080808",
    fg: "#E8E8E8",
    accent: "#E8E8E8",
    accent2: "#ABABAB",
    muted: "#6C6C6C",
    border: "#282828",
    btnBg: "#141414",
    logoFilter: "none",
  },
  {
    // Papel. Como una página de libro bien impreso.
    id: "light",
    name: "Light",
    bg: "#F0EFEC",
    fg: "#141414",
    accent: "#141414",
    accent2: "#4A4A4A",
    muted: "#909090",
    border: "#D8D6D1",
    btnBg: "#E4E2DE",
    logoFilter: "invert(1)",
  },
];
