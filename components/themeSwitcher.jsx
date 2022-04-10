import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme, Button } from "@nextui-org/react";
import { BsMoon, BsSun } from "react-icons/bs";
import styles from "../styles/components/appSwitcher.module.css";

const AppThemeSwitcher = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Button
      className={styles.appSwitcher}
      bordered
      auto
      css={{ color: "$primary" }}
      icon={isDark ? <BsSun /> : <BsMoon />}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  );
};

export default AppThemeSwitcher;
