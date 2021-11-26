import { Fragment } from 'react'
import { Form, Input, Button } from 'antd'
import { CloseOutlined, DoubleLeftOutlined } from '@ant-design/icons'
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
function Register() {
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
              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
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
            <div className="absolute-icon icon-back">
              <Link className="link" to="/login">
                <p>
                  <DoubleLeftOutlined />
                </p>
              </Link>
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '25px', fontWeight: '500', letterSpacing: '1px', marginTop: '30px' }}>Đăng ký</p>
            </div>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
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
            <Form.Item
              label="Nhập lại mật khẩu"
              name="comfimpassword"
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
          </Form>
        </div>
      </Fragment>
    </div>
  )
}

export default Register
