import React, { useEffect } from 'react'
import LayoutNewsList from './index'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { LIST_NEWS, NEWS_PAGE_UNLOADED } from '../../../constants/ActionType'
import { store } from '../../../store'
function NewsList() {
  const { pager, listnews, total, page, reload, setState } = useSelector(state => state.news)
  useEffect(() => {
    const onLoad = async () => {
      const pager = page => agent.News.getAll(page)
      const result = await agent.News.getAll(0, setState)
      store.dispatch({ type: LIST_NEWS, pager, payload: result })
    }
    onLoad()
  }, [setState])
  const onLoad = async () => {
    const pager = page => agent.News.getAll(page)
    const result = await agent.News.getAll()
    store.dispatch({ type: LIST_NEWS, pager, payload: result })
  }
  const onUnload = () => {
    store.dispatch({ type: NEWS_PAGE_UNLOADED })
  }

  useEffect(() => {
    onLoad()
    return () => {
      onUnload()
    }
  }, [])

  useEffect(() => {
    if (reload) {
      onLoad()
    }
  }, [reload])

  return (
    <div style={{ padding: '100px 100px 100px 100px', width: '100%', backgroundColor: '#DCDCDC' }}>
      <LayoutNewsList
        newslist={listnews}
        pageSize={agent.pageSizeNews}
        total={total}
        currentPage={page + 1}
        pager={pager}
      />
    </div>
  )
}

export default NewsList
