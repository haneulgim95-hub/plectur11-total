import { createContext } from "react";

export type ThemeType = "light" | "dark";

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {}
});