import { useEffect } from 'react';
import FormContainer from '../../components/UI/form-container';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux';
import { userLogin } from '../../redux/users/login-slice';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.login);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Emai không được để trống').email('Email không hợp lệ'),
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(40, 'Mật khẩu không được vượt quá 40 ký tự'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (userInfo) return navigate('/');
  }, [userInfo]);

  return (
    <FormContainer
      meta='Đăng nhập tài khoản'
      image='https://blog.hubspot.com/hubfs/ecommerce-1.png'
      title='Đăng nhập'
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='email'>
          <Form.Label>Tài khoản Email</Form.Label>

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
          <Link to='/register' className='float-end me-2 mt-1'>
           Nếu chưa có tài khoản? Đăng ký tại đây
          </Link>
        </Form.Group>

        <Button
          type='submit'
          className='mt-4 w-full'
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          variant='outline-none'
        >
          Đăng nhập
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
