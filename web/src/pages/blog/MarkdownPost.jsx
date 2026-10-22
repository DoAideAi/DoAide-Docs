import { Link, useNavigate, useParams } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import FAQ from "../../components/FAQ";
import { getMarkdownPost } from "./markdownPosts";

const s = {
  page: { maxWidth: 800, margin: "0 auto" },
  backLink: { color: "var(--text-muted)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 24 },
  title: { fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: "var(--text-muted)", fontSize: 13, marginBottom: 32 },
};

export default function MarkdownPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getMarkdownPost(slug);

  if (!post) {
    return (
      <div style={s.page}>
        <h1 style={s.title}>Article not found</h1>
        <Link to="/blog">Browse all guides →</Link>
      </div>
    );
  }

  // Keep in-app links inside the SPA instead of doing a full page load.
  const onClick = (e) => {
    const a = e.target.closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <div style={s.page}>
      <SeoHead
        title={`${post.title} | DoAide Docs`}
        description={post.description}
        slug={`blog/${post.slug}`}
        faqs={post.faq}
        blog={{ headline: post.title, datePublished: post.date }}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>{post.title}</h1>
      <p style={s.meta}>
        Published {new Date(post.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })} · {post.readTime}
      </p>

      <div className="md-post" onClick={onClick} dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.faq.length > 0 && <FAQ items={post.faq} />}
    </div>
  );
}
