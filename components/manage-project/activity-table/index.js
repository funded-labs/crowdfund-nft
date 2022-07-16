export default function ActivityTable() {
    return (
        <section className='w-full bg-white'>
            <div className='w-full max-w-5xl mx-auto flex flex-col px-4 py-5'>
                <h3 className='text-2xl font-medium'>Activity</h3>
                <div className='w-full flex flex-col space-y-4'>
                <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
                            <tr
                                className='bg-white border-b'>
                                <td className='px-6 py-4 truncate whitespace-nowrap'>
                                    prin-cip-al563
                                </td>
                                <td className='px-6 py-4 truncate whitespace-nowrap'>
                                    5
                                </td>
                                <td className='px-6 py-4 truncate whitespace-nowrap'>
                                    100 ICP
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}