import "../styles/globals.css";
import { createTheme, NextUIProvider, Text } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AppThemeSwitcher from "../components/themeSwitcher";
import { NotificationsProvider } from "@mantine/notifications";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      error: "#eb4132",
      link: "#0b9e57",
      warning: "#fbbe00",
      primary: "#3f87f5",
    },
    space: {},
    fonts: {},
  },
});
const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      error: "#eb4132",
      link: "#0b9e57",
      warning: "#fbbe00",
      primary: "#3f87f5",
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NotificationsProvider autoClose={1000}>
        <NextUIProvider>
          <Component {...pageProps} />
          <AppThemeSwitcher />
        </NextUIProvider>
      </NotificationsProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
