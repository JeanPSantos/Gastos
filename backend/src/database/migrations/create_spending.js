
exports.up = function(knex) {
	return knex.schema.createTable('spending', function (table) {
		table.increments(); //id
		table.date('date').notNullable();
		table.decimal('value').notNullable();
		table.integer('spendingType_id').notNullable();
		table.foreign('spendingType_id').references('id').inTable('spendingTypes');
		table.string('user_name').notNullable();
		table.foreign('user_name').references('name').inTable('users');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('spending');
};
