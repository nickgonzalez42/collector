import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [context.route, context.signOut]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login");
  }
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header>
        <Button onClick={() => navigate("/")}>OPTCG Collector</Button>
        <Button onClick={() => navigate("/builder")}>Deck Builder</Button>
        <Button onClick={() => navigate("/cards")}>Cards</Button>
        <Button onClick={() => navigate("/collection")}>Collection</Button>
        <Button onClick={() => navigate("/decks")}>Decks</Button>
        {route !== "authenticated" ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : (
          <Button onClick={() => logOut()}>Logout</Button>
        )}
      </header>
      <main className="w-full flex-auto flex flex-grow overflow-hidden relative">
        <div className="w-full h-full overflow-auto py-3 px-3 md:px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
