import { AppState } from "../AppState"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAllPosts(query = {}) {
    const res = await api.get('api/posts', { params: query })
    logger.log('get all posts', res.data)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }
  async getPostsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    logger.log('get post by profile', res.data)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }
  async getNewer() {
    const res = await api.get(AppState.newerPage)
    logger.log('get newer', res.data)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older

  }
  async getOlder() {
    const res = await api.get(AppState.olderPage)
    logger.log('get older', res.data)
    AppState.posts = res.data.posts
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
  }

  async create(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('create post', res.data)
    AppState.posts.push(res.data)
    this.getAllPosts()
  }

  async remove(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('delete post', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

  async like(id) {
    const res = await api.post('api/posts/' + id + '/like')
    logger.log('resdata for likes', res.data)
    logger.log('like post', res.data.likes.length)
    AppState.likes = res.data.likes
    this.getAllPosts()
  }



}

export const postsService = new PostsService()