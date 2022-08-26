import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";

class EventsService {
  async getAll() {
    const events = await dbContext.Events.find().populate('creator', 'name coverImg')
    return events
  }
  async create(newEvent) {
    const event = await dbContext.Events.create(newEvent)
    await event.populate('creator', 'name coverImg')
    return event
  }
  async getById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name coverImg')
    if(!event) {
      throw new BadRequest('There is no Event by that Id')
    }
    return event
  }
  async archive(eventId, userId) {
    const event = await this.getById(eventId)
    // @ts-ignore
    if(event.creatorId.toString() != userId) {
      throw new Forbidden("You do not have permission to delete this Event.")
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    return `Event ${event.name} was deleted`
  }
  
  async edit(eventId, userId, eventData) {
    let event = await this.getById(eventId)
    if(eventData.isCanceled != true) {
      throw new BadRequest("Nah fam")
    }
    // @ts-ignore
    if(event.creatorId.toString() != userId) {
      throw new Forbidden("You do not have permission to Edit this Event.")
    }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate
    event.type = eventData.type || event.type
    
    await event.save()
    return event
  }
}

export const eventsService = new EventsService()