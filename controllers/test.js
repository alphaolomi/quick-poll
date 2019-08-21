// @route GET /test
// @desc Loads form
async function index(req, res, next) {
  try {

    const Pusher = require('pusher');

    const channels_client = new Pusher({
      appId: '837311',
      key: '72f8830966153d8393d2',
      secret: '7810d9a0f9f5ea7ae10c',
      cluster: 'ap2',
      encrypted: true
    });

    channels_client.trigger('my-channel', 'my-event', {
      "message": "hello world 2"
    });


    res.status(200).json({success: true, votes: votes});
  } catch (error) {
    next(error);
  }
}


module.exports.index = index;
