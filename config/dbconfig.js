const pg = require('pg');
const redis = require('redis');
require('dotenv').config();

const pool = new pg.Client({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT
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
    host : process.env.DB_HOST,
    port : process.env.REDIS_PORT
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
