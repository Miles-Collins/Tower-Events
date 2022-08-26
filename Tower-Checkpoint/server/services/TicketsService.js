import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TicketsService{
  async create(newTicket) {
    const event = await dbContext.Events.findById(newTicket.eventId)
    // @ts-ignore
    if(event.capacity == 0) {
      throw new BadRequest('Sorry, we are out of Tickets.')
    }
    const ticket = await dbContext.Tickets.create(newTicket)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    // @ts-ignore
    event.capacity -= 1
    // @ts-ignore
    event.save()
    return ticket
  }
  async delete(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('profile', 'name picture')
    if(!ticket){
      throw new BadRequest('No ticket by that Id')
    }
    // @ts-ignore
    if(ticket.accountId.toString() != userId) {
      throw new Forbidden ("You do not have permission to delete this ticket.")
    }
    const event = await dbContext.Events.findById(ticket.eventId)
    // @ts-ignore
    event.capacity += 1
    // @ts-ignore
    event.save()
    ticket.archived =! ticket.archived
    await ticket.save()
    return `Your ticket was archived`
  }
  
  async getByAccountId(accountId) {
    let tickets = await dbContext.Tickets.find({accountId}).populate('event')
    return tickets
  }
  async getAll(query = {}) {
    const tickets = await dbContext.Tickets.find(query).populate('profile', 'name picture')
    return tickets
  }

}

export const ticketsService = new TicketsService()