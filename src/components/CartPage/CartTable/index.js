import { Button, Divider, Image, InputNumber, Space, Table, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './CartTable.css'
import { toLocaleStringCurrency } from '../../../utils'

const { Text, Title } = Typography

export default function CartTable(props) {
  const onRemoveProduct = slug => {
    console.log(slug)
  }
  const onQuantityChange = (value, slug) => {
    console.log(slug)
  }

  const columns = [
    {
      dataIndex: 'action',
      key: 'action',
      fixed: 'left',
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
    },
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 40,
      responsive: ['lg'],
      render: (text, record) => <Image src={record.thumbnail} />
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      ellipsis: true,
      textWrap: 'word-break'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 25,
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
      fixed: 'right',
      render: (text, record) => (
        <InputNumber
          min={0}
          max={record.inStock}
          value={record.quantity}
          onChange={value => onQuantityChange(value, record.slug)}
          style={{ maxWidth: '100%', width: '65%' }}
        />
      )
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: 25,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        const { listedPrice, discountPrice, quantity } = record
        const strListedTotal = toLocaleStringCurrency(listedPrice * quantity, 'vn', 'VND')
        if (discountPrice) {
          const strDiscountTotal = toLocaleStringCurrency(discountPrice * quantity, 'vn', 'VND')
          return <Text type="success">{strDiscountTotal}</Text>
        }
        return strListedTotal
      }
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
