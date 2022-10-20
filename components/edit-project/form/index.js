import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useBackend } from '@/context/backend'
import { ProjectFormProvider } from './project-form-context'
import Input from '@/components/forms/input'
import Textarea from '@/components/forms/textarea'
import { Spinner } from '@/components/shared/loading-spinner'
import { Formik } from 'formik'
import * as Yup from 'yup'
import RichTextArea from '@/components/forms/richTextArea'
import Select from '@/components/forms/select'
import projectCategories from '@/helpers/projectCategories'
import { getImageURL, makeImagesActor } from '@/ui/service/actor-locator'
import { imgFileToInt8Array } from '@/helpers/imageHelper'
import UserForm from '@/components/edit-user/form'

const formSchema = Yup.object().shape({
    title: Yup.string().required('Enter a title for your project'),
    category: Yup.string().required('Select a category for your project'),
    cover: Yup.string().required('Input a cover image url'),
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

export default function EditProjectForm({ instruction, onSuccess, admin }) {
    return (
        <ProjectFormProvider>
            <Form admin={admin}/>
        </ProjectFormProvider>
    )
}

const Form = ({ admin }) => {
    const [loading, setLoading] = useState({
        saveButton: false,
        approveButton: false,
        unapproveButton: false,
        whitelistButton: false,
        liveButton: false,
    })
    const backend = useBackend().backendWithAuth
    const imageActor = makeImagesActor()

    const setLoadingState = (key, value) => {
        setLoading({
            ...loading,
            [key]: value,
        })
    }

    const router = useRouter()
    const { projectId } = router.query

    const { data: project, error } = useQuery(
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

    const uploadImage = useCallback(async (image) => {
        const coverImg = {
            name: image.name,
            payload: {
                ctype: image.type,
                data: [await imgFileToInt8Array(image)],
            },
        }
        const imageUrl = getImageURL(await imageActor.addAsset(coverImg))
        return imageUrl
    }, [imageActor, getImageURL, imgFileToInt8Array])

    if (!project) return <></>

    const handleSubmit = async (form) => {
        setLoadingState('saveButton', true)

        const newProject = { ...project, ...form }

        backend
            .updateProject(newProject)
            .catch((e) => console.error(e))
            .finally(() => setLoadingState('saveButton', false))
    }

    const updateStatus = (func, key) => {
        setLoadingState(key, true)
        func(project.id)
            .then(() => alert('Done!'))
            .catch((e) => {
                console.error(e)
                alert(e)
            })
            .finally(() => setLoadingState(key, false))
    }

    const initialValues = {
        title: project.title,
        category: project.category,
        cover: project.cover,
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
                <UserForm userId={project?.owner} uploadImage={uploadImage} />
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
                                    <Select
                                        name='category'
                                        value={values.category}
                                        options={projectCategories}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p className='text-sm'>Cover Image</p>
                                    <img className='w-100' src={values.cover}/>
                                    <Input
                                        name='projectCover'
                                        onChange={(e) => {
                                            uploadImage(e.target.files[0])
                                                .then(imageUrl => {
                                                    setFieldValue('cover', imageUrl)
                                                })
                                                .catch(console.log)
                                        }}
                                        onBlur={handleBlur}
                                        type='file'
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
                                        disabled={!admin}
                                    />
                                    <p className='text-sm'>Wetransfer link</p>
                                    <Input
                                        name='wetransferLink'
                                        value={values.wetransferLink}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type='text'
                                        placeholder='WeTransfer link for your NFT'
                                        disabled={!admin}
                                    />
                                    <p className='text-sm'>Project story</p>
                                    <RichTextArea
                                        name='story'
                                        value={values.story}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <p className='text-sm'>Project rewards</p>
                                    <RichTextArea
                                        name='rewards'
                                        value={values.rewards}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                        {loading.saveButton ? (
                                            <span className='h-5 w-5'>
                                                <Spinner show={true} />
                                            </span>
                                        ) : (
                                            <>Save</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            {admin && <div className='bg-white py-4 px-4 flex flex-col space-y-6'>
                <div className='border border-red-400 rounded-lg bg-red-100'>
                    <div className='px-4 py-4'>
                        Admin Functions
                        <div className='text-xs'>
                            You will only be able to call these functions as an
                            admin.
                        </div>
                    </div>
                    <div className='px-4 py-4 border-t border-red-300'>
                        <button
                            className={`
                                flex flex-row justify-center w-full 
                                bg-slate-900 text-white py-2 font-medium 
                                text-sm tracking-wider rounded-xl shadow-xl 
                                hover:bg-gray-800`}
                            onClick={() =>
                                updateStatus(
                                    backend.approveProject,
                                    'approveButton'
                                )
                            }>
                            {loading.approveButton ? (
                                <span className='h-5 w-5'>
                                    <Spinner show={true} />
                                </span>
                            ) : (
                                <>Approve Project</>
                            )}
                        </button>
                        <button
                            className={`
                                flex flex-row justify-center w-full 
                                bg-slate-900 text-white py-2 font-medium 
                                text-sm tracking-wider rounded-xl shadow-xl 
                                hover:bg-gray-800 mt-2`}
                            onClick={() =>
                                updateStatus(
                                    backend.unapproveProject,
                                    'unapproveButton'
                                )
                            }>
                            {loading.unapproveButton ? (
                                <span className='h-5 w-5'>
                                    <Spinner show={true} />
                                </span>
                            ) : (
                                <>Unapprove Project</>
                            )}
                        </button>
                    </div>
                    <div className='px-4 py-4 border-t border-red-300'>
                        <button
                            className={`
                                flex flex-row justify-center w-full 
                                bg-slate-900 text-white py-2 font-medium 
                                text-sm tracking-wider rounded-xl shadow-xl 
                                hover:bg-gray-800`}
                            onClick={() =>
                                updateStatus(
                                    backend.openProjectToWhiteList,
                                    'whitelistButton'
                                )
                            }>
                            {loading.whitelistButton ? (
                                <span className='h-5 w-5'>
                                    <Spinner show={true} />
                                </span>
                            ) : (
                                <>Open Project to Whitelist</>
                            )}
                        </button>
                        <button
                            className={`
                                flex flex-row justify-center w-full 
                                bg-slate-900 text-white py-2 font-medium 
                                text-sm tracking-wider rounded-xl shadow-xl 
                                hover:bg-gray-800 mt-2`}
                            onClick={() =>
                                updateStatus(
                                    backend.makeProjectLive,
                                    'liveButton'
                                )
                            }>
                            {loading.liveButton ? (
                                <span className='h-5 w-5'>
                                    <Spinner show={true} />
                                </span>
                            ) : (
                                <>Make Project Live</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
