import { useQuery } from 'react-query'

export default function Activity({ escrowActor }) {
    const {
        data: activity,
        isLoading
    } = useQuery(
        ['escrow-activity', escrowActor],
        async () => {
            if (!escrowActor) return null

            return escrowActor
                .getAccountsInfo()
                .then((csv) => {
                    csv =
                        'accountId, principal, subaccountStatus, subaccountBlob\n4f7a31b5d7eca335d2b9e82ac799231ad842841ce0d9f292ab589cf892a5985c, aalab-lo73x-usxmq-af2lz-ipo4f-xws4l-rmtfk-i2522-tj6u4-hmbuk-gqe, funded, 000000000000000000000000000000000000000000000000000000003b9aca59\n73233b156170678ca3ff16d481f16c890f883a71213f1d9efe62e88498e2c514, tzhlj-a4lbg-wpyr4-b7w2h-ty3mz-lu7rj-rv6sy-t5bdd-l6o4x-2zk4r-pae, funded, 000000000000000000000000000000000000000000000000000000003b9aca61'
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
                    console.log(Object.entries(activityObj))
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
                                    <td colSpan='2' className='text-center'>
                                        Loading...
                                    </td>
                                </tr>
                            ) : !activity ||
                              !activity.rows ||
                              activity.rows.length === 0 ? (
                                <tr className='bg-white border-b'>
                                    <td colSpan='2' className='text-center'>
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
