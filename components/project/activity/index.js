import { useQuery } from 'react-query'

export default function Activity({ escrowActor }) {
    const { data: activity, isLoading } = useQuery(
        ['escrow-activity', escrowActor],
        async () => {
            if (!escrowActor) return null

            return escrowActor
                .getAccountsInfo()
                .then((csv) => {
                    const rowsStr = csv.split('\n').slice(1)
                    const rows = rowsStr
                        .filter((row) => row.indexOf(',') >= 0)
                        .map((row) => row.split(', '))
                    const activityObj = {}
                    rows.forEach((row) => {
                        if (row[2] !== 'funded') return
                        if (!activityObj.hasOwnProperty(row[1]))
                            activityObj[row[1]] = 0
                        activityObj[row[1]] += 1
                    })
                    return {
                        rows: Object.entries(activityObj),
                    }
                })
                .catch((e) => {
                    console.error(e)
                    return {
                        rows: [],
                    }
                })
        },
        {
            refetchOnWindowFocus: true,
        }
    )

    return (
        <div className='w-full'>
            <div className='w-full max-w-5xl mx-auto'>
                <div className='relative overflow-x-auto rounded py-10'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Backer principal
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    NFTs bought
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr className='bg-white border-b'>
                                    <td
                                        colSpan='2'
                                        className='px-6 py-4 truncate whitespace-nowrap text-center'>
                                        Loading...
                                    </td>
                                </tr>
                            ) : !activity ||
                              !activity.rows ||
                              activity.rows.length === 0 ? (
                                <tr className='bg-white border-b'>
                                    <td
                                        colSpan='2'
                                        className='px-6 py-4 truncate whitespace-nowrap text-center'>
                                        No activity yet
                                    </td>
                                </tr>
                            ) : (
                                activity.rows.map((row) => (
                                    <tr
                                        key={row[0]}
                                        className='bg-white border-b'>
                                        <td className='px-6 py-4 truncate whitespace-nowrap'>
                                            {row[0]}
                                        </td>
                                        <td className='px-6 py-4 truncate whitespace-nowrap'>
                                            {row[1]}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
