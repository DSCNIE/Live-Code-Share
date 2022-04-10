import React, { useState, useEffect } from "react";
import {
  Textarea,
  Card,
  useTheme,
  Radio,
  Input,
  Button,
} from "@nextui-org/react";
import { Prism } from "@mantine/prism";
import styles from "../../styles/Admin.module.css";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { showNotification } from "@mantine/notifications";

const AdminPage = () => {
  const placeholder = `<h3>
  Enter code to show here with {' '}
  <strong className={styles.strong}>Highlighting</strong>snippet
</h3>`;

  const { isDark, type } = useTheme();
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("jsx");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });
  }, []);

  const updateCurrent = async () => {
    const docRef = doc(db, "snippets", "current");
    try {
      await setDoc(docRef, {
        createdAt: new Date(),
        code,
        lang,
      });
      showNotification({
        title: "Success",
        message: "Current snippet updated!",
        color: "green",
        radius: "lg",
      });
    } catch (e) {
      showNotification({
        title: "Error",
        message: "Current snippet could not be updated!",
        color: "red",
        radius: "lg",
      });
    }
  };

  return (
    <div className={`${styles.main} container`}>
      <Card shadow={true}>
        <h3>
          Input the code snippet below to create a{" "}
          <strong className={styles.strong}>CURRENT</strong>snippet
        </h3>
        <div className={styles.cardGrid}>
          <div className={styles.cardGrid__box}>
            <Textarea
              bordered
              label="Enter code to make current"
              placeholder={placeholder}
              onChange={(e) => setCode(e.target.value)}
            />
            <Radio.Group
              size="xs"
              color="warning"
              row
              value="html"
              css={{ marginTop: "1em" }}
              onChange={setLang}
            >
              <Radio value="html">HTML</Radio>
              <Radio value="css">CSS</Radio>
              <Radio value="jsx">jsx</Radio>
              <Radio value="js">Js</Radio>
              <Radio value="python">python</Radio>
            </Radio.Group>
          </div>
          <div className={styles.cardGrid__box}>
            <Prism
              colorScheme={isDark ? "dark" : "light"}
              withLineNumbers
              language={lang}
            >
              {code === "" ? placeholder : code}
            </Prism>
            <Button
              css={{
                marginTop: "0.5em",
                marginBottom: "0.5em",
              }}
              onClick={updateCurrent}
            >
              Create current snippet
            </Button>
          </div>
        </div>
        <hr />
        <div className={styles.event}>
          <h3>Or create a new event and add snippets.</h3>
          <Input placeholder="Event name" />
          <Button color="success">
            create event
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPage;
