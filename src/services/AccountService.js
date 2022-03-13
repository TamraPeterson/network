import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from "../utils/Pop"
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async update(updateBody) {
    const res = await api.put('/account', updateBody)
    logger.log('[edit account]', res.data)
    AppState.account = res.data
    AppState.profile = res.data
  }
}

export const accountService = new AccountService()
