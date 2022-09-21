import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import styles from './RichTextArea.module.scss'

export default function RichTextArea({ onChange, value, name, label }) {
  return (
      <div className="w-full">
          {label && (
              <label htmlFor={name} className="text-xs text-gray-400">
                  {props.label}
              </label>
          )}

        <ReactQuill name={name} onChange={onChange(name)} value={value} className={styles.richTextEditor} theme="snow" />
      </div>
  );
}
