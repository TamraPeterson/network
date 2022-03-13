import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdsService {

  getAds() {
    const res = await api.get('api/ads')
    logger.log('get ads', res.data)
  }
}

export const adsService = new AdsService