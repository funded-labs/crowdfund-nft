import GuideItem from './guide-item'
import guides from './guides'

export default function UserGuides() {
  return (
    <section className='w-full bg-white py-10 text-gray-700'>
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4'>
        <div className='w-full py-3 text-left text-3xl font-semibold'>
          Guides
        </div>
        <p className='w-full text-left text-sm'>
          Detailed guides on becoming a project creator on CrowdFund NFT
        </p>
        <div className='grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-12'>
          {guides.map((guide, index) => (
            <GuideItem key={index} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  )
}
