
const express = require('express');
const router = express.Router();
const { worker } = require('../utils/worker');

router.route('/')
  .get((req, res) => res.json({ message: 'echoAtTime API' }));

router.route('/echoAtTime/:message/:timestamp')
  .post(async (req, res) => {
    const { message, timestamp } = req.params;
    try {
      if (!message || !timestamp) throw new Error();
      await worker.schedule('messageJob', timestamp, message);
      res.status(200).send({ message, status: 'added' });
    } catch (err) {
      res.status(400).send({ message, status: 'not added' });
    }
  });

module.exports = router;
