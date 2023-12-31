import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navbar, Button } from "flowbite-react";

export function Header() {
  const { route, signOut } = useAuthenticator((context) => [context.route, context.signOut]);

  function logOut() {
    signOut();
  }

  return (
    <Navbar fluid className="text-white border-[#a48b47] bg-[#262647]">
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">STRAW HAT STASH</span>
      </Navbar.Brand>
      <div className="flex mr-2 ml-auto sticky md:order-2">
        {route !== "authenticated" ? (
          <Button className="bg-[#262647] text-gray-200 hover:bg-gray-500 hover:text-white" href="/login">
            LOGIN
          </Button>
        ) : (
          <Button className="bg-[#262647] text-gray-200 hover:bg-gray-500 hover:text-white" onClick={() => logOut()}>
            LOGOUT
          </Button>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse className="md:ml-8 ml-0">
        <Navbar.Link className="text-white hover:text-[#262647]" href="/cards">
          CARDS
        </Navbar.Link>
        <Navbar.Link className="text-white hover:text-[#262647]" href="/collection">
          COLLECTION
        </Navbar.Link>
        <Navbar.Link className="text-white hover:text-[#262647]" href="/decks">
          DECKS
        </Navbar.Link>
        <Navbar.Link className="text-white hover:text-[#262647]" href="/builder">
          DECK BUILDER
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
