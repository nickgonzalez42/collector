import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import "./tailwind.generated.css";

import { RequireAuth } from "./RequireAuth";

import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Collection } from "./components/Collection";
import { Login } from "./components/Login";
import { Cards } from "./components/Cards";
import { Decks } from "./components/DeckIndex";
import { Builder } from "./components/Builder";
import { Alternates } from "./components/Alternates";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/card/:id" element={<Alternates />} />
          <Route
            path="/collection"
            element={
              <RequireAuth>
                <Collection />
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
