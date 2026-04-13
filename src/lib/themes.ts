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
    bg: "#E8E5DE",
    fg: "#2E2B26",
    accent: "#2E2B26",
    accent2: "#5A5650",
    muted: "#9A9690",
    border: "#CEC9C1",
    btnBg: "#DEDAD2",
    logoFilter: "invert(1)",
  },
];
