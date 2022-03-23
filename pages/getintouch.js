import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useModules } from '../context/context';
import axios from 'axios';
import { notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const GetInTouch = () => {
	const { setIsHomePage } = useModules();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const clearForm = () => {
		setFormData({ name: '', email: '', message: '' });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('/.netlify/functions/contact', formData)
			.then(function (response) {
				if (response.status === 200) {
					showSuccessToast();
					clearForm();
				}
			})
			.catch(function (error) {
				console.log(error);
				showFailToast();
			});
	};

	const showSuccessToast = () => {
		notification.success({
			message: 'Başarı!',
			description: 'Mesajınız başarıyla gönderildi!',
			placement: 'top',
			closeIcon: <CloseCircleOutlined style={{ fontSize: '16px' }} />,
		});
	};
	const showFailToast = () => {
		notification.error({
			message: 'Hata!',
			description: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
			placement: 'top',
			closeIcon: <CloseCircleOutlined style={{ fontSize: '16px' }} />,
		});
	};

	useEffect(() => {
		setIsHomePage(false);
	}, []);
	return (
		<div className="wrapper max-w-screen-md relative">
			<Head>
				<title>ESOGU GNO HESAPLAMA| İletişime geçin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-10 pointer-events-none">
				<Image
					src={'/images/esogu-logo.png'}
					alt="esogu"
					width="200"
					height="200"
				/>
			</span>
			<main className=" w-full pt-[60px] p-3">
				<h1 className="text-3xl my-3 font-bold">İletişime geçin</h1>
				<p className="text-lg py-3 text-justify border-b">
					Bu site bir öğrenci tarafından diğer öğrencilere yardımcı olmak için
					yapılmıştır. Web sitesini beraber yönetelim. Herhangi bir yorumunuz,
					öneriniz veya bir hata bildirmek istiyorsanız, çekinmeyin. Bir mesaj
					gönderin!
				</p>

				<form
					className="contact-form w-full mt-6 text-justıfy text-lg"
					onSubmit={handleSubmit}
				>
					<p className="text-lg">
						{`Merhaba, ismim `}
						<span>
							<input
								type="text"
								value={formData.name}
								name="name"
								onChange={(e) => {
									setFormData({ ...formData, name: e.target.value });
								}}
								className="input-field border-b max-w-[200px]"
								placeholder="isminizi buraya yazın."
								required
							/>
						</span>
						<br />

						<span>
							<textarea
								value={formData.message}
								name="message"
								onChange={(e) => {
									setFormData({ ...formData, message: e.target.value });
								}}
								className="input-field border-b w-full h-64"
								placeholder="Mesajınızı buraya yazın"
								wrap="true"
								required
							/>
						</span>
						<br />
						<br />
						{`Bana `}
						<span>
							<input
								type="email"
								value={formData.email}
								name="email"
								onChange={(e) => {
									setFormData({ ...formData, email: e.target.value });
								}}
								className="input-field border-b w-[250px]"
								placeholder="eposta adresinizi buraya yazin."
								required
							/>
							{/*if english, don't display logic */}
							{` dan ulaşabilirsiniz.`}
						</span>
						<br />
					</p>
					<div className="py-[15px] flex justify-center items-center">
						<input
							type="submit"
							value="Send"
							className="cursor-pointer rounded uppercase py-[10px] w-32 bg-[#b8926a] hover:bg-[rgba(184,146,106,0.9)]"
						/>
					</div>
				</form>
			</main>
		</div>
	);
};

export default GetInTouch;
