export default function ViewOnMarketplace({ project }) {
    const { marketplace } = project

    if (
        !project?.status?.[0]?.hasOwnProperty('fully_funded') ||
        !Array.isArray(marketplace) ||
        !marketplace.some((e) => e.hasOwnProperty('entrepot'))
    )
        return <></>

    const link = marketplace.find((e) => e.hasOwnProperty('entrepot')).entrepot
    return (
        <div className='w-full flex flex-col space-y-2'>
            <a
                href={link}
                target='_blank'
                className='h-12 bg-[#00d092] mx-10 py-1 px-2 rounded-lg overflow-hidden flex flex-row justify-center hover:opacity-75 cursor-pointer leading-10 font-bold text-sm'>
                Trade on
                <img
                    src='/assets/entrepot-logo.png'
                    className='object-contain h-full py-1 ml-2'
                />
            </a>
        </div>
    )
}
