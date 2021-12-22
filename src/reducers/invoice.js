import { CHANGE_PAYMENT_METHOD, INVOICE_LOADED, INVOICE_LOADING } from '../constants/ActionType'

const initialState = {
  isLoading: true,
  invoice: null,
  paymentMethod: 'paypal'
}

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case INVOICE_LOADING:
      return { ...state, isLoading: true }

    case INVOICE_LOADED:
      return {
        ...state,
        invoice: action.invoice || state.invoice,
        isLoading: false
      }

    case CHANGE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.method
      }
    default:
      return state
  }
}
