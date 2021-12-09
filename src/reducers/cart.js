import { ADD_ITEM, CART_PAGE_LOADED, CART_PAGE_UNLOADED, REMOVE_ITEM, UPDATE_QUANTITY } from '../constants/ActionType'

const initialState = {
  itemList: [
    {
      name: 'Vé tháng hăng say công việc',
      slug: 've-thang-hang-say-cong-viec',
      thumbnail: 'https://assets.digilink.vn/uploads/2021/11/HANG-SAY-CV-1-560x225.jpg',
      listedPrice: 2950000,
      discountPrice: 0,
      quantity: 2,
      inStock: 100
    },
    {
      name: 'FLC Membership IRIS',
      slug: 'flc-membership-iris',
      thumbnail: 'https://assets.digilink.vn/uploads/2021/11/560x225_1636517340.png',
      listedPrice: 93990000,
      discountPrice: 75192000,
      quantity: 1,
      inStock: 100
    },
    {
      name: 'Thẻ Mini Golf Card',
      slug: 'the-mini-golf-card',
      thumbnail:
        'https://assets.digilink.vn/uploads/2021/09/0-02-06-776d393ae0cfe37aff2f59a242b8cc52b0b0832d89e9cced5965629532f3f536_a56d9a70c90a71a.jpg',
      listedPrice: 16299000,
      discountPrice: 0,
      quantity: 1,
      inStock: 100
    },
    {
      name: 'Thẻ hội viên CLUB 365',
      slug: 'the-hoi-vien-club-365',
      thumbnail: 'https://assets.digilink.vn/uploads/2021/09/RCI-CLUB-365.jpg',
      listedPrice: 69000000,
      discountPrice: 56000000,
      quantity: 1,
      inStock: 100
    }
  ],
  listedSubtotal: 0,
  discountSubtotal: 0,
  vat: 0,
  total: 0
}

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_PAGE_LOADED: {
      const listedSubtotal = state.itemList.reduce((total, item) => (total += item.listedPrice * item.quantity), 0)
      const discountSubtotal = state.itemList.reduce((total, item) => {
        const amount = item.discountPrice || item.listedPrice
        return total + amount * item.quantity
      }, 0)
      const total = discountSubtotal
        ? discountSubtotal + discountSubtotal * state.vat
        : listedSubtotal + listedSubtotal * state.vat
      return {
        ...state,
        listedSubtotal,
        discountSubtotal,
        total
      }
    }

    case CART_PAGE_UNLOADED:
      return initialState

    case UPDATE_QUANTITY: {
      state.itemList[state.itemList.findIndex(item => item.slug === action.slug)].quantity = action.value
      const listedSubtotal = state.itemList.reduce((total, item) => (total += item.listedPrice * item.quantity), 0)
      const discountSubtotal = state.itemList.reduce((total, item) => {
        const amount = item.discountPrice || item.listedPrice
        return total + amount * item.quantity
      }, 0)
      const total = discountSubtotal
        ? discountSubtotal + discountSubtotal * state.vat
        : listedSubtotal + listedSubtotal * state.vat
      return {
        ...state,
        listedSubtotal,
        discountSubtotal,
        total
      }
    }

    case ADD_ITEM: {
      const itemList = state.itemList.push(action.item)
      const listedSubtotal = itemList.reduce((total, item) => (total += item.listedPrice * item.quantity), 0)
      const discountSubtotal = itemList.reduce((total, item) => {
        const amount = item.discountPrice || item.listedPrice
        return total + amount * item.quantity
      }, 0)
      const total = discountSubtotal
        ? discountSubtotal + discountSubtotal * state.vat
        : listedSubtotal + listedSubtotal * state.vat
      return {
        ...state,
        itemList,
        listedSubtotal,
        discountSubtotal,
        total
      }
    }

    case REMOVE_ITEM: {
      const itemList = state.itemList.filter(item => item.slug !== action.slug)
      const listedSubtotal = itemList.reduce((total, item) => (total += item.listedPrice * item.quantity), 0)
      const discountSubtotal = itemList.reduce((total, item) => {
        const amount = item.discountPrice || item.listedPrice
        return total + amount * item.quantity
      }, 0)
      const total = discountSubtotal
        ? discountSubtotal + discountSubtotal * state.vat
        : listedSubtotal + listedSubtotal * state.vat
      return {
        ...state,
        itemList,
        listedSubtotal,
        discountSubtotal,
        total
      }
    }

    default:
      return state
  }
}
