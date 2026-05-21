import feedparser

feeds = [
    'https://www.nomadicmatt.com/feed/',
    'https://indietraveller.co/feed/',
    'https://www.ytravelblog.com/feed/',
    'https://www.adventurouskate.com/feed/',
    'https://blog.doc.govt.nz/feed/',
]

print("Searching for NZ-related content...\n")

for url in feeds:
    f = feedparser.parse(url)
    title = f.feed.get('title', url)
    nz_entries = [e for e in f.entries if (
        'new zealand' in (e.title + e.get('summary','')).lower() or
        'queenstown' in (e.title + e.get('summary','')).lower() or
        'auckland' in (e.title + e.get('summary','')).lower() or
        'rotorua' in (e.title + e.get('summary','')).lower()
    )]

    print(f"=== {title} === ({len(nz_entries)} NZ entries out of {len(f.entries)} total)")
    for e in nz_entries[:5]:
        print(f"  Title: {e.title[:120]}")
        print(f"  Link: {e.get('link','')}")
        print(f"  Date: {e.get('published','')[:25]}")
        print()
