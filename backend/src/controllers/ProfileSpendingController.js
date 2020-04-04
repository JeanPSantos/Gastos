const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const user_name = request.headers.authorization;
		const { page = 1} = request.query;

		const [count] = await connection('spending').count().where('user_name', user_name);

		const spending = await connection('spending')
			.where('user_name', user_name)
			.limit(5)
			.offset((page -1) * 5)
			.select('*');

		response.header('X-Total-Count', count['count(*)']);

		return response.json(spending);
	}
}
