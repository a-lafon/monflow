import config from '@/api/config';
import Layout from '@/presentation/components/common/Layout';
import useAuth from '@/presentation/hooks/useAuth';
import Cookies from "cookies";
import { FC, useEffect } from 'react';

const Home: FC<{ accessToken: string | null }> = ({ accessToken }) => {
  const { isAuth, setIsAuth } = useAuth();

  useEffect(() => {
    if (!isAuth && accessToken) {
      setIsAuth(true);
    }
  })

  return (
    <Layout>
      <h1>Monflow</h1>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
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