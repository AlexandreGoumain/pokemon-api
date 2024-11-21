import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../app/slices/UiSlice";

const links = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Liste des Pokémons",
        href: "/pokemonList",
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="flex flex-col justify-center mx-auto">
                <nav className="flex justify-between bg-gray-700 text-white shadow-xl">
                    <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                        <Link to="/">
                            <h1 className="text-3xl font-bold font-heading">
                                Pokémon API
                            </h1>
                        </Link>

                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        className="hover:text-gray-200"
                                        to={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <button onClick={() => dispatch(changeTheme())}>
                                Change Theme
                            </button>
                        </ul>

                        <div className="hidden lg:flex items-center space-x-5 ">
                            <Link
                                className="hover:text-gray-200"
                                to="https://github.com/Sensy-gmn"
                                target="_blank"
                            >
                                <svg
                                    id="existing-svg-1"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                >
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                <span className="flex absolute -mt-7 ml-4">
                                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <button
                        className="md:hidden flex mr-6 items-center"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </nav>
                {isOpen && (
                    <div className="md:hidden w-1/3 bg-gray-700 text-white rounded-md">
                        <ul className="px-4 font-semibold font-heading space-y-4 ">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        className="hover:text-gray-200"
                                        to={link.href}
                                    >
                                        {link.name}
                                    </Link>

                                    <button
                                        className="hover:text-gray-200 my-4"
                                        onClick={() => dispatch(changeTheme())}
                                    >
                                        Change Theme
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
