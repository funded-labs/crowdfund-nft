import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useBackend } from '@/context/backend'
import Input from '@/components/forms/input'
import RichTextArea from '@/components/forms/richTextArea'
import { Spinner } from '@/components/shared/loading-spinner'

const bioQillExclude = ["image", { "list": "ordered"}, {"list": "bullet"}, "font", "clean"]
const SUPPORTED_FILE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg']
const FILE_SIZE = 500000

const userSchema = Yup.object().shape({
  firstName: Yup.string().required('Enter your first name'),
  lastName: Yup.string().required('Enter your last name'),
  bio: Yup.string().required('Enter details about yourself'),
  img: Yup.mixed()
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

const UserForm = ({ userId, uploadImage }) => {
  const { backendWithAuth: backend } = useBackend()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    backend.getProfile(userId)
      .then(setUser)
      .catch(console.log)
  }, [backend])

  const handleSubmit = async (form) => {
    const profileImageUrl = await uploadImage(form.img)
    
    setLoading(true)
    backend
      .updateProfile({ ...form, img: profileImageUrl })
      .catch(console.log)
      .finally(() => setLoading(false))
  }

  if (!user) return <></>
  
  return (
    <div className='border border-slate-400 rounded-lg bg-slate-100'>
      <Formik
        initialValues={user}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleBlur, handleChange, values, errors, setFieldValue }) => (
          <form
            className='w-full flex flex-col'
            onSubmit={handleSubmit}
          >
            <div className='px-4 py-4'>
                Edit Profile
            </div>
            <div className='px-4 py-4 border-t border-slate-300 space-y-2'>
              <p className='text-sm'>First Name</p>
              <Input
                  id='firstName'
                  name='firstName'
                  value={values?.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='text'
                  placeholder='First Name'
              />

              <p className='text-sm'>Last Name</p>
              <Input
                  id='lastName'
                  name='lastName'
                  value={values?.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='text'
                  placeholder='Last Name'
              />

              <p className='text-sm'>Profile Picture</p>
              {typeof values?.img === 'string' && <img className='rounded-full w-24 h-24 bg-gray-300 overflow-hidden' src={values.img}/>}

              <Input
                name='img'
                onChange={(e) =>
                    setFieldValue('img', e.target.files[0])
                }
                onBlur={handleBlur}
                type='file'
              />

              <p className='text-sm'>Bio</p>
              <RichTextArea
                name='bio'
                onChange={handleChange}
                value={values.bio}
                exclude={bioQillExclude}
              />

              {Object.values(errors).length > 0 && (
                <div className='text-red-500 text-sm w-full flex flex-row items-center'>
                    {Object.values(errors)[0]}
                </div>
              )}
            </div>

            <div className='px-4 py-4 border-t border-slate-300 '>
                <button
                  disabled={loading === true}
                  type='submit'
                  className={`
                    flex flex-row justify-center w-full bg-blue-600 text-white py-3 
                    px-4 font-medium text-base tracking-wider rounded-xl
                    shadow-xl hover:bg-blue-700`
                  }
                >
                {loading ? (
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
  )
}

export default UserForm
