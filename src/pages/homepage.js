import Navbar from '../components/common/Navbar/Navbar'
import TopSlider from '../components/homepage/TopSlider/TopSlider'
import TopProducts from '../components/homepage/TopProducts/TopProducts'
import React from 'react'
import HotDeals from '../components/homepage/HotDeals/HotDeals'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function homepage() {
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

export default homepage
