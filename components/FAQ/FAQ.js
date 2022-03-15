import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const FAQ = ({ question, answer, id, active, setActive }) => {
	const handleFAQClick = () => {
		if (active === id) {
			setActive('');
		} else {
			setActive(id);
		}
	};
	return (
		<div className="p-4 border cursor-pointer" onClick={handleFAQClick}>
			<div className="flex justify-between items-center">
				<p>{question}</p>
				{active !== id && <CaretDownOutlined style={{ fontSize: '16px' }} />}
				{active === id && <CaretUpOutlined style={{ fontSize: '16px' }} />}
			</div>
			{active === id && <p className="animate-moduleCard">{answer}</p>}
		</div>
	);
};

export default FAQ;