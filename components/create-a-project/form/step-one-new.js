import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import Textarea from '@/components/forms/textarea'
import { Formik } from 'formik'
import * as Yup from 'yup'
import RichTextArea from '@/components/forms/richTextArea'

Yup.setLocale({
    mixed: {
        notType: '${path} is required',
    },
})

const SUPPORTED_FILE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg']
const FILE_SIZE = 500000

const stepOneSchema = Yup.object().shape({
    firstName: Yup.string().required('Enter your first name'),
    lastName: Yup.string().required('Enter your last name'),
    bio: Yup.string().required('Enter details about yourself'),
    profileImg: Yup.mixed()
        .test(
            'fileFormat',
            'Please select a jpg or png file.',
            (value) =>
                value === null ||
                (value && SUPPORTED_FILE_FORMATS.includes(value.type))
        )
        .test(
            'fileSize',
            'Please select a file smaller than 500KB.',
            (value) => value === null || (value && value.size <= FILE_SIZE)
        ),
})

const initialValues = {
    firstName: '',
    lastName: '',
    bio: '',
    profileImg: null,
}

export default function StepOneNew() {
    const { setProfile, setStep } = useProjectForm()
    const [isLoading, setLoading] = useState(false)

    const bioQillExclude = ["image", { "list": "ordered"}, {"list": "bullet"}, "font", "clean"]

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            setProfile((profile) => ({ ...profile, ...form }))

            setStep(2)
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
            validationSchema={stepOneSchema}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                setFieldValue,
                errors,
                values,
            }) => (

                <form
                    className='w-full bg-clear flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                    <div className='w-full sm:flex sm:flex-row sm:grid-cols-2 space-y-1'>
                        <div className="flex flex-col bg-clear px-4 py-4 sm:w-1/3">
                        <p className='font-bold text-4xl sm:px-12 sm:pt-24 text-neutral-900 tracking-tight font-sans'>
                            Let's start with your profile
                        </p>
                        <p className='font-light text-md sm:px-12 sm:pt-4 text-neutral-500 font-sans'>Tell us a bit about yourself and upload a photo so people can see who you are.</p>
                        </div>
                        <div className="flex-col rounded-l-3xl bg-white sm:px-36 sm:py-24 p-8 flex-1">
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <Input
                                name='firstName'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='First name'
                                type='text'
                                label='First name'
                                
                            />
                            <Input
                                name='lastName'
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='text'
                                placeholder='Last name'
                                label='Last name'
                            />
                        </div>
                        <p className='sm:text-sm rounded-none
                        w-full text-neutral-500 font-semibold placeholder-neutral-500
                        text-base mb-3'>Bio</p>
                        <RichTextArea
                            name='bio'
                            onChange={handleChange}
                            value={values.bio}
                            exclude={bioQillExclude}
                        />
                        <p className='sm:text-sm rounded-none
                        w-full text-neutral-500 font-semibold placeholder-neutral-500
                        text-base mb-3'>Upload a profile picture (optional)</p>
                        <Input
                            name='profileImg'
                            onChange={(e) =>
                                setFieldValue('profileImg', e.target.files[0])
                            }
                            onBlur={handleBlur}
                            type='file'
                        />
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
                        </div>
                        
                        
                    </div>

                    

                    <p className='w-full py-4 px-4 text-xs text-center text-gray-500'>
                        By continuing, you agree to CrowdFund NFT's Terms and
                        acknowledge receipt of our Privacy Policy.
                    </p>
                </form>
            )}
        </Formik>
    )
}
