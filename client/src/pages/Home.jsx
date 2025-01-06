import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice'
import { Spinner } from "flowbite-react";



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        
        // Check if the response is not OK (status in the range 200-299)
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        // Check if the response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('The response is not JSON');
        }
        
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false)
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
           <Spinner aria-label="Default status example" size='lg' />
      </div>
    );

  return (
    <div>
      <div className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 lg:w-2/3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                Welcome to My<br className="hidden md:block" />
                <span className="text-indigo-500">Blog</span> Website
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                Here you will get blogs related to programming, software engineering, and trending technologies.
              </p>
              <div className="flex gap-2">
                <button  onClick={()=> dispatch(toggleTheme())}>
               
                <a href="#" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md">
                  Scroll Down for posts
                </a>

                </button>
                
              </div>
            </div>
            <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
              <img src="https://www.atulhost.com/wp-content/uploads/2016/11/start-blogging.jpg" alt="Hero Image" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
        <Link to='/search' className='text-xs px-12 sm:text-sm text-teal-500 font-bold hover:underline'>
          View all posts
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
