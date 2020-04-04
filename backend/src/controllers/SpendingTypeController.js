const connection = require('../database/connection');

module.exports = {

	async index(request, response) {
		const { page = 1} = request.query;

		const [count] = await connection('spendingTypes').count();
		console.log(count);

		const spendingTypes = await connection('spendingTypes')
			.limit(5)
			.offset((page -1) * 5)
			.select('*');

		response.header('X-Total-Count', count['count(*)']);

		return response.json(spendingTypes);
	},

	async create(request, response) {
		const { description } = request.body;

		const user_name = request.headers.authorization;

		const [id] =  await connection('spendingTypes').insert({
			description,
			user_name
		});

		return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const user_name = request.headers.authorization;

		const spendingTypes = await connection('spendingTypes')
			.where('id', id)
			.select('user_name')
			.first();

		if(spendingTypes.user_name !== user_name) {
			return response.status(401).json({ error: 'Operação não permitida' });
		}

		await connection('spendingTypes').where('id', id).delete();

		return response.status(204).send();
	}
};