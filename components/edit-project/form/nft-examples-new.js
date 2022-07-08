import Input from '@/components/forms/input'
import { Formik } from 'formik'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    id: Yup.string().required('Enter a valid id.'),
    img: Yup.mixed().required('Select an image.'),
    upload: Yup.boolean(),
})

const NFTexamplesNew = ({ backend, projectId }) => {
    const initialValues = {
        id: '',
        img: null,
        upload: false,
    }

    const handleSubmit = async (form) => {
        console.log({ form })
    }

    return (
        <div className='px-4 py-4 border-t border-slate-300 space-y-2'>
            <div>Upload New</div>
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
                        <p className='text-sm'>NFT id (e.g. #123)</p>
                        <Input
                            id='id'
                            name='id'
                            value={values.id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type='text'
                            placeholder='NFT example id (e.g. 1 for #1)'
                            startItem={() => <>#</>}
                        />
                        <p className='text-sm'>Image</p>
                        <div>
                            <input
                                type='radio'
                                id='url'
                                name='upload'
                                value={false}
                                checked={!values.upload}
                            />{' '}
                            <label for='url'>URL</label>
                            {''}
                            <input
                                type='radio'
                                id='upload'
                                name='upload'
                                value={true}
                                checked={values.upload}
                            />{' '}
                            <label for='upload'>Upload</label>
                        </div>
                        <Input
                            id='img'
                            name='img'
                            value={values.id}
                            onChange={(e) =>
                                setFieldValue('coverImg', e.target.files[0])
                            }
                            onBlur={handleBlur}
                            type='file'
                            placeholder='NFT image'
                        />
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default NFTexamplesNew
