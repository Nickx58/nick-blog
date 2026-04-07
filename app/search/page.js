"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setPosts(allPosts);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    );
    setPosts(filtered);
  }, [query, allPosts]);

  return (
    <div className="search-page">
      <h1>Search</h1>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts by title, description, or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          id="search-input"
        />
      </div>

      {!loading && query.trim() && (
        <p className="search-results-count">
          {posts.length} result{posts.length !== 1 ? "s" : ""} found
        </p>
      )}

      {loading ? (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem 0" }}>
          Loading...
        </p>
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : query.trim() ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <p>No posts found matching &ldquo;{query}&rdquo;</p>
        </div>
      ) : null}
    </div>
  );
}
