const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const channelController = require('../controllers/channel');

router.get('/', channelController.getAllChannels);
router.get('/search', channelController.searchChannelByKey);
router.get('/filter', channelController.filterChannelByCategory);
router.post('/', auth, channelController.createChannel);
router.put('/:id', [auth, admin], channelController.updateChannel);
router.delete('/:id', [auth, admin], channelController.deleteChannel);
router.get('/:id', channelController.getChannelById);

module.exports = router;