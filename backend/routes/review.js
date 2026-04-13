const router = require('express').Router();
const { requireFields } = require('../middleware/validate');
const { handleReview }  = require('../controllers/reviewController');

router.post('/', requireFields(['candidateName', 'problemStatement', 'code']), handleReview);

module.exports = router;
