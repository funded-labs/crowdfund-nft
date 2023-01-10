import members from './members'

export default function Team() {
  return (
    <section className='w-full bg-white py-10 text-gray-700'>
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4'>
        <div className='w-full py-3 text-center text-3xl font-semibold'>
          Our team
        </div>
        <p className='w-full text-center text-sm'>
          A group of serial entrepreneurs, passionate about Web3 and funding new
          ventures
        </p>
        <div className='grid w-full grid-cols-2 gap-12 py-8 md:grid-cols-4'>
          {members.map((member, index) => (
            <div
              key={index}
              className='h-42 group relative w-full overflow-hidden rounded-3xl'
            >
              <img src={member.imgUrl} className='h-full w-full object-cover' />
              <div
                className={`
                                    absolute top-0 left-0 flex h-full w-full flex-col
                                    items-center justify-center space-x-2
                                    overflow-hidden bg-blue-600 bg-opacity-70 text-white opacity-0
                                    duration-300 group-hover:opacity-100
                                `}
              >
                <p className='text-lg font-bold'>{member.name}</p>
                <p className='text-base font-medium'>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
