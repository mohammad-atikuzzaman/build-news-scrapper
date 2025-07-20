const axios = require("axios");
const cheerio = require("cheerio");

// ===== Scraper 1: Jagonews24 =====
async function scrapeJagonews24() {
  const BASE_URL = "https://www.jagonews24.com";
  try {
    const result = { title: "", link: "", description: "", source: "Jagonews24" };

    const { data: homepage } = await axios.get(BASE_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(homepage);
    const homeTopNewsBox = $(".home-top-news-box").first();
    const firstHeadline = homeTopNewsBox.find("h2").first();
    result.title = firstHeadline.text().trim();
    result.link = firstHeadline.closest("a").attr("href");

    if (!result.title || !result.link) throw new Error("Missing title/link");

    const { data: articlePage } = await axios.get(result.link);
    const $$ = cheerio.load(articlePage);

    const paragraphs = $$(".content-details p");
    const description = [];
    paragraphs.each((_, el) => {
      const text = $$(el).text().trim();
      if (text) description.push(text);
    });

    result.description = description.join("\n\n");
    return result;
  } catch (err) {
    return null; // Silent fail (no console.log)
  }
}

// ===== Scraper 2: Jugantor =====
async function scrapeJugantor() {
  const BASE_URL = "https://www.jugantor.com";
  try {
    const result = { title: "", link: "", description: "", source: "Jugantor" };

    const { data: homepage } = await axios.get(BASE_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(homepage);
    const leadSection = $(".desktopSectionLead").first();
    result.title = leadSection.find("h1 strong").text().trim();
    const relativeLink = leadSection.find("a").attr("href");
    result.link = relativeLink.startsWith("http") ? relativeLink : BASE_URL + relativeLink;

    if (!result.title || !result.link) throw new Error("Missing title/link");

    const { data: articlePage } = await axios.get(result.link);
    const $$ = cheerio.load(articlePage);

    const paragraphs = $$(".desktopDetailBody p");
    const description = [];
    paragraphs.each((_, el) => {
      const text = $$(el).text().trim();
      if (text) description.push(text);
    });

    result.description = description.join("\n\n");
    return result;
  } catch (err) {
    return null; // Silent fail (no console.log)
  }
}

// ===== Combined Scraper (Main Function) =====
async function scrapeAllNews() {
  try {
    const [jagonewsData, jugantorData] = await Promise.all([
      scrapeJagonews24(),
      scrapeJugantor(),
    ]);

    const combinedResults = [jagonewsData, jugantorData].filter(Boolean); // Remove nulls

    return {
      success: combinedResults.length > 0,
      news: combinedResults,
    };
  } catch (err) {
    return { success: false, news: [] }; // Silent fail
  }
}

// ==== Usage Example ====
(async () => {
  const combinedResponse = await scrapeAllNews();
  console.log(combinedResponse); // Clean structured output
})();