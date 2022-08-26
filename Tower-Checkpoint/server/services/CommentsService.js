import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";

class CommentsService {
  
  async create(newComment) {
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('event')
    await comment.populate('creator', 'name picture')
    return comment
  }
  async delete(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if(!comment) {
      throw new BadRequest('No comment with that ID')
    }
    // @ts-ignore
    if(comment.accountId.toString() != userId) {
      throw new Forbidden('You do not have permission to delete that comment.')
    }
    await comment.remove()
    return 'Comment removed.' 
  }

  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comments
  }

}

export const commentsService = new CommentsService()