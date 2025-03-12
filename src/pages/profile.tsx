import type {GetStaticProps} from 'next';
import type {ReactElement} from 'react';
import type {NextPageWithLayout} from './_app';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {PrimaryLayout} from '@/layouts';
import {AccountInfo} from "@/components/profile/AccountInfo";

export const getStaticProps: GetStaticProps = async ({ locale = 'ru' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Home: NextPageWithLayout = () => {
  return (
    <>
      <AccountInfo />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Home', canonical: '/' }}>
      {page}
    </PrimaryLayout>
  );
};

export default Home;
