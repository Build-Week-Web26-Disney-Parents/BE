// Update with your config settings.


const localpg = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "disney",
  password: "Madskills1."
}

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/projects.db3',
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    // add the following
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: localpg,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/postgresMigrations'
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};

//process.env.DATABASE_URL