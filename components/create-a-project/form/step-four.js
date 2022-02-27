import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/forms/input'
import { Spinner } from '@/components/shared/loading-spinner'
import { useProjectForm } from './project-form-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'

const SUPPORTED_FILE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg']
const FILE_SIZE = 500000

const stepFourSchema = Yup.object().shape({
    coverImg: Yup.mixed()
        .test(
            'fileFormat',
            'Please select a jpg or png file for the cover image.',
            (value) =>
                value === null ||
                (value && SUPPORTED_FILE_FORMATS.includes(value.type))
        )
        .test(
            'fileSize',
            'Please select a file smaller than 500KB.',
            (value) => value === null || (value && value.size <= FILE_SIZE)
        ),
    wetransferLink: Yup.string().required("You must enter a valid WeTransfer for your NFT art."),
})

const initialValues = {
    coverImgUrl: '',
    wetransferLink: 'auto-generated',
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
                    <div className='w-full flex flex-col space-y-4'>
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
                        

                        <p className='font-semibold text-2xl pt-10'>
                            NFT Art
                        </p>
                        <p className=''>
                           Choose whether you would like to upload your own
                           custom NFT art, or have it auto-generated by CrowdFund NFT.
                        </p>

                        <div className='w-full flex flex-row space-x-2'>
                            <button
                                type="button"
                                className={classNames(
                                    "rounded-lg display-none focus:outline-none",
                                    "py-3 px-4 border border-blue-600 w-6/12 font-medium",
                                    values.wetransferLink === "auto-generated" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                                )}
                                onClick={() => setFieldValue("wetransferLink", "auto-generated")}
                            >
                                Auto-generated
                            </button>
                            <button
                                type="button"
                                className={classNames(
                                    "rounded-lg display-none focus:outline-none",
                                    "py-3 px-4 border border-blue-600 w-6/12 font-medium",
                                    values.wetransferLink !== "auto-generated" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                                )}
                                onClick={() => setFieldValue("wetransferLink", "")}
                            >
                                Custom
                            </button>
                        </div>

                        {values.wetransferLink !== "auto-generated" && (
                            <div className='bg-gray-100 rounded-lg w-full py-4 px-2'>
                                <p className='mb-4'>
                                    You have chosen to provide custom NFT art. Please upload your NFT art
                                    collection to WeTransfer and paste the link below.
                                </p>

                                <Input
                                    name='wetransferLink'
                                    value={values.wetransferLink}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type='text'
                                    placeholder='WeTransfer link for your NFT'
                                />

                                <p className='mt-4 text-xs'>
                                    Reminder, you selected a collection size of {project.nftVolume} NFTs
                                    so make sure you have the appropriate number of
                                    JPG's or PNG's in your upload. These will be minted
                                    and randomly allocated to people who invest in your
                                    project.
                                </p>
                            </div>
                        )}
                    </div>

                    {Object.values(errors).length > 0 && (
                        <div className='text-red-500 text-sm w-full flex flex-row items-center pt-8'>
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
