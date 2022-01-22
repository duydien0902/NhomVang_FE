import React from 'react'
import './NewsList.css'
import { CloseCircleOutlined } from '@ant-design/icons'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { Link } from 'react-router-dom'
import { store } from '../../../store'
import { SET_LIST_NEWS, SETSTATE_LIST_NEWS } from '../../../constants/ActionType'
import { Space, Spin, Pagination } from 'antd'

function ListPagination(props) {
  const listnews = props.newslist
  const title = props.title
  const listProductHot = props.listProductHot
  const changePage = async pageNumber => {
    const result = await props.pager(pageNumber - 1)
    store.dispatch({
      type: SET_LIST_NEWS,
      page: pageNumber - 1,
      payload: result
    })
  }
  const Tag = tag => {
    const key = 'tags'
    const value = tag
    store.dispatch({
      type: SETSTATE_LIST_NEWS,
      key,
      value
    })
  }
  const handleCloseTags = () => {
    const key = 'tags'
    const value = ''
    store.dispatch({
      type: SETSTATE_LIST_NEWS,
      key,
      value
    })
  }
  return (
    <div className="index-NewsList">
      <h1 style={{ fontSize: '40px', paddingBottom: '0px' }}>NEWS</h1>
      {title ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '30px'
          }}
        >
          <span style={{ fontSize: '18px' }}>Results for tag </span>
          <span
            style={{
              padding: '4px 10px 4px 10px',
              backgroundColor: ' greenyellow',
              borderRadius: '15px',
              fontSize: '13px',
              marginLeft: '5px'
            }}
          >
            # {title}
          </span>{' '}
          <span
            style={{
              cursor: 'pointer',
              color: 'red',
              fontSize: '23px',
              marginLeft: '15px',
              left: '210px',
              top: '-2px'
            }}
            onClick={handleCloseTags}
          >
            <CloseCircleOutlined />
          </span>
        </div>
      ) : null}
      <div className="container-NewList-Hotproduct">
        <div className="wapper-NewsList">
          {listnews ? (
            listnews.map(listnews => (
              <div className="news-preview px-10 py-8 bg-white">
                {/* <Space size={0}> */}
                <Link className="link" to={`/blog/${listnews.slug}`}>
                  <div style={{ width: '100%', height: '200px' }}>
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={listnews.thumbnail || defaultNewsImage}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="news-body">
                  <div className="news-date mb-3 text-gray-500">
                    {new Date(listnews.modifiedDate).toLocaleDateString()}
                  </div>
                  <div style={{ clear: 'both' }}></div>
                  <div className="news-author mb-4 italic">
                    By <span className="font-bold">{listnews.author}</span>
                  </div>
                  <h2 className="news-title my-0 mb-4">
                    <Link className="text-2xl" to={`/blog/${listnews.slug}`} style={{ color: 'black' }}>
                      {listnews.title}
                    </Link>
                  </h2>
                  <div className="product-tags">
                    <ul>
                      {listnews.tags.map(item => (
                        <li key={item} onClick={() => Tag(item)}>
                          # {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="news-description leading-7">{listnews.description}</div>
                  <Space className="news-footer mt-6" size="middle">
                    <Link className="link" to={`/blog/${listnews.slug}`}>
                      <button class="ex-tb px-6">Read more</button>
                    </Link>
                  </Space>
                </div>
                {/* </Space> */}
              </div>
            ))
          ) : (
            <Spin
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
              size="large"
            />
          )}
        </div>
        <div className="hotproduct-waapper">
          <div className="hotproduct">
            <h2>Hot Products</h2>
            <div className="wapper-hotproduct-item">
              {listProductHot ? (
                listProductHot.slice(0, 5).map(item => (
                  <Link style={{ color: 'black' }} to={`/product/${item.slug}`}>
                    <div className="hotproduct-item" key={item.slug}>
                      <div className="hotproduct-item-img">
                        {<img src={item.thumbnail || defaultNewsImage} alt="" />}
                      </div>
                      <div className="hotproduct-item-title">
                        <h4>{item.name}</h4>
                        {item.discountPrice ? (
                          <p>
                            Price: <span style={{ textDecorationLine: 'line-through' }}> {item.listedPrice} $</span>
                            <span style={{ marginLeft: '10px', color: 'red' }}> {item.discountPrice} $</span>
                          </p>
                        ) : (
                          <p>Price: {item.listedPrice} $</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <Spin style={{ textAlign: 'center', height: '40vh', marginTop: '20vh' }} size="large" />
              )}
            </div>
            <Link to="/products">
              <span
                style={{ float: 'right', fontSize: '17px', fontWeight: '700', cursor: 'pointer', paddingTop: '10px' }}
              >
                See more...
              </span>
            </Link>
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>
      </div>
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
