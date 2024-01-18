import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { NewHeader } from "./NewHeader";

export function Layout() {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen bg-slate-100">
      <NewHeader />
      <main className="w-full flex-auto flex flex-grow overflow-hidden relative">
        <div className="w-full h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
