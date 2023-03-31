import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";

import RegisterType from "@/features/Register/RegisterType";
import RegisterForm from "@/features/Register/RegisterForm";
import MainNavBar from "@/components/Nav/MainNavbar";

import type { UserType } from "@/features/types";

import { postRegister } from "@/api/registration";
import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/helpers";

import type { GetServerSideProps } from "next";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";
import TruckDelivery from "public/svg/truck-delivery.svg";
import TruckIcon from "public/svg/truck-loading.svg";

export default function Register() {
	const router = useRouter();

	const [selectedAccountType, setSelectedAccountType] = useState<UserType | null>(null);
	const [currentStep, setCurrentStep] = useState(0);

	const shouldShowForwardButton = currentStep === 0 && selectedAccountType;
	const shouldShowBackButton = currentStep === 1;

	type AccountTypeCard = {
		type: UserType;
		icon: JSX.Element;
		title: string;
		body: string;
	};

	const accountTypeCards: AccountTypeCard[] = [
		{
			type: "Shipper",
			icon: <TruckIcon height={96} width={96} />,
			title: "Shipper",
			body: "I want to get something shipped"
		},
		{
			type: "Carrier",
			icon: <TruckDelivery height={96} width={96} />,
			title: "Carrier",
			body: "I want to manage delveries & drivers"
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

			const responseData = await postRegister(data);
			const token = responseData.token;

			setCookie("user", token);
			toast.success("Successfully registered");

			switch (selectedAccountType) {
				case "Shipper":
					return router.push("/shipper");
				case "Carrier":
					return router.push("/carrier");
				case "Driver":
					return router.push("/driver");
				default:
					return router.push("/shipper");
			}
		} catch (err) {
			toast.error("Error registering");
		}
	};

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-between items-center h-[calc(100vh_-_65px)] p-4">
				<div className="bg-primary min-w-full mt-8 pt-4 h-full rounded-xl">
					<h1 className="text-3xl mt-2 mb-4 text-slate-100 text-center">Register</h1>
					{currentStep === 0 && (
						<RegisterType
							selectedAccountType={selectedAccountType}
							accountTypeCards={accountTypeCards}
							setSelectedItem={setSelectedItem}
							setNextStep={setNextStep}
						/>
					)}
					{currentStep === 1 && (
						<RegisterForm
							selectedAccountType={selectedAccountType}
							setPreviousStep={setPreviousStep}
							handleSubmitRegistration={handleSubmitRegistration}
						/>
					)}
				</div>

				<footer className="bg-inherit text-neutral-content absolute bottom-0 w-full p-8">
					{shouldShowForwardButton && (
						<div className="flex justify-end">
							<button className="btn btn-secondary btn-circle" onClick={setNextStep}>
								<IconRight />
							</button>
						</div>
					)}
					{shouldShowBackButton && (
						<div className="flex justify-start">
							<button className="btn btn-secondary btn-circle" onClick={setPreviousStep}>
								<IconLeft />
							</button>
						</div>
					)}
				</footer>
			</div>
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies?.user;
	const isLoggedIn = Boolean(userToken);
	let userData;

	try {
		const response = await getCurrentUser(userToken);
		userData = response.data;
	} catch (err) {
		userData = null;
	}

	const appRoute = mapUserTypeToAppRoute(userData?.role);

	if (isLoggedIn && appRoute) {
		return {
			redirect: {
				destination: appRoute,
				statusCode: 302
			}
		};
	}

	return {
		props: {}
	};
};
