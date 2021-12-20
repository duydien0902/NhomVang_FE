import { LIST_NEWS, SET_LIST_NEWS } from '../constants/ActionType'
export default function NewsReducers(state = {}, action) {
  switch (action.type) {
    case LIST_NEWS:
      return {
        ...state,
        pager: action.pager,
        listnews: action.payload.data.newsList || [],
        total: action.payload.data.total || 0,
        page: 0
      }
    case SET_LIST_NEWS:
      return {
        ...state,
        listnews: action.payload.data.newsList || [],
        total: action.payload.data.total || 0,
        page: action.page
      }
    default:
      return state
  }
}
