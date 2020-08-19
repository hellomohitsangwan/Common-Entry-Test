const express = require('express');
const router = express.Router();

// Importing User Responses
const User = require('../models/user-model')

// Importing Questions 
const Easy = require('../models/easy-questions')
const Moderate = require('../models/moderate-questions')
const Difficult = require('../models/difficult-questions')



// Route Generating The Questions Ids Needed 
// Route Displaying the Ids For an User 
// Route For Storing The Response To an Id for an User

router.post('/generatequestions/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const {domain} = req.body
        if (!user.domain.includes(domain))
            res.send(`Sorry, You Havent Been Enrolled into ${domain}. Please Select The Domain `)
        else {
            const easyQs = await Easy.find({domain})
            const moderateQs = await Moderate.find({domain})
            const hardQs = await Difficult.find({domain})
            let idsEasy = []
            let idsModerate = []
            let idsDifficult = []
            easyQs.forEach(Q =>{idsEasy.push(Q._id)})
            moderateQs.forEach(Q => idsModerate.push(Q._id))
            hardQs.forEach(Q => idsDifficult.push(Q._id))

            // Putting Constraints For Each Questions 
            // Easy = Easy/2 ,
            // Moderate = Moderate/3 
            // Difficult = Difficult/5 

            

            res.send(idsEasy + '\n' + idsModerate + '\n' + idsDifficult )
        }
    }catch(e){
        console.log(e);
        res.send(e);
    }
        
})



module.exports = router ;






































/*


router.post('/temproute/:id', async (req, res) => {
    var id = req.params.id
    
    try {
        const username = await User.findById(id);
        const template = {easyIds: ['5f3923908cc1c1d5d1ee557f'], moderateIds:['5f392af88cc1c1d5d1ee5584'], difficultIds: ['5f392cc68cc1c1d5d1ee558a']}
        // console.log(template)
        // username.questionsIds.push(template)
        await username.populate('questionsIds.easyIds').populate('questionsIds.moderateIds').populate('questionsIds.difficultIds').execPopulate()
        // await username.save();
        // username.questionsIds.forEach(question => console.log(question))
        var temp = {id : '5f3923908cc1c1d5d1ee557f', answer : 'Hello World '}
        username.responses.push(temp);
        await username.populate('responses.id').execPopulate() 
        console.log(username.responses)
        res.send(username) 
    } catch (e) {
        console.log(e);
        res.send(e);
    } 
})




// const template = {easyIds: [ideasy, ideasy2], easyanswers: 'Hello World'}
        // username.responses.push(template)
        // let check = await username.populate('responses.easyIds').execPopulate() 
        // // console.log(username.responses)
        // username.responses.forEach(response => console.log(response))
        // // await username.save()
*/