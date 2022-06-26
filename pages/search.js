import ProjectList from "@/components/home/project-list"
import Navbar from "@/components/shared/navbar"
import Head from "next/head"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import CategoryRow from "@/components/shared/categoryRow"

const Search = () => {
  const router = useRouter()
  const { category, search } = router.query

  const [selectedCategory, setSelectedCategory] = useState(category)

  const lists = [
    { header: 'Live Projects', queryName: 'live-project', statuses: ['whitelist', 'live'] },
    { header: 'Projects Going Live Soon', queryName: 'live-soon-projects', statuses: ['approved'] },
    { header: 'Fully Funded Projects', queryName: 'fully-funded-projects', statuses: ['fully_funded'] }
  ]

  return (
    <div className='w-full'>
      <Head>
          <title>CrowdFund NFT</title>
      </Head>
      <Navbar />

      <div className='px-4 w-full max-w-5xl mx-auto uppercase font-medium text-gray-500 mt-20 mb-2'>
        {search && <p className="">Search results for: <b>{search}</b></p>}
      </div>

      <CategoryRow onClick={setSelectedCategory} selectedCategory={selectedCategory}/>

      {lists.map(({ header, queryName, statuses }, index) => (
        <ProjectList
          key={index}
          header={header}
          queryName={queryName}
          statuses={statuses}
          categories={selectedCategory ? [selectedCategory] : []}
          searchTerm={search || ''}
        />
      ))}
    </div>
  )
}

export default Search
