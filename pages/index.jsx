import Head from "next/head";
import { Card } from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import { showNotification } from "@mantine/notifications";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Live Share GDSC</title>
        <meta
          name="description"
          content="A live code sharing app for GDSC events"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to GDSC Live share</h1>
        <p>
          This is a simple GDSC Live Share app. It will used by{" "}
          <code>@GDSCNIE</code> for events to live share code during events and
          also as a repository of snippets.
        </p>
        <div className={styles.cards}>
          <Card
            clickable
            css={{ gridArea: "current" }}
            shadow={true}
            color="primary"
            onClick={() => window.location.href = "/current"}
          >
            <h3>Current</h3>
            <p>The currently shared code snippet.</p>
          </Card>
          <Card
            clickable
            onClick={() =>
              showNotification({
                title: "Coming Soon",
                message: "This feature is currently under development",
                color: "yellow",
              })
            }
            css={{ gridArea: "events" }}
            shadow={true}
            color="error"
          >
            <h3>Events</h3>
            <p>Snippets from previous events.</p>
          </Card>
          <Card
            clickable
            onClick={() =>
              showNotification({
                title: "Coming Soon",
                message: "This feature is currently under development",
                color: "yellow",
              })
            }
            css={{ gridArea: "create" }}
            bordered
            shadow={false}
            color="link"
          >
            <h4>Create your own snippet to share with someone.</h4>
          </Card>
        </div>
      </div>
    </div>
  );
}
