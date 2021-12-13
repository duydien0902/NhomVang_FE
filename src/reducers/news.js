import { LIST_NEWS } from '../constants/ActionType'
export default function NewsReducers(state = {}, action) {
  switch (action.type) {
    case LIST_NEWS:
      return {
        ...state,
        listnews: action.payload.data.newsList,
        total: action.payload.data.total
      }
    default:
      return state
  }
}
