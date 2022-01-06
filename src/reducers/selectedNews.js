import { SELECTED_NEWS, SELECTED_NEWS_UNLOADED } from '../constants/ActionType'
export default function SelectedNewsReducers(state = {}, action) {
  switch (action.type) {
    case SELECTED_NEWS:
      return {
        ...state,
        newsdetail: action.payload,
        reload: false
      }
    case SELECTED_NEWS_UNLOADED:
      return {}
    default:
      return state
  }
}
