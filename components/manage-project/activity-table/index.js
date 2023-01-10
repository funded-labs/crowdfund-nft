export default function ActivityTable() {
  return (
    <section className='w-full bg-white'>
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4 py-5'>
        <h3 className='text-2xl font-medium'>Activity</h3>
        <div className='flex w-full flex-col space-y-4'>
          <table className='w-full text-left text-sm text-gray-500'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Backer principal
                </th>
                <th scope='col' className='px-6 py-3'>
                  NFTs bought
                </th>
                <th scope='col' className='px-6 py-3'>
                  At price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b bg-white'>
                <td className='truncate whitespace-nowrap px-6 py-4'>
                  prin-cip-al563
                </td>
                <td className='truncate whitespace-nowrap px-6 py-4'>5</td>
                <td className='truncate whitespace-nowrap px-6 py-4'>
                  100 ICP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
