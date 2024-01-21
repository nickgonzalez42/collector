import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { API } from "aws-amplify";
import { searchSets } from "../graphql/queries";

const TYPES = ["Booster", "Starter Deck", "Gift Set", "Promo"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BackEndType(type) {
  console.log("Running");
  switch (type) {
    case "Booster":
      return "BOOSTER";
    case "Starter Deck":
      return "STARTER_DECK";
    case "Gift Set":
      return "GIFT_SET";
    case "Promo":
      return "PROMO";
    default:
      return "BOOSTER";
  }
}

export function NewSetSelector(props) {
  const [sets, setSets] = useState([]);
  const [releaseType, setReleaseType] = useState("Booster");
  const [setName, setSetName] = useState("");

  useEffect(() => {
    fetchSets();
  }, [releaseType]);

  async function fetchSets() {
    const backEndType = BackEndType(releaseType);
    let direction = "desc";
    if (backEndType === "GIFT_SET" || backEndType === "PROMO") {
      direction = "asc";
    }
    try {
      let apiData = await API.graphql({
        authMode: "API_KEY",
        query: searchSets,
        variables: {
          filter: {
            releaseType: { eq: backEndType },
          },
          sort: [{ field: "name", direction: direction }],
          limit: 50,
        },
      });
      const setsFromAPI = apiData.data.searchSets.items;

      setSets(setsFromAPI);
      props.setSetID(setsFromAPI[0].id);
      setSetName(setsFromAPI[0].name);
    } catch (error) {
      console.error("Error fetching sets:", error);
    }
  }

  function SelectSet(value) {
    props.setSetID(value);
    const selectedSet = sets.find((set) => set.id === value);
    console.log(selectedSet);
    setSetName(selectedSet.name);
  }

  return (
    <>
      <Listbox value={releaseType} onChange={setReleaseType}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Set Type</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{releaseType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {TYPES.map((type) => (
                    <Listbox.Option
                      key={type}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={type}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                            {type}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <Listbox value={props.currentID} onChange={SelectSet}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Set Type</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{setName}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sets.map((set) => (
                    <Listbox.Option
                      key={set.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={set.id}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                            {set.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
