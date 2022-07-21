import { Disclosure, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  { name: "Daily", href: "#", current: true },
  { name: "Weekly", href: "#", current: false },
  { name: "Dungeons", href: "#", current: false },
  { name: "Raids", href: "#", current: false },
  { name: "Season", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Menu = ({ children }) => (
  <div className="min-h-full">
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 md:px-3">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <p className="text-white text-sm lg:text-base">
                  WHATS HAPPENING DESTINY
                </p>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "regular text-white"
                            : "super-light hover:text-white",
                          "px-3 py-2 rounded-md text-xs uppercase lg:text-sm"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-light">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-5 w-5" aria-hidden="true" />
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
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "regular text-dark"
                        : "super-light hover:text-dark",
                      "block px-3 py-2 rounded-md text-xs uppercase lg:text-sm"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
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
