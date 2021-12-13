import React from 'react'
import './ListPagination.css'
import defaultNewsImage from '../../../assets/defaultNewsImage.png'
import { Link } from 'react-router-dom'
import { Button, Image, Space } from 'antd'
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
export default function ListPagination(props) {
  const listnews = props.Newslist
  console.log(listnews)
  return (
    //   <div style={{ paddingTop: '150px' }}>
    //     <div className="ListPagination">
    //       {listnews ? (
    //         listnews.map(item => (
    //           <Link className="link" to={`/blog/${item.slug}`}>
    //             <div key={item.slug} className="container-ListPagination">
    //               <div> {<img src={item.thumbnail || defaultNewsImage} alt="news" />}</div>
    //               <div>
    //                 <h3 style={{ color: 'red', fontSize: '20px' }}>{item.title}</h3>
    //                 <span style={{ fontSize: '17px' }}>{item.description}</span>
    //               </div>
    //             </div>
    //           </Link>
    //         ))
    //       ) : (
    //         <p>loading....</p>
    //       )}
    //     </div>
    //   </div>

    // )
    <div>
      {listnews ? (
        listnews.map(listnews => (
          <div className="news-preview px-10 py-8 bg-white">
            <Space size={0}>
              <NewsImage className="mr-8" src={listnews.thumbnail} />
              <div className="news-body" style={{ marginLeft: '30px' }}>
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
        <p>loading....</p>
      )}
    </div>
  )
}
