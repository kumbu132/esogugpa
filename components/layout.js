import Navbar from './Navbar/Navbar';

export default function Layout({ children }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
