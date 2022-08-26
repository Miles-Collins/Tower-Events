import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from "../services/TicketsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTickets)
      .put('', this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTickets(req, res, next) {
      try {
        const tickets = await ticketsService.getByAccountId(req.userInfo.id)
        return res.send(tickets)
      } catch (error) {
        next(error)
      }
    }

    async edit(req, res, next) {
      try {
        // @ts-ignore
        const event = await accountService.edit(req.body)
        return res.send(event)
      } catch (error) {
        next(error)
      }
    }
}
