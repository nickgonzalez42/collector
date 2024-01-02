import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navbar, Button } from "flowbite-react";
import { useEffect } from "react";

const customTheme = {
  color: {
    primary: "bg-[#262647] text-gray-200 hover:bg-gray-500 hover:text-white ",
  },
};

export function Header() {
  const { route, signOut } = useAuthenticator((context) => [context.route, context.signOut]);

  function logOut() {
    signOut();
  }

  useEffect(() => {
    console.log("ROUTE: " + route);
  }, []);

  return (
    <Navbar fluid className="text-white bg-[#262647]">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-m l:text-xl font-semibold dark:text-white">
          STRAW HAT TEST
        </span>
      </Navbar.Brand>
      {/* <div className="flex mr-2 ml-auto sticky md:order-2"></div> */}
      <div className="flex flex-initial justify-end">
        <Navbar.Toggle />
        <Navbar.Collapse className="l:ml-8 ml-0">
          <Button theme={customTheme} color="primary" className="mt-1" href="/cards">
            cards
          </Button>
          <Button theme={customTheme} color="primary" className="mt-1" href="/collection">
            collection
          </Button>
          <Button disabled={true} theme={customTheme} color="primary" className="mt-1" href="/decks">
            view decks
          </Button>
          <Button disabled={true} theme={customTheme} color="primary" className="mt-1" href="/builder">
            create deck
          </Button>
          {route !== "authenticated" ? (
            <Button theme={customTheme} color="primary" href="/login">
              login
            </Button>
          ) : (
            <Button theme={customTheme} color="primary" onClick={() => logOut()}>
              logout
            </Button>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
