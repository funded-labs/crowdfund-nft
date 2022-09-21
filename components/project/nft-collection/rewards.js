export default function Rewards({ isLoading, project }) {
    if (isLoading) {
        return (
            <div className='w-full shadow p-4 rounded-2xl bg-white flex flex-col space-y-2 items-start'>
                <div className='w-16 h-6 rounded bg-gray-200 animate-pulse' />

                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-7/12' />

                <div className='py-5' />

                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-full' />
                <div className='h-4 rounded bg-gray-200 animate-pulse w-4/12' />
            </div>
        )
    }

    const { rewards } = project

    return (
        <div className='w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start'>
            <p className='font-bold text-base text-black'>Rewards</p>

            <div className='text-gray-600 my-10 whitespace-pre-line whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: rewards }}/>
        </div>
    )
}
