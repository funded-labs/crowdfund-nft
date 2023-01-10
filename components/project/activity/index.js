import { useQuery } from 'react-query'

export default function Activity({ project, escrowActor }) {
  const currency =
    Object.keys(project?.fundingType?.[0]?.[0] || {})?.[0]?.toUpperCase() ||
    'ICP'

  const { data: activity, isLoading } = useQuery(
    ['escrow-activity', escrowActor],
    async () => {
      if (!escrowActor) return null

      return escrowActor
        .getAccountsInfo()
        .then((csv) => {
          const rowsStr = csv.split('\n').slice(1)
          const isNewEscrow = rowsStr[0].indexOf(', ') === -1
          const rows = rowsStr
            .filter((row) => row.indexOf(',') >= 0)
            .map((row) => row.split(isNewEscrow ? ',' : ', '))
          const activityObj = {}
          rows.forEach((row) => {
            if (row[2] !== 'funded') return
            const key = [row[1], isNewEscrow ? Number(row[4]) : 0]
            if (!activityObj.hasOwnProperty(key)) activityObj[key] = 0
            activityObj[key] += 1
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
    },
  )

  const getNftPrice = (row) => {
    const [principal, nftIndex] = row[0].split(',')
    const nftStats = project.stats.nftStats[nftIndex]
    const price = currency === 'ICP' ? nftStats.priceE8S : nftStats.priceSatoshi

    return `${price / 100_000_000} ${currency}`
  }

  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='relative overflow-x-auto rounded py-10'>
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
              {isLoading ? (
                <tr className='border-b bg-white'>
                  <td
                    colSpan='3'
                    className='truncate whitespace-nowrap px-6 py-4 text-center'
                  >
                    Loading...
                  </td>
                </tr>
              ) : !activity || !activity.rows || activity.rows.length === 0 ? (
                <tr className='border-b bg-white'>
                  <td
                    colSpan='3'
                    className='truncate whitespace-nowrap px-6 py-4 text-center'
                  >
                    No activity yet
                  </td>
                </tr>
              ) : (
                activity.rows.map((row) => {
                  const [principal, nftIndex] = row[0].split(',')
                  return (
                    <tr key={principal} className='border-b bg-white'>
                      <td className='truncate whitespace-nowrap px-6 py-4'>
                        {principal}
                      </td>
                      <td className='truncate whitespace-nowrap px-6 py-4'>
                        {row[1]}
                      </td>
                      <td className='truncate whitespace-nowrap px-6 py-4'>
                        {getNftPrice(row)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
