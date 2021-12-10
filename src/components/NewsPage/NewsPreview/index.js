import React from 'react'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import './NewsPreview.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
export default function NewsPreview() {
  const listnews = useSelector(state => state.news.listnews)
  return (
    <div style={{ backgroundColor: '#c9f5e6' }}>
      <div className="title-news" style={{ paddingTop: '80px' }}>
        <h1>
          <span style={{ backgroundColor: '#c9f5e6' }}>TIN MỚI NHẤT</span>
        </h1>
      </div>
      <div className="news-preview">
        {listnews ? (
          listnews.map(news => (
            <div key={news.slug} className="container-news-preview" style={{ position: 'relative' }}>
              <div className="card-wapper-news">
                <div className="card-news">
                  <div className="card-image-news">
                    <div className="news-thumbnail">{<img src={news.thumbnail || defaultNewsImage} alt="news" />} </div>
                  </div>
                  <Link className="link" to={`/blog/${news.slug}`}>
                    <div className="details-news">
                      <h3> {news.title}</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        )}
      </div>
    </div>
  )
}
