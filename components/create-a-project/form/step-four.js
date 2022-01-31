import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'

const SUPPORTED_FILE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg']
const FILE_SIZE = 500000

const stepFourSchema = Yup.object().shape({
    coverImg: Yup.mixed()
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
    wetransferLink: Yup.string(),
})

const initialValues = {
    coverImgUrl: '',
    wetransferLink: '',
}

export default function StepFour() {
    const { setStep, setProject, previousStep, project } = useProjectForm()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (form) => {
        try {
            setLoading(true)

            setProject((project) => ({ ...project, ...form }))

            setStep(5)
        } catch (error) {
            console.log(error)
            // toto: set form error
        } finally {
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stepFourSchema}>
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                setFieldValue,
                errors,
                values,
            }) => (
                <form
                    className='w-full flex flex-col space-y-2'
                    onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col space-y-1'>
                        <p className='font-semibold text-2xl'>
                            Add a cover photo for your NFTs
                        </p>
                        <p className=''>
                            A high-quality image that will serve as your project
                            cover, as well as NFT collection cover!
                        </p>
                        <Input
                            name='coverImg'
                            onChange={(e) =>
                                setFieldValue('coverImg', e.target.files[0])
                            }
                            onBlur={handleBlur}
                            type='file'
                        />
                        {/* <div className="border rounded-2xl py-20"></div> */}
                        <p className=''>
                            To upload your full NFT collection, please add a
                            WeTransfer link and share it with the following
                            email address:
                        </p>
                        <div className='w-full text-center text-blue-600'>
                            collections@crowdfundnft.icp
                        </div>
                        <Input
                            name='wetransferLink'
                            value={values.wetransferLink}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type='text'
                            placeholder='WeTransfer link for your NFT'
                        />
                        <p className=''>
                            Reminder, you selected a collection of:
                        </p>
                        <p className='font-semibold'>
                            {project.nftVolume} NFTs
                        </p>
                        <p className=''>
                            Please make sure you have the appropriate number of
                            JPG's or PNG's in your upload. These will be minted
                            and randomly allocated to people who invest in your
                            project.
                        </p>
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
