import Link from "next/link";

export default function PostCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="post-card">
      <h3 className="post-card-title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="post-card-meta">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span>{formattedDate}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>
      {post.description && (
        <p className="post-card-excerpt">{post.description}</p>
      )}
    </article>
  );
}
