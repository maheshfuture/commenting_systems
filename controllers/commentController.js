const Comment = require('../models/Comment');

exports.likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.user;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId.equals(userId)) {
      return res.status(403).json({ message: 'Cannot like own comment' });
    }

    if (comment.likes.includes(userId)) {
      return res.status(400).json({ message: 'Already liked the comment' });
    }

    comment.likes.push(userId);
    await comment.save();

    res.json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.dislikeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.user;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId.equals(userId)) {
      return res.status(403).json({ message: 'Cannot dislike own comment' });
    }

    if (comment.dislikes.includes(userId)) {
      return res.status(400).json({ message: 'Already disliked the comment' });
    }

    comment.dislikes.push(userId);
    await comment.save();

    res.json({ message: 'Comment disliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.replyToComment = async (req, res) => {
  const { parentCommentId, text } = req.body;
  const { userId } = req.user;

  try {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const newComment = new Comment({
      text,
      authorId: userId,
      parentCommentId,
    });

    await newComment.save();

    res.json({ message: 'Comment replied successfully', newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
