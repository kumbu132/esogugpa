import Image from 'next/image';
import Link from 'next/link';
import styles from './NavbarModal.module.css';
import navbarTabs from './navbarTabs.json';

const NavbarModal = ({ activeTab, handleCloseClick, handleNavClick }) => {
	const handleTabClick = (tabName) => {
		handleNavClick(tabName);
		handleCloseClick();
	};
	return (
		<div className={styles.navbarModal}>
			<div className={styles.headerSection}>
				<div className={styles.logo}>LOGO</div>
				<div className={styles.closeButton} onClick={handleCloseClick}>
					<Image
						src="/images/svg/close.svg"
						alt="close"
						width="20"
						height="20"
					/>
				</div>
			</div>
			<div className={styles.navLinksContainer}>
				<div className={styles.navLinks}>
					{navbarTabs.map((tab, idx) => (
						<Link key={idx} href={tab.url}>
							<a
								className={`${styles.navbarLink} ${
									tab.name === activeTab ? styles.active : ''
								}`}
								onClick={() => handleTabClick(tab.name)}
							>
								{tab.name}
							</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default NavbarModal;
