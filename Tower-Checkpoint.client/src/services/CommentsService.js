import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class CommentsService {
  async create(newComment) {
    const res = await api.post("api/comments", newComment);
    logger.log("Creating comment", res.data);
    AppState.commentProfiles.push(res.data);
  }

  async getEventComments(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    logger.log("Getting Events Comments", res.data);
    AppState.comments = res.data;
  }

  async removeComment(commentId) {
    const res = await api.delete("api/comments/" + commentId);
    logger.log("Removing Comment", res.data);
    AppState.commentProfiles = AppState.commentProfiles.filter(
      (c) => c.id != commentId
    );
  }
}

export const commentsService = new CommentsService();
