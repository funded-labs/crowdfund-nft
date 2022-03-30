export default function StaticPageHeader({ title, description }) {
    return (
        <header
            className="relative w-full lg:bg-opacity-100 lg:bg-gray-100 md:h-96 flex flex-col lg:flex-row lg:space-x-5"
        >
            <img src="/assets/radiant-gradient.svg" className="object-cover w-full" />
            <div className="px-4 w-full h-full absolute top-0 left-0 py-10 text-white flex flex-col justify-center">
                <div className="w-full max-w-prose mx-auto">
                    <h1 className="font-bold text-3xl lg:text-5xl mb-5">
                        {title}
                    </h1>

                    <p className="text-gray-200 font-light md:text-xl mb-10">
                        {description}
                    </p>
                </div>
            </div>
        </header>
    )
}