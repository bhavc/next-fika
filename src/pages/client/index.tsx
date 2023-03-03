import { GetServerSideProps } from "next";

import ClientLayout from "@/layouts/ClientLayout";

export default function Client() {
	return (
		<>
			<ClientLayout>
				<main className="flex items-center justify-center">
					<div className="hero min-h-screen bg-[url('/jpeg/client_main.jpeg')]">
						<div className="hero-overlay bg-opacity-60"></div>
						<div className="hero-content text-center text-neutral-content">
							<div className="max-w-md">
								<h1 className="mb-5 text-5xl font-bold">Hello, User</h1>
								<p className="mb-5">
									Welcome to Fika. Here you will be able to create new shipments as well as view any
									previous shipments you&apos;ve made
								</p>
							</div>
						</div>
					</div>
				</main>
			</ClientLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	return {
		props: {}
	};
};
