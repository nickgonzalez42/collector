import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [context.route, context.signOut]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login");
  }
  return (
    <div className="flex flex-col overflow-hidden min-h-screen bg-slate-100">
      <header className="bg-gray-800 text-white p-4">
        <button onClick={() => navigate("/")} className="text-white hover:text-gray-300 mr-4">
          OPTCG Collector
        </button>
        <button onClick={() => navigate("/builder")} className="text-white hover:text-gray-300 mr-4">
          Deck Builder
        </button>
        <button onClick={() => navigate("/cards")} className="text-white hover:text-gray-300 mr-4">
          Cards
        </button>
        <button onClick={() => navigate("/collection")} className="text-white hover:text-gray-300 mr-4">
          Collection
        </button>
        <button onClick={() => navigate("/decks")} className="text-white hover:text-gray-300 mr-4">
          Decks
        </button>
        {route !== "authenticated" ? (
          <button onClick={() => navigate("/login")} className="text-white hover:text-gray-300">
            Login
          </button>
        ) : (
          <button onClick={() => logOut()} className="text-white hover:text-gray-300">
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
