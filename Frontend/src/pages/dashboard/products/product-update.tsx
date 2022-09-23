import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../../../components/UI/form-container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppSelector } from '../../../redux';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/layouts/dashboard-layout';
import authAxios from '../../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../../utils/error';

type FormValues = {
  name: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  description: string;
};
const ProductUpdate = () => {
  const { products } = useAppSelector((state) => state.productList);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    image: Yup.string().required(),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    authAxios
      .put(`/products/${product?._id}`, data)
      .then((res) => {
        toast.success('Product has beend updated');
        navigate('/dashboard/product-list');
      })
      .catch((err) => toast.error(setError(err)));
  };

  return (
    <DashboardLayout>
      <Row className=' justify-content-center py-6'>
        <Col lg={5} md={6}>
          <Card>
            <h1 className='text-center text-primary my-3'>Chỉnh sửa</h1>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Tên sản phẩm'
                    {...register('name', {
                      value: product?.name,
                    })}
                    className={errors.name?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.name?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control
                    type='file'
                    placeholder='Hinh ảnh'
                    {...register('image', {
                      value: product?.image,
                    })}
                    className={errors.image?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.image?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Thương hiệu</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Thương hiệu'
                    {...register('brand', {
                      value: product?.brand,
                    })}
                    className={errors.brand?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.brand?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Danh mục</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Danh mục'
                    {...register('category', {
                      value: product?.category,
                    })}
                    className={errors.category?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.category?.message}</p>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    placeholder='200000'
                    {...register('price', {
                      value: product?.price,
                    })}
                    className={errors.price?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.price?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as={'textarea'}
                    rows={3}
                    placeholder='Mô tả'
                    {...register('description', {
                      value: product?.description,
                    })}
                    className={errors.description?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>
                    {errors.description?.message}
                  </p>
                </Form.Group>
                <Button type='submit' className='mt-3 w-full text-white'>
                  Cập nhật
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default ProductUpdate;
