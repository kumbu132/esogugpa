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
			message: 'Success!',
			description: 'Your message was successfully sent!',
			placement: 'top',
			closeIcon: <CloseCircleOutlined style={{ fontSize: '16px' }} />,
		});
	};
	const showFailToast = () => {
		notification.error({
			message: 'Error!',
			description: 'An error occured. Please try again later.',
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
				<title>ESOGU GPA CALCULATOR | Get in touch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-20 pointer-events-none">
				<Image
					src={'/images/esogu-logo.png'}
					alt="esogu"
					width="200"
					height="200"
				/>
			</span>
			<main className=" w-full mt-[60px] flex justify-center items-center">
				<form
					className="contact-form w-[768px]  my-5 py-5 px-5"
					onSubmit={handleSubmit}
				>
					<p className="text-lg">
						{`Hey there, my name is `}
						<span>
							<input
								type="text"
								value={formData.name}
								name="name"
								onChange={(e) => {
									setFormData({ ...formData, name: e.target.value });
								}}
								className="input-field max-w-[200px]"
								placeholder="your name here"
								required
							/>
						</span>
						<br />
						<br />
						{`I was wondering if you could assist me with `}
						<br />

						<span>
							<textarea
								value={formData.message}
								name="message"
								onChange={(e) => {
									setFormData({ ...formData, message: e.target.value });
								}}
								className="input-field w-full h-96"
								placeholder="short project description."
								wrap="true"
								required
							/>
						</span>
						<br />
						<br />
						{`You can reach me at `}
						<span>
							<input
								type="email"
								value={formData.email}
								name="email"
								onChange={(e) => {
									setFormData({ ...formData, email: e.target.value });
								}}
								className="input-field"
								placeholder="your email address."
								required
							/>
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
