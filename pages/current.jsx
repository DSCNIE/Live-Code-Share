import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Loading, useTheme, Card, Button } from "@nextui-org/react";
import styles from "../styles/current.module.css";
import { showNotification } from "@mantine/notifications";
import { Prism } from "@mantine/prism";

const Current = () => {
  const [currentSnippet, setCurrent] = useState(null);

  const { isDark, type } = useTheme();

  useEffect(() => {
    const docRef = doc(db, "snippets", "current");
    getDoc(docRef)
      .then((doc) => {
        setCurrent(doc.data());
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: "Could not load current snippet",
          color: "error",
        });
      });
  }, []);

  if (currentSnippet == null) {
    return (
      <div className={styles.current_section}>
        <Loading
          loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
        >
          Loading current snippet
        </Loading>
      </div>
    );
  } else {
    return (
      <div className={styles.current_section}>
        <h1>The current code snippet!</h1>
        <Card bordered css={{ mw: "50vw" }}>
          <Prism
            colorScheme={isDark ? "dark" : "light"}
            withLineNumbers
            language={currentSnippet.lang}
          >
            {currentSnippet.code}
          </Prism>
        </Card>
        <Button
          onClick={() => (window.location.href = "/")}
          css={{ marginTop: "1em" }}
        >
          Go Back
        </Button>
      </div>
    );
  }
};

export default Current;
