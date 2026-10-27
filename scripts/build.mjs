import {mkdir,readFile,writeFile,cp,rm} from 'node:fs/promises';
import {pages,render} from '../src.mjs';
const endpoint=process.env.CONTACT_ENDPOINT||'';const origin=process.env.SITE_URL||'';
if(endpoint&&!endpoint.startsWith('https://'))throw Error('CONTACT_ENDPOINT must use HTTPS');
if(origin&&!/^https:\/\/[^/]+\/?$/.test(origin))throw Error('SITE_URL must be an HTTPS origin');
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
for(const [slug,page]of Object.entries(pages)){const dir=slug==='home'?'dist':`dist/${slug}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,render(slug,page,origin));}
await writeFile('dist/config.js',`window.COZYBYTE_CONFIG=${JSON.stringify({contactEndpoint:endpoint})};`);
if(origin){await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(p=>`<url><loc>${origin.replace(/\/$/,'')}/${p==='home'?'':p+'/'}</loc></url>`).join('')}</urlset>`);await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin.replace(/\/$/,'')}/sitemap.xml\n`);}else await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
console.log(`Built ${Object.keys(pages).length} pages. Domain ${origin?'configured':'pending; indexing blocked'}. Contact ${endpoint?'configured':'not configured'}.`);
