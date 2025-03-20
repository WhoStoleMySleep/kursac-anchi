import {BlogItem, Skeleton} from "./BlogItem";

interface Props {
  blogs: any | undefined;
  isLoading: boolean;
}

export const BlogList = ({ blogs, isLoading }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {isLoading &&
        Array(12)
          .fill('')
          .map((_, index) => <Skeleton key={index}/>)}
      {blogs &&
        blogs.map((blog: any) => (
          <div key={blog.id}>
            <BlogItem {...blog} />
          </div>
        ))}
    </div>
  );
};
