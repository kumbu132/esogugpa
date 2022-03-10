import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import navbarTabs from './navbarTabs.json';
import styles from './Navbar.module.css';
import NavbarModal from './NavbarModal';

export default function Navbar() {
	const [activeTab, setActiveTab] = useState('portfolio');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const handleNavClick = (tabName) => {
		setActiveTab(tabName);
	};

	const handleBurgerClick = () => {
		setModalIsOpen(!modalIsOpen);
	};
	const router = useRouter();

	useEffect(() => {
		return () => {
			setActiveTab(router.pathname.substring(1));
			console.log('NextRouter: ->', router, activeTab);
		};
	}, []);
	return (
		<div className={styles.navbar}>
			{modalIsOpen && (
				<NavbarModal
					activeTab={activeTab}
					handleCloseClick={handleBurgerClick}
					handleNavClick={handleNavClick}
				/>
			)}
			<div className={styles.navbarContainer}>
				<Link href="/">
					<a className={styles.navbarLink}>
						<div className={styles.navbarLogo}>LOGO</div>
					</a>
				</Link>
				<div className={`${styles.navbarLinks} ${styles.web}`}>
					<div className={styles.navbarPageLinks}>
						{navbarTabs.map((tab, idx) => (
							<Link key={idx} href={tab.url}>
								<a
									className={`${styles.navbarLink} ${
										tab.name === activeTab ? styles.active : ''
									}`}
									onClick={() => handleNavClick(tab.name)}
								>
									{tab.name}
								</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.mobile}>
					<div className={styles.navbarBurger} onClick={handleBurgerClick}>
						<Image
							src="/images/svg/hamburger.svg"
							alt="menu"
							className={styles.hamburger}
							width="20"
							height="20"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
