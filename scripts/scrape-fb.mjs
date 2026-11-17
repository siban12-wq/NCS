async function scrape() {
  const url = 'https://www.facebook.com/nistNCS/';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);

    // Extract title, meta description, og:description, etc.
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) console.log('Title:', titleMatch[1]);

    const descMatches = [...html.matchAll(/<meta\s+(?:property|name)=["']([^"']+)["']\s+content=["']([^"']+)["']/gi)];
    descMatches.forEach(m => {
      if (m[1].includes('desc') || m[1].includes('title') || m[1].includes('about') || m[1].includes('image')) {
        console.log(`${m[1]}: ${m[2]}`);
      }
    });

    // Check for JSON-LD or script content
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    jsonLdMatches.forEach((m, idx) => {
      console.log(`JSON-LD ${idx}:`, m[1].slice(0, 500));
    });

  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

scrape();
