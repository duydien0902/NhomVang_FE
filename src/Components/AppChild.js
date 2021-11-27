import Navbar from './Common/Navbar/Navbar'
import TopSlider from './Homepage/TopSlider/TopSlider'
import TopProducts from './Homepage/TopProducts/TopProducts'
import React from 'react'
import HotDeals from './Homepage/HotDeals/HotDeals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
