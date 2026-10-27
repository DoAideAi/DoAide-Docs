import xml.etree.ElementTree as ET

from app.routers.sitemap import BLOG_POSTS, DOCUMENTS


def test_sitemap_returns_xml(client):
    r = client.get("/sitemap.xml")
    assert r.status_code == 200
    assert "application/xml" in r.headers["content-type"]


def test_sitemap_valid_xml(client):
    r = client.get("/sitemap.xml")
    root = ET.fromstring(r.text)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("s:url", ns)
    # homepage + documents + blog index + blog posts
    assert len(urls) == 2 + len(DOCUMENTS) + len(BLOG_POSTS)


def test_sitemap_contains_homepage(client):
    r = client.get("/sitemap.xml")
    assert "https://docs.doaide.com/" in r.text


def test_sitemap_contains_all_documents(client):
    r = client.get("/sitemap.xml")
    for slug in [
        "rent-receipt-generator",
        "rental-agreement-generator",
        "salary-slip-generator",
        "experience-letter-generator",
        "relieving-letter-generator",
        "offer-letter-generator",
        "noc-letter-generator",
        "appointment-letter-generator",
        "invoice-generator",
        "bonafide-certificate-generator",
        "power-of-attorney-generator",
        "leave-application-generator",
        "resignation-letter-generator",
        "authorization-letter-generator",
    ]:
        assert f"https://docs.doaide.com/{slug}" in r.text


def test_robots_txt(client):
    r = client.get("/robots.txt")
    assert r.status_code == 200
    assert "text/plain" in r.headers["content-type"]
    assert "Sitemap: https://docs.doaide.com/sitemap.xml" in r.text
    assert "Allow: /" in r.text


def test_sitemap_matches_web_prerender_list(client):
    # web/public/sitemap.xml decides which pages get prerendered; the API serves
    # /sitemap.xml. A page added to one and not the other is either unlisted or
    # listed without its own HTML.
    from pathlib import Path

    web = Path(__file__).resolve().parents[2] / "web" / "public" / "sitemap.xml"
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = lambda xml: {el.text for el in ET.fromstring(xml).findall("s:url/s:loc", ns)}
    assert locs(client.get("/sitemap.xml").text) == locs(web.read_text())
