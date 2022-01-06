import React from 'react'
import './AboutusPage.css'
import avt1 from '../../assets/phihoanglong.jpg'
import avt2 from '../../assets/daoduydien.jpeg'
function AboutusPage() {
  return (
    <div style={{ paddingTop: '80px', paddingBottom: '50px' }}>
      <div className="container-aboutus">
        <div className="aboutus-top">
          <div className="aboutus-avatar">
            <img src={avt1} alt="" />
          </div>
          <div className="aboutus-content aboutus-content-top">
            <h1> Phí Hoàng Long</h1>
            <h3>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </h3>
          </div>
        </div>
        <div className="aboutus-bottom">
          <div className="aboutus-avatar">
            <img src={avt2} alt="" />
          </div>
          <div className="aboutus-content aboutus-content-bottom">
            <h1> Đào Duy Điền</h1>
            <h3>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutusPage
