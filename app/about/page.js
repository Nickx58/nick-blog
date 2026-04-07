import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.author.name} — ${SITE_CONFIG.description}`,
};

export default function AboutPage() {
  const { author } = SITE_CONFIG;

  return (
    <div className="about-page">
      <h1>About Me</h1>
      <p>
        Hi! I&apos;m <strong>{author.name}</strong>. {author.bio}
      </p>
      <p>
        This blog is where I share my thoughts on technology, programming, and
        the craft of building software. I write about things I learn, tools I
        use, and ideas that excite me.
      </p>
      <p>
        All posts are written in Markdown and the source code for this blog is
        open source. Feel free to explore, fork, and remix.
      </p>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
        Get in Touch
      </h2>
      <p>
        You can find me on{" "}
        {author.social.github && (
          <>
            <a href={author.social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ,{" "}
          </>
        )}
        {author.social.twitter && (
          <>
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a>
            ,{" "}
          </>
        )}
        {author.social.linkedin && (
          <>
            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            ,{" "}
          </>
        )}
        or reach me via{" "}
        <a href={`mailto:${author.email}`}>email</a>.
      </p>
    </div>
  );
}
