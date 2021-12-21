import { Spin, Typography } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import agent from '../../agent'
import CheckoutItems from '../../components/CheckoutPage/CheckoutItems'
import CheckoutPayment from '../../components/CheckoutPage/CheckoutPayment'
import { INVOICE_LOADED, INVOICE_LOADING } from '../../constants/ActionType'
import { store } from '../../store'
import './CheckoutPage.css'

const { Title } = Typography

export default function CheckoutPage() {
  const { invoiceId } = useParams()
  const { invoice, paymentMethod, isLoading } = useSelector(state => state.invoice)

  useEffect(() => {
    const fetchInvoice = async invoiceId => {
      let invoice = null
      try {
        store.dispatch({ type: INVOICE_LOADING })
        const res = await agent.Invoice.getInvoice(invoiceId)
        invoice = res.data.invoice
      } catch (error) {
        console.log(error)
      } finally {
        store.dispatch({ type: INVOICE_LOADED, invoice })
      }
    }
    if (invoiceId) {
      fetchInvoice(invoiceId)
    }
  }, [invoiceId])

  return (
    <div className="checkout-page" direction="vertical">
      <Title level={2}>
        Checkout
        <Spin style={{ marginLeft: 16 }} spinning={isLoading} />
      </Title>
      {invoice && (
        <>
          <CheckoutItems items={invoice.products} />
          <CheckoutPayment paymentMethod={paymentMethod} total={invoice.total} discountTotal={invoice.discountTotal} />
        </>
      )}
    </div>
  )
}
