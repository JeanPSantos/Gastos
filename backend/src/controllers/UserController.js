const connection = require('../database/connection');

module.exports = {

	async index (request, response) {
		const users = await connection('users').select('*');
		return response.json(users);
	},

	async create(request, response) {
		const { name, email, password, date } = request.body;
		
		await connection('users').insert({
			name, email, password, date
		})

		return response.json({ name });
	}
};