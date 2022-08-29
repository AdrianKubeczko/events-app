# Requirements
- Node.js installed
- running instance of PostgreSQL database

# DB setup
1. Change data present in `src/server/constants/events-db.js` according to where you want to host the DB and the user you want to acces it with.
2. Run `yarn dbSetup` in the project root

Database along with table used for all the current project's actions should be up and running now.

# Available scripts
- `yarn host` - starts an express server on localhosl:5000
- `yarn start` - starts the application on localhosl:3000
- `yarn test` - runs available test: **frontend:** components and redux reducers, **backend:** endpoint requests
