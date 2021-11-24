import './App.css'
import NewsList from './components/NewsList'

function App() {
  const newsList = [
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/11/CHECK-IN-DU-THUYEN-e1637723308155.jpg',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'Bắt Trend Check in Du Thuyền Sang Chảnh Bạn Đã Thử ?',
      description:
        'Khi trào lưu du lịch trên du thuyền đang hot hơn bao giờ hết, “siêu phẩm” FLC Albatross hứa hẹn những trải nghiệm độc đáo hết mức mà du khách nhất định không thể bỏ…',
      slug: 'bat-trend-check-in-du-thuyen-sang-chanh-giua-thien-duong-bien-quy-nhon-ban-da-thu'
    },
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/11/BEN-DAM-e1637722800902-750x465.jpg',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'KINH NGHIỆM ĐẾN THIÊN ĐƯỜNG DU LỊCH CÔN ĐẢO',
      description:
        'Sau kỳ nghỉ lễ dài ngày tại Côn Đảo, Quang Long 1998 cùng nhóm bạn Sài Gòn chia sẻ bài tư vấn chi tiết cho chuyến du lịch hòn đảo thiên đường này. Long và…',
      slug: 'kinh-nghiem-den-thien-duong-du-lich-con-dao'
    },
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/10/FLC-eco-farm-1-e1633937922301.jpg',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'Ghé thăm trái tim xanh FLC Vĩnh Phúc',
      description:
        'Mời bạn ghé thăm “trái tim xanh” của FLC Vĩnh Phúc – FLC ECO FARM Những ngày ở nhà, bạn đã kịp chăm chút cho không gian xanh xung quanh mình bằng những chậu cây…',
      slug: 'ghe-tham-trai-tim-xanh-flc-vinh-phuc'
    },
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/10/NHAHANG_SAMSON-750x465.jpg',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'Thưởng thức hải sản tại nhà hàng bình dân ở khu nghỉ dưỡng 5 sao',
      description:
        'Khi trào lưu du lịch trên du thuyền đang hot hơn bao giờ hết, “siêu phẩm” FLC Albatross hứa hẹn những trải nghiệm độc đáo hết mức mà du khách nhất định không thể bỏ…',
      slug: 'thuong-thuc-hai-san-tai-nha-hang-binh-dan-ngay-trong-long-khu-nghi-duong-5-sao'
    },
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/10/1-e1633884806911-750x465.jpg',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'CÙNG HỘI BẠN CHECK-IN SANG CHẢNH HẾT NẤC Ở HẠ LONG',
      description:
        'Sở hữu vịnh biển kỳ quan cùng một nhịp sống hiện đại, Hạ Long là điểm đến hấp dẫn không thể bỏ qua dành cho du khách trẻ năng động. Dưới đây là lịch trình…',
      slug: 'tranh-thu-cuoi-tuan-troi-thu-mat-me-cung-hoi-ban-check-in-sang-chanh-het-nac-o-ha-long'
    },
    {
      thumbnail: 'https://assets.digilink.vn/uploads/2021/10/HONSEO-e1633918394314.png',
      modifiedDate: '2021-11-24T08:55:42.430Z',
      title: 'Top những điểm đến mới ở Quy Nhơn phải đi ngay khi hết dịch',
      description:
        'Bạn sẽ đi đâu khi hết dịch? Sau quá nhiều ngày cuồng chân bí bách, chẳng điều gì quyến rũ chúng ta hơn là những bãi biển hoang sơ, những trải nghiệm mới lạ giữa…',
      slug: 'top-nhung-diem-den-moi-o-quy-nhon-phai-di-ngay-khi-het-dich'
    }
  ]

  return (
    <div>
      <NewsList newsList={newsList} />
    </div>
  )
}

export default App
