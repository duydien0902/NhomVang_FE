import {
  ADD_ITEM,
  CART_PAGE_LOADED,
  CART_PAGE_UNLOADED,
  CLOSE_CART_DRAWER,
  REMOVE_ITEM,
  TOGGLE_CART_DRAWER,
  UPDATE_QUANTITY
} from '../constants/ActionType'

const initialState = {
  items: [],
  total: 0,
  discountTotal: 0,
  cartVisible: false
}

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_PAGE_LOADED:
    case UPDATE_QUANTITY:
    case ADD_ITEM:
    case REMOVE_ITEM: {
      return {
        ...state,
        items: action.cart.items,
        total: action.cart.total,
        discountTotal: action.cart.discountTotal
      }
    }

    case CART_PAGE_UNLOADED:
      return initialState

    case TOGGLE_CART_DRAWER:
      return {
        ...state,
        cartVisible: !state.cartVisible
      }

    case CLOSE_CART_DRAWER:
      return {
        ...state,
        cartVisible: false
      }

    default:
      return state
  }
}
