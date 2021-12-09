import { useDispatch } from 'react-redux'
import { REMOVE_ITEM, UPDATE_QUANTITY } from '../../../constants/ActionType'
import { Button, Divider, Image, InputNumber, Space, Table, Typography } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { toLocaleStringCurrency } from '../../../utils'
import './CartTable.css'

const { Text, Title } = Typography

export default function CartTable(props) {
  const dispatch = useDispatch()
  const onRemoveProduct = slug => {
    dispatch({ type: REMOVE_ITEM, slug })
  }
  const onQuantityChange = (value, slug) => {
    dispatch(value === 0 ? { type: REMOVE_ITEM, slug } : { type: UPDATE_QUANTITY, slug, value })
  }

  const columns = [
    {
      title: 'No',
      width: 10,
      render: (text, record, index) => index + 1
    },
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 30,
      responsive: ['lg'],
      render: (text, record) => <Image src={record.thumbnail} />
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      ellipsis: true,
      textWrap: 'word-break'
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 30,
      ellipsis: true,
      textWrap: 'word-break'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 30,
      align: 'center',
      render: (text, record) => {
        const { listedPrice, discountPrice } = record
        const strListedPrice = toLocaleStringCurrency(listedPrice, 'vn', 'VND')
        if (discountPrice) {
          const strDiscountPrice = toLocaleStringCurrency(discountPrice, 'vn', 'VND')
          return (
            <Space size="small" direction="vertical">
              <Text delete>{strListedPrice}</Text>
              <Text type="success">{strDiscountPrice}</Text>
            </Space>
          )
        }
        return strListedPrice
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 20,
      align: 'center',
      render: (text, record) => (
        <div className="input-number">
          <Button
            className="input-number-control-btn plus-btn"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onQuantityChange(record.quantity + 1, record.slug)}
          />
          <InputNumber
            min={0}
            max={record.inStock}
            value={record.quantity}
            onChange={value => onQuantityChange(value, record.slug)}
            style={{ width: 70 }}
          />
          <Button
            className="input-number-control-btn minus-btn"
            type="primary"
            icon={<MinusOutlined />}
            onClick={() => onQuantityChange(record.quantity - 1, record.slug)}
          />
        </div>
      )
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 30,
      align: 'center',
      render: (text, record) => {
        const { listedPrice, discountPrice, quantity } = record
        const strListedTotal = toLocaleStringCurrency(listedPrice * quantity, 'vn', 'VND')
        if (discountPrice) {
          const strDiscountTotal = toLocaleStringCurrency(discountPrice * quantity, 'vn', 'VND')
          return <Text type="success">{strDiscountTotal}</Text>
        }
        return strListedTotal
      }
    },
    {
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 10,
      align: 'center',
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveProduct(record.slug)}
        />
      )
    }
  ]

  return (
    <div className="cart-table cart-shopping">
      <Title level={2}>Shopping Cart</Title>
      <Divider />
      <Table columns={columns} dataSource={props.cart} pagination={false} rowKey="name" scroll={{ x: 1500 }} />
    </div>
  )
}
