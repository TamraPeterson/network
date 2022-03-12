import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {

  async getAllProfiles(query = {}) {
    const res = await api.get('api/profiles', { params: query })
    logger.log('get all profiles', res.data)
    AppState.allProfiles = res.data

  }
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('get profile', res.data)
    AppState.profile = res.data
  }
}

export const profilesService = new ProfilesService()