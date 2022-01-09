import React from 'react'
import { Spin, Row, Col } from 'antd'
import { Route } from 'react-router-dom'
import UserInfo from './UserInfo'
import UserProfile from './UserProfile'
import UserOrders from './UserOrders'

function Profile(props) {
  const currentUser = props.currenUser
  return currentUser ? (
    <div style={{ paddingTop: '80px', paddingBottom: '20px', backgroundColor: '#E8E8E8' }}>
      <Row className="container">
        <Col xs={24} sm={24} md={24} lg={24} xl={4}>
          <UserInfo />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={20}>
          <Route path="/me/profile" render={props => <UserProfile {...props} currenUser={currentUser} />} />
          <Route path="/me/orders" component={UserOrders} />
        </Col>
      </Row>
    </div>
  ) : (
    <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }} size="large" />
  )
}

export default Profile
