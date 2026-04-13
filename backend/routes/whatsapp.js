const router = require('express').Router();
const { requireFields } = require('../middleware/validate');
const { handleSend }    = require('../controllers/whatsappController');

router.post('/send', requireFields(['phone', 'submissionId']), handleSend);

module.exports = router;
