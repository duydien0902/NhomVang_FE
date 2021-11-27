import Navbar from '../components/Common/Navbar/Navbar'
import TopSlider from '../components/HomePage/TopSlider/TopSlider'
import TopProducts from '../components/HomePage/TopProducts/TopProducts'
import React from 'react'
import HotDeals from '../components/HomePage/HotDeals/HotDeals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from '../components/Common/Footer/Footer'
function HomePage() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Navbar />
            <TopSlider />
            <TopProducts />
            <HotDeals />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default HomePage
