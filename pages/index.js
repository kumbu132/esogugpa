//TO-DO
//Header will have add ders, remove ders, ders sayi, question mark for help, and language settings

import Head from 'next/head';
import Hero from '../components/Hero/Hero';
import Calculate from '../components/Calculate/Calculate';
export default function Home() {
	return (
		<div className="wrapper max-w-screen-md ">
			<Head>
				<title>ESOGU GPA CALCULATOR</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main
				style={{
					backgroundImage: 'url(/images/esogu-logo.png)',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
				className="h-screen w-full"
			>
				MOBILE FIRST
			</main>
		</div>
	);
}
