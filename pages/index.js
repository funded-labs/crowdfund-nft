import ProjectList from '../components/home/project-list'
import Hero from '../components/home/hero'
import Navbar from '../components/shared/navbar'
import Footer from '@/components/shared/footer'
import Entrepot2 from '@/components/home/entrepot2'
import Setup from '@/components/home/setup'

const HomePage = () => (
    <div className='w-full'>
        <Navbar />

        <Hero />

        <ProjectList
            header='Live Projects'
            queryName='live-projects'
            statuses={['whitelist', 'live']}
        />

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

        <Entrepot2 />

        <Setup />

        <Footer />
    </div>
)

export default HomePage
