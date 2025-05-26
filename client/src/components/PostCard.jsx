import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative bg-white  dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-56 w-full object-cover group-hover:opacity-90 transition duration-300'
        />
      </Link>
      <div className='p-5 flex flex-col gap-3'>
        <p className='text-xl font-semibold text-gray-900 dark:text-white line-clamp-2'>
          {post.title}
        </p>
        <span className='text-sm italic text-gray-500 dark:text-gray-400'>
          {post.category}
        </span>
        <Link
          to={`/post/${post.slug}`}
          className='inline-block mt-2 px-4 py-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded-md text-center transition-all duration-300'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
