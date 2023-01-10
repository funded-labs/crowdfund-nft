import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Success() {
  // todo:
  // if it's possible to call the backend with
  // some kind of ID to prevent users directly navigating
  // to this page, and also show a slightly customised message
  // that would be good...

  useEffect(() => {
    confetti()
  }, [])

  const handleShare = () => {
    if (!window) return

    const message = encodeURI(
      `I just backed a project on @crowdfundnft. Help get it fully funded!`,
    )

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const projectId = urlParams.get('projectId')
    const url = encodeURI(
      `https://kn5ky-6iaaa-aaaai-qbikq-cai.ic0.app/${
        projectId ? `project.html?projectId=${projectId}` : ''
      }`,
    )

    window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
  }

  return (
    <div className='flex w-full flex-col'>
      <Head>
        <title>You have successfully backed a project on CrowdFund NFT!</title>
      </Head>
      <Navbar />

      <div className='flex h-screen w-screen flex-col justify-center bg-white'>
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center space-y-4 px-4'>
          <p className='text-center text-5xl font-bold text-blue-600 lg:text-7xl'>
            Congratulations!
          </p>
          <p className='max-w-xl text-center text-gray-500'>
            Thank you for backing a project on CrowdFund NFT! If the project
            reaches its funding goal, your NFT will be transferred to your
            wallet - if the project does not get fully funded, you will be
            reimbursed.
          </p>

          <p className='max-w-xl text-center'>
            Keep an eye out for our progress, and check your wallet once the
            crowdfunding round ends!
          </p>
          <Link href='/' passHref>
            <a className='text-sm hover:text-blue-600'>
              &larr; Back to homepage
            </a>
          </Link>

          <div className='w-full max-w-lg pt-10'>
            <div
              className={`
                                flex -rotate-1 flex-row justify-between rounded-lg
                                border duration-300 hover:rotate-0
                            `}
            >
              <div className='flex flex-col items-start justify-center p-4'>
                <p>
                  Make sure this project gets fully funded by sharing it with
                  your friends!
                </p>
              </div>
              <button
                className={`
                                    flex w-3/12 cursor-pointer appearance-none flex-row items-center justify-center
                                    overflow-hidden bg-gray-100 p-2 text-blue-400
                                    duration-200 hover:bg-blue-400 hover:text-white focus:outline-none
                                `}
                type='button'
                onClick={handleShare}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  width='30'
                  height='30'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
