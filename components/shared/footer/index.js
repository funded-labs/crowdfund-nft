const links = [
    {
        title: "CrowdFund NFT",
        items: [
            // {
            //     label: "About",
            //     href: "/about"
            // },
            {
                label: "Privacy Policy",
                href: "/privacy"
            },
            {
                label: "List your project",
                href: "/create-a-project"
            },
            {
                label: "Crowdfunding on the IC",
                href: ""
            },
        ]
    },
    {
        title: "Popular Projects",
        items: [
            {
                label: "Project One",
                href: ""
            },
            {
                label: "Project Two",
                pillText: "featured",
                href: ""
            },
            {
                label: "Project Three",
                href: ""
            },
            {
                label: "Project Four",
                href: ""
            },
        ]
    },
    {
        title: "Categories",
        items: [
            {
                label: "Design",
                href: ""
            },
            {
                label: "Tech",
                href: ""
            },
            {
                label: "Crypto",
                href: ""
            }
        ]
    },
    {
        title: "Connect with us",
        items: [
            {
                label: "Twitter",
                href: ""
            },
            {
                label: "Discord",
                href: ""
            }
        ]
    }
]

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t py-10 text-sm px-4 lg:px-0">
            <div className="w-full max-w-5xl mx-auto pb-8 border-b flex flex-col space-y-5 lg:space-y-10 text-gray-600 font-semibold">
                <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {links.map((column, index) => (
                        <div key={index} className="w-full flex flex-col">
                            <p className="text-gray-400">{column.title}</p>
                            <ul className="leading-loose text-crayola-900">
                                {column.items.map((link, index) => (
                                    <li key={index} className="flex flex-row items-center">
                                        <a
                                            className="hover:underline cursor-pointer"
                                            href={link.href}
                                            target="_blank"
                                        >
                                            {link.label}
                                        </a>
                                        {link.pillText && (
                                            <span className="ml-1 px-1 py-px text-xs font-extralight bg-crayola-500 rounded text-white">
                                                {link.pillText}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col justify-center items-end">
                    <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-end">
                        <img src="/assets/logo.png" className="w-6/12" />
                        <p className="font-light text-sm mt-2">hello [at] crowdfundnft.com</p>
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