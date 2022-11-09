import { useRouter } from "next/router";
import Link from "next/link";

export default function StepSeven() {
    const router = useRouter();

    return (
        <div
            className='px-8 sm:p-0 w-full bg-clear flex flex-col space-y-2'
        >
            <div className='w-full sm:flex sm:flex-row sm:grid-cols-2 space-y-1'>
            <div className="flex flex-col bg-clear px-4 py-4 sm:w-1/3">
                <p className='font-bold text-4xl sm:px-12 pt-12 text-neutral-900 tracking-tight font-sans'>
                    Congratulations!
                </p>
                <p className='font-light text-md sm:px-12 pt-4 text-neutral-500 font-sans'>We've received your submission and it will appear on CrowdFund NFT once it has been approved by our moderators. If we have any further questions we'll reach out.</p>
                <Link href="/" passHref>
                <a
                    className={`
                        flex flex-row justify-center sm:mx-12 w-2/3 mt-4 bg-blue-600 text-white py-3 
                        font-medium text-base tracking-wider rounded-xl
                        shadow-xl hover:bg-blue-700
                    `}
                >
                    Back to homepage
                </a>
            </Link>

            <button
                className='appearance-none w-full py-4  text-sm text-left sm:mx-12 text-neutral-500 focus:outline-none'
                onClick={() => router.reload()}
            >
                Submit another project
            </button>
                </div>
                
            </div>

        
        </div>
    )
}
