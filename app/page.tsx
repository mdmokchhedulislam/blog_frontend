"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts/get_posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Read the latest posts, insights, and tutorials from our experts.
        </p>
        <a
          href="/posts"
          className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          View All Posts
        </a>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">Recent Posts</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl font-semibold">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {post.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
