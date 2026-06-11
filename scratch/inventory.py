import os
import glob
import re
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_sitemap_urls():
    sitemap_url = 'https://gotoflow.io/sitemap.xml'
    urls = set()
    try:
        req = urllib.request.Request(sitemap_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, context=ctx, timeout=10)
        content = response.read()
        root = ET.fromstring(content)
        # Handle namespaces if any (e.g., {http://www.sitemaps.org/schemas/sitemap/0.9}url)
        for loc in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
            if loc.text:
                urls.add(loc.text.strip())
        for loc in root.findall('.//loc'):
            if loc.text:
                urls.add(loc.text.strip())
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
    return urls

def ping_url(url):
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, context=ctx, timeout=5)
        return response.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return str(e)

def parse_frontmatter(content):
    match = re.match(r'---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return {}
    
    fm_text = match.group(1)
    data = {}
    
    # Simple extraction for specific keys
    keys = ['title', 'slug', 'language', 'published', 'noindex', 'primaryKeyword', 'canonical', 'createdAt', 'updatedAt', 'lastReviewed']
    for key in keys:
        m = re.search(fr'^{key}:\s*(.+)$', fm_text, re.MULTILINE)
        if m:
            val = m.group(1).strip()
            # Remove quotes
            if val.startswith('"') and val.endswith('"'): val = val[1:-1]
            if val.startswith("'") and val.endswith("'"): val = val[1:-1]
            data[key] = val
    
    data['has_quickAnswer'] = 'yes' if re.search(r'^quickAnswer:', fm_text, re.MULTILINE) else 'no'
    data['has_explore'] = 'yes' if re.search(r'^explore:', fm_text, re.MULTILINE) else 'no'
    data['has_finalCta'] = 'yes' if re.search(r'^finalCta:', fm_text, re.MULTILINE) else 'no'

    # Check secondary CTA
    m_sec_href = re.search(r'^\s*secondaryHref:\s*"?([^"\n]+)"?', fm_text, re.MULTILINE)
    m_sec_text = re.search(r'^\s*secondaryText:\s*"?([^"\n]+)"?', fm_text, re.MULTILINE)
    if not m_sec_href:
        data['has_useful_secondaryCta'] = 'no'
    else:
        href = m_sec_href.group(1).strip()
        text = m_sec_text.group(1).strip() if m_sec_text else ""
        if href.startswith('#') or 'productRoute' in href or 'placeholder' in href:
            data['has_useful_secondaryCta'] = 'no'
        elif not (text.endswith('→') or text.endswith('->')):
            data['has_useful_secondaryCta'] = 'no (missing arrow)'
        else:
            data['has_useful_secondaryCta'] = 'yes'
    
    # Count FAQ items (starts with "- question:") inside faq: block
    faq_match = re.search(r'^faq:\s*(.*?)(?=\n[a-z]|\Z)', fm_text, re.MULTILINE | re.DOTALL)
    if faq_match:
        data['faq_count'] = len(re.findall(r'-\s+question:', faq_match.group(1)))
    else:
        data['faq_count'] = 0
        
    return data

def get_git_history(filepath):
    # Returns last commit date and message to infer batch
    cmd = f'git log -1 --format="%H|%ad|%s" --date=iso "{filepath}"'
    try:
        output = os.popen(cmd).read().strip()
        if output:
            parts = output.split('|', 2)
            if len(parts) == 3:
                return {'hash': parts[0], 'date': parts[1], 'message': parts[2]}
    except:
        pass
    return None

def main():
    sitemap_urls = fetch_sitemap_urls()
    articles_dir = '/Users/andreycerenok/Documents/Gotoflow/src/content/blog/articles'
    md_files = glob.glob(os.path.join(articles_dir, '*.md'))
    
    results = []
    
    for filepath in md_files:
        filename = os.path.basename(filepath)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        fm = parse_frontmatter(content)
        
        slug = fm.get('slug', '')
        language = fm.get('language', 'en')
        
        # Build URL
        if language == 'ru':
            url_path = f"/ru/blog/{slug}"
        else:
            url_path = f"/blog/{slug}"
            
        full_url = f"https://gotoflow.io{url_path}"
        
        # In sitemap?
        in_sitemap = 'yes' if full_url in sitemap_urls or full_url + '/' in sitemap_urls else 'no'
        
        # Ping
        status = ping_url(full_url)
        
        # Git history
        git_info = get_git_history(filepath)
        batch = 'unknown'
        if git_info:
            msg = git_info['message'].lower()
            if 'wave a' in msg or '54c526b' in git_info['hash']:
                # The latest commits were for Wave A, B, C
                pass # We will do a mapping below based on the lists
                
        results.append({
            'filepath': filepath,
            'filename': filename,
            'fm': fm,
            'full_url': full_url,
            'language': language,
            'in_sitemap': in_sitemap,
            'status_code': status,
            'git_info': git_info
        })
        
    # Map batch info
    wave_a = ['text-to-carousel-ai', 'tekst-v-karusel-neyroset', 'youtube-to-linkedin-carousel-ai', 'kak-peredelat-youtube-v-karusel-linkedin', 'b2b-case-study-linkedin-carousel', 'b2b-keysy-v-linkedin-karusel', 'huki-dlya-karuseli-instagram']
    wave_b = ['best-carousel-cta-examples', 'linkedin-content-strategy-for-founders', 'how-to-make-an-instagram-carousel-with-ai', 'ai-instagram-carousel-generator', 'best-linkedin-carousel-examples', 'primery-karuseley-linkedin', 'linkedin-carousel-hooks']
    wave_c = ['luchshie-ai-generatory-karuselej', 'content-calendar-to-carousel', 'instagram-carousel-hooks', 'karusel-dlya-instagram', 'how-to-post-a-carousel-on-linkedin', 'ai-instagram-post-generator']
    created = ['b2b-case-study-linkedin-carousel', 'huki-dlya-karuseli-instagram', 'best-carousel-cta-examples', 'linkedin-content-strategy-for-founders']
    
    for r in results:
        slug = r['fm'].get('slug', '')
        if slug in wave_a:
            r['batch'] = 'Batch 20 Wave A'
        elif slug in wave_b:
            r['batch'] = 'Batch 20 Wave B'
        elif slug in wave_c:
            r['batch'] = 'Batch 20 Wave C'
        else:
            lang = r['language']
            r['batch'] = f'earlier {lang.upper()} batch'
            
        r['action'] = 'create' if slug in created else 'update' if 'Batch 20' in r['batch'] else 'none'

    with open('/tmp/gtf_inventory.json', 'w', encoding='utf-8') as f:
        json.dump({'results': results, 'sitemap_count': len(sitemap_urls)}, f, ensure_ascii=False, indent=2)
        
    print("DONE")

if __name__ == '__main__':
    main()
