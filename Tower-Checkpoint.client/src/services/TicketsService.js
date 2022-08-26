import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class TicketsService {
  async create(newTicket) {
    const res = await api.post("api/tickets", newTicket);
    logger.log("Creating Ticket", res.data);
    AppState.ticketsProfiles.push(res.data);
  }

  async getTicketByAccountId() {
    const res = await api.get("account/tickets");
    logger.log("Getting Ticket by Account Id", res.data);
    AppState.ticketsProfiles = res.data;
  }

  async getTicketByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    logger.log("Getting Ticket by Event Id", res.data);
    AppState.tickets = res.data;
  }

  async delete(ticketId) {
    logger.log('Ticket', ticketId)
    const res = await api.delete(`api/tickets/${ticketId}`);
    logger.log("Deleting Ticket", res.data);
    AppState.tickets = AppState.ticketsProfiles.filter(t => t.id != ticketId);
    AppState.tickets = AppState.tickets.filter(t => t.id != ticketId);
  }
}

export const ticketsService = new TicketsService();
