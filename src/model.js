const interactor = require('../config/dbconfig');
const pg_interactor = interactor.pool;

module.exports = {
    insertIntoUser(id, user, className, age, email, inserted_at){
        return pg_interactor.query(`INSERT INTO users (id, "user", class, age, email, inserted_at) VALUES ($1, $2, $3, $4, $5, $6) Returning id`,[id, user, className, age, email, inserted_at])
    }
}
