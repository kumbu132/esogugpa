import Head from 'next/head';
import Image from 'next/image';
import { useModules } from '../context/context';
import { useEffect, useState } from 'react';
import { faqs } from '../utils/gpaFunctions';
import FAQ from '../components/FAQ/FAQ';

const FAQs = () => {
	const { setIsHomePage } = useModules();
	useEffect(() => {
		setIsHomePage(false);
	}, []);

	const [activeFAQ, setActiveFAQ] = useState('');
	return (
		<div className="FAQs wrapper max-w-screen-md relative">
			<span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-40 pointer-events-none">
				<Image
					src={'/images/esogu-logo.png'}
					alt="esogu"
					width="200"
					height="200"
				/>
			</span>
			<main className=" w-full mt-[60px] flex flex-col justify-center items-center">
				{faqs.map((faq) => (
					<div key={faq.id} className="w-full">
						<FAQ
							question={faq.question}
							answer={faq.answer}
							id={faq.id}
							active={activeFAQ}
							setActive={setActiveFAQ}
						/>
					</div>
				))}
			</main>
		</div>
	);
};

export default FAQs;