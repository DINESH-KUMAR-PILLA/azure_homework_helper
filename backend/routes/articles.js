const router = require('express').Router();
const { requireQuery }    = require('../middleware/validate');
const { handleArticles }  = require('../controllers/articlesController');

router.get('/', requireQuery(['concept']), handleArticles);

module.exports = router;
