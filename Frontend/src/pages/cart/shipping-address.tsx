import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch, useAppSelector } from '../../redux';
import { saveAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const ShippingAddress = () => {
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddressTypes>({
    address: '',
    receiver: '',
    addressDetails: '',
    phoneNum: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      saveAddress({
        address: formData.address,
        receiver: formData.receiver,
        addressDetails: formData.addressDetails,
        phoneNum: formData.phoneNum,
      })
    );
    navigate('/checkout');
  };

  useEffect(() => {
    if (shippingAddress) return navigate('/checkout');
  }, [shippingAddress]);

  return (
    <FormContainer meta='shipping address' title='Địa chỉ giao hàng'>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Tên người nhận</Form.Label>
          <Form.Control
            onChange={onChange}
            name='address'
            placeholder='Nhập tên người nhận'
            required
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            onChange={onChange}
            name='receiver'
            placeholder='Nhập địa chỉ(Tỉnh/Thành phố-Quận/Huyện-Xã)'
            required
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Địa chỉ cụ thể</Form.Label>
          <Form.Control
            onChange={onChange}
            name='addressDetails'
            placeholder='Địa chỉ cụ thể(Số nhà-Tên đường-Phường-Quận-Huyện-Xã)'
            required
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            onChange={onChange}
            name='phoneNum'
            type='tel'
            placeholder='Nhập số điện thoại'
            required
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          variant='outline-none'
          type='submit'
          className='mt-4 w-full'
        >
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddress;
