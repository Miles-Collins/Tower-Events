import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class EventsService {
  async getEvents() {
    const res = await api.get("api/events");
    // logger.log("Events Data:", res.data);
    AppState.events = res.data;
  }

  async getById(id) {
    const res = await api.get("api/events/" + id);
    logger.log("Getting Event by Id", res.data);
    AppState.activeEvent = res.data;
  }

  async createEvent(newEvent) {
    const res = await api.post("api/events", newEvent);
    logger.log("Creating Event", res.data);
    AppState.events.unshift(res.data);
    return res.data;
  }
}

export const eventsService = new EventsService();
