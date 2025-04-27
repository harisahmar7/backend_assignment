require('dotenv').config();
const pg = require('pg');
const redis = require('redis');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new pg.Client({
    connectionString: connectionString,
});
  

const redisClient = redis.createClient({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT
})

async function connectPG(){
    try{
        await client.connect();
    }catch(err){
        console.log(err)
    }
}

async function connectRedis(){
    try{
        redisClient.connect('connect', ()=>{
            console.log("Redis is Connected")
        })
    }catch(err){
        console.log(err)
    }
}

connectPG();

connectRedis();

async function subscriberService(){
    try{
        redisClient.subscribe('user_created', async (message) => {
            const data = JSON.parse(message);
            const modified_at = new Date();
            const insertIntoPG = await client.query(`INSERT INTO users_modified (id, "user", class, age, email, inserted_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7) Returning id`,[data.id, data.user, data.class, data.age, data.email, data.inserted_at, modified_at]);
            if(insertIntoPG.rows.length){
                console.log('User copied to users_modified:', data.id);
            }else{
                console.log("Data Not Found");
            }
          });
    }catch(err){
        console.log(err);
    }
    
}

subscriberService();
