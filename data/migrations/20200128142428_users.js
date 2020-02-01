
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments()

        users
            .string('username', 256)
            .notNullable()
            .unique()
        users.string('password', 256).notNullable()
        users.string('name', 256).notNullable()
        users.string('role', 256).notNullable()
        users.string('phone', 256).notNullable()
        users.string('numberOfChildren', 256).notNullable()
        users.string('location', 256).notNullable()
        users.timestamps(true, true)

    })
        .createTable('posts', tbl => {
            tbl.increments()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('title', 256).notNullable()
            tbl.string('contents', 256).notNullable()
            tbl.timestamps(true, true)
        })
        .createTable('comments', tbl => {
            tbl.increments()
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('contents', 256).notNullable()
            tbl.timestamps(true, true)
        })
        .createTable('messages', tbl => {
            tbl.increments()
            tbl.integer('from_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('to_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.string('message', 256).notNullable()
            tbl.timestamps(true, true)
        })
}


exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('messages')
        .dropTableIfExists('comments')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')

};
