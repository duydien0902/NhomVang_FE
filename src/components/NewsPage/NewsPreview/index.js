import React from 'react'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import './NewsPreview.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
export default function NewsPreview() {
  const news = useSelector(state => state.news.listnews)
  console.log('list news', news)
  return (
    //   <div>
    <div className="news-preview">
      {news ? (
        news.map(news => (
          <div key={news.slug} className="container-news-preview" style={{ position: 'relative' }}>
            <div className="news-thumbnail">{<img src={news.thumbnail || defaultNewsImage} alt="news" />} </div>
            <div className="container-title-button-listnews">
              <h2 className="news-title" style={{ color: 'red', fontWeight: '800' }}>
                {news.title}
              </h2>
              <Link className="link" to={`/blog/${news.slug}`}>
                <div className="news-footer" style={{ textAlign: 'center' }}>
                  <button style={{ padding: '7px 20px' }}>Đọc tiếp</button>
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <Spin style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      )}
    </div>
    // </div>
  )
}
