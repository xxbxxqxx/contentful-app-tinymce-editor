import React, {useState, useEffect, useRef} from 'react';
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from 'tinymce';

export interface initProps {
  plugins : string ;
  toolbar : string ;
  menubar : string ;
};

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [contentEditor, setContentEditor] = useState( sdk.field.getValue() );
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { apiKey } = sdk.parameters.installation;
  const [init, setInit] = useState<initProps>({
    plugins: "",
    toolbar: "",
    menubar: "",
  });
  
  const handleEditorChange = (value: string) => {
    setContentEditor({content: value})
  }

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  useEffect(() => {
    const {
      plugins,
      toolbar,
      menubar
    } = sdk.parameters.instance

    setInit({
      plugins: plugins,
      toolbar: toolbar,
      menubar: menubar,
    })

  }, [sdk.parameters]);

  useEffect(() => {
    sdk.field
      .setValue(contentEditor)
  }, [contentEditor]);

  return (
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      init={init}
      apiKey={apiKey}
      onEditorChange={(newValue) => {
        handleEditorChange(newValue)
      }}
      value={ contentEditor["content"] || "" }
    />
  );
};

export default Field;
