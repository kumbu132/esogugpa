import { QuestionCircleOutlined, TranslationOutlined } from '@ant-design/icons';
import Image from 'next/image';

const SettingsMenu = ({ closeMenu }) => {
	return (
		<div className="absolute top-[58px] w-[300px] translate-x-[-45%] overflow-hidden h-max animate-fadeIn z-50">
			<div className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm">
				<TranslationOutlined style={{ fontSize: '16px' }} />
				<p className="px-4">Language: English</p>
			</div>
			<div className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm">
				<Image src="/images/moon.svg" alt="moon" width="16" height="16" />
				<p className="px-4">THEME</p>
			</div>
			<div
				className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
				onClick={closeMenu}
			>
				<QuestionCircleOutlined style={{ fontSize: '16px' }} />
				<p className="px-4">Frequently Asked Questions</p>
			</div>
		</div>
	);
};

export default SettingsMenu;
