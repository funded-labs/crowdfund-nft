export default function GuideItem({ guide }) {
    const { name, type, link } = guide;

    if (type === "external-pdf") {
        return (
            <a
                className="bg-white border rounded-lg py-3 px-6 shadow font-medium flex flex-row items-center hover:text-blue-600 cursor-pointer"
                href={link}
                target="_blank"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{name}</span>
            </a>
        )
    }

    return (
        <div className="bg-white border rounded-lg py-3 px-6 shadow font-medium flex flex-row items-center hover:text-blue-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{name}</span>
        </div>
    )
}