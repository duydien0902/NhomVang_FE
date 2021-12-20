import React from 'react'
import './ListPagination.css'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { Link } from 'react-router-dom'
import { store } from '../../../store'
import { SET_LIST_NEWS } from '../../../constants/ActionType'
import { Button, Image, Space, Spin, Pagination } from 'antd'
const NewsImage = ({ className, src, hidden }) => {
  return (
    <div className={className} hidden={hidden}>
      <Image
        width={200}
        height={200}
        className="news-thumbnail max-w-xs max-h-80 mr-8"
        src={src || defaultNewsImage}
        fallback={defaultNewsImage}
        preview={false}
      />
    </div>
  )
}
function ListPagination(props) {
  const listnews = props.newslist
  const changePage = async pageNumber => {
    const result = await props.pager(pageNumber - 1)
    store.dispatch({
      type: SET_LIST_NEWS,
      page: pageNumber - 1,
      payload: result
    })
  }
  return (
    <div>
      <h1 style={{ fontSize: '40px', paddingLeft: '10px', paddingBottom: '20px', textAlign: 'center' }}>TIN TỨC</h1>
      {listnews ? (
        listnews.map(listnews => (
          <div className="news-preview px-10 py-8 bg-white">
            <Space size={0}>
              <NewsImage className="mr-8" src={listnews.thumbnail} />
              <div className="news-body">
                <div className="news-date mb-3 text-gray-500">
                  {new Date(listnews.modifiedDate).toLocaleDateString()}
                </div>
                <div className="news-author mb-4 italic">
                  By <span className="font-bold">{listnews.author}</span>
                </div>
                <h2 className="news-title my-0 mb-4">
                  <Link className="text-2xl" to={`/blog/${listnews.slug}`}>
                    {listnews.title}
                  </Link>
                </h2>
                <div className="news-description leading-7">{listnews.description}</div>
                <Space className="news-footer mt-6" size="middle">
                  <Button className="px-6" type="primary" size="large">
                    <Link to={`/blog/${listnews.slug}`}>Đọc tiếp</Link>
                  </Button>
                </Space>
              </div>
            </Space>
          </div>
        ))
      ) : (
        <Spin
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
          size="large"
        />
      )}
      <Pagination
        style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px', paddingBottom: '50px' }}
        defaultCurrent={1}
        pageSize={props.pageSize}
        total={props.total}
        currentPage={props.currentPage}
        onChange={changePage}
      />
    </div>
  )
}
export default ListPagination
