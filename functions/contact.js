exports.handler = async function (event, context) {
	let statusCode = 500;
	let message = 'internal error';
	let nodemailer = require('nodemailer');
	const transporter = nodemailer.createTransport({
		port: 465,
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: process.env.BURNER_EMAIL_ADDRESS,
			pass: process.env.BURNER_EMAIL_PASSWORD,
		},
		secure: true,
	});

	const reqBody = JSON.parse(event.body);
	const mailData = {
		from: process.env.BURNER_EMAIL_ADDRESS,
		to: [process.env.PERSONAL_EMAIL_ADDRESS],
		subject: `Message From ${reqBody.name}`,
		text:
			`Hello there, my name is ` +
			reqBody.name +
			` \nI was wondering if you could assist me with ` +
			reqBody.message +
			`.\nYou can reach me at ` +
			reqBody.email +
			'.',
		html: `<div>Hello there, my name is <span style="color:orange;">${reqBody.name}</span> <p>I was wondering if you could assist me with  <span style="color:orange;">${reqBody.message}.</span></p></div><p>You can reach me at ${reqBody.email}</p>`,
	};

	const sendMail = async () => {
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailData, function (err, info) {
				if (err) {
					console.log({ err });
					reject();
				} else {
					message = 'success OK';
					statusCode = 200;
					console.log({ mailData });
					resolve();
				}
			});
		});
	};

	await sendMail();
	return {
		statusCode,
		body: JSON.stringify({ message }),
	};
};
