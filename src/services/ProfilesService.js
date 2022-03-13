import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('get profile', res.data)
    AppState.profile = res.data
  }

  async editProfile(edits) {
    const res = await api.put('api/profiles/' + edits.id, edits)
    logger.log('edit profile', res.data)
  }
}

export const profilesService = new ProfilesService()