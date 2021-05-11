const fetch = require("node-fetch");
const fs = require("fs");

const BASE_URL = "https://urbexctpm.fr/";

const generateDynamicPaths = async (
  basePath,
  url,
  field,
  priority = 0.8,
  freq = "weekly"
) => {
  let content = "";

  const items = await fetch(url)
    .then((res) => res.json())
    .catch();

  //Fill the sitemap
  for (const item of items.data) {
    content += `<url>
  <loc>${basePath}${item[field]}</loc>
  <changefreq>${freq}</changefreq>
  <priority>${priority}</priority>
</url>
`;
  }

  return content;
};

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
    <loc>${BASE_URL}galerie</loc>
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
  </url>`;

  try {
    content += await generateDynamicPaths(
      `${BASE_URL}galerie/`,
      `${BASE_URL}api/images?limit=10000000000000000`,
      "id"
    );
    content += await generateDynamicPaths(
      `${BASE_URL}lieu/`,
      `${BASE_URL}api/locations?limit=10000000000000000`,
      "id"
    );
  } catch (e) {}

  content += `</urlset>`;

  fs.writeFile("./public/sitemap.xml", content, (err) => {
    if (err)
      return console.log(
        `Une erreur est survenue lors de la génération du sitemap: ${err}`
      );
  });
};

sitemap();
