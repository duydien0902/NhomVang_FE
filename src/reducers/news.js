import {
  LIST_NEWS,
  SET_LIST_NEWS,
  NEWS_PAGE_UNLOADED,
  SETSTATE_LIST_NEWS,
  LIST_NEWS_TAGS
} from '../constants/ActionType'
const initialState = {
  setState: {
    tags: ''
  }
}
export default function NewsReducers(state = initialState, action) {
  switch (action.type) {
    case LIST_NEWS:
      return {
        ...state,
        pager: action.pager,
        listnews: action.payload.data.newsList || [],
        total: action.payload.data.total || 0,
        page: 0,
        reload: false
      }
    case SET_LIST_NEWS:
      return {
        ...state,
        listnews: action.payload.data.newsList || [],
        total: action.payload.data.total || 0,
        page: action.page
      }
    case SETSTATE_LIST_NEWS:
      return {
        ...state,
        setState: { ...state.setState, [action.key]: action.value }
      }
    case LIST_NEWS_TAGS:
      return {
        ...state,
        listnews: action.payload.data.newsList || [],
        total: action.payload.data.total || 0
      }
    case NEWS_PAGE_UNLOADED:
      return {}
    default:
      return state
  }
}
