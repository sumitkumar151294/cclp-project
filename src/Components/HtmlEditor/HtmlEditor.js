import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

const HtmlEditor = ({ field, form }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={field.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
        modules={HtmlEditor.modules}
        formats={HtmlEditor.formats}
        placeholder="Write something..."
      />
    </div>
  );
};

// Quill modules to attach to editor
HtmlEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ 'color': [] }, { 'background': [] }], 
    ["clean"]
  ],
};

// Quill formats
HtmlEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
];

export default HtmlEditor;
