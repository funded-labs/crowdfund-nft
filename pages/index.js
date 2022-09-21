import ProjectList from '../components/home/project-list'
import Hero from '../components/home/hero'
import Navbar from '../components/shared/navbar'
import Footer from '@/components/shared/footer'
import Entrepot2 from '@/components/home/entrepot2'
import Setup from '@/components/home/setup'
import Banner from '@/components/home/banner'
import CategoryRow from '@/components/shared/categoryRow'
import { useRouter } from 'next/router'

const HomePage = () => {
    const router = useRouter()

    const navigateToCategory = (category) => {
        router.push(
            `/search?category=${category}`,
            `/search.html?category=${category}`
        )
    }

    return (
        <div className='w-full'>
            <Navbar />

            <Banner />

            <Hero />

            <CategoryRow onClick={navigateToCategory}/>

            <ProjectList
                header='Live Projects'
                queryName='live-projects'
                statuses={['whitelist', 'live']}
            />

            {/*
            <ProjectList
                header='Supernova Projects'
                queryName='supernova-projects'
                categories={['supernova']}
            />
            */}

            <ProjectList
                header='Projects Going Live Soon'
                queryName='live-soon-projects'
                statuses={['approved']}
            />

            <ProjectList
                header='Fully Funded Projects'
                queryName='fully-funded-projects'
                statuses={['fully_funded']}
            />

            <br />
            <br />

            <Entrepot2 />

            <Setup />

            <ProjectList
                header='Archived Projects'
                queryName='archived-projects'
                statuses={[null]}
            />

            <br />
            <br />

            <Footer />
        </div>
    )
}

export default HomePage
