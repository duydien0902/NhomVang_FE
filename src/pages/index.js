import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from '../components/Common/Navbar/Navbar'
import Footer from '../components/Common/Footer/Footer'
import Homepage from './HomePage'
import NewsDetail from '../components/NewsPage/News'
import CartPage from './CartPage'
import NewsPage from './NewsPage'
import ProductPage from './ProductPage'
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
      </Switch>
      <Footer />
    </div>
  )
}
export default Pages
