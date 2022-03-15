import { useState, useEffect } from 'react';
import { useModules } from '../../context/context';
import {
	PlusSquareOutlined,
	MinusSquareOutlined,
	CalculatorOutlined,
	SettingOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import ResultsModal from '../ResultsModal/ResultsModal';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Link from 'next/link';
import { notification } from 'antd';
import 'antd/dist/antd.css';
const Navbar = () => {
	const {
		selectedModules,
		handleIncreaseModules,
		handleDecreaseModules,
		calculateGPA,
		modalIsOpen,
		isHomePage,
		incompleteModulesWarning,
	} = useModules();
	const [settingsMenuIsOpen, setSettingsMenuIsOpen] = useState(false);

	const closeMenu = () => {
		setSettingsMenuIsOpen(false);
	};

	const openNotification = (placement) => {
		notification.warning({
			message: 'Hata',
			description: 'Eksik alanları doldurun.',
			placement,
			closeIcon: <CloseCircleOutlined style={{ fontSize: '16px' }} />,
		});
	};
	const handleCalculateGPA = () => {
		calculateGPA();
		// console.log({ incompleteModulesWarning });
		// showWarning();
		// if (incompleteModulesWarning) {
		// 	openNotification('top');
		// }
	};

	const showWarning = () => {
		if (incompleteModulesWarning) {
			openNotification('top');
		}
	};

	useEffect(() => {
		// handleCalculateGPA();
		if (incompleteModulesWarning) {
			showWarning();
		}
	}, [incompleteModulesWarning]);

	return (
		<nav className="navbar flex justify-center items-center  h-[60px] w-full fixed top-0 bg-[#fcfcfc]  z-10">
			<div className="navbar-container flex justify-between items-center h-full w-full px-2 max-w-screen-md border-b">
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
						Ders sayısı: {selectedModules.length}
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
								<p className="mx-2 font-bold">GNO HESAPLA!</p>
							</a>
						</Link>
					</div>
				)}

				<div className="language-and-help-buttons-wrapper flex justify-center items-center">
					{isHomePage && (
						<button
							className="flex justify-center items-center w-5 h-5 mx-2 hover:opacity-60"
							onClick={handleCalculateGPA}
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
