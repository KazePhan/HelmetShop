import { Col, Container, Form, Row } from 'react-bootstrap';
import DefaultLayout from '../../components/layouts/default-layout';
import './contact.css';

const Contact = () => {
  return (
    <DefaultLayout>
      <section id='contact' className='contact'>
        <Container data-aos='fade-up'>
          <div className='section-title'>
            <h2 className='text-center'>Liên hệ</h2>
            <p> Cửa hàng mũ bảo hiểm, mũ fullface, mũ 3/4, đồ bảo hộ Motor chính hãng đạt tiêu chuẩn của Tổng Cục Tiêu Chuẩn Đo Lường Chất Lượng.</p>
            <p> Để được hỗ trợ tốt nhất, vui lòng điền vào mẫu dưới đây.</p>

          </div>
          <Row data-aos='fade-up' data-aos-delay={100}>
            <Col lg={6}>
              <Row>
                <Col md={12}>
                  <div className='info-box bg-white'>
                    <i className='bx bx-map' />
                    <h3>Địa chỉ liên hệ</h3>
                    <p> Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className='info-box mt-4 bg-white'>
                    <i className='bx bx-envelope' />
                    <h3>Email</h3>
                    <p>
                      info@example.com
                      <br />
                      contact@example.com
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className='info-box mt-4 bg-white'>
                    <i className='bx bx-phone-call' />
                    <h3>Điện thoại</h3>
                    <p>
                      +84 987 654 321
                      <br />
                      +84 399 491 909
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Form
                action='forms'
                method='post'
                role='form'
                className='php-email-form bg-white'
              >
                <Row>
                  <Col className=' form-group'>
                    <Form.Control
                      type='text'
                      name='name'
                      className='bg-surface-secondary'
                      id='name'
                      placeholder='Họ và tên của bạn'
                      required
                    />
                  </Col>
                  <div className='col form-group'>
                    <Form.Control
                      type='email'
                      className='bg-surface-secondary'
                      name='email'
                      id='email'
                      placeholder='Email của bạn'
                      required
                    />
                  </div>
                </Row>
                <div className='form-group'>
                  <Form.Control
                    type='text'
                    className='bg-surface-secondary'
                    name='subject'
                    id='subject'
                    placeholder='Tiêu đề'
                    required
                  />
                </div>
                <div className='form-group'>
                  <Form.Control
                    as={'textarea'}
                    className='bg-surface-secondary'
                    name='message'
                    rows={5}
                    placeholder='Nội dung'
                    required
                    defaultValue={''}
                  />
                </div>
                <div className='my-3'>
                  <div className='loading'>Đang tải...</div>
                  <div className='error-message' />
                  <div className='sent-message'>
                    Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.
                  </div>
                </div>
                <div className='text-center'>
                <button type='submit' className='btn btn-primary btn-block'> Gửi</button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </DefaultLayout>
  );
};

export default Contact;
