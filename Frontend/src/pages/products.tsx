import { useEffect, useState } from 'react';
import {
  Row,
  Container,
  Col,
  Card,
  Form,
  ListGroup,
  FormSelect,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/layouts/default-layout';
import ProductCard from '../components/product-card';
import Paginate from '../components/UI/paginate';
import { useAppDispatch, useAppSelector } from '../redux';
import { getFilterProducts } from '../redux/products/search-list';

const Products = () => {
  const params = useParams();
  const { products, categories, brands, page, pages } = useAppSelector(
    (state) => state.productFilter
  );
  const dispatch = useAppDispatch();
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const reset = () => {
    setBrand('');
    setCategory('');
    setSearch('');
  };

  useEffect(() => {
    dispatch(
      getFilterProducts({ n: pageNumber, b: brand, c: category, q: search })
    );
  }, [dispatch, pageNumber, brand, search, category]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col lg={3}>
            <h2 className='py-4'> Lọc</h2>
            <Card className='shadow p-3'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4 className='mb-2'>Danh mục</h4>
                  <FormSelect
                    defaultValue={'All'}
                    onChange={(e: any) => {
                      if (e.target.value === 'All') {
                        reset();
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                  >
                    <option value='All'>Tất cả</option>
                  Tất cả
                    {categories.map((categorie: any) => (
                      <option value={categorie} key={categorie}>
                        {categorie}
                      </option>
                    ))}
                  </FormSelect>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4 className='mb-2'>Thương hiệu</h4>
                  <FormSelect
                    defaultValue={'All'}
                    onChange={(e: any) => {
                      if (e.target.value === 'All') {
                        reset();
                      } else {
                        setBrand(e.target.value);
                      }
                    }}
                  >
                    <option value='All'>Tất cả</option>
                    Tất cả
                    {brands.map((brand: any) => (
                      <option value={brand} key={brand}>
                        {brand}
                      </option>
                    ))}
                  </FormSelect>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col lg={9}>
            <Row>
              <Col md={6}>
                <ul className='list-inline shop-top-menu pb-3 pt-1'>
                  <li className='list-inline-item'>
                    <a
                      className='h3 text-dark text-decoration-none mr-3'
                      href='#'
                    >
                   Tất cả
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a
                      className='h3 text-dark text-decoration-none mr-3'
                      href='#'
                    >
                Sản phẩm
                    </a>
                  </li>
                  <li className='list-inline-item'>
                    <a className='h3 text-dark text-decoration-none' href='#'>
                  
                    </a>
                  </li>
                </ul>
              </Col>
              <div className='col-md-6 pb-4'>
                <div className='d-flex'>
                  <Form.Control
                    onChange={(e: any) => setSearch(e.target.value)}
                    className='me-2'
                    placeholder='Tìm kiếm...'
                    value={search}
                  />
                </div>
              </div>
            </Row>
            <Row style={{ minHeight: '80vh' }}>
              {products.map((product) => (
                <Col lg={4} md={6} xs={12} key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
          isAdmin={false}
        />
      </Container>
    </DefaultLayout>
  );
};

export default Products;
