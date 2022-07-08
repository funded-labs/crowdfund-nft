import { useRouter } from 'next/router'
import { useBackend } from '@/context/backend'

import EditProjectForm from './edit-project'
import AdminButtons from './admin-buttons'

const EditProjectPage = () => {
    const backend = useBackend().backendWithAuth
    const router = useRouter()
    const { projectId } = router.query
    return (
        <div className='w-full sm:mx-auto sm:max-w-lg px-4'>
            <EditProjectForm {...{ backend, projectId }} />
            <AdminButtons {...{ backend, projectId }} />
        </div>
    )
}

export default EditProjectPage
