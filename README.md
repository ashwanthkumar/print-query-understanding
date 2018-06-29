# Converting queryunderstanding.com Posts to PDF

Sitemap is available at https://queryunderstanding.com/sitemap/sitemap.xml. We convert this XML -> JSON via http://countwordsfree.com/xmlviewer. 

```
$ jq -r .urlset.url[].loc sitemap.json | sort | grep -v "/tagged/" > posts.txt
```


