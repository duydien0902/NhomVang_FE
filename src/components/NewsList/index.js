import React from 'react'
import ListPagination from '../ListPagination'
import NewsPreview from '../NewsPreview'
import './NewsList.css'

export default function NewsList(props) {
  const newsList = props.newsList

  return newsList ? (
    newsList.length === 0 ? (
      <div className="news-preview">Blog chưa có bài viết</div>
    ) : (
      <div className="news-list">
        {newsList.map(news => (
          <NewsPreview news={news} key={news.slug} />
        ))}

        <ListPagination />
      </div>
    )
  ) : (
    <div className="news-preview">Đang tải...</div>
  )
}
