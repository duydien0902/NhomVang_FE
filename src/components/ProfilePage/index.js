import React from 'react'
import { Spin, Upload, Button } from 'antd'
import { UploadOutlined, LockOutlined } from '@ant-design/icons'
import avatar from '../../assets/avatar.jpg'
import './ProfilePage.css'

function Profile(props) {
  const currenUser = props.currenUser

  return currenUser ? (
    <div style={{ paddingTop: '80px', paddingBottom: '20px', backgroundColor: '#E8E8E8' }}>
      <div className="container-info">
        <div className="container-info-right">
          <div className="wapper-avatar">
            <img src={avatar} alt="" />
          </div>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
            <div>
              <Button>Save</Button>
            </div>
          </div>
          <div>
            <Button icon={<LockOutlined />}>Change Password</Button>
          </div>
        </div>
        <div className="container-info-left">
          <p>Thông tin cá nhân</p>
          <ul style={{ padding: '0px 20px 20px 50px' }}>
            <li>
              Họ và tên:<span> Nguyễn Văn A</span>
            </li>
            <br />
            <li>
              Email:<span> aaaaa@gmail.com</span>
            </li>
            <br />
            <li>
              Ngày sinh:<span> 10/10/10000</span>
            </li>
            <br />
            <li>
              Địa chỉ: <span>79/100 Tô Hiến Thành, p 11, q 11, thành phố HCM</span>
            </li>
            <br />
            <li>
              Liên lạc: <span>0900000000</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }} size="large" />
  )
}

export default Profile
