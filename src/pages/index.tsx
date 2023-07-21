import config from '@/api/config';
import Layout from '@/presentation/components/common/Layout';
import useAuth from '@/presentation/hooks/useAuth';
import Cookies from "cookies";
import { FC, useEffect } from 'react';

const Home: FC<{ accessToken: string | null }> = ({ accessToken }) => {
  const { login, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth && accessToken) {
      login();
    }
  }, [])

  return (
    <Layout>
      <h1>Monflow</h1>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  // TODO: see to pass token on each page
  const cookies = new Cookies(context.req, context.res);
  try {
    const accessToken = cookies.get(config.accessTokenKey);
    return {
      props: {
        accessToken: accessToken || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        accessToken: null,
      }
    }
  }
}

export default Home;