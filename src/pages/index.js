import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from '../components/Common/Navbar/Navbar'
import Footer from '../components/Common/Footer/Footer'
import Homepage from './HomePage'
import NewsDetail from '../components/NewsPage/News'
import CartPage from './CartPage'
import NewsPage from './NewsPage'
import ProductPage from './ProductPage'
import ProductDetail from '../components/ProductPage/ProductDetail'
import ProfilePage from '../pages/ProfilePage'
import AboutusPage from '../pages/AboutusPage'
import CheckoutPage from './CheckoutPage'
function Pages() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/blog/slug" component={NewsPage} />
        <Route path="/blog/:slug" component={NewsDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/products/slug" component={ProductPage} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/aboutus" component={AboutusPage} />
        <Route path="/checkout/:invoiceId" component={CheckoutPage} />
      </Switch>
      <Footer />
    </div>
  )
}
export default Pages
