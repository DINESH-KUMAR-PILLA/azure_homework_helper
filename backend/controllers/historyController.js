const { listSubmissions, getSubmissionById, deleteSubmission } = require('../services/dbService');

function handleList(req, res, next) {
  try {
    const page   = parseInt(req.query.page  || '1',  10);
    const limit  = parseInt(req.query.limit || '20', 10);
    const search = req.query.search || '';

    const result = listSubmissions({ page, limit, search });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

function handleGetOne(req, res, next) {
  try {
    const submission = getSubmissionById(Number(req.params.id));
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.json({ success: true, data: submission });
  } catch (err) {
    next(err);
  }
}

function handleDelete(req, res, next) {
  try {
    const deleted = deleteSubmission(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.json({ success: true, message: `Deleted submission ${req.params.id}` });
  } catch (err) {
    next(err);
  }
}

module.exports = { handleList, handleGetOne, handleDelete };
