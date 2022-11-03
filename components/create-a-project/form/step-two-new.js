import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import Select from '@/components/forms/select'
import * as Yup from 'yup'
import { Formik } from 'formik'
import projectCategories from '@/helpers/projectCategories'

const stepTwoSchema = Yup.object().shape({
    projectTitle: Yup.string().required('Enter a title for your project'),
    projectCategory: Yup.string().required(
        'Select a category for your project'
    ),
    twitterLink: Yup.string().required('Enter Twitter link for your project'),
    discordLink: Yup.string(), //.required("Enter a Discord link for your project")
})

const initialValues = {
    projectTitle: '',
    projectCategory: '',
    twitterLink: '',
    discordLink: '',
}

export default function StepTwo() {
    const { setStep, setProject, profile, previousStep } = useProjectForm()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            setProject((project) => ({ ...project, ...form }))

            setStep(3)
        } catch (error) {
            console.error(error)
            // todo: set form error
        } finally {
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepTwoSchema}>
            {({ handleSubmit, handleBlur, handleChange, errors, values }) => (
                <form
                    className='w-full bg-clear flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                        
                    <div className='w-full sm:flex sm:flex-row sm:grid-cols-2 space-y-1'>
                        <div className="flex flex-col bg-clear px-4 py-4 sm:w-1/3">
                        <p className='font-bold text-4xl sm:px-12 sm:pt-24 text-neutral-900 font-sans'>Tell us more about your project</p>
                        <p className='font-light text-md sm:px-12 sm:pt-4 text-neutral-700 font-sans'>What's your project title?</p>
                        </div>
                        <div className="flex-col rounded-l-3xl bg-white sm:px-36 sm:py-24 p-8 flex-1">
                        <Input
                            id='projectTitle'
                            name='projectTitle'
                            value={values.projectTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type='text'
                            placeholder='Project name'
                        />
                        <p className=''>Select a project category</p>
                        <Select
                            name='projectCategory'
                            value={values.projectCategory}
                            options={projectCategories}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className=''>Social Media Links</p>
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
                    

                    {Object.values(errors).length > 0 && (
                        <div className='text-red-500 text-sm w-full flex flex-row items-center'>
                            {Object.values(errors)[0]}
                        </div>
                    )}

                    <button
                        disabled={isLoading === true}
                        type='submit'
                        className={`
                            flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                            px-4 font-medium text-base tracking-wider rounded-xl
                            shadow-xl hover:bg-blue-700
                        `}>
                        {!isLoading && <span>Next</span>}

                        {isLoading && (
                            <span className='h-5 w-5'>
                                <Spinner show={true} />
                            </span>
                        )}
                    </button>

                    <button
                        className='appearance-none w-full py-4 px-4 text-xs text-center text-gray-500 focus:outline-none'
                        onClick={previousStep}
                        type='button'>
                        &larr; Go back
                    </button>
                        </div>
                        
                        </div>
                    <p
                        className={`
                            w-full py-4 px-4 text-xs text-center text-gray-500
                        `}>
                        By continuing, you agree to CrowdFund NFTs Terms and
                        acknowledge receipt of our Privacy Policy.
                    </p>
                </form>
            )}
        </Formik>
    )
}
