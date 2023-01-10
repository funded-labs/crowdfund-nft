import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useBackend } from '@/context/backend'
import NftPreview from '@/components/view-nft/nft-preview'

export default function ProjectDetails() {
  const router = useRouter()
  const { id } = router.query
  const { backend } = useBackend()

  const {
    data: nftInfo,
    isLoading,
    isError,
    isFetching,
  } = useQuery(
    ['nft-details', id, backend],
    async () => {
      if (!backend) return null
      if (!id) return null

      const info = await backend.getNFTInfo(id)
      if (Array.isArray(info)) return info[0]
      return info
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <div className='w-full bg-gray-50'>
      <Navbar />

      <section className='w-full bg-white'>
        <div className='flex w-full flex-col px-4 py-5 sm:mx-auto sm:max-w-md'>
          <p className='mb-3 text-center text-2xl font-medium'>NFT Reference</p>

          <p className='mx-auto max-w-lg text-center text-xs'>
            Use this page to explore rewards associated to your NFT - and your
            contractual agreement with the project creator.
          </p>

          {nftInfo && nftInfo?.canisterId && nftInfo?.index !== undefined && (
            <img
              src={`https://${nftInfo.canisterId}.raw.ic0.app/?asset=${Number(
                nftInfo.index,
              )}`}
              className='mx-auto mt-5 w-full'
            />
          )}
        </div>
      </section>

      {/* <NftPreview /> */}

      <Footer />
    </div>
  )

  if (isLoading || isError || isFetching || !project) {
    return (
      <div className='w-full bg-gray-50'>
        <Navbar />

        <section className='w-full bg-white'>
          <div className='flex w-full flex-col px-4 py-5 sm:mx-auto sm:max-w-md'>
            <p className='mb-3 text-center text-2xl font-medium'>
              NFT Reference
            </p>

            <p className='mx-auto max-w-lg text-center text-xs'>
              Use this page to explore rewards associated to your NFT - and your
              contractual agreement with the project creator.
            </p>
          </div>
        </section>

        <NftPreview />

        <Footer />
      </div>
    )
  }
}
