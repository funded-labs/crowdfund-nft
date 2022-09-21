import React, { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

import '@writergate/quill-image-uploader-nextjs/dist/quill.imageUploader.min.css';
import { makeImagesActor, getImageURL } from '@/ui/service/actor-locator'
import { imgFileToInt8Array } from '@/helpers/imageHelper';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")
    const { default: ImageUploader } = await import("@writergate/quill-image-uploader-nextjs")
    
    RQ.Quill.register("modules/imageUploader", ImageUploader)
    
    return function forwardRef({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

const ALL_TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],          // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],        // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],                                         // remove formatting button
  ['image']
];

export default function RichTextArea({ name, onChange, value, label, exclude = [] }) {
  const toolbarOptions = useMemo(() => {
    return ALL_TOOLBAR_OPTIONS.filter(o => {

      return o.some(x => {
        if (typeof x === "string") {
          return !exclude.includes(x);
        }
  
        if (typeof o === "object" && !Array.isArray(o)) {
          return Object.keys(o).some(x => !exclude.includes(x));
        }
  
        if (typeof o === "object" && Array.isArray(o)) {
          return o.some(a => Object.values(a).some(b => exclude.includes(b)));
        }
  
        return true;
      })
    })
  }, [exclude])

  const uploadImage = useCallback(async (file) => {
    const imageActor = makeImagesActor()
                  
    const image = {
      name: file.name,
      payload: {
          ctype: file.type,
          data: [await imgFileToInt8Array(file)],
      },
    }

    return getImageURL(await imageActor.addAsset(image))
  }, [])
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-xs text-gray-400">
          {props.label}
        </label>
      )}

      <ReactQuill
        onChange={onChange(name)}
        value={value}
        className="h-[300px] mb-[60px]"
        theme="snow"
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
          imageUploader: {
            upload: (file) => {
              return uploadImage(file)
            },
          },
        }}
      />
    </div>
  )
}
