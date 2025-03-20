import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {Product} from '@/types';

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent`;

export const Skeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-2">
      <div className={`h-[350px] rounded-2xl bg-neutral-200 ${shimmer}`} />
      <div className="my-3 space-y-3 px-1">
        <div className={`h-4 w-full rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className="flex justify-between">
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
};

export const BlogItem = ({
  id,
  name,
  description,
  images,
}: Product) => {
  const image: any = images[0];

  const productLink = `/blog/${id}/slug`;

  return (
    <div className="group rounded-2xl bg-white p-2">
      <div className="relative h-[400px] overflow-hidden rounded-2xl transition sm:h-[330px]">
        <Link href={productLink} className="relative block h-full w-full">
          {image && (
            <Image
              key={image.imageURL}
              src={image.imageURL}
              alt={`${name} image`}
              className={clsx('absolute h-full w-full duration-700 ')}
              width={350}
              height={350}
              placeholder="blur"
              blurDataURL={image.imageBlur}
            />
          )}
        </Link>
      </div>
      <div className="mb-1 mt-2 space-y-4 px-1">
        <div>
          <h2 className="text-base font-medium">{name}</h2>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          {description}
        </div>
      </div>
    </div>
  );
};
