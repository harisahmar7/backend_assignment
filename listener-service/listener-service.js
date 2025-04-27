const interactor = require('../config/dbconfig');
const pgModel = require('./model');
const redisClient = interactor.redisClient;

async function subscriberService(){
    try{
        redisClient.subscribe('user_created', async (message) => {
            const data = JSON.parse(message);
            const modified_at = new Date();
            const insertIntoPG = await pgModel.insertIntoUserModified(data, modified_at);
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
