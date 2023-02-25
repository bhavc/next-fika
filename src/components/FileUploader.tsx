import { useDropzone, FileWithPath, FileRejection, DropEvent } from "react-dropzone";

import { uploadFile, uploadFiles } from "@/api/fileUpload";

import FileUploadIcon from "public/svg/file-upload.svg";

export default function FileUploader() {
	const handleOnDrop = async (
		acceptedFiles: File[],
		fileRejections: FileRejection[],
		event: DropEvent
	) => {
		console.log("acceptedFiles", acceptedFiles);

		// const firstFile = acceptedFiles[0];

		try {
			const res = await uploadFiles(acceptedFiles);
			console.log("res", res);
		} catch (err) {
			console.log("Error uploading file", err);
		}

		// for each file, call the image upload route on backend
		// once called, route will store data in postgres
		// return blob storage and show that here

		// you would save it to the user, return image ids
		// or do i save image ids to a workflow
		// and if the workflow doesnt exist then i prune this data
		// periodically

		// files should be passed in as props into the file loader
		// those files should be shown as components previews here
	};

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: handleOnDrop,
		multiple: true,
		maxFiles: 10,
		accept: {
			"image/png": [".png"],
			"application/pdf": [".pdf"],
			"image/jpeg": [".jpeg"],
			"image/jpg": [".jpg"],
			"text/plain": [".txt"]
		}
	});

	const files = acceptedFiles.map((file: FileWithPath) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className="w-full border-none">
			<div
				{...getRootProps({ className: "dropzone" })}
				className="input w-full h-32 pt-2 border-neutral flex flex-col justify-center items-center"
			>
				<input {...getInputProps()} />

				<div className="hover:opacity-50 flex flex-col justify-center items-center">
					<FileUploadIcon width="80px" height="80px" />
					<h3 className="text-center">Select files needed for the delivery</h3>
				</div>
			</div>
			<div className="mt-4">
				<h4>Files</h4>
				<ul>{files}</ul>
			</div>
		</section>
	);
}
