import React from 'react'
import defaultNewsImage from '../../assets/defaultNewsImage.png'
import './NewsPreview.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
export default function NewsPreview() {
  const news = useSelector(state => state.news.listnews)
  console.log('list news', news)
  return (
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
        <Spin style={{ position: 'absolute', top: '40%', left: '50%' }} />
      )}
    </div>

    // <div className="news-preview">
    //   {news ? (
    //     news.map(news => (
    //       <Link className='link' to={`/newss/${news.slug}`}>
    //           <div className='container-news-preview'>
    //         <div className="news-thumbnail">{<img  src={news.thumbnail || defaultNewsImage} alt="news" />}</div>
    //         <div className="news-body">
    //           <div>
    //             <div className="news-date">{new Date(news.modifiedDate).toLocaleDateString()}</div>
    //             <h2 className="news-title">
    //             </h2>
    //             <div className="news-description">{news.description}</div>
    //             <div className="news-footer">
    //                 Đọc tiếp
    //             </div>
    //           </div>
    //         </div>
    //         </div>
    //         </Link>
    //     ))
    //   ) : (
    //     <Spin style={{ display: 'flex', justifyContent: 'center' }} />
    //   )}
    // </div>
  )
}
