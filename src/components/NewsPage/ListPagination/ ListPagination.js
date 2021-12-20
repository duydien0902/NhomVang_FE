import React, { useEffect } from 'react'
import LayoutPagination from './index'
import agent from '../../../agent'
import { useSelector } from 'react-redux'
import { LIST_NEWS } from '../../../constants/ActionType'
import { store } from '../../../store'
function ListPagination() {
  const { pager, listnews, total, page } = useSelector(state => state.news)
  useEffect(() => {
    async function fetchData() {
      const pager = page => agent.News.getAll(page)
      const result = await agent.News.getAll(0)
      store.dispatch({ type: LIST_NEWS, pager, payload: result })
    }
    fetchData()
  }, [])

  return (
    <div style={{ paddingTop: '150px', width: '100%', backgroundColor: '#DCDCDC' }}>
      <LayoutPagination
        newslist={listnews}
        pageSize={agent.pageSize}
        total={total}
        currentPage={page + 1}
        pager={pager}
      />
    </div>
  )
}

export default ListPagination
