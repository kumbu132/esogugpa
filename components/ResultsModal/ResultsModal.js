import { useModules } from '../../context/context';
import { LeftCircleOutlined } from '@ant-design/icons';
import { displayGPA } from '../../utils/utilityFunctions';

const ResultsModal = () => {
	const { gpa, setModalIsOpen, selectedModules } = useModules();
	console.log({ gpa });

	return (
		<div className="h-screen animate-[fadeIn] max-w-screen-md w-full absolute top-0 z-50 px-3 bg-[#fcfcfc]">
			<nav className="flex justify-end items-center h-[60px] p-1">
				<button
					className="h-[50px] w-[50px] hover:opacity-60"
					onClick={() => setModalIsOpen(false)}
				>
					<LeftCircleOutlined style={{ fontSize: '20px' }} />
				</button>
			</nav>
			<div className="flex justify-center items-center my-2">
				<h1 className="text-3xl font-bold">
					GPA:{' '}
					<span
						className={`${
							gpa >= 3.8
								? 'AA'
								: gpa >= 3.5
								? 'BA'
								: gpa >= 3
								? 'BB'
								: gpa >= 2.5
								? 'CB'
								: gpa >= 2
								? 'CC'
								: gpa >= 1.5
								? 'DC'
								: gpa >= 1
								? 'DD'
								: gpa >= 0
								? 'FF'
								: 'YT'
						}`}
					>
						{displayGPA(gpa).toFixed(2)}
					</span>
				</h1>
			</div>
			<div className="flex justify-between items-center">
				<div className="w-[25%] text-center font-bold">
					<h2>MODULE</h2>
				</div>
				<div className="w-[25%] text-center font-bold">
					<h2>CREDITS</h2>
				</div>
				<div className="w-[25%] text-center font-bold">
					<h2>ECTS</h2>
				</div>
				<div className="w-[25%] text-center font-bold">
					<h2>GRADE</h2>
				</div>
			</div>
			<div className="results">
				{selectedModules.map((module, idx) => (
					<div
						className={`w-full flex justify-between items-center text-xs py-2 ${
							idx % 2 ? 'bg-[rgb(214,214,214)]' : 'bg-[rgb(194,194,194)]'
						}`}
					>
						<p className="w-[25%] text-center">{`${module.moduleID} ${module.moduleName}`}</p>
						<p className="w-[25%] text-center">{module.credits}</p>
						<p className="w-[25%] text-center">{module.akts}</p>
						<p
							className={`w-[25%] text-center font-bold ${module.grade}
							}`}
						>
							{module.grade}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ResultsModal;
