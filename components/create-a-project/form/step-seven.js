import { useRouter } from 'next/router'
import Link from 'next/link'

export default function StepSeven() {
  const router = useRouter()

  return (
    <div className='bg-clear flex w-full flex-col space-y-2 px-8 sm:p-0'>
      <div className='w-full space-y-1 sm:flex sm:grid-cols-2 sm:flex-row'>
        <div className='bg-clear flex flex-col px-4 py-4 sm:w-1/3'>
          <p className='pt-12 font-sans text-4xl font-bold tracking-tight text-neutral-900 sm:px-12'>
            Congratulations!
          </p>
          <p className='text-md pt-4 font-sans font-light text-neutral-500 sm:px-12'>
            We've received your submission and it will appear on CrowdFund NFT
            once it has been approved by our moderators. If we have any further
            questions we'll reach out.
          </p>
          <Link href='/' passHref>
            <a
              className={`
                        mt-4 flex w-2/3 flex-row justify-center rounded-xl bg-blue-600 py-3 text-base 
                        font-medium tracking-wider text-white shadow-xl
                        hover:bg-blue-700 sm:mx-12
                    `}
            >
              Back to homepage
            </a>
          </Link>

          <button
            className='w-full appearance-none py-4  text-left text-sm text-neutral-500 focus:outline-none sm:mx-12'
            onClick={() => router.reload()}
          >
            Submit another project
          </button>
        </div>
      </div>
    </div>
  )
}
