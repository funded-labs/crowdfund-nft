export default function Story({ isLoading }) {
    if (isLoading) {
        return (
            <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col space-y-2 items-start">
                <div className="w-16 h-6 rounded bg-gray-200 animate-pulse" />
    
                <div className="h-4 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-4 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-4 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-4 rounded bg-gray-200 animate-pulse w-7/12" />

                <div className="py-5" />

                <div className="h-4 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-4 rounded bg-gray-200 animate-pulse w-full" />
                <div className="h-4 rounded bg-gray-200 animate-pulse w-4/12" />
            </div>
        );
    }

    return (
        <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start">
            <p className="font-bold text-base text-black">
                Story
            </p>

            {/* User Input */}
            <p className="text-gray-600 my-10">
                Formerly known as Happy Valley Boots and Sandals, Good Company is led by Vlad
                Chvroun, a footwear innovation specialist who has worked directly with brands
                like Redwing, Nike, Adidas as both consultant and engineer on many concepts
                and projects. Along with his role on the founding team that helped launch Altra
                Running, he has collaborated extensively with industry titans like Roy Smith,
                Tinker Hatfield, and Bruce Kilgore, and also designed the patented &quot;Shoes That
                Grow&quot;. Vlad&apos;s extensive background in biomechanics and high-performance shoes
                shows in Good Company&apos;s boots, incorporating concepts and innovation typically
                reserved for performance shoes to create a durable, high-quality, and comfortable
                boot that fits and feels like no other.
            </p>
        </div>
    )
}