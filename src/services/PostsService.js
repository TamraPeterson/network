import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log('get all posts', res.data.posts)
    AppState.posts = res.data.posts
  }
  // async changePage(val){
  //   let newPage = baseQuery.page + val
  //   let AppState.totalPages = 
  //   if (newPage > 0 && newPage <= AppState.totalPages) {
  //     baseQuery.page = newPage
  //     const res = await api.get('', {params: baseQuery})
  //     const posts = res.data.results.map(p => new Post(p))
  //     AppState.currentPage = newPage
  //   }
  // }
}

export const postsService = new PostsService()