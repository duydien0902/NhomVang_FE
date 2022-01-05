import React from 'react'

import { Spin } from 'antd'
import './NewsTagsSlider.css'
import { Link } from 'react-router-dom'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'

function NewsTagsSlider(props) {
  const listnewstags = props.listnewstags

  return (
    <div className="wrapper-relatedNews">
      <h1>TIN TỨC LIÊN QUAN </h1>
      {listnewstags ? (
        <div className="container-relatedNews">
          {listnewstags.map(item => (
            <Link className="link" to={`/blog/${item.slug}`}>
              <div className="item-relatedNews">
                <div className="wapper-relatedNews-img">
                  <img src={item.thumbnail || defaultNewsImage} alt="" />
                </div>
                <div className="wapper-relatedNews-title">
                  <h3> {item.title}</h3>
                  <span className="job-title">{item.description}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size="large" />
      )}
    </div>
  )
}

export default NewsTagsSlider
