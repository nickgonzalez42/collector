import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navbar, Button } from "flowbite-react";

const customTheme = {
  color: {
    primary: "bg-[#262647] text-gray-200 hover:bg-gray-500 hover:text-white ",
  },
};

export function Header() {
  const auth = useAuthenticator((context) => [context.route, context.signOut, context.user]);
  const { signOut, authStatus } = auth;

  function logOut() {
    signOut();
  }
  return (
    <Navbar fluid className="text-white bg-[#262647]">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-m l:text-xl font-semibold dark:text-white">
          STRAW HAT STASH
        </span>
      </Navbar.Brand>
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
          <Button href="https://ko-fi.com/Z8Z6D3L3K" theme={customTheme} color="primary" className="mt-1">
            ko-fi
          </Button>
          {authStatus !== "authenticated" && authStatus !== "configuring" ? (
            <Button theme={customTheme} color="primary" className="mt-1" href="/login">
              login
            </Button>
          ) : (
            <Button theme={customTheme} color="primary" className="mt-1" onClick={() => logOut()}>
              logout
            </Button>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
