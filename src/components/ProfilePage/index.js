import React, { useState } from 'react'
import { Spin, Upload, Button, Modal, Form, Input, message } from 'antd'
import { UploadOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import defaultavatarImage from '../../assets/avatar.jpg'
import agent from '../../agent'
import './ProfilePage.css'
import { beforeUploadImage } from '../../utils'
import { UPDATE_AVATAR } from '../../constants/ActionType'
import { store } from '../../store'
import { Checkbox } from 'antd'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
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
  const avatar = currenUser?.photourl
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
      const user = {
        ...values,
        address: {
          city: values.city,
          district: values.district,
          detail: values.detail
        }
      }
      await agent.Auth.updateUser(user)
      message.info('lưu thành công')
      window.location.reload()
    } catch (error) {
      message.info('lưu thất bại')
    }
  }

  const ChangePassword = async result => {
    try {
      if (result.password === result.ComfimPassword) {
        const password = result.password
        const oldPassword = result.oldPassword
        const values = { oldPassword, password }
        await agent.Auth.updateUser(values)
        message.info('lưu thành công')
        window.location.reload()
      } else {
        message.info('mật khẩu không khớp')
      }
    } catch (error) {
      message.info('mật khẩu cũ không đúng')
    }
  }
  const onUpdateField = (key, value) => {
    store.dispatch({ type: UPDATE_AVATAR, key, value })
  }
  const addAvatar = async value => {
    if (!value) return
    try {
      await agent.Auth.updateUser({ photourl: value })
      onUpdateField('photourl', value)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const removeAvatar = async file => {
    try {
      await agent.Auth.updateUser({ photourl: '' })
      onUpdateField('photourl', '')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
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
          </div>
          <div>
            <Button onClick={showModalChangePassword} icon={<LockOutlined />}>
              Change Password
            </Button>
            <Modal
              title="Change the password"
              visible={isModalChangePassword}
              onOk={ChangePassword}
              onCancel={handleCancelChangePassword}
              footer={[
                <Button key="cancel" onClick={handleCancelChangePassword}>
                  Cancel
                </Button>,
                <Button key="submit" form="changePassword" type="primary" htmlType="submit">
                  Save
                </Button>
              ]}
            >
              <Form
                {...formItemLayout}
                onFinish={ChangePassword}
                onFinishFailed={onFinishFailed}
                name="changePassword"
                initialValues={{ remember: true }}
                labelAlign="left"
                colon={false}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Form.Item
                  label="Current Password"
                  name="oldPassword"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="field"
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="field"
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Comfim Password"
                  name="ComfimPassword"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="field"
                >
                  <Input.Password />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="container-info-left">
          <p>Personal Information</p>
          <ul style={{ padding: '0px 20px 20px 50px' }}>
            <li>
              Full name: <span> {currenUser.displayname}</span>
            </li>
            <br />

            <li>
              Email: <span> {currenUser.email}</span>
            </li>

            <br />

            <li>
              Address:{' '}
              <span>
                {Object.values(currenUser.address)
                  .reverse()
                  .map((item, index) => {
                    return item + (Object.values(currenUser.address).length === index + 1 ? ' ' : ', ')
                  })}
              </span>
            </li>
            <br />

            <li>Follow: {currenUser.isSubscribing ? 'yes' : 'no'}</li>
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
            title="Edit information"
            destroyOnClose
            visible={isModalUpdataInfo}
            onCancel={handleCancelUpdataInfo}
            onOk={onFinish}
            footer={[
              <Button key="cancel" onClick={handleCancelUpdataInfo}>
                Cancel
              </Button>,
              <Button key="submit" form="userForm" type="primary" htmlType="submit">
                Save
              </Button>
            ]}
          >
            <Form
              {...formItemLayout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              name="userForm"
              initialValues={{ remember: true }}
              labelAlign="left"
              colon={false}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Form.Item label="Display name" name="displayname" className="field">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="E-mail">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
              <Form.Item label="District" name="district">
                <Input />
              </Form.Item>
              <Form.Item label="Street" name="detail">
                <Input />
              </Form.Item>
              <Form.Item label="Subscribe" name="isSubscribing" valuePropName="checked">
                <Checkbox />
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
