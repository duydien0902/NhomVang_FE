import {
  LIST_PRODUCTS,
  SET_LIST_PRODUCTS,
  FILTER_PRODUCTLIST,
  LIST_PRODUCTS_TOPSLIDER,
  LIST_PRODUCTS_HOT
} from '../constants/ActionType'
export default function NewsReducers(state = {}, action) {
  switch (action.type) {
    case LIST_PRODUCTS:
      return {
        ...state,
        pager: action.pager,
        listproducts: action.payload.data.productList || [],
        total: action.payload.data.total || 0,
        page: 0
      }
    case LIST_PRODUCTS_TOPSLIDER:
      return {
        ...state,
        listProductsTopSlider: action.payload.data.productList || []
      }
    case LIST_PRODUCTS_HOT:
      return {
        ...state,
        listProductHot: action.payload.data.productList || []
      }
    case SET_LIST_PRODUCTS:
      return {
        ...state,
        listproducts: action.payload.data.productList || [],
        total: action.payload.data.total || 0,
        page: action.page
      }
    case FILTER_PRODUCTLIST:
      return {
        ...state,
        listproducts: action.payload.data.productList || [],
        total: action.payload.data.total || 0
      }

    default:
      return state
  }
}
