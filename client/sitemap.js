const fetch = require('node-fetch');
const fs = require('fs')

const BASE_URL = 'https://urbexctpm.fr/'

const sitemap = async () => {
  //Static urls
  let content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${BASE_URL}gallerie</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}carte</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}connexion</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}inscription</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}newsletter</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`

  const generateDynamicPaths = (basePath, url, field, priority=0.8, freq='weekly') => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(url)
      
        const items = await data.json()

        //Fill the sitemap
        for(const item of items.data){
          content += `<url>
  <loc>${basePath}${item[field]}</loc>
  <changefreq>${freq}</changefreq>
  <priority>${priority}</priority>
</url>
`
        }

        resolve()
      }catch(e){
        reject()
      }
    })
  }
  
  try {
    await generateDynamicPaths(`${BASE_URL}gallerie/`, `${BASE_URL}api/images`, 'id')
    await generateDynamicPaths(`${BASE_URL}lieu/`, `${BASE_URL}api/locations`, 'id')
  }catch(e){}
  
  content += `</urlset>`

  fs.writeFile('./public/sitemap.xml', content, (err) => {
    if(err) return console.log(`Une erreur est survenue lors de la génération du sitemap: ${err}`)
  })
}

export default sitemap
