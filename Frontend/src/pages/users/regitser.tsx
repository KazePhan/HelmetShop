import React from 'react';
import FormContainer from '../../components/UI/form-container';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import publicAxios from '../../utils/public-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Tài khản không được để trống')
      .min(6, 'Tài khoản phải có ít nhất 6 ký tự')
      .max(20, 'Tài khoản không được vượt quá 20 ký tự'),
    email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(40, 'Mật khẩu không được vượt quá 40 ký tự'),
    confirmPassword: Yup.string()
      .required('Xác nhận mật khẩu không được để trống')
      .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không đúng'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    publicAxios
      .post('/users/register', data)
      .then((res) => {
        toast.success('Đăng ký thành công');
        navigate('/login');
      })
      .catch((err) => toast.error(setError(err)));
  };

  return (
    <FormContainer
      meta='Đăng ký tài khoản'
    
      title='Đăng ký'
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='name'>
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            placeholder='Tên đăng nhập'
            {...register('name')}
            className={errors.name?.message && 'is-invalid'}
          />
          <p className='invalid-feedback'>{errors.name?.message}</p>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>

          <Form.Control
            type='email'
            placeholder='Nhập email'
            {...register('email')}
            className={errors.email?.message && 'is-invalid'}
          />
          <p className='invalid-feedback'>{errors.email?.message}</p>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Mật khẩu</Form.Label>

          <Form.Control
            type='password'
            placeholder='*******'
            {...register('password')}
            className={errors.password?.message && 'is-invalid'}
          />
          <p className='invalid-feedback'>{errors.password?.message}</p>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Xác nhận mật khẩu</Form.Label>

          <Form.Control
            type='password'
            placeholder='*******'
            {...register('confirmPassword')}
            className={errors.confirmPassword?.message && 'is-invalid'}
          />
          <p className='invalid-feedback'>{errors.confirmPassword?.message}</p>
          <Link to='/login' className='float-end me-2 mt-1'>
            Đã có tài khoản? Đăng nhập.
          </Link>
        </Form.Group>

        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          variant='outline-none'
          type='submit'
          className='mt-4 w-full'
        >
          Đăng ký tài khoản
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
