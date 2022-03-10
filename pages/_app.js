import { ModulesProvider } from '../context/context';
import Layout from '../components/layout';
import '../styles/global.css';
export default function App({ Component, pageProps }) {
	return (
		<ModulesProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ModulesProvider>
	);
}
