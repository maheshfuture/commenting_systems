const express = require('express');
const commentController = require('../controllers/commentController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:commentId/like', authenticateUser, commentController.likeComment);
router.post('/:commentId/dislike', authenticateUser, commentController.dislikeComment);
router.post('/reply', authenticateUser, commentController.replyToComment);

module.exports = router;
