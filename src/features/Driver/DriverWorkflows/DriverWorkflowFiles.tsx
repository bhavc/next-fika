import { useState, MouseEvent } from "react";

import Link from "next/link";
import Image from "next/image";
import PDFIcon from "public/svg/PDF_file_icon.svg";
import TextIcon from "public/svg/file-text.svg";

import type { FileType } from "./types";

export default function DriverWorflowFiles({ workflowFiles }: { workflowFiles: FileType[] }) {
	const imageFileTypes = ["image/png", "image/jpeg", "image/jpg"];
	const imageFiles = workflowFiles?.filter((file) => imageFileTypes.includes(file.type));
	const nonImageFiles = workflowFiles?.filter((file) => !imageFileTypes.includes(file.type));

	if (!workflowFiles || workflowFiles.length === 0) {
		return (
			<div className="card-body">
				<div className="flex justify-center items-center h-60">
					<h2 className="font-bold text-xl">No files have been added</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="font-bold text-xl">Upload Files</h2>
			<div className="flex flex-col gap-4">
				{imageFiles?.map((file, key) => {
					return (
						<div key={key} className="flex">
							<Link href={file.url} key={key} target="_blank">
								<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
									<Image src={file.url} width={48} height={48} alt={`image: ${key}`} />
									<div className="flex justify-center items-center">
										<h2>{file.name}</h2>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
			<div className="flex flex-col gap-4">
				{nonImageFiles?.map((file, key) => {
					return (
						<div key={key} className="flex">
							<Link href={file.url} target="_blank">
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
						</div>
					);
				})}
			</div>
		</div>
	);
}
