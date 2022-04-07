import { useQuery } from 'react-query'
// import * as prettyDate from 'pretty-date'

// const _records = [
//     {
//         price: 0.01,
//         from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
//         to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
//         time: new Date(),
//     },
//     {
//         price: 0.01,
//         from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
//         to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
//         time: new Date(),
//     },
//     {
//         price: 0.01,
//         from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
//         to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
//         time: new Date(),
//     },
//     {
//         price: 0.01,
//         from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
//         to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
//         time: new Date(),
//     },
//     {
//         price: 0.01,
//         from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
//         to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
//         time: new Date(),
//     },
// ]

export default function Activity({ escrowActor }) {
    const {
        data: activity,
        isLoading,
        // isError,
        // isFetching,
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

    console.log({ activity })

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

    // return (
    //     <div className='w-full'>
    //         <div className='w-full max-w-5xl mx-auto'>
    //             <div className='relative overflow-x-auto rounded py-10'>
    //                 <table className='w-full text-sm text-left text-gray-500'>
    //                     <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
    //                         <tr>
    //                             <th scope='col' className='px-6 py-3'>
    //                                 Price
    //                             </th>
    //                             <th scope='col' className='px-6 py-3'>
    //                                 From
    //                             </th>
    //                             <th scope='col' className='px-6 py-3'>
    //                                 To
    //                             </th>
    //                             <th scope='col' className='px-6 py-3'>
    //                                 Time
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {_records.map((record) => (
    //                             <tr className='bg-white border-b'>
    //                                 <td
    //                                     scope='row'
    //                                     className='px-6 py-4 flex flex-row space-x-1 shrink-0 truncate items-center font-medium text-black'>
    //                                     <img
    //                                         src='/assets/IClogo.png'
    //                                         className='h-4'
    //                                     />
    //                                     <span>{record.price} ICP</span>
    //                                 </td>
    //                                 <td
    //                                     className='px-6 py-4 truncate whitespace-nowrap'
    //                                     title={record.from}>
    //                                     {record.from.substring(0, 10)}...
    //                                 </td>
    //                                 <td
    //                                     className='px-6 py-4 truncate whitespace-nowrap'
    //                                     title={record.to}>
    //                                     {record.to.substring(0, 10)}...
    //                                 </td>
    //                                 <td className='px-6 py-4 truncate whitespace-nowrap'>
    //                                     {prettyDate.format(record.time)}
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // )
}
