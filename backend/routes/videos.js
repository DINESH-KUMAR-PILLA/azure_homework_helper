const router = require('express').Router();
const { requireQuery }  = require('../middleware/validate');
const { handleVideos }  = require('../controllers/videosController');

router.get('/', requireQuery(['concept']), handleVideos);

module.exports = router;
