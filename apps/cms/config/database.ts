export default ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "postgres"),
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "vetroots"),
      user: env("DATABASE_USERNAME", "vetroots"),
      password: env("DATABASE_PASSWORD", "vetroots_dev"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
