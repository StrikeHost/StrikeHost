### Strike Host Backend

**Useful Commands:**

- `yarn start:dev` - Start the backend server in development mode, watching for any file changes.
- `yarn typeorm schema:drop` - Drops the current database
- `yarn typeorm schema:sync` - Syncs the existing database with the existing models
- `yarn seed:run` - Runs all existing seeders on the database.

It's worth mentioning that in order to run any typeorm commands, the `yarn start:dev` command must be run at least once before in order to generate the .js files needed.
