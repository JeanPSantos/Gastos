const connection = require('../database/connection');

module.exports = {

	async index(request, response) {
		const { page = 1} = request.query;

		const [count] = await connection('spending').count();

		const spending = await connection('spending')
			.join('spendingTypes', 'spendingTypes.id', '=', 'spending.spendingType_id')
			.limit(5)
			.offset((page -1) * 5)
			//.select('*');
			.select(['spending.*', 'spendingTypes.description']);

		response.header('X-Total-Count', count['count(*)']);
		
		return response.json(spending);
	},

	async create(request, response) {
		const { date, value, spendingType_id } = request.body;

		const user_name = request.headers.authorization;

		const [id] =  await connection('spending').insert({
			date,
			value,
			spendingType_id,
			user_name,
		});

		return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const user_name = request.headers.authorization;

		const spending = await connection('spending')
			.where('id', id)
			.select('user_name')
			.first();

		if(spending.user_name !== user_name) {
			return response.status(401).json({ error: 'Operação não permitida' });
		}

		await connection('spending').where('id', id).delete();

		return response.status(204).send();
	}
};