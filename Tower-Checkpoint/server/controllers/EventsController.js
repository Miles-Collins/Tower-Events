import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";



export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getById)
    .get('/:id/tickets', this.getTickets)
    .get('/:id/comments', this.getComments)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .put('/:id', this.edit)
    .post('', this.create)
    .delete('/:id', this.archive)
  }


  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) { 
    try {
      const events = await eventsService.getAll()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const album = await eventsService.getById(req.params.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archive(req,res,next) {
    try {
      const message = await eventsService.archive(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getAll({eventId: req.params.id})
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  
  async getComments(req, res, next) {
    try {
    const comments = await commentsService.getAll({eventId: req.params.id})
    return res.send(comments)
    } catch (error) {
    next(error)
    }
  }
  async edit(req, res, next) {
    try {
      // @ts-ignore
      const event = await eventsService.edit(req.params.id, req.userInfo.id,req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  }
