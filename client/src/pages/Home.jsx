import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PostCard from "../components/PostCard";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { Spinner } from "flowbite-react";
import { ApiContext } from "../context/ApiContext.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { API_URL } = useContext(ApiContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/post/getposts`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("The response is not JSON");
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner aria-label="Loading posts" size="xl" />
      </div>
    );

  return (
    <div>
      <section className="bg-gray-900 py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight">
              Welcome to My <br className="hidden md:block" />
              <span className="text-indigo-500 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Blog</span> Website
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
              Explore insightful blogs on programming, software engineering, and trending tech.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg transition duration-300"
              >
                Toggle Theme
              </button>
              <a
                href="#recent-posts"
                className="bg-transparent border border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-500 font-semibold px-6 py-3 rounded-md transition duration-300"
              >
                Scroll Down for Posts
              </a>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-1/3 mt-12 md:mt-0">
            <img
              src="https://www.atulhost.com/wp-content/uploads/2016/11/start-blogging.jpg"
              alt="Hero"
              className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/search"
            className="text-sm text-teal-400 hover:underline font-medium"
          >
            View all posts
          </Link>
        </div>
      </section>

      <section id="recent-posts" className="max-w-7xl mx-auto px-4 py-16">
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {posts.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/search"
                className="text-lg text-teal-500 hover:underline font-medium"
              >
                View all posts
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
