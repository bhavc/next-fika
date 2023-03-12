import { useState, InputHTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/api/fileUpload";
import { toast } from "react-hot-toast";

import FileUploadIcon from "public/svg/file-upload.svg";
import PDFIcon from "public/svg/PDF_file_icon.svg";
import TextIcon from "public/svg/file-text.svg";

interface FileUploaderProps {
	uploadedFiles: any[];
	handleUploadedFiles: (data: any[]) => void;
	userToken: string;
}

type ResponseType = {
	url: string;
	name: string;
	type: string;
};

// TODO add tanstack react query here so usertoken can be passed in
export default function FileUploader({
	uploadedFiles,
	handleUploadedFiles,
	userToken
}: FileUploaderProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnDrop = async (
		acceptedFiles: File[]
		// fileRejections: FileRejection[],
		// event: DropEvent
	) => {
		try {
			setIsLoading(true);
			const res = await uploadFiles(userToken, acceptedFiles);

			const uploadFileData = res.uploadFileData as ResponseType[];
			handleUploadedFiles([...uploadedFiles, ...uploadFileData]);
		} catch (err) {
			// TODO throw a snackbar here
			toast.error("Error uploading file.");
		} finally {
			setIsLoading(false);
		}

		// save image ids to a workflow
		// and if the workflow doesnt exist then i prune this data
		// periodically
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: handleOnDrop,
		multiple: true,
		maxFiles: 10,
		accept: {
			"image/png": [".png"],
			"application/pdf": [".pdf"],
			"image/jpeg": [".jpeg"],
			"image/jpg": [".jpg"],
			"text/plain": [".txt"]
		},
		disabled: isLoading
	});

	const imageFileTypes = ["image/png", "image/jpeg", "image/jpg"];
	const imageFiles = uploadedFiles.filter((file) => imageFileTypes.includes(file.type));
	const nonImageFiles = uploadedFiles.filter((file) => !imageFileTypes.includes(file.type));

	return (
		<section className="w-full border-none">
			<div
				{...getRootProps({ className: "dropzone" })}
				className="input w-full h-32 pt-2 border-neutral flex flex-col justify-center items-center"
			>
				<input {...getInputProps()} />

				{isLoading ? (
					<progress className="progress progress-accent w-56"></progress>
				) : (
					<div className="hover:opacity-50 flex flex-col justify-center items-center">
						<FileUploadIcon width="80px" height="80px" />
						<h3 className="text-center">Select files needed for the delivery</h3>
					</div>
				)}
			</div>
			<div className="mt-4">
				<h2 className="text-xl">Your uploaded files: </h2>
				<div className="flex flex-col gap-4 mt-4">
					{imageFiles?.map((file, key) => {
						return (
							<Link href={file.url} key={key} target="_blank">
								<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
									<Image src={file.url} width={48} height={48} alt={`image: ${key}`} />
									<div className="flex justify-center items-center">
										<h2>{file.name}</h2>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="flex flex-col gap-4">
					{nonImageFiles?.map((file, key) => {
						return (
							<Link href={file.url} key={key} target="_blank">
								<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
									{file.type === "application/pdf" ? (
										<PDFIcon height={48} width={48} />
									) : (
										<TextIcon height={48} width={48} />
									)}

									<div className="flex justify-center items-center">
										<h2>{file.name}</h2>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
