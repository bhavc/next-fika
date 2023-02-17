import { useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

import RegisterType from "@/features/Register/RegisterType";
import RegisterFormDispatch from "@/features/Register/RegisterFormDispatch";
import MainNavBar from "@/components/Nav/MainNavbar";

import { UserType } from "@/features/User/types";

import { postRegister } from "@/api/registration";

export default function Register() {
	const router = useRouter();

	const [selectedAccountType, setSelectedAccountType] = useState<UserType | null>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [cookie, setCookie] = useCookies(["user"]);

	const shouldShowForwardButton = currentStep === 0 && selectedAccountType;
	const shouldShowBackButton = currentStep === 1;

	type AccountTypeCard = {
		type: UserType;
		imageUrl: string;
		title: string;
		body: string;
	};

	const accountTypeCards: AccountTypeCard[] = [
		{
			type: "Client",
			imageUrl: "whatever",
			title: "Client",
			body: "I want to get something shipped"
		},
		{
			type: "Dispatcher",
			imageUrl: "whatever",
			title: "Dispatcher",
			body: "I want to oversee shipments"
		},
		{
			type: "Driver",
			imageUrl: "whatever",
			title: "Driver",
			body: "I get things where they need to get"
		}
	];

	const setSelectedItem = (index: number) => {
		const mappedType = accountTypeCards[index].type;
		setSelectedAccountType(mappedType);
	};

	const setNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const setPreviousStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleSubmitRegistration = async ({
		email,
		password,
		company,
		phone
	}: {
		email: string;
		password: string;
		company: string;
		phone: string;
	}) => {
		try {
			const data = {
				email,
				password,
				company,
				phone,
				role: selectedAccountType
			};

			// const responseData = await postRegister(data);
			// const token = responseData.token;

			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc2NDM2MzczLCJleHAiOjE2NzY1MjI3NzN9.OcI1Xvw3YzbYLCCvWTWCVyKUYtOlJPNhrlLwzfnXWtg";

			setCookie("user", token);
			toast.success("Successfully registered");

			switch (selectedAccountType) {
				case "Client":
					return router.push("/client");
				case "Dispatcher":
					return router.push("/dashboard");
				case "Driver":
					return router.push("/driver");
				default:
					return router.push("/client");
			}
		} catch (err) {
			toast.error("Error registering");
		}
	};

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-between items-center min-height:100vh">
				<h1 className="text-3xl mt-2 mb-2">Register</h1>

				{currentStep === 0 && (
					<RegisterType
						selectedAccountType={selectedAccountType}
						accountTypeCards={accountTypeCards}
						setSelectedItem={setSelectedItem}
						setNextStep={setNextStep}
					/>
				)}
				{currentStep === 1 && (
					<RegisterFormDispatch
						selectedAccountType={selectedAccountType}
						setPreviousStep={setPreviousStep}
						handleSubmitRegistration={handleSubmitRegistration}
					/>
				)}
				<footer className="bg-inherit text-neutral-content absolute bottom-0 w-full p-2">
					{shouldShowForwardButton && (
						<div className="flex justify-end">
							<button className="btn btn-circle bg-primary" onClick={setNextStep}>
								<Image
									src={"icons/svg/arrow-right.svg"}
									width={24}
									height={24}
									alt="arrow-next"
									color="white"
								/>
							</button>
						</div>
					)}
					{shouldShowBackButton && (
						<div className="flex justify-start">
							<button className="btn btn-circle bg-primary mt-10" onClick={setPreviousStep}>
								<Image
									src={"icons/svg/arrow-left.svg"}
									width={24}
									height={24}
									alt="arrow-next"
									color="white"
								/>
							</button>
						</div>
					)}
				</footer>
			</div>
		</main>
	);
}
