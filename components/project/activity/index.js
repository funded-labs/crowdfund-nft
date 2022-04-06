import { useQuery } from 'react-query'
import * as prettyDate from 'pretty-date'

const _records = [
    {
        price: 0.01,
        from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
        to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
        time: new Date(),
    },
    {
        price: 0.01,
        from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
        to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
        time: new Date(),
    },
    {
        price: 0.01,
        from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
        to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
        time: new Date(),
    },
    {
        price: 0.01,
        from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
        to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
        time: new Date(),
    },
    {
        price: 0.01,
        from: '35c9db2bff0d617f5a21007691371b3f0642ef3c435f5978be1c080a6401a742',
        to: '26f1173fba4749253b8c3559455e189c122178e3b4f47afdc6cba83ce3f81480',
        time: new Date(),
    },
]

export default function Activity({ escrowActor, records = [] }) {
    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['escrow-activity', escrowActor],
        async () => {
            if (!escrowActor) return null
        },
        {
            refetchOnWindowFocus: false,
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
                                    Price
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    From
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    To
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {_records.map((record) => (
                                <tr className='bg-white border-b'>
                                    <td
                                        scope='row'
                                        className='px-6 py-4 flex flex-row space-x-1 shrink-0 truncate items-center font-medium text-black'>
                                        <img
                                            src='/assets/IClogo.png'
                                            className='h-4'
                                        />
                                        <span>{record.price} ICP</span>
                                    </td>
                                    <td
                                        className='px-6 py-4 truncate whitespace-nowrap'
                                        title={record.from}>
                                        {record.from.substring(0, 10)}...
                                    </td>
                                    <td
                                        className='px-6 py-4 truncate whitespace-nowrap'
                                        title={record.to}>
                                        {record.to.substring(0, 10)}...
                                    </td>
                                    <td className='px-6 py-4 truncate whitespace-nowrap'>
                                        {prettyDate.format(record.time)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
