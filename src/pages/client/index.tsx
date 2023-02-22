import ClientLayout from "@/layouts/ClientLayout";

import mainImage from "/jpeg/client_main.jpeg";

export default function Client() {
	return (
		<>
			<ClientLayout>
				<main className="flex items-center justify-center">
					<div
						className="hero min-h-screen bg-[url('/jpeg/client_main.jpeg')]"
						// style={{ backgroundImage: `url('/jpeg/client_main.jpeg')` }}
					>
						<div className="hero-overlay bg-opacity-60"></div>
						<div className="hero-content text-center text-neutral-content">
							<div className="max-w-md">
								<h1 className="mb-5 text-5xl font-bold">Hello User</h1>
								<p className="mb-5">
									Welcome to the client App. Here you will be able to create new shipments as well
									as view any previous shipments you&apos;ve made
								</p>
							</div>
						</div>
					</div>
				</main>
			</ClientLayout>
		</>
	);
}

// anytime i get to one of these pages, check if i have
