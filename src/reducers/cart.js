import { CART_PAGE_LOADED, CART_PAGE_UNLOADED } from '../constants/ActionType'

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
  ]
}

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_PAGE_LOADED:
      return {
        ...state
      }
    case CART_PAGE_UNLOADED:
      return initialState
    default:
      return state
  }
}
