import React from 'react'
import defaultNewsImage from '../../assets/defaultNewsImage.png'
import './NewsPreview.css'

export default function NewsPreview(props) {
  const news = props.news

  return (
    <div className="news-preview">
      <div className="news-thumbnail">{<img src={news.thumbnail || defaultNewsImage} alt="news" />}</div>
      <div className="news-body">
        <div>
          <div className="news-date">{new Date(news.modifiedDate).toLocaleDateString()}</div>
          <h2 className="news-title">
            <a href={`/blog/${news.slug}`}>{news.title}</a>
          </h2>
          <div className="news-description">{news.description}</div>
          <div className="news-footer">
            <a className="news-link-btn" href={`/blog/${news.slug}`}>
              Đọc tiếp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
