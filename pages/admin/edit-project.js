// import CreateAProjectForm from '@/components/create-a-project/form'
import Navbar from '@/components/shared/navbar'
import PromptLoginModal from '@/components/shared/prompt-login-modal'
import { useBackend } from '@/context/backend'
import { useEffect, useState } from 'react'

import EditProjectForm from '@/components/edit-project/form'

export default function EditProject() {
    const backend = useBackend().backendWithAuth
    const [showLoginModal, setLoginModal] = useState(false)

    useEffect(() => {
        if (backend) return setLoginModal(false)
        setLoginModal(true)
    }, [backend])

    if (showLoginModal === true) {
        return <PromptLoginModal />
    }

    return (
        <div className='w-full'>
            <Navbar />
            <EditProjectForm admin/>
        </div>
    )
}
