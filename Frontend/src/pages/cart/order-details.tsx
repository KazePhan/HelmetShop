import { useEffect } from 'react';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default-layout';
import Loader from '../../components/UI/loader';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getOrderById } from '../../redux/orders/order-details';
import { formatCurrencry } from '../../utils/helper';
import Stripe from 'react-stripe-checkout';
import authAxios from '../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import StripeCheckout from 'react-stripe-checkout';
import { addMethod } from 'yup';

const OrderDetails = () => {
  const { order, loading } = useAppSelector((state) => state.orderDetail);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const itemsPrice: number | undefined = order?.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const navigate = useNavigate();

  const taxPrice = itemsPrice ? itemsPrice * 0.08  : 0;

  const shippingPrice = itemsPrice ? (itemsPrice >= 500000 ? 0 : 30000) : 0;

  const totalPrice = itemsPrice && itemsPrice + taxPrice + shippingPrice;

  const handlePayment = (token: any) => {
    authAxios
      .post('/orders/stripe', {
        token: token.id,
        amount: order?.totalPrice,
      })
      .then((res) => {
        authAxios.put(`/orders/${order?._id}`).then((res) => {
          toast.success('Đã thanh toán sản phẩm thành công 😀');
          navigate('/');
        });
      })
      .catch((error) => toast.error(setError(error)) );
  };
  const tokenHandler = (token: any) => {
    handlePayment(token);
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  return (
    <DefaultLayout title='order payment'>
      <Container>
        <h2 className='mb-5'>Thanh toán</h2>

        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col md={8} className='mb-sm-3 mb-2'>
              <Card>
                <Card.Body>
                  <h4>Chi tiết đơn hàng</h4>
                  <ListGroup variant='flush'>
                    {order?.cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              roundedCircle
                              className='h-16 w-16'
                            />
                          </Col>
                          <Col md={6} className='d-none d-lg-block'>
                            {item.name}
                          </Col>
                          <Col>{item?.qty}</Col>

                          <Col>{formatCurrencry(item.price * item.qty)}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <h2 className='text-center'>Thanh toán</h2>
                  <ListGroup variant='flush'>
                    <ListGroup.Item as='h2'>
                      Tổng  (
                      {order?.cartItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                      ) sản phẩm
                    </ListGroup.Item>
                    <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                      <span>Tổng tiền</span>
                      <span>
                        {formatCurrencry(
                          order?.cartItems.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                          )
                        )}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                      <span>Thuế</span>
                      <span>{formatCurrencry(taxPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                      <span>Phí vận chuyển</span>
                      <span>{formatCurrencry(shippingPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5 className=' d-flex justify-content-between align-items-center'>
                        <span>Tổng cộng</span>
                        <span>{formatCurrencry(totalPrice)}</span>
                      </h5>
                    </ListGroup.Item>
                    {!order?.isPaid&& (
                      <ListGroup.Item className='stripe__container'>
                        <StripeCheckout
                          currency='vnd'
                          description={`Tổng giá trị đơn: ${formatCurrencry(
                            totalPrice
                          )}`}
                          name='TN Shop'
                          image='/imgs/logo.png'

                          stripeKey='pk_test_51LJZK0CMrrMil7M3wfVkIz7yOJyqaBuHLwxhe2Etn9bgX1LhQRbEUS5Re6mKCr0IDywjeIbbsJNKe2gteY8KHqL800rJxt8vmD'
                           
                  
                         token={tokenHandler}
                        />
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default OrderDetails;
