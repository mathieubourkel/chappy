/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent: React.FC = () => {
  const editorRef = useRef();

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    console.log(data); // Access the content here or send it to your state or another component
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onChange={handleEditorChange}
      ref={editorRef as any}
    />
  );
};

export default CKEditorComponent;