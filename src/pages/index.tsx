import type {GetStaticProps} from 'next';
import type {ReactElement} from 'react';
import type {NextPageWithLayout} from './_app';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {Hero} from '@/components';
import {PrimaryLayout} from '@/layouts';

export const getStaticProps: GetStaticProps = async ({ locale = 'ru' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout seo={{ title: 'Profile', canonical: '/profile' }}>
      {page}
    </PrimaryLayout>
  );
};

export default Profile;
