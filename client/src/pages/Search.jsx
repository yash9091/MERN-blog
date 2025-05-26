import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { ApiContext } from '../context/ApiContext';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { API_URL } = useContext(ApiContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${API_URL}/api/post/getposts?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', posts.length);
    const res = await fetch(`${API_URL}/api/post/getposts?${urlParams.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(prev => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/4 border rounded-lg p-6 bg-white shadow-sm dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Filters</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium mb-1">
              Search Term
            </label>
            <TextInput
              id="searchTerm"
              placeholder="e.g., JavaScript"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-1">
              Sort By
            </label>
            <Select id="sort" value={sidebarData.sort} onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <Select id="category" value={sidebarData.category} onChange={handleChange}>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
<div className="flex gap-4">
  <Button type="submit" outline gradientDuoTone="purpleToPink">
    Apply Filters
  </Button>
  <Button
    color="gray"
    onClick={() => {
      setSidebarData({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
      });
      navigate('/search');
    }}
  >
    Reset Filters
  </Button>
</div>

        </form>
      </div>

      {/* Post Results */}
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2">
          Posts results:
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg col-span-full">
              Loading posts...
            </p>
          )}

          {!loading && posts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg col-span-full">
              No posts found.
            </p>
          )}

          {!loading && posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        {showMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-500 hover:text-white transition-all"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
