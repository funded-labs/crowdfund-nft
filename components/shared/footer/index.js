import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t py-10 text-sm px-4 lg:px-0">
            <div className="w-full max-w-5xl mx-auto pb-8 border-b flex flex-col space-y-5 lg:space-y-10 text-gray-600 font-semibold">
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="w-full flex flex-col">
                        <p className="text-gray-400">CrowdFund NFT</p>
                        <ul className="leading-loose text-crayola-900">
                            <li className="flex flex-row items-center">
                                <Link href="/about" passHref as="/about.html">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        About
                                    </a>
                                </Link>
                            </li>
                            <li className="flex flex-row items-center">
                                <Link href="/p/terms" passHref as="/p/terms.html">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Terms
                                    </a>
                                </Link>
                            </li>
                            <li className="flex flex-row items-center">
                                <Link href="/p/project-creator-guide" passHref as="/p/project-creator-guide.html">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Project creator guide
                                    </a>
                                </Link>
                            </li>
                            <li className="flex flex-row items-center">
                                <Link href="/create-a-project" passHref as="/create-a-project.html">
                                    <a
                                        className="hover:underline cursor-pointer"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        List your project
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex flex-col">
                        <p className="text-gray-400">Connect with us</p>
                        <ul className="leading-loose text-crayola-900">
                            <li className="flex flex-row items-center">
                                <a
                                    className="hover:underline cursor-pointer"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://twitter.com/crowdfundnft"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li className="flex flex-row items-center">
                                <a
                                    className="hover:underline cursor-pointer"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://discord.gg/uWEbFHBEHz"
                                >
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-end">
                    <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-end">
                        <img src="/assets/logo.png" className="w-6/12" />
                        <p className="font-light text-sm mt-2">info [at] crowdfund-nft.com</p>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-5xl mx-auto py-4 text-md">
                <p className="text-gray-800 text-center lg:text-right">
                    🤖 {(new Date()).getFullYear()} CrowdFund NFT
                </p>
            </div>
        </footer>
    );
}
