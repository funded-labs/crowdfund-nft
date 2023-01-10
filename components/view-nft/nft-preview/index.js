import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'

export default function NftPreview() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!location) return

    setUrl(location.href)
  }, [])

  return (
    <section className='w-full bg-white'>
      <div className='flex w-full flex-col px-4 px-4 py-5 sm:mx-auto sm:max-w-md'>
        <div className='rounded-3xl border bg-gray-100 p-8 shadow-lg'>
          <QRCode
            value={url}
            bgColor='transparent'
            fgColor='#2563eb'
            size='1024'
            style={{ width: '100%', height: 'auto' }}
          />
          <div className='flex w-full flex-col pt-5 text-sm sm:flex-row'>
            <div className='flex w-full flex-col space-y-2 sm:w-6/12'>
              <div className='flex w-full flex-row items-center space-x-1'>
                <div className='h-12 w-12 rounded-xl bg-gray-300' />
                <div className='flex flex-col font-bold'>
                  <p>CrowdFund NFT</p>
                  <p>#241</p>
                </div>
              </div>
              <div className=''>Mint Date: March 1, 2022 Blockchain: ICP</div>
              <div className=''>241 of 300</div>
            </div>
            <div className='w-full text-right sm:w-6/12'>
              <p className='font-bold'>Rewards</p>
              <ul className='text-sm'>
                <li>Discord benefits</li>
                <li>Free project posting</li>
                <li>Early access to new projects</li>
                <li>Rarity raffle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
