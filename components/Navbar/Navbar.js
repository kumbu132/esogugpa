import { useState, useEffect } from 'react';
import { useModules } from '../../context/context';
import {
	PlusSquareOutlined,
	MinusSquareOutlined,
	CalculatorOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import ResultsModal from '../ResultsModal/ResultsModal';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Link from 'next/link';
const Navbar = () => {
	const {
		selectedModules,
		handleIncreaseModules,
		handleDecreaseModules,
		calculateGPA,
		modalIsOpen,
		isHomePage,
	} = useModules();
	const [settingsMenuIsOpen, setSettingsMenuIsOpen] = useState(false);

	const closeMenu = () => {
		setSettingsMenuIsOpen(false);
	};

	return (
		<nav className="navbar flex justify-center items-center  h-[60px] w-full fixed top-0 bg-[#fcfcfc] border-b-1 border-solid border-gray-500 z-10 ">
			<div className="navbar-container flex justify-between items-center h-full w-full px-2 max-w-screen-md">
				{isHomePage && (
					<div className="number-of-modules-controls-wrapper flex justify-between items-center ">
						<div className="number-of-modules-buttons-wrapper flex justify-center items-center ">
							<button
								className="flex justify-center items-center w-5 h-5 mx-1 hover:opacity-60"
								onClick={() => handleDecreaseModules()}
							>
								<MinusSquareOutlined style={{ fontSize: '20px' }} />
							</button>
							<button
								className="flex justify-center items-center w-5 h-5 mx-1 hover:opacity-60"
								onClick={() => handleIncreaseModules()}
							>
								<PlusSquareOutlined style={{ fontSize: '20px' }} />
							</button>
						</div>
					</div>
				)}
				{isHomePage && (
					<div className="number-of-modules-text">
						Number of courses: {selectedModules.length}
					</div>
				)}
				{!isHomePage && (
					<div className="homepage-button-wrapper flex justify-between items-center ">
						<Link href="/">
							<a
								className="flex justify-center items-center h-5 mx-1
							hover:opacity-60"
							>
								<CalculatorOutlined style={{ fontSize: '20px' }} />
								<p className="mx-2 font-bold">CALCULATE GPA!</p>
							</a>
						</Link>
					</div>
				)}

				<div className="language-and-help-buttons-wrapper flex justify-center items-center">
					{isHomePage && (
						<button
							className="flex justify-center items-center w-5 h-5 mx-2 hover:opacity-60"
							onClick={calculateGPA}
						>
							<CalculatorOutlined style={{ fontSize: '20px' }} />
						</button>
					)}
					<div className="flex justify-center items-center w-5 h-5 mx-2 hover:cursor-pointer ">
						<SettingOutlined
							style={{ fontSize: '20px' }}
							className="hover:opacity-60"
							onClick={() => setSettingsMenuIsOpen(!settingsMenuIsOpen)}
						/>
						{settingsMenuIsOpen && <SettingsMenu closeMenu={closeMenu} />}
					</div>
				</div>
			</div>

			{modalIsOpen && <ResultsModal />}
		</nav>
	);
};

export default Navbar;
