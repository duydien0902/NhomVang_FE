import React from 'react'
import './ListPagination.css'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { Link } from 'react-router-dom'

export default function ListPagination(props) {
  const listnews = props.Newslist
  return (
    <div style={{ paddingTop: '150px' }}>
      <div className="ListPagination">
        {listnews ? (
          listnews.map(item => (
            <Link className="link" to={`/blog/${item.slug}`}>
              <div key={item.slug} className="container-ListPagination">
                <div> {<img src={item.thumbnail || defaultNewsImage} alt="news" />}</div>
                <div>
                  <h3 style={{ color: 'red', fontSize: '20px' }}>{item.title}</h3>
                  <span style={{ fontSize: '17px' }}>{item.description}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>loading....</p>
        )}
      </div>
    </div>
  )
}
