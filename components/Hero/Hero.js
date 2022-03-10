import styles from './Hero.module.css';

const Hero = () => {
	return (
		<div className={styles.Hero}>
			<div className={styles.heroContainer}>
				<h1 className={styles.heroTitle}>ESOGU GPA</h1>
				<div className={styles.heroSubtitle}>CALCULATE YOUR GPA</div>
				<div className={styles.heroButtonContainer}>
					<a href="#calculate" rel="noopener noreferrer">
						<div className={styles.button}>CALCULATE</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
