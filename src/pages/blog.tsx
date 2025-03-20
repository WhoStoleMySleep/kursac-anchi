import type {GetStaticProps} from 'next';
import type {NextPageWithLayout} from '../_app';
import {ReactElement, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {BlogList} from '@/components';
import {Pagination} from '@/components/ui';
import {PrimaryLayout} from '@/layouts';
import {api} from '@/utils/api';

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string)),
    },
  };
};

// export function getStaticPaths(): GetStaticPathsResult {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }

const Blog: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = api.useContext();

  const {
    page = 1,
  } = router.query as {
    page: number | undefined;
  };

  const queryInput = useMemo(
    () => ({
      page: page && Number(page)
    }),
    [page]
  );

  const { data, isLoading, isPreviousData } =
    api.blog.all.useQuery(queryInput);

  const pageSize = 12;

  useEffect(() => {
    if (data) {
      const totalPageCount = Math.ceil(data.totalCount / pageSize);
      if (!isPreviousData && totalPageCount > Number(page)) {
        utils.blog.all.prefetch({ ...queryInput, page: Number(page) + 1 });
      }
    }
  }, [data, page, isPreviousData, queryInput, utils]);

  return (
    <div className="mx-auto items-center p-4 xl:container">
      <div>
        <div className="hidden flex-1 md:block">
          <h1 className="text-5xl mt-4 mb-7 font-bold">Блог</h1>
        </div>
        <div className="flex-[5]">
          <BlogList blogs={data?.blogs} isLoading={isLoading} />
          <div className="flex justify-center py-5">
            <Pagination
              totalCount={data?.totalCount}
              currentPage={Number(page)}
              pageSize={pageSize}
              onPageChange={page =>
                router.push({ query: { ...router.query, page } }, undefined, {
                  shallow: true,
                  scroll: true,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return (
    <PrimaryLayout
      seo={{
        title: 'Блог',
        description: 'Блог',
        canonical: 'http://localhost:3000/blog',
      }}
    >
      {page}
    </PrimaryLayout>
  );
};

export default Blog;
