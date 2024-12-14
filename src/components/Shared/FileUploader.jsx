import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuLoader2 } from "react-icons/lu";

const FileUploader = ({ handleTaskSubmit }) => {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/auto/upload`,
        formData
      );

      // Set the file URL
      setFileUrl(data.secure_url);
      handleTaskSubmit(data.secure_url);
    } catch (error) {
      console.error("Error uploading file to Cloudinary", error);
    } finally {
      setLoading(false);
    }
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="flex items-center space-x-6">
      <p>
        {file.path} - {file.size} bytes
      </p>
      <button
        disabled={loading}
        className="btn disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => uploadToCloudinary(file)}
      >
        {loading ? <LuLoader2 className="animate-spin" /> : "Submit"}
      </button>
    </li>
  ));

  if (fileUrl)
    return (
      <div className="mt-2">
        <p className="font-bold">Task Submitted:</p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {fileUrl}
        </a>
      </div>
    );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside className="mt-6">
        <h4 className="font-medium">Task</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default FileUploader;
