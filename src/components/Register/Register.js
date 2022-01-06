import { Fragment } from 'react'
import { Form, Input, Button, message } from 'antd'
import { DoubleLeftOutlined } from '@ant-design/icons'
import agent from '../../agent'
import { store } from '../../store'
import '../Login/Login.css'
import { REGISTER } from '../../constants/ActionType'
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
function Register({ visibleLogin, visibleRegister }) {
  const OpenLogin = () => {
    visibleRegister(false)
    visibleLogin(true)
  }
  const onFinish = async values => {
    try {
      const result = await agent.Auth.register(values)
      const payload = await result.data.user
      store.dispatch({ type: REGISTER, payload })
      localStorage.setItem('token', result.data.token)
      message.success('đăng ký thành công')
      window.location.reload()
    } catch (error) {
      console.log(error)
      message.error('tài khoản đã được sử dụng')
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="Modal-Container">
      <Fragment>
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
            <div className="absolute-icon icon-back">
              <p onClick={OpenLogin}>
                <DoubleLeftOutlined />
              </p>
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '25px', fontWeight: '500', letterSpacing: '1px', marginTop: '30px' }}>Đăng ký</p>
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
                Đăng ký
              </Button>
            </Form.Item>
            <div
              className="bottom-formlogin"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ></div>
            <div
              className="bottom-formlogin"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-12px'
              }}
            ></div>
          </Form>
        </div>
      </Fragment>
    </div>
  )
}

export default Register
