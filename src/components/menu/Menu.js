import { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import classNames from "classnames";

export const Menu = ({ children }) => {
  const [navigation, setNavigation] = useState([
    { name: "Daily", href: "/", current: true },
    { name: "Weekly", href: "/weekly", current: false },
    { name: "Dungeons", href: "/dungeons", current: false },
    { name: "Raids", href: "/raids", current: false },
    { name: "Season", href: "/season", current: false },
  ]);

  const setCurrentLink = (item) => {
    const items = navigation.map((navItem) => {
      return { ...navItem, current: item.name === navItem.name ? true : false };
    });

    setNavigation(items);
  };

  return (
    <div>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 md:px-3">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <p className="text-white text-xs font-thin md:text-sm lg:text-md">
                    WHATS HAPPENING DESTINY
                  </p>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setCurrentLink(item)}
                          className={classNames(
                            item.current
                              ? "font-regular text-white"
                              : "font-thin text-light hover:text-dark hover:bg-white",
                            "px-3 py-2 rounded-md text-xs uppercase lg:text-sm"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-4 w-4" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-4 w-4" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="md:hidden">
                <div className="absolute bg-white w-mobileMenu rounded ml-2 shadow-2xl px-2 py-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={"focus-visible:outline-none"}
                      onClick={() => setCurrentLink(item)}
                    >
                      <Disclosure.Button
                        className={classNames(
                          item.current
                            ? "font-regular text-dark"
                            : "font-thin hover:text-white hover:bg-dark",
                          "block px-3 py-2 rounded-md text-xs uppercase lg:text-sm focus-visible:outline-none "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <main>{children}</main>
    </div>
  );
};
