import { useRouter } from "next/router";
import Link from "next/link";

export default function StepSix() {
    const router = useRouter();

    return (
        <div
            className='w-full flex flex-col space-y-2'
        >
            <div className='w-full flex flex-col space-y-1'>
                <p className='font-semibold text-2xl text-blue-600'>
                    Congratulations!
                </p>
                <p className=''>We've received your submission and it will appear on CrowdFund NFT once it has been approved by our moderators. If we have any further questions we'll reach out.</p>
                
            </div>

            <Link href="/" passHref>
                <a
                    className={`
                        flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                        px-4 font-medium text-base tracking-wider rounded-xl
                        shadow-xl hover:bg-blue-700
                    `}
                >
                    Back to homepage
                </a>
            </Link>

            <button
                className='appearance-none w-full py-4 px-4 text-xs text-center text-gray-500 focus:outline-none'
                onClick={() => router.reload()}
            >
                Submit another project
            </button>
        </div>
    )
}
