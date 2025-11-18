"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    categories: "",
    tags: "",
    status: "draft",
    isFeatured: false,
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("categories", formData.categories);
      data.append("tags", formData.tags);
      data.append("status", formData.status);
      data.append("isFeatured", formData.isFeatured);
      if (featuredImage) data.append("featuredImage", featuredImage);

      const res = await axios.post("/api/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Post created successfully!");
      router.push(`/posts/${res.data.slug}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create New Post
        </h1>

        {error && (
          <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              maxLength={300}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            ></textarea>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Categories (IDs comma-separated)
            </label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status & Featured */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700 font-medium">
                Featured
              </label>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Featured Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold rounded-lg py-3 ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300`}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
