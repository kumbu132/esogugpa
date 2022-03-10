import Navbar from './Navbar/tempn';

export default function Layout({ children }) {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
}
