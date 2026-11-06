from html.parser import HTMLParser
import subprocess,json,re,pathlib
import argparse
parser=argparse.ArgumentParser(description='Verify rendered SEO parity, excluding executable scripts and built asset URLs')
parser.add_argument('--base', required=True)
args=parser.parse_args()
root=pathlib.Path(__file__).resolve().parent.parent
class Page(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.items=[];self.script=None;self.raw=''
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='script':self.script=a.get('type','');self.raw='';return
  attrs=[(k,'ASSET' if k in ('href','src') and str(v).startswith('/assets/') else v)for k,v in attrs]
  self.items.append(('start',tag,sorted(attrs)))
 def handle_endtag(self,tag):
  if tag=='script':
   if self.script=='application/ld+json':self.items.append(('jsonld',json.loads(self.raw)))
   self.script=None;return
  self.items.append(('end',tag))
 def handle_data(self,data):
  if self.script is not None:self.raw+=data;return
  data=re.sub(r'\s+',' ',data).strip()
  if data:self.items.append(('text',data))
paths=subprocess.check_output(['git','ls-tree','-r','--name-only',args.base,'dist'],cwd=root,text=True).splitlines()
rows=[]
for path in paths:
 if not path.endswith('.html'):continue
 old=subprocess.check_output(['git','show',args.base+':'+path],cwd=root,text=True);p=root/path
 if not p.exists():rows.append({'path':path,'error':'missing'});continue
 a=Page();a.feed(old);b=Page();b.feed(p.read_text())
 if a.items!=b.items:
  import itertools
  diffs=[{'index':i,'old':x,'new':y}for i,(x,y)in enumerate(itertools.zip_longest(a.items,b.items))if x!=y]
  rows.append({'path':path,'differences':diffs[:3],'count':len(diffs)})
result={'html_checked':sum(p.endswith('.html')for p in paths),'semantic_differences':rows}
print(json.dumps(result,ensure_ascii=False)[:6000]);raise SystemExit(bool(rows))
