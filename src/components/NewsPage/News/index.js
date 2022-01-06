import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import agent from '../../../agent'
import { store } from '../../../store'
import { SELECTED_NEWS, LIST_NEWS_TAGS, SELECTED_NEWS_UNLOADED } from '../../../constants/ActionType'
import { Image, Spin } from 'antd'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { decodeHTMLContent } from '../../../utils'
import NewsTagsSlider from '../NewsTagsSlider/index'
import './News.css'
const NewsImage = ({ src }) => {
  return <Image className="news-thumbnail" src={src} fallback={defaultNewsImage} preview={false} />
}
export default function News() {
  const { slug } = useParams()
  const { newsdetail, reload } = useSelector(state => state.newsdetail)
  const { listnews, total } = useSelector(state => state.news)
  const onUnload = () => {
    store.dispatch({ type: SELECTED_NEWS_UNLOADED })
  }
  useEffect(() => {
    const fetchNewsTags = async () => {
      try {
        const tags = await newsdetail.tags.toString()
        const payload = await agent.News.getAll(0, { tags })
        store.dispatch({ type: LIST_NEWS_TAGS, payload })
      } catch (error) {}
    }
    fetchNewsTags()
  }, [newsdetail])

  const fetchNewsDetail = async () => {
    const result = await agent.News.getBySlug(slug)
    const payload = result.data.news
    store.dispatch({ type: SELECTED_NEWS, payload })
  }
  useEffect(() => {
    fetchNewsDetail()
    return () => {
      onUnload()
    }
    // eslint-disable-next-line
  }, [slug])

  useEffect(() => {
    if (reload) {
      fetchNewsDetail()
    }
    // eslint-disable-next-line
  }, [reload])
  return (
    <div>
      {newsdetail ? (
        <article className="news-detail">
          <h1 className="news-title">{newsdetail.title}</h1>
          <div className="news-thumbnail">
            <NewsImage src={newsdetail.thumbnail} />
          </div>
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: decodeHTMLContent(newsdetail.content) }}
          ></div>
          <div style={{ float: 'right' }}>
            {new Date(newsdetail.modifiedDate).toLocaleDateString()}, by{' '}
            <span style={{ fontStyle: 'italic', fontWeight: '700' }}>{newsdetail.author}</span>
          </div>
        </article>
      ) : (
        <Spin
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}
          size="large"
        />
      )}
      <div></div>
      <NewsTagsSlider listnewstags={listnews} total={total} />
    </div>
  )
}
