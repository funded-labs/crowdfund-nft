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
        (value && SUPPORTED_FILE_FORMATS.includes(value.type)),
    )
    .test(
      'fileSize',
      'Please select a file smaller than 500KB.',
      (value) => value === null || (value && value.size <= FILE_SIZE),
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

  const bioQillExclude = [
    'image',
    { list: 'ordered' },
    { list: 'bullet' },
    'font',
    'clean',
  ]

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
      validationSchema={stepOneSchema}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
        errors,
        values,
      }) => (
        <form
          className='bg-clear flex w-full flex-col space-y-2 px-8 sm:p-0'
          onSubmit={handleSubmit}
        >
          <div className='w-full space-y-1 sm:flex sm:grid-cols-2 sm:flex-row'>
            <div className='bg-clear flex flex-col px-4 py-4 sm:w-1/3'>
              <p className='pt-16 font-sans text-2xl font-bold tracking-tight text-neutral-900 sm:px-12 sm:text-4xl'>
                Let's start with your profile
              </p>
              <p className='text-md font-sans font-light text-neutral-500 sm:px-12 sm:pt-4'>
                Tell us a bit about yourself and upload a photo so people can
                see who you are.
              </p>
            </div>
            <div className='border-1 flex-1 flex-col rounded-l-3xl rounded-r-3xl border border-white bg-white bg-opacity-50 p-8 bg-blend-saturation sm:rounded-r-none sm:rounded-l-3xl sm:px-36 sm:py-24'>
              <div className='grid w-full gap-4 sm:grid-cols-2'>
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
              <p
                className='font-regular mb-3
                        w-full rounded-none text-base text-neutral-500
                        placeholder-neutral-500 sm:text-sm'
              >
                Bio
              </p>
              <RichTextArea
                name='bio'
                onChange={handleChange}
                value={values.bio}
                exclude={bioQillExclude}
              />
              <p
                className='font-regular mb-3
                        w-full rounded-none text-base text-neutral-500
                        placeholder-neutral-500 sm:text-sm'
              >
                Upload a profile picture (optional)
              </p>
              <Input
                name='profileImg'
                onChange={(e) => setFieldValue('profileImg', e.target.files[0])}
                onBlur={handleBlur}
                type='file'
              />
              {Object.values(errors).length > 0 && (
                <div className='flex w-full flex-row items-center text-sm text-red-500'>
                  {Object.values(errors)[0]}
                </div>
              )}

              <button
                disabled={isLoading === true}
                type='submit'
                className={`
                            flex w-full flex-row justify-center rounded-xl bg-blue-600 py-3 
                            px-4 text-base font-medium tracking-wider text-white
                            shadow-xl hover:bg-blue-700
                        `}
              >
                {!isLoading && <span>Next</span>}

                {isLoading && (
                  <span className='h-5 w-5'>
                    <Spinner show={true} />
                  </span>
                )}
              </button>
            </div>
          </div>

          <p className='w-full py-4 px-4 text-center text-xs text-gray-500'>
            By continuing, you agree to CrowdFund NFT's Terms and acknowledge
            receipt of our Privacy Policy.
          </p>
        </form>
      )}
    </Formik>
  )
}
