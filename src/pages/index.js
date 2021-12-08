import Navbar from '../components/Common/Navbar/Navbar'
import React from 'react'
import Footer from '../components/Common/Footer/Footer'
import News from './News'
import NewsDetail from '../components/News/index'
import { Switch, Route } from 'react-router-dom'
import Homepage from './HomePage'
function Pages() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/news" component={News} />
        <Route path="/blog/:slug" component={NewsDetail} />
      </Switch>
      <Footer />
    </div>
  )
}
export default Pages
