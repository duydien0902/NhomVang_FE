import React from 'react'
import { Form, Input, Button, message } from 'antd'
import agent from '../../agent'
import { store } from '../../store'
import { LOGIN } from '../../constants/ActionType'
import './Login.css'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
function Login({ visibleLogin, visibleRegister }) {
  const OpenRegister = () => {
    visibleRegister(true)
    visibleLogin(false)
  }
  const onFinish = async values => {
    try {
      const result = await agent.Auth.login(values)
      const payload = await result.data.user
      store.dispatch({ type: LOGIN, payload })
      localStorage.setItem('token', result.data.token)
      message.info('đăng nhập thành công')
      window.location.reload()
    } catch (error) {
      console.log(error.response)
      message.info('đăng nhập thất bại')
    }
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="Modal-Container">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            width: '700px',
            padding: '10px 0px',
            background: 'white',
            borderRadius: '8px'
          }}
          className="login mt-5"
        >
          <div className="absolute-icon icon-close"></div>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '25px', fontWeight: 'bold', letterSpacing: '1px' }}>Đăng nhập</p>
          </div>

          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="field"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className="field"
            style={{ marginTop: '10px' }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '200px', background: '#FFA500', border: 'none', marginTop: '10px' }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div
            className="bottom-formlogin"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <p style={{ fontSize: '0.8rem' }} onClick={OpenRegister}>
              Tạo tài khoản
            </p>
          </div>
          <div
            className="bottom-formlogin"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-12px'
            }}
          >
            <p style={{ fontSize: '0.8rem' }}>Quên mật khẩu</p>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
