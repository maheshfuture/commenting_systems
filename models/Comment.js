const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
});

module.exports = mongoose.model('Comment', commentSchema);
