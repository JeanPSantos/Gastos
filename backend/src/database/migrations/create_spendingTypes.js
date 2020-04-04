
exports.up = function(knex) {
	return knex.schema.createTable('spendingTypes', function (table) {
		table.increments(); //id
		table.string('description').notNullable();
		table.string('user_name').notNullable();
		table.foreign('user_name').references('name').inTable('users');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('spendingTypes');
};
