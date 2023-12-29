import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const color = "#262647";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [context.route, context.signOut]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login");
  }

  const style = {
    backgroundColor: color,
  };

  return (
    <div className="flex flex-col overflow-hidden min-h-screen bg-slate-100">
      <header className="text-white border-[#a48b47] border-b-2 relative p-3.5 min-w-screen" style={style}>
        <button onClick={() => navigate("/")} className="text-white hover:text-gray-300 mr-5 ">
          STRAW HAT STASH
        </button>

        <button onClick={() => navigate("/cards")} className="text-white hover:text-gray-300 mr-4">
          Cards
        </button>
        <button onClick={() => navigate("/collection")} className="text-white hover:text-gray-300 mr-4">
          Collection
        </button>
        <button
          onClick={() => navigate("/builder")}
          disabled={true}
          className="text-white disabled:text-gray-300 hover:text-gray-300 mr-4"
        >
          Deck Builder
        </button>
        <button
          onClick={() => navigate("/decks")}
          disabled={true}
          className="text-white disabled:text-gray-300 hover:text-gray-300 mr-4"
        >
          Decks
        </button>
        {route !== "authenticated" ? (
          <button onClick={() => navigate("/login")} className="text-white sticky right-0 hover:text-gray-300">
            Login
          </button>
        ) : (
          <button onClick={() => logOut()} className="text-white sticky right-0 hover:text-gray-300">
            Logout
          </button>
        )}
      </header>
      <main className="w-full flex-auto flex flex-grow overflow-hidden relative">
        <div className="w-full h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
