# CurioVerse

Small questions. Bigger worlds. A static science site: plain HTML, CSS and JavaScript. No build step, no backend, no cost.

## Files
- index.html, articles.html, article.html, about.html: the pages
- css/style.css: all styling (colors are variables at the top)
- js/data.js: ALL articles, categories and animation captions. Edit this to add content.
- js/app.js: rendering, search, filters, dark mode
- favicon.svg, robots.txt, sitemap.xml: SEO basics

## Add an article (works in the GitHub phone editor)
1. Open js/data.js, tap the pencil (edit).
2. Copy one article block inside window.ARTICLES, paste it after a comma, change slug, title, cat, date, summary, body and refs.
3. cat must be one of: space, physics, biology, tech, mind, random.
4. Use ['est',...] for established knowledge, ['hyp',...] for hypotheses, ['spec',...] for speculation.
5. Tap Commit changes. Cloudflare redeploys automatically in about a minute.

## Publish from an Android phone
1. Unzip: in the Files app by Google, tap curioverse.zip, then Extract.
2. GitHub: sign in at github.com in Chrome, tap + then New repository, name it curioverse, set Public, create.
3. Upload: in the repo tap Add file, then Upload files, and pick the extracted files. If your phone will not upload folders, upload the top-level files first, then use Add file, Create new file and type css/style.css as the name (the slash creates the folder), paste the contents, commit. Repeat for js/data.js, js/app.js.
4. Cloudflare: sign up free at dash.cloudflare.com, open Workers & Pages, Create, Pages, Connect to Git, choose curioverse.
5. Settings: Framework preset None, build command empty, output directory / (or blank). Save and Deploy.
6. Your site goes live at https://curioverse.pages.dev (the name may differ). Cloudflare also makes a preview link for every change.
7. Replace YOUR-SITE.pages.dev in robots.txt and sitemap.xml with your real address.
(Cloudflare's menus change from time to time; follow the same ideas if labels differ.)

## Phone-first launch checklist
1. Keep the first version static: it uses plain HTML/CSS/JavaScript and needs no build command.
2. Before publishing, replace the placeholder contact line in `about.html` with a contact email or remove that section until you have one.
3. After Cloudflare gives you the actual `*.pages.dev` address, replace `YOUR-SITE.pages.dev` in both `robots.txt` and `sitemap.xml`. Do not submit the placeholder sitemap to search engines.
4. Check every reference link and factual claim before publishing. The articles are starter drafts, not a substitute for editorial fact-checking.
5. The three current animation cards are CSS/SVG schematics, not generated AI videos. You can later embed your own short AI videos, labelled as illustrative and not real footage.
6. Ads are not enabled. Build useful original content and review the ad provider's eligibility, privacy, consent, and age/account requirements before applying. Never click your own ads or ask people to click them.

## Preview before publishing
Easiest: the Cloudflare preview link after each commit. Alternative: install Termux, run `python -m http.server 8000` inside the folder, open http://localhost:8000 in Chrome.

## Ads (not loaded yet)
Grey "Advertisement placeholder" boxes only. To add ads later, paste your provider's code at the AD PLACEHOLDER comment in js/app.js and review the provider's privacy and consent rules.

## Editorial rules
Cite credible sources, label established vs hypothesis vs speculation, never present illustrations as real footage. Check every reference link before publishing; the sample links were written from memory of well-known sources and should be verified.
