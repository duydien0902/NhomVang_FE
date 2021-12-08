import { LIST_NEWS } from '../constants/ActionType'
export default function NewsReducers(state = {}, action) {
  switch (action.type) {
    case LIST_NEWS:
      return {
        ...state,
        listnews: action.payload
      }
    default:
      return state
  }
}
