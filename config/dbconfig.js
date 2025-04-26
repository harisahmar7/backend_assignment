const pg = require('pg');
const redis = require('redis');

const pool = new pg.Client({
    user : `postgres`,
    password : `admin`,
    host : `localhost`,
    port : 5432
})

const connectPostgres = async ()=>{
    try{
        await pool.connect();
        console.log("Postgres is connected");
    }catch(err){
        console.error('Error in Postgres Connection', err);
    }
}

const redisClient = redis.createClient({
    host : `localhost`,
    port : 6379
});



const connectRedis  = async ()=>{
    try{
        redisClient.connect('connect', ()=>{
            console.log("Redis is connected");
        })
        console.log("Redis is connected");
        return redisClient;
    }catch(err){
        console.error('Error in Redis Connection', err);
    }
}

connectPostgres();
connectRedis();

module.exports = {pool, redisClient};
