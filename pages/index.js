//TO-DO
//Header will have add ders, remove ders, ders sayi, question mark for help, and language settings
// alerts for incomplete form, and can't calculate if there are no modules
// Results modal
// localisation
// FAQs
// animations
// get in touch form
// deleteaspressed unnecessary?
// fonts
// faw page and contact page will have "Calculate GPA!/GNO Hesaplaya! button in nav to take them back to home"
// SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO
//when changing set value
import { useModules } from '../context/context';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ModuleCard from '../components/ModuleCard/ModuleCard';

export default function Home() {
	const { selectedModules, setIsHomePage } = useModules();

	useEffect(() => {
		setIsHomePage(true);
	}, []);

	return (
		<div className="wrapper max-w-screen-md relative">
			<Head>
				<title>ESOGU GNO HESAPLAMA</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-20 pointer-events-none">
				<Image
					src={'/images/esogu-logo.png'}
					alt="esogu"
					width="200"
					height="200"
				/>
			</span>
			<main className=" w-full mt-[60px]">
				{selectedModules.map((module) => (
					<ModuleCard
						key={module.id}
						id={module.id}
						moduleID={module.moduleID}
						moduleName={module.moduleName}
						credits={module.credits}
						grade={module.grade}
						akts={module.akts}
						isComplete={module.complete}
						firstLoad={module.firstLoad}
						deleteThisModule={module.deleteThisModule}
					/>
				))}
			</main>
		</div>
	);
}
