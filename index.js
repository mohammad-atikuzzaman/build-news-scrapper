// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

// _____________________________________
// get facebook trending topic
// ________________________________________

// async function getFacebookTrends() {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   // Set a realistic user-agent
//   await page.setUserAgent(
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//   );

//   // Visit a trending Facebook page (e.g., "BBC Bangla")
//   await page.goto("https://www.facebook.com/BBCBengaliService", {
//     waitUntil: "networkidle2",
//     timeout: 60000,
//   });

//   // Wait for posts to load
//   await page.waitForSelector('[role="article"]', { timeout: 30000 });

//   // Extract trending posts (likes, shares, comments)
//   const trends = await page.evaluate(() => {
//     const posts = Array.from(
//       document.querySelectorAll('[role="article"]')
//     ).slice(0, 10);
//     return posts.map((post) => {
//       return {
//         text: post
//           .querySelector('[data-ad-preview="message"]')
//           ?.innerText.trim(),
//         likes: post
//           .querySelector('[aria-label*="Like"]')
//           ?.getAttribute("aria-label"),
//         shares: post
//           .querySelector('[aria-label*="Share"]')
//           ?.getAttribute("aria-label"),
//         comments: post
//           .querySelector('[aria-label*="Comment"]')
//           ?.getAttribute("aria-label"),
//       };
//     });
//   });

//   console.log("Facebook Trending Posts:", trends);
//   await browser.close();
//   return trends;
// }

// getFacebookTrends();

// get github trending repo

// const axios = require("axios");

// async function getGithubTrendingRepos() {
//   const response = await axios.get(
//     "https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc"
//   );

//   const trendingRepos = response.data.items.slice(0, 5).map((repo) => ({
//     name: repo.name,
//     stars: repo.stargazers_count,
//     url: repo.html_url,
//     description: repo.description,
//   }));

//   console.log("GitHub Trending Repos:", trendingRepos);
//   return trendingRepos;
// }

// getGithubTrendingRepos();

// get trending topic form reddit

// async function getRedditTechTrends() {
//   const response = await axios.get(
//     "https://www.reddit.com/r/programming/top.json?limit=10&t=day"
//   );

//   const trends = response.data.data.children.map((post) => ({
//     title: post.data.title,
//     upvotes: post.data.ups,
//     url: post.data.url,
//   }));

//   console.log("Reddit Tech Trends:", trends);
//   return trends;
// }

// getRedditTechTrends();

// get trending news from hacker news

// const axios = require('axios');

// async function getHackerNewsTrends() {
//   const response = await axios.get(
//     "https://hacker-news.firebaseio.com/v0/topstories.json"
//   );

//   const topStories = await Promise.all(
//     response.data
//       .slice(0, 5)
//       .map((id) =>
//         axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
//       )
//   );

//   const trends = topStories.map((story) => ({
//     title: story.data.title,
//     url: story.data.url,
//     score: story.data.score,
//   }));

//   console.log("Hacker News Top Stories:", trends);
//   return trends;
// }

// getHackerNewsTrends();

// find media about topic

// const axios = require("axios")

// async function getMedia(topic) {
//   try {
//     // const res = await axios.get(
//     //   `https://api.pexels.com/videos/search?query=${encodeURIComponent(
//     //     topic
//     //   )}&per_page=1`,
//     //   {
//     //     headers: {
//     //       Authorization: "0KtG7yTfA7h05BVMkySa4LUEVaeM5vkHURrwyq7MbdgzPxNwrFCZjTfh",
//     //     },
//     //     // headers: {
//     //     //   Authorization: process.env.PEXELS_API_KEY,
//     //     // },
//     //   }
//     // );

//     // if (res.data.videos.length > 0) {
//     //   const videoUrl = res.data.videos[0].video_files[0].link;
//     //   console.log('📹 Video found:', videoUrl);
//     //   return { type: 'video', url: videoUrl };
//     // }

//     // fallback to image
//     const imgRes = await axios.get(
//       `https://api.pexels.com/v1/search?query=${encodeURIComponent(
//         topic
//       )}&per_page=1`,
//       {
//         headers: {
//           Authorization: "0KtG7yTfA7h05BVMkySa4LUEVaeM5vkHURrwyq7MbdgzPxNwrFCZjTfh",
//         },
//         // headers: {
//         //   Authorization: process.env.PEXELS_API_KEY,
//         // },
//       }
//     );

//     const imageUrl = imgRes.data.photos[0]?.src?.original;
//     console.log('🖼️ Image found:', imageUrl);
//     return { type: 'image', url: imageUrl };
//   } catch (err) {
//     throw new Error('❌ Media fetch failed');
//   }
// }

// getMedia("programming")

// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const axios = require('axios');

// // Configuration for each news site
// const newsSites = [
//   {
//     name: 'Prothom Alo',
//     url: 'https://www.prothomalo.com/',
//     selector: '.card-with-image-zoom a.headline',
//     baseUrl: 'https://www.prothomalo.com'
//   },
//   {
//     name: 'Kaler Kantho',
//     url: 'https://www.kalerkantho.com/',
//     selector: '.lead-news-title a',
//     baseUrl: 'https://www.kalerkantho.com'
//   },
//   {
//     name: 'Ittefaq',
//     url: 'https://www.ittefaq.com.bd/',
//     selector: '.lead-news-title a',
//     baseUrl: 'https://www.ittefaq.com.bd'
//   },
//   {
//     name: 'Jugantor',
//     url: 'https://www.jugantor.com/',
//     selector: '.lead-news-title a',
//     baseUrl: 'https://www.jugantor.com'
//   },
//   {
//     name: 'Bangla Tribune',
//     url: 'https://www.banglatribune.com/',
//     selector: '.lead-news-title a',
//     baseUrl: 'https://www.banglatribune.com'
//   },
//   {
//     name: 'Jago News 24',
//     url: 'https://www.jagonews24.com/',
//     selector: '.lead-news-title a',
//     baseUrl: 'https://www.jagonews24.com'
//   }
// ];

// async function scrapeWithPuppeteer(site) {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   // Set user agent to avoid bot detection
//   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

//   try {
//     await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
//     await page.waitForSelector(site.selector, { timeout: 15000 });

//     const content = await page.content();
//     const $ = cheerio.load(content);

//     const headlines = [];
//     $(site.selector).each((i, elem) => {
//       const title = $(elem).text().trim();
//       let link = $(elem).attr('href');

//       // Make relative URLs absolute
//       if (link && !link.startsWith('http')) {
//         link = new URL(link, site.baseUrl).href;
//       }

//       if (title) {
//         headlines.push({ title, link });
//       }
//     });

//     return headlines.slice(0, 5); // Get top 5 headlines
//   } catch (error) {
//     console.error(`Error scraping ${site.name}:`, error.message);
//     return [];
//   } finally {
//     await browser.close();
//   }
// }

// async function scrapeWithAxios(site) {
//   try {
//     const response = await axios.get(site.url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//       },
//       timeout: 10000
//     });

//     const $ = cheerio.load(response.data);
//     const headlines = [];

//     $(site.selector).each((i, elem) => {
//       const title = $(elem).text().trim();
//       let link = $(elem).attr('href');

//       // Make relative URLs absolute
//       if (link && !link.startsWith('http')) {
//         link = new URL(link, site.baseUrl).href;
//       }

//       if (title) {
//         headlines.push({ title, link });
//       }
//     });

//     return headlines.slice(0, 5); // Get top 5 headlines
//   } catch (error) {
//     console.error(`Error scraping ${site.name}:`, error.message);
//     return [];
//   }
// }

// async function scrapeAllNews() {
//   const allResults = {};

//   // Scrape each site (using Puppeteer for JS-heavy sites)
//   for (const site of newsSites) {
//     let headlines;

//     // Use Puppeteer for sites that need JavaScript rendering
//     if (site.name === 'Prothom Alo' || site.name === 'Jago News 24') {
//       headlines = await scrapeWithPuppeteer(site);
//     } else {
//       headlines = await scrapeWithAxios(site);
//     }

//     allResults[site.name] = headlines;
//   }

//   return allResults;
// }

// // Run the scraper
// scrapeAllNews()
//   .then(results => {
//     console.log('Trending News from Bangladesh:');
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => console.error('Scraping failed:', err));

// scraper for prothom alo

// const axios = require('axios');
// const cheerio = require('cheerio');

// const BASE_URL = 'https://www.prothomalo.com';

// async function scrapeFirstNews() {
//   try {
//     const response = await axios.get(BASE_URL, {
//       headers: { 'User-Agent': 'Mozilla/5.0' },
//     });

//     const $ = cheerio.load(response.data);

//     // ✅ h1 এর class: headline-title এবং a এর class: title-link
//     const titleElement = $('h1.headline-title a.title-link').first();

//     const title = titleElement.text().trim();
//     const link = titleElement.attr('href');

//     if (!title || !link) throw new Error("Couldn't find news title or link!");

//     console.log('📰 Title:', title);
//     console.log('🔗 Link:', link);
//   } catch (err) {
//     console.error('❌ Error:', err.message);
//   }
// }

// scrapeFirstNews();

// __________________________________________________________________________________________________

// scraper for kalerkontho

// const axios = require("axios");
// const cheerio = require("cheerio");

// const BASE_URL = "https://www.kalerkantho.com";

// async function scrapeFirstNews() {
//   try {
//     // 1. Fetch homepage and get the first news link
//     const { data: homepage } = await axios.get(BASE_URL);
//     const $ = cheerio.load(homepage);

//     const firstNews = $(".leadViewArea a").first();
//     const title = firstNews.find("h1").text().trim();
//     const link = new URL(firstNews.attr("href"), BASE_URL).href;

//     if (!title || !link) throw new Error("Title/Link not found!");

//     console.log("📌 Title:", title);
//     console.log("🔗 Link:", link);

//     const { data: articlePage } = await axios.get(link, {
//       headers: { "User-Agent": "Mozilla/5.0" },
//     });

//     const $$ = cheerio.load(articlePage);

//     const paragraphs = $$(".newsArticle article");
//     console.log(paragraphs);

    return { title, link };
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Run
scrapeFirstNews();

//_____________________________________________________________________________

// scraper for jugantor

// const axios = require("axios");
// const cheerio = require("cheerio");

// const BASE_URL = "https://www.jugantor.com";

// async function scrapeFirstNewsWithDetails() {
//   try {
//     // Step 1: Homepage থেকে title, link
//     const { data: homepage } = await axios.get(BASE_URL, {
//       headers: { "User-Agent": "Mozilla/5.0" },
//     });

//     const $ = cheerio.load(homepage);

//     const leadSection = $(".desktopSectionLead").first();

//     const title = leadSection.find("h1 strong").text().trim();
//     const relativeLink = leadSection.find("a").attr("href");
//     const fullLink = relativeLink.startsWith("http")
//       ? relativeLink
//       : BASE_URL + relativeLink;

//     if (!title || !fullLink) {
//       throw new Error("Couldn't find news title or link!");
//     }

//     console.log("📰 Title:", title);
//     console.log("🔗 Link:", fullLink);

//     // Step 2: News page থেকে full description
//     const { data: articlePage } = await axios.get(fullLink, {
//       headers: { "User-Agent": "Mozilla/5.0" },
//     });

//     const $$ = cheerio.load(articlePage);

//     // Jugantor news content is usually inside '.news-content p'
//     const paragraphs = $$(".desktopDetailBody p");
//     const description = [];

//     paragraphs.each((_, el) => {
//       const text = $$(el).text().trim();
//       if (text) description.push(text);
//     });

//     const fullDescription = description.join("\n\n");

//     console.log("\n📝 Description:\n", fullDescription);
//   } catch (err) {
//     console.error("❌ Error:", err.message);
//   }
// }

// scrapeFirstNewsWithDetails();

// get news with details ( Jagonew24)

// const axios = require('axios');
// const cheerio = require('cheerio');

// const BASE_URL = 'https://www.jagonews24.com';

// async function scrapeFirstNewsWithDetails() {
//   try {
//     // STEP 1: Get homepage content
//     const { data: homepage } = await axios.get(BASE_URL, {
//       headers: { 'User-Agent': 'Mozilla/5.0' },
//     });

//     const $ = cheerio.load(homepage);

//     // Find the first headline inside .home-top-news-box
//     const homeTopNewsBox = $('.home-top-news-box').first();
//     const firstHeadline = homeTopNewsBox.find('h2').first();
//     const title = firstHeadline.text().trim();
//     const relativeLink = firstHeadline.closest('a').attr('href');

//     if (!title || !relativeLink) {
//       throw new Error("Couldn't find news title or link!");
//     }

//     console.log('📰 Title:', title);
//     console.log('🔗 Link:', relativeLink);

//     // STEP 2: Visit the news link to get full description
//     const { data: articlePage } = await axios.get(relativeLink, {
//       headers: { 'User-Agent': 'Mozilla/5.0' },
//     });

//     const $$ = cheerio.load(articlePage);

//     // Grab all paragraphs inside the news content section
//     const paragraphs = $$('.content-details p');
//     // return console.log(paragraphs);
//     const description = [];

//     paragraphs.each((_, el) => {
//       const text = $$(el).text().trim();
//       if (text) description.push(text);
//     });

//     const fullDescription = description.join('\n\n');

//     console.log('\n📝 Description:\n', fullDescription);
//   } catch (err) {
//     console.error('❌ Error:', err.message);
//   }
// }

// scrapeFirstNewsWithDetails();
