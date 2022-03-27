import {
  ADD_ALL_TO_CHECKOUT,
  ADD_TO_CHECKOUT,
  CART_LOADED,
  CART_LOADING,
  CLOSE_CART_DRAWER,
  REMOVE_ALL_FROM_CHECKOUT,
  REMOVE_FROM_CHECKOUT,
  REMOVE_ITEM,
  TOGGLE_CART_DRAWER,
  UPDATE_CART,
  UPDATE_QUANTITY
} from '../constants/ActionType'

const initialState = {
  items: [],
  checkoutItems: [],
  total: 0,
  discountTotal: 0,
  isLoading: true,
  cartVisible: false
}

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_LOADING: {
      return { ...state, isLoading: true }
    }
    case CART_LOADED:
    case UPDATE_CART: {
      if (action.subtype === REMOVE_ITEM) {
        const inCheckoutItems = state.checkoutItems.some(item => item._id === action.item._id)
        return {
          ...state,
          isLoading: false,
          items: action.cart ? action.cart.items : state.items,
          checkoutItems: !inCheckoutItems
            ? state.checkoutItems
            : state.checkoutItems.filter(item => item._id !== action.item._id),
          total: !inCheckoutItems ? state.total : state.total - action.item.listedPrice * action.item.quantity,
          discountTotal: !inCheckoutItems
            ? state.discountTotal
            : state.discountTotal - (action.item.discountPrice || action.item.listedPrice) * action.item.quantity
        }
      }

      if (action.subtype === UPDATE_QUANTITY) {
        const updatedItemIndex = state.checkoutItems.findIndex(item => item._id === action.item._id)
        let total = 0
        let discountTotal = 0
        let checkoutItems = [...state.checkoutItems]
        if (updatedItemIndex >= 0) {
          checkoutItems[updatedItemIndex].quantity = action.value
          checkoutItems.forEach(item => {
            total += item.listedPrice * item.quantity
            discountTotal += (item.discountPrice || item.listedPrice) * item.quantity
          })
        } else {
          total = state.total
          discountTotal = state.discountTotal
        }
        return {
          ...state,
          isLoading: false,
          items: action.cart ? action.cart.items : state.items,
          checkoutItems,
          total,
          discountTotal
        }
      }

      return {
        ...state,
        isLoading: false,
        items: action.cart ? action.cart.items : state.items
      }
    }

    case ADD_TO_CHECKOUT:
      return {
        ...state,
        checkoutItems: [...state.checkoutItems, action.item],
        total: state.total + action.item.listedPrice * action.item.quantity,
        discountTotal:
          state.discountTotal + (action.item.discountPrice || action.item.listedPrice) * action.item.quantity
      }

    case REMOVE_FROM_CHECKOUT:
      return {
        ...state,
        checkoutItems: state.checkoutItems.filter(item => item._id !== action.item._id),
        total: state.total - action.item.listedPrice * action.item.quantity,
        discountTotal:
          state.discountTotal - (action.item.discountPrice || action.item.listedPrice) * action.item.quantity
      }

    case ADD_ALL_TO_CHECKOUT:
      let total = 0
      let discountTotal = 0
      let checkoutItems = [...state.items]
      checkoutItems.forEach(item => {
        total += item.listedPrice * item.quantity
        discountTotal += (item.discountPrice || item.listedPrice) * item.quantity
      })
      return {
        ...state,
        checkoutItems,
        total,
        discountTotal
      }

    case REMOVE_ALL_FROM_CHECKOUT:
      return {
        ...state,
        checkoutItems: [],
        total: 0,
        discountTotal: 0
      }

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
