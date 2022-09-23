import { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import DashboardLayout from '../../components/layouts/dashboard-layout';
import { useAppDispatch, useAppSelector } from '../../redux';
import { ordersPrice } from '../../redux/orders/slice-list';
import { formatCurrencry } from '../../utils/helper';
import {Bar,Line} from 'react-chartjs-2';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
const DashboardPage = () => {
  const { total } = useAppSelector((state) => state.productFilter);
  const { totalPrice } = useAppSelector((state) => state.orders);
  const { users } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
 

  useEffect(() => {
    dispatch(ordersPrice());
  }, [dispatch, totalPrice]);


  return (
    <DashboardLayout>
      <Row className='g-6 my-6'>
        <Col md={4}>
          <Card className=' shadow border-0'>
            <Card.Body>
              <Row>
                <Col>
                  <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                   Tổng doanh thu bán hàng
                  </span>
                  <span className='h3 font-bold mb-0'>
                    {formatCurrencry(totalPrice)}
                  </span>
                </Col>
                <div className='col-auto'>
                  <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                    <i className='bi bi-credit-card' />
                  </div>
                </div>
              </Row>
              <div className='mt-2 mb-0 text-sm'>
                <span className='badge badge-pill bg-soft-success text-success me-2'>
                  <i className='bi bi-arrow-up me-1' />
                 
                </span>
                <span className='text-nowrap text-xs text-muted'>
               Tăng so với tháng trước
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className=' shadow border-0'>
            <Card.Body>
              <Row>
                <Col>
                  <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                Người dùng
                
                  </span>
                  <span className='h3 font-bold mb-0'>{users.length}</span>
                </Col>
                <div className='col-auto'>
                  <div className='icon icon-shape bg-primary text-white text-lg rounded-circle'>
                    <i className='bi bi-people' />
                  </div>
                </div>
              </Row>
              <div className='mt-2 mb-0 text-sm'>
                <span className='badge badge-pill bg-soft-success text-success me-2'>
                  <i className='bi bi-arrow-up me-1' />
                
                </span>
                <span className='text-nowrap text-xs text-muted'>
                  Tăng so với tháng trước
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className=' shadow border-0'>
            <Card.Body>
              <Row>
                <Col>
                  <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                    Số lượng sản phẩm
                  </span>
                  <span className='h3 font-bold mb-0'>{total}</span>
                </Col>
                <div className='col-auto'>
                  <div className='icon icon-shape bg-info text-white text-lg rounded-circle'>
                    <i className='bi bi-clock-history' />
                  </div>
                </div>
              </Row>
              <div className='mt-2 mb-0 text-sm'>
                <span className='badge badge-pill bg-soft-danger text-danger me-2'>
                
                
                </span>
                <span className='text-nowrap text-xs text-muted'>
                  
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='g-6 my-6'>
      
      <Col md={8}>
          <BarChart />
        </Col>
          <Col md={4}>
            <PieChart/> 
            </Col>
        </Row>
    </DashboardLayout>
  );
};

export default DashboardPage;
