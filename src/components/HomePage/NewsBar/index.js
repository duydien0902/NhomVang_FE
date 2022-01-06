import React, { useEffect } from 'react'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import agent from '../../../agent'
import { store } from '../../../store'
import './NewsBar.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LIST_NEWS } from '../../../constants/ActionType'
function NewsSlider() {
  const newsList = useSelector(state => state.news.listnews)
  useEffect(() => {
    async function fetchNewsList() {
      const payload = await agent.News.getAll(0)
      store.dispatch({ type: LIST_NEWS, payload })
    }
    fetchNewsList()
  }, [])
  return (
    <div style={{ width: '100%', paddingBottom: '80px' }}>
      <div className="title-news" style={{ marginTop: '120px', width: '90%', margin: '0 auto' }}>
        <h1>
          <span>NEWS</span>
        </h1>
      </div>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <div className="NewsBar">
          {newsList
            ? newsList.map(news => (
                <div key={news.slug} className="container-NewsBar">
                  <div className="container-NewsBar-img">
                    {<img src={news.thumbnail || defaultNewsImage} alt="news" />}
                  </div>

                  <div>
                    <Link className="link" to={`/blog/${news.slug}`}>
                      <span style={{ fontWeight: '600', color: 'red' }}>{news.title}</span>
                    </Link>
                    <br />
                    <span>{news.description}</span>
                  </div>
                </div>
              ))
            : null}
        </div>
        <Link className="link" to="/blog/slug">
          <span style={{ float: 'right', fontSize: '20px', fontWeight: '700', cursor: 'pointer', color: 'white' }}>
            See more...
          </span>
        </Link>
      </div>
    </div>
  )
}

export default NewsSlider
