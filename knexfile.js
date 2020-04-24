module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/auth2-project.db3' //set db3 file path here *note* Also sets db3 file name after knex migration
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  migrations: {
    directory: "./data/migrations", //set migrations path here.
  },
    seeds: {
      directory: "./data/seeds", //set seeds path here
    }
  },
};