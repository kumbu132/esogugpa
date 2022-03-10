import { useState } from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
const Navbar = () => {
	const [numberOfCourses, setNumberOfCourses] = useState(0);

	return (
		<nav className="navbar flex justify-center items-center  h-[60px] w-full absolute top-0 border-b-1 border-solid border-[rgba(0,0,0,0.05)]  ">
			<div className="navbar-container flex justify-between items-center h-full w-full px-2 max-w-screen-md">
				<div className="number-of-modules-controls-wrapper flex justify-between items-center w-[55%]">
					<div className="number-of-modules-buttons-wrapper flex justify-center items-center ">
						<button className="flex justify-center items-center w-5 h-5 mx-1">
							<MinusSquareOutlined />
						</button>
						<button className="flex justify-center items-center w-5 h-5 mx-1">
							<PlusSquareOutlined />
						</button>
					</div>
					<div className="number-of-modules-text">Number of courses: 5</div>
				</div>
				<div className="language-and-help-buttons-wrapper flex justify-center items-center">
					<button className="flex justify-center items-center w-5 h-5 mx-2" />
					<button className="flex justify-center items-center w-5 h-5 mx-2" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
