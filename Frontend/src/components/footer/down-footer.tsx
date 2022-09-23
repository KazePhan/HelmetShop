import { Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './footer.css';

const DownFooter = () => {
  return (
    <footer id='footer' className='mt-auto'>
      <div className='footer-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 footer-contact'>
              <h3>
                <Image width={100} src='/imgs/logo2.png' alt='' />
              </h3>
              <p>
                Địa chỉ:
                <br />
               Cầu Bình Lợi, Hiệp Bình Chánh, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
                <br />
                Việt Nam
                <br />
                <br />
                <strong>Điện thoại:</strong> +84 987 654 321
                <br />
                <strong>Email:</strong> TNShop@support.com.vn
                <br />
              </p>
            </div>
            <div className='col-lg-2 col-md-6 footer-links'>
              <span>Liên kết</span>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='/'>Trang chủ</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='/'>Giới thiệu</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' /> <a href='/product'>Sản phẩm</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='/contact'>Liên hệ</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Điều khoản</a>
                </li>
              </ul>
            </div>
            <div className='col-lg-3 col-md-6 footer-links'>
              <span>Dịch vụ </span>
              <ul>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Design</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Web Development</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Product Management</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Marketing</a>
                </li>
                <li>
                  <i className='bx bx-chevron-right' />{' '}
                  <a href='#'>Graphic Design</a>
                </li>
              </ul>
            </div>
            <div className='col-lg-4 col-md-6 footer-newsletter'>
              <span>Nhận thông tin mới nhất</span>
              <p>
                Đăng ký nhận thông tin mới nhất từ TNShop.
              </p>
              
              <form onSubmit={() => toast.success(' Cảm ơn bạn đã quan tâm')}>
                <input
                  type='email'
                  required
                  placeholder='email@domain.com'
                  name='email'
                />
                <input type='submit' value={'Đăng ký ngay'} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DownFooter;
