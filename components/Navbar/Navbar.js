import { useModules } from '../../context/context';
import {
	PlusSquareOutlined,
	MinusSquareOutlined,
	CalculatorOutlined,
} from '@ant-design/icons';
const Navbar = () => {
	const {
		selectedModules,
		handleIncreaseModules,
		handleDecreaseModules,
		calculateGPA,
	} = useModules();

	return (
		<nav className="navbar flex justify-center items-center  h-[60px] w-full fixed top-0 border-b-1 border-solid border-gray-500 z-10 ">
			<div className="navbar-container flex justify-between items-center h-full w-full px-2 max-w-screen-md">
				<div className="number-of-modules-controls-wrapper flex justify-between items-center w-[55%]">
					<div className="number-of-modules-buttons-wrapper flex justify-center items-center ">
						<button
							className="flex justify-center items-center w-5 h-5 mx-1"
							onClick={() => handleDecreaseModules()}
						>
							<MinusSquareOutlined />
						</button>
						<button
							className="flex justify-center items-center w-5 h-5 mx-1"
							onClick={() => handleIncreaseModules()}
						>
							<PlusSquareOutlined />
						</button>
					</div>
					<div className="number-of-modules-text">
						Number of courses: {selectedModules.length}
					</div>
				</div>
				<div className="language-and-help-buttons-wrapper flex justify-center items-center">
					<button className="flex justify-center items-center w-5 h-5 mx-2" />
					<button
						className="flex justify-center items-center w-5 h-5 mx-2"
						onClick={calculateGPA}
					>
						<CalculatorOutlined />
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
