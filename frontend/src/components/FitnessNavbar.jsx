import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function FitnessNavbar() {
  return (
    <Disclosure as="nav" className="bg-black shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 bg-black">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-start md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-500 font-extrabold hover:bg-gray-900 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* <div className="my-9 h-13 w-13 flex flex-shrink-0 items-center justify-center rounded-full bg-black">
                  <img
                    src="src\assets\logo.png" // Replace with the actual path to your logo
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div> */}

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/user/fitdashboard"
                    className="inline-flex items-center border-b-2 border-purple-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Fitness Dashboard
                  </Link>
                  <Link
                    to="/user/workout"
                    className="inline-flex items-center border-b-2 border-purple-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Daily Workouts
                  </Link>
                  <Link
                    to="/tutorials"
                    className="inline-flex items-center border-b-2 border-purple-500 px-1 pt-1 text-sm font-medium text-gray-300"
                  >
                    Tutorials
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2 bg-black">
              <Link to="/user/fitdashboard">
                <Disclosure.Button
                  as="button"
                  className="text-gray-200 block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Fitness Dashboard
                </Disclosure.Button>
              </Link>

              <Link to="/user/workout">
                <Disclosure.Button
                  as="button"
                  className="text-gray-200 block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Daily Workouts
                </Disclosure.Button>
              </Link>

              <Link to="/tutorials">
                <Disclosure.Button
                  as="button"
                  className="text-gray-200 block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-500 hover:bg-gray-900 hover:text-gray-300 sm:pl-5 sm:pr-6"
                >
                  Tutorials
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
