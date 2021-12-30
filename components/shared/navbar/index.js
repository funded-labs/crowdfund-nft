import Link from "next/link";
import menuItems from "./links";
import classNames from "classnames";
import { useEffect, useState } from "react";
import End from "./end";

export default function Navbar() {
    const [hasScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const listener = document.addEventListener("scroll", e => {
            const scrolled = document.scrollingElement.scrollTop;
            if (scrolled >= 41) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });

        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, []);

    return (
        <>
            <div
                className={classNames(
                    "py-1 pt-3 fixed z-20 w-full text-white",
                    "transition-all duration-300 border-b-4",
                    hasScrolled ? "bg-royal-500 border-b backdrop-filter backdrop-blur-lg bg-opacity-90" : "bg-royal-500",
                    hasScrolled ? null : "border-transparent"
                )}
            >
                <div className="w-full max-w-5xl mx-auto px-4 flex flex-row justify-between items-center">
                    <div className="flex flex-row">
                        <Link href="/">
                            <img src="/assets/logo1.png" className="w-125 h-8 hover:scale-105 duration-200 cursor-pointer" alt=""/>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex space-x-10">
                        {menuItems.map(item => (
                            <Link href={item.href} key={item.title}>
                                <a
                                    className={`
                                        text-gray-500 text-sm bg-transparent hover:bg-sunshine-500 px-2 py-px
                                        transform hover:rotate-3 hover:text-royal-500 transition duration-200 cursor-pointer
                                    `}
                                >
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </nav>

                    <End />
                </div>
            </div>
            <div className="h-16" />
        </>
    );
}