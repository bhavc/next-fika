import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";

import RegisterType from "@/features/Register/RegisterType";
import RegisterMain from "@/features/Register/RegisterMain";
import MainNavBar from "@/components/Nav/MainNavbar";
import RegistrationStepper from "@/features/Register/RegisterStepper";

import type { UserType } from "@/features/types";

import { postRegister } from "@/api/registration";
import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/helpers";

import type { GetServerSideProps } from "next";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";
import TruckDelivery from "public/svg/truck-delivery.svg";
import TruckIcon from "public/svg/truck-loading.svg";
import RegisterDetails from "@/features/Register/RegisterDetails";

export default function Register() {
	const router = useRouter();

	const [selectedAccountType, setSelectedAccountType] = useState<UserType | null>(null);
	const [selectedEmail, setSelectedEmail] = useState("");
	const [selectedPassword, setSelectedPassword] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("");
	const [selectedPhone, setSelectedPhone] = useState("");
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{
			value: 0,
			label: "Role"
		},
		{
			value: 1,
			label: "Account Setup"
		},
		{
			value: 2,
			label: "About you"
		}
	];

	const shouldShowForwardButton = currentStep === 0 && selectedAccountType;
	const shouldShowBackButton = currentStep > 0;

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

	const setSelectedCredentials = ({ email, password }: { email: string; password: string }) => {
		setSelectedPassword(password);
		setSelectedEmail(email);
		setNextStep();
	};

	const setSelectedDetails = ({ company, phone }: { company: string; phone: string }) => {
		setSelectedCompany(company);
		setSelectedPhone(phone);
	};

	const setNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const setPreviousStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleSubmitRegistration = useCallback(async () => {
		try {
			const data = {
				email: selectedEmail,
				password: selectedPassword,
				company: selectedCompany,
				phone: selectedPhone,
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
	}, [
		selectedEmail,
		selectedPassword,
		selectedAccountType,
		selectedCompany,
		selectedPhone,
		router
	]);

	useEffect(() => {
		if (
			selectedAccountType &&
			selectedEmail &&
			selectedPassword &&
			selectedCompany &&
			selectedPhone
		) {
			handleSubmitRegistration();
		}
	}, [
		selectedAccountType,
		selectedEmail,
		selectedPassword,
		selectedCompany,
		selectedPhone,
		handleSubmitRegistration
	]);

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-between items-center h-[calc(100vh_-_65px)]">
				<div className="bg-primary min-w-full pt-2 h-full">
					<h1 className="text-3xl mt-2 mb-2 text-slate-100 text-center">Register</h1>
					<RegistrationStepper steps={steps} currentStep={currentStep} />

					{currentStep === 0 && (
						<RegisterType
							selectedAccountType={selectedAccountType}
							accountTypeCards={accountTypeCards}
							setSelectedItem={setSelectedItem}
							setNextStep={setNextStep}
						/>
					)}
					{currentStep === 1 && (
						<RegisterMain
							selectedAccountType={selectedAccountType}
							setPreviousStep={setPreviousStep}
							setSelectedCredentials={setSelectedCredentials}
						/>
					)}
					{currentStep === 2 && (
						<RegisterDetails
							setPreviousStep={setPreviousStep}
							setSelectedDetails={setSelectedDetails}
						/>
					)}
				</div>

				<footer className="bg-inherit text-neutral-content absolute bottom-0 w-full p-8">
					<div className="flex justify-between">
						{shouldShowBackButton ? (
							<div className="flex justify-start">
								<button className="btn btn-secondary btn-circle" onClick={setPreviousStep}>
									<IconLeft />
								</button>
							</div>
						) : (
							<div />
						)}
						{shouldShowForwardButton ? (
							<div className="flex justify-end">
								<button className="btn btn-secondary btn-circle" onClick={setNextStep}>
									<IconRight />
								</button>
							</div>
						) : (
							<div />
						)}
					</div>
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
