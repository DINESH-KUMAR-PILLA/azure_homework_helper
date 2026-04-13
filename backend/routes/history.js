const router = require('express').Router();
const { handleList, handleGetOne, handleDelete } = require('../controllers/historyController');

router.get('/',    handleList);
router.get('/:id', handleGetOne);
router.delete('/:id', handleDelete);

module.exports = router;
