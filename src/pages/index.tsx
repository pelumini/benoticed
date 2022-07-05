import { useContext } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';
import Product from 'src/models/Product';
import { IProduct } from 'src/types';
import db from 'src/utils/db';
import { Store } from 'src/utils/Store';

interface IHomeProps {
  products: IProduct[];
}

export default function Home({ products }: IHomeProps) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product: IProduct) => {
    const existItem = state.cart.cartItems.find(
      (x: any) => x._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={product.image}
                      title={product.name}
                      // width={915}
                      // height={397}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
