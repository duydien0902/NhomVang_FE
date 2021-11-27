import React from 'react'
import './NewsLetter.css'
import { Input } from 'antd'
function Newsletter() {
  const onSearch = value => console.log(value)
  return (
    <div>
      <div className="container-Newsletter">
        <div className="container-Newsletter-title">
          <h1>Cập nhật tin tức</h1>
          <h3>Đăng ký để nhận ưu đãi khuyến mãi từ logo</h3>
        </div>
        <div className="container-Newsletter-input">
          <Input.Search
            className="Newsletter-input"
            placeholder="Nhập email của bạn ..."
            enterButton="Đăng ký"
            onSearch={onSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default Newsletter
