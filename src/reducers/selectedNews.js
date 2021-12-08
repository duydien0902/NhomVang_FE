import { SELECTED_NEWS } from '../constants/ActionType'
export default function SelectedNewsReducers(state = {}, action) {
  switch (action.type) {
    case SELECTED_NEWS:
      return {
        ...state,
        newsdetail: action.payload
      }
    default:
      return state
  }
}
