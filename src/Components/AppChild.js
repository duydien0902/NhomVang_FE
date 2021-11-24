import Navbar from './Common/Navbar'
import TopSlider from './Home/TopSlider'
import TopProducts from './Home/TopProducts'
import React from 'react'
import HotDeals from '../Components/Home/HotDeals'
import NewsSlider from '../Components/Home/NewsSlider'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
function AppChild() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Navbar />
            <TopSlider />
            <TopProducts />
            <HotDeals />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default AppChild
