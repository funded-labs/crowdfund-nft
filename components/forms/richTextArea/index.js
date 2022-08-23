import dynamic from 'next/dynamic'
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ALL_TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],          // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],        // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],                                         // remove formatting button
  ['image']
];

export default function RichTextArea({ onChange, value, name, label, exclude = [] }) {
  const TOOLBAR_OPTIONS = ALL_TOOLBAR_OPTIONS.filter(o => {

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
    });
});
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-xs text-gray-400">
          {props.label}
        </label>
      )}

      <ReactQuill
        name={name}
        onChange={onChange}
        value={value}
        className="h-[300px] mb-[60px]"
        theme="snow"
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
            handlers: {
              image: function (value) {
                var range = this.quill.getSelection();
                var value = prompt('Enter the image URL here');
                if(value){
                    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
                }
              }
            }
          }
        }}
      />
    </div>
  )
}
