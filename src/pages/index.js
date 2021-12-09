import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from '../components/Common/Navbar/Navbar'
import Footer from '../components/Common/Footer/Footer'
import Homepage from './HomePage'
import NewsPage from './NewsPage'
import NewsDetail from '../components/News/index'
import CartPage from './CartPage'
function Pages() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/blog/:slug" component={NewsDetail} />
        <Route path="/cart" component={CartPage} />
      </Switch>
      <Footer />
    </div>
  )
}
export default Pages
