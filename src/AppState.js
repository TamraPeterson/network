import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  newerPage: null,
  olderPage: null,
  profile: {},
  allProfiles: [],
  ads: [],
  likes: []
})
