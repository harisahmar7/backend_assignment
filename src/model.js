const interactor = require('../config/dbconfig');
const pg_interactor = interactor.pool;

module.exports = {
    insertIntoUser(id, user, className, age, email, inserted_at){
        return pg_interactor.query(`INSERT INTO users (id, "user", class, age, email, inserted_at) VALUES ($1, $2, $3, $4, $5, $6) Returning id`,[id, user, className, age, email, inserted_at])
    },

    insertIntoUserModified(data, modified_at){
        return pg_interactor.query(`INSERT INTO users_modified (id, "user", class, age, email, inserted_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7) Returning id`,[data.id, data.user, data.class, data.age, data.email, data.inserted_at, modified_at]);
    }
}
