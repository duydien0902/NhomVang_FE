import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import agent from '../../agent'
import { Tag, Spin, Avatar, Button, Popconfirm, Pagination, Collapse, Timeline, Typography } from 'antd'
import { toLocaleStringCurrency } from '../../utils'

const { Text } = Typography

const CheckableTag = Tag.CheckableTag

const invoiceStatuses = [
  { value: 'all', text: 'All' },
  { value: 'pending', canCancel: true, text: 'Pending', icon: <ClockCircleOutlined />, color: '#2db7f5' },
  { value: 'in_progress', text: 'In Progress', icon: <SyncOutlined />, color: '#108ee9' },
  { value: 'delivered', text: 'Delivered', icon: <CheckCircleOutlined />, color: '#87d068' },
  { value: 'failed', text: 'Failed', icon: <CloseCircleOutlined />, color: '#f50' }
]

const paymentStatuses = [
  { value: 'pending', text: 'Pending', color: 'warning' },
  { value: 'done', text: 'Done', color: 'success' },
  { value: 'cancel', text: 'Cancelled', color: 'error' }
]

const PAGE_SIZE = 10

const UserOrders = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalInvoices, setTotalInvoices] = useState(0)

  const getInvoices = useCallback(() => {
    setLoading(true)
    agent.Invoice.getAllInvoices(currentPage, currentStatus !== 'all' ? { status: currentStatus } : {}).then(res => {
      setInvoices(res.data.invoiceList)
      setTotalInvoices(res.data.total)
      setLoading(false)
    })
  }, [currentPage, currentStatus])

  useEffect(() => {
    getInvoices()
  }, [getInvoices])

  const filterTags = (
    <div>
      {invoiceStatuses.map(status => (
        <CheckableTag
          className="invoice-status-tag"
          key={status.value}
          checked={status.value === currentStatus}
          onChange={() => {
            setCurrentPage(0)
            setCurrentStatus(status.value)
          }}
          style={{ backgroundColor: status.value === currentStatus ? status.color : 'white' }}
        >
          {status.icon}&nbsp;{status.text}&nbsp;
        </CheckableTag>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="user-orders__container">
        {filterTags}
        <div className="user-orders__empty">
          <Spin />
        </div>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="user-orders__container">
        {filterTags}
        <div className="user-orders__empty">
          <ShoppingCartOutlined style={{ fontSize: '72px' }} />
          <span className="user-orders__empty-message">You haven't purchased anything yet!</span>
          <span>
            Click <Link to="/">here</Link> to continue shopping
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="user-orders__container">
      {filterTags}
      <div className="user-order-items">
        {invoices.map(invoice => (
          <OrderItem
            data={invoice}
            onCancelInvoiceSuccess={() => {
              getInvoices()
            }}
            key={invoice._id}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        {!loading && (
          <Pagination
            current={currentPage + 1}
            pageSize={PAGE_SIZE}
            total={totalInvoices}
            onChange={page => setCurrentPage(page - 1)}
          />
        )}
      </div>
    </div>
  )
}

const OrderItem = ({ data, onCancelInvoiceSuccess }) => {
  const { createdDate, status, products, paymentMethod, discountTotal, _id } = data
  const [invoiceCancelling, setInvoiceCancelling] = useState(false)
  const history = useHistory()

  const datetime = useMemo(() => {
    const date = new Date(createdDate).toLocaleDateString()
    const time = new Date(createdDate).toLocaleTimeString()
    return date + ' ' + time
  }, [createdDate])

  const invoiceStatus = invoiceStatuses.find(s => s.value === status)
  const paymentStatus = paymentStatuses.find(s => s.value === data.paymentStatus)

  const handleCancelOrderItem = () => {
    setInvoiceCancelling(true)
    agent.Invoice.cancelInvoice(_id).then(() => {
      setInvoiceCancelling(false)
      onCancelInvoiceSuccess()
    })
  }

  const handleCheckout = () => {
    history.push('/checkout/' + _id)
  }

  return (
    <div className="user-order-item__container">
      <div className="user-order-item__header">
        <div>{datetime}</div>
        <div>
          <Tag style={{ marginRight: 0 }} color={invoiceStatus.color}>
            {invoiceStatus.text}
          </Tag>
        </div>
      </div>
      <div className="user-order-item__product-list">
        {products.map(p => (
          <ProductItem key={p._id} data={p} />
        ))}
      </div>
      <div>
        <Collapse accordion>
          <Collapse.Panel header="Logs">
            <InvoiceLogger invoice={data} />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="user-order-item__footer">
        <div>
          {invoiceStatus.canCancel && (
            <Popconfirm
              title="Are you sure to cancel this order?"
              onConfirm={handleCancelOrderItem}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginRight: 10 }} disabled={invoiceCancelling} loading={invoiceCancelling}>
                Cancel
              </Button>
            </Popconfirm>
          )}
          {paymentStatus.value === 'pending' && (
            <Button type="primary" onClick={handleCheckout}>
              Checkout now
            </Button>
          )}
        </div>
        <div className="user-order-item__total">
          <div>Total Price</div>
          <div className="user-order-item__price">{toLocaleStringCurrency(discountTotal)}</div>
          <div>Payment method</div>
          <div>{paymentMethod ? paymentMethod.toUpperCase() : '<Not set>'}</div>
          <div>Payment status</div>
          <div>
            <Tag color={paymentStatus.color}>{paymentStatus.text}</Tag>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductItem = ({ data }) => {
  const [vouchersVisible, setVouchersVisible] = useState(false)
  const [vouchersLoading, setVouchersLoading] = useState(false)
  const { _id, thumbnail, name, listedPrice, discountPrice, quantity, vouchers, slug } = data

  const finalPrice = discountPrice !== undefined ? discountPrice : listedPrice
  const formatedFinalPrice = toLocaleStringCurrency(finalPrice)

  const handleViewVoucher = () => {
    setVouchersLoading(true)
    setTimeout(() => {
      setVouchersVisible(true)
      setVouchersLoading(false)
    }, 1000)
  }

  return (
    <div key={_id} className="order-product-item__container">
      <Link to={`/products/${slug}`}>
        <Avatar shape="square" src={thumbnail} size={70} />
      </Link>
      <div className="order-product-item__body">
        <div className="order-product-item__info">
          <Link to={`/products/${slug}`}>
            <div className="order-product-item__name">{name}</div>
          </Link>
          <div className="order-product-item__qty">Qty: {quantity}</div>
          {vouchers.length > 0 && !vouchersVisible && (
            <Button size="small" onClick={handleViewVoucher} disabled={vouchersLoading} loading={vouchersLoading}>
              View
            </Button>
          )}
          {vouchersVisible && vouchers.map(v => <Tag key={v}>{v}</Tag>)}
        </div>
        <div className="order-product-item__price">
          {discountPrice !== undefined && (
            <div className="order-product-item__listed-price">{toLocaleStringCurrency(listedPrice)}</div>
          )}
          <div className="order-product-item__discount-price">{formatedFinalPrice}</div>
        </div>
      </div>
    </div>
  )
}

const InvoiceLogger = ({ invoice }) => {
  const renderAction = log => {
    switch (log.action) {
      case 'create':
        return <span>has created invoice</span>

      case 'change_status':
        return (
          <span>
            has updated status from <Text strong>{log.prevStatus}</Text> to <Text strong>{log.nextStatus}</Text>{' '}
          </span>
        )

      case 'cancel':
        return <span>has cancelled invoice</span>

      default:
        break
    }
  }

  return (
    <Timeline>
      {invoice.logs.map((log, index) => (
        <Timeline.Item key={index} color={log.action === 'cancel' ? 'red' : 'green'}>
          User <Text strong>{log.user}</Text> {renderAction(log)} on{' '}
          <Text strong>{new Date(log.timestamp).toLocaleString()}</Text>.
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default UserOrders
