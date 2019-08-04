const Pusher = require('pusher');
const Vote = require('../models/vote');

const PUSHER_APP_KEY = process.env.PUSHER_APP_KEY || "";
const PUSHER_APP_ID = process.env.PUSHER_APP_ID || "";
const PUSHER_APP_SECRET = process.env.PUSHER_APP_SECRET || "";
const PUSHER_APP_CLUSTER = process.env.PUSHER_APP_CLUSTER || "";

const pusher = new Pusher({
  appId: PUSHER_APP_KEY,
  key: PUSHER_APP_ID,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  encrypted: ""
});


// @route GET /
// @desc Loads form
async function index(req, res, next) {
  try {
    Vote.find().then(votes => res.status(200).json({ success: true, votes: votes }));
  } catch (error) {
    next(error);
  }
}


// @route POST /
// @desc Loads form
async function store(req, res, next) {
  try {
    const newVote = {
      os: req.body.os,
      points: 1
    };

    new Vote(newVote).save().then(vote => {
      pusher.trigger('os-poll', 'os-vote', {
        points: parseInt(vote.points),
        os: vote.os
      });

      return res.status(200).json({ success: true, message: 'Thank you for voting' });
    });
  } catch (error) {
    next(error);
  }
}


module.exports.index = index;
module.exports.store = store;
