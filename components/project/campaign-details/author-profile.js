import Link from "next/link";

export default function AuthorProfile() {
    return (
        <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-center">
            <figure
                className="rounded-full w-14 h-14 bg-gray-300"
            >
                {/* <img src="" /> */}
            </figure>
            <div className="flex flex-col items-start w-full mt-4">
                <p className="font-semibold text-black text-lg">
                    Kelly Salone
                </p>
                <p className="font-medium text-black text-sm mb-3">
                    1 project created
                </p>
                <p className="text-gray-500 text-xs">
                    I am a comic book designer based in San Francisco, where
                    I have been attempting to recreate the famous Comic Book
                    series from 1930s...
                </p>
                <Link href="/author/placeholder">
                    <a className="font-bold text-blue-500 text-xs mt-1 py-1 px-2 hover:bg-gray-100 rounded">
                        See more
                    </a>
                </Link>
            </div>
        </div>
    )
}