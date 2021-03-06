module.exports = {
  //=====================>
  // Development
  //=====================>
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/bw-wmp-5.db3'
    },
    pool: {
      afterCreate: ( conn, done ) => {
        conn.run( 'PRAGMA foreign_keys = ON', done );
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  //=====================>
  // testing
  //=====================>
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/bw-wmp-5-testing.db3'
    },
    pool: {
      afterCreate: ( conn, done ) => {
        conn.run( 'PRAGMA foreign_keys = ON', done );
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  //=====================>
  // Production
  //=====================>
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
//===============================================================> EOF