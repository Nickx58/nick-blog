import { getPostsByYear } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "All Posts",
  description: "Archive of all blog posts. Browse by year.",
};

export default function PostsPage() {
  const groupedPosts = getPostsByYear();

  return (
    <div>
      <h1 className="archive-header">All Posts</h1>

      {groupedPosts.length > 0 ? (
        groupedPosts.map(({ year, posts, count }) => (
          <section key={year} className="year-group">
            <h2 className="year-heading">
              {year}
              <span className="year-count">{count}</span>
            </h2>
            <hr className="year-divider" />
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </section>
        ))
      ) : (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "3rem 0" }}>
          No posts yet.
        </p>
      )}
    </div>
  );
}
