const SendInBlue = require('sendinblue-api');
const config = require('config');

const params = {
	apiKey: config.get('sendInBlue:apiKey')
	, timeout: 5000
}

const sendInBlue = new SendInBlue(params);

const sendTemplate = (templateId, to, params) => {

	return new Promise((res, rej) => {
		sendInBlue.send_transactional_template(
			{
				id: templateId
				, to: to
				, attr: params
			},
			(err, result) => {
				if (err) { return rej(err) }
				return res(result);
			}
		)
	})
}

module.exports = { sendTemplate }