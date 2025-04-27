const pg = require('pg');
const redis = require('redis');
require('dotenv').config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new pg.Client({
    connectionString: connectionString,
  });

const connectPostgres = async ()=>{
    try{
        await client.connect();
        console.log("Postgres is connected");
    }catch(err){
        console.error('Error in Postgres Connection', err);
    }
}

const redisClient = redis.createClient({
    url: 'redis://redis:6379'
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

module.exports = {client, redisClient};
