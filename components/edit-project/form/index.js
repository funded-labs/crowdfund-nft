import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'
import { ProjectFormProvider } from './project-form-context'
import Input from '@/components/forms/input'
import Textarea from '@/components/forms/textarea'
import { Spinner } from '@/components/shared/loading-spinner'
import { Formik } from 'formik'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    title: Yup.string().required('Enter a title for your project'),
    category: Yup.string().required('Select a category for your project'),
    twitterLink: Yup.string().required('Enter Twitter link for your project'),
    discordLink: Yup.string(),
    goal: Yup.number()
        .positive('Target raise must be greater than zero')
        .integer('Target raise must be a whole number')
        .required('Enter a raise amount'),
    nftVolume: Yup.number()
        .positive('Number of NFTs must be greater than zero')
        .integer('Number of NFTs must be a whole number')
        .required('Enter a number of NFTs'),
    walletId: Yup.string(),
    wetransferLink: Yup.string().required(
        'You must enter a valid WeTransfer for your NFT art.'
    ),
    story: Yup.string().required('Enter details about your project'),
    rewards: Yup.string().required(
        'Enter details about the rewards project backers will receive'
    ),
})

export default function EditProjectForm({ instruction, onSuccess }) {
    return (
        <ProjectFormProvider>
            <Form />
        </ProjectFormProvider>
    )
}

const Form = () => {
    const [loading, setLoading] = useState(false)
    const backend = useBackend().backendWithAuth

    const router = useRouter()
    const { projectId } = router.query

    const {
        data: project,
        isLoading,
        isError,
        isFetching,
    } = useQuery(
        ['project-details', projectId, backend],
        async () => {
            if (!backend) return null
            if (!projectId) return null

            return await backend.getProject(projectId)
        },
        {
            refetchOnWindowFocus: false,
        }
    )

    if (!project) return <></>

    const handleSubmit = async (form) => {
        setLoading(true)

        const newProject = { ...project, ...form }

        backend
            .updateProject(newProject)
            .catch((e) => console.error(e))
            .finally(() => setLoading(false))
    }

    const initialValues = {
        title: project.title,
        category: project.category,
        twitterLink: project.twitterLink,
        discordLink: project.discordLink,
        goal: Number(project.goal),
        nftVolume: Number(project.nftVolume),
        walletId: project.walletId,
        wetransferLink: project.wetransferLink,
        story: project.story,
        rewards: project.rewards,
    }

    return (
        <div className='w-full sm:mx-auto sm:max-w-lg px-4'>
            <div className='bg-white pt-8 px-4 flex flex-col space-y-6'>
                <div className='border border-slate-400 rounded-lg bg-slate-100'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={formSchema}>
                        {({
                            handleSubmit,
                            handleBlur,
                            handleChange,
                            setFieldValue,
                            errors,
                            values,
                        }) => (
                            <form
                                className='w-full flex flex-col'
                                onSubmit={handleSubmit}>
                                <div className='px-4 py-4'>
                                    Edit Project
                                    <div className='text-xs'>
                                        You can edit the project as the owner or
                                        an admin.
                                    </div>
                                </div>
                                <div className='px-4 py-4 border-t border-slate-300 space-y-2'>
                                    <p className='text-sm'>Title</p>
                                    <Input
                                        id='projectTitle'
                                        name='title'
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        placeholder='Project name'
                                    />
                                    <p className='text-sm'>Category</p>
                                    <Input
                                        id='projectCategory'
                                        name='category'
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        placeholder='Category'
                                    />
                                    <p className='text-sm'>
                                        Social Media Links
                                    </p>
                                    <div className='w-full grid grid-cols-2 gap-4'>
                                        <Input
                                            id='twitterLink'
                                            name='twitterLink'
                                            value={values.twitterLink}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type='text'
                                            placeholder='Twitter link'
                                        />
                                        <Input
                                            id='discordLink'
                                            name='discordLink'
                                            value={values.discordLink}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type='text'
                                            placeholder='Discord link'
                                        />
                                    </div>
                                    <p className='text-sm'>Goal</p>
                                    <Input
                                        name='goal'
                                        value={values.goal}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter target amount'
                                        type='number'
                                        endItem={() => (
                                            <p className='font-bold text-black'>
                                                ICP
                                            </p>
                                        )}
                                    />
                                    <p className='text-sm'>NFT volume</p>
                                    <Input
                                        name='nftVolume'
                                        value={values.nftVolume}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Enter target amount'
                                        type='number'
                                        endItem={() => (
                                            <p className='font-bold text-black'>
                                                NFTs
                                            </p>
                                        )}
                                    />
                                    <p className='text-sm'>Wallet ID</p>
                                    <Input
                                        id='walletId'
                                        name='walletId'
                                        value={values.walletId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        placeholder='Wallet ID'
                                    />
                                    <p className='text-sm'>Wetransfer link</p>
                                    <Input
                                        name='wetransferLink'
                                        value={values.wetransferLink}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        placeholder='WeTransfer link for your NFT'
                                    />
                                    <p className='text-sm'>Project story</p>
                                    <Textarea
                                        name='story'
                                        value={values.story}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={4}
                                    />
                                    <p className='text-sm'>Project rewards</p>
                                    <Textarea
                                        name='rewards'
                                        value={values.rewards}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={4}
                                    />
                                </div>
                                <div className='px-4 py-4 border-t border-slate-300 '>
                                    <button
                                        disabled={loading === true}
                                        type='submit'
                                        className={`
                            flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                            px-4 font-medium text-base tracking-wider rounded-xl
                            shadow-xl hover:bg-blue-700
                        `}>
                                        {!loading && <>Save</>}

                                        {loading && (
                                            <span className='h-5 w-5'>
                                                <Spinner show={true} />
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='bg-white py-4 px-4 flex flex-col space-y-6'>
                <div className='border border-red-400 rounded-lg bg-red-100'>
                    <div className='px-4 py-4'>
                        Admin Functions
                        <div className='text-xs'>
                            You will only be able to call these functions as an
                            admin.
                        </div>
                    </div>
                    <div className='px-4 py-4 border-t border-red-200'>
                        <button
                            className={`
                                flex flex-row justify-center w-full 
                                bg-black text-white py-2 font-medium 
                                text-sm tracking-wider rounded-xl shadow-xl 
                                hover:bg-gray-800`}>
                            Approve Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
