import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-name">DoAide <span className="brand-separator">|</span> <span className="brand-product">Docs</span></span>
      </Link>
      <nav className="header-nav">
        <Link to="/">All Documents</Link>
        <a href="https://doaide.com" target="_blank" rel="noopener noreferrer">DoAide Home</a>
        <a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer">GST Tools</a>
      </nav>
    </header>
  );
}
