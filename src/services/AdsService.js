import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdsService {

  async getAds() {
    const res = await api.get('api/ads')
    logger.log('get ads', res.data)
    AppState.ads = res.data
  }
}

export const adsService = new AdsService()