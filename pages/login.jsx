import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, Input, Button } from "@nextui-org/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("primary");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/admin-share-portal";
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card bordered shadow={false} css={{ mw: "400px" }}>
        <h3>Login to the platform</h3>
        <Input
          status={status}
          onChange={(e) => setEmail(e.target.value)}
          bordered
          css={{ marginBottom: "2em", marginTop: "1em" }}
          labelPlaceholder="Email Id"
        />
        <Input.Password
          status={status}
          onChange={(e) => setPassword(e.target.value)}
          bordered
          css={{ marginBottom: "2em" }}
          labelPlaceholder="Password"
        />
        <Button onClick={handleLogin}>Login</Button>
      </Card>
    </div>
  );
};

export default Login;
