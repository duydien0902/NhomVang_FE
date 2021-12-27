import React, { useState } from 'react'
import { Spin, Upload, Button, Modal, Form, Input, message } from 'antd'
import { UploadOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import defaultavatarImage from '../../assets/avatar.jpg'
import agent from '../../agent'
import './ProfilePage.css'
import { beforeUploadImage } from '../../utils'
import { UPDATE_AVATAR } from '../../constants/ActionType'
import { store } from '../../store'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
function Profile(props) {
  const [isModalUpdataInfo, setIsModalUpdataInfo] = useState(false)
  const [isModalChangePassword, setIsModalChangePassword] = useState(false)
  const [isUploadingAvatar, setUploadingAvatar] = useState(false)
  const currenUser = props.currenUser
  const avatar = props.avatar
  const showModalUpdataInfo = () => {
    setIsModalUpdataInfo(true)
  }
  const handleCancelUpdataInfo = () => {
    setIsModalUpdataInfo(false)
  }

  const showModalChangePassword = () => {
    setIsModalChangePassword(true)
  }
  const handleCancelChangePassword = () => {
    setIsModalChangePassword(false)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = async values => {
    try {
      await agent.Auth.updateUser(values)
      message.info('lưu thành công')
      window.location.reload()
    } catch (error) {
      // message.info('lưu thất bại')
      console.log(error.response)
    }
  }
  const ChangePassword = async result => {
    console.log(result)
    try {
      if (result.password === result.ComfimPassword) {
        const password = result.password
        const oldPassword = result.oldPassword
        const values = { oldPassword, password }
        console.log(values)
        await agent.Auth.updateUser(values)
        message.info('lưu thành công')
        window.location.reload()
      } else {
        message.info('mật khẩu không khớp')
      }
    } catch (error) {
      message.info('mật khẩu cũ không đúng')
      // console.log(error.response)
    }
  }
  const onUpdateField = (key, value) => {
    console.log(value)
    store.dispatch({ type: UPDATE_AVATAR, key, value })
  }

  const addAvatar = value => onUpdateField('thumbnail', value)
  const removeAvatar = file => onUpdateField('thumbnail', '')
  return currenUser ? (
    <div style={{ paddingTop: '80px', paddingBottom: '20px', backgroundColor: '#E8E8E8' }}>
      <div className="container-info">
        <div className="container-info-right">
          <div className="wapper-avatar">
            <img src={avatar || defaultavatarImage} alt="" />
          </div>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <Upload
              style={{ display: 'none' }}
              listType="picture"
              maxCount={1}
              accept="image/*"
              fileList={
                avatar
                  ? [
                      {
                        uid: '-1',
                        status: 'done',
                        name: 'avatar.png',
                        url: avatar
                      }
                    ]
                  : []
              }
              beforeUpload={file => beforeUploadImage(file, addAvatar, setUploadingAvatar)}
              onRemove={removeAvatar}
            >
              <Button className="flex items-center" icon={isUploadingAvatar ? <LoadingOutlined /> : <UploadOutlined />}>
                Upload Avatar
              </Button>
            </Upload>
            {/* <div>
              <Button>Save</Button>
            </div> */}
          </div>
          <div>
            <Button onClick={showModalChangePassword} icon={<LockOutlined />}>
              Change Password
            </Button>
            <Modal
              title="Thay đổi mật khẩu"
              visible={isModalChangePassword}
              footer={false}
              onCancel={handleCancelChangePassword}
            >
              <Form
                {...formItemLayout}
                onFinish={ChangePassword}
                onFinishFailed={onFinishFailed}
                name="basic"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Mật khẩu hiện tại"
                  name="oldPassword"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="field"
                  style={{ marginTop: '10px' }}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu mới"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="field"
                  style={{ marginTop: '10px' }}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Nhập lại mật khẩu mới"
                  name="ComfimPassword"
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
                    SAVE
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="container-info-left">
          <p>Thông tin cá nhân</p>
          <ul style={{ padding: '0px 20px 20px 50px' }}>
            <li>
              Họ và tên:<span> {currenUser.displayname}</span>
            </li>
            <br />
            <li>
              Email:<span> {currenUser.email}</span>
            </li>
            <br />
            <li>
              Địa chỉ: <span> {currenUser.address}</span>
            </li>
            <br />
          </ul>
          <Button
            style={{ marginLeft: '30px', marginBottom: '50px' }}
            type="primary"
            onClick={showModalUpdataInfo}
            icon={<LockOutlined />}
          >
            Chỉnh sửa chi tiết
          </Button>
          <Modal
            title="Chỉnh sửa thông tin"
            destroyOnClose
            visible={isModalUpdataInfo}
            footer={false}
            onCancel={handleCancelUpdataInfo}
          >
            <Form
              {...formItemLayout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              name="basic"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Tên hiển thị"
                name="displayname"
                rules={[{ required: true, message: 'Xin nhập tên hiển thị' }]}
                className="field"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'Đầu vào không hợp lệ E-mail!'
                  },
                  {
                    required: true,
                    message: 'xin nhập E-mail!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="address" name="address" rules={[{ required: true, message: 'xin nhập địa chỉ' }]}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '200px', background: '#FFA500', border: 'none', marginTop: '10px' }}
                >
                  SAVE
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  ) : (
    <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }} size="large" />
  )
}

export default Profile
