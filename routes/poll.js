const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const Vote = require('../models/Vote');

//Initialize Pusher
var pusher = new Pusher({
    appId: '465266',
    key: '6039dc60c4df6d2d3df1',
    secret: '885784672fbf5f7cf3f9',
    cluster: 'ap2',
    encrypted: true
  });




router.get('/',(req , res)=>{
     res.send('POLL');
});

router.post('/',(req , res) =>{
   
   const newVote = {
     os:req.body.os,
     points:1
   }
 
   new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-votes', {
      points:parseInt(vote.points),
      os:vote.os
    });

    return res.json({success:true,  msg:'Thank you for voting'});
   });

    
});

module.exports = router;