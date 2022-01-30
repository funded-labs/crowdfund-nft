import CreateAProjectForm from '@/components/create-a-project/form'
import Navbar from '@/components/shared/navbar'
import PromptLoginModal from '@/components/shared/prompt-login-modal'
import { useBackend } from '@/context/backend'
import { useEffect, useState } from 'react'

export default function CreateAProject() {
    const backend = useBackend().backendWithAuth
    const [showLoginModal, setLoginModal] = useState(false)

    useEffect(() => {
        if (backend) {
            setLoginModal(false)
            return
        }

        setLoginModal(true)
    }, [backend])

    if (showLoginModal === true) {
        return <PromptLoginModal />
    }

    return (
        <div className='w-full'>
            <Navbar />
            <CreateAProjectForm />
        </div>
    )
}
