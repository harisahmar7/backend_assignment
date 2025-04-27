const { v4: uuidv4 } = require('uuid');
const interactor = require('../config/dbconfig');
const pgModel = require('./model');
const redisClient = interactor.redisClient;


module.exports = {
    async receiver(req, res){
      try{
        const { user, class: className, age, email } = req.body;
        console.log(req.body);
        if (!user || !className || !age || !email) {
          return res.status(400).json({ error: 'Invalid input' });
        }
      
        const id = uuidv4();
        console.log("id------------>",id);
        const inserted_at = new Date();
        const insertIntoPG = await pgModel.insertIntoUser(id, user, className, age, email, inserted_at);

        if(insertIntoPG.rows.length){
            await redisClient.publish('user_created', JSON.stringify({
          id, user, class: className, age, email, inserted_at
        }));
        
        }else{
            res.status(404).json({ status : `Data Not Found`})
        }
    
        res.status(201).json({ status: 'User received and published' });
      }catch(err){
        console.log(err);
        res.status(502).json({
          msg : -1,
          error : err
        })
      }
    }
}