import { Fragment, useState } from 'react'
import { Form, Input, Button, Checkbox, Modal, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../../Style/Login.css'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16
  }
}

function Login() {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="Modal-Container">
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
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
            <div className="absolute-icon icon-close">
              <Link className="link" to="/">
                <p>
                  <CloseOutlined />
                </p>
              </Link>
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '25px', fontWeight: '500', letterSpacing: '1px', marginTop: '30px' }}>Đăng nhập</p>
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
            {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '300px', background: '#FFA500', border: 'none', marginTop: '10px' }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <div
              className="bottom-formlogin"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Link className="link" to="/register">
                <p style={{ fontSize: '0.8rem' }}>Tạo tài khoản</p>
              </Link>
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
      </Fragment>
    </div>
  )
}

export default Login
