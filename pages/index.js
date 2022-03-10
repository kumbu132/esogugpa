//TO-DO
//Header will have add ders, remove ders, ders sayi, question mark for help, and language settings
import { useModules } from '../context/context';
import Head from 'next/head';
import ModuleCard from '../components/ModuleCard/ModuleCard';
export default function Home() {
	const { selectedModules } = useModules();

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
				className="h-screen w-full mt-[60px]"
			>
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
					/>
				))}
			</main>
		</div>
	);
}
