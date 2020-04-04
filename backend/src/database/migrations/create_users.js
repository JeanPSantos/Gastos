
exports.up = function(knex) {
	return knex.schema.createTable('users', function (table) {
		//table.increments();
		table.string('name').primary();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.date('date');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};