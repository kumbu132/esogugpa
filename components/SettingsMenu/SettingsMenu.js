import {
	QuestionCircleOutlined,
	InfoCircleOutlined,
	MessageOutlined,
	TranslationOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

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
			<Link href="/faqs">
				<a>
					<div
						className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
						onClick={closeMenu}
					>
						<QuestionCircleOutlined style={{ fontSize: '16px' }} />
						<p className="px-4">Frequently Asked Questions</p>
					</div>
				</a>
			</Link>
			<div
				className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
				onClick={closeMenu}
			>
				<InfoCircleOutlined style={{ fontSize: '16px' }} />
				<p className="px-4">About</p>
			</div>
			<Link href="/getintouch">
				<a>
					<div
						className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
						onClick={closeMenu}
					>
						<MessageOutlined style={{ fontSize: '16px' }} />
						<p className="px-4">Get in touch</p>
					</div>{' '}
				</a>
			</Link>
		</div>
	);
};

export default SettingsMenu;
