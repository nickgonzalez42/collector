import React from "react";
import "./App.css";
import "./tailwind.generated.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

import { RequireAuth } from "./RequireAuth";

import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { ProtectedSecond } from "./components/ProtectSecond";
import { Protected } from "./components/Protected";
import { Login } from "./components/Login";
import { SetIndex } from "./components/SetIndex";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/index" element={<SetIndex />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          />
          <Route
            path="/protected2"
            element={
              <RequireAuth>
                <ProtectedSecond />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;
