import { SELECTED_PRODUCT } from '../constants/ActionType'
export default function SelectedProductReducers(state = {}, action) {
  switch (action.type) {
    case SELECTED_PRODUCT:
      return {
        ...state,
        productdetail: action.payload.data.product
      }
    default:
      return state
  }
}
