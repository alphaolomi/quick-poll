const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/vote');

const DB_URI = process.env.DB_DATABASE || "mongodb://localhost:27017/votemono";

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose
  .connect(DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const PUSHER_APP_KEY = process.env.PUSHER_APP_KEY || "";
const PUSHER_APP_ID = process.env.PUSHER_APP_ID || "";
const PUSHER_APP_SECRET = process.env.PUSHER_APP_SECRET || "";
const PUSHER_APP_CLUSTER = process.env.PUSHER_APP_CLUSTER || "";
const PUSHER_APP_ENCRYPTED = process.env.PUSHER_APP_ENCRYPTED || true;


const pusher = new Pusher({
  appId: PUSHER_APP_KEY,
  key: PUSHER_APP_ID,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  useTLS: PUSHER_APP_ENCRYPTED
});


// @route GET /
// @desc Loads form
async function index(req, res, next) {
  try {
    Vote.find().then(votes => res.status(200).json({success: true, votes: votes}));
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
      return res.status(200).json({success: true, message: 'Thank you for voting'});
    });
  } catch (error) {
    next(error);
  }
}


module.exports.index = index;
module.exports.store = store;
