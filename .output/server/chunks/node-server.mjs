globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, appendHeader, getQuery, getCookie, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase, pascalCase, kebabCase, camelCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash, isRelative } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import overlay from 'unstorage/drivers/overlay';
import memory$1 from 'unstorage/drivers/memory';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, join } from 'pathe';
import { unified } from 'unified';
import { toString } from 'mdast-util-to-string';
import { preprocess } from 'micromark/lib/preprocess.js';
import { postprocess } from 'micromark/lib/postprocess.js';
import { stringifyPosition } from 'unist-util-stringify-position';
import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { push, splice } from 'micromark-util-chunked';
import { resolveAll } from 'micromark-util-resolve-all';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { detab } from 'detab';
import { u } from 'unist-builder';
import { encode } from 'mdurl';
import slugify from 'slugify';
import { position } from 'unist-util-position';
import htmlTags from 'html-tags';
import { visit } from 'unist-util-visit';
import { BUNDLED_LANGUAGES, BUNDLED_THEMES, getHighlighter } from 'shiki-es';
import consola from 'unenv/runtime/npm/consola';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"plausible":{"hashMode":false,"trackLocalhost":false,"domain":"","apiHost":"https://plausible.io","autoPageviews":true,"autoOutboundTracking":false},"studio":{"apiURL":"https://api.nuxt.studio"},"content":{"locales":[],"integrity":1673718910241,"experimental":{"stripQueryParameters":false,"clientDB":false},"api":{"baseURL":"/api/_content"},"navigation":{"fields":["icon","titleTemplate","aside","layout"]},"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":{"theme":{"dark":"github-dark","default":"github-light"},"preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"]},"wsUrl":"","documentDriven":{"page":true,"navigation":true,"surround":true,"globals":{},"layoutFallbacks":["theme"],"injectPage":true},"anchorLinks":{"depth":4,"exclude":[1]}}},"pinceau":{"studio":true,"outputDir":"D:/Python/Project/TestDocus/.nuxt/pinceau/"},"studio":{},"content":{"cacheVersion":2,"cacheIntegrity":"l08ig8BKLQ","transformers":[],"base":"","api":{"baseURL":"/api/_content"},"watch":{"ws":{"port":{"port":4000,"portRange":[4000,4040]},"hostname":"localhost","showURL":false}},"sources":{},"ignores":["\\.","-"],"locales":[],"highlight":{"theme":{"dark":"github-dark","default":"github-light"},"preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"]},"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"anchorLinks":{"depth":4,"exclude":[1]},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{"delimeter":",","json":true},"navigation":{"fields":["icon","titleTemplate","aside","layout"]},"documentDriven":true,"experimental":{"clientDB":false,"stripQueryParameters":false}},"appConfigSchema":{"properties":{"id":"#appConfig","properties":{"prose":{"title":"Prose configuration from Nuxt Typography","description":"","tags":["@studio-icon material-symbols:short-text-rounded"],"id":"#appConfig/prose","properties":{"copyButton":{"title":"Copy button (used in code blocks)","description":"","tags":["@studio-icon material-symbols:content-copy"],"id":"#appConfig/prose/copyButton","properties":{"iconCopy":{"title":"Icon displayed to copy","description":"","tags":[],"id":"#appConfig/prose/copyButton/iconCopy","default":"ph:copy","type":"string"},"iconCopied":{"title":"Icon displayed when copied","description":"","tags":[],"id":"#appConfig/prose/copyButton/iconCopied","default":"ph:check","type":"string"}},"type":"object","default":{"iconCopy":"ph:copy","iconCopied":"ph:check"}},"headings":{"title":"Default configuration for all headings (h1, h2, h3, h4, h5 and h6)","description":"","tags":["@studio-icon material-symbols:title"],"id":"#appConfig/prose/headings","properties":{"icon":{"title":"Default icon for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/headings/icon","default":"ph:link","type":"string"}},"type":"object","default":{"icon":"ph:link"}},"h1":{"title":"First heading configuration","description":"","tags":["@studio-icon material-symbols:format-h1"],"id":"#appConfig/prose/h1","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h1/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h2":{"title":"Second heading configuration","description":"","tags":["@studio-icon material-symbols:format-h2"],"id":"#appConfig/prose/h2","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h2/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h3":{"title":"Third heading configuration","description":"","tags":["@studio-icon material-symbols:format-h3"],"id":"#appConfig/prose/h3","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h3/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h4":{"title":"Fourth heading configuration","description":"","tags":["@studio-icon material-symbols:format-h4"],"id":"#appConfig/prose/h4","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h4/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h5":{"title":"Fifth heading configuration","description":"","tags":["@studio-icon material-symbols:format-h5"],"id":"#appConfig/prose/h5","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h5/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}},"h6":{"title":"Sixth heading configuration","description":"","tags":["@studio-icon material-symbols:format-h6"],"id":"#appConfig/prose/h6","properties":{"icon":{"title":"Icon displayed for anchor link on hover","description":"","tags":[],"tsType":"string|false","id":"#appConfig/prose/h6/icon","default":"","type":"string"}},"type":"object","default":{"icon":""}}},"type":"object","default":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}}},"docus":{"title":"Docus theme configuration.","description":"","tags":["@studio-icon material-symbols:docs"],"id":"#appConfig/docus","properties":{"title":{"title":"Website title, used as header default title and meta title.","description":"","tags":["@studio-icon material-symbols:title"],"id":"#appConfig/docus/title","default":"Docus","type":"string"},"description":{"title":"Website description, used for meta description.","description":"","tags":["@studio-icon material-symbols:description"],"id":"#appConfig/docus/description","default":"The best place to start your documentation.","type":"string"},"image":{"title":"Cover image.","description":"","tags":["@example '/cover.jpg'","@studio-icon dashicons:cover-image"],"id":"#appConfig/docus/image","default":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","type":"string"},"socials":{"title":"Social links.","description":"Will be used in Social Icons component, in AppHeader and AppFooter.","tags":["@studio-icon material-symbols:share-outline"],"id":"#appConfig/docus/socials","properties":{"twitter":{"title":"Twitter social handle","description":"","tags":["@example 'nuxt_js'","@studio-icon simple-icons:twitter"],"id":"#appConfig/docus/socials/twitter","default":"","type":"string"},"github":{"title":"GitHub org or repository","description":"","tags":["@example 'nuxt/framework'","@studio-icon simple-icons:github"],"id":"#appConfig/docus/socials/github","default":"","type":"string"},"facebook":{"title":"Facebook page url","description":"","tags":["@example https://www.facebook.com/groups/nuxtjs","@studio-icon simple-icons:facebook"],"id":"#appConfig/docus/socials/facebook","default":"","type":"string"},"instagram":{"title":"Instagram page url","description":"","tags":["@example https://www.instagram.com/wearenuxt","@studio-icon simple-icons:instagram"],"id":"#appConfig/docus/socials/instagram","default":"","type":"string"},"youtube":{"title":"Instagram page url","description":"","tags":["@example https://www.youtube.com/@NuxtLabs","@studio-icon simple-icons:youtube"],"id":"#appConfig/docus/socials/youtube","default":"","type":"string"},"medium":{"title":"Medium page url","description":"","tags":["@example https://medium.com/nuxt","@studio-icon simple-icons:medium"],"id":"#appConfig/docus/socials/medium","default":"","type":"string"}},"type":"object","default":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""}},"layout":{"title":"Theme layout configuration.","description":"","tags":["@studio-icon tabler:arrow-autofit-width"],"id":"#appConfig/docus/layout","properties":{"fluid":{"title":"Enables the `fluid` layout mode.","description":"","tags":[],"id":"#appConfig/docus/layout/fluid","default":true,"type":"boolean"}},"type":"object","default":{"fluid":true}},"aside":{"title":"Aside navigation configuration.","description":"","tags":["@studio-icon fluent:document-page-24-regular"],"id":"#appConfig/docus/aside","properties":{"level":{"title":"The level to which the navigation should be scaled.","description":"Use 0 to disable all nesting. Use 1 and more to display nested navigation in header and aside navigation.","tags":[],"id":"#appConfig/docus/aside/level","default":0,"type":"number"},"collapsed":{"title":"Specify if default collapsibles state globally for aside navigation.","description":"","tags":[],"id":"#appConfig/docus/aside/collapsed","default":false,"type":"boolean"},"exclude":{"title":"Paths to be excluded from aside navigation.","description":"","tags":[],"tsType":"string[]","id":"#appConfig/docus/aside/exclude","default":[],"type":"array","items":{"type":"any"}}},"type":"object","default":{"level":0,"collapsed":false,"exclude":[]}},"header":{"title":"Header configuration.","description":"","tags":["@studio-icon fluent:document-header-24-regular"],"id":"#appConfig/docus/header","properties":{"title":{"title":"Title to be displayed in header or as aria-label if logo is defined","description":"Default to docus.title","tags":["@studio-icon material-symbols:title"],"id":"#appConfig/docus/header/title","default":"","type":"string"},"logo":{"title":"Logo configuration.","description":"Boolean to disable or use the `Logo.vue` component.\nString to be used as a name of a component.","tags":["@example 'MyLogo'"],"id":"#appConfig/docus/header/logo","default":false,"type":"boolean"},"showLinkIcon":{"title":"Toggle links icons in the header.","description":"","tags":[],"id":"#appConfig/docus/header/showLinkIcon","default":false,"type":"boolean"},"exclude":{"title":"Paths to be excluded from header links.","description":"","tags":[],"tsType":"string[]","id":"#appConfig/docus/header/exclude","default":[],"type":"array","items":{"type":"any"}}},"type":"object","default":{"title":"","logo":false,"showLinkIcon":false,"exclude":[]}},"footer":{"title":"Footer configuration","description":"","tags":["@studio-icon fluent:document-footer-24-regular"],"id":"#appConfig/docus/footer","properties":{"credits":{"title":"Credits configuration","description":"Object configuring the credits part of footer.","tags":["@studio-icon material-symbols:copyright"],"tsType":"false|object","id":"#appConfig/docus/footer/credits","properties":{"icon":{"title":"Icon to show on credits","description":"","tags":["@formtype Icon"],"id":"#appConfig/docus/footer/credits/icon","default":"IconDocus","type":"string"},"text":{"type":"string","id":"#appConfig/docus/footer/credits/text","default":"Powered by Docus"},"href":{"type":"string","id":"#appConfig/docus/footer/credits/href","default":"https://docus.dev"}},"type":"object","default":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}},"textLinks":{"type":"array","items":{"type":"object","required":["text","href"],"properties":{"href":{"type":"string","description":"URL when clicking the link"},"text":{"type":"string","description":"Text of the link"},"target":{"type":"string","description":"Target attribute of the link"}}},"title":"Text links to be added into center section of the footer.","description":"","tags":["@studio-icon material-symbols:add-link"],"id":"#appConfig/docus/footer/textLinks"},"iconLinks":{"type":"array","items":{"type":"object","required":["icon","href"],"properties":{"icon":{"type":"string","description":"Icon name"},"href":{"type":"string","description":"Link when clicking on the icon"},"label":{"type":"string","description":"Label of the icon"}}},"title":"Icons to be added to Social Icons in footer.","description":"","tags":["@studio-icon material-symbols:add-link"],"id":"#appConfig/docus/footer/iconLinks"}},"type":"object","default":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}}}},"type":"object","default":{"title":"Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":{"fluid":true},"aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[]},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}}}}},"type":"object","default":{"prose":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}},"docus":{"title":"Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":{"fluid":true},"aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[]},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}}}}},"default":{"prose":{"copyButton":{"iconCopy":"ph:copy","iconCopied":"ph:check"},"headings":{"icon":"ph:link"},"h1":{"icon":""},"h2":{"icon":""},"h3":{"icon":""},"h4":{"icon":""},"h5":{"icon":""},"h6":{"icon":""}},"docus":{"title":"Docus","description":"The best place to start your documentation.","image":"https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png","socials":{"twitter":"","github":"","facebook":"","instagram":"","youtube":"","medium":""},"layout":{"fluid":true},"aside":{"level":0,"collapsed":false,"exclude":[]},"header":{"title":"","logo":false,"showLinkIcon":false,"exclude":[]},"footer":{"credits":{"icon":"IconDocus","text":"Powered by Docus","href":"https://docus.dev"}}}}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject$1(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject$1(obj[key])) {
      if (isObject$1(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('./raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"6dd-grpJsE58Jkhva1kC6h2O8mE59BA\"","mtime":"2023-01-14T18:03:50.502Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('./raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"81d-RzDZSWd8sLNDst3rA396hXrW4rg\"","mtime":"2023-01-14T18:03:50.500Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:0.index.md"]: {
    import: () => import('./raw/0.index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"975-QV4Bh3w4iduYyNx5822+oE991Eo\"","mtime":"2023-01-14T18:03:50.509Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.test:1.index.md"]: {
    import: () => import('./raw/1.index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1537-CHS5ipYyUL6ST3z6e2Tz2TWnhGA\"","mtime":"2023-01-14T18:03:50.546Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.test:2.test1 copy.md"]: {
    import: () => import('./raw/2.test1 copy.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"122f-QbOtM4dXP0WmVT9DaflqGaMze4g\"","mtime":"2023-01-14T18:03:50.547Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.test:3.test1 copy 4.md"]: {
    import: () => import('./raw/3.test1 copy 4.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"276-cpmqpnANZojJEkdwixQso3YlBNs\"","mtime":"2023-01-14T18:03:50.548Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.test:4.test1 copy 3.md"]: {
    import: () => import('./raw/4.test1 copy 3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"276-T8l3M5IPWJb+3NNQJsUZEi92aNE\"","mtime":"2023-01-14T18:03:50.546Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.test:test5.md"]: {
    import: () => import('./raw/test5.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"25d-D4P4Uila9gpYsfgVrtoXErEhHrk\"","mtime":"2023-01-14T18:03:50.510Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.index.md"]: {
    import: () => import('./raw/0.index2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9be-Oo5nYL11S7cytRoL52xjwUtg5JI\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:1.guide1.md"]: {
    import: () => import('./raw/1.guide1.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"26d-10OfVOs0IOZb/KSD6et1V33ZEG0\"","mtime":"2023-01-14T18:03:50.509Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:_dir.yml"]: {
    import: () => import('./raw/_dir.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"f5-QOuCPtfkJibb2Ty5hcxeIL0gPK8\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:0.index.md"]: {
    import: () => import('./raw/0.index3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"39c-+u001aOvePyE2azsePAmr28T4Qg\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.test.md"]: {
    import: () => import('./raw/1.test.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1c0-hR+HM+LYz6EPxl4TOKWYj50fzjc\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.test:1.index.md"]: {
    import: () => import('./raw/1.index2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1567-fNC6dgkOdvle3ltSmthMAD4PSwY\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.test:2.test1 copy.md"]: {
    import: () => import('./raw/2.test1 copy2.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1245-jFo5fQodLbqh1gYvF6vNzm4NghA\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.test:3.test1 copy 4.md"]: {
    import: () => import('./raw/3.test1 copy 42.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"28c-6u0DV+B7Dy8h0T8Wjt5wDHT5tAA\"","mtime":"2023-01-14T18:03:50.501Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.test:4.test1 copy 3.md"]: {
    import: () => import('./raw/4.test1 copy 32.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"28c-/bVQ1btBwjksaPMRm4MtSgJuXYA\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:0.test:test5.md"]: {
    import: () => import('./raw/test52.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"273-UklySwVWGvKq9iECTGXzrztlyuw\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:1.learnHTML+CSS.md"]: {
    import: () => import('./raw/1.learnHTML_CSS.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"7ce23-pgBw0D8ccVd9hIM0WIhSkX8Vxm0\"","mtime":"2023-01-14T18:03:50.508Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:10.learnDocker.md"]: {
    import: () => import('./raw/10.learnDocker.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2dd6f-qiA2jxeo2c8VFx3Em0i4zgPPjDw\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:11.learnMySql.md"]: {
    import: () => import('./raw/11.learnMySql.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"80c57-TcHgiMNJxJPpc8itUnhglB/SfEo\"","mtime":"2023-01-14T18:03:50.545Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:12.learnSolr.md"]: {
    import: () => import('./raw/12.learnSolr.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"cd75f-2at0n/n9PDaZ1IA0Xci924J91iU\"","mtime":"2023-01-14T18:03:50.545Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:2.learnJavascript.md"]: {
    import: () => import('./raw/2.learnJavascript.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5a367-YMYNphv1ysvqkSYvaJm7rL2xDfY\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:3.learnAjax.md"]: {
    import: () => import('./raw/3.learnAjax.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"50359-7Cwh+uXGLMTJcJyNv5jARxeI7Ag\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:4.learnGit、开源.md"]: {
    import: () => import('./raw/4.learnGit、开源.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"18b4b-ctvHhpztVPcaORh6rzu212oWDL8\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:6.learnNode.js.md"]: {
    import: () => import('./raw/6.learnNode.js.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"bfaf4-FjqgCL1q53hjFQhiLIG1MubQTiI\"","mtime":"2023-01-14T18:03:50.546Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:7.learnTypescript.md"]: {
    import: () => import('./raw/7.learnTypescript.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9b04e-vcCaZC4M2/ZppmKhkjmjW2HThRE\"","mtime":"2023-01-14T18:03:50.546Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:8.learnVue.md"]: {
    import: () => import('./raw/8.learnVue.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9eb04-bGD5dc61fl1h4yBRRAsoVaVs6is\"","mtime":"2023-01-14T18:03:50.546Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:9.learnVue3_XM.md"]: {
    import: () => import('./raw/9.learnVue3_XM.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"22c21b-OGHTOIzOmGCbxQjXtVgwcYgyD5k\"","mtime":"2023-01-14T18:03:50.547Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:1.program:index.md"]: {
    import: () => import('./raw/index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"33e-6lTNJMTJZLpQJVvxqcsMxHqugY0\"","mtime":"2023-01-14T18:03:50.544Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.Note:2.money:learnStock.md"]: {
    import: () => import('./raw/learnStock.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"ccc7-/34kp2phwkN9SwgrGCgIlFObSbI\"","mtime":"2023-01-14T18:03:50.536Z"}
  }
};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memory$1(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const nitro = (async function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext, { event }) => {
    const pinceauContent = event?.pinceauContent || { theme: "", runtime: "" };
    htmlContext.head.splice(2, 0, `<style id="pinceau-runtime-hydratable">${pinceauContent.runtime}</style>`);
    htmlContext.head.splice(2, 0, `<style id="pinceau-theme">${pinceauContent.theme}</style>`);
  });
});

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _1inmVTsM2e = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  nitro,
_1inmVTsM2e
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"48a5-GbnLW9eyIMQJBStNI0p+L48gCes\"",
    "mtime": "2022-12-11T10:35:46.000Z",
    "size": 18597,
    "path": "../public/android-chrome-192x192.png"
  },
  "/icon.ts": {
    "type": "video/mp2t",
    "etag": "\"c52-odn1qOcBPP5+DQIzq6bLF5HWAxM\"",
    "mtime": "2023-01-14T09:21:11.107Z",
    "size": 3154,
    "path": "../public/icon.ts"
  },
  "/tuzki.jpg": {
    "type": "image/jpeg",
    "etag": "\"3540-f6RMRbF0v6hgQYR1uXqfOQoUlic\"",
    "mtime": "2023-01-11T17:03:35.841Z",
    "size": 13632,
    "path": "../public/tuzki.jpg"
  },
  "/video-cover.jpeg": {
    "type": "image/jpeg",
    "etag": "\"a738-3ayjcENgwZLqhifNqytFzsaY0Oo\"",
    "mtime": "2023-01-13T18:07:35.247Z",
    "size": 42808,
    "path": "../public/video-cover.jpeg"
  },
  "/__studio.json": {
    "type": "application/json",
    "etag": "\"4fd68-2VQJ31oSr2hFdxCRqJGgIx2KB6M\"",
    "mtime": "2023-01-14T18:03:50.129Z",
    "size": 327016,
    "path": "../public/__studio.json"
  },
  "/program/learnMySql.sql": {
    "type": "application/x-sql",
    "etag": "\"2e8f-UE5xdQHcXafS8i+hXv9ojI5HhWA\"",
    "mtime": "2023-01-11T14:05:30.875Z",
    "size": 11919,
    "path": "../public/program/learnMySql.sql"
  },
  "/_nuxt/Alert.4980d57b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bab-mF+gH4zB0841jOd+BXqtlSuazKU\"",
    "mtime": "2023-01-14T17:56:18.949Z",
    "size": 2987,
    "path": "../public/_nuxt/Alert.4980d57b.css"
  },
  "/_nuxt/Alert.c9b20c2e.js": {
    "type": "application/javascript",
    "etag": "\"226-fvtsld7Jxp+WBvlP1TjWBeyhX2U\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 550,
    "path": "../public/_nuxt/Alert.c9b20c2e.js"
  },
  "/_nuxt/AppLayout.70389ff7.js": {
    "type": "application/javascript",
    "etag": "\"5a-dr1wwZXKCwxcxeQTVj+WTW4mILc\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 90,
    "path": "../public/_nuxt/AppLayout.70389ff7.js"
  },
  "/_nuxt/Badge.1b55ae19.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"bcb-o7f3qrli/v5XTED4kXy3vmIM1yk\"",
    "mtime": "2023-01-14T17:56:18.958Z",
    "size": 3019,
    "path": "../public/_nuxt/Badge.1b55ae19.css"
  },
  "/_nuxt/Badge.3ce7f481.js": {
    "type": "application/javascript",
    "etag": "\"1da-pA6P5IdYPvqpRV3kEHlB9qb76vw\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 474,
    "path": "../public/_nuxt/Badge.3ce7f481.js"
  },
  "/_nuxt/BlockHero.22828520.js": {
    "type": "application/javascript",
    "etag": "\"704-lYyanFqUIXx5y3jIo3L0EgxTJcc\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 1796,
    "path": "../public/_nuxt/BlockHero.22828520.js"
  },
  "/_nuxt/BlockHero.3339d24a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"920-oPN3D76jZOcbYBtFVUcEffqlj/I\"",
    "mtime": "2023-01-14T17:56:18.949Z",
    "size": 2336,
    "path": "../public/_nuxt/BlockHero.3339d24a.css"
  },
  "/_nuxt/ButtonLink.17bc37bf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c9-cHdqYGahMil+6NCRuDSi7ijGQQM\"",
    "mtime": "2023-01-14T17:56:18.948Z",
    "size": 457,
    "path": "../public/_nuxt/ButtonLink.17bc37bf.css"
  },
  "/_nuxt/ButtonLink.fd226444.js": {
    "type": "application/javascript",
    "etag": "\"671-pDEE/OWaj6qiD5nJcIvH35qEqOs\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 1649,
    "path": "../public/_nuxt/ButtonLink.fd226444.js"
  },
  "/_nuxt/Callout.09d7a57a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e3a-FzYlSwV0Zb30zMIH1LIoH2sVuBM\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 3642,
    "path": "../public/_nuxt/Callout.09d7a57a.css"
  },
  "/_nuxt/Callout.af1551f5.js": {
    "type": "application/javascript",
    "etag": "\"3cd-FZSJUcvvhluRN1eApRJ/tJD53Fc\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 973,
    "path": "../public/_nuxt/Callout.af1551f5.js"
  },
  "/_nuxt/Card.1ef440f2.js": {
    "type": "application/javascript",
    "etag": "\"363-PlgQg8KLOQOq3C/luks9r6mKCL4\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 867,
    "path": "../public/_nuxt/Card.1ef440f2.js"
  },
  "/_nuxt/Card.cefe153a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a0-M1y0d3dyEa0f2iCSOrtl+n+MIMU\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 928,
    "path": "../public/_nuxt/Card.cefe153a.css"
  },
  "/_nuxt/CardGrid.0224782b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44f-lk7xtm+B3FexKaq2FKueJsD1T0c\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 1103,
    "path": "../public/_nuxt/CardGrid.0224782b.css"
  },
  "/_nuxt/CardGrid.dda59b68.js": {
    "type": "application/javascript",
    "etag": "\"23d-YDYrEPvtGoqMICBUR3gtnjy783k\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 573,
    "path": "../public/_nuxt/CardGrid.dda59b68.js"
  },
  "/_nuxt/client-db.c025f270.js": {
    "type": "application/javascript",
    "etag": "\"4e66-Xb38F1g947o33HH9Kxyxb8/6zm8\"",
    "mtime": "2023-01-14T17:56:18.934Z",
    "size": 20070,
    "path": "../public/_nuxt/client-db.c025f270.js"
  },
  "/_nuxt/CodeBlock.6775ac05.js": {
    "type": "application/javascript",
    "etag": "\"1cd-B9nSAaYZZkt0YuvwwSzCEVDIRk0\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 461,
    "path": "../public/_nuxt/CodeBlock.6775ac05.js"
  },
  "/_nuxt/CodeBlock.e4cadaca.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d-Bx0Xxb29hd822FZyW0gdZyI/vHo\"",
    "mtime": "2023-01-14T17:56:18.952Z",
    "size": 93,
    "path": "../public/_nuxt/CodeBlock.e4cadaca.css"
  },
  "/_nuxt/CodeGroup.142222ce.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ee-HJ4j8gFI5labEJVo3PUla087fBs\"",
    "mtime": "2023-01-14T17:56:18.973Z",
    "size": 494,
    "path": "../public/_nuxt/CodeGroup.142222ce.css"
  },
  "/_nuxt/CodeGroup.8c2b5d6c.js": {
    "type": "application/javascript",
    "etag": "\"be-IJQqMmWULxRpCUWl0yDKUr8fLAw\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 190,
    "path": "../public/_nuxt/CodeGroup.8c2b5d6c.js"
  },
  "/_nuxt/CodeGroup.vue.05025ffe.js": {
    "type": "application/javascript",
    "etag": "\"43f-WnlT6trjfEaQ2unJxzkFPrZhmKw\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 1087,
    "path": "../public/_nuxt/CodeGroup.vue.05025ffe.js"
  },
  "/_nuxt/ComponentPlayground.3f4b16b9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32e-ukL5wbG4J9I7TK3tYMV32Nv4wKM\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 814,
    "path": "../public/_nuxt/ComponentPlayground.3f4b16b9.css"
  },
  "/_nuxt/ComponentPlayground.9fba584f.js": {
    "type": "application/javascript",
    "etag": "\"266-F45p3NuIBw9eEzERYDBeonNfrB4\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 614,
    "path": "../public/_nuxt/ComponentPlayground.9fba584f.js"
  },
  "/_nuxt/ComponentPlayground.vue.fcb3b3c4.js": {
    "type": "application/javascript",
    "etag": "\"454-vDmKBL8WApPPsAMhomyEbW0sufY\"",
    "mtime": "2023-01-14T17:56:18.922Z",
    "size": 1108,
    "path": "../public/_nuxt/ComponentPlayground.vue.fcb3b3c4.js"
  },
  "/_nuxt/ComponentPlaygroundData.2ba66f99.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e8-eRIBDachbuHQgcxmMyQhlHa6tXo\"",
    "mtime": "2023-01-14T17:56:18.957Z",
    "size": 232,
    "path": "../public/_nuxt/ComponentPlaygroundData.2ba66f99.css"
  },
  "/_nuxt/ComponentPlaygroundData.ed82dc46.js": {
    "type": "application/javascript",
    "etag": "\"5c6-NrHDAIfl1iyoHZu3LWR58nT/dFo\"",
    "mtime": "2023-01-14T17:56:18.922Z",
    "size": 1478,
    "path": "../public/_nuxt/ComponentPlaygroundData.ed82dc46.js"
  },
  "/_nuxt/ComponentPlaygroundProps.54f42c7a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"339-BJnAxWNkwK91+x6XqFg1Bh8QVR8\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 825,
    "path": "../public/_nuxt/ComponentPlaygroundProps.54f42c7a.css"
  },
  "/_nuxt/ComponentPlaygroundProps.d862c2c4.js": {
    "type": "application/javascript",
    "etag": "\"58e-nDoiapSVknMsKM4IPsEF1uTizik\"",
    "mtime": "2023-01-14T17:56:18.923Z",
    "size": 1422,
    "path": "../public/_nuxt/ComponentPlaygroundProps.d862c2c4.js"
  },
  "/_nuxt/ComponentPlaygroundSlots.d221163d.js": {
    "type": "application/javascript",
    "etag": "\"a4-u9w0ojr7IVJjklXsVjsN4GtzQ0o\"",
    "mtime": "2023-01-14T17:56:18.923Z",
    "size": 164,
    "path": "../public/_nuxt/ComponentPlaygroundSlots.d221163d.js"
  },
  "/_nuxt/ComponentPlaygroundSlots.vue.bc53b5a1.js": {
    "type": "application/javascript",
    "etag": "\"140-9S/zdLmRheod1Uk3/GeGa/LkRJ8\"",
    "mtime": "2023-01-14T17:56:18.923Z",
    "size": 320,
    "path": "../public/_nuxt/ComponentPlaygroundSlots.vue.bc53b5a1.js"
  },
  "/_nuxt/ComponentPlaygroundTokens.21266112.js": {
    "type": "application/javascript",
    "etag": "\"a6-hj05ogfPypsTEieO1hNm+0v7BxY\"",
    "mtime": "2023-01-14T17:56:18.923Z",
    "size": 166,
    "path": "../public/_nuxt/ComponentPlaygroundTokens.21266112.js"
  },
  "/_nuxt/ComponentPlaygroundTokens.vue.8bfa0c37.js": {
    "type": "application/javascript",
    "etag": "\"118-k/12g8WXdB1zxdJ0WDDL7d5n6nQ\"",
    "mtime": "2023-01-14T17:56:18.923Z",
    "size": 280,
    "path": "../public/_nuxt/ComponentPlaygroundTokens.vue.8bfa0c37.js"
  },
  "/_nuxt/ContentDoc.b5a5d38a.js": {
    "type": "application/javascript",
    "etag": "\"59d-ulunl0sGw6It2Df7k8wjOwgQDr4\"",
    "mtime": "2023-01-14T17:56:18.926Z",
    "size": 1437,
    "path": "../public/_nuxt/ContentDoc.b5a5d38a.js"
  },
  "/_nuxt/ContentList.bb05f4cf.js": {
    "type": "application/javascript",
    "etag": "\"355-XfPrZn/mfAa+2jhAyfTsTXJ+e3Q\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 853,
    "path": "../public/_nuxt/ContentList.bb05f4cf.js"
  },
  "/_nuxt/ContentNavigation.1c597547.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3bb7-ItS3f3ybmZbMP5PtK7kicwkDYL8\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 15287,
    "path": "../public/_nuxt/ContentNavigation.1c597547.css"
  },
  "/_nuxt/ContentNavigation.c15cc690.js": {
    "type": "application/javascript",
    "etag": "\"7e6c-/IeoLj1lT4f0wWXJYwLjIkXT0Fw\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 32364,
    "path": "../public/_nuxt/ContentNavigation.c15cc690.js"
  },
  "/_nuxt/ContentPreviewMode.720120b4.js": {
    "type": "application/javascript",
    "etag": "\"d68-MFU330agEKYnxbPxPSltndvelmA\"",
    "mtime": "2023-01-14T17:56:18.932Z",
    "size": 3432,
    "path": "../public/_nuxt/ContentPreviewMode.720120b4.js"
  },
  "/_nuxt/ContentPreviewMode.7e5d251b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"db3-u6MuhVtHL/njOVz6KmeEd80eEdU\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 3507,
    "path": "../public/_nuxt/ContentPreviewMode.7e5d251b.css"
  },
  "/_nuxt/ContentQuery.bc83fab3.js": {
    "type": "application/javascript",
    "etag": "\"8a1-WJdFf1WQrFYH4j77v3kXxktng4s\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 2209,
    "path": "../public/_nuxt/ContentQuery.bc83fab3.js"
  },
  "/_nuxt/ContentRenderer.6c6336a0.js": {
    "type": "application/javascript",
    "etag": "\"4e9-Ir3+qjF+KshcGbJLWFuRf2440EM\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 1257,
    "path": "../public/_nuxt/ContentRenderer.6c6336a0.js"
  },
  "/_nuxt/ContentRendererMarkdown.a5078cba.js": {
    "type": "application/javascript",
    "etag": "\"55ed-pE4GOGjW7K0bYikuSKCuIi9jDyk\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 21997,
    "path": "../public/_nuxt/ContentRendererMarkdown.a5078cba.js"
  },
  "/_nuxt/ContentSlot.7066d235.js": {
    "type": "application/javascript",
    "etag": "\"3c7-u5I18gGFbrD7Zebngt6vLGHUw5o\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 967,
    "path": "../public/_nuxt/ContentSlot.7066d235.js"
  },
  "/_nuxt/CopyButton.42c8abf1.js": {
    "type": "application/javascript",
    "etag": "\"2d3-jFv8PQ3jnP+8ooBW+Vl4rqPShXI\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 723,
    "path": "../public/_nuxt/CopyButton.42c8abf1.js"
  },
  "/_nuxt/debug.5fdf3a4b.js": {
    "type": "application/javascript",
    "etag": "\"26e-mfuqRYfR4yiFu9FPgjSOGHVq+Bs\"",
    "mtime": "2023-01-14T17:56:18.935Z",
    "size": 622,
    "path": "../public/_nuxt/debug.5fdf3a4b.js"
  },
  "/_nuxt/default.8925b031.js": {
    "type": "application/javascript",
    "etag": "\"341-esQxPCzmo/Ug4tdZ5PC1//SO4as\"",
    "mtime": "2023-01-14T17:56:18.934Z",
    "size": 833,
    "path": "../public/_nuxt/default.8925b031.js"
  },
  "/_nuxt/DocsAside.307f4bb4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"184-5rcX+zi/2SDBI3ALm33anInwqSs\"",
    "mtime": "2023-01-14T17:56:18.958Z",
    "size": 388,
    "path": "../public/_nuxt/DocsAside.307f4bb4.css"
  },
  "/_nuxt/DocsAside.54612a0b.js": {
    "type": "application/javascript",
    "etag": "\"5b4-2mcpIe/y8Y/XFIQtcY3NdAo4upA\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 1460,
    "path": "../public/_nuxt/DocsAside.54612a0b.js"
  },
  "/_nuxt/DocsPageBottom.311ada9c.js": {
    "type": "application/javascript",
    "etag": "\"302-pGlnJ/Eu8/vNkifavCNV/6GYQOs\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 770,
    "path": "../public/_nuxt/DocsPageBottom.311ada9c.js"
  },
  "/_nuxt/DocsPageBottom.f04aebf4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"238-ew84yogMgRLvMmsnEBddFGljUNA\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 568,
    "path": "../public/_nuxt/DocsPageBottom.f04aebf4.css"
  },
  "/_nuxt/DocsPageLayout.1f75111f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1223-kod04oXHp+ArvFMRqmQxvMj/JvQ\"",
    "mtime": "2023-01-14T17:56:18.957Z",
    "size": 4643,
    "path": "../public/_nuxt/DocsPageLayout.1f75111f.css"
  },
  "/_nuxt/DocsPageLayout.6da8372b.js": {
    "type": "application/javascript",
    "etag": "\"c3b-Nl6ymSAoAGjlyXkIW1n9qWRfixc\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 3131,
    "path": "../public/_nuxt/DocsPageLayout.6da8372b.js"
  },
  "/_nuxt/DocsPrevNext.ab4a6a73.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"563-2OiyaTY6qfv8fA5wbcfCYl725bM\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 1379,
    "path": "../public/_nuxt/DocsPrevNext.ab4a6a73.css"
  },
  "/_nuxt/DocsPrevNext.b6d0b21b.js": {
    "type": "application/javascript",
    "etag": "\"4bf-H1zByoALVp+D+c4DnJ1dKgniCnU\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 1215,
    "path": "../public/_nuxt/DocsPrevNext.b6d0b21b.js"
  },
  "/_nuxt/DocsToc.68a320dd.js": {
    "type": "application/javascript",
    "etag": "\"2e0-JfR+wpytbOPULoXUCVkuN7DSd88\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 736,
    "path": "../public/_nuxt/DocsToc.68a320dd.js"
  },
  "/_nuxt/DocsToc.6b8d2996.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"152-IGAxzjejnjGbLV2E97EuYir+0vo\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 338,
    "path": "../public/_nuxt/DocsToc.6b8d2996.css"
  },
  "/_nuxt/DocsTocLinks.2846f127.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c8-QUA8tmItkDLJ7JYqnd1yDZUBLPY\"",
    "mtime": "2023-01-14T17:56:18.958Z",
    "size": 712,
    "path": "../public/_nuxt/DocsTocLinks.2846f127.css"
  },
  "/_nuxt/DocsTocLinks.d3ce21be.js": {
    "type": "application/javascript",
    "etag": "\"62f-c6trXzJxdZpaq8ia1XfSPG1BmR4\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 1583,
    "path": "../public/_nuxt/DocsTocLinks.d3ce21be.js"
  },
  "/_nuxt/document-driven.80166bf2.js": {
    "type": "application/javascript",
    "etag": "\"39f-TgzHfNcA/eG/1U3EQGpo3aw36oc\"",
    "mtime": "2023-01-14T17:56:18.933Z",
    "size": 927,
    "path": "../public/_nuxt/document-driven.80166bf2.js"
  },
  "/_nuxt/DocumentDrivenEmpty.843c332e.js": {
    "type": "application/javascript",
    "etag": "\"120-l0b2m/+mp4BXhw2JX6BKnmJNzCg\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 288,
    "path": "../public/_nuxt/DocumentDrivenEmpty.843c332e.js"
  },
  "/_nuxt/DocumentDrivenNotFound.434430ce.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a6-I/ZRKgtsMmvaBcyRTuryQiiGjKU\"",
    "mtime": "2023-01-14T17:56:18.949Z",
    "size": 2214,
    "path": "../public/_nuxt/DocumentDrivenNotFound.434430ce.css"
  },
  "/_nuxt/DocumentDrivenNotFound.87f83e41.js": {
    "type": "application/javascript",
    "etag": "\"33c-mrDcRuCp72m6NYtbEFOaPklou44\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 828,
    "path": "../public/_nuxt/DocumentDrivenNotFound.87f83e41.js"
  },
  "/_nuxt/EditOnLink.8ad476d5.js": {
    "type": "application/javascript",
    "etag": "\"88-ZX0pzvK1tUy5uf259jDstXVGx1o\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 136,
    "path": "../public/_nuxt/EditOnLink.8ad476d5.js"
  },
  "/_nuxt/EditOnLink.vue.6fda32cf.js": {
    "type": "application/javascript",
    "etag": "\"796-o5OldFIpqMdBPb0EqLc2iK4wu7Q\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 1942,
    "path": "../public/_nuxt/EditOnLink.vue.6fda32cf.js"
  },
  "/_nuxt/Ellipsis.4885792e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1c9-KTCranVKaIn4+BPvhSWUX0FTMIg\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 457,
    "path": "../public/_nuxt/Ellipsis.4885792e.css"
  },
  "/_nuxt/Ellipsis.cb668f17.js": {
    "type": "application/javascript",
    "etag": "\"3f2-u+892TkYj95Ma3Df8u00MroqM2w\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 1010,
    "path": "../public/_nuxt/Ellipsis.cb668f17.js"
  },
  "/_nuxt/empty.2357af1e.js": {
    "type": "application/javascript",
    "etag": "\"97-EY+BqpI6rAbi9Fd2uFdq6JI0xJQ\"",
    "mtime": "2023-01-14T17:56:18.934Z",
    "size": 151,
    "path": "../public/_nuxt/empty.2357af1e.js"
  },
  "/_nuxt/entry.44ce843c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3e4f-2JGF5+WLjM4qh067IO4bqljczak\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 15951,
    "path": "../public/_nuxt/entry.44ce843c.css"
  },
  "/_nuxt/entry.e1e529aa.js": {
    "type": "application/javascript",
    "etag": "\"3ba3e-WwTLYuQO7s2GU9q8VMB1gyRcbn8\"",
    "mtime": "2023-01-14T17:56:18.884Z",
    "size": 244286,
    "path": "../public/_nuxt/entry.e1e529aa.js"
  },
  "/_nuxt/error-404.8b92ce39.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1021-WiYdc8h9tTxynTiXx5Xl0k6/vQw\"",
    "mtime": "2023-01-14T17:56:18.959Z",
    "size": 4129,
    "path": "../public/_nuxt/error-404.8b92ce39.css"
  },
  "/_nuxt/error-404.9023348f.js": {
    "type": "application/javascript",
    "etag": "\"8a9-ukwFm8mg9cqzmfpePNs395UDVfc\"",
    "mtime": "2023-01-14T17:56:18.936Z",
    "size": 2217,
    "path": "../public/_nuxt/error-404.9023348f.js"
  },
  "/_nuxt/error-500.70e7d709.js": {
    "type": "application/javascript",
    "etag": "\"757-OHIacOgd9ajERW5UUeb5bOunX7M\"",
    "mtime": "2023-01-14T17:56:18.936Z",
    "size": 1879,
    "path": "../public/_nuxt/error-500.70e7d709.js"
  },
  "/_nuxt/error-500.fb0c9a57.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"89f-vOc3DZlhsA1JRA9Oi/mv9bO8Ja0\"",
    "mtime": "2023-01-14T17:56:18.957Z",
    "size": 2207,
    "path": "../public/_nuxt/error-500.fb0c9a57.css"
  },
  "/_nuxt/error-component.0ce8499a.js": {
    "type": "application/javascript",
    "etag": "\"475-wyMYM6f5YQeVr7t3dzO3zFxnqLY\"",
    "mtime": "2023-01-14T17:56:18.887Z",
    "size": 1141,
    "path": "../public/_nuxt/error-component.0ce8499a.js"
  },
  "/_nuxt/IconCodeSandBox.988d1128.js": {
    "type": "application/javascript",
    "etag": "\"1a9-6PDl15nYwsrbj5y/CugcIns7KjA\"",
    "mtime": "2023-01-14T17:56:18.912Z",
    "size": 425,
    "path": "../public/_nuxt/IconCodeSandBox.988d1128.js"
  },
  "/_nuxt/IconDocus.30fc3aa4.js": {
    "type": "application/javascript",
    "etag": "\"31a-/kD/1wN5BFqr1nmH9jJgS53IFEE\"",
    "mtime": "2023-01-14T17:56:18.914Z",
    "size": 794,
    "path": "../public/_nuxt/IconDocus.30fc3aa4.js"
  },
  "/_nuxt/IconNuxt.8561882e.js": {
    "type": "application/javascript",
    "etag": "\"497-eq88xScyGJQsMXvfdPc3dLiDOEI\"",
    "mtime": "2023-01-14T17:56:18.920Z",
    "size": 1175,
    "path": "../public/_nuxt/IconNuxt.8561882e.js"
  },
  "/_nuxt/IconNuxtContent.b19985c0.js": {
    "type": "application/javascript",
    "etag": "\"497-HDqQf5K7NL8Jx4cDQcVOS+Kcw80\"",
    "mtime": "2023-01-14T17:56:18.920Z",
    "size": 1175,
    "path": "../public/_nuxt/IconNuxtContent.b19985c0.js"
  },
  "/_nuxt/IconNuxtLabs.c599de3a.js": {
    "type": "application/javascript",
    "etag": "\"497-677OxAy067Wxnp7DpVMxWS0ewmo\"",
    "mtime": "2023-01-14T17:56:18.920Z",
    "size": 1175,
    "path": "../public/_nuxt/IconNuxtLabs.c599de3a.js"
  },
  "/_nuxt/IconNuxtStudio.1b445369.js": {
    "type": "application/javascript",
    "etag": "\"51d-+eZxd5KNsxgRK0olLEi1DnHbv+M\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 1309,
    "path": "../public/_nuxt/IconNuxtStudio.1b445369.js"
  },
  "/_nuxt/IconNuxtStudio.34390cd8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"66-AA2ErH34Xmax3511FiYX4lQ+vjs\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 102,
    "path": "../public/_nuxt/IconNuxtStudio.34390cd8.css"
  },
  "/_nuxt/IconStackBlitz.64fdea94.js": {
    "type": "application/javascript",
    "etag": "\"160-CWPyuCtqpA3THjXxAC5Qwun52F4\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 352,
    "path": "../public/_nuxt/IconStackBlitz.64fdea94.js"
  },
  "/_nuxt/IconVueTelescope.b5eda906.js": {
    "type": "application/javascript",
    "etag": "\"2cf-yYpKli71te5hoP+DgV3Gr5dSVlw\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 719,
    "path": "../public/_nuxt/IconVueTelescope.b5eda906.js"
  },
  "/_nuxt/index.ceee6c89.js": {
    "type": "application/javascript",
    "etag": "\"102c-zmMkAmweXEPLq7eWg2n6/0WkpPM\"",
    "mtime": "2023-01-14T17:56:18.898Z",
    "size": 4140,
    "path": "../public/_nuxt/index.ceee6c89.js"
  },
  "/_nuxt/index.d304a3a2.js": {
    "type": "application/javascript",
    "etag": "\"8af0-/jsGCr6QnOMUX7FSbk75ITyhETs\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 35568,
    "path": "../public/_nuxt/index.d304a3a2.js"
  },
  "/_nuxt/layout.ffa3d2a5.js": {
    "type": "application/javascript",
    "etag": "\"294-8M09w5+2wESfp2CdXtPBm5vvzLk\"",
    "mtime": "2023-01-14T17:56:18.932Z",
    "size": 660,
    "path": "../public/_nuxt/layout.ffa3d2a5.js"
  },
  "/_nuxt/List.a65f0e81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2a0-bFZ6WsZ5dY0RxcMye3Xpw+KYZJQ\"",
    "mtime": "2023-01-14T17:56:18.942Z",
    "size": 672,
    "path": "../public/_nuxt/List.a65f0e81.css"
  },
  "/_nuxt/List.d005b56a.js": {
    "type": "application/javascript",
    "etag": "\"ba-F5GIYrXcqgIyo2PCKONhOJwEjjA\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 186,
    "path": "../public/_nuxt/List.d005b56a.js"
  },
  "/_nuxt/List.vue.460190d9.js": {
    "type": "application/javascript",
    "etag": "\"32a-rWHUveRXZhYka4cgAtGgciJ6l9I\"",
    "mtime": "2023-01-14T17:56:18.910Z",
    "size": 810,
    "path": "../public/_nuxt/List.vue.460190d9.js"
  },
  "/_nuxt/Markdown.f205c475.js": {
    "type": "application/javascript",
    "etag": "\"149-2AD4y2LtKSjJ77sYGb8XCsDN4yc\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 329,
    "path": "../public/_nuxt/Markdown.f205c475.js"
  },
  "/_nuxt/NuxtImg.8fbd30da.js": {
    "type": "application/javascript",
    "etag": "\"82-OIvVOifsqCtBiOBuc2L4iMeIenM\"",
    "mtime": "2023-01-14T17:56:18.910Z",
    "size": 130,
    "path": "../public/_nuxt/NuxtImg.8fbd30da.js"
  },
  "/_nuxt/NuxtImg.vue.9e809eaa.js": {
    "type": "application/javascript",
    "etag": "\"236-D/vDIwuS+gbplojwebCjXohZmT4\"",
    "mtime": "2023-01-14T17:56:18.910Z",
    "size": 566,
    "path": "../public/_nuxt/NuxtImg.vue.9e809eaa.js"
  },
  "/_nuxt/page.2315a3cf.js": {
    "type": "application/javascript",
    "etag": "\"1ea-jEOesFr6HSeIda0aHhf1rrHP248\"",
    "mtime": "2023-01-14T17:56:18.936Z",
    "size": 490,
    "path": "../public/_nuxt/page.2315a3cf.js"
  },
  "/_nuxt/page.367117a6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"54-Kvv2NbDNz9UEhO15cbd1+rcuv/8\"",
    "mtime": "2023-01-14T17:56:18.953Z",
    "size": 84,
    "path": "../public/_nuxt/page.367117a6.css"
  },
  "/_nuxt/Props.b64c8dea.js": {
    "type": "application/javascript",
    "etag": "\"c2a-123c7J278rwkrt1RXTRL4T3r1WY\"",
    "mtime": "2023-01-14T17:56:18.910Z",
    "size": 3114,
    "path": "../public/_nuxt/Props.b64c8dea.js"
  },
  "/_nuxt/ProseA.41f426ca.js": {
    "type": "application/javascript",
    "etag": "\"1e7-JjVTP+eIOcMKEJvN4DcwYCQFcYk\"",
    "mtime": "2023-01-14T17:56:18.889Z",
    "size": 487,
    "path": "../public/_nuxt/ProseA.41f426ca.js"
  },
  "/_nuxt/ProseA.c0b3282e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"59b-e6j3EK56n4tX3Qj8H/xsIGe02UM\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 1435,
    "path": "../public/_nuxt/ProseA.c0b3282e.css"
  },
  "/_nuxt/ProseBlockquote.2fb40008.js": {
    "type": "application/javascript",
    "etag": "\"119-O6P60S66sxtP1pOZq+mIrSaxr9M\"",
    "mtime": "2023-01-14T17:56:18.889Z",
    "size": 281,
    "path": "../public/_nuxt/ProseBlockquote.2fb40008.js"
  },
  "/_nuxt/ProseBlockquote.8cd3c64f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1df-gNj0rMJ+uthLHvNr0eQgxkB1zZc\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 479,
    "path": "../public/_nuxt/ProseBlockquote.8cd3c64f.css"
  },
  "/_nuxt/ProseCode.bb401702.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"be5-tKaX6uqEQ7MlPEDsIDvu4Tx6kbo\"",
    "mtime": "2023-01-14T17:56:18.942Z",
    "size": 3045,
    "path": "../public/_nuxt/ProseCode.bb401702.css"
  },
  "/_nuxt/ProseCode.d160ef2a.js": {
    "type": "application/javascript",
    "etag": "\"361-qTt+CmBbrfhZHtfzH9etfq7qs8s\"",
    "mtime": "2023-01-14T17:56:18.889Z",
    "size": 865,
    "path": "../public/_nuxt/ProseCode.d160ef2a.js"
  },
  "/_nuxt/ProseCodeCopyButton.846977ac.js": {
    "type": "application/javascript",
    "etag": "\"470-zyZQ2TpBquXRV0I+5nDFzxGTzaw\"",
    "mtime": "2023-01-14T17:56:18.890Z",
    "size": 1136,
    "path": "../public/_nuxt/ProseCodeCopyButton.846977ac.js"
  },
  "/_nuxt/ProseCodeInline.5c292c0c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"47a-e8/+aqkjqAQn5GAVfsKdvE4rvQs\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 1146,
    "path": "../public/_nuxt/ProseCodeInline.5c292c0c.css"
  },
  "/_nuxt/ProseCodeInline.c9d84208.js": {
    "type": "application/javascript",
    "etag": "\"e9-Au4pbH+zFg8DM93/X/8a1O0C+r8\"",
    "mtime": "2023-01-14T17:56:18.888Z",
    "size": 233,
    "path": "../public/_nuxt/ProseCodeInline.c9d84208.js"
  },
  "/_nuxt/ProseEm.08155f3c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27-NOCXTJ1M/R2RMdRtz+HIelag4Cg\"",
    "mtime": "2023-01-14T17:56:18.957Z",
    "size": 39,
    "path": "../public/_nuxt/ProseEm.08155f3c.css"
  },
  "/_nuxt/ProseEm.a36e81ff.js": {
    "type": "application/javascript",
    "etag": "\"109-wOT1iQPNCkfXvY/7c51oOF7kHpk\"",
    "mtime": "2023-01-14T17:56:18.898Z",
    "size": 265,
    "path": "../public/_nuxt/ProseEm.a36e81ff.js"
  },
  "/_nuxt/ProseH1.713a018b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ab-7ax6NajDBPDDDjKMuXEi8iM8gDY\"",
    "mtime": "2023-01-14T17:56:18.952Z",
    "size": 427,
    "path": "../public/_nuxt/ProseH1.713a018b.css"
  },
  "/_nuxt/ProseH1.9bf221c7.js": {
    "type": "application/javascript",
    "etag": "\"2d5-BWwP4BHunVpP3d1UBin5aQzwgFw\"",
    "mtime": "2023-01-14T17:56:18.898Z",
    "size": 725,
    "path": "../public/_nuxt/ProseH1.9bf221c7.js"
  },
  "/_nuxt/ProseH2.5c5b47c1.js": {
    "type": "application/javascript",
    "etag": "\"2d5-eybmPCFZv/4wGlxA2wyy2jw2l60\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 725,
    "path": "../public/_nuxt/ProseH2.5c5b47c1.js"
  },
  "/_nuxt/ProseH2.c3733cfa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ab-wDohtQg/l/j1V3F8LMy3UGjvlC8\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 427,
    "path": "../public/_nuxt/ProseH2.c3733cfa.css"
  },
  "/_nuxt/ProseH3.c20b07eb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ab-950Qegv8NIZRn3fYmg+rAPyIWcU\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 427,
    "path": "../public/_nuxt/ProseH3.c20b07eb.css"
  },
  "/_nuxt/ProseH3.e7ba8c38.js": {
    "type": "application/javascript",
    "etag": "\"2d5-Xx3qmzHhv9LkGL3I2Y/hYtHkDrI\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 725,
    "path": "../public/_nuxt/ProseH3.e7ba8c38.js"
  },
  "/_nuxt/ProseH4.799d13d6.js": {
    "type": "application/javascript",
    "etag": "\"2b4-5B8xVJulJejNbnTN+lAA0UDx9K0\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 692,
    "path": "../public/_nuxt/ProseH4.799d13d6.js"
  },
  "/_nuxt/ProseH4.99474624.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ab-QHQ/BUhjrYV75aQS+E4GmXoFa0w\"",
    "mtime": "2023-01-14T17:56:18.948Z",
    "size": 427,
    "path": "../public/_nuxt/ProseH4.99474624.css"
  },
  "/_nuxt/ProseH5.21946c8c.js": {
    "type": "application/javascript",
    "etag": "\"2d5-jzLwdD2lB9OmP5gXFBnfvX8OFhA\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 725,
    "path": "../public/_nuxt/ProseH5.21946c8c.js"
  },
  "/_nuxt/ProseH5.fa6d9ad5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17d-CH3AvHOys4rB2E6c63wOaDHPi+c\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 381,
    "path": "../public/_nuxt/ProseH5.fa6d9ad5.css"
  },
  "/_nuxt/ProseH6.4a50fcaf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"17d-/eK/xemA2L3EH43wjGKPXV7FYfk\"",
    "mtime": "2023-01-14T17:56:18.964Z",
    "size": 381,
    "path": "../public/_nuxt/ProseH6.4a50fcaf.css"
  },
  "/_nuxt/ProseH6.6d1984bf.js": {
    "type": "application/javascript",
    "etag": "\"2d5-1j766b+nOVin7390ZlOgIq3VksA\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 725,
    "path": "../public/_nuxt/ProseH6.6d1984bf.js"
  },
  "/_nuxt/ProseHr.7f3ea8bf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d1-QczOjtYD7tFnpyL79rLo88j2ny0\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 209,
    "path": "../public/_nuxt/ProseHr.7f3ea8bf.css"
  },
  "/_nuxt/ProseHr.c5b5488d.js": {
    "type": "application/javascript",
    "etag": "\"d8-rzTYe1RtCyYuVPXSVLmvK9o9xs4\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 216,
    "path": "../public/_nuxt/ProseHr.c5b5488d.js"
  },
  "/_nuxt/ProseImg.1b12ee83.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"35-NMB1Bf4vbd9tg0KNcgShP0KhFGg\"",
    "mtime": "2023-01-14T17:56:18.963Z",
    "size": 53,
    "path": "../public/_nuxt/ProseImg.1b12ee83.css"
  },
  "/_nuxt/ProseImg.3b1ca94a.js": {
    "type": "application/javascript",
    "etag": "\"1f2-uPki7MJLUUeg8J9OURm+/cOaHyw\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 498,
    "path": "../public/_nuxt/ProseImg.3b1ca94a.js"
  },
  "/_nuxt/ProseLi.7005f7b9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"69-fvbNiPCZsKJqeCnrjMuDsX8oyHA\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 105,
    "path": "../public/_nuxt/ProseLi.7005f7b9.css"
  },
  "/_nuxt/ProseLi.7c031d25.js": {
    "type": "application/javascript",
    "etag": "\"109-3UsetZPWgAg4/lrfgHCM9imvxjc\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 265,
    "path": "../public/_nuxt/ProseLi.7c031d25.js"
  },
  "/_nuxt/ProseOl.38222356.js": {
    "type": "application/javascript",
    "etag": "\"109-IaCf0347bknSVrMaxGmEwTKWLic\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 265,
    "path": "../public/_nuxt/ProseOl.38222356.js"
  },
  "/_nuxt/ProseOl.f18f1ab6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15c-zA5KifLIhctYKHpIkvTG7KMnpdM\"",
    "mtime": "2023-01-14T17:56:18.964Z",
    "size": 348,
    "path": "../public/_nuxt/ProseOl.f18f1ab6.css"
  },
  "/_nuxt/ProseP.1abaf6c9.js": {
    "type": "application/javascript",
    "etag": "\"e6-sIyMSRZuaKBBxJPt97+qg+Ij4/M\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 230,
    "path": "../public/_nuxt/ProseP.1abaf6c9.js"
  },
  "/_nuxt/ProseP.8117fd4f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-XwJ6xbJAQS4ZYvsDS0X/XY0k63k\"",
    "mtime": "2023-01-14T17:56:18.974Z",
    "size": 200,
    "path": "../public/_nuxt/ProseP.8117fd4f.css"
  },
  "/_nuxt/ProseStrong.133440f2.js": {
    "type": "application/javascript",
    "etag": "\"111-aZwyWyU3Ake/ZjoEh0Tc+hOJ0MU\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 273,
    "path": "../public/_nuxt/ProseStrong.133440f2.js"
  },
  "/_nuxt/ProseStrong.22b57f6c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"44-bBVLIhC3T5q4Me7HOxggBUQhpmo\"",
    "mtime": "2023-01-14T17:56:18.974Z",
    "size": 68,
    "path": "../public/_nuxt/ProseStrong.22b57f6c.css"
  },
  "/_nuxt/ProseTable.a6bed3cb.js": {
    "type": "application/javascript",
    "etag": "\"118-rU0qsbqbo3WSfqtk7ERaonMoJOE\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 280,
    "path": "../public/_nuxt/ProseTable.a6bed3cb.js"
  },
  "/_nuxt/ProseTable.cb863e95.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13c-BXsdIr3IctTMN7jOv/gWKF6oNiA\"",
    "mtime": "2023-01-14T17:56:18.958Z",
    "size": 316,
    "path": "../public/_nuxt/ProseTable.cb863e95.css"
  },
  "/_nuxt/ProseTbody.79dd1b4a.js": {
    "type": "application/javascript",
    "etag": "\"bd-PUOlf2BcqQ5j2haBV8i2DfXjsLI\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 189,
    "path": "../public/_nuxt/ProseTbody.79dd1b4a.js"
  },
  "/_nuxt/ProseTd.8bba0d9d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ab-RC6WmEuY+jNA+HrLefvZ/ZKb6NU\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 171,
    "path": "../public/_nuxt/ProseTd.8bba0d9d.css"
  },
  "/_nuxt/ProseTd.cf21c491.js": {
    "type": "application/javascript",
    "etag": "\"e7-E6V092Ii/F5RI69OkE0rzHvlUvg\"",
    "mtime": "2023-01-14T17:56:18.899Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTd.cf21c491.js"
  },
  "/_nuxt/ProseTh.7af45f41.js": {
    "type": "application/javascript",
    "etag": "\"e7-glgW2MGuo3RaCc9ADyOBIM7C0JU\"",
    "mtime": "2023-01-14T17:56:18.900Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTh.7af45f41.js"
  },
  "/_nuxt/ProseTh.82079a3d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11c-gBqETgi3VR/18IlUhF0G9K/kuk0\"",
    "mtime": "2023-01-14T17:56:18.964Z",
    "size": 284,
    "path": "../public/_nuxt/ProseTh.82079a3d.css"
  },
  "/_nuxt/ProseThead.8eca405b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ba-56yCDyi/dHje+bFjxtn4pzvrO6g\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 186,
    "path": "../public/_nuxt/ProseThead.8eca405b.css"
  },
  "/_nuxt/ProseThead.f029c77a.js": {
    "type": "application/javascript",
    "etag": "\"ea-CBbBbwhOfatUV9lB8S/ahVdkArg\"",
    "mtime": "2023-01-14T17:56:18.900Z",
    "size": 234,
    "path": "../public/_nuxt/ProseThead.f029c77a.js"
  },
  "/_nuxt/ProseTr.09362402.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a5-kH/9VrCh9ybseMTj9QU4fVI75Ms\"",
    "mtime": "2023-01-14T17:56:18.969Z",
    "size": 165,
    "path": "../public/_nuxt/ProseTr.09362402.css"
  },
  "/_nuxt/ProseTr.09a436a3.js": {
    "type": "application/javascript",
    "etag": "\"e7-S/RCyCBUxOUsaWmCuFASVbDweR8\"",
    "mtime": "2023-01-14T17:56:18.903Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTr.09a436a3.js"
  },
  "/_nuxt/ProseUl.b2924e6d.js": {
    "type": "application/javascript",
    "etag": "\"109-Elq+S6xOXt6rDXrfz5zxEKsyxx4\"",
    "mtime": "2023-01-14T17:56:18.908Z",
    "size": 265,
    "path": "../public/_nuxt/ProseUl.b2924e6d.js"
  },
  "/_nuxt/ProseUl.c24d887f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15c-nSwZxQpvgEldARfkbjnUEM3MKOk\"",
    "mtime": "2023-01-14T17:56:18.974Z",
    "size": 348,
    "path": "../public/_nuxt/ProseUl.c24d887f.css"
  },
  "/_nuxt/Sandbox.171d9183.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a7-C6J8NPLuzW6frSxJDZgd62zEUjE\"",
    "mtime": "2023-01-14T17:56:18.942Z",
    "size": 423,
    "path": "../public/_nuxt/Sandbox.171d9183.css"
  },
  "/_nuxt/Sandbox.72352ab4.js": {
    "type": "application/javascript",
    "etag": "\"631-TXYolDgwChNC2HsuOViSGXRr5E8\"",
    "mtime": "2023-01-14T17:56:18.911Z",
    "size": 1585,
    "path": "../public/_nuxt/Sandbox.72352ab4.js"
  },
  "/_nuxt/SourceLink.7f5a5084.js": {
    "type": "application/javascript",
    "etag": "\"ed-apPVZORfBHCX5p/HhiKbTL8EtJg\"",
    "mtime": "2023-01-14T17:56:18.910Z",
    "size": 237,
    "path": "../public/_nuxt/SourceLink.7f5a5084.js"
  },
  "/_nuxt/TabsHeader.da342b07.js": {
    "type": "application/javascript",
    "etag": "\"481-wFb/kxkKbBNGq3o1XlwoK5TBr4U\"",
    "mtime": "2023-01-14T17:56:18.909Z",
    "size": 1153,
    "path": "../public/_nuxt/TabsHeader.da342b07.js"
  },
  "/_nuxt/TabsHeader.fed4d9b4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"698-i4tfB9l9MbY97TuWiTRq74BYmK4\"",
    "mtime": "2023-01-14T17:56:18.953Z",
    "size": 1688,
    "path": "../public/_nuxt/TabsHeader.fed4d9b4.css"
  },
  "/_nuxt/Terminal.9c776c89.js": {
    "type": "application/javascript",
    "etag": "\"45e-io6B4DROT0DvZI/231uVwbVyfXA\"",
    "mtime": "2023-01-14T17:56:18.911Z",
    "size": 1118,
    "path": "../public/_nuxt/Terminal.9c776c89.js"
  },
  "/_nuxt/Terminal.c60347f9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9de-M66iw5XoPWy6cnBt7wxphLctJW4\"",
    "mtime": "2023-01-14T17:56:18.960Z",
    "size": 2526,
    "path": "../public/_nuxt/Terminal.c60347f9.css"
  },
  "/_nuxt/TestIcon.f6e13561.js": {
    "type": "application/javascript",
    "etag": "\"5d6-QZgF5+s5O7Na22XIjF2Z6ahJkv4\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 1494,
    "path": "../public/_nuxt/TestIcon.f6e13561.js"
  },
  "/_nuxt/TokensPlayground.74ae8170.js": {
    "type": "application/javascript",
    "etag": "\"ff-7t0a5haSnVjApD3n1f5zoRAe+As\"",
    "mtime": "2023-01-14T17:56:18.926Z",
    "size": 255,
    "path": "../public/_nuxt/TokensPlayground.74ae8170.js"
  },
  "/_nuxt/useStudio.8efb1ea8.js": {
    "type": "application/javascript",
    "etag": "\"b0f-YmPwNjVTXGobgxSb1TDIZNd5Fjc\"",
    "mtime": "2023-01-14T17:56:18.932Z",
    "size": 2831,
    "path": "../public/_nuxt/useStudio.8efb1ea8.js"
  },
  "/_nuxt/VideoPlayer.e2296f21.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ae-ghBYKA63UNWF+O4/hx/uW+DAl74\"",
    "mtime": "2023-01-14T17:56:18.949Z",
    "size": 1454,
    "path": "../public/_nuxt/VideoPlayer.e2296f21.css"
  },
  "/_nuxt/VideoPlayer.f34c5676.js": {
    "type": "application/javascript",
    "etag": "\"77a-cp4shpCDdQ1ttBu3ofm46V77kRk\"",
    "mtime": "2023-01-14T17:56:18.911Z",
    "size": 1914,
    "path": "../public/_nuxt/VideoPlayer.f34c5676.js"
  },
  "/_nuxt/VoltaBoard.6dd35ecb.js": {
    "type": "application/javascript",
    "etag": "\"156-fyDQQ+r7U4xe9HDFaAVV9FSHpR8\"",
    "mtime": "2023-01-14T17:56:18.921Z",
    "size": 342,
    "path": "../public/_nuxt/VoltaBoard.6dd35ecb.js"
  },
  "/_nuxt/VoltaBoard.db5da1f6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"22b-8iEEfWQlt91OWC3LY2Opz/Imyi4\"",
    "mtime": "2023-01-14T17:56:18.972Z",
    "size": 555,
    "path": "../public/_nuxt/VoltaBoard.db5da1f6.css"
  },
  "/_nuxt/web-socket.e63f4fc1.js": {
    "type": "application/javascript",
    "etag": "\"32b-Z4MU8IPe3xel8xG24MjYco/4P7w\"",
    "mtime": "2023-01-14T17:56:18.932Z",
    "size": 811,
    "path": "../public/_nuxt/web-socket.e63f4fc1.js"
  },
  "/_nuxt/welcome.9453b8a1.js": {
    "type": "application/javascript",
    "etag": "\"17ec1-oBnUnliVsadAMh7i5HdNhiHcnQ0\"",
    "mtime": "2023-01-14T17:56:18.941Z",
    "size": 97985,
    "path": "../public/_nuxt/welcome.9453b8a1.js"
  },
  "/_nuxt/_commonjsHelpers.726de751.js": {
    "type": "application/javascript",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2023-01-14T17:56:18.931Z",
    "size": 236,
    "path": "../public/_nuxt/_commonjsHelpers.726de751.js"
  },
  "/api/_content/cache.1673718910241.json": {
    "type": "application/json",
    "etag": "\"6f6895-jWYMgQaWnuHz9z8O5cNF7BiMPvI\"",
    "mtime": "2023-01-14T18:00:31.688Z",
    "size": 7301269,
    "path": "../public/api/_content/cache.1673718910241.json"
  },
  "/money/assets/Snipaste_2023-01-06_01-59-02.png": {
    "type": "image/png",
    "etag": "\"2f6eb-TiCABzG5+MI/DoJU9SVAlwcRrhs\"",
    "mtime": "2023-01-05T17:59:20.728Z",
    "size": 194283,
    "path": "../public/money/assets/Snipaste_2023-01-06_01-59-02.png"
  },
  "/money/assets/Snipaste_2023-01-06_02-03-37.png": {
    "type": "image/png",
    "etag": "\"1aff6-XFFl+ivAtEgkpwJRMRsx1J/peHo\"",
    "mtime": "2023-01-05T18:03:40.232Z",
    "size": 110582,
    "path": "../public/money/assets/Snipaste_2023-01-06_02-03-37.png"
  },
  "/money/assets/Snipaste_2023-01-06_02-13-26.png": {
    "type": "image/png",
    "etag": "\"25399-xnKxK42ZWeTEs5smFpgkWjqQLjw\"",
    "mtime": "2023-01-05T18:13:27.850Z",
    "size": 152473,
    "path": "../public/money/assets/Snipaste_2023-01-06_02-13-26.png"
  },
  "/money/assets/Snipaste_2023-01-06_02-17-49.png": {
    "type": "image/png",
    "etag": "\"21616-Rva+twFZKhn3TudfY0umzMKoIas\"",
    "mtime": "2023-01-05T18:17:50.689Z",
    "size": 136726,
    "path": "../public/money/assets/Snipaste_2023-01-06_02-17-49.png"
  },
  "/program/img/Snipaste_2022-07-13_10-10-56.png": {
    "type": "image/png",
    "etag": "\"cff5-uMyAr/0n8xJNAQwIgmDFx5ETnUk\"",
    "mtime": "2022-07-13T02:11:27.276Z",
    "size": 53237,
    "path": "../public/program/img/Snipaste_2022-07-13_10-10-56.png"
  },
  "/program/img/Snipaste_2022-07-14_22-05-53.png": {
    "type": "image/png",
    "etag": "\"e045-OY5Ar5ciJtZm0YYG5D8RtK2QGOk\"",
    "mtime": "2022-07-14T14:06:05.676Z",
    "size": 57413,
    "path": "../public/program/img/Snipaste_2022-07-14_22-05-53.png"
  },
  "/program/img/Snipaste_2022-07-17_00-28-06.png": {
    "type": "image/png",
    "etag": "\"7528-b+BRuhkW48CFiqvKCzBIEa8fQns\"",
    "mtime": "2022-07-16T16:28:31.027Z",
    "size": 29992,
    "path": "../public/program/img/Snipaste_2022-07-17_00-28-06.png"
  },
  "/program/img/Snipaste_2022-07-17_07-03-56.png": {
    "type": "image/png",
    "etag": "\"2eed3-dhhRAty2hdqG1iBP7c/6Sfjp5fg\"",
    "mtime": "2022-07-16T23:04:18.183Z",
    "size": 192211,
    "path": "../public/program/img/Snipaste_2022-07-17_07-03-56.png"
  },
  "/program/img/Snipaste_2022-07-17_11-30-20.png": {
    "type": "image/png",
    "etag": "\"163a6-5rBJ1jAIACdDJQZj6Vp3MmSg7ps\"",
    "mtime": "2022-07-17T03:30:23.041Z",
    "size": 91046,
    "path": "../public/program/img/Snipaste_2022-07-17_11-30-20.png"
  },
  "/program/img/Snipaste_2022-07-17_11-32-46.png": {
    "type": "image/png",
    "etag": "\"2536f-ufna1ko1/alDm2szDPg4bptE8n8\"",
    "mtime": "2022-07-17T03:32:48.201Z",
    "size": 152431,
    "path": "../public/program/img/Snipaste_2022-07-17_11-32-46.png"
  },
  "/program/img/Snipaste_2022-07-17_11-42-38.png": {
    "type": "image/png",
    "etag": "\"10760-uRftASezAgjudJk9gNVwUDPO4Nk\"",
    "mtime": "2022-07-17T03:42:40.951Z",
    "size": 67424,
    "path": "../public/program/img/Snipaste_2022-07-17_11-42-38.png"
  },
  "/program/img/Snipaste_2022-07-17_11-52-00.png": {
    "type": "image/png",
    "etag": "\"d957-Oljn7c1jd6IsQe9FUIG3SjzevFc\"",
    "mtime": "2022-07-17T03:52:02.662Z",
    "size": 55639,
    "path": "../public/program/img/Snipaste_2022-07-17_11-52-00.png"
  },
  "/program/img/Snipaste_2022-07-17_12-03-44.png": {
    "type": "image/png",
    "etag": "\"13e9b-GTgHz51PEKKQYhVXMrzUzsvVECM\"",
    "mtime": "2022-07-17T04:03:46.885Z",
    "size": 81563,
    "path": "../public/program/img/Snipaste_2022-07-17_12-03-44.png"
  },
  "/program/img/Snipaste_2022-07-17_12-59-31.png": {
    "type": "image/png",
    "etag": "\"12aca-BGJl7rGks3SFEuFcq+duKwf2vK4\"",
    "mtime": "2022-07-17T04:59:33.095Z",
    "size": 76490,
    "path": "../public/program/img/Snipaste_2022-07-17_12-59-31.png"
  },
  "/program/img/Snipaste_2022-07-17_13-44-06.png": {
    "type": "image/png",
    "etag": "\"13367-BVlvkqkcmcuGHXo4XGSywUM/6/0\"",
    "mtime": "2022-07-17T05:44:08.691Z",
    "size": 78695,
    "path": "../public/program/img/Snipaste_2022-07-17_13-44-06.png"
  },
  "/program/img/Snipaste_2022-07-17_13-45-08.png": {
    "type": "image/png",
    "etag": "\"13735-OhXsM47ZX1T9451H8sWWwo9EHoE\"",
    "mtime": "2022-07-17T05:45:10.472Z",
    "size": 79669,
    "path": "../public/program/img/Snipaste_2022-07-17_13-45-08.png"
  },
  "/program/img/Snipaste_2022-07-17_14-47-15.png": {
    "type": "image/png",
    "etag": "\"f4d7-qlGDTfGf99P9vhde2YiKzcM2bHM\"",
    "mtime": "2022-07-17T06:47:17.458Z",
    "size": 62679,
    "path": "../public/program/img/Snipaste_2022-07-17_14-47-15.png"
  },
  "/program/img/Snipaste_2022-07-17_14-47-36.png": {
    "type": "image/png",
    "etag": "\"dd90-BF8rio69zIBpSC3LxShF0HZGc38\"",
    "mtime": "2022-07-17T06:47:38.702Z",
    "size": 56720,
    "path": "../public/program/img/Snipaste_2022-07-17_14-47-36.png"
  },
  "/program/img/Snipaste_2022-07-17_14-49-32.png": {
    "type": "image/png",
    "etag": "\"17da3-CWFVoyqxc6TNXRuMiyXv4si64PY\"",
    "mtime": "2022-07-17T06:49:34.692Z",
    "size": 97699,
    "path": "../public/program/img/Snipaste_2022-07-17_14-49-32.png"
  },
  "/program/img/Snipaste_2022-07-17_16-59-40.png": {
    "type": "image/png",
    "etag": "\"23751-MS/otLyUmdesh5+8e+hB5eI9qVc\"",
    "mtime": "2022-07-17T08:59:42.838Z",
    "size": 145233,
    "path": "../public/program/img/Snipaste_2022-07-17_16-59-40.png"
  },
  "/program/img/Snipaste_2022-07-17_20-19-02.png": {
    "type": "image/png",
    "etag": "\"5a62-bZS0xvN+toqu5GRaxUXKoJixjNI\"",
    "mtime": "2022-07-17T12:19:05.678Z",
    "size": 23138,
    "path": "../public/program/img/Snipaste_2022-07-17_20-19-02.png"
  },
  "/program/img/Snipaste_2022-07-17_22-04-19.png": {
    "type": "image/png",
    "etag": "\"ab03-AGo1MC2Lc5OIBQUKlZZUfApja+0\"",
    "mtime": "2022-07-17T14:04:20.703Z",
    "size": 43779,
    "path": "../public/program/img/Snipaste_2022-07-17_22-04-19.png"
  },
  "/program/img/Snipaste_2022-07-17_23-04-17.png": {
    "type": "image/png",
    "etag": "\"16aa3-VMGpkihaJfHG6GIECDrU6zgulBU\"",
    "mtime": "2022-07-17T15:04:19.322Z",
    "size": 92835,
    "path": "../public/program/img/Snipaste_2022-07-17_23-04-17.png"
  },
  "/program/img/Snipaste_2022-07-17_23-06-13.png": {
    "type": "image/png",
    "etag": "\"17660-LcrNuE9Psoj5oMOLi13dq4GdVcY\"",
    "mtime": "2022-07-17T15:06:15.617Z",
    "size": 95840,
    "path": "../public/program/img/Snipaste_2022-07-17_23-06-13.png"
  },
  "/program/img/Snipaste_2022-07-17_23-11-40.png": {
    "type": "image/png",
    "etag": "\"8802-oloey3v4/0DEq2D6SAK0dJS5VB8\"",
    "mtime": "2022-07-17T15:11:42.619Z",
    "size": 34818,
    "path": "../public/program/img/Snipaste_2022-07-17_23-11-40.png"
  },
  "/program/img/Snipaste_2022-07-17_23-33-05.png": {
    "type": "image/png",
    "etag": "\"23150-wRRMOe9xIJHbW7jf2+qh4ro0fAQ\"",
    "mtime": "2022-07-17T15:33:07.617Z",
    "size": 143696,
    "path": "../public/program/img/Snipaste_2022-07-17_23-33-05.png"
  },
  "/program/img/Snipaste_2022-07-19_14-13-38.png": {
    "type": "image/png",
    "etag": "\"26a25-m6g8LY6eX7eDUgXOuxQUPKemHdc\"",
    "mtime": "2022-07-19T06:13:43.054Z",
    "size": 158245,
    "path": "../public/program/img/Snipaste_2022-07-19_14-13-38.png"
  },
  "/program/img/Snipaste_2022-07-19_14-19-18.png": {
    "type": "image/png",
    "etag": "\"1843b-rtmo/X8vER7c9actGjhhCXnD/9g\"",
    "mtime": "2022-07-19T06:19:20.175Z",
    "size": 99387,
    "path": "../public/program/img/Snipaste_2022-07-19_14-19-18.png"
  },
  "/program/img/Snipaste_2022-07-19_15-14-56.png": {
    "type": "image/png",
    "etag": "\"ec15-saDq77k1WjcQFNxay/74yO+z6qk\"",
    "mtime": "2022-07-19T07:14:58.650Z",
    "size": 60437,
    "path": "../public/program/img/Snipaste_2022-07-19_15-14-56.png"
  },
  "/program/img/Snipaste_2022-07-19_15-19-06.png": {
    "type": "image/png",
    "etag": "\"1bf33-g78b1pxHllMVZ95vUe/4OJI8cVE\"",
    "mtime": "2022-07-19T07:19:08.280Z",
    "size": 114483,
    "path": "../public/program/img/Snipaste_2022-07-19_15-19-06.png"
  },
  "/program/img/Snipaste_2022-07-19_15-21-49.png": {
    "type": "image/png",
    "etag": "\"cd1b-KlX114tjZCkFKGfB6SpJMG6gORc\"",
    "mtime": "2022-07-19T07:21:51.513Z",
    "size": 52507,
    "path": "../public/program/img/Snipaste_2022-07-19_15-21-49.png"
  },
  "/program/img/Snipaste_2022-07-19_15-27-28.png": {
    "type": "image/png",
    "etag": "\"2ba5b-me/5ann9NzazR14aN2UuKmI0XXY\"",
    "mtime": "2022-07-19T07:27:30.545Z",
    "size": 178779,
    "path": "../public/program/img/Snipaste_2022-07-19_15-27-28.png"
  },
  "/program/img/Snipaste_2022-07-19_15-36-06.png": {
    "type": "image/png",
    "etag": "\"17c00-mMIp0yTXpN9eblvSN/LkVD/7A2I\"",
    "mtime": "2022-07-19T07:36:08.229Z",
    "size": 97280,
    "path": "../public/program/img/Snipaste_2022-07-19_15-36-06.png"
  },
  "/program/img/Snipaste_2022-07-19_15-38-53.png": {
    "type": "image/png",
    "etag": "\"ab76-rhrIgiIk7lS5bJrEUk5bLhQa2Xw\"",
    "mtime": "2022-07-19T07:38:56.429Z",
    "size": 43894,
    "path": "../public/program/img/Snipaste_2022-07-19_15-38-53.png"
  },
  "/program/img/Snipaste_2022-07-19_15-41-19.png": {
    "type": "image/png",
    "etag": "\"12e93-htlV3XYsVSPbMTe6llNBnd0ZzFs\"",
    "mtime": "2022-07-19T07:41:20.833Z",
    "size": 77459,
    "path": "../public/program/img/Snipaste_2022-07-19_15-41-19.png"
  },
  "/program/img/Snipaste_2022-07-19_15-42-37.png": {
    "type": "image/png",
    "etag": "\"b0af-P/Brop0zcu5XGEimcc9KgyuLVF4\"",
    "mtime": "2022-07-19T07:42:39.087Z",
    "size": 45231,
    "path": "../public/program/img/Snipaste_2022-07-19_15-42-37.png"
  },
  "/program/img/Snipaste_2022-07-19_15-43-35.png": {
    "type": "image/png",
    "etag": "\"5b23-Kp3kxRJThrCL5sPD/zPhh1E5KTA\"",
    "mtime": "2022-07-19T07:43:36.687Z",
    "size": 23331,
    "path": "../public/program/img/Snipaste_2022-07-19_15-43-35.png"
  },
  "/program/img/Snipaste_2022-07-19_15-45-46.png": {
    "type": "image/png",
    "etag": "\"668a-Zu2fRITcpAo7KeZR+ai0v1vL66I\"",
    "mtime": "2022-07-19T07:45:47.992Z",
    "size": 26250,
    "path": "../public/program/img/Snipaste_2022-07-19_15-45-46.png"
  },
  "/program/img/Snipaste_2022-07-19_15-48-40.png": {
    "type": "image/png",
    "etag": "\"4fd98-7eWiLchqqQutGbD5lmtJhUsBeMc\"",
    "mtime": "2022-07-19T07:48:41.808Z",
    "size": 327064,
    "path": "../public/program/img/Snipaste_2022-07-19_15-48-40.png"
  },
  "/program/img/Snipaste_2022-07-19_15-53-57.png": {
    "type": "image/png",
    "etag": "\"22323-ct9WjHc5s2amECtrcm8RtT4biR8\"",
    "mtime": "2022-07-19T07:53:59.460Z",
    "size": 140067,
    "path": "../public/program/img/Snipaste_2022-07-19_15-53-57.png"
  },
  "/program/img/Snipaste_2022-07-19_15-56-09.png": {
    "type": "image/png",
    "etag": "\"14d40-SlUvMKdIKaXVGXHOpekhNd6j0Dk\"",
    "mtime": "2022-07-19T07:56:11.515Z",
    "size": 85312,
    "path": "../public/program/img/Snipaste_2022-07-19_15-56-09.png"
  },
  "/program/img/Snipaste_2022-07-19_15-57-57.png": {
    "type": "image/png",
    "etag": "\"31682-vWi5OKsIzwKZeKOzEIObnKAB2lY\"",
    "mtime": "2022-07-19T07:57:59.092Z",
    "size": 202370,
    "path": "../public/program/img/Snipaste_2022-07-19_15-57-57.png"
  },
  "/program/img/Snipaste_2022-07-19_16-02-30.png": {
    "type": "image/png",
    "etag": "\"30191-JZJIjGwqUT1W+mXbZb4qYauDW5c\"",
    "mtime": "2022-07-19T08:02:32.130Z",
    "size": 197009,
    "path": "../public/program/img/Snipaste_2022-07-19_16-02-30.png"
  },
  "/program/img/Snipaste_2022-07-19_16-04-16.png": {
    "type": "image/png",
    "etag": "\"2866a-Bn0m11vmfbdvS8B53lIsJtHoFVQ\"",
    "mtime": "2022-07-19T08:04:18.314Z",
    "size": 165482,
    "path": "../public/program/img/Snipaste_2022-07-19_16-04-16.png"
  },
  "/program/img/Snipaste_2022-07-19_16-16-48.png": {
    "type": "image/png",
    "etag": "\"c418-TXnvuBRzNHPDP4kCCNPylc4T15Q\"",
    "mtime": "2022-07-19T08:16:50.945Z",
    "size": 50200,
    "path": "../public/program/img/Snipaste_2022-07-19_16-16-48.png"
  },
  "/program/img/Snipaste_2022-07-19_16-17-24.png": {
    "type": "image/png",
    "etag": "\"edb5-9KG6nu/Azg8wE3hee2RWWCY8b+g\"",
    "mtime": "2022-07-19T08:17:26.781Z",
    "size": 60853,
    "path": "../public/program/img/Snipaste_2022-07-19_16-17-24.png"
  },
  "/program/img/Snipaste_2022-07-19_16-21-11.png": {
    "type": "image/png",
    "etag": "\"13544-djxt5ULSxrwPQ34whsxOY5QxEpw\"",
    "mtime": "2022-07-19T08:21:13.712Z",
    "size": 79172,
    "path": "../public/program/img/Snipaste_2022-07-19_16-21-11.png"
  },
  "/program/img/Snipaste_2022-07-19_16-26-34.png": {
    "type": "image/png",
    "etag": "\"55788-v1TyTqZ+ILFpNowBG+F4PrtjU/I\"",
    "mtime": "2022-07-19T08:26:36.265Z",
    "size": 350088,
    "path": "../public/program/img/Snipaste_2022-07-19_16-26-34.png"
  },
  "/program/img/Snipaste_2022-07-19_16-30-42.png": {
    "type": "image/png",
    "etag": "\"1aa8b-u7XBRYI91XMdPOs5UH8PElV8Zl8\"",
    "mtime": "2022-07-19T08:30:44.479Z",
    "size": 109195,
    "path": "../public/program/img/Snipaste_2022-07-19_16-30-42.png"
  },
  "/program/img/Snipaste_2022-07-19_16-49-52.png": {
    "type": "image/png",
    "etag": "\"2905c-cm5+HoVXBInahf/fOZuA/K46eVo\"",
    "mtime": "2022-07-19T08:49:53.773Z",
    "size": 168028,
    "path": "../public/program/img/Snipaste_2022-07-19_16-49-52.png"
  },
  "/program/img/Snipaste_2022-07-19_16-58-25.png": {
    "type": "image/png",
    "etag": "\"c6af-3E2qjDx8pOET+fp3ybAi0z5ggxA\"",
    "mtime": "2022-07-19T08:58:27.529Z",
    "size": 50863,
    "path": "../public/program/img/Snipaste_2022-07-19_16-58-25.png"
  },
  "/program/img/Snipaste_2022-07-19_17-02-29.png": {
    "type": "image/png",
    "etag": "\"1305a-x5eQ9Nz6fUGoRDSidZ/D83g7ux8\"",
    "mtime": "2022-07-19T09:02:35.060Z",
    "size": 77914,
    "path": "../public/program/img/Snipaste_2022-07-19_17-02-29.png"
  },
  "/program/img/Snipaste_2022-07-19_17-52-20.png": {
    "type": "image/png",
    "etag": "\"2f4fa-jWcjznBvFkUeUUV/8T3FfPMwLs4\"",
    "mtime": "2022-07-19T09:52:23.870Z",
    "size": 193786,
    "path": "../public/program/img/Snipaste_2022-07-19_17-52-20.png"
  },
  "/program/img/Snipaste_2022-07-19_18-08-21.png": {
    "type": "image/png",
    "etag": "\"907a-xypfhofR3VBZEecC0jcVGHIDFhc\"",
    "mtime": "2022-07-19T10:08:22.761Z",
    "size": 36986,
    "path": "../public/program/img/Snipaste_2022-07-19_18-08-21.png"
  },
  "/program/img/Snipaste_2022-07-19_18-11-41.png": {
    "type": "image/png",
    "etag": "\"26c28-geGprAz3epG3X8W6cw/sZkLQubE\"",
    "mtime": "2022-07-19T10:11:44.065Z",
    "size": 158760,
    "path": "../public/program/img/Snipaste_2022-07-19_18-11-41.png"
  },
  "/program/img/Snipaste_2022-07-19_20-53-18.png": {
    "type": "image/png",
    "etag": "\"10d94-ZZH5763Rtwrd8iFGGSr6XN7GfzA\"",
    "mtime": "2022-07-19T12:53:20.041Z",
    "size": 69012,
    "path": "../public/program/img/Snipaste_2022-07-19_20-53-18.png"
  },
  "/program/img/Snipaste_2022-07-19_21-09-31.png": {
    "type": "image/png",
    "etag": "\"10214-Zz/e/1RCIvbscIjBc05vcaIhJYU\"",
    "mtime": "2022-07-19T13:09:33.178Z",
    "size": 66068,
    "path": "../public/program/img/Snipaste_2022-07-19_21-09-31.png"
  },
  "/program/img/Snipaste_2022-07-19_21-10-15.png": {
    "type": "image/png",
    "etag": "\"11e2d-ELrC2Ltc5ZR7EKfCXstHv6mHhCQ\"",
    "mtime": "2022-07-19T13:10:17.091Z",
    "size": 73261,
    "path": "../public/program/img/Snipaste_2022-07-19_21-10-15.png"
  },
  "/program/img/Snipaste_2022-07-19_21-11-20.png": {
    "type": "image/png",
    "etag": "\"10ee2-R1HiQBcKAdrXGU1cyY9aarfOlz0\"",
    "mtime": "2022-07-19T13:11:22.355Z",
    "size": 69346,
    "path": "../public/program/img/Snipaste_2022-07-19_21-11-20.png"
  },
  "/program/img/Snipaste_2022-07-19_21-12-20.png": {
    "type": "image/png",
    "etag": "\"12dbd-JnCewEC6wScAvi7VzFZxCIP/apo\"",
    "mtime": "2022-07-19T13:12:23.986Z",
    "size": 77245,
    "path": "../public/program/img/Snipaste_2022-07-19_21-12-20.png"
  },
  "/program/img/Snipaste_2022-07-19_21-23-28.png": {
    "type": "image/png",
    "etag": "\"18973-+Xtois+3vXvGeVnl9lBKDUYkSVk\"",
    "mtime": "2022-07-19T13:23:29.938Z",
    "size": 100723,
    "path": "../public/program/img/Snipaste_2022-07-19_21-23-28.png"
  },
  "/program/img/Snipaste_2022-07-19_21-24-24.png": {
    "type": "image/png",
    "etag": "\"4bb5-K708HPNzvSedVm9wdvGke5E1Idw\"",
    "mtime": "2022-07-19T13:24:26.715Z",
    "size": 19381,
    "path": "../public/program/img/Snipaste_2022-07-19_21-24-24.png"
  },
  "/program/img/Snipaste_2022-07-19_21-28-46.png": {
    "type": "image/png",
    "etag": "\"70c7-+tWPHrziLRcy9RJnFR4I+CqMsrw\"",
    "mtime": "2022-07-19T13:28:48.562Z",
    "size": 28871,
    "path": "../public/program/img/Snipaste_2022-07-19_21-28-46.png"
  },
  "/program/img/Snipaste_2022-07-19_21-57-14.png": {
    "type": "image/png",
    "etag": "\"53079-BJp5oG2ZYfIpXoL6FvPlFo0he/A\"",
    "mtime": "2022-07-19T13:57:15.894Z",
    "size": 340089,
    "path": "../public/program/img/Snipaste_2022-07-19_21-57-14.png"
  },
  "/program/img/Snipaste_2023-01-10_04-10-50.png": {
    "type": "image/png",
    "etag": "\"6b50-LTIaq7zIm6gF9u7REJ5lMR+Bncg\"",
    "mtime": "2023-01-09T20:11:00.072Z",
    "size": 27472,
    "path": "../public/program/img/Snipaste_2023-01-10_04-10-50.png"
  },
  "/program/img/Snipaste_2023-01-10_04-11-42.png": {
    "type": "image/png",
    "etag": "\"68d-3irDqo88z4HJsFxLOO0zkBvA738\"",
    "mtime": "2023-01-09T20:11:45.864Z",
    "size": 1677,
    "path": "../public/program/img/Snipaste_2023-01-10_04-11-42.png"
  },
  "/program/img/Snipaste_2023-01-10_04-12-20.png": {
    "type": "image/png",
    "etag": "\"1a82-jnpUUv4OwAUVGmuxIoJaqb9rOac\"",
    "mtime": "2023-01-09T20:12:22.846Z",
    "size": 6786,
    "path": "../public/program/img/Snipaste_2023-01-10_04-12-20.png"
  },
  "/program/img/Snipaste_2023-01-10_04-12-43.png": {
    "type": "image/png",
    "etag": "\"dbf-HG0EGBHtKmPFA6FD9UxO4kDYmAA\"",
    "mtime": "2023-01-09T20:12:46.697Z",
    "size": 3519,
    "path": "../public/program/img/Snipaste_2023-01-10_04-12-43.png"
  },
  "/program/img/Snipaste_2023-01-10_04-13-10.png": {
    "type": "image/png",
    "etag": "\"7cb-1OF5GlSRZ4GTiCSr3Rf6WeGb8wA\"",
    "mtime": "2023-01-09T20:13:12.546Z",
    "size": 1995,
    "path": "../public/program/img/Snipaste_2023-01-10_04-13-10.png"
  },
  "/program/img/Snipaste_2023-01-10_04-42-35.png": {
    "type": "image/png",
    "etag": "\"cae-eD7oZPB9V9y52fPQ/c+S39bWPKw\"",
    "mtime": "2023-01-09T20:42:51.070Z",
    "size": 3246,
    "path": "../public/program/img/Snipaste_2023-01-10_04-42-35.png"
  },
  "/program/imgs/001.png": {
    "type": "image/png",
    "etag": "\"16e39-5DwLRkE6sjGlFZnZ1JC5VHtM9wU\"",
    "mtime": "2021-03-19T02:22:07.065Z",
    "size": 93753,
    "path": "../public/program/imgs/001.png"
  },
  "/program/imgs/1111.png": {
    "type": "image/png",
    "etag": "\"a1f7-kLc/1uXtKNUdMfireKV4tA5f2UE\"",
    "mtime": "2021-03-19T02:22:06.939Z",
    "size": 41463,
    "path": "../public/program/imgs/1111.png"
  },
  "/program/imgs/1573636765632.png": {
    "type": "image/png",
    "etag": "\"d83-Ax8YbU9BVsqMiy2/CZZKGU13Aus\"",
    "mtime": "2021-11-05T01:50:06.000Z",
    "size": 3459,
    "path": "../public/program/imgs/1573636765632.png"
  },
  "/program/imgs/1573649804623.png": {
    "type": "image/png",
    "etag": "\"31f3-aeWPYJ/iFPkRPP5q5jzTlPCEdxM\"",
    "mtime": "2021-11-05T01:50:06.000Z",
    "size": 12787,
    "path": "../public/program/imgs/1573649804623.png"
  },
  "/program/imgs/1573650577429.png": {
    "type": "image/png",
    "etag": "\"475b-6lZj6JvhquHuLlyURHOpL+SNuyA\"",
    "mtime": "2021-11-05T01:50:06.000Z",
    "size": 18267,
    "path": "../public/program/imgs/1573650577429.png"
  },
  "/program/imgs/1573652396669.png": {
    "type": "image/png",
    "etag": "\"2218-GyP2qRZpo0w4Qvp/vH3ogIccLNU\"",
    "mtime": "2021-11-05T01:50:06.000Z",
    "size": 8728,
    "path": "../public/program/imgs/1573652396669.png"
  },
  "/program/imgs/1573680821167.png": {
    "type": "image/png",
    "etag": "\"297f2-G2BHZKNFxTZ2pydM6YvgNu1k1bU\"",
    "mtime": "2021-11-05T01:50:06.000Z",
    "size": 169970,
    "path": "../public/program/imgs/1573680821167.png"
  },
  "/program/imgs/1581240737074.png": {
    "type": "image/png",
    "etag": "\"b79e-D55v+v2bXzHfY08uB16/uqIEXWY\"",
    "mtime": "2021-03-19T02:22:07.597Z",
    "size": 47006,
    "path": "../public/program/imgs/1581240737074.png"
  },
  "/program/imgs/1581241309080.png": {
    "type": "image/png",
    "etag": "\"b510-/4uo+GWZXUqj+C7JPQGJnEjg5JI\"",
    "mtime": "2021-03-19T02:22:07.449Z",
    "size": 46352,
    "path": "../public/program/imgs/1581241309080.png"
  },
  "/program/imgs/1581251456109.png": {
    "type": "image/png",
    "etag": "\"9d15-zKvUrhx3bYWrML/MpQV7q/v+A8g\"",
    "mtime": "2021-03-19T02:22:07.787Z",
    "size": 40213,
    "path": "../public/program/imgs/1581251456109.png"
  },
  "/program/imgs/1581254477785.png": {
    "type": "image/png",
    "etag": "\"2f74-oj96CW/gq256tdF992/jqK14UyU\"",
    "mtime": "2021-03-19T02:22:07.870Z",
    "size": 12148,
    "path": "../public/program/imgs/1581254477785.png"
  },
  "/program/imgs/1581254482869.png": {
    "type": "image/png",
    "etag": "\"2f74-oj96CW/gq256tdF992/jqK14UyU\"",
    "mtime": "2021-03-19T02:22:08.037Z",
    "size": 12148,
    "path": "../public/program/imgs/1581254482869.png"
  },
  "/program/imgs/1581254484209.png": {
    "type": "image/png",
    "etag": "\"2f74-oj96CW/gq256tdF992/jqK14UyU\"",
    "mtime": "2021-03-19T02:22:08.158Z",
    "size": 12148,
    "path": "../public/program/imgs/1581254484209.png"
  },
  "/program/imgs/1581600836129.png": {
    "type": "image/png",
    "etag": "\"1839a9-W3qj3Zm9hzDlMoKkvnnQL2Hm7eI\"",
    "mtime": "2021-03-19T02:22:13.246Z",
    "size": 1587625,
    "path": "../public/program/imgs/1581600836129.png"
  },
  "/program/imgs/1581601233060.png": {
    "type": "image/png",
    "etag": "\"1ec8-biJjVATFtmvdL1Su/g47SFhYwrs\"",
    "mtime": "2021-03-19T02:22:08.674Z",
    "size": 7880,
    "path": "../public/program/imgs/1581601233060.png"
  },
  "/program/imgs/1581608541470.png": {
    "type": "image/png",
    "etag": "\"14775-IHtSe2RiuuaYS07x8HHzmvCLszg\"",
    "mtime": "2021-03-19T02:22:09.107Z",
    "size": 83829,
    "path": "../public/program/imgs/1581608541470.png"
  },
  "/program/imgs/1581672842954.png": {
    "type": "image/png",
    "etag": "\"26a3-85KN/gD4kA0pPKVFjrcpQcre1OA\"",
    "mtime": "2021-03-19T02:22:09.353Z",
    "size": 9891,
    "path": "../public/program/imgs/1581672842954.png"
  },
  "/program/imgs/1581770924779.png": {
    "type": "image/png",
    "etag": "\"292c-cx9u+6Pt9pprYbtPHZrgMJz7jYQ\"",
    "mtime": "2021-03-19T02:22:09.632Z",
    "size": 10540,
    "path": "../public/program/imgs/1581770924779.png"
  },
  "/program/imgs/1581774713853.png": {
    "type": "image/png",
    "etag": "\"80c-IlIvDElc7CmO/5yMxcZnY+KQ4FU\"",
    "mtime": "2021-03-19T02:22:10.108Z",
    "size": 2060,
    "path": "../public/program/imgs/1581774713853.png"
  },
  "/program/imgs/1581831142031.png": {
    "type": "image/png",
    "etag": "\"161db-0GSapsig4ht1kY9UF0akKgRgkTg\"",
    "mtime": "2021-03-19T02:22:10.511Z",
    "size": 90587,
    "path": "../public/program/imgs/1581831142031.png"
  },
  "/program/imgs/1581905637539.png": {
    "type": "image/png",
    "etag": "\"19c71-sIhB4Xg3WEvHtzA5O0/kkOQRtgQ\"",
    "mtime": "2021-03-19T02:22:10.944Z",
    "size": 105585,
    "path": "../public/program/imgs/1581905637539.png"
  },
  "/program/imgs/1581906045538.png": {
    "type": "image/png",
    "etag": "\"1642c-Sn5sscNqi3u1TbQng/kgwWHcW7M\"",
    "mtime": "2021-03-19T02:22:11.368Z",
    "size": 91180,
    "path": "../public/program/imgs/1581906045538.png"
  },
  "/program/imgs/1581916975134.png": {
    "type": "image/png",
    "etag": "\"672c-V47TdrMHAOcdVmSYfoVFvoEViM8\"",
    "mtime": "2021-03-19T02:22:11.676Z",
    "size": 26412,
    "path": "../public/program/imgs/1581916975134.png"
  },
  "/program/imgs/1582000644409.png": {
    "type": "image/png",
    "etag": "\"1a32e-kt4/e2obYBUBM3Hy1T/AotC4Kz4\"",
    "mtime": "2021-03-19T02:22:12.118Z",
    "size": 107310,
    "path": "../public/program/imgs/1582000644409.png"
  },
  "/program/imgs/2019-12-22_111802.png": {
    "type": "image/png",
    "etag": "\"76ca3-RQ18ul49vK7AagcqFdRPwB21l3Y\"",
    "mtime": "2021-03-19T02:22:13.851Z",
    "size": 486563,
    "path": "../public/program/imgs/2019-12-22_111802.png"
  },
  "/program/imgs/2019-12-22_155826.png": {
    "type": "image/png",
    "etag": "\"10c89-oTZaez9JIdQjnXZCEXw2KdHSlFk\"",
    "mtime": "2021-03-19T02:22:14.172Z",
    "size": 68745,
    "path": "../public/program/imgs/2019-12-22_155826.png"
  },
  "/program/imgs/2019-12-22_160710.png": {
    "type": "image/png",
    "etag": "\"3502-K9Qb5i+7qUF1A26KJb2pZ3/k42M\"",
    "mtime": "2021-03-19T02:22:14.155Z",
    "size": 13570,
    "path": "../public/program/imgs/2019-12-22_160710.png"
  },
  "/program/imgs/2019-12-22_182748.png": {
    "type": "image/png",
    "etag": "\"367d-fhLG/F2kInBiPuXqydWBJdYmFjs\"",
    "mtime": "2021-03-19T02:22:14.486Z",
    "size": 13949,
    "path": "../public/program/imgs/2019-12-22_182748.png"
  },
  "/program/imgs/2019-12-22_183033.png": {
    "type": "image/png",
    "etag": "\"8f6-9/qBQgIMv++XoTdoS1rxvjKgke4\"",
    "mtime": "2021-03-19T02:22:14.477Z",
    "size": 2294,
    "path": "../public/program/imgs/2019-12-22_183033.png"
  },
  "/program/imgs/2019-12-22_183134.png": {
    "type": "image/png",
    "etag": "\"38af-owqY4qy1dVqwp6yEAtyE01EU0hY\"",
    "mtime": "2021-03-19T02:22:14.820Z",
    "size": 14511,
    "path": "../public/program/imgs/2019-12-22_183134.png"
  },
  "/program/imgs/2019-12-22_183607.png": {
    "type": "image/png",
    "etag": "\"27ed-WjQ6zAOOI1DUP9ADLFWH4YlbF+E\"",
    "mtime": "2021-03-19T02:22:15.200Z",
    "size": 10221,
    "path": "../public/program/imgs/2019-12-22_183607.png"
  },
  "/program/imgs/2019-12-22_201756.png": {
    "type": "image/png",
    "etag": "\"35d4-1bJzSv0f5UDQNZnRs0TrFW2wvcw\"",
    "mtime": "2021-03-19T02:22:15.066Z",
    "size": 13780,
    "path": "../public/program/imgs/2019-12-22_201756.png"
  },
  "/program/imgs/2019-12-22_204450.png": {
    "type": "image/png",
    "etag": "\"1fc2-Ks3BQPRoj9D88NlXwYPt90ZRccE\"",
    "mtime": "2021-03-19T02:22:15.339Z",
    "size": 8130,
    "path": "../public/program/imgs/2019-12-22_204450.png"
  },
  "/program/imgs/2019-12-22_204952.png": {
    "type": "image/png",
    "etag": "\"1e6e-YoG+CpFZSLprRZvf7NuQX9tkv5s\"",
    "mtime": "2021-03-19T02:22:15.501Z",
    "size": 7790,
    "path": "../public/program/imgs/2019-12-22_204952.png"
  },
  "/program/imgs/2019-12-22_212810.png": {
    "type": "image/png",
    "etag": "\"351a-fABbZKF1vg2FDtisr2Oqe7kStxs\"",
    "mtime": "2021-03-19T02:22:15.707Z",
    "size": 13594,
    "path": "../public/program/imgs/2019-12-22_212810.png"
  },
  "/program/imgs/2019-12-22_213135.png": {
    "type": "image/png",
    "etag": "\"142f-wb7lY3pRANpCJEQp9i3rmM0W1sE\"",
    "mtime": "2021-03-19T02:22:15.809Z",
    "size": 5167,
    "path": "../public/program/imgs/2019-12-22_213135.png"
  },
  "/program/imgs/2019-12-23_221350.png": {
    "type": "image/png",
    "etag": "\"7e8a-Q+kO8X+HOJNDEVv1jMv7VZLP6Bc\"",
    "mtime": "2021-03-19T02:22:16.012Z",
    "size": 32394,
    "path": "../public/program/imgs/2019-12-23_221350.png"
  },
  "/program/imgs/2019-12-23_225201.png": {
    "type": "image/png",
    "etag": "\"b49-C9EYbhWyZYaflb1ErNnbAhRUpY4\"",
    "mtime": "2021-03-19T02:22:16.101Z",
    "size": 2889,
    "path": "../public/program/imgs/2019-12-23_225201.png"
  },
  "/program/imgs/2020-02-04_120708.png": {
    "type": "image/png",
    "etag": "\"c25-QDLiTng9egpCusMxftl/gN0hQ38\"",
    "mtime": "2021-03-19T02:22:16.289Z",
    "size": 3109,
    "path": "../public/program/imgs/2020-02-04_120708.png"
  },
  "/program/imgs/2020-02-04_120827.png": {
    "type": "image/png",
    "etag": "\"c86-RLgJ5e9G0b9kdrxVzuph47XSt9U\"",
    "mtime": "2021-03-19T02:22:16.652Z",
    "size": 3206,
    "path": "../public/program/imgs/2020-02-04_120827.png"
  },
  "/program/imgs/2020-02-04_120955.png": {
    "type": "image/png",
    "etag": "\"d3b-ckbz167P6X1qFw5cy/2pch7XT/s\"",
    "mtime": "2021-03-19T02:22:16.870Z",
    "size": 3387,
    "path": "../public/program/imgs/2020-02-04_120955.png"
  },
  "/program/imgs/2020-02-04_121041.png": {
    "type": "image/png",
    "etag": "\"8bd-97Cs3EYHHO2MpxWU5dwVgRNSEwc\"",
    "mtime": "2021-03-19T02:22:16.963Z",
    "size": 2237,
    "path": "../public/program/imgs/2020-02-04_121041.png"
  },
  "/program/imgs/2020-02-04_121606.png": {
    "type": "image/png",
    "etag": "\"3e7-GS2BpdHAmOdfYdGbzCVZSTd2ZgI\"",
    "mtime": "2021-03-19T02:22:17.239Z",
    "size": 999,
    "path": "../public/program/imgs/2020-02-04_121606.png"
  },
  "/program/imgs/2020-02-04_123052.png": {
    "type": "image/png",
    "etag": "\"1f74-5Y4N4kglVcKtEn4dMnodo2C3bMs\"",
    "mtime": "2021-03-19T02:22:17.216Z",
    "size": 8052,
    "path": "../public/program/imgs/2020-02-04_123052.png"
  },
  "/program/imgs/2020-02-04_124804.png": {
    "type": "image/png",
    "etag": "\"8c4-diITjizmR/GtG2DQYkzKkVpF5zs\"",
    "mtime": "2021-03-19T02:22:17.778Z",
    "size": 2244,
    "path": "../public/program/imgs/2020-02-04_124804.png"
  },
  "/program/imgs/2020-02-04_125034.png": {
    "type": "image/png",
    "etag": "\"6dcc-kFrElbIiFL9mjSXxtwAeIItIg50\"",
    "mtime": "2021-03-19T02:22:17.586Z",
    "size": 28108,
    "path": "../public/program/imgs/2020-02-04_125034.png"
  },
  "/program/imgs/2020-02-04_125441.png": {
    "type": "image/png",
    "etag": "\"4676-eMoN8TrNYE89lh1PKy0/4jKpshg\"",
    "mtime": "2021-03-19T02:22:17.894Z",
    "size": 18038,
    "path": "../public/program/imgs/2020-02-04_125441.png"
  },
  "/program/imgs/2020-02-04_125630.png": {
    "type": "image/png",
    "etag": "\"95e-660EIthc48E1qmj6LQVW55jY3DM\"",
    "mtime": "2021-03-19T02:22:18.040Z",
    "size": 2398,
    "path": "../public/program/imgs/2020-02-04_125630.png"
  },
  "/program/imgs/2020-02-04_125851.png": {
    "type": "image/png",
    "etag": "\"2a7-KdJt4X1nKzaFHaPy/kxWr7dL4+k\"",
    "mtime": "2021-03-19T02:22:18.169Z",
    "size": 679,
    "path": "../public/program/imgs/2020-02-04_125851.png"
  },
  "/program/imgs/2020-02-04_130034.png": {
    "type": "image/png",
    "etag": "\"5366-NRtU13MAhnDh6KGl9yFNtpow+3o\"",
    "mtime": "2021-03-19T02:22:18.331Z",
    "size": 21350,
    "path": "../public/program/imgs/2020-02-04_130034.png"
  },
  "/program/imgs/2020-02-04_130324.png": {
    "type": "image/png",
    "etag": "\"17ab-Zd7+FeFAhR5XIWqTGZ6Zmr2mx8k\"",
    "mtime": "2021-03-19T02:22:18.419Z",
    "size": 6059,
    "path": "../public/program/imgs/2020-02-04_130324.png"
  },
  "/program/imgs/2020-02-04_130847.png": {
    "type": "image/png",
    "etag": "\"4fe-cE5mwzNVYTzOAbyDwkCCYJ8SO88\"",
    "mtime": "2021-03-19T02:22:18.620Z",
    "size": 1278,
    "path": "../public/program/imgs/2020-02-04_130847.png"
  },
  "/program/imgs/2020-02-04_131046.png": {
    "type": "image/png",
    "etag": "\"1d49-I9oQ3GDCP1yBfleFcNd3QUBNtYU\"",
    "mtime": "2021-03-19T02:22:18.682Z",
    "size": 7497,
    "path": "../public/program/imgs/2020-02-04_131046.png"
  },
  "/program/imgs/2020-02-04_131238.png": {
    "type": "image/png",
    "etag": "\"55c-ddIg/f4VTcZw8ql38yPbpDii4TY\"",
    "mtime": "2021-03-19T02:22:18.884Z",
    "size": 1372,
    "path": "../public/program/imgs/2020-02-04_131238.png"
  },
  "/program/imgs/2020-02-04_131550.png": {
    "type": "image/png",
    "etag": "\"c54-IwO1Xa0S5D5e/oLNZcSiYHAk/aU\"",
    "mtime": "2021-03-19T02:22:18.992Z",
    "size": 3156,
    "path": "../public/program/imgs/2020-02-04_131550.png"
  },
  "/program/imgs/2020-02-04_131801.png": {
    "type": "image/png",
    "etag": "\"1218a-KstNYt3W1N7kR8cf4qrrXOHmpD0\"",
    "mtime": "2021-03-19T02:22:19.256Z",
    "size": 74122,
    "path": "../public/program/imgs/2020-02-04_131801.png"
  },
  "/program/imgs/2020-02-05_135654.png": {
    "type": "image/png",
    "etag": "\"a8a-wq8ROZ2kzq3LzM5JCm8FANMgXrI\"",
    "mtime": "2021-03-19T02:22:19.338Z",
    "size": 2698,
    "path": "../public/program/imgs/2020-02-05_135654.png"
  },
  "/program/imgs/2020-02-05_135948.png": {
    "type": "image/png",
    "etag": "\"25d7-TWWS2xR5jyJaQhfUI5ovwB5fnqQ\"",
    "mtime": "2021-03-19T02:22:19.543Z",
    "size": 9687,
    "path": "../public/program/imgs/2020-02-05_135948.png"
  },
  "/program/imgs/2020-02-05_140208.png": {
    "type": "image/png",
    "etag": "\"215a-qiCFMu6zXsWMUzQeihU5YtasLWw\"",
    "mtime": "2021-03-19T02:22:20.298Z",
    "size": 8538,
    "path": "../public/program/imgs/2020-02-05_140208.png"
  },
  "/program/imgs/2020-02-05_140523.png": {
    "type": "image/png",
    "etag": "\"3d7f-9sW8586iusE6y3zVyqpN/+pwlMM\"",
    "mtime": "2021-03-19T02:22:19.862Z",
    "size": 15743,
    "path": "../public/program/imgs/2020-02-05_140523.png"
  },
  "/program/imgs/2020-02-05_171038.png": {
    "type": "image/png",
    "etag": "\"75dd-C9naO8SPn31eBFiBZj8CjPtpeLM\"",
    "mtime": "2021-03-19T02:22:20.131Z",
    "size": 30173,
    "path": "../public/program/imgs/2020-02-05_171038.png"
  },
  "/program/imgs/2020-02-05_172533.png": {
    "type": "image/png",
    "etag": "\"33ae-Q6sjHO2ysmkQtRh+oDA3Sv2dLqw\"",
    "mtime": "2021-03-19T02:22:20.380Z",
    "size": 13230,
    "path": "../public/program/imgs/2020-02-05_172533.png"
  },
  "/program/imgs/2020-02-05_173832.png": {
    "type": "image/png",
    "etag": "\"7ef4-aN4g/W97rCpL03alX3Qg4hPrlfc\"",
    "mtime": "2021-03-19T02:22:20.675Z",
    "size": 32500,
    "path": "../public/program/imgs/2020-02-05_173832.png"
  },
  "/program/imgs/2020-02-05_174323.png": {
    "type": "image/png",
    "etag": "\"c16f-6oFPSt/CwAzZ8BSu5B4nkQdxsEY\"",
    "mtime": "2021-03-19T02:22:20.708Z",
    "size": 49519,
    "path": "../public/program/imgs/2020-02-05_174323.png"
  },
  "/program/imgs/2020-02-05_174830.png": {
    "type": "image/png",
    "etag": "\"33c0-uHUDDycFbjGJ+8KmY4zyQSPhhiY\"",
    "mtime": "2021-03-19T02:22:21.236Z",
    "size": 13248,
    "path": "../public/program/imgs/2020-02-05_174830.png"
  },
  "/program/imgs/2020-02-05_175549.png": {
    "type": "image/png",
    "etag": "\"2c73-qAI+pOi990CrxlDaDVR3CYyn6ak\"",
    "mtime": "2021-03-19T02:22:21.039Z",
    "size": 11379,
    "path": "../public/program/imgs/2020-02-05_175549.png"
  },
  "/program/imgs/2020-02-05_182151.png": {
    "type": "image/png",
    "etag": "\"109c-ixRK8FU1nmCoY1nwx6n3ALOdXmk\"",
    "mtime": "2021-03-19T02:22:21.400Z",
    "size": 4252,
    "path": "../public/program/imgs/2020-02-05_182151.png"
  },
  "/program/imgs/2020-02-05_183034.png": {
    "type": "image/png",
    "etag": "\"12891-BAQnhWve2v1zoGtSScaT5zp1iL0\"",
    "mtime": "2021-03-19T02:22:21.572Z",
    "size": 75921,
    "path": "../public/program/imgs/2020-02-05_183034.png"
  },
  "/program/imgs/2020-02-05_183557.png": {
    "type": "image/png",
    "etag": "\"c24b-KbfZxw1l4OrSRoh7XHmXVo3lasE\"",
    "mtime": "2021-03-19T02:22:21.779Z",
    "size": 49739,
    "path": "../public/program/imgs/2020-02-05_183557.png"
  },
  "/program/imgs/2020-02-05_190244.png": {
    "type": "image/png",
    "etag": "\"d8ec-U5CXr/VEMY51O8o+ohCGQZglY/g\"",
    "mtime": "2021-03-19T02:22:21.867Z",
    "size": 55532,
    "path": "../public/program/imgs/2020-02-05_190244.png"
  },
  "/program/imgs/2020-02-05_190548.png": {
    "type": "image/png",
    "etag": "\"1e14-T5Z2aGxoRMgsvWRNESldb9lzhHM\"",
    "mtime": "2021-03-19T02:22:22.056Z",
    "size": 7700,
    "path": "../public/program/imgs/2020-02-05_190548.png"
  },
  "/program/imgs/2020-02-05_191041.png": {
    "type": "image/png",
    "etag": "\"d351-C50GekhJd9I7FFbv5Yi8AGmLS+4\"",
    "mtime": "2021-03-19T02:22:22.303Z",
    "size": 54097,
    "path": "../public/program/imgs/2020-02-05_191041.png"
  },
  "/program/imgs/2020-02-05_191713.png": {
    "type": "image/png",
    "etag": "\"adf1-bA4f/Z8Dq1vpCbaf5cmOiRM/T18\"",
    "mtime": "2021-03-19T02:22:22.683Z",
    "size": 44529,
    "path": "../public/program/imgs/2020-02-05_191713.png"
  },
  "/program/imgs/2020-02-09_114529.png": {
    "type": "image/png",
    "etag": "\"852b-ujkqGMgbrqyUtj9L1T9S8agWseQ\"",
    "mtime": "2021-03-19T02:22:22.668Z",
    "size": 34091,
    "path": "../public/program/imgs/2020-02-09_114529.png"
  },
  "/program/imgs/2020-02-09_115314.png": {
    "type": "image/png",
    "etag": "\"1907-IKCDeuG0SjbGjUSSDyiHwWxhcrI\"",
    "mtime": "2021-03-19T02:22:22.952Z",
    "size": 6407,
    "path": "../public/program/imgs/2020-02-09_115314.png"
  },
  "/program/imgs/2020-02-09_174618.png": {
    "type": "image/png",
    "etag": "\"2aa41-s6351cgv2H2cC9BOh6HHHmqAjO4\"",
    "mtime": "2021-03-19T02:22:23.353Z",
    "size": 174657,
    "path": "../public/program/imgs/2020-02-09_174618.png"
  },
  "/program/imgs/2020-02-09_175634.png": {
    "type": "image/png",
    "etag": "\"3abe-RhAbbsnjJwPfmfea8wiq3UKpfwg\"",
    "mtime": "2021-03-19T02:22:23.285Z",
    "size": 15038,
    "path": "../public/program/imgs/2020-02-09_175634.png"
  },
  "/program/imgs/2020-02-09_180244.png": {
    "type": "image/png",
    "etag": "\"3208-GEsGBGbIHFBR2S0OX367V65LlJg\"",
    "mtime": "2021-03-19T02:22:23.818Z",
    "size": 12808,
    "path": "../public/program/imgs/2020-02-09_180244.png"
  },
  "/program/imgs/2020-02-09_202315.png": {
    "type": "image/png",
    "etag": "\"1406-smmF6XBoJrDuKbap1jZsTM5sy7o\"",
    "mtime": "2021-03-19T02:22:23.611Z",
    "size": 5126,
    "path": "../public/program/imgs/2020-02-09_202315.png"
  },
  "/program/imgs/2020-02-09_203024.png": {
    "type": "image/png",
    "etag": "\"879b-g+rC+u+Xiv729M5jkZsLS4TpkT4\"",
    "mtime": "2021-03-19T02:22:24.218Z",
    "size": 34715,
    "path": "../public/program/imgs/2020-02-09_203024.png"
  },
  "/program/imgs/2020-02-09_211511.png": {
    "type": "image/png",
    "etag": "\"b80-cwCU+lsk/vnYLlhUheg4R+jsmNg\"",
    "mtime": "2021-03-19T02:22:24.114Z",
    "size": 2944,
    "path": "../public/program/imgs/2020-02-09_211511.png"
  },
  "/program/imgs/2020-02-09_211856.png": {
    "type": "image/png",
    "etag": "\"24b7-pbkovss3uf88M1eviejcBO7G7Kw\"",
    "mtime": "2021-03-19T02:22:24.382Z",
    "size": 9399,
    "path": "../public/program/imgs/2020-02-09_211856.png"
  },
  "/program/imgs/2020-02-09_212055.png": {
    "type": "image/png",
    "etag": "\"2001-tc/RAl8hhpPTiNdV8wACVv3ume4\"",
    "mtime": "2021-03-19T02:22:24.639Z",
    "size": 8193,
    "path": "../public/program/imgs/2020-02-09_212055.png"
  },
  "/program/imgs/2020-02-09_213217.png": {
    "type": "image/png",
    "etag": "\"130c-+b9woqnzCL9NoY6iH2qPRosfHlw\"",
    "mtime": "2021-03-19T02:22:24.994Z",
    "size": 4876,
    "path": "../public/program/imgs/2020-02-09_213217.png"
  },
  "/program/imgs/2020-02-09_213638.png": {
    "type": "image/png",
    "etag": "\"343b-fi33Pg2SqLMkmEflhA7xTCo63I0\"",
    "mtime": "2021-03-19T02:22:24.974Z",
    "size": 13371,
    "path": "../public/program/imgs/2020-02-09_213638.png"
  },
  "/program/imgs/2020-02-09_213755.png": {
    "type": "image/png",
    "etag": "\"15ac-DYbUU84IyqSo/+XYU/ATPj74ONI\"",
    "mtime": "2021-03-19T02:22:25.308Z",
    "size": 5548,
    "path": "../public/program/imgs/2020-02-09_213755.png"
  },
  "/program/imgs/2020-02-13_214028.png": {
    "type": "image/png",
    "etag": "\"12c7-H6z8e6LQh7bkptGf0EWSm2VAxHQ\"",
    "mtime": "2021-03-19T02:22:25.266Z",
    "size": 4807,
    "path": "../public/program/imgs/2020-02-13_214028.png"
  },
  "/program/imgs/2020-02-13_214150.png": {
    "type": "image/png",
    "etag": "\"10476-J4q8fJVFSYnnFDxIMHeuqQ6VsfA\"",
    "mtime": "2021-03-19T02:22:25.894Z",
    "size": 66678,
    "path": "../public/program/imgs/2020-02-13_214150.png"
  },
  "/program/imgs/2020-02-13_214309.png": {
    "type": "image/png",
    "etag": "\"6d57-NDSK4aAdQIDeJjzabKkOqSl1v7s\"",
    "mtime": "2021-03-19T02:22:25.660Z",
    "size": 27991,
    "path": "../public/program/imgs/2020-02-13_214309.png"
  },
  "/program/imgs/2020-02-13_231822.png": {
    "type": "image/png",
    "etag": "\"14279-Kz08TFI+Ao9Uw+9itIijB7u5hoM\"",
    "mtime": "2021-03-19T02:22:26.270Z",
    "size": 82553,
    "path": "../public/program/imgs/2020-02-13_231822.png"
  },
  "/program/imgs/2020-02-14_165954.png": {
    "type": "image/png",
    "etag": "\"51e1-zlg364gtyH1gO6SWvgn/vFG5GMs\"",
    "mtime": "2021-03-19T02:22:26.321Z",
    "size": 20961,
    "path": "../public/program/imgs/2020-02-14_165954.png"
  },
  "/program/imgs/2020-02-14_170052.png": {
    "type": "image/png",
    "etag": "\"517b-dYWbEUB76I90g4O7KEUdNmjlOmk\"",
    "mtime": "2021-03-19T02:22:26.600Z",
    "size": 20859,
    "path": "../public/program/imgs/2020-02-14_170052.png"
  },
  "/program/imgs/2020-02-14_170312.png": {
    "type": "image/png",
    "etag": "\"f836-rDjRloAU9tBzBl8QsBmrXpicPcg\"",
    "mtime": "2021-03-19T02:22:26.734Z",
    "size": 63542,
    "path": "../public/program/imgs/2020-02-14_170312.png"
  },
  "/program/imgs/2020-02-14_171445.png": {
    "type": "image/png",
    "etag": "\"fee6-tdQLhnTCyfLf7AOLrLD2VTDeH+M\"",
    "mtime": "2021-03-19T02:22:26.928Z",
    "size": 65254,
    "path": "../public/program/imgs/2020-02-14_171445.png"
  },
  "/program/imgs/2020-02-14_171626.png": {
    "type": "image/png",
    "etag": "\"a991-vdwFrle/bEJekT8MWomIiNCDoFQ\"",
    "mtime": "2021-03-19T02:22:27.202Z",
    "size": 43409,
    "path": "../public/program/imgs/2020-02-14_171626.png"
  },
  "/program/imgs/2020-02-14_172756.png": {
    "type": "image/png",
    "etag": "\"681-EJV8P54aQc8h6mwdcss7TpSFDfc\"",
    "mtime": "2021-03-19T02:22:27.318Z",
    "size": 1665,
    "path": "../public/program/imgs/2020-02-14_172756.png"
  },
  "/program/imgs/2020-02-14_175821.png": {
    "type": "image/png",
    "etag": "\"153c9-o+g2XyyEA4E/N16MzjKYa93TmDA\"",
    "mtime": "2021-03-19T02:22:27.490Z",
    "size": 86985,
    "path": "../public/program/imgs/2020-02-14_175821.png"
  },
  "/program/imgs/2020-02-14_175844.png": {
    "type": "image/png",
    "etag": "\"14edb-9qQyjIT1692YkCpmdRvbiJTGtCM\"",
    "mtime": "2021-03-19T02:22:27.719Z",
    "size": 85723,
    "path": "../public/program/imgs/2020-02-14_175844.png"
  },
  "/program/imgs/2020-02-14_220617.png": {
    "type": "image/png",
    "etag": "\"f0d-M09wXoIbViIbuICRI1yWlDhvA44\"",
    "mtime": "2021-03-19T02:22:27.868Z",
    "size": 3853,
    "path": "../public/program/imgs/2020-02-14_220617.png"
  },
  "/program/imgs/2020-02-14_223845.png": {
    "type": "image/png",
    "etag": "\"220f-DZNBUFTIN1K8HbmMjcxN1mw8Glk\"",
    "mtime": "2021-03-19T02:22:27.989Z",
    "size": 8719,
    "path": "../public/program/imgs/2020-02-14_223845.png"
  },
  "/program/imgs/2020-02-14_230646.png": {
    "type": "image/png",
    "etag": "\"c569-tkZJqjVG21oPbTuheETGmAZH0MQ\"",
    "mtime": "2021-03-19T02:22:28.322Z",
    "size": 50537,
    "path": "../public/program/imgs/2020-02-14_230646.png"
  },
  "/program/imgs/2020-02-15_001634.png": {
    "type": "image/png",
    "etag": "\"5d8b-0JDj+1+uNA+K7T7UU1jgwJ4lQuE\"",
    "mtime": "2021-03-19T02:22:28.263Z",
    "size": 23947,
    "path": "../public/program/imgs/2020-02-15_001634.png"
  },
  "/program/imgs/2020-02-15_001655.png": {
    "type": "image/png",
    "etag": "\"91ba-+lGZaqE5eDji3SN6Ybs28MusrLQ\"",
    "mtime": "2021-03-19T02:22:28.585Z",
    "size": 37306,
    "path": "../public/program/imgs/2020-02-15_001655.png"
  },
  "/program/imgs/2020-02-15_001958.png": {
    "type": "image/png",
    "etag": "\"9f79-ABk9uXVUMRLl6Lx5W5+NTWKbp9g\"",
    "mtime": "2021-03-19T02:22:28.645Z",
    "size": 40825,
    "path": "../public/program/imgs/2020-02-15_001958.png"
  },
  "/program/imgs/2020-02-15_002440.png": {
    "type": "image/png",
    "etag": "\"9c46-taLUpq/nd3LdIQWg/dZrgsxQ6kw\"",
    "mtime": "2021-03-19T02:22:28.937Z",
    "size": 40006,
    "path": "../public/program/imgs/2020-02-15_002440.png"
  },
  "/program/imgs/2020-02-15_094215.png": {
    "type": "image/png",
    "etag": "\"7bd9-jyOCGmWRnzuhSe3GwvEOlvcqt3g\"",
    "mtime": "2021-03-19T02:22:28.950Z",
    "size": 31705,
    "path": "../public/program/imgs/2020-02-15_094215.png"
  },
  "/program/imgs/2020-02-15_094631.png": {
    "type": "image/png",
    "etag": "\"9132-n74q0PckAA6AsvMM6/+0n0LrZhg\"",
    "mtime": "2021-03-19T02:22:29.298Z",
    "size": 37170,
    "path": "../public/program/imgs/2020-02-15_094631.png"
  },
  "/program/imgs/2020-02-15_100838.png": {
    "type": "image/png",
    "etag": "\"8863-PyvJkiknuXUllm+G3LNuISt2NaU\"",
    "mtime": "2021-03-19T02:22:29.350Z",
    "size": 34915,
    "path": "../public/program/imgs/2020-02-15_100838.png"
  },
  "/program/imgs/2020-02-15_101316.png": {
    "type": "image/png",
    "etag": "\"78f2-Cf3AXADB1JiD5M2nlJok7yYDPvQ\"",
    "mtime": "2021-03-19T02:22:29.612Z",
    "size": 30962,
    "path": "../public/program/imgs/2020-02-15_101316.png"
  },
  "/program/imgs/2020-02-15_103042.png": {
    "type": "image/png",
    "etag": "\"9272-pS5PBUfsbzN+XsrBKMaSea13qSk\"",
    "mtime": "2021-03-19T02:22:29.752Z",
    "size": 37490,
    "path": "../public/program/imgs/2020-02-15_103042.png"
  },
  "/program/imgs/2020-02-15_115814.png": {
    "type": "image/png",
    "etag": "\"5e51-DDbnGth3PE4GpBU/GTvtsUo5xeM\"",
    "mtime": "2021-03-19T02:22:29.901Z",
    "size": 24145,
    "path": "../public/program/imgs/2020-02-15_115814.png"
  },
  "/program/imgs/2020-02-15_125323.png": {
    "type": "image/png",
    "etag": "\"8298-DClh5kJ6Gc4tKp/qp/jVh9D/TCw\"",
    "mtime": "2021-03-19T02:22:30.050Z",
    "size": 33432,
    "path": "../public/program/imgs/2020-02-15_125323.png"
  },
  "/program/imgs/2020-02-15_140025.png": {
    "type": "image/png",
    "etag": "\"81bc-bvauofB9uLRljTWPbCrPm6vwhE0\"",
    "mtime": "2021-03-19T02:22:30.270Z",
    "size": 33212,
    "path": "../public/program/imgs/2020-02-15_140025.png"
  },
  "/program/imgs/2020-02-15_145844.png": {
    "type": "image/png",
    "etag": "\"6b30-PHUxUDdkdA5lNfq353TBpudoiy8\"",
    "mtime": "2021-03-19T02:22:30.381Z",
    "size": 27440,
    "path": "../public/program/imgs/2020-02-15_145844.png"
  },
  "/program/imgs/2020-02-15_162746.png": {
    "type": "image/png",
    "etag": "\"378e-yrPSe50kSiqPCKL97fOODPUnA8M\"",
    "mtime": "2021-03-19T02:22:30.526Z",
    "size": 14222,
    "path": "../public/program/imgs/2020-02-15_162746.png"
  },
  "/program/imgs/2020-02-15_162938.png": {
    "type": "image/png",
    "etag": "\"2c69-nuutyVCZjvYfrs+5vavWzCFwB7I\"",
    "mtime": "2021-03-19T02:22:30.659Z",
    "size": 11369,
    "path": "../public/program/imgs/2020-02-15_162938.png"
  },
  "/program/imgs/2020-02-15_163034.png": {
    "type": "image/png",
    "etag": "\"44a0-kilE5RvYZaMMxboupDfvKLc7+Qc\"",
    "mtime": "2021-03-19T02:22:30.853Z",
    "size": 17568,
    "path": "../public/program/imgs/2020-02-15_163034.png"
  },
  "/program/imgs/2020-02-15_163653.png": {
    "type": "image/png",
    "etag": "\"4c85-Dn+cNtdVKit1AnRFY1t+gneSz5A\"",
    "mtime": "2021-03-19T02:22:31.024Z",
    "size": 19589,
    "path": "../public/program/imgs/2020-02-15_163653.png"
  },
  "/program/imgs/2020-02-15_163759.png": {
    "type": "image/png",
    "etag": "\"5df0-kNYaIXc9744pHQf1o883fWVQ9HY\"",
    "mtime": "2021-03-19T02:22:31.429Z",
    "size": 24048,
    "path": "../public/program/imgs/2020-02-15_163759.png"
  },
  "/program/imgs/2020-02-15_165658.png": {
    "type": "image/png",
    "etag": "\"7464-MmJyNTH9Yvylqu/E78+cJf2RIvY\"",
    "mtime": "2021-03-19T02:22:31.378Z",
    "size": 29796,
    "path": "../public/program/imgs/2020-02-15_165658.png"
  },
  "/program/imgs/2020-02-15_182240.png": {
    "type": "image/png",
    "etag": "\"1f6ec-r5t3dM3CJzeh4yj/dv7CwlhfP3s\"",
    "mtime": "2021-03-19T02:22:32.047Z",
    "size": 128748,
    "path": "../public/program/imgs/2020-02-15_182240.png"
  },
  "/program/imgs/2020-02-15_183956.png": {
    "type": "image/png",
    "etag": "\"c448-7QwKFNj/C1WqIwUMEBrl172HrGA\"",
    "mtime": "2021-03-19T02:22:31.748Z",
    "size": 50248,
    "path": "../public/program/imgs/2020-02-15_183956.png"
  },
  "/program/imgs/2020-02-15_190029.png": {
    "type": "image/png",
    "etag": "\"3ff7-iJRSW3u0LAIwB4dxBuPs8VSlFTI\"",
    "mtime": "2021-03-19T02:22:32.170Z",
    "size": 16375,
    "path": "../public/program/imgs/2020-02-15_190029.png"
  },
  "/program/imgs/2020-02-15_190357.png": {
    "type": "image/png",
    "etag": "\"37b5-ob5G1Cw4tZ2im7s1QUaixyWjGJY\"",
    "mtime": "2021-03-19T02:22:32.300Z",
    "size": 14261,
    "path": "../public/program/imgs/2020-02-15_190357.png"
  },
  "/program/imgs/2020-02-15_190412.png": {
    "type": "image/png",
    "etag": "\"43c9-2g1roZDhmmqlNTIF5QdQoJNtrXA\"",
    "mtime": "2021-03-19T02:22:32.532Z",
    "size": 17353,
    "path": "../public/program/imgs/2020-02-15_190412.png"
  },
  "/program/imgs/2020-02-15_200805.png": {
    "type": "image/png",
    "etag": "\"faf6-4Xjq9zGiyb6j4aseunh1lioxN7U\"",
    "mtime": "2021-03-19T02:22:32.758Z",
    "size": 64246,
    "path": "../public/program/imgs/2020-02-15_200805.png"
  },
  "/program/imgs/2020-02-15_201038.png": {
    "type": "image/png",
    "etag": "\"fe86-hsNlnkaqw3f8sQuhGbobnxICSm4\"",
    "mtime": "2021-03-19T02:22:32.949Z",
    "size": 65158,
    "path": "../public/program/imgs/2020-02-15_201038.png"
  },
  "/program/imgs/2020-02-15_202357.png": {
    "type": "image/png",
    "etag": "\"4e77-gAN8Z27DTS5YQcvhKHtgf3h5esM\"",
    "mtime": "2021-03-19T02:22:33.102Z",
    "size": 20087,
    "path": "../public/program/imgs/2020-02-15_202357.png"
  },
  "/program/imgs/2020-02-15_204229.png": {
    "type": "image/png",
    "etag": "\"3047-KYTY5PbdkFm3m+nzfAs+oMgZZNA\"",
    "mtime": "2021-03-19T02:22:33.249Z",
    "size": 12359,
    "path": "../public/program/imgs/2020-02-15_204229.png"
  },
  "/program/imgs/2020-02-15_204405.png": {
    "type": "image/png",
    "etag": "\"b7fb-2y6X6GJdbFrIX9ocAqzOEQ2IJG8\"",
    "mtime": "2021-03-19T02:22:33.583Z",
    "size": 47099,
    "path": "../public/program/imgs/2020-02-15_204405.png"
  },
  "/program/imgs/2020-02-15_204622.png": {
    "type": "image/png",
    "etag": "\"1cf4-qdzxYwwLT7BRTfV0Lmm7LbjalWM\"",
    "mtime": "2021-03-19T02:22:33.527Z",
    "size": 7412,
    "path": "../public/program/imgs/2020-02-15_204622.png"
  },
  "/program/imgs/2020-02-15_215148.png": {
    "type": "image/png",
    "etag": "\"5a5-ZLcfgJ5IZwdgP3KtQPfS1t84ZBk\"",
    "mtime": "2021-03-19T02:22:33.833Z",
    "size": 1445,
    "path": "../public/program/imgs/2020-02-15_215148.png"
  },
  "/program/imgs/2020-02-15_215512.png": {
    "type": "image/png",
    "etag": "\"e6b6-R7jfS3XgoPSLOQdyiRCCaVmpwOg\"",
    "mtime": "2021-03-19T02:22:33.946Z",
    "size": 59062,
    "path": "../public/program/imgs/2020-02-15_215512.png"
  },
  "/program/imgs/2020-02-16_134646.png": {
    "type": "image/png",
    "etag": "\"44e6-LHnf9FrzUW2nuDdZXAxI8pghwBM\"",
    "mtime": "2021-03-19T02:22:34.259Z",
    "size": 17638,
    "path": "../public/program/imgs/2020-02-16_134646.png"
  },
  "/program/imgs/2020-02-16_134708.png": {
    "type": "image/png",
    "etag": "\"4597-kZF5L76pyoAWyXmfK7osRaPiZtA\"",
    "mtime": "2021-03-19T02:22:34.252Z",
    "size": 17815,
    "path": "../public/program/imgs/2020-02-16_134708.png"
  },
  "/program/imgs/2020-02-16_144934.png": {
    "type": "image/png",
    "etag": "\"30f8-mV8jZ1SXDfYq23FEmz5n4Rtrkpo\"",
    "mtime": "2021-03-19T02:22:34.532Z",
    "size": 12536,
    "path": "../public/program/imgs/2020-02-16_144934.png"
  },
  "/program/imgs/2020-02-16_164702.png": {
    "type": "image/png",
    "etag": "\"30d66-vB9AQcTLj8hsYreI09bQKHYC720\"",
    "mtime": "2021-03-19T02:22:35.182Z",
    "size": 200038,
    "path": "../public/program/imgs/2020-02-16_164702.png"
  },
  "/program/imgs/2020-02-16_164833.png": {
    "type": "image/png",
    "etag": "\"31082-rQI5WsCprC1w0MQA99ObK7sQNFY\"",
    "mtime": "2021-03-19T02:22:35.855Z",
    "size": 200834,
    "path": "../public/program/imgs/2020-02-16_164833.png"
  },
  "/program/imgs/2020-02-16_170250.png": {
    "type": "image/png",
    "etag": "\"1d90-h9We6EKXCQS9lvN8U2GRymiN9B0\"",
    "mtime": "2021-03-19T02:22:35.838Z",
    "size": 7568,
    "path": "../public/program/imgs/2020-02-16_170250.png"
  },
  "/program/imgs/2020-02-16_170601.png": {
    "type": "image/png",
    "etag": "\"5197-rXZeiBtQcR4IhSspTuxOs6gghSE\"",
    "mtime": "2021-03-19T02:22:36.181Z",
    "size": 20887,
    "path": "../public/program/imgs/2020-02-16_170601.png"
  },
  "/program/imgs/2020-02-16_170717.png": {
    "type": "image/png",
    "etag": "\"51fb-FDQN72S8TYwrvH0jGa3ZL9PKZ6Y\"",
    "mtime": "2021-03-19T02:22:36.243Z",
    "size": 20987,
    "path": "../public/program/imgs/2020-02-16_170717.png"
  },
  "/program/imgs/2020-02-16_184825.png": {
    "type": "image/png",
    "etag": "\"2785-f8cxP0wztPp0IJWeAjTIC5VEEio\"",
    "mtime": "2021-03-19T02:22:36.519Z",
    "size": 10117,
    "path": "../public/program/imgs/2020-02-16_184825.png"
  },
  "/program/imgs/2020-02-16_210920.png": {
    "type": "image/png",
    "etag": "\"49bf-VHi+JACcXEOX/giLDKmKoKEdQng\"",
    "mtime": "2021-03-19T02:22:36.505Z",
    "size": 18879,
    "path": "../public/program/imgs/2020-02-16_210920.png"
  },
  "/program/imgs/2020-02-16_211426.png": {
    "type": "image/png",
    "etag": "\"4dfe-XCpa9jGY0c2DHKY3jiYKw0Xb0kQ\"",
    "mtime": "2021-03-19T02:22:36.776Z",
    "size": 19966,
    "path": "../public/program/imgs/2020-02-16_211426.png"
  },
  "/program/imgs/2020-02-16_211540.png": {
    "type": "image/png",
    "etag": "\"5e85-ImoXX1mYJCf+ZYZAdngPfGrOsEg\"",
    "mtime": "2021-03-19T02:22:37.240Z",
    "size": 24197,
    "path": "../public/program/imgs/2020-02-16_211540.png"
  },
  "/program/imgs/2020-02-17_002123.png": {
    "type": "image/png",
    "etag": "\"2ea64-i7aOtihKZbwtTfqKEcRjRtqFtuE\"",
    "mtime": "2021-03-19T02:22:37.360Z",
    "size": 191076,
    "path": "../public/program/imgs/2020-02-17_002123.png"
  },
  "/program/imgs/2020-02-17_002750.png": {
    "type": "image/png",
    "etag": "\"2acfd-BaHfb++hCfpcMPx7WO4CnHd70F0\"",
    "mtime": "2021-03-19T02:22:37.986Z",
    "size": 175357,
    "path": "../public/program/imgs/2020-02-17_002750.png"
  },
  "/program/imgs/2020-02-17_105318.png": {
    "type": "image/png",
    "etag": "\"3cdf-TUFvy9sh8N0lByWcW67Avu29eTo\"",
    "mtime": "2021-03-19T02:22:37.749Z",
    "size": 15583,
    "path": "../public/program/imgs/2020-02-17_105318.png"
  },
  "/program/imgs/2020-02-17_111434.png": {
    "type": "image/png",
    "etag": "\"2f79-j+G1Y2g/ZPhKjgFDbKaXK6tYW8k\"",
    "mtime": "2021-03-19T02:22:38.056Z",
    "size": 12153,
    "path": "../public/program/imgs/2020-02-17_111434.png"
  },
  "/program/imgs/2020-02-17_113452.png": {
    "type": "image/png",
    "etag": "\"10d2-vXr+TScaMzVyGHvoRvg3dXU2kNo\"",
    "mtime": "2021-03-19T02:22:38.600Z",
    "size": 4306,
    "path": "../public/program/imgs/2020-02-17_113452.png"
  },
  "/program/imgs/2020-02-17_113525.png": {
    "type": "image/png",
    "etag": "\"ce6-XAiNmHgBBwMkpsDkxed2oQ853PU\"",
    "mtime": "2021-03-19T02:22:38.359Z",
    "size": 3302,
    "path": "../public/program/imgs/2020-02-17_113525.png"
  },
  "/program/imgs/2020-02-17_113756.png": {
    "type": "image/png",
    "etag": "\"c97-jovQVmHyGwjLtTlgTjJwuC4hKrg\"",
    "mtime": "2021-03-19T02:22:38.675Z",
    "size": 3223,
    "path": "../public/program/imgs/2020-02-17_113756.png"
  },
  "/program/imgs/2020-02-17_132922.png": {
    "type": "image/png",
    "etag": "\"ce4-94yYRHMt53BAsxptXY2/m9/6W+A\"",
    "mtime": "2021-03-19T02:22:39.176Z",
    "size": 3300,
    "path": "../public/program/imgs/2020-02-17_132922.png"
  },
  "/program/imgs/2020-02-17_163534.png": {
    "type": "image/png",
    "etag": "\"4a1-WjjVsWKFPf7Pv7xeqxEwA9abkjM\"",
    "mtime": "2021-03-19T02:22:39.030Z",
    "size": 1185,
    "path": "../public/program/imgs/2020-02-17_163534.png"
  },
  "/program/imgs/2020-02-17_170253.png": {
    "type": "image/png",
    "etag": "\"322-+ELfb14HKwpYnul0qapP9Sga99o\"",
    "mtime": "2021-03-19T02:22:39.389Z",
    "size": 802,
    "path": "../public/program/imgs/2020-02-17_170253.png"
  },
  "/program/imgs/2020-02-17_170454.png": {
    "type": "image/png",
    "etag": "\"662-nQvQkOFhYRjdV/eQmhieHLfPDTo\"",
    "mtime": "2021-03-19T02:22:39.500Z",
    "size": 1634,
    "path": "../public/program/imgs/2020-02-17_170454.png"
  },
  "/program/imgs/2020-02-17_170841.png": {
    "type": "image/png",
    "etag": "\"711-LfuXFuMQhmxROAtq80+TSsFMTPc\"",
    "mtime": "2021-03-19T02:22:39.691Z",
    "size": 1809,
    "path": "../public/program/imgs/2020-02-17_170841.png"
  },
  "/program/imgs/2020-02-17_171236.png": {
    "type": "image/png",
    "etag": "\"607-OHprtltzSNpLgf2dHJdXUadBTsw\"",
    "mtime": "2021-03-19T02:22:39.855Z",
    "size": 1543,
    "path": "../public/program/imgs/2020-02-17_171236.png"
  },
  "/program/imgs/2020-02-17_171759.png": {
    "type": "image/png",
    "etag": "\"3126-PQdO3V2ZZFyCcc05XqlNqDrYd6E\"",
    "mtime": "2021-03-19T02:22:40.082Z",
    "size": 12582,
    "path": "../public/program/imgs/2020-02-17_171759.png"
  },
  "/program/imgs/2020-02-17_185754.png": {
    "type": "image/png",
    "etag": "\"b87-cA7rP5soKeVQ4VP/TrNwVZRrxj4\"",
    "mtime": "2021-03-19T02:22:40.186Z",
    "size": 2951,
    "path": "../public/program/imgs/2020-02-17_185754.png"
  },
  "/program/imgs/2020-02-17_195847.png": {
    "type": "image/png",
    "etag": "\"84c-7hedE0z7ggMEMPX+MLZAds5d2NI\"",
    "mtime": "2021-03-19T02:22:40.457Z",
    "size": 2124,
    "path": "../public/program/imgs/2020-02-17_195847.png"
  },
  "/program/imgs/2020-02-17_201921.png": {
    "type": "image/png",
    "etag": "\"95a-uCMPFVq0SHFbaYxlHic3jXOvhX4\"",
    "mtime": "2021-03-19T02:22:40.473Z",
    "size": 2394,
    "path": "../public/program/imgs/2020-02-17_201921.png"
  },
  "/program/imgs/2020-02-17_202534.png": {
    "type": "image/png",
    "etag": "\"bbe-IRnu8vfsjuXEjRqNVG5icxaving\"",
    "mtime": "2021-03-19T02:22:40.964Z",
    "size": 3006,
    "path": "../public/program/imgs/2020-02-17_202534.png"
  },
  "/program/imgs/2020-02-17_221232.png": {
    "type": "image/png",
    "etag": "\"49c-0hc0n6N71IIHtDYYqxZ4vctvbHQ\"",
    "mtime": "2021-03-19T02:22:40.951Z",
    "size": 1180,
    "path": "../public/program/imgs/2020-02-17_221232.png"
  },
  "/program/imgs/2020-02-17_221259.png": {
    "type": "image/png",
    "etag": "\"4ad-xHhBpg3ROvT+sb3eC6/fuJDOygE\"",
    "mtime": "2021-03-19T02:22:41.294Z",
    "size": 1197,
    "path": "../public/program/imgs/2020-02-17_221259.png"
  },
  "/program/imgs/2020-02-17_221445.png": {
    "type": "image/png",
    "etag": "\"7680-ZkfJRJziVYob9gtuEJZQbiUgxlA\"",
    "mtime": "2021-03-19T02:22:41.355Z",
    "size": 30336,
    "path": "../public/program/imgs/2020-02-17_221445.png"
  },
  "/program/imgs/2020-02-17_224329.png": {
    "type": "image/png",
    "etag": "\"1cfa-Hf8JrS6yPEUepr0vPUleRkPqdys\"",
    "mtime": "2021-03-19T02:22:41.594Z",
    "size": 7418,
    "path": "../public/program/imgs/2020-02-17_224329.png"
  },
  "/program/imgs/2020-02-18_104450.png": {
    "type": "image/png",
    "etag": "\"1e4d-vuKuRKFjOc6M5+qW3OFgFlj3xbU\"",
    "mtime": "2021-03-19T02:22:41.963Z",
    "size": 7757,
    "path": "../public/program/imgs/2020-02-18_104450.png"
  },
  "/program/imgs/2020-02-18_112242.png": {
    "type": "image/png",
    "etag": "\"5e97-AOI+UyIvCqgtckb02PWeWtAHYXQ\"",
    "mtime": "2021-03-19T02:22:42.181Z",
    "size": 24215,
    "path": "../public/program/imgs/2020-02-18_112242.png"
  },
  "/program/imgs/2020-02-18_124038.png": {
    "type": "image/png",
    "etag": "\"505f-Nn2brffpG3NTu9CLv3cXa4w6h0g\"",
    "mtime": "2021-03-19T02:22:42.272Z",
    "size": 20575,
    "path": "../public/program/imgs/2020-02-18_124038.png"
  },
  "/program/imgs/2020-02-18_124530.png": {
    "type": "image/png",
    "etag": "\"4033-ARXkuXFqMJlV/tnPwvo11UZh+pw\"",
    "mtime": "2021-03-19T02:22:42.462Z",
    "size": 16435,
    "path": "../public/program/imgs/2020-02-18_124530.png"
  },
  "/program/imgs/2020-02-18_125336.png": {
    "type": "image/png",
    "etag": "\"5ead-1t78UMSN6gx3xQedas7URTWt9b0\"",
    "mtime": "2021-03-19T02:22:42.651Z",
    "size": 24237,
    "path": "../public/program/imgs/2020-02-18_125336.png"
  },
  "/program/imgs/2020-02-18_140314.png": {
    "type": "image/png",
    "etag": "\"486f-rCwZ5GuUCWAS/VX98Lp6rFifHsQ\"",
    "mtime": "2021-03-19T02:22:42.715Z",
    "size": 18543,
    "path": "../public/program/imgs/2020-02-18_140314.png"
  },
  "/program/imgs/2020-02-18_143518.png": {
    "type": "image/png",
    "etag": "\"3221-UT8u5Fed9Ery2sk8A+4keJMYHP8\"",
    "mtime": "2021-03-19T02:22:42.892Z",
    "size": 12833,
    "path": "../public/program/imgs/2020-02-18_143518.png"
  },
  "/program/imgs/2020-02-18_194149.png": {
    "type": "image/png",
    "etag": "\"4f1a9-xhjSI18eYB90lPtpWye+X2Xrhw0\"",
    "mtime": "2021-03-19T02:22:43.982Z",
    "size": 324009,
    "path": "../public/program/imgs/2020-02-18_194149.png"
  },
  "/program/imgs/2020-02-18_194449.png": {
    "type": "image/png",
    "etag": "\"21c4c-n01l3P686QINNsHGP9fFbQa2N+0\"",
    "mtime": "2021-03-19T02:22:43.482Z",
    "size": 138316,
    "path": "../public/program/imgs/2020-02-18_194449.png"
  },
  "/program/imgs/2020-02-18_212641.png": {
    "type": "image/png",
    "etag": "\"3e23-1DGpKIllUjsuO9UxABRPvnPE2Fo\"",
    "mtime": "2021-03-19T02:22:44.393Z",
    "size": 15907,
    "path": "../public/program/imgs/2020-02-18_212641.png"
  },
  "/program/imgs/2020-02-18_225717.png": {
    "type": "image/png",
    "etag": "\"fa1-200GYEqamEU+ugfEJgjvTJYC1d4\"",
    "mtime": "2021-03-19T02:22:44.213Z",
    "size": 4001,
    "path": "../public/program/imgs/2020-02-18_225717.png"
  },
  "/program/imgs/2020-02-18_230342.png": {
    "type": "image/png",
    "etag": "\"1acf-gWm6fScwKmq0Okcyf0JiyZaReLM\"",
    "mtime": "2021-03-19T02:22:44.723Z",
    "size": 6863,
    "path": "../public/program/imgs/2020-02-18_230342.png"
  },
  "/program/imgs/2020-02-18_233017.png": {
    "type": "image/png",
    "etag": "\"2b95-036ys5QgAfHNRxakGnC1bL8ygEg\"",
    "mtime": "2021-03-19T02:22:44.771Z",
    "size": 11157,
    "path": "../public/program/imgs/2020-02-18_233017.png"
  },
  "/program/imgs/2020-02-18_233505.png": {
    "type": "image/png",
    "etag": "\"15d5-xcqN62BwpFHzm3IkrwpoAKeaYKQ\"",
    "mtime": "2021-03-19T02:22:44.931Z",
    "size": 5589,
    "path": "../public/program/imgs/2020-02-18_233505.png"
  },
  "/program/imgs/2020-02-19_102857.png": {
    "type": "image/png",
    "etag": "\"4930-2L48E0UMsentoXnGcPSAtQY0cqU\"",
    "mtime": "2021-03-19T02:22:44.989Z",
    "size": 18736,
    "path": "../public/program/imgs/2020-02-19_102857.png"
  },
  "/program/imgs/2020-02-19_103452.png": {
    "type": "image/png",
    "etag": "\"2dcb-ZXdPmVc93fFQ74Ql3MRYAZfnQME\"",
    "mtime": "2021-03-19T02:22:45.075Z",
    "size": 11723,
    "path": "../public/program/imgs/2020-02-19_103452.png"
  },
  "/program/imgs/2020-02-19_103810.png": {
    "type": "image/png",
    "etag": "\"be4-5znIrYewdRAIxfHC/+dVYNPlcMc\"",
    "mtime": "2021-03-19T02:22:45.184Z",
    "size": 3044,
    "path": "../public/program/imgs/2020-02-19_103810.png"
  },
  "/program/imgs/2020-02-19_104546.png": {
    "type": "image/png",
    "etag": "\"ba5-E6RyiFZd1aVffDCAPIsciTU7D0o\"",
    "mtime": "2021-03-19T02:22:45.287Z",
    "size": 2981,
    "path": "../public/program/imgs/2020-02-19_104546.png"
  },
  "/program/imgs/2020-02-19_105634.png": {
    "type": "image/png",
    "etag": "\"19d7-fVF4Do7LQezusqc3KeH0IlO43Gs\"",
    "mtime": "2021-03-19T02:22:45.340Z",
    "size": 6615,
    "path": "../public/program/imgs/2020-02-19_105634.png"
  },
  "/program/imgs/2020-02-19_110102.png": {
    "type": "image/png",
    "etag": "\"1b46-qxMHvSnfHoR42unHHO+r0baEgyc\"",
    "mtime": "2021-03-19T02:22:45.377Z",
    "size": 6982,
    "path": "../public/program/imgs/2020-02-19_110102.png"
  },
  "/program/imgs/2020-02-19_111534.png": {
    "type": "image/png",
    "etag": "\"188f-K3ci619FRwvQpLYfFyQe+IDIgzM\"",
    "mtime": "2021-03-19T02:22:45.435Z",
    "size": 6287,
    "path": "../public/program/imgs/2020-02-19_111534.png"
  },
  "/program/imgs/2020-02-19_111718.png": {
    "type": "image/png",
    "etag": "\"a80-MZDOMlJECs+YO3nj5WVSMz7v07I\"",
    "mtime": "2021-03-19T02:22:45.534Z",
    "size": 2688,
    "path": "../public/program/imgs/2020-02-19_111718.png"
  },
  "/program/imgs/2020-02-19_123908.png": {
    "type": "image/png",
    "etag": "\"2ce2-Yahvjf4u399d3yMSFrDMXvAfkXQ\"",
    "mtime": "2021-03-19T02:22:45.580Z",
    "size": 11490,
    "path": "../public/program/imgs/2020-02-19_123908.png"
  },
  "/program/imgs/2020-02-19_124949.png": {
    "type": "image/png",
    "etag": "\"55f2-xJvDk/SNqpCF4o77kPpUFwa24Y8\"",
    "mtime": "2021-03-19T02:22:45.669Z",
    "size": 22002,
    "path": "../public/program/imgs/2020-02-19_124949.png"
  },
  "/program/imgs/2020-02-19_125304.png": {
    "type": "image/png",
    "etag": "\"4279-EJSYR7tV8mkZABe0kbjTaM7nggQ\"",
    "mtime": "2021-03-19T02:22:46.053Z",
    "size": 17017,
    "path": "../public/program/imgs/2020-02-19_125304.png"
  },
  "/program/imgs/2020-02-19_130205.png": {
    "type": "image/png",
    "etag": "\"29cfc-Z4E09MgCrVVmLUvHetlyO9dFqO4\"",
    "mtime": "2021-03-19T02:22:46.122Z",
    "size": 171260,
    "path": "../public/program/imgs/2020-02-19_130205.png"
  },
  "/program/imgs/2020-02-19_131447.png": {
    "type": "image/png",
    "etag": "\"41e0-MbB9Oad11Q5qBEkMnjwC09FdqhE\"",
    "mtime": "2021-03-19T02:22:45.971Z",
    "size": 16864,
    "path": "../public/program/imgs/2020-02-19_131447.png"
  },
  "/program/imgs/2020-02-19_132024.png": {
    "type": "image/png",
    "etag": "\"2562-Yo06zR5jVNkZgrNIl2HnS10zfaM\"",
    "mtime": "2021-03-19T02:22:45.921Z",
    "size": 9570,
    "path": "../public/program/imgs/2020-02-19_132024.png"
  },
  "/program/imgs/2020-02-19_132149.png": {
    "type": "image/png",
    "etag": "\"512f-Gnkqg97raZc6uPf4+aZ94cp5l6s\"",
    "mtime": "2021-03-19T02:22:46.245Z",
    "size": 20783,
    "path": "../public/program/imgs/2020-02-19_132149.png"
  },
  "/program/imgs/2020-02-19_132318.png": {
    "type": "image/png",
    "etag": "\"1498-iWEQvoVY+f1qg6j/Fn2FyV+Z+Dg\"",
    "mtime": "2021-03-19T02:22:46.238Z",
    "size": 5272,
    "path": "../public/program/imgs/2020-02-19_132318.png"
  },
  "/program/imgs/2020-02-19_133128.png": {
    "type": "image/png",
    "etag": "\"74e5-Bjr/OYlPPJK3alDKRiK3F+4l77Y\"",
    "mtime": "2021-03-19T02:22:47.088Z",
    "size": 29925,
    "path": "../public/program/imgs/2020-02-19_133128.png"
  },
  "/program/imgs/2020-02-19_191207.png": {
    "type": "image/png",
    "etag": "\"9ecf-zqJ07LN+q3/OrulIzbj2n6V/hps\"",
    "mtime": "2021-03-19T02:22:46.614Z",
    "size": 40655,
    "path": "../public/program/imgs/2020-02-19_191207.png"
  },
  "/program/imgs/2020-02-19_191319.png": {
    "type": "image/png",
    "etag": "\"6b7c-hqMI2Fn8qLxZNI9ooMW+MTsmcs0\"",
    "mtime": "2021-03-19T02:22:46.701Z",
    "size": 27516,
    "path": "../public/program/imgs/2020-02-19_191319.png"
  },
  "/program/imgs/2020-02-19_215803.png": {
    "type": "image/png",
    "etag": "\"8f6a-VUR5rQ0e4X2lhflr/+jjjCJGG4Y\"",
    "mtime": "2021-03-19T02:22:46.808Z",
    "size": 36714,
    "path": "../public/program/imgs/2020-02-19_215803.png"
  },
  "/program/imgs/2020-02-20_095627.png": {
    "type": "image/png",
    "etag": "\"39d3-DxzAUVc74ui+EVH1JRcr/EsGfZI\"",
    "mtime": "2021-03-19T02:22:47.007Z",
    "size": 14803,
    "path": "../public/program/imgs/2020-02-20_095627.png"
  },
  "/program/imgs/2020-02-20_100202.png": {
    "type": "image/png",
    "etag": "\"2ca5-Ev2/GOia+2ccU54ixJnp0lLUBu8\"",
    "mtime": "2021-03-19T02:22:47.312Z",
    "size": 11429,
    "path": "../public/program/imgs/2020-02-20_100202.png"
  },
  "/program/imgs/2020-02-20_113946.png": {
    "type": "image/png",
    "etag": "\"450b-otzpeHuK8lsG7mvRja8nHV/ppSY\"",
    "mtime": "2021-03-19T02:22:47.418Z",
    "size": 17675,
    "path": "../public/program/imgs/2020-02-20_113946.png"
  },
  "/program/imgs/2020-02-20_122824.png": {
    "type": "image/png",
    "etag": "\"d8ad-7C4KS2+3cG/DoK6cyBjYsfDq+9Y\"",
    "mtime": "2021-03-19T02:22:47.463Z",
    "size": 55469,
    "path": "../public/program/imgs/2020-02-20_122824.png"
  },
  "/program/imgs/2020-02-20_130104.png": {
    "type": "image/png",
    "etag": "\"bbc9-ceHfqCqjuZbyVoXkuJjM2kiWqz4\"",
    "mtime": "2021-03-19T02:22:47.624Z",
    "size": 48073,
    "path": "../public/program/imgs/2020-02-20_130104.png"
  },
  "/program/imgs/2020-02-20_130320.png": {
    "type": "image/png",
    "etag": "\"1301-QEA5HNOj/R6FQ4abnbawZDVpKfI\"",
    "mtime": "2021-03-19T02:22:47.782Z",
    "size": 4865,
    "path": "../public/program/imgs/2020-02-20_130320.png"
  },
  "/program/imgs/2020-02-20_134547.png": {
    "type": "image/png",
    "etag": "\"1142-zWFVnxn4F7T/xlSUtSceuc95tVM\"",
    "mtime": "2021-03-19T02:22:47.996Z",
    "size": 4418,
    "path": "../public/program/imgs/2020-02-20_134547.png"
  },
  "/program/imgs/2020-02-20_170923.png": {
    "type": "image/png",
    "etag": "\"55a8-DrHewSY39SIZu/LreBUKvOSLmg4\"",
    "mtime": "2021-03-19T02:22:48.055Z",
    "size": 21928,
    "path": "../public/program/imgs/2020-02-20_170923.png"
  },
  "/program/imgs/2020-02-20_202116.png": {
    "type": "image/png",
    "etag": "\"18bf1-Jj+VnZpdF4I8yfQ/ER0U3y+95zc\"",
    "mtime": "2021-03-19T02:22:48.129Z",
    "size": 101361,
    "path": "../public/program/imgs/2020-02-20_202116.png"
  },
  "/program/imgs/2020-02-21_092137.png": {
    "type": "image/png",
    "etag": "\"1f862-86MHVC7AciozSFTRM1mIjMBdJ34\"",
    "mtime": "2021-03-19T02:22:48.325Z",
    "size": 129122,
    "path": "../public/program/imgs/2020-02-21_092137.png"
  },
  "/program/imgs/2020-02-21_095030.png": {
    "type": "image/png",
    "etag": "\"901a-IBxwPn77qPMTQHzECR4CBzbwVus\"",
    "mtime": "2021-03-19T02:22:48.353Z",
    "size": 36890,
    "path": "../public/program/imgs/2020-02-21_095030.png"
  },
  "/program/imgs/2020-02-21_142050.png": {
    "type": "image/png",
    "etag": "\"5fed-5uWq+7eczjAQlOGHatEgpu7nDjM\"",
    "mtime": "2021-03-19T02:22:48.292Z",
    "size": 24557,
    "path": "../public/program/imgs/2020-02-21_142050.png"
  },
  "/program/imgs/2020-02-21_193618.png": {
    "type": "image/png",
    "etag": "\"56a17-9ReDkiU+Qdrtru+eN5O4ypnedu4\"",
    "mtime": "2021-03-19T02:22:48.830Z",
    "size": 354839,
    "path": "../public/program/imgs/2020-02-21_193618.png"
  },
  "/program/imgs/2020-02-23_000010.png": {
    "type": "image/png",
    "etag": "\"50d1-G0CYY3Z7WpDSRqxFYHcSw2O5CXI\"",
    "mtime": "2021-03-19T02:22:48.523Z",
    "size": 20689,
    "path": "../public/program/imgs/2020-02-23_000010.png"
  },
  "/program/imgs/2020-02-23_000048.png": {
    "type": "image/png",
    "etag": "\"51aa-/rId5/Xy5EteFHeXZq3XMhZok3A\"",
    "mtime": "2021-03-19T02:22:48.747Z",
    "size": 20906,
    "path": "../public/program/imgs/2020-02-23_000048.png"
  },
  "/program/imgs/2020-02-23_105348.png": {
    "type": "image/png",
    "etag": "\"3dde-1vVfk4JweR4mZqXUxBnejbdB8kE\"",
    "mtime": "2021-03-19T02:22:48.689Z",
    "size": 15838,
    "path": "../public/program/imgs/2020-02-23_105348.png"
  },
  "/program/imgs/2020-02-23_105435.png": {
    "type": "image/png",
    "etag": "\"3d71-qCbOXKyBK1bYz9tGKicWl2BgQlI\"",
    "mtime": "2021-03-19T02:22:48.953Z",
    "size": 15729,
    "path": "../public/program/imgs/2020-02-23_105435.png"
  },
  "/program/imgs/2020-02-23_105552.png": {
    "type": "image/png",
    "etag": "\"3f0a-N47mv/cMm3kS14D7XyzaF/eXJdg\"",
    "mtime": "2021-03-19T02:22:48.924Z",
    "size": 16138,
    "path": "../public/program/imgs/2020-02-23_105552.png"
  },
  "/program/imgs/2020-02-23_105618.png": {
    "type": "image/png",
    "etag": "\"3e6c-K5j0+MwynqXZfzj7oaMEI5zKx3M\"",
    "mtime": "2021-03-19T02:22:49.053Z",
    "size": 15980,
    "path": "../public/program/imgs/2020-02-23_105618.png"
  },
  "/program/imgs/2020-02-23_105702.png": {
    "type": "image/png",
    "etag": "\"3e90-KUMddGuPuGqlc+S27bKM6JYcf6E\"",
    "mtime": "2021-03-19T02:22:49.228Z",
    "size": 16016,
    "path": "../public/program/imgs/2020-02-23_105702.png"
  },
  "/program/imgs/2020-02-23_111347.png": {
    "type": "image/png",
    "etag": "\"946f-RqcdDHu4SfstUh+23jhwLUIbA10\"",
    "mtime": "2021-03-19T02:22:49.528Z",
    "size": 37999,
    "path": "../public/program/imgs/2020-02-23_111347.png"
  },
  "/program/imgs/2020-02-23_111646.png": {
    "type": "image/png",
    "etag": "\"b64b-tWLxGowFuC0yF/Rl4U68ZJBv7e0\"",
    "mtime": "2021-03-19T02:22:49.317Z",
    "size": 46667,
    "path": "../public/program/imgs/2020-02-23_111646.png"
  },
  "/program/imgs/2020-02-23_111710.png": {
    "type": "image/png",
    "etag": "\"c622-4KqKfpiuZsgaKlduWyT94GegLC0\"",
    "mtime": "2021-03-19T02:22:49.439Z",
    "size": 50722,
    "path": "../public/program/imgs/2020-02-23_111710.png"
  },
  "/program/imgs/2020-02-28_232922.png": {
    "type": "image/png",
    "etag": "\"e76-V8Gb9zFzD7OMSJ6GsZK6HEoLsfE\"",
    "mtime": "2021-03-19T02:22:49.553Z",
    "size": 3702,
    "path": "../public/program/imgs/2020-02-28_232922.png"
  },
  "/program/imgs/2020-02-28_233040.png": {
    "type": "image/png",
    "etag": "\"16f5-GbGf5Y0Pv9rreGZlKJYyHyE/wUg\"",
    "mtime": "2021-03-19T02:22:49.722Z",
    "size": 5877,
    "path": "../public/program/imgs/2020-02-28_233040.png"
  },
  "/program/imgs/2020-02-28_233110.png": {
    "type": "image/png",
    "etag": "\"ef5-7TFme3Q5S87SDUqkLpaWzHopKZ0\"",
    "mtime": "2021-03-19T02:22:49.693Z",
    "size": 3829,
    "path": "../public/program/imgs/2020-02-28_233110.png"
  },
  "/program/imgs/2020-02-28_233259.png": {
    "type": "image/png",
    "etag": "\"5724-ZEv1nWBuCifEX/ye9UrglsmGKbo\"",
    "mtime": "2021-03-19T02:22:49.903Z",
    "size": 22308,
    "path": "../public/program/imgs/2020-02-28_233259.png"
  },
  "/program/imgs/2020-02-29_003236.png": {
    "type": "image/png",
    "etag": "\"1be6-oUEKIx4OsnxmBkoiRiesj2NzSDw\"",
    "mtime": "2021-03-19T02:22:49.865Z",
    "size": 7142,
    "path": "../public/program/imgs/2020-02-29_003236.png"
  },
  "/program/imgs/2020-02-29_103752.png": {
    "type": "image/png",
    "etag": "\"1c3b-2VhjEvRJ7VQo8NAmWmIMdfEyPZg\"",
    "mtime": "2021-03-19T02:22:50.234Z",
    "size": 7227,
    "path": "../public/program/imgs/2020-02-29_103752.png"
  },
  "/program/imgs/2020-02-29_110005.png": {
    "type": "image/png",
    "etag": "\"441b-132yT7snDoB29luXiuq0CAesvWY\"",
    "mtime": "2021-03-19T02:22:50.250Z",
    "size": 17435,
    "path": "../public/program/imgs/2020-02-29_110005.png"
  },
  "/program/imgs/2020-03-03_152223.png": {
    "type": "image/png",
    "etag": "\"28d9-kxnIPHcJXY1tfqnsOCPfUEMwyd0\"",
    "mtime": "2021-03-19T02:22:50.241Z",
    "size": 10457,
    "path": "../public/program/imgs/2020-03-03_152223.png"
  },
  "/program/imgs/2020-03-03_152258.png": {
    "type": "image/png",
    "etag": "\"2930-3LVoFjrJNMF0yV/E4b8x7zHiaUA\"",
    "mtime": "2021-03-19T02:22:50.279Z",
    "size": 10544,
    "path": "../public/program/imgs/2020-03-03_152258.png"
  },
  "/program/imgs/2020-03-16_082431.png": {
    "type": "image/png",
    "etag": "\"3c09-8a5Hf8hcTgo2m5sc++6Kd6QK9hM\"",
    "mtime": "2021-03-19T02:22:50.646Z",
    "size": 15369,
    "path": "../public/program/imgs/2020-03-16_082431.png"
  },
  "/program/imgs/2020-03-16_082630.png": {
    "type": "image/png",
    "etag": "\"3c09-lkCxOeEsiaZmMCLAg0cIrtcJKvo\"",
    "mtime": "2021-03-19T02:22:50.614Z",
    "size": 15369,
    "path": "../public/program/imgs/2020-03-16_082630.png"
  },
  "/program/imgs/2020-03-20_171005.png": {
    "type": "image/png",
    "etag": "\"4f04-avWEzAvCneIPgveLSQf/qrPTW9Q\"",
    "mtime": "2021-03-19T02:22:50.684Z",
    "size": 20228,
    "path": "../public/program/imgs/2020-03-20_171005.png"
  },
  "/program/imgs/2020-03-20_191158.png": {
    "type": "image/png",
    "etag": "\"e26-uBdUqQRLmaTsx+A8iw8HF7r/A/o\"",
    "mtime": "2021-03-19T02:22:50.686Z",
    "size": 3622,
    "path": "../public/program/imgs/2020-03-20_191158.png"
  },
  "/program/imgs/2020-03-22_095224.png": {
    "type": "image/png",
    "etag": "\"4b60-3bnYUFYrmg7hgbteFa77ndTDyLg\"",
    "mtime": "2021-03-19T02:22:50.902Z",
    "size": 19296,
    "path": "../public/program/imgs/2020-03-22_095224.png"
  },
  "/program/imgs/2020-03-22_160906.png": {
    "type": "image/png",
    "etag": "\"34c6-gjEMuyizbge8lweigIUQGF/mijY\"",
    "mtime": "2021-03-19T02:22:51.091Z",
    "size": 13510,
    "path": "../public/program/imgs/2020-03-22_160906.png"
  },
  "/program/imgs/2020-03-22_162229.png": {
    "type": "image/png",
    "etag": "\"2ed1-DiKrVigQ2gN2m1zJXxStEYGj74U\"",
    "mtime": "2021-03-19T02:22:51.060Z",
    "size": 11985,
    "path": "../public/program/imgs/2020-03-22_162229.png"
  },
  "/program/imgs/2020-03-22_162355.png": {
    "type": "image/png",
    "etag": "\"3145-QwxWlaTVD/vd7R+86y7wMOM51RA\"",
    "mtime": "2021-03-19T02:22:51.058Z",
    "size": 12613,
    "path": "../public/program/imgs/2020-03-22_162355.png"
  },
  "/program/imgs/2020-03-22_162842.png": {
    "type": "image/png",
    "etag": "\"4493-v340PcGyRMK1rb+8Wl0SGRT1pqg\"",
    "mtime": "2021-03-19T02:22:51.206Z",
    "size": 17555,
    "path": "../public/program/imgs/2020-03-22_162842.png"
  },
  "/program/imgs/2020-03-22_163021.png": {
    "type": "image/png",
    "etag": "\"312f-CAZF3b0AfQLpOCy1hpODrptQzbg\"",
    "mtime": "2021-03-19T02:22:51.539Z",
    "size": 12591,
    "path": "../public/program/imgs/2020-03-22_163021.png"
  },
  "/program/imgs/2020-03-22_211655.png": {
    "type": "image/png",
    "etag": "\"562f-yUusNQVWh1JtGvOt70TBRl61hwU\"",
    "mtime": "2021-03-19T02:22:51.481Z",
    "size": 22063,
    "path": "../public/program/imgs/2020-03-22_211655.png"
  },
  "/program/imgs/2020-03-22_211733.png": {
    "type": "image/png",
    "etag": "\"4460-Ti8uGvXFTCtqsNAMq3UdeDhm2ZY\"",
    "mtime": "2021-03-19T02:22:51.642Z",
    "size": 17504,
    "path": "../public/program/imgs/2020-03-22_211733.png"
  },
  "/program/imgs/2020-03-22_220343.png": {
    "type": "image/png",
    "etag": "\"9802-3L8cBomUK6oZxILIiQbJXTp8S8I\"",
    "mtime": "2021-03-19T02:22:51.488Z",
    "size": 38914,
    "path": "../public/program/imgs/2020-03-22_220343.png"
  },
  "/program/imgs/2020-03-22_220459.png": {
    "type": "image/png",
    "etag": "\"47ba-qi6sWW26hRZAlNjWaaitvpzFRHc\"",
    "mtime": "2021-03-19T02:22:51.892Z",
    "size": 18362,
    "path": "../public/program/imgs/2020-03-22_220459.png"
  },
  "/program/imgs/2020-03-22_224730.png": {
    "type": "image/png",
    "etag": "\"6c7c-3L68jZCU3hoAzXBrD+mi9yHGQx8\"",
    "mtime": "2021-03-19T02:22:51.798Z",
    "size": 27772,
    "path": "../public/program/imgs/2020-03-22_224730.png"
  },
  "/program/imgs/2020-03-22_224818.png": {
    "type": "image/png",
    "etag": "\"4921-qq7ML/pvKpFaQaEAsu6gDFIcDy4\"",
    "mtime": "2021-03-19T02:22:51.915Z",
    "size": 18721,
    "path": "../public/program/imgs/2020-03-22_224818.png"
  },
  "/program/imgs/2020-03-23_172413.png": {
    "type": "image/png",
    "etag": "\"34c8-H7vJ838Ug2+DQ6KCUJq1ZM/P4aI\"",
    "mtime": "2021-03-19T02:22:52.053Z",
    "size": 13512,
    "path": "../public/program/imgs/2020-03-23_172413.png"
  },
  "/program/imgs/2020-03-26_170949.png": {
    "type": "image/png",
    "etag": "\"2ad5-7glWc72UkQGD+gJZz390LaXJlA0\"",
    "mtime": "2021-03-19T02:22:52.077Z",
    "size": 10965,
    "path": "../public/program/imgs/2020-03-26_170949.png"
  },
  "/program/imgs/2020-03-30_203151.png": {
    "type": "image/png",
    "etag": "\"219a-qFzEJQIyfpHMCWlTDdUU5CIRw3k\"",
    "mtime": "2021-03-19T02:22:52.175Z",
    "size": 8602,
    "path": "../public/program/imgs/2020-03-30_203151.png"
  },
  "/program/imgs/2020-03-30_203630.png": {
    "type": "image/png",
    "etag": "\"1293-L6bIFln6VidrzlpAg+c5/ilG3X0\"",
    "mtime": "2021-03-19T02:22:52.309Z",
    "size": 4755,
    "path": "../public/program/imgs/2020-03-30_203630.png"
  },
  "/program/imgs/22221.png": {
    "type": "image/png",
    "etag": "\"a1f7-kLc/1uXtKNUdMfireKV4tA5f2UE\"",
    "mtime": "2021-03-19T02:22:53.391Z",
    "size": 41463,
    "path": "../public/program/imgs/22221.png"
  },
  "/program/assets/2019-09-29-qq.png": {
    "type": "image/png",
    "etag": "\"3f118-mJgZP/oWr70JHU5NlsVEcr7Mk4o\"",
    "mtime": "2019-09-29T02:18:29.000Z",
    "size": 258328,
    "path": "../public/program/assets/2019-09-29-qq.png"
  },
  "/program/assets/api_test.png": {
    "type": "image/png",
    "etag": "\"6485-V6askW8CDpkYjLrkKtrOXgiG88g\"",
    "mtime": "2022-07-24T11:01:45.509Z",
    "size": 25733,
    "path": "../public/program/assets/api_test.png"
  },
  "/program/assets/app.vue.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c62-APB9oyMMizWkdKYoKi3Cx2TWAw0\"",
    "mtime": "2022-07-26T13:35:14.864Z",
    "size": 11362,
    "path": "../public/program/assets/app.vue.jpg"
  },
  "/program/assets/axios.jpg": {
    "type": "image/jpeg",
    "etag": "\"aaf8-PdBsfPa01nC3mg1toOOPtMPV92I\"",
    "mtime": "2022-07-28T09:00:48.752Z",
    "size": 43768,
    "path": "../public/program/assets/axios.jpg"
  },
  "/program/assets/axios11.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a32-eq+/08iGa/as+VdXBkmjHRfi9t4\"",
    "mtime": "2022-07-30T10:11:14.961Z",
    "size": 35378,
    "path": "../public/program/assets/axios11.jpg"
  },
  "/program/assets/axios12.jpg": {
    "type": "image/jpeg",
    "etag": "\"92a5-HYWfGsoDS1a3E6zHBw6NSvczTXw\"",
    "mtime": "2022-07-30T10:11:31.379Z",
    "size": 37541,
    "path": "../public/program/assets/axios12.jpg"
  },
  "/program/assets/axios13.jpg": {
    "type": "image/jpeg",
    "etag": "\"7f60-O0RX8/sCEuDL0XHso/as660Naf4\"",
    "mtime": "2022-07-30T10:11:47.583Z",
    "size": 32608,
    "path": "../public/program/assets/axios13.jpg"
  },
  "/program/assets/axios14.jpg": {
    "type": "image/jpeg",
    "etag": "\"63aa-ZFgxyjY//AIW013Bub5rEd/70L8\"",
    "mtime": "2022-07-30T10:12:04.672Z",
    "size": 25514,
    "path": "../public/program/assets/axios14.jpg"
  },
  "/program/assets/axios15.jpg": {
    "type": "image/jpeg",
    "etag": "\"871a-WC0cD/mvtjmwSQuieZ5ZdZ46Vwg\"",
    "mtime": "2022-07-30T10:12:19.594Z",
    "size": 34586,
    "path": "../public/program/assets/axios15.jpg"
  },
  "/program/assets/axios16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a3d7-YcYqbx0PJw7GEm4tRD6rxpQYZ/U\"",
    "mtime": "2022-07-30T10:12:31.071Z",
    "size": 41943,
    "path": "../public/program/assets/axios16.jpg"
  },
  "/program/assets/axios17.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e0e-l/KBjb37keiKPCbpu3Nwr3USpsg\"",
    "mtime": "2022-07-30T10:13:16.499Z",
    "size": 40462,
    "path": "../public/program/assets/axios17.jpg"
  },
  "/program/assets/axios18.jpg": {
    "type": "image/jpeg",
    "etag": "\"5776-CdUTYaGEgzFTADyhW7WZtkM73ek\"",
    "mtime": "2022-07-30T10:13:38.472Z",
    "size": 22390,
    "path": "../public/program/assets/axios18.jpg"
  },
  "/program/assets/axios2.jpg": {
    "type": "image/jpeg",
    "etag": "\"e0b3-uslZkp6OUZah5ZvKKVnK7lVBlK4\"",
    "mtime": "2022-07-28T09:00:56.077Z",
    "size": 57523,
    "path": "../public/program/assets/axios2.jpg"
  },
  "/program/assets/beforeEach.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f20-PO9+1NgeOnIj47VOBd8A6ep/U80\"",
    "mtime": "2022-07-29T13:40:05.513Z",
    "size": 16160,
    "path": "../public/program/assets/beforeEach.jpg"
  },
  "/program/assets/beforeEach2.jpg": {
    "type": "image/jpeg",
    "etag": "\"60cb-T4yl1GUyDRVhb3xPXBwmqbqIfrg\"",
    "mtime": "2022-07-29T13:40:10.395Z",
    "size": 24779,
    "path": "../public/program/assets/beforeEach2.jpg"
  },
  "/program/assets/beforeEach3.jpg": {
    "type": "image/jpeg",
    "etag": "\"66fd-k4qmQhthXz4Wdbk2mTwMqL2IJS8\"",
    "mtime": "2022-07-29T13:40:39.067Z",
    "size": 26365,
    "path": "../public/program/assets/beforeEach3.jpg"
  },
  "/program/assets/beforeEach4.jpg": {
    "type": "image/jpeg",
    "etag": "\"639b-mKace7QkOL5QfKCQUJmFrATi1x8\"",
    "mtime": "2022-07-29T13:40:57.891Z",
    "size": 25499,
    "path": "../public/program/assets/beforeEach4.jpg"
  },
  "/program/assets/beforeEach5.jpg": {
    "type": "image/jpeg",
    "etag": "\"60cb-kALc/x/d3skPEuJl4A9Z+NGAv3g\"",
    "mtime": "2022-07-29T13:41:26.268Z",
    "size": 24779,
    "path": "../public/program/assets/beforeEach5.jpg"
  },
  "/program/assets/beforeEachtoken.jpg": {
    "type": "image/jpeg",
    "etag": "\"8bd7-ezU7irpCqbMB/pDMWJboG9WJOWs\"",
    "mtime": "2022-07-29T13:41:58.186Z",
    "size": 35799,
    "path": "../public/program/assets/beforeEachtoken.jpg"
  },
  "/program/assets/class.jpg": {
    "type": "image/jpeg",
    "etag": "\"80ea-cDRDGpqe+p2te7rlW275l7BBZ3U\"",
    "mtime": "2022-07-27T05:58:50.717Z",
    "size": 33002,
    "path": "../public/program/assets/class.jpg"
  },
  "/program/assets/class2.jpg": {
    "type": "image/jpeg",
    "etag": "\"88f6-oJHqzkLAtxDcRzGm9tZvZWN4kOU\"",
    "mtime": "2022-07-27T05:59:41.202Z",
    "size": 35062,
    "path": "../public/program/assets/class2.jpg"
  },
  "/program/assets/class3.jpg": {
    "type": "image/jpeg",
    "etag": "\"91c5-7oLGohnPmUcDHp9ReTg1rdC4GvU\"",
    "mtime": "2022-07-27T05:59:57.262Z",
    "size": 37317,
    "path": "../public/program/assets/class3.jpg"
  },
  "/program/assets/class4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7ec4-MRpQkkSUBhK+qm8sZ61go7VubCg\"",
    "mtime": "2022-07-27T06:00:13.897Z",
    "size": 32452,
    "path": "../public/program/assets/class4.jpg"
  },
  "/program/assets/component11.jpg": {
    "type": "image/jpeg",
    "etag": "\"98b8-BHvsrhmee8rAkTu/cGTYatEmpDA\"",
    "mtime": "2022-07-29T02:48:46.400Z",
    "size": 39096,
    "path": "../public/program/assets/component11.jpg"
  },
  "/program/assets/components.jpg": {
    "type": "image/jpeg",
    "etag": "\"7037-kViLM9x0FW4gE1hIRrb1ZIGzo4k\"",
    "mtime": "2022-07-26T15:28:27.244Z",
    "size": 28727,
    "path": "../public/program/assets/components.jpg"
  },
  "/program/assets/components2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7a1e-qGLwP2WLLBI9HlnQZFfDgTsbgv8\"",
    "mtime": "2022-07-26T15:28:49.027Z",
    "size": 31262,
    "path": "../public/program/assets/components2.jpg"
  },
  "/program/assets/components3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bbe-3nWS/WJtZ89aZtOmWBoJfPj6cZc\"",
    "mtime": "2022-07-26T15:28:54.126Z",
    "size": 31678,
    "path": "../public/program/assets/components3.jpg"
  },
  "/program/assets/components4.jpg": {
    "type": "image/jpeg",
    "etag": "\"a880-6txXeSxSIxOhfw4s9Ru24eH8mIE\"",
    "mtime": "2022-07-26T15:29:34.512Z",
    "size": 43136,
    "path": "../public/program/assets/components4.jpg"
  },
  "/program/assets/components5.jpg": {
    "type": "image/jpeg",
    "etag": "\"899f-lfm0Z5jozuG8MXLdfleSzqny5Dw\"",
    "mtime": "2022-07-26T15:30:03.625Z",
    "size": 35231,
    "path": "../public/program/assets/components5.jpg"
  },
  "/program/assets/components6.jpg": {
    "type": "image/jpeg",
    "etag": "\"8747-Xjb7We31PtE6gG/1S+ZUMOfvZU4\"",
    "mtime": "2022-07-26T15:30:30.698Z",
    "size": 34631,
    "path": "../public/program/assets/components6.jpg"
  },
  "/program/assets/components7.jpg": {
    "type": "image/jpeg",
    "etag": "\"b30a-LWEmENRk5odG86wmtTwOqKzZnNA\"",
    "mtime": "2022-07-26T15:31:05.960Z",
    "size": 45834,
    "path": "../public/program/assets/components7.jpg"
  },
  "/program/assets/computed.jpg": {
    "type": "image/jpeg",
    "etag": "\"79e8-xoJbeRKU8IgbbOLzvzq/RDH36jc\"",
    "mtime": "2022-07-27T09:21:10.316Z",
    "size": 31208,
    "path": "../public/program/assets/computed.jpg"
  },
  "/program/assets/computed2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8088-iwj47V0u+8dXZGy3vElGFjXCkO4\"",
    "mtime": "2022-07-27T09:21:33.260Z",
    "size": 32904,
    "path": "../public/program/assets/computed2.jpg"
  },
  "/program/assets/datashare.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ed4-5hQEmMes96Vm02FecmMZCynWMm4\"",
    "mtime": "2022-07-28T08:36:37.913Z",
    "size": 24276,
    "path": "../public/program/assets/datashare.jpg"
  },
  "/program/assets/datashare1.jpg": {
    "type": "image/jpeg",
    "etag": "\"55dc-1Rzy0Kxrh5kkIJ1n09ctWf8nNQI\"",
    "mtime": "2022-07-28T08:37:08.332Z",
    "size": 21980,
    "path": "../public/program/assets/datashare1.jpg"
  },
  "/program/assets/datashare10.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ed4-5hQEmMes96Vm02FecmMZCynWMm4\"",
    "mtime": "2022-07-28T08:40:50.486Z",
    "size": 24276,
    "path": "../public/program/assets/datashare10.jpg"
  },
  "/program/assets/datashare11.jpg": {
    "type": "image/jpeg",
    "etag": "\"6fc7-QHzmJ47K8nzIl8D3jIlt4d2Uayo\"",
    "mtime": "2022-07-28T08:41:26.181Z",
    "size": 28615,
    "path": "../public/program/assets/datashare11.jpg"
  },
  "/program/assets/datashare12.jpg": {
    "type": "image/jpeg",
    "etag": "\"6214-p2NDqh6nKcwqBEphHT2VxW7mjcc\"",
    "mtime": "2022-07-28T08:41:38.149Z",
    "size": 25108,
    "path": "../public/program/assets/datashare12.jpg"
  },
  "/program/assets/datashare13.jpg": {
    "type": "image/jpeg",
    "etag": "\"83bb-LoQM+HSFSORp5g5r+2WgrlKfPcU\"",
    "mtime": "2022-07-28T08:41:50.718Z",
    "size": 33723,
    "path": "../public/program/assets/datashare13.jpg"
  },
  "/program/assets/datashare14.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f4d-UnJ+YWo4mnvef9HCxPKt+u/zaD8\"",
    "mtime": "2022-07-28T08:42:04.880Z",
    "size": 28493,
    "path": "../public/program/assets/datashare14.jpg"
  },
  "/program/assets/datashare15.jpg": {
    "type": "image/jpeg",
    "etag": "\"926a-saUnYDMpW9vPvMAv0IHZ5gPs71k\"",
    "mtime": "2022-07-28T08:42:21.485Z",
    "size": 37482,
    "path": "../public/program/assets/datashare15.jpg"
  },
  "/program/assets/datashare2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d5f-lrp/qMrBoA7LNm0sRY06NiPtwg4\"",
    "mtime": "2022-07-28T08:37:14.199Z",
    "size": 23903,
    "path": "../public/program/assets/datashare2.jpg"
  },
  "/program/assets/datashare3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7184-a+5g7EUdgEAA7GDcKTdHgTKpVFc\"",
    "mtime": "2022-07-28T08:38:22.040Z",
    "size": 29060,
    "path": "../public/program/assets/datashare3.jpg"
  },
  "/program/assets/datashare4.jpg": {
    "type": "image/jpeg",
    "etag": "\"789d-CCGBWKT+JmwKRYGLqIpuR4U21jU\"",
    "mtime": "2022-07-28T08:38:25.867Z",
    "size": 30877,
    "path": "../public/program/assets/datashare4.jpg"
  },
  "/program/assets/datashare5.jpg": {
    "type": "image/jpeg",
    "etag": "\"9633-57u/NIMcN1kwLWiXY9bhD4JGanE\"",
    "mtime": "2022-07-28T08:38:49.218Z",
    "size": 38451,
    "path": "../public/program/assets/datashare5.jpg"
  },
  "/program/assets/datashare6.jpg": {
    "type": "image/jpeg",
    "etag": "\"12ca4-DMiNE7Z2l4Pfv2JZ6kw9q+FBAlc\"",
    "mtime": "2022-07-28T08:39:11.548Z",
    "size": 76964,
    "path": "../public/program/assets/datashare6.jpg"
  },
  "/program/assets/datashare7.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c13-mkROgAfmmJFGyH1qLAzAXbC7Bm4\"",
    "mtime": "2022-07-28T08:40:02.341Z",
    "size": 23571,
    "path": "../public/program/assets/datashare7.jpg"
  },
  "/program/assets/datashare8.jpg": {
    "type": "image/jpeg",
    "etag": "\"84cf-MXRr8ZkIPaOUnBDaE4TwNEaHwFA\"",
    "mtime": "2022-07-28T08:40:21.865Z",
    "size": 33999,
    "path": "../public/program/assets/datashare8.jpg"
  },
  "/program/assets/datashare9.jpg": {
    "type": "image/jpeg",
    "etag": "\"839c-O10r+QHm/PIvljTB9ybnIghZNro\"",
    "mtime": "2022-07-28T08:40:35.064Z",
    "size": 33692,
    "path": "../public/program/assets/datashare9.jpg"
  },
  "/program/assets/deep.jpg": {
    "type": "image/jpeg",
    "etag": "\"7836-eunDzK6eX/KtibZbSN7Q5gas1Ts\"",
    "mtime": "2022-07-27T02:35:30.952Z",
    "size": 30774,
    "path": "../public/program/assets/deep.jpg"
  },
  "/program/assets/directive.jpg": {
    "type": "image/jpeg",
    "etag": "\"5be1-tQfOE11cWt6YOAmeXUN3yDcaZSc\"",
    "mtime": "2022-07-29T04:07:00.321Z",
    "size": 23521,
    "path": "../public/program/assets/directive.jpg"
  },
  "/program/assets/directive2.jpg": {
    "type": "image/jpeg",
    "etag": "\"38e2-M3xR/I3+aBxv0YE6yuP0uFkD97A\"",
    "mtime": "2022-07-29T04:07:27.404Z",
    "size": 14562,
    "path": "../public/program/assets/directive2.jpg"
  },
  "/program/assets/directive3.jpg": {
    "type": "image/jpeg",
    "etag": "\"699c-JjooaUmN5Okt7lz57r2pEiRdvzg\"",
    "mtime": "2022-07-29T04:07:39.993Z",
    "size": 27036,
    "path": "../public/program/assets/directive3.jpg"
  },
  "/program/assets/directive4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5974-kXTK3UMwckp8Ktj0ZPdEsAB52Qw\"",
    "mtime": "2022-07-29T04:08:28.255Z",
    "size": 22900,
    "path": "../public/program/assets/directive4.jpg"
  },
  "/program/assets/directive5.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ae3-8IcJ7ZsJmlNvZwCy5LQZUVWAYFk\"",
    "mtime": "2022-07-29T04:08:35.615Z",
    "size": 15075,
    "path": "../public/program/assets/directive5.jpg"
  },
  "/program/assets/directive6.jpg": {
    "type": "image/jpeg",
    "etag": "\"9317-1i9tSbz0KvD2/xmLGmaM4SKLRrc\"",
    "mtime": "2022-07-29T04:08:55.765Z",
    "size": 37655,
    "path": "../public/program/assets/directive6.jpg"
  },
  "/program/assets/elementui.jpg": {
    "type": "image/jpeg",
    "etag": "\"a38e-B9FCf8VgZNu/zlLg6fhB1kdU2d0\"",
    "mtime": "2022-07-30T10:07:06.180Z",
    "size": 41870,
    "path": "../public/program/assets/elementui.jpg"
  },
  "/program/assets/elementui2.jpg": {
    "type": "image/jpeg",
    "etag": "\"71d3-5ySQO9LbuaSCTtO1Fv6U5tkcqlk\"",
    "mtime": "2022-07-30T10:07:44.151Z",
    "size": 29139,
    "path": "../public/program/assets/elementui2.jpg"
  },
  "/program/assets/elementui3.jpg": {
    "type": "image/jpeg",
    "etag": "\"8830-jmnAdg2thdU+aI93k6abSDV+ktw\"",
    "mtime": "2022-07-30T10:07:49.312Z",
    "size": 34864,
    "path": "../public/program/assets/elementui3.jpg"
  },
  "/program/assets/elementui4.jpg": {
    "type": "image/jpeg",
    "etag": "\"75d2-ILE158uULWEE0co1rz+qStGXcYs\"",
    "mtime": "2022-07-30T10:08:25.411Z",
    "size": 30162,
    "path": "../public/program/assets/elementui4.jpg"
  },
  "/program/assets/emit.jpg": {
    "type": "image/jpeg",
    "etag": "\"c2e0-g7/5k9yCFeL+kF8K1VSm59zaig0\"",
    "mtime": "2022-07-27T09:37:11.748Z",
    "size": 49888,
    "path": "../public/program/assets/emit.jpg"
  },
  "/program/assets/emit2.jpg": {
    "type": "image/jpeg",
    "etag": "\"6584-NahYYVGX4CG4uNTqcyysIDGkJB4\"",
    "mtime": "2022-07-27T09:37:49.317Z",
    "size": 25988,
    "path": "../public/program/assets/emit2.jpg"
  },
  "/program/assets/emits.jpg": {
    "type": "image/jpeg",
    "etag": "\"5969-/TRnocxQra8vOIuh2lASFnb1fy4\"",
    "mtime": "2022-07-27T09:38:58.220Z",
    "size": 22889,
    "path": "../public/program/assets/emits.jpg"
  },
  "/program/assets/emits3.jpg": {
    "type": "image/jpeg",
    "etag": "\"8bd4-DLBbHP4HfheE6HDYPLzBU4xbcVo\"",
    "mtime": "2022-07-27T09:38:38.635Z",
    "size": 35796,
    "path": "../public/program/assets/emits3.jpg"
  },
  "/program/assets/emits4.jpg": {
    "type": "image/jpeg",
    "etag": "\"878c-fmFIDIBmFm3juWpfzMm1ITAnysc\"",
    "mtime": "2022-07-27T09:39:25.608Z",
    "size": 34700,
    "path": "../public/program/assets/emits4.jpg"
  },
  "/program/assets/evenloop01.jpg": {
    "type": "image/jpeg",
    "etag": "\"15921-qvb0MJFYciaVozNS3K4cNH2wGOg\"",
    "mtime": "2022-07-24T08:52:59.551Z",
    "size": 88353,
    "path": "../public/program/assets/evenloop01.jpg"
  },
  "/program/assets/filters1.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c5e-z6ntAyk9vpq+r041izPSs69XDoE\"",
    "mtime": "2022-07-26T09:49:51.701Z",
    "size": 27742,
    "path": "../public/program/assets/filters1.jpg"
  },
  "/program/assets/filters2.jpg": {
    "type": "image/jpeg",
    "etag": "\"82f5-7s9nnYai738d9qyoFAnht0H+jNw\"",
    "mtime": "2022-07-26T09:50:09.944Z",
    "size": 33525,
    "path": "../public/program/assets/filters2.jpg"
  },
  "/program/assets/filters3.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c5e-z6ntAyk9vpq+r041izPSs69XDoE\"",
    "mtime": "2022-07-26T09:51:12.169Z",
    "size": 27742,
    "path": "../public/program/assets/filters3.jpg"
  },
  "/program/assets/filters4.jpg": {
    "type": "image/jpeg",
    "etag": "\"762f-0xoUYdJtXwXVIFuY8gMqn3fM4/Q\"",
    "mtime": "2022-07-26T09:51:26.972Z",
    "size": 30255,
    "path": "../public/program/assets/filters4.jpg"
  },
  "/program/assets/filters5.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ac1-1GI1KQPj7uvzOJxo3x9J78xSt/g\"",
    "mtime": "2022-07-26T09:51:43.046Z",
    "size": 23233,
    "path": "../public/program/assets/filters5.jpg"
  },
  "/program/assets/filters6.jpg": {
    "type": "image/jpeg",
    "etag": "\"a61e-4tOyoaSppxk4YZNDeSYpDDi8oMc\"",
    "mtime": "2022-07-26T09:51:59.685Z",
    "size": 42526,
    "path": "../public/program/assets/filters6.jpg"
  },
  "/program/assets/filters7.jpg": {
    "type": "image/jpeg",
    "etag": "\"8e54-qCePLer0B2d7/wsX2FHqxvhr1Ss\"",
    "mtime": "2022-07-26T09:52:39.787Z",
    "size": 36436,
    "path": "../public/program/assets/filters7.jpg"
  },
  "/program/assets/filters8.jpg": {
    "type": "image/jpeg",
    "etag": "\"ad44-p+qf2LO1SD4oRL5t+Rom/7XYXvU\"",
    "mtime": "2022-07-26T09:52:58.057Z",
    "size": 44356,
    "path": "../public/program/assets/filters8.jpg"
  },
  "/program/assets/index.html.jpg": {
    "type": "image/jpeg",
    "etag": "\"487a-mk6uigCsqLjS5nGezrDJ5VQR8tk\"",
    "mtime": "2022-07-26T13:35:43.404Z",
    "size": 18554,
    "path": "../public/program/assets/index.html.jpg"
  },
  "/program/assets/jsbiaodashi.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d3e-NR2+Lm9xKmWUki6fuP6L6wFMN7w\"",
    "mtime": "2022-07-26T06:51:36.600Z",
    "size": 19774,
    "path": "../public/program/assets/jsbiaodashi.jpg"
  },
  "/program/assets/jstask01.jpg": {
    "type": "image/jpeg",
    "etag": "\"8349-ZCnc/NJBrQmXmkS0Kdh5fM0qoHM\"",
    "mtime": "2022-07-24T09:10:20.443Z",
    "size": 33609,
    "path": "../public/program/assets/jstask01.jpg"
  },
  "/program/assets/jstask02.jpg": {
    "type": "image/jpeg",
    "etag": "\"7324-a2R1sAh8ORZJfPo8R+h9s76rEfg\"",
    "mtime": "2022-07-24T09:12:11.736Z",
    "size": 29476,
    "path": "../public/program/assets/jstask02.jpg"
  },
  "/program/assets/keep-alive.jpg": {
    "type": "image/jpeg",
    "etag": "\"2fce-MpgBBQwPteYaHp2jXZquOxSVQxI\"",
    "mtime": "2022-07-29T02:49:14.314Z",
    "size": 12238,
    "path": "../public/program/assets/keep-alive.jpg"
  },
  "/program/assets/keymodifier.jpg": {
    "type": "image/jpeg",
    "etag": "\"5279-KkJEKU/YESqIoKUk23QPj54/F+s\"",
    "mtime": "2022-07-26T08:32:07.423Z",
    "size": 21113,
    "path": "../public/program/assets/keymodifier.jpg"
  },
  "/program/assets/lifecycle.jpg": {
    "type": "image/jpeg",
    "etag": "\"8b42-VEfAHN+WyOEW2/QvrCsQ8KO5XII\"",
    "mtime": "2022-07-28T04:49:57.427Z",
    "size": 35650,
    "path": "../public/program/assets/lifecycle.jpg"
  },
  "/program/assets/lifecycle.svg": {
    "type": "image/svg+xml",
    "etag": "\"218a-7BieWo4kjQJ+Zxd8L25+cMnMe+w\"",
    "mtime": "2022-07-28T04:40:54.165Z",
    "size": 8586,
    "path": "../public/program/assets/lifecycle.svg"
  },
  "/program/assets/lifecycle2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8b42-VEfAHN+WyOEW2/QvrCsQ8KO5XII\"",
    "mtime": "2022-07-28T04:50:28.399Z",
    "size": 35650,
    "path": "../public/program/assets/lifecycle2.jpg"
  },
  "/program/assets/lifecycle3.png": {
    "type": "image/png",
    "etag": "\"159d0-10L6pmDt15VpzgXHZtGTK53qDRw\"",
    "mtime": "2022-07-28T04:51:00.366Z",
    "size": 88528,
    "path": "../public/program/assets/lifecycle3.png"
  },
  "/program/assets/loader01.jpg": {
    "type": "image/jpeg",
    "etag": "\"f72d-z4lWagvHWkm0fywnNGN20HADyaY\"",
    "mtime": "2022-07-24T15:26:21.922Z",
    "size": 63277,
    "path": "../public/program/assets/loader01.jpg"
  },
  "/program/assets/main.js.jpg": {
    "type": "image/jpeg",
    "etag": "\"b059-2OABY1TzI2l5ImN8rnOyYTuBRVo\"",
    "mtime": "2022-07-26T13:36:03.319Z",
    "size": 45145,
    "path": "../public/program/assets/main.js.jpg"
  },
  "/program/assets/MVVM.jpg": {
    "type": "image/jpeg",
    "etag": "\"49bd-gkN7ED+uil0GH9AzNeztbtOFxKE\"",
    "mtime": "2022-07-25T05:43:28.491Z",
    "size": 18877,
    "path": "../public/program/assets/MVVM.jpg"
  },
  "/program/assets/MVVM2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4a7e-4g9oVgG09BTceVcE5kEQmOkzhIQ\"",
    "mtime": "2022-07-25T05:47:38.954Z",
    "size": 19070,
    "path": "../public/program/assets/MVVM2.jpg"
  },
  "/program/assets/MVVM3.jpg": {
    "type": "image/jpeg",
    "etag": "\"13dac-i0u9FzfDF6ukTlt37dLFLo/qTYA\"",
    "mtime": "2022-07-26T03:12:23.384Z",
    "size": 81324,
    "path": "../public/program/assets/MVVM3.jpg"
  },
  "/program/assets/MyHeader.jpg": {
    "type": "image/jpeg",
    "etag": "\"308d-2dvQyAbOoGmCwVPggnm6q5VkXKQ\"",
    "mtime": "2022-07-27T06:42:42.197Z",
    "size": 12429,
    "path": "../public/program/assets/MyHeader.jpg"
  },
  "/program/assets/powershell.jpg": {
    "type": "image/jpeg",
    "etag": "\"8c3f-PGxhgcJmIwdg99z0V0ukkyUJfK4\"",
    "mtime": "2022-07-30T09:51:48.466Z",
    "size": 35903,
    "path": "../public/program/assets/powershell.jpg"
  },
  "/program/assets/powershell2.jpg": {
    "type": "image/jpeg",
    "etag": "\"92e8-DTO5poRPe3tmYXQrIN+V+EkFoFc\"",
    "mtime": "2022-07-30T09:51:57.096Z",
    "size": 37608,
    "path": "../public/program/assets/powershell2.jpg"
  },
  "/program/assets/props.jpg": {
    "type": "image/jpeg",
    "etag": "\"4012-F/ejRdQ7pYwBot+OXogKuFIxy7w\"",
    "mtime": "2022-07-27T03:04:37.078Z",
    "size": 16402,
    "path": "../public/program/assets/props.jpg"
  },
  "/program/assets/props11.jpg": {
    "type": "image/jpeg",
    "etag": "\"c5ea-XyCzpoeLUzrJge6oadns/DOQRco\"",
    "mtime": "2022-07-27T08:13:31.137Z",
    "size": 50666,
    "path": "../public/program/assets/props11.jpg"
  },
  "/program/assets/props12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e3f6-VHVntfq8kcDbLQ42cNNoOwwAO9I\"",
    "mtime": "2022-07-27T08:14:04.379Z",
    "size": 58358,
    "path": "../public/program/assets/props12.jpg"
  },
  "/program/assets/props13.jpg": {
    "type": "image/jpeg",
    "etag": "\"8630-yFSye4B8yEefjRysQ9ojjvGHHiA\"",
    "mtime": "2022-07-27T08:14:24.215Z",
    "size": 34352,
    "path": "../public/program/assets/props13.jpg"
  },
  "/program/assets/props14.jpg": {
    "type": "image/jpeg",
    "etag": "\"4435-rvv0uKMSKQSi2DqXMI5HpTB9fD4\"",
    "mtime": "2022-07-27T08:14:49.378Z",
    "size": 17461,
    "path": "../public/program/assets/props14.jpg"
  },
  "/program/assets/props15.jpg": {
    "type": "image/jpeg",
    "etag": "\"77aa-qlSde6tSJ8aMyReuulmXl1SLoT4\"",
    "mtime": "2022-07-27T08:15:08.733Z",
    "size": 30634,
    "path": "../public/program/assets/props15.jpg"
  },
  "/program/assets/props16.jpg": {
    "type": "image/jpeg",
    "etag": "\"663b-0yT0jKa85Ce9N9qJB1tIm3PPMaU\"",
    "mtime": "2022-07-27T08:15:31.376Z",
    "size": 26171,
    "path": "../public/program/assets/props16.jpg"
  },
  "/program/assets/props17.jpg": {
    "type": "image/jpeg",
    "etag": "\"a444-M0bGr0UurkhZwP5cGnEfkV5yvO4\"",
    "mtime": "2022-07-27T08:15:47.885Z",
    "size": 42052,
    "path": "../public/program/assets/props17.jpg"
  },
  "/program/assets/props2.jpg": {
    "type": "image/jpeg",
    "etag": "\"749b-2hEu8pBxTzwtACx9l1+at7OrBtY\"",
    "mtime": "2022-07-27T03:05:09.560Z",
    "size": 29851,
    "path": "../public/program/assets/props2.jpg"
  },
  "/program/assets/props3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d01-J24TzhTXvh5OM5lbNnjrz0MSYdI\"",
    "mtime": "2022-07-27T03:05:33.950Z",
    "size": 32001,
    "path": "../public/program/assets/props3.jpg"
  },
  "/program/assets/props4.jpg": {
    "type": "image/jpeg",
    "etag": "\"51df-lwqn1tnSIX9BCRXNtcADl5J5X8c\"",
    "mtime": "2022-07-27T03:05:57.546Z",
    "size": 20959,
    "path": "../public/program/assets/props4.jpg"
  },
  "/program/assets/props5.jpg": {
    "type": "image/jpeg",
    "etag": "\"a08b-xiC4Cr/4F5YBEVnh7CjVYW+7hr0\"",
    "mtime": "2022-07-27T03:06:20.604Z",
    "size": 41099,
    "path": "../public/program/assets/props5.jpg"
  },
  "/program/assets/proxy.jpg": {
    "type": "image/jpeg",
    "etag": "\"c630-O0pClYeB5NgtevL3gJcFfohwxpU\"",
    "mtime": "2022-07-30T10:15:15.094Z",
    "size": 50736,
    "path": "../public/program/assets/proxy.jpg"
  },
  "/program/assets/proxy2.jpg": {
    "type": "image/jpeg",
    "etag": "\"ed83-Kkpuf7jaF4qvCFllgI+Nrr2ZWIQ\"",
    "mtime": "2022-07-30T10:15:35.822Z",
    "size": 60803,
    "path": "../public/program/assets/proxy2.jpg"
  },
  "/program/assets/proxy3.jpg": {
    "type": "image/jpeg",
    "etag": "\"45ad-EnRCs8eGiMSl3hZXonIHDl3iL6Y\"",
    "mtime": "2022-07-30T10:15:52.360Z",
    "size": 17837,
    "path": "../public/program/assets/proxy3.jpg"
  },
  "/program/assets/proxy4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ae0-o9XchbwKBEW1zNRHtzJ0B9YiGYE\"",
    "mtime": "2022-07-30T10:15:59.556Z",
    "size": 23264,
    "path": "../public/program/assets/proxy4.jpg"
  },
  "/program/assets/ref.jpg": {
    "type": "image/jpeg",
    "etag": "\"78e6-jgsegBjiMH1VU/xFqBrbncIKLkA\"",
    "mtime": "2022-07-29T02:28:48.744Z",
    "size": 30950,
    "path": "../public/program/assets/ref.jpg"
  },
  "/program/assets/ref2.jpg": {
    "type": "image/jpeg",
    "etag": "\"9125-bEsub6jBurPSjPADyDXA0nLNJrw\"",
    "mtime": "2022-07-29T02:29:10.043Z",
    "size": 37157,
    "path": "../public/program/assets/ref2.jpg"
  },
  "/program/assets/ref3.jpg": {
    "type": "image/jpeg",
    "etag": "\"97be-yAVYK6uI4fp8g+ZcRe04/nlW5EE\"",
    "mtime": "2022-07-29T02:29:56.205Z",
    "size": 38846,
    "path": "../public/program/assets/ref3.jpg"
  },
  "/program/assets/ref4.jpg": {
    "type": "image/jpeg",
    "etag": "\"44a9-AmYEPQe4sq1MxBxHDsU47c67ofM\"",
    "mtime": "2022-07-29T02:30:23.858Z",
    "size": 17577,
    "path": "../public/program/assets/ref4.jpg"
  },
  "/program/assets/ref5.jpg": {
    "type": "image/jpeg",
    "etag": "\"75b6-XVP5zeNqOLU0w5nLMMyqlIGWfXQ\"",
    "mtime": "2022-07-29T02:30:43.240Z",
    "size": 30134,
    "path": "../public/program/assets/ref5.jpg"
  },
  "/program/assets/ref6.jpg": {
    "type": "image/jpeg",
    "etag": "\"7814-k05nF0dle1cwV2aa0G3BLz5LD6Y\"",
    "mtime": "2022-07-29T02:31:03.655Z",
    "size": 30740,
    "path": "../public/program/assets/ref6.jpg"
  },
  "/program/assets/ref7.jpg": {
    "type": "image/jpeg",
    "etag": "\"8f57-RwMGoy+RWlrjzvD71OTPLGGqHyM\"",
    "mtime": "2022-07-29T02:31:27.471Z",
    "size": 36695,
    "path": "../public/program/assets/ref7.jpg"
  },
  "/program/assets/router.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d8a-v6cqRjMwejRjcfH+Ne2SxZiP+hM\"",
    "mtime": "2022-07-29T07:10:34.740Z",
    "size": 28042,
    "path": "../public/program/assets/router.jpg"
  },
  "/program/assets/router11.jpg": {
    "type": "image/jpeg",
    "etag": "\"c257-la3WMhF/+zIbxkDyxXNJfzlMwvQ\"",
    "mtime": "2022-07-29T07:38:26.255Z",
    "size": 49751,
    "path": "../public/program/assets/router11.jpg"
  },
  "/program/assets/router12.jpg": {
    "type": "image/jpeg",
    "etag": "\"750a-vEywWPEFTeEx0O7LmerweIgtAJA\"",
    "mtime": "2022-07-29T07:38:46.409Z",
    "size": 29962,
    "path": "../public/program/assets/router12.jpg"
  },
  "/program/assets/router13.jpg": {
    "type": "image/jpeg",
    "etag": "\"5afb-sOUs2AIOJib+Vls/IJcyoHaJbCk\"",
    "mtime": "2022-07-29T07:39:24.547Z",
    "size": 23291,
    "path": "../public/program/assets/router13.jpg"
  },
  "/program/assets/router14.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c0f-tph3B0TNAw0Wineq3QE8CjfbHlg\"",
    "mtime": "2022-07-29T07:39:39.443Z",
    "size": 23567,
    "path": "../public/program/assets/router14.jpg"
  },
  "/program/assets/router15.jpg": {
    "type": "image/jpeg",
    "etag": "\"96ec-lMsYraNPaX8rDZUiFpgNwqI40k4\"",
    "mtime": "2022-07-29T07:39:53.118Z",
    "size": 38636,
    "path": "../public/program/assets/router15.jpg"
  },
  "/program/assets/router16.jpg": {
    "type": "image/jpeg",
    "etag": "\"3555-KVVjAc88uQV+9vz9AyGBTLTu7/I\"",
    "mtime": "2022-07-29T07:40:08.164Z",
    "size": 13653,
    "path": "../public/program/assets/router16.jpg"
  },
  "/program/assets/router17.jpg": {
    "type": "image/jpeg",
    "etag": "\"8578-W9WSa4JZLMANPUXb9zU/pdDNIoc\"",
    "mtime": "2022-07-29T07:40:19.670Z",
    "size": 34168,
    "path": "../public/program/assets/router17.jpg"
  },
  "/program/assets/router2.jpg": {
    "type": "image/jpeg",
    "etag": "\"11ce9-ibe7A6IojLX8T7L1njGstfv1NIs\"",
    "mtime": "2022-07-29T07:10:49.221Z",
    "size": 72937,
    "path": "../public/program/assets/router2.jpg"
  },
  "/program/assets/router21.jpg": {
    "type": "image/jpeg",
    "etag": "\"8957-ctQXF0Cy1Qh2GDT22hcLw4qhDNA\"",
    "mtime": "2022-07-29T12:44:35.533Z",
    "size": 35159,
    "path": "../public/program/assets/router21.jpg"
  },
  "/program/assets/router22.jpg": {
    "type": "image/jpeg",
    "etag": "\"5230-flr0PQZ+DN+oLw+ntV8sRoRXXnI\"",
    "mtime": "2022-07-29T12:45:03.368Z",
    "size": 21040,
    "path": "../public/program/assets/router22.jpg"
  },
  "/program/assets/router23.jpg": {
    "type": "image/jpeg",
    "etag": "\"9dbe-fSxg7WvBitErhJuK38gK7sUv7uE\"",
    "mtime": "2022-07-29T12:45:23.469Z",
    "size": 40382,
    "path": "../public/program/assets/router23.jpg"
  },
  "/program/assets/router24.png": {
    "type": "image/png",
    "etag": "\"9da8-CxgnqW3wag/lsG2bdNFJARU524k\"",
    "mtime": "2022-07-29T12:46:04.223Z",
    "size": 40360,
    "path": "../public/program/assets/router24.png"
  },
  "/program/assets/router25.jpg": {
    "type": "image/jpeg",
    "etag": "\"73cd-rbKn2ixSOfNrRFbm+gmIBVVoSX4\"",
    "mtime": "2022-07-29T12:46:18.600Z",
    "size": 29645,
    "path": "../public/program/assets/router25.jpg"
  },
  "/program/assets/router26.jpg": {
    "type": "image/jpeg",
    "etag": "\"b4b4-yywWybete73oDz43QNNU1vKIFgE\"",
    "mtime": "2022-07-29T12:47:33.929Z",
    "size": 46260,
    "path": "../public/program/assets/router26.jpg"
  },
  "/program/assets/router27.jpg": {
    "type": "image/jpeg",
    "etag": "\"459f-AKsnLbyDpLbg5AEBwnOe0HokNMg\"",
    "mtime": "2022-07-29T12:47:50.974Z",
    "size": 17823,
    "path": "../public/program/assets/router27.jpg"
  },
  "/program/assets/router28.jpg": {
    "type": "image/jpeg",
    "etag": "\"41bc-99iPlj3bcunecUYoMcxMUD7u9Cc\"",
    "mtime": "2022-07-29T12:47:56.400Z",
    "size": 16828,
    "path": "../public/program/assets/router28.jpg"
  },
  "/program/assets/router29.jpg": {
    "type": "image/jpeg",
    "etag": "\"764f-JohyDtDeBqEqc6izlkh9qRzK54o\"",
    "mtime": "2022-07-29T12:48:19.848Z",
    "size": 30287,
    "path": "../public/program/assets/router29.jpg"
  },
  "/program/assets/router3.jpg": {
    "type": "image/jpeg",
    "etag": "\"73ca-dtKTWilLVkeHdmjkkFytfcdpBT8\"",
    "mtime": "2022-07-29T07:11:10.831Z",
    "size": 29642,
    "path": "../public/program/assets/router3.jpg"
  },
  "/program/assets/router30.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f54-0ccYDOU3dh7s8yr898/ScCliopM\"",
    "mtime": "2022-07-29T12:48:32.695Z",
    "size": 24404,
    "path": "../public/program/assets/router30.jpg"
  },
  "/program/assets/router31.jpg": {
    "type": "image/jpeg",
    "etag": "\"a020-8kseSPgl/Q7RUuDLYsUu+yAjDaY\"",
    "mtime": "2022-07-29T12:48:47.833Z",
    "size": 40992,
    "path": "../public/program/assets/router31.jpg"
  },
  "/program/assets/router32.jpg": {
    "type": "image/jpeg",
    "etag": "\"807d-t9ZDttEcBssyzad0Q/eKilbzzRY\"",
    "mtime": "2022-07-29T12:49:05.301Z",
    "size": 32893,
    "path": "../public/program/assets/router32.jpg"
  },
  "/program/assets/router33.jpg": {
    "type": "image/jpeg",
    "etag": "\"79eb-JoTcaaqSvgBEPqdZO7vfZvSmznU\"",
    "mtime": "2022-07-29T12:49:29.029Z",
    "size": 31211,
    "path": "../public/program/assets/router33.jpg"
  },
  "/program/assets/router34.jpg": {
    "type": "image/jpeg",
    "etag": "\"4890-w5SBj1Ttn3RVOWDSefz6M/c89G0\"",
    "mtime": "2022-07-29T12:49:53.199Z",
    "size": 18576,
    "path": "../public/program/assets/router34.jpg"
  },
  "/program/assets/router35.jpg": {
    "type": "image/jpeg",
    "etag": "\"61a1-EubcKRjMXpo9lo5T9P3DvmL9bhM\"",
    "mtime": "2022-07-29T12:50:09.430Z",
    "size": 24993,
    "path": "../public/program/assets/router35.jpg"
  },
  "/program/assets/router36.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e0b-ZWXuwLbJ/ztbHXBcKfAhOdXKYDk\"",
    "mtime": "2022-07-29T12:50:25.007Z",
    "size": 32267,
    "path": "../public/program/assets/router36.jpg"
  },
  "/program/assets/router4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6936-Mp7re9K+jgZpviHXbPoWOOTBveU\"",
    "mtime": "2022-07-29T07:11:18.423Z",
    "size": 26934,
    "path": "../public/program/assets/router4.jpg"
  },
  "/program/assets/router5.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b6d-ulCTvV8O2tXjjVxHtzVppa6adxw\"",
    "mtime": "2022-07-29T07:11:22.254Z",
    "size": 15213,
    "path": "../public/program/assets/router5.jpg"
  },
  "/program/assets/router6.jpg": {
    "type": "image/jpeg",
    "etag": "\"93e4-XcR50ZzpxW4M7Ce78xl1T6o1RFc\"",
    "mtime": "2022-07-29T07:11:27.361Z",
    "size": 37860,
    "path": "../public/program/assets/router6.jpg"
  },
  "/program/assets/scoped.jpg": {
    "type": "image/jpeg",
    "etag": "\"8541-EaxkI1VpULaZj4r5szIBK18frjY\"",
    "mtime": "2022-07-27T02:35:14.651Z",
    "size": 34113,
    "path": "../public/program/assets/scoped.jpg"
  },
  "/program/assets/scoped2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a43-ORoPihsHu0QHUmJ7EvsRE+8w6hg\"",
    "mtime": "2022-07-27T02:35:22.917Z",
    "size": 35395,
    "path": "../public/program/assets/scoped2.jpg"
  },
  "/program/assets/script.jpg": {
    "type": "image/jpeg",
    "etag": "\"4815-asUU0AmwXKK4WKnnwlvTh4oMtWU\"",
    "mtime": "2022-07-26T14:33:33.099Z",
    "size": 18453,
    "path": "../public/program/assets/script.jpg"
  },
  "/program/assets/scriptdata.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ec0-fwdyeREfPBZ8G8hzcN40uOSHl60\"",
    "mtime": "2022-07-26T14:34:36.563Z",
    "size": 28352,
    "path": "../public/program/assets/scriptdata.jpg"
  },
  "/program/assets/scriptdata2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3255-HZR3kom+Y/ghA7+jGLHUgXi5J4E\"",
    "mtime": "2022-07-26T14:35:05.252Z",
    "size": 12885,
    "path": "../public/program/assets/scriptdata2.jpg"
  },
  "/program/assets/scripteless.jpg": {
    "type": "image/jpeg",
    "etag": "\"4bd0-mLCOmUj+q6ddCio3lO+Eiv+7Ntc\"",
    "mtime": "2022-07-26T14:36:21.155Z",
    "size": 19408,
    "path": "../public/program/assets/scripteless.jpg"
  },
  "/program/assets/scriptmethods.jpg": {
    "type": "image/jpeg",
    "etag": "\"6613-dxmQqdz7SIDALqs9NcLkD+cUDOg\"",
    "mtime": "2022-07-26T14:35:22.910Z",
    "size": 26131,
    "path": "../public/program/assets/scriptmethods.jpg"
  },
  "/program/assets/scriptname.jpg": {
    "type": "image/jpeg",
    "etag": "\"47c7-Ysg2d4TitsTTZ5eJlCrx20JwTzw\"",
    "mtime": "2022-07-26T14:33:54.635Z",
    "size": 18375,
    "path": "../public/program/assets/scriptname.jpg"
  },
  "/program/assets/scriptname2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4db2-A1AiVt58kibVidT7IaF/iRPvJqQ\"",
    "mtime": "2022-07-26T14:34:06.066Z",
    "size": 19890,
    "path": "../public/program/assets/scriptname2.jpg"
  },
  "/program/assets/scriptstyle.jpg": {
    "type": "image/jpeg",
    "etag": "\"3524-e7cqq0rXB3fTfKMs0CiG0Mu/vsM\"",
    "mtime": "2022-07-26T14:35:50.247Z",
    "size": 13604,
    "path": "../public/program/assets/scriptstyle.jpg"
  },
  "/program/assets/slot.jpg": {
    "type": "image/jpeg",
    "etag": "\"a4d6-dPZHqVSiSmMaKoOHDXlxkJIRot8\"",
    "mtime": "2022-07-29T03:34:38.374Z",
    "size": 42198,
    "path": "../public/program/assets/slot.jpg"
  },
  "/program/assets/slot10.jpg": {
    "type": "image/jpeg",
    "etag": "\"63e9-i7VkYSjgQiJMTpg1ZbsxQZxYckQ\"",
    "mtime": "2022-07-29T03:37:00.952Z",
    "size": 25577,
    "path": "../public/program/assets/slot10.jpg"
  },
  "/program/assets/slot11.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d20-gm2SuJpM89uHacmYrEP62270zwM\"",
    "mtime": "2022-07-29T03:37:17.554Z",
    "size": 32032,
    "path": "../public/program/assets/slot11.jpg"
  },
  "/program/assets/slot12.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a79-0lCm/RnTGfeuGjWQh7D3nRRYrUo\"",
    "mtime": "2022-07-29T03:37:43.310Z",
    "size": 23161,
    "path": "../public/program/assets/slot12.jpg"
  },
  "/program/assets/slot13.jpg": {
    "type": "image/jpeg",
    "etag": "\"7a0c-p47FKdCbbYmSoMunoYJo40QqGqs\"",
    "mtime": "2022-07-29T03:37:55.827Z",
    "size": 31244,
    "path": "../public/program/assets/slot13.jpg"
  },
  "/program/assets/slot2.jpg": {
    "type": "image/jpeg",
    "etag": "\"555b-4nAPrTQL1l6XDOxkyfdWVsj0hRY\"",
    "mtime": "2022-07-29T03:35:04.021Z",
    "size": 21851,
    "path": "../public/program/assets/slot2.jpg"
  },
  "/program/assets/slot3.jpg": {
    "type": "image/jpeg",
    "etag": "\"3c37-Hk3hfFNT0qfWoxQPnLHxlMz/2OA\"",
    "mtime": "2022-07-29T03:35:09.189Z",
    "size": 15415,
    "path": "../public/program/assets/slot3.jpg"
  },
  "/program/assets/slot4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d50-lyINs3K0OavPHv2qMC+4On58g9Y\"",
    "mtime": "2022-07-29T03:35:38.271Z",
    "size": 19792,
    "path": "../public/program/assets/slot4.jpg"
  },
  "/program/assets/slot5.jpg": {
    "type": "image/jpeg",
    "etag": "\"3706-YW8onhNVOtIFJQ0TsOrmtKH+7jw\"",
    "mtime": "2022-07-29T03:35:44.093Z",
    "size": 14086,
    "path": "../public/program/assets/slot5.jpg"
  },
  "/program/assets/slot6.jpg": {
    "type": "image/jpeg",
    "etag": "\"4bf6-CA+K6AGY4sXEf5awtT9iHXVpp5M\"",
    "mtime": "2022-07-29T03:36:04.510Z",
    "size": 19446,
    "path": "../public/program/assets/slot6.jpg"
  },
  "/program/assets/slot7.jpg": {
    "type": "image/jpeg",
    "etag": "\"78e0-pYKeMYBewYdAx057s3I8sUiMtVI\"",
    "mtime": "2022-07-29T03:36:17.483Z",
    "size": 30944,
    "path": "../public/program/assets/slot7.jpg"
  },
  "/program/assets/slot8.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a81-RodKeQFJOhFLkLjXdcdGedeWAUM\"",
    "mtime": "2022-07-29T03:36:35.928Z",
    "size": 35457,
    "path": "../public/program/assets/slot8.jpg"
  },
  "/program/assets/slot9.jpg": {
    "type": "image/jpeg",
    "etag": "\"88e9-s+MCyIHhOkmdoBbK1JORW2RgHf0\"",
    "mtime": "2022-07-29T03:36:50.456Z",
    "size": 35049,
    "path": "../public/program/assets/slot9.jpg"
  },
  "/program/assets/Snipaste_2022-07-10_22-40-11.png": {
    "type": "image/png",
    "etag": "\"c728-xnkdq/okD5TxQGcQq9aUn3lmPns\"",
    "mtime": "2022-07-10T14:40:26.962Z",
    "size": 50984,
    "path": "../public/program/assets/Snipaste_2022-07-10_22-40-11.png"
  },
  "/program/assets/Snipaste_2022-07-10_22-59-42.png": {
    "type": "image/png",
    "etag": "\"404f9-YGeqNcLx95vbGIyfRURajCU2h6U\"",
    "mtime": "2022-07-10T14:59:46.691Z",
    "size": 263417,
    "path": "../public/program/assets/Snipaste_2022-07-10_22-59-42.png"
  },
  "/program/assets/Snipaste_2022-07-20_11-11-23.png": {
    "type": "image/png",
    "etag": "\"a79c-QMV++IzxOXAtOFztJGr8AVXmGT0\"",
    "mtime": "2022-07-20T03:11:37.779Z",
    "size": 42908,
    "path": "../public/program/assets/Snipaste_2022-07-20_11-11-23.png"
  },
  "/program/assets/Snipaste_2022-07-20_17-35-47.png": {
    "type": "image/png",
    "etag": "\"14188-SI+cc3LY0soReeTy2bcp8DoLcRQ\"",
    "mtime": "2022-07-20T09:36:04.137Z",
    "size": 82312,
    "path": "../public/program/assets/Snipaste_2022-07-20_17-35-47.png"
  },
  "/program/assets/Snipaste_2022-07-20_17-38-41.png": {
    "type": "image/png",
    "etag": "\"8eb6-LQgPSJ+E/I0h6DTzUqsSrz1eyDg\"",
    "mtime": "2022-07-20T09:38:42.976Z",
    "size": 36534,
    "path": "../public/program/assets/Snipaste_2022-07-20_17-38-41.png"
  },
  "/program/assets/Snipaste_2022-07-20_18-08-06.png": {
    "type": "image/png",
    "etag": "\"69e7-Y/YUda6GirwLb4nJVSLyfxzBBE4\"",
    "mtime": "2022-07-20T10:08:09.347Z",
    "size": 27111,
    "path": "../public/program/assets/Snipaste_2022-07-20_18-08-06.png"
  },
  "/program/assets/Snipaste_2022-07-20_18-09-18.png": {
    "type": "image/png",
    "etag": "\"4bb6-OeQBNdQE1d7CBJVCacHVb26GSYo\"",
    "mtime": "2022-07-20T10:09:19.869Z",
    "size": 19382,
    "path": "../public/program/assets/Snipaste_2022-07-20_18-09-18.png"
  },
  "/program/assets/Snipaste_2022-07-20_18-30-51.png": {
    "type": "image/png",
    "etag": "\"45ae-pflJ2HEqcbuxAt4W6pfx4Se/6bY\"",
    "mtime": "2022-07-20T10:30:53.327Z",
    "size": 17838,
    "path": "../public/program/assets/Snipaste_2022-07-20_18-30-51.png"
  },
  "/program/assets/Snipaste_2022-07-20_21-24-14.png": {
    "type": "image/png",
    "etag": "\"c48-IkPRo+iKuurDMNGLMCPWrZnjvDo\"",
    "mtime": "2022-07-20T13:24:18.593Z",
    "size": 3144,
    "path": "../public/program/assets/Snipaste_2022-07-20_21-24-14.png"
  },
  "/program/assets/Snipaste_2022-07-21_09-39-37.png": {
    "type": "image/png",
    "etag": "\"92fa-yKAxk4g1X8tT8ZxHqRi6qL0TR1Y\"",
    "mtime": "2022-07-21T01:39:41.773Z",
    "size": 37626,
    "path": "../public/program/assets/Snipaste_2022-07-21_09-39-37.png"
  },
  "/program/assets/Snipaste_2022-07-21_10-59-03.png": {
    "type": "image/png",
    "etag": "\"1a23d-1tm0vCIzSyCliPCSRYTS2tIhy6M\"",
    "mtime": "2022-07-21T02:59:06.033Z",
    "size": 107069,
    "path": "../public/program/assets/Snipaste_2022-07-21_10-59-03.png"
  },
  "/program/assets/Snipaste_2022-07-21_15-30-02.png": {
    "type": "image/png",
    "etag": "\"215e0-Q9WBW80/oTyqd9wBN8F+2y8l4MA\"",
    "mtime": "2022-07-21T07:30:05.234Z",
    "size": 136672,
    "path": "../public/program/assets/Snipaste_2022-07-21_15-30-02.png"
  },
  "/program/assets/Snipaste_2022-07-21_15-55-12.png": {
    "type": "image/png",
    "etag": "\"11096-kNdF7eWV17nAcZvtAtb2kdTTOHE\"",
    "mtime": "2022-07-21T07:55:14.359Z",
    "size": 69782,
    "path": "../public/program/assets/Snipaste_2022-07-21_15-55-12.png"
  },
  "/program/assets/Snipaste_2022-07-21_22-56-32.png": {
    "type": "image/png",
    "etag": "\"19011-HTiXfqNCADCK7p2wHpgfqDNghqY\"",
    "mtime": "2022-07-21T14:56:45.778Z",
    "size": 102417,
    "path": "../public/program/assets/Snipaste_2022-07-21_22-56-32.png"
  },
  "/program/assets/Snipaste_2022-07-21_23-41-59.png": {
    "type": "image/png",
    "etag": "\"c76e-xteDe5Oa7mAxd+Krtza6OoKpgro\"",
    "mtime": "2022-07-21T15:42:01.206Z",
    "size": 51054,
    "path": "../public/program/assets/Snipaste_2022-07-21_23-41-59.png"
  },
  "/program/assets/Snipaste_2022-07-21_23-44-18.png": {
    "type": "image/png",
    "etag": "\"1e0c2-1KIh3F4mmEiI36yiIuZSlVNQdZA\"",
    "mtime": "2022-07-21T15:44:21.150Z",
    "size": 123074,
    "path": "../public/program/assets/Snipaste_2022-07-21_23-44-18.png"
  },
  "/program/assets/Snipaste_2022-07-21_23-46-39.png": {
    "type": "image/png",
    "etag": "\"13277-/IWhwrcF4S5sDLMJQSAbi9n9uJQ\"",
    "mtime": "2022-07-21T15:46:41.092Z",
    "size": 78455,
    "path": "../public/program/assets/Snipaste_2022-07-21_23-46-39.png"
  },
  "/program/assets/Snipaste_2022-07-22_00-04-03.png": {
    "type": "image/png",
    "etag": "\"12bdb-rb0dt/Ilw7bTjSMsMgH5sWW9ofs\"",
    "mtime": "2022-07-21T16:04:06.060Z",
    "size": 76763,
    "path": "../public/program/assets/Snipaste_2022-07-22_00-04-03.png"
  },
  "/program/assets/Snipaste_2022-07-22_14-44-06.png": {
    "type": "image/png",
    "etag": "\"10acc-2/QXr3DxjTMwXYAEX+aHfXlOyuM\"",
    "mtime": "2022-07-22T06:44:17.742Z",
    "size": 68300,
    "path": "../public/program/assets/Snipaste_2022-07-22_14-44-06.png"
  },
  "/program/assets/Snipaste_2022-07-22_15-48-36.png": {
    "type": "image/png",
    "etag": "\"6ba5-9x94oruhhudhHtPRoKRHrubz67k\"",
    "mtime": "2022-07-22T07:48:39.730Z",
    "size": 27557,
    "path": "../public/program/assets/Snipaste_2022-07-22_15-48-36.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-14-20.png": {
    "type": "image/png",
    "etag": "\"a895-+PtBi0+qA0zaXjX/0bwi0OhaArU\"",
    "mtime": "2022-07-22T10:14:23.093Z",
    "size": 43157,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-14-20.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-15-55.png": {
    "type": "image/png",
    "etag": "\"b2b5-T+7tlw1VGLlbb+ui8mY+JoSnNNk\"",
    "mtime": "2022-07-22T10:15:57.634Z",
    "size": 45749,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-15-55.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-24-49.png": {
    "type": "image/png",
    "etag": "\"70fd-Pu0SLpwLLMM7HMF6pKGQbqpETno\"",
    "mtime": "2022-07-22T10:24:51.557Z",
    "size": 28925,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-24-49.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-38-57.png": {
    "type": "image/png",
    "etag": "\"b3e9-gcrf5QUGfitXlki/lsMWGFYToZs\"",
    "mtime": "2022-07-22T10:38:59.071Z",
    "size": 46057,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-38-57.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-40-46.png": {
    "type": "image/png",
    "etag": "\"98a5-r+Ncx3YIFa2+Bf0EShzl5sDuU3w\"",
    "mtime": "2022-07-22T10:40:48.117Z",
    "size": 39077,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-40-46.png"
  },
  "/program/assets/Snipaste_2022-07-22_18-41-54.png": {
    "type": "image/png",
    "etag": "\"1ab09-XhgCUlwtNKpb4EkJjuFhH2j0wdo\"",
    "mtime": "2022-07-22T10:41:56.203Z",
    "size": 109321,
    "path": "../public/program/assets/Snipaste_2022-07-22_18-41-54.png"
  },
  "/program/assets/Snipaste_2022-07-22_20-49-27.png": {
    "type": "image/png",
    "etag": "\"1cf4e-mCnUehlYkkAkC0QyPpcH+fOlM40\"",
    "mtime": "2022-07-22T12:49:29.960Z",
    "size": 118606,
    "path": "../public/program/assets/Snipaste_2022-07-22_20-49-27.png"
  },
  "/program/assets/Snipaste_2022-07-22_21-34-42.png": {
    "type": "image/png",
    "etag": "\"13b23-t0YtuQSII2P9zs5iOJqpZcT0jW8\"",
    "mtime": "2022-07-22T13:34:44.279Z",
    "size": 80675,
    "path": "../public/program/assets/Snipaste_2022-07-22_21-34-42.png"
  },
  "/program/assets/Snipaste_2022-07-22_21-36-38.png": {
    "type": "image/png",
    "etag": "\"8b19-P6UVruN/GAo0pmKJBjyKvVEfrCk\"",
    "mtime": "2022-07-22T13:36:41.359Z",
    "size": 35609,
    "path": "../public/program/assets/Snipaste_2022-07-22_21-36-38.png"
  },
  "/program/assets/Snipaste_2022-07-24_12-15-11.png": {
    "type": "image/png",
    "etag": "\"c14e-k9yNpoTxQGrn6JmTV6hNwU1oykg\"",
    "mtime": "2022-07-24T04:15:29.032Z",
    "size": 49486,
    "path": "../public/program/assets/Snipaste_2022-07-24_12-15-11.png"
  },
  "/program/assets/Snipaste_2022-07-25_01-28-49.png": {
    "type": "image/png",
    "etag": "\"1a269-9l9KySiOTiLHqMJnAuc/6pND41g\"",
    "mtime": "2022-07-24T17:28:52.152Z",
    "size": 107113,
    "path": "../public/program/assets/Snipaste_2022-07-25_01-28-49.png"
  },
  "/program/assets/Snipaste_2022-07-25_01-28-57.png": {
    "type": "image/png",
    "etag": "\"f123-/RF+h4YTV1suOjXr8Oo23EbrbT8\"",
    "mtime": "2022-07-24T17:28:58.733Z",
    "size": 61731,
    "path": "../public/program/assets/Snipaste_2022-07-25_01-28-57.png"
  },
  "/program/assets/Snipaste_2022-07-25_01-29-04.png": {
    "type": "image/png",
    "etag": "\"1b651-o/z2bXO685aFd1IT0x00IK1CM/k\"",
    "mtime": "2022-07-24T17:29:06.299Z",
    "size": 112209,
    "path": "../public/program/assets/Snipaste_2022-07-25_01-29-04.png"
  },
  "/program/assets/Snipaste_2022-07-25_01-29-11.png": {
    "type": "image/png",
    "etag": "\"19388-a7pDx37esfzQeuHZolR0L+9msqQ\"",
    "mtime": "2022-07-24T17:29:12.723Z",
    "size": 103304,
    "path": "../public/program/assets/Snipaste_2022-07-25_01-29-11.png"
  },
  "/program/assets/Snipaste_2022-07-25_01-29-16.png": {
    "type": "image/png",
    "etag": "\"2b331-ACV2cJ242Ng0S06jmtodYgYZKmw\"",
    "mtime": "2022-07-24T17:29:19.244Z",
    "size": 176945,
    "path": "../public/program/assets/Snipaste_2022-07-25_01-29-16.png"
  },
  "/program/assets/Snipaste_2022-07-25_12-38-11.png": {
    "type": "image/png",
    "etag": "\"2ca6b-IakhJzvkaHQmWW3yDW75bCffFq0\"",
    "mtime": "2022-07-25T04:38:14.539Z",
    "size": 182891,
    "path": "../public/program/assets/Snipaste_2022-07-25_12-38-11.png"
  },
  "/program/assets/Snipaste_2022-07-25_12-39-47.png": {
    "type": "image/png",
    "etag": "\"22af9-0h9AdWcdJWQv3vIF6Yj3/A8WWG4\"",
    "mtime": "2022-07-25T04:39:49.275Z",
    "size": 142073,
    "path": "../public/program/assets/Snipaste_2022-07-25_12-39-47.png"
  },
  "/program/assets/Snipaste_2022-07-25_13-41-39.png": {
    "type": "image/png",
    "etag": "\"30ddb-6fQP/tYC0LP0u4V8zESwKydKl0Q\"",
    "mtime": "2022-07-25T05:41:41.617Z",
    "size": 200155,
    "path": "../public/program/assets/Snipaste_2022-07-25_13-41-39.png"
  },
  "/program/assets/Snipaste_2022-07-26_21-03-07.png": {
    "type": "image/png",
    "etag": "\"c2d1-jjC7pSJRRjd7kG8bgqxN8KqfFwU\"",
    "mtime": "2022-07-26T13:03:11.890Z",
    "size": 49873,
    "path": "../public/program/assets/Snipaste_2022-07-26_21-03-07.png"
  },
  "/program/assets/Snipaste_2022-09-16_18-50-39.png": {
    "type": "image/png",
    "etag": "\"3b69f-LQGjEh2rpbVGOEQuTSJrliTNi48\"",
    "mtime": "2022-09-16T10:50:41.849Z",
    "size": 243359,
    "path": "../public/program/assets/Snipaste_2022-09-16_18-50-39.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-01-08.png": {
    "type": "image/png",
    "etag": "\"13919-lSx6bW/nGDW+vWS/4/oaFPx4qgA\"",
    "mtime": "2022-09-17T16:01:14.158Z",
    "size": 80153,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-01-08.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-03-20.png": {
    "type": "image/png",
    "etag": "\"4f9c2-UYPUbDnibluZpP9QFfM76iVmHSk\"",
    "mtime": "2022-09-17T16:03:22.718Z",
    "size": 326082,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-03-20.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-05-03.png": {
    "type": "image/png",
    "etag": "\"1e901-Z/DqNtTXounUqeggBk4S9+TF4vQ\"",
    "mtime": "2022-09-17T16:05:05.815Z",
    "size": 125185,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-05-03.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-05-11.png": {
    "type": "image/png",
    "etag": "\"4da96-ZTxxUqS7Cx2W9sMvlVlMjRDyVLk\"",
    "mtime": "2022-09-17T16:05:13.508Z",
    "size": 318102,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-05-11.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-06-06.png": {
    "type": "image/png",
    "etag": "\"60532-hvE6GN/jgqXpeQ+UcAE/rVMJv74\"",
    "mtime": "2022-09-17T16:06:08.947Z",
    "size": 394546,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-06-06.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-08-20.png": {
    "type": "image/png",
    "etag": "\"24df2-brQKFS6UhYMf7itbyg5PneSSq6U\"",
    "mtime": "2022-09-17T16:08:23.008Z",
    "size": 151026,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-08-20.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-21-52.png": {
    "type": "image/png",
    "etag": "\"41665-B4w68yftkN4lK7AE3y0vrBO3OpA\"",
    "mtime": "2022-09-17T16:21:55.284Z",
    "size": 267877,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-21-52.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-23-00.png": {
    "type": "image/png",
    "etag": "\"f390-bBCt3yjB8hFf2mvQQ9tBtc1+9pE\"",
    "mtime": "2022-09-17T16:23:02.986Z",
    "size": 62352,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-23-00.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-29-26.png": {
    "type": "image/png",
    "etag": "\"25d49-QY9W1o80eI5JyiyqrXYo1U4IX38\"",
    "mtime": "2022-09-17T16:29:28.334Z",
    "size": 154953,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-29-26.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-29-38.png": {
    "type": "image/png",
    "etag": "\"25d05-VL0fzQz6TGAGHmj8rTBmnmfuhpQ\"",
    "mtime": "2022-09-17T16:29:40.156Z",
    "size": 154885,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-29-38.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-29-46.png": {
    "type": "image/png",
    "etag": "\"254b2-j3s1Pg8XlLhK8lAUfodKliqrlA4\"",
    "mtime": "2022-09-17T16:29:48.142Z",
    "size": 152754,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-29-46.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-31-05.png": {
    "type": "image/png",
    "etag": "\"3202c-I5j42gIW6zvzBYW70JnJbgAPM3g\"",
    "mtime": "2022-09-17T16:31:07.461Z",
    "size": 204844,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-31-05.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-34-48.png": {
    "type": "image/png",
    "etag": "\"1b515-EyjZ0JflczuqA5WxOp3Zc7Evgk8\"",
    "mtime": "2022-09-17T16:34:50.526Z",
    "size": 111893,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-34-48.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-34-58.png": {
    "type": "image/png",
    "etag": "\"1e00b-Gxf+jfuJwyUGrRSibuM3ItHlRr4\"",
    "mtime": "2022-09-17T16:35:00.194Z",
    "size": 122891,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-34-58.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-35-06.png": {
    "type": "image/png",
    "etag": "\"1f10d-mosOUjiFg3D10baVnLPgi/3NaQc\"",
    "mtime": "2022-09-17T16:35:07.506Z",
    "size": 127245,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-35-06.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-35-13.png": {
    "type": "image/png",
    "etag": "\"2414d-lJZePcZmf+bMI5gkmpNm0IUgREc\"",
    "mtime": "2022-09-17T16:35:14.766Z",
    "size": 147789,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-35-13.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-35-22.png": {
    "type": "image/png",
    "etag": "\"1b9e8-fkqY50zedFQuWSC6Po37HWGsxq8\"",
    "mtime": "2022-09-17T16:35:24.029Z",
    "size": 113128,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-35-22.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-35-35.png": {
    "type": "image/png",
    "etag": "\"189f9-FZDSW2AHHzBVxNlzPCcrO/UvyVY\"",
    "mtime": "2022-09-17T16:35:37.235Z",
    "size": 100857,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-35-35.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-35-46.png": {
    "type": "image/png",
    "etag": "\"223e7-UBD6j3lhOj3XqztDGXlvUeuuPMU\"",
    "mtime": "2022-09-17T16:35:48.333Z",
    "size": 140263,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-35-46.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-38-00.png": {
    "type": "image/png",
    "etag": "\"27b94-2G4x6jiHg+WO6Kj9CazyeM5F70w\"",
    "mtime": "2022-09-17T16:38:09.546Z",
    "size": 162708,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-38-00.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-38-18.png": {
    "type": "image/png",
    "etag": "\"27bda-I8SkCiZSCM7Os7fiTm2lmb/xI8o\"",
    "mtime": "2022-09-17T16:38:19.659Z",
    "size": 162778,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-38-18.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-39-58.png": {
    "type": "image/png",
    "etag": "\"a276-J9RWxVuCMCojQao5w48lJPpca2U\"",
    "mtime": "2022-09-17T16:40:01.464Z",
    "size": 41590,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-39-58.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-45-26.png": {
    "type": "image/png",
    "etag": "\"1fd05-VbLlcThXJoMeOvq4PnBLoY012zM\"",
    "mtime": "2022-09-17T16:45:27.592Z",
    "size": 130309,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-45-26.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-45-56.png": {
    "type": "image/png",
    "etag": "\"1c31e-T6zKOtjPzu/ovAVjMjCrPjitj8U\"",
    "mtime": "2022-09-17T16:45:58.406Z",
    "size": 115486,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-45-56.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-46-04.png": {
    "type": "image/png",
    "etag": "\"1becc-ct2a2l9vX777yLt220vFzcHwyXo\"",
    "mtime": "2022-09-17T16:46:06.414Z",
    "size": 114380,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-46-04.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-46-20.png": {
    "type": "image/png",
    "etag": "\"215b4-JdPkeTSHr0meyv0h4+lsmDh8cOI\"",
    "mtime": "2022-09-17T16:46:22.117Z",
    "size": 136628,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-46-20.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-46-42.png": {
    "type": "image/png",
    "etag": "\"1b50a-6WR1WMEs0Gw8Rfq6TkrL8h9AZbc\"",
    "mtime": "2022-09-17T16:46:43.799Z",
    "size": 111882,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-46-42.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-46-49.png": {
    "type": "image/png",
    "etag": "\"1d119-n2wzqcMj5nWskd36JlgQlFHqkj4\"",
    "mtime": "2022-09-17T16:46:51.271Z",
    "size": 119065,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-46-49.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-46-58.png": {
    "type": "image/png",
    "etag": "\"2b0d4-Jbfs8lD0ht/N/UoIPI4y0XFSTNE\"",
    "mtime": "2022-09-17T16:47:00.509Z",
    "size": 176340,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-46-58.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-07.png": {
    "type": "image/png",
    "etag": "\"1b438-dqu/CKT3ABeZBWHxPpvamI4RxTk\"",
    "mtime": "2022-09-17T16:47:09.452Z",
    "size": 111672,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-07.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-15.png": {
    "type": "image/png",
    "etag": "\"12421-KNdhUZsZQblwsGy5/VXsFdLhK74\"",
    "mtime": "2022-09-17T16:47:17.131Z",
    "size": 74785,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-15.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-22.png": {
    "type": "image/png",
    "etag": "\"177e6-ZjrGo05lFRYWUdMvj1QVqPwX3RE\"",
    "mtime": "2022-09-17T16:47:24.052Z",
    "size": 96230,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-22.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-29.png": {
    "type": "image/png",
    "etag": "\"22361-wFzmvBXcCHDDfR4pdNNAUGLSvUA\"",
    "mtime": "2022-09-17T16:47:30.929Z",
    "size": 140129,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-29.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-36.png": {
    "type": "image/png",
    "etag": "\"11eb0-XVszgWFbasDJk9LZe63B0h9s0TI\"",
    "mtime": "2022-09-17T16:47:37.963Z",
    "size": 73392,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-36.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-42.png": {
    "type": "image/png",
    "etag": "\"1657a-Yhc2aMOuTVhyQjrL8p+CgOSlK14\"",
    "mtime": "2022-09-17T16:47:44.513Z",
    "size": 91514,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-42.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-47-49.png": {
    "type": "image/png",
    "etag": "\"1d0b6-GiVumZjCSXWEI+D70jL4CBd4tT0\"",
    "mtime": "2022-09-17T16:47:51.308Z",
    "size": 118966,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-47-49.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-53-08.png": {
    "type": "image/png",
    "etag": "\"2afd9-muwlQ29iAqnEpG1qy17oKon/2eA\"",
    "mtime": "2022-09-17T16:53:10.475Z",
    "size": 176089,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-53-08.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-54-48.png": {
    "type": "image/png",
    "etag": "\"276c8-oi4KFKzSvkOJ87Y+r7hBEGFMDnU\"",
    "mtime": "2022-09-17T16:54:49.749Z",
    "size": 161480,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-54-48.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-55-41.png": {
    "type": "image/png",
    "etag": "\"331c9-yhal5AgfAKJIYr5kXe/1HYJfJgY\"",
    "mtime": "2022-09-17T16:55:43.043Z",
    "size": 209353,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-55-41.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-57-05.png": {
    "type": "image/png",
    "etag": "\"1abf2-gXQZuxYYmW/2hrpiahG9q3V5Ruc\"",
    "mtime": "2022-09-17T16:57:08.461Z",
    "size": 109554,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-57-05.png"
  },
  "/program/assets/Snipaste_2022-09-18_00-57-55.png": {
    "type": "image/png",
    "etag": "\"1a9f0-NsNhj/Ro+2751Xjj5cGFzvde2Jc\"",
    "mtime": "2022-09-17T16:57:56.762Z",
    "size": 109040,
    "path": "../public/program/assets/Snipaste_2022-09-18_00-57-55.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-00-16.png": {
    "type": "image/png",
    "etag": "\"4689c-mwDrYZzOzl4zLKNVvuT74Za1gJ0\"",
    "mtime": "2022-09-17T17:00:18.402Z",
    "size": 288924,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-00-16.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-00-25.png": {
    "type": "image/png",
    "etag": "\"45c6f-kYF/hpa9PSWnFf2GT+FW0UMTfLA\"",
    "mtime": "2022-09-17T17:00:26.697Z",
    "size": 285807,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-00-25.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-02-18.png": {
    "type": "image/png",
    "etag": "\"2a3ba-LuN6rEmI3BHWAmlf4zdbJl12DHM\"",
    "mtime": "2022-09-17T17:02:20.162Z",
    "size": 172986,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-02-18.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-02-29.png": {
    "type": "image/png",
    "etag": "\"2911d-PP0ewzq9PASEKMT2IRlDAxBOamQ\"",
    "mtime": "2022-09-17T17:02:30.946Z",
    "size": 168221,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-02-29.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-03-56.png": {
    "type": "image/png",
    "etag": "\"19dfb-TkE8xrpnfrwpnWR9Er3yTCq+ydw\"",
    "mtime": "2022-09-17T17:03:57.961Z",
    "size": 105979,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-03-56.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-04-19.png": {
    "type": "image/png",
    "etag": "\"1533b-J+mZcjyKbIiEiZqrGIcA/X6bTyE\"",
    "mtime": "2022-09-17T17:04:21.198Z",
    "size": 86843,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-04-19.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-05-56.png": {
    "type": "image/png",
    "etag": "\"1c299-aaWXl2JW4Um3nI3eNiYjZjQaSoY\"",
    "mtime": "2022-09-17T17:05:57.840Z",
    "size": 115353,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-05-56.png"
  },
  "/program/assets/Snipaste_2022-09-18_01-06-06.png": {
    "type": "image/png",
    "etag": "\"159fc-zI/2ewTK5eKXOSGaHTfuGARlAQU\"",
    "mtime": "2022-09-17T17:06:07.565Z",
    "size": 88572,
    "path": "../public/program/assets/Snipaste_2022-09-18_01-06-06.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-11-24.png": {
    "type": "image/png",
    "etag": "\"7c89-HN9SNg9q33lRECLB2iOvImlT1rc\"",
    "mtime": "2022-09-18T06:11:36.492Z",
    "size": 31881,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-11-24.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-11-44.png": {
    "type": "image/png",
    "etag": "\"88e2-nJkfVJIyJSQGWZfRC5/l4RtFk6c\"",
    "mtime": "2022-09-18T06:11:46.175Z",
    "size": 35042,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-11-44.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-18-31.png": {
    "type": "image/png",
    "etag": "\"10423-g1evePYFB0IlXdq05Zxs4HUFQZY\"",
    "mtime": "2022-09-18T06:18:33.148Z",
    "size": 66595,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-18-31.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-18-46.png": {
    "type": "image/png",
    "etag": "\"155e6-EjD5zcxhSkSpdkgSDtZGkRDiglo\"",
    "mtime": "2022-09-18T06:18:48.337Z",
    "size": 87526,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-18-46.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-21-33.png": {
    "type": "image/png",
    "etag": "\"48532-8Cbfy6yBYo72y0xbzpQf4J2z6Yc\"",
    "mtime": "2022-09-18T06:21:35.534Z",
    "size": 296242,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-21-33.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-21-43.png": {
    "type": "image/png",
    "etag": "\"49ad1-0t8TS+wVlDuzSZiND60mjuAGWbk\"",
    "mtime": "2022-09-18T06:21:44.720Z",
    "size": 301777,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-21-43.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-24-08.png": {
    "type": "image/png",
    "etag": "\"f285-lnhu3DbyqwS+NlZz4CyWrwAEM0A\"",
    "mtime": "2022-09-18T06:24:09.597Z",
    "size": 62085,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-24-08.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-24-18.png": {
    "type": "image/png",
    "etag": "\"f6cb-LSVLcJ6mKWkpAc2Of9IG51nB2IY\"",
    "mtime": "2022-09-18T06:24:20.161Z",
    "size": 63179,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-24-18.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-26-50.png": {
    "type": "image/png",
    "etag": "\"3d56e-UdaLSWLibi+50ugvLzCg9AqkGtc\"",
    "mtime": "2022-09-18T06:26:51.565Z",
    "size": 251246,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-26-50.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-28-04.png": {
    "type": "image/png",
    "etag": "\"174c0-cCRGZ6TC5cnBJyDIRIcwNyiwAzI\"",
    "mtime": "2022-09-18T06:28:06.232Z",
    "size": 95424,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-28-04.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-28-16.png": {
    "type": "image/png",
    "etag": "\"2cfec-jxry+FHvKBwGSrb/fbBY/zTf9Qw\"",
    "mtime": "2022-09-18T06:28:18.246Z",
    "size": 184300,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-28-16.png"
  },
  "/program/assets/Snipaste_2022-09-18_14-28-24.png": {
    "type": "image/png",
    "etag": "\"30bb7-x6Nj3MxTHYDJMJ57puT8NrEN1VE\"",
    "mtime": "2022-09-18T06:28:26.099Z",
    "size": 199607,
    "path": "../public/program/assets/Snipaste_2022-09-18_14-28-24.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-41-33.png": {
    "type": "image/png",
    "etag": "\"1167d-GpqlykOXd+2Wm3OtFWfRNTDZ1b4\"",
    "mtime": "2022-09-18T08:41:35.274Z",
    "size": 71293,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-41-33.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-41-42.png": {
    "type": "image/png",
    "etag": "\"186e7-fyb1fno0mNML7CQ70zU3p8p19O0\"",
    "mtime": "2022-09-18T08:41:44.065Z",
    "size": 100071,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-41-42.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-41-50.png": {
    "type": "image/png",
    "etag": "\"144cd-gk+dWukG28NtbkG6srWbfWR1YpU\"",
    "mtime": "2022-09-18T08:41:51.051Z",
    "size": 83149,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-41-50.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-43-53.png": {
    "type": "image/png",
    "etag": "\"14328-TRk84PsuiuMrHjJn3ZaTvZ1LPaM\"",
    "mtime": "2022-09-18T08:43:54.454Z",
    "size": 82728,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-43-53.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-46-14.png": {
    "type": "image/png",
    "etag": "\"1d7b1-Sj1DeizsBJfdqrs+BUvIg7d9DcA\"",
    "mtime": "2022-09-18T08:46:15.341Z",
    "size": 120753,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-46-14.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-46-20.png": {
    "type": "image/png",
    "etag": "\"14f30-SanzhGnmofdU5COlhATfDS3Gcbo\"",
    "mtime": "2022-09-18T08:46:21.452Z",
    "size": 85808,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-46-20.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-53-41.png": {
    "type": "image/png",
    "etag": "\"2200a-IBxQTHLDzPVPpyjOfz4gcjpej5g\"",
    "mtime": "2022-09-18T08:53:43.486Z",
    "size": 139274,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-53-41.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-53-51.png": {
    "type": "image/png",
    "etag": "\"17dcf-c49nud4ZuQQR65ASPnrkfrJ0nIc\"",
    "mtime": "2022-09-18T08:53:52.576Z",
    "size": 97743,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-53-51.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-57-49.png": {
    "type": "image/png",
    "etag": "\"147f4-b448wuLIRVP5p3yA3zICFNvDJzY\"",
    "mtime": "2022-09-18T08:57:50.701Z",
    "size": 83956,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-57-49.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-57-56.png": {
    "type": "image/png",
    "etag": "\"5d812-Fn3kRgiN/z4Lf5iDp3b+Dz1UQUA\"",
    "mtime": "2022-09-18T08:57:56.956Z",
    "size": 382994,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-57-56.png"
  },
  "/program/assets/Snipaste_2022-09-18_16-58-06.png": {
    "type": "image/png",
    "etag": "\"57e61-/+YrHyD6ViHej7zB/XqH8srz56A\"",
    "mtime": "2022-09-18T08:58:07.038Z",
    "size": 360033,
    "path": "../public/program/assets/Snipaste_2022-09-18_16-58-06.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-26-39.png": {
    "type": "image/png",
    "etag": "\"142ef-2gq2tHx6icf3bvJLGmRhMqc9mLI\"",
    "mtime": "2022-09-19T04:26:42.531Z",
    "size": 82671,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-26-39.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-28-33.png": {
    "type": "image/png",
    "etag": "\"dc87-jaRO3TqkX3S1gPIh7OWBnfTivnI\"",
    "mtime": "2022-09-19T04:28:35.485Z",
    "size": 56455,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-28-33.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-28-41.png": {
    "type": "image/png",
    "etag": "\"11de7-TydbXWuvGwfA8TNjGbea3oeQo50\"",
    "mtime": "2022-09-19T04:28:42.391Z",
    "size": 73191,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-28-41.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-28-48.png": {
    "type": "image/png",
    "etag": "\"5adb-ekAVUBHjKYtXUFjmFb4vUqlwkCc\"",
    "mtime": "2022-09-19T04:28:50.078Z",
    "size": 23259,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-28-48.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-28-55.png": {
    "type": "image/png",
    "etag": "\"10d18-M2WMCuzq092FBEnh5Z4A4aMhdDQ\"",
    "mtime": "2022-09-19T04:28:57.644Z",
    "size": 68888,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-28-55.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-32-41.png": {
    "type": "image/png",
    "etag": "\"f5b6-Gd2x5WreiF7GnE6CJQDL411W1FQ\"",
    "mtime": "2022-09-19T04:32:43.097Z",
    "size": 62902,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-32-41.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-36-06.png": {
    "type": "image/png",
    "etag": "\"36701-GI/WEloYfoxBcnPhekZZye40i/c\"",
    "mtime": "2022-09-19T04:36:10.606Z",
    "size": 222977,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-36-06.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-37-16.png": {
    "type": "image/png",
    "etag": "\"6ecd-hhQS20KWqjLtezU6CZn9OpgSAIQ\"",
    "mtime": "2022-09-19T04:37:17.230Z",
    "size": 28365,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-37-16.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-38-09.png": {
    "type": "image/png",
    "etag": "\"11c5d-UuO5YnBvN2Pa4MuMUxZ/f8v1B3c\"",
    "mtime": "2022-09-19T04:38:10.616Z",
    "size": 72797,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-38-09.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-39-43.png": {
    "type": "image/png",
    "etag": "\"3887f-I8t5IxLn+7CSj6yRb3qCJdsF8bc\"",
    "mtime": "2022-09-19T04:39:45.103Z",
    "size": 231551,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-39-43.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-47-06.png": {
    "type": "image/png",
    "etag": "\"36d62-Upyadaui9hsVulzag5rM2Mi09ik\"",
    "mtime": "2022-09-19T04:47:07.510Z",
    "size": 224610,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-47-06.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-49-11.png": {
    "type": "image/png",
    "etag": "\"1aaed-vB1lm8OrN5t/3dsqqwkUQ57vGP0\"",
    "mtime": "2022-09-19T04:49:13.056Z",
    "size": 109293,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-49-11.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-50-40.png": {
    "type": "image/png",
    "etag": "\"318fb-6vG2fBAMUlutohaDRa2XnQ3icHs\"",
    "mtime": "2022-09-19T04:50:41.978Z",
    "size": 203003,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-50-40.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-53-37.png": {
    "type": "image/png",
    "etag": "\"3bd88-/hVtQs9UDTV1M/jnNUJh9AwBMSY\"",
    "mtime": "2022-09-19T04:53:39.293Z",
    "size": 245128,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-53-37.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-54-16.png": {
    "type": "image/png",
    "etag": "\"1504c-C9HAIGKbUpr4sqTcrqLlPCJdLOg\"",
    "mtime": "2022-09-19T04:54:17.532Z",
    "size": 86092,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-54-16.png"
  },
  "/program/assets/Snipaste_2022-09-19_12-56-27.png": {
    "type": "image/png",
    "etag": "\"48195-fDxAfY4LhTO00qDjyLER6D30n4o\"",
    "mtime": "2022-09-19T04:56:28.604Z",
    "size": 295317,
    "path": "../public/program/assets/Snipaste_2022-09-19_12-56-27.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-40-36.png": {
    "type": "image/png",
    "etag": "\"33e5d-+Ds4FovRMDiWkhaghL84whPiIIU\"",
    "mtime": "2022-09-19T06:40:37.295Z",
    "size": 212573,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-40-36.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-42-06.png": {
    "type": "image/png",
    "etag": "\"249a0-/NH0wUAMZ0ev/vi7X9WYKejHPMI\"",
    "mtime": "2022-09-19T06:42:08.078Z",
    "size": 149920,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-42-06.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-50-50.png": {
    "type": "image/png",
    "etag": "\"129a8-7CPd9g4LnBWTRzfY2CSTMNRuckc\"",
    "mtime": "2022-09-19T06:50:52.420Z",
    "size": 76200,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-50-50.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-50-59.png": {
    "type": "image/png",
    "etag": "\"11ace-513OUzzgnJ1EbZT10HSLBj68WW8\"",
    "mtime": "2022-09-19T06:51:00.566Z",
    "size": 72398,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-50-59.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-51-05.png": {
    "type": "image/png",
    "etag": "\"34c2b-FPfr8S8Kkm8wjwudek7Gn7VGtH4\"",
    "mtime": "2022-09-19T06:51:06.235Z",
    "size": 216107,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-51-05.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-52-35.png": {
    "type": "image/png",
    "etag": "\"c8b5-ZAZpifCaCwx3oix+z7mPJ0xIlKU\"",
    "mtime": "2022-09-19T06:52:36.635Z",
    "size": 51381,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-52-35.png"
  },
  "/program/assets/Snipaste_2022-09-19_14-52-44.png": {
    "type": "image/png",
    "etag": "\"a9135-Zz6NNkuFh9sdZEg4B36uDBMBJSo\"",
    "mtime": "2022-09-19T06:52:45.062Z",
    "size": 692533,
    "path": "../public/program/assets/Snipaste_2022-09-19_14-52-44.png"
  },
  "/program/assets/Snipaste_2022-09-19_15-08-30.png": {
    "type": "image/png",
    "etag": "\"c263-5INpS5SaDl77OyzOcvrpWp+1xXo\"",
    "mtime": "2022-09-19T07:08:31.988Z",
    "size": 49763,
    "path": "../public/program/assets/Snipaste_2022-09-19_15-08-30.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-11-35.png": {
    "type": "image/png",
    "etag": "\"2442f-IWkuJ+nAfRECgG3ak/KDD3kEosc\"",
    "mtime": "2022-10-08T05:11:45.244Z",
    "size": 148527,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-11-35.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-12-56.png": {
    "type": "image/png",
    "etag": "\"24491-KEiNk1KAD/kJ8RrbDrb5LZX7K+I\"",
    "mtime": "2022-10-08T05:12:59.728Z",
    "size": 148625,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-12-56.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-15-05.png": {
    "type": "image/png",
    "etag": "\"12a9b-SmEDcHH5c1A6xo2CkJNr1OuTVEA\"",
    "mtime": "2022-10-08T05:15:07.421Z",
    "size": 76443,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-15-05.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-16-22.png": {
    "type": "image/png",
    "etag": "\"39bb9-yhz00M5nEx/26QN/ApukEisnav4\"",
    "mtime": "2022-10-08T05:16:24.037Z",
    "size": 236473,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-16-22.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-24-37.png": {
    "type": "image/png",
    "etag": "\"37e9-avIvkH9wfpweFBUMJ2tnxwEtFaQ\"",
    "mtime": "2022-10-08T05:24:39.363Z",
    "size": 14313,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-24-37.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-25-50.png": {
    "type": "image/png",
    "etag": "\"7233-jM0OLFW0aDJwezHuvd++FghpZwQ\"",
    "mtime": "2022-10-08T05:25:53.943Z",
    "size": 29235,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-25-50.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-27-31.png": {
    "type": "image/png",
    "etag": "\"5c1b-10XB6mi+A1QklNjQw7v/W/M4zZY\"",
    "mtime": "2022-10-08T05:27:32.739Z",
    "size": 23579,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-27-31.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-28-36.png": {
    "type": "image/png",
    "etag": "\"49b2-TRE757FuAfwQxpEzDZajlLhJlaQ\"",
    "mtime": "2022-10-08T05:28:37.646Z",
    "size": 18866,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-28-36.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-30-01.png": {
    "type": "image/png",
    "etag": "\"9637-+89y1XiTppY1ISZ/fUxulijAmj8\"",
    "mtime": "2022-10-08T05:30:03.019Z",
    "size": 38455,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-30-01.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-35-01.png": {
    "type": "image/png",
    "etag": "\"9254-raCNIlvc3Y5Vnlmc5eUAVeWh+BE\"",
    "mtime": "2022-10-08T05:35:03.202Z",
    "size": 37460,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-35-01.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-39-04.png": {
    "type": "image/png",
    "etag": "\"40bc-bVu/rROvMnRCDExMO/rxoieo5W4\"",
    "mtime": "2022-10-08T05:39:06.061Z",
    "size": 16572,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-39-04.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-41-04.png": {
    "type": "image/png",
    "etag": "\"131df-uQTh6zFhyyVFR0Y6mVhL5zMZ0e8\"",
    "mtime": "2022-10-08T05:41:06.082Z",
    "size": 78303,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-41-04.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-43-43.png": {
    "type": "image/png",
    "etag": "\"14077-4VLdrq5xH+VmgtzizqvlB4fA3AI\"",
    "mtime": "2022-10-08T05:43:44.311Z",
    "size": 82039,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-43-43.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-45-24.png": {
    "type": "image/png",
    "etag": "\"109ca-l+IHn7aFJhrGVCCHqGtsiXgoCbc\"",
    "mtime": "2022-10-08T05:45:26.442Z",
    "size": 68042,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-45-24.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-49-38.png": {
    "type": "image/png",
    "etag": "\"d34d-vKEyzEa/AeVQLLo9t5zsQeeyivs\"",
    "mtime": "2022-10-08T05:49:39.067Z",
    "size": 54093,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-49-38.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-51-39.png": {
    "type": "image/png",
    "etag": "\"844a-5bGEqQCaJiSP8opZp8R5+uVGlUI\"",
    "mtime": "2022-10-08T05:51:40.606Z",
    "size": 33866,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-51-39.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-52-37.png": {
    "type": "image/png",
    "etag": "\"25ea7-NbELHrLpaT/mhBCuh92Ru5QuZuA\"",
    "mtime": "2022-10-08T05:52:39.416Z",
    "size": 155303,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-52-37.png"
  },
  "/program/assets/Snipaste_2022-10-08_13-52-43.png": {
    "type": "image/png",
    "etag": "\"1bb94-NNrhqRfOIooiA/ejpRiHFk8xezc\"",
    "mtime": "2022-10-08T05:52:44.816Z",
    "size": 113556,
    "path": "../public/program/assets/Snipaste_2022-10-08_13-52-43.png"
  },
  "/program/assets/Snipaste_2022-10-08_14-24-03.png": {
    "type": "image/png",
    "etag": "\"74a7-n3eHst/siVvtYWw1Is81Khy9HoI\"",
    "mtime": "2022-10-08T06:24:05.232Z",
    "size": 29863,
    "path": "../public/program/assets/Snipaste_2022-10-08_14-24-03.png"
  },
  "/program/assets/Snipaste_2022-10-08_14-24-15.png": {
    "type": "image/png",
    "etag": "\"27e92-3O8sxRRAZql0xYw1EIWkC6VX9QA\"",
    "mtime": "2022-10-08T06:24:15.809Z",
    "size": 163474,
    "path": "../public/program/assets/Snipaste_2022-10-08_14-24-15.png"
  },
  "/program/assets/Snipaste_2022-10-08_14-24-20.png": {
    "type": "image/png",
    "etag": "\"165f2-ai+2Kt6AORho26s/NSICtQ2Jqt8\"",
    "mtime": "2022-10-08T06:24:21.003Z",
    "size": 91634,
    "path": "../public/program/assets/Snipaste_2022-10-08_14-24-20.png"
  },
  "/program/assets/Snipaste_2022-10-08_21-51-00.png": {
    "type": "image/png",
    "etag": "\"11122-sOeCamNTL5bRPR7goPyMeXREq08\"",
    "mtime": "2022-10-08T13:51:02.173Z",
    "size": 69922,
    "path": "../public/program/assets/Snipaste_2022-10-08_21-51-00.png"
  },
  "/program/assets/Snipaste_2022-10-08_21-51-59.png": {
    "type": "image/png",
    "etag": "\"11108-6fScitGUjUXfzWrxPtp9VqBmLsk\"",
    "mtime": "2022-10-08T13:52:02.996Z",
    "size": 69896,
    "path": "../public/program/assets/Snipaste_2022-10-08_21-51-59.png"
  },
  "/program/assets/Snipaste_2022-10-08_21-54-13.png": {
    "type": "image/png",
    "etag": "\"5ad5-bHTXbfIz7wnuMubvWuhbFnFjXQo\"",
    "mtime": "2022-10-08T13:54:14.247Z",
    "size": 23253,
    "path": "../public/program/assets/Snipaste_2022-10-08_21-54-13.png"
  },
  "/program/assets/Snipaste_2022-10-08_21-54-19.png": {
    "type": "image/png",
    "etag": "\"1d565-HkfAJ4jfQc30IPMlGTCGY2A/8Nw\"",
    "mtime": "2022-10-08T13:54:20.429Z",
    "size": 120165,
    "path": "../public/program/assets/Snipaste_2022-10-08_21-54-19.png"
  },
  "/program/assets/Snipaste_2022-10-09_00-21-09.png": {
    "type": "image/png",
    "etag": "\"291f1-qOO7NnTVX/rGCX9n+tvgsalM30M\"",
    "mtime": "2022-10-08T16:21:10.472Z",
    "size": 168433,
    "path": "../public/program/assets/Snipaste_2022-10-09_00-21-09.png"
  },
  "/program/assets/Snipaste_2022-10-09_00-23-32.png": {
    "type": "image/png",
    "etag": "\"222b0-/85g0Uyn28hBihqB4VqJ4DjNt4k\"",
    "mtime": "2022-10-08T16:23:33.358Z",
    "size": 139952,
    "path": "../public/program/assets/Snipaste_2022-10-09_00-23-32.png"
  },
  "/program/assets/Snipaste_2022-10-09_11-18-42.png": {
    "type": "image/png",
    "etag": "\"13552-mHo0kEvkYIJFGNWcw6dlACEo9nI\"",
    "mtime": "2022-10-09T03:18:43.687Z",
    "size": 79186,
    "path": "../public/program/assets/Snipaste_2022-10-09_11-18-42.png"
  },
  "/program/assets/Snipaste_2022-10-09_11-20-53.png": {
    "type": "image/png",
    "etag": "\"46ade-qBsvCeUIJvJFGr9j14tPoYVfZMg\"",
    "mtime": "2022-10-09T03:20:54.411Z",
    "size": 289502,
    "path": "../public/program/assets/Snipaste_2022-10-09_11-20-53.png"
  },
  "/program/assets/Snipaste_2022-10-09_11-30-08.png": {
    "type": "image/png",
    "etag": "\"3009-+PzFc2KnfK/bqvABEekfSDFfvk8\"",
    "mtime": "2022-10-09T03:30:09.595Z",
    "size": 12297,
    "path": "../public/program/assets/Snipaste_2022-10-09_11-30-08.png"
  },
  "/program/assets/Snipaste_2022-10-09_11-30-20.png": {
    "type": "image/png",
    "etag": "\"5cbb-utXGCqLAUtNxHayjouIpQ4xhXnU\"",
    "mtime": "2022-10-09T03:30:20.704Z",
    "size": 23739,
    "path": "../public/program/assets/Snipaste_2022-10-09_11-30-20.png"
  },
  "/program/assets/Snipaste_2022-10-09_13-43-10.png": {
    "type": "image/png",
    "etag": "\"106c7-au9eWM04CyESGPNMkFA0DmeWICo\"",
    "mtime": "2022-10-09T05:43:11.474Z",
    "size": 67271,
    "path": "../public/program/assets/Snipaste_2022-10-09_13-43-10.png"
  },
  "/program/assets/Snipaste_2022-10-09_20-47-31.png": {
    "type": "image/png",
    "etag": "\"45356-7hj71V0p5pcHy4j81HZl69OF8R8\"",
    "mtime": "2022-10-09T12:47:32.168Z",
    "size": 283478,
    "path": "../public/program/assets/Snipaste_2022-10-09_20-47-31.png"
  },
  "/program/assets/Snipaste_2022-10-09_20-47-36.png": {
    "type": "image/png",
    "etag": "\"b2e9-sJDo0gXenEYe88lWOBrkQpeTE4U\"",
    "mtime": "2022-10-09T12:47:37.566Z",
    "size": 45801,
    "path": "../public/program/assets/Snipaste_2022-10-09_20-47-36.png"
  },
  "/program/assets/Snipaste_2022-10-09_22-24-26.png": {
    "type": "image/png",
    "etag": "\"2b725-S5eg/3xMtuZbNITAmCq6AaBHNBE\"",
    "mtime": "2022-10-09T14:24:27.607Z",
    "size": 177957,
    "path": "../public/program/assets/Snipaste_2022-10-09_22-24-26.png"
  },
  "/program/assets/Snipaste_2022-10-09_22-26-41.png": {
    "type": "image/png",
    "etag": "\"22276-OM66Pmjq3EUXNTE4aE1m/tKBo8k\"",
    "mtime": "2022-10-09T14:26:42.254Z",
    "size": 139894,
    "path": "../public/program/assets/Snipaste_2022-10-09_22-26-41.png"
  },
  "/program/assets/Snipaste_2022-10-09_22-31-59.png": {
    "type": "image/png",
    "etag": "\"4f00e-TnM5RS8m8AoCOxQbdqiN0whWu5A\"",
    "mtime": "2022-10-09T14:32:00.810Z",
    "size": 323598,
    "path": "../public/program/assets/Snipaste_2022-10-09_22-31-59.png"
  },
  "/program/assets/Snipaste_2022-10-09_22-32-50.png": {
    "type": "image/png",
    "etag": "\"37de4-aBVRU+uB46VKkCr6ERO3PtBYmjk\"",
    "mtime": "2022-10-09T14:32:51.329Z",
    "size": 228836,
    "path": "../public/program/assets/Snipaste_2022-10-09_22-32-50.png"
  },
  "/program/assets/Snipaste_2022-10-10_12-08-00.png": {
    "type": "image/png",
    "etag": "\"2608d-GsCITphNHcehZeic5Zltj3punYw\"",
    "mtime": "2022-10-10T04:08:02.265Z",
    "size": 155789,
    "path": "../public/program/assets/Snipaste_2022-10-10_12-08-00.png"
  },
  "/program/assets/Snipaste_2022-10-10_12-14-21.png": {
    "type": "image/png",
    "etag": "\"187ba-JDjW9uepxUBlSk/IMWpgFsqQ95o\"",
    "mtime": "2022-10-10T04:14:22.885Z",
    "size": 100282,
    "path": "../public/program/assets/Snipaste_2022-10-10_12-14-21.png"
  },
  "/program/assets/Snipaste_2022-10-10_12-23-44.png": {
    "type": "image/png",
    "etag": "\"24e6c-tj1bWe8Z/kojBVMM31lV7ATd6CM\"",
    "mtime": "2022-10-10T04:23:45.213Z",
    "size": 151148,
    "path": "../public/program/assets/Snipaste_2022-10-10_12-23-44.png"
  },
  "/program/assets/Snipaste_2022-10-10_14-30-28.png": {
    "type": "image/png",
    "etag": "\"2000a-Ri6LrmkRhB0VQTxRTtDUHDieRws\"",
    "mtime": "2022-10-10T06:30:29.261Z",
    "size": 131082,
    "path": "../public/program/assets/Snipaste_2022-10-10_14-30-28.png"
  },
  "/program/assets/Snipaste_2022-10-10_14-31-46.png": {
    "type": "image/png",
    "etag": "\"eb7f-pEn/t5NKUcTGKMwpqmD0/dD0sHM\"",
    "mtime": "2022-10-10T06:31:47.711Z",
    "size": 60287,
    "path": "../public/program/assets/Snipaste_2022-10-10_14-31-46.png"
  },
  "/program/assets/Snipaste_2022-10-10_14-32-36.png": {
    "type": "image/png",
    "etag": "\"2e653-cU3du2AISWGPPnqanhqh51FVeoQ\"",
    "mtime": "2022-10-10T06:32:37.283Z",
    "size": 190035,
    "path": "../public/program/assets/Snipaste_2022-10-10_14-32-36.png"
  },
  "/program/assets/Snipaste_2022-10-13_17-41-16.png": {
    "type": "image/png",
    "etag": "\"4e73f-12H05n1TUqoUow1TF0V7hyg77+E\"",
    "mtime": "2022-10-13T09:41:24.202Z",
    "size": 321343,
    "path": "../public/program/assets/Snipaste_2022-10-13_17-41-16.png"
  },
  "/program/assets/Snipaste_2022-10-13_17-42-02.png": {
    "type": "image/png",
    "etag": "\"166a7-hsdgSjt9V2T2w85OFGOO/EiSbdQ\"",
    "mtime": "2022-10-13T09:42:03.714Z",
    "size": 91815,
    "path": "../public/program/assets/Snipaste_2022-10-13_17-42-02.png"
  },
  "/program/assets/Snipaste_2022-10-13_17-44-30.png": {
    "type": "image/png",
    "etag": "\"149df-oMhmQ2qVUBpyv3JcaZh9QtSs6+I\"",
    "mtime": "2022-10-13T09:44:31.722Z",
    "size": 84447,
    "path": "../public/program/assets/Snipaste_2022-10-13_17-44-30.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-35-57.png": {
    "type": "image/png",
    "etag": "\"37813-gUtL8Is6PxU3UI4gQcypAIdaxxQ\"",
    "mtime": "2022-10-13T11:35:58.575Z",
    "size": 227347,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-35-57.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-37-48.png": {
    "type": "image/png",
    "etag": "\"23626-RYF0emAfX9W7Z2GYHEK+hF6x9yc\"",
    "mtime": "2022-10-13T11:37:48.983Z",
    "size": 144934,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-37-48.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-38-16.png": {
    "type": "image/png",
    "etag": "\"4acc2-TRqLITwG5e8uXBk03ut+mDvj68I\"",
    "mtime": "2022-10-13T11:38:18.537Z",
    "size": 306370,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-38-16.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-42-02.png": {
    "type": "image/png",
    "etag": "\"276a0-km7Xuu3sWfw6TsRnzZdiVq7FZ74\"",
    "mtime": "2022-10-13T11:42:04.010Z",
    "size": 161440,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-42-02.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-52-00.png": {
    "type": "image/png",
    "etag": "\"1840d-5MX+XiObagCF5bRlK5LJmqfCkCQ\"",
    "mtime": "2022-10-13T11:52:01.150Z",
    "size": 99341,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-52-00.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-52-26.png": {
    "type": "image/png",
    "etag": "\"2e65f-hMQRm73Al0Ujr6Q8AWUoGWZxbbc\"",
    "mtime": "2022-10-13T11:52:27.504Z",
    "size": 190047,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-52-26.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-54-16.png": {
    "type": "image/png",
    "etag": "\"2188e-KaWFnvieAgrB7SgtUts5eGRPGLg\"",
    "mtime": "2022-10-13T11:54:17.875Z",
    "size": 137358,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-54-16.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-54-44.png": {
    "type": "image/png",
    "etag": "\"1c60a-LvMLD+SQwhZUNxzEyVl15t5MJT8\"",
    "mtime": "2022-10-13T11:54:45.414Z",
    "size": 116234,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-54-44.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-55-22.png": {
    "type": "image/png",
    "etag": "\"102c2f-9xXDkmtTSOtCPX+3qq377MpJc1o\"",
    "mtime": "2022-10-13T11:55:23.613Z",
    "size": 1059887,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-55-22.png"
  },
  "/program/assets/Snipaste_2022-10-13_19-56-06.png": {
    "type": "image/png",
    "etag": "\"35354-UMbpbGNXUSNnGqUurf6EDCJPjuU\"",
    "mtime": "2022-10-13T11:56:07.285Z",
    "size": 217940,
    "path": "../public/program/assets/Snipaste_2022-10-13_19-56-06.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-07-07.png": {
    "type": "image/png",
    "etag": "\"739f-8fxDGeAcj3ivY/azqTGHntfGIvk\"",
    "mtime": "2022-10-13T12:07:10.105Z",
    "size": 29599,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-07-07.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-24-14.png": {
    "type": "image/png",
    "etag": "\"4b4a-egR51qQ8BJ8INh7K6eBAlkXnJsY\"",
    "mtime": "2022-10-13T12:24:15.288Z",
    "size": 19274,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-24-14.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-24-45.png": {
    "type": "image/png",
    "etag": "\"19437-5sfx6BNJrvuuVJxyCfLvOVevbhY\"",
    "mtime": "2022-10-13T12:24:46.466Z",
    "size": 103479,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-24-45.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-31-10.png": {
    "type": "image/png",
    "etag": "\"189b0-ngGsvYKOw6wezr6aDHtFpSbiREw\"",
    "mtime": "2022-10-13T12:31:11.279Z",
    "size": 100784,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-31-10.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-31-30.png": {
    "type": "image/png",
    "etag": "\"332f2-IvcfvMsRT/EESjoKwH+kbaCgNH0\"",
    "mtime": "2022-10-13T12:31:31.856Z",
    "size": 209650,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-31-30.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-32-01.png": {
    "type": "image/png",
    "etag": "\"3e974-LDIe/iGxDwqO+Wlcgv7o/oEmSKQ\"",
    "mtime": "2022-10-13T12:32:02.856Z",
    "size": 256372,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-32-01.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-32-11.png": {
    "type": "image/png",
    "etag": "\"d66b4-8pKcgZFa97iJSetU2y4PTRvwtpk\"",
    "mtime": "2022-10-13T12:32:12.926Z",
    "size": 878260,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-32-11.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-32-19.png": {
    "type": "image/png",
    "etag": "\"4f35-+mnLvkmUNaJZGtOPq08rMFqxL2g\"",
    "mtime": "2022-10-13T12:32:19.996Z",
    "size": 20277,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-32-19.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-38-41.png": {
    "type": "image/png",
    "etag": "\"4cb55-4UjemAN4kzOICkA+F+/vE8NBQNI\"",
    "mtime": "2022-10-13T12:38:42.757Z",
    "size": 314197,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-38-41.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-40-15.png": {
    "type": "image/png",
    "etag": "\"19248-F8Qp09kl6vEFdd6pcwaZhD8GCKQ\"",
    "mtime": "2022-10-13T12:40:16.847Z",
    "size": 102984,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-40-15.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-56-19.png": {
    "type": "image/png",
    "etag": "\"1831-vmOcXb63pXaSqIHw+SiTe/cgs08\"",
    "mtime": "2022-10-13T12:56:20.815Z",
    "size": 6193,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-56-19.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-58-39.png": {
    "type": "image/png",
    "etag": "\"6ce7-CWm2LD/FwB7OBy6tsWunxkfb2pw\"",
    "mtime": "2022-10-13T12:58:40.129Z",
    "size": 27879,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-58-39.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-59-07.png": {
    "type": "image/png",
    "etag": "\"e47eb-IF3tmDQ02sPWsaXtP3ZBW7WO+0E\"",
    "mtime": "2022-10-13T12:59:08.959Z",
    "size": 935915,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-59-07.png"
  },
  "/program/assets/Snipaste_2022-10-13_20-59-17.png": {
    "type": "image/png",
    "etag": "\"29092-6xfJXktHEi/j417W65D+/fmtptw\"",
    "mtime": "2022-10-13T12:59:18.302Z",
    "size": 168082,
    "path": "../public/program/assets/Snipaste_2022-10-13_20-59-17.png"
  },
  "/program/assets/Snipaste_2022-10-13_21-02-04.png": {
    "type": "image/png",
    "etag": "\"271c8-ZYIKmRoSYMOq+6AYftXD94KMkSg\"",
    "mtime": "2022-10-13T13:02:05.499Z",
    "size": 160200,
    "path": "../public/program/assets/Snipaste_2022-10-13_21-02-04.png"
  },
  "/program/assets/Snipaste_2022-10-13_21-23-20.png": {
    "type": "image/png",
    "etag": "\"113d5-5cLliNk0QdCHDVMijkVkLNk6dq0\"",
    "mtime": "2022-10-13T13:23:21.557Z",
    "size": 70613,
    "path": "../public/program/assets/Snipaste_2022-10-13_21-23-20.png"
  },
  "/program/assets/Snipaste_2022-10-13_21-47-33.png": {
    "type": "image/png",
    "etag": "\"3b8c-XnIatYzfzwuNrVoO+MLxKZ/g9Sc\"",
    "mtime": "2022-10-13T13:47:34.215Z",
    "size": 15244,
    "path": "../public/program/assets/Snipaste_2022-10-13_21-47-33.png"
  },
  "/program/assets/Snipaste_2022-10-13_22-54-34.png": {
    "type": "image/png",
    "etag": "\"135bb-dkli1H3hMS+xKGzHfwOUV09UMjM\"",
    "mtime": "2022-10-13T14:54:35.108Z",
    "size": 79291,
    "path": "../public/program/assets/Snipaste_2022-10-13_22-54-34.png"
  },
  "/program/assets/Snipaste_2022-10-13_23-00-23.png": {
    "type": "image/png",
    "etag": "\"23f8d-aaIq+RHcPvw11HjBJPSyda/GbyE\"",
    "mtime": "2022-10-13T15:00:25.028Z",
    "size": 147341,
    "path": "../public/program/assets/Snipaste_2022-10-13_23-00-23.png"
  },
  "/program/assets/Snipaste_2022-10-13_23-01-48.png": {
    "type": "image/png",
    "etag": "\"49fc8-JY7pS5VGw95CRTDckOSz5AyA2Qc\"",
    "mtime": "2022-10-13T15:01:49.814Z",
    "size": 303048,
    "path": "../public/program/assets/Snipaste_2022-10-13_23-01-48.png"
  },
  "/program/assets/Snipaste_2022-10-13_23-07-56.png": {
    "type": "image/png",
    "etag": "\"71a7-xZiYS61p+sKywqmNkCGPIgNRsV8\"",
    "mtime": "2022-10-13T15:07:57.522Z",
    "size": 29095,
    "path": "../public/program/assets/Snipaste_2022-10-13_23-07-56.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-26-17.png": {
    "type": "image/png",
    "etag": "\"36d41-R3Bg++nkyxZZynZQwQk9G3T2UIw\"",
    "mtime": "2022-10-14T09:26:25.283Z",
    "size": 224577,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-26-17.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-26-51.png": {
    "type": "image/png",
    "etag": "\"25be-pDr4JGgT8lSYIMJ1CvKL5NJaV/g\"",
    "mtime": "2022-10-14T09:26:51.894Z",
    "size": 9662,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-26-51.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-28-04.png": {
    "type": "image/png",
    "etag": "\"4d4ee-ka3EHBoXI9lMUdYdrZv248d1sGA\"",
    "mtime": "2022-10-14T09:28:06.048Z",
    "size": 316654,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-28-04.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-28-38.png": {
    "type": "image/png",
    "etag": "\"3d2a3-V4X0ySvBchkDlVA1w1y/kXSw81Y\"",
    "mtime": "2022-10-14T09:28:39.123Z",
    "size": 250531,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-28-38.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-28-50.png": {
    "type": "image/png",
    "etag": "\"6d976-6o6MBqQpUQQlaleItiyVrLm8/7A\"",
    "mtime": "2022-10-14T09:28:51.227Z",
    "size": 448886,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-28-50.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-32-14.png": {
    "type": "image/png",
    "etag": "\"28c73-OWgw9HYFjEPBuscp9nMMibiD9qk\"",
    "mtime": "2022-10-14T09:32:15.015Z",
    "size": 167027,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-32-14.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-43-18.png": {
    "type": "image/png",
    "etag": "\"18073-X5T7YCz2Kjqwg106NvQSav6SnW0\"",
    "mtime": "2022-10-14T09:43:19.164Z",
    "size": 98419,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-43-18.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-43-24.png": {
    "type": "image/png",
    "etag": "\"1e72a-zR90HCtHtdzrFKEITFPbNnafhcI\"",
    "mtime": "2022-10-14T09:43:25.838Z",
    "size": 124714,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-43-24.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-54-04.png": {
    "type": "image/png",
    "etag": "\"134be-s3VjDZmdXKOVoQYis9WYe4sw35U\"",
    "mtime": "2022-10-14T09:54:05.674Z",
    "size": 79038,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-54-04.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-54-56.png": {
    "type": "image/png",
    "etag": "\"1f2c0-U5Qeu1TYMNS5bFSOykkgyyFIC5A\"",
    "mtime": "2022-10-14T09:54:57.697Z",
    "size": 127680,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-54-56.png"
  },
  "/program/assets/Snipaste_2022-10-14_17-57-09.png": {
    "type": "image/png",
    "etag": "\"150a3-pVX5AnqBL7wh1onlp+S6gmlFZcY\"",
    "mtime": "2022-10-14T09:57:10.622Z",
    "size": 86179,
    "path": "../public/program/assets/Snipaste_2022-10-14_17-57-09.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-08-44.png": {
    "type": "image/png",
    "etag": "\"21089-23kTMlNDXku2kx740LYGgRY1QE0\"",
    "mtime": "2022-10-14T10:08:45.194Z",
    "size": 135305,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-08-44.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-09-35.png": {
    "type": "image/png",
    "etag": "\"371b1-oMq1+W9UXpOnGdeYrRedkBfJjvI\"",
    "mtime": "2022-10-14T10:09:37.073Z",
    "size": 225713,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-09-35.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-10-24.png": {
    "type": "image/png",
    "etag": "\"9817-VEEe8kr2gy/vpO/PD7058f3ekPI\"",
    "mtime": "2022-10-14T10:10:25.404Z",
    "size": 38935,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-10-24.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-10-51.png": {
    "type": "image/png",
    "etag": "\"34dc2-P3Hr5OG1cOhh1LGJXi1s6vEarVE\"",
    "mtime": "2022-10-14T10:10:52.249Z",
    "size": 216514,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-10-51.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-12-50.png": {
    "type": "image/png",
    "etag": "\"47e7f-VQspZBWuDDe3dw57mNRgbKKn3ag\"",
    "mtime": "2022-10-14T10:12:51.746Z",
    "size": 294527,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-12-50.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-14-00.png": {
    "type": "image/png",
    "etag": "\"36e4e-Y26TwK25SkGdF64IwFHdYpzU9Rg\"",
    "mtime": "2022-10-14T10:14:01.894Z",
    "size": 224846,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-14-00.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-16-27.png": {
    "type": "image/png",
    "etag": "\"1a567-BQGD2r4yYaceDJqzL6pDe9FNeXY\"",
    "mtime": "2022-10-14T10:16:28.372Z",
    "size": 107879,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-16-27.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-16-34.png": {
    "type": "image/png",
    "etag": "\"2aa08-TL08v/rk+xNnFuG3ktFe2f7fYDw\"",
    "mtime": "2022-10-14T10:16:35.588Z",
    "size": 174600,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-16-34.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-18-19.png": {
    "type": "image/png",
    "etag": "\"75985-XJ1OX0pRZrI+AyK3UIXFlxHydto\"",
    "mtime": "2022-10-14T10:18:20.095Z",
    "size": 481669,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-18-19.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-20-16.png": {
    "type": "image/png",
    "etag": "\"4a1f2-tKxqglvVdL41C0+stAYwPXHbIlM\"",
    "mtime": "2022-10-14T10:20:17.145Z",
    "size": 303602,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-20-16.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-20-22.png": {
    "type": "image/png",
    "etag": "\"4e847-vsg0pQb11c/Jl244rw2pA27oZZo\"",
    "mtime": "2022-10-14T10:20:23.621Z",
    "size": 321607,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-20-22.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-21-19.png": {
    "type": "image/png",
    "etag": "\"409a2-pucHzaldrLT9iXQNIcrtQ0Kvg6Q\"",
    "mtime": "2022-10-14T10:21:21.313Z",
    "size": 264610,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-21-19.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-23-08.png": {
    "type": "image/png",
    "etag": "\"2d406-Gu1IuVgd6FQDsOgME/mcvB7K1bE\"",
    "mtime": "2022-10-14T10:23:10.009Z",
    "size": 185350,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-23-08.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-24-05.png": {
    "type": "image/png",
    "etag": "\"245c0-jRpltggvoPig+xKL8YvmZGKh8ek\"",
    "mtime": "2022-10-14T10:24:06.779Z",
    "size": 148928,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-24-05.png"
  },
  "/program/assets/Snipaste_2022-10-14_18-27-02.png": {
    "type": "image/png",
    "etag": "\"dae6-V87JaH7M6s89KO9py2Wj9Y+V+iM\"",
    "mtime": "2022-10-14T10:27:04.033Z",
    "size": 56038,
    "path": "../public/program/assets/Snipaste_2022-10-14_18-27-02.png"
  },
  "/program/assets/Snipaste_2022-10-14_19-35-17.png": {
    "type": "image/png",
    "etag": "\"6e60c-Ms8ANkQvon8sJ7EzecoGmRrqObk\"",
    "mtime": "2022-10-14T11:35:18.875Z",
    "size": 452108,
    "path": "../public/program/assets/Snipaste_2022-10-14_19-35-17.png"
  },
  "/program/assets/Snipaste_2022-10-14_19-44-37.png": {
    "type": "image/png",
    "etag": "\"32c75-rjWnWL9x4IbBC0hMWKDwCHah5fo\"",
    "mtime": "2022-10-14T11:44:38.731Z",
    "size": 207989,
    "path": "../public/program/assets/Snipaste_2022-10-14_19-44-37.png"
  },
  "/program/assets/Snipaste_2022-10-14_19-46-10.png": {
    "type": "image/png",
    "etag": "\"340f6-qw3gd+C+9O5q933AKd1gmz+Vu8U\"",
    "mtime": "2022-10-14T11:46:11.786Z",
    "size": 213238,
    "path": "../public/program/assets/Snipaste_2022-10-14_19-46-10.png"
  },
  "/program/assets/Snipaste_2022-10-15_15-13-16.png": {
    "type": "image/png",
    "etag": "\"5039-StH8TQ4Je1OvxX8bpnjlrBwokI8\"",
    "mtime": "2022-10-15T07:13:17.463Z",
    "size": 20537,
    "path": "../public/program/assets/Snipaste_2022-10-15_15-13-16.png"
  },
  "/program/assets/sourcemap.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a53-kBkoZKFhpoTzuOgZ1slKsdxyP7Y\"",
    "mtime": "2022-07-24T17:12:03.579Z",
    "size": 27219,
    "path": "../public/program/assets/sourcemap.jpg"
  },
  "/program/assets/template.jpg": {
    "type": "image/jpeg",
    "etag": "\"3343-DQVopMiZuK4SnGubsrm2k5OpYGA\"",
    "mtime": "2022-07-26T14:31:59.520Z",
    "size": 13123,
    "path": "../public/program/assets/template.jpg"
  },
  "/program/assets/template2.jpg": {
    "type": "image/jpeg",
    "etag": "\"888c-UxCx92Mjw4RfcvcIgfZ6I/NQXpM\"",
    "mtime": "2022-07-26T14:32:23.756Z",
    "size": 34956,
    "path": "../public/program/assets/template2.jpg"
  },
  "/program/assets/template3.jpg": {
    "type": "image/jpeg",
    "etag": "\"556c-4XD8iMpdwdu/lGwgibXPRIBG5kA\"",
    "mtime": "2022-07-26T14:32:47.951Z",
    "size": 21868,
    "path": "../public/program/assets/template3.jpg"
  },
  "/program/assets/template4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e7d-/c5ylrKvH9+ywBuK99PJ7O3MYCM\"",
    "mtime": "2022-07-26T14:32:54.390Z",
    "size": 20093,
    "path": "../public/program/assets/template4.jpg"
  },
  "/program/assets/v-bind.jpg": {
    "type": "image/jpeg",
    "etag": "\"939b-MWjE+Lo7yGCKyrSGoavR+ivr2Uw\"",
    "mtime": "2022-07-26T06:50:47.639Z",
    "size": 37787,
    "path": "../public/program/assets/v-bind.jpg"
  },
  "/program/assets/v-bind2.jpg": {
    "type": "image/jpeg",
    "etag": "\"9be9-A0LAY+grXiNd8+H3Bujr8+POG9M\"",
    "mtime": "2022-07-26T06:51:10.475Z",
    "size": 39913,
    "path": "../public/program/assets/v-bind2.jpg"
  },
  "/program/assets/v-else-if.jpg": {
    "type": "image/jpeg",
    "etag": "\"4881-kfGEQBQ/QaoMEuIGSvND83rCKfk\"",
    "mtime": "2022-07-26T09:07:30.370Z",
    "size": 18561,
    "path": "../public/program/assets/v-else-if.jpg"
  },
  "/program/assets/v-else.jpg": {
    "type": "image/jpeg",
    "etag": "\"4475-HneEpSJT+SpetMXiCrF9Td0i2qc\"",
    "mtime": "2022-07-26T09:07:02.336Z",
    "size": 17525,
    "path": "../public/program/assets/v-else.jpg"
  },
  "/program/assets/v-for.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f5b-YWk6VJeQuO2sGOy1GXnZgkYJHxs\"",
    "mtime": "2022-07-26T09:24:03.712Z",
    "size": 24411,
    "path": "../public/program/assets/v-for.jpg"
  },
  "/program/assets/v-for2.jpg": {
    "type": "image/jpeg",
    "etag": "\"679d-U4EWo4PRJaScE+XJX8AEfUq7eeo\"",
    "mtime": "2022-07-26T09:24:35.964Z",
    "size": 26525,
    "path": "../public/program/assets/v-for2.jpg"
  },
  "/program/assets/v-for3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7226-9KguD1Z07M3M6epVggMR5ya1lp0\"",
    "mtime": "2022-07-26T09:24:59.513Z",
    "size": 29222,
    "path": "../public/program/assets/v-for3.jpg"
  },
  "/program/assets/v-html.jpg": {
    "type": "image/jpeg",
    "etag": "\"5655-PWUyeYh81CZ4gyIqXUt6ZpF9Puo\"",
    "mtime": "2022-07-26T06:49:47.355Z",
    "size": 22101,
    "path": "../public/program/assets/v-html.jpg"
  },
  "/program/assets/v-html2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2a36-q0zQwv7GpQdZxk4jBTWi5vQiPlg\"",
    "mtime": "2022-07-26T06:50:17.843Z",
    "size": 10806,
    "path": "../public/program/assets/v-html2.jpg"
  },
  "/program/assets/v-model.jpg": {
    "type": "image/jpeg",
    "etag": "\"8758-AB3dTPuugx5txMSDqJndWM73v1U\"",
    "mtime": "2022-07-26T08:49:14.812Z",
    "size": 34648,
    "path": "../public/program/assets/v-model.jpg"
  },
  "/program/assets/v-model11.jpg": {
    "type": "image/jpeg",
    "etag": "\"6aa7-TBbdljpzYF8NhQV5GqSrTNBI6rw\"",
    "mtime": "2022-07-27T09:58:59.211Z",
    "size": 27303,
    "path": "../public/program/assets/v-model11.jpg"
  },
  "/program/assets/v-model12.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a1e-3n4LfzOyHEZKzthbmeHaHYYZ9h0\"",
    "mtime": "2022-07-27T09:59:31.638Z",
    "size": 35358,
    "path": "../public/program/assets/v-model12.jpg"
  },
  "/program/assets/v-model13.jpg": {
    "type": "image/jpeg",
    "etag": "\"a92f-U+vrEVyHUnQYY2xuIy8z7uxIxXU\"",
    "mtime": "2022-07-27T09:59:37.588Z",
    "size": 43311,
    "path": "../public/program/assets/v-model13.jpg"
  },
  "/program/assets/v-on.jpg": {
    "type": "image/jpeg",
    "etag": "\"46ea-359jvceFXsqhivtEU3fxngikxkc\"",
    "mtime": "2022-07-26T06:52:02.644Z",
    "size": 18154,
    "path": "../public/program/assets/v-on.jpg"
  },
  "/program/assets/v-on2.jpg": {
    "type": "image/jpeg",
    "etag": "\"81f5-P5wXiITHg/GrjCFvqXCtaFKvWgs\"",
    "mtime": "2022-07-26T06:52:19.261Z",
    "size": 33269,
    "path": "../public/program/assets/v-on2.jpg"
  },
  "/program/assets/v-on3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cd6-UigGxwX21HuPpa07u9wMnnEE9GE\"",
    "mtime": "2022-07-26T06:52:32.849Z",
    "size": 31958,
    "path": "../public/program/assets/v-on3.jpg"
  },
  "/program/assets/v-on4.jpg": {
    "type": "image/jpeg",
    "etag": "\"95af-Ac42bbqfwf2mNnCD/t9XAlzHeEk\"",
    "mtime": "2022-07-26T06:54:02.257Z",
    "size": 38319,
    "path": "../public/program/assets/v-on4.jpg"
  },
  "/program/assets/v-on5.jpg": {
    "type": "image/jpeg",
    "etag": "\"7131-CwTSdn/I3LSyHYxCyZkCOspDo2w\"",
    "mtime": "2022-07-26T06:54:42.396Z",
    "size": 28977,
    "path": "../public/program/assets/v-on5.jpg"
  },
  "/program/assets/v-on6.jpg": {
    "type": "image/jpeg",
    "etag": "\"a604-VLoaiPqZS62n26rk2m8TAaEmdcc\"",
    "mtime": "2022-07-26T06:55:25.602Z",
    "size": 42500,
    "path": "../public/program/assets/v-on6.jpg"
  },
  "/program/assets/v-on7.jpg": {
    "type": "image/jpeg",
    "etag": "\"4444-Z1a5EIlRzWu5G1KQePdRQYF4cZ4\"",
    "mtime": "2022-07-26T06:56:34.751Z",
    "size": 17476,
    "path": "../public/program/assets/v-on7.jpg"
  },
  "/program/assets/v-text01.jpg": {
    "type": "image/jpeg",
    "etag": "\"6727-ZPFfQ1Xdraob1T4b8RYrq7VKWE4\"",
    "mtime": "2022-07-26T06:48:49.872Z",
    "size": 26407,
    "path": "../public/program/assets/v-text01.jpg"
  },
  "/program/assets/vite.jpg": {
    "type": "image/jpeg",
    "etag": "\"7059-7WiOaxlTIZ5kGOCA+o8DAcFuxQE\"",
    "mtime": "2022-07-26T13:20:13.100Z",
    "size": 28761,
    "path": "../public/program/assets/vite.jpg"
  },
  "/program/assets/vue-cli.jpg": {
    "type": "image/jpeg",
    "etag": "\"41f5-HUBzS2R3beKf24MvdiIw0gwgTC4\"",
    "mtime": "2022-07-30T09:51:28.257Z",
    "size": 16885,
    "path": "../public/program/assets/vue-cli.jpg"
  },
  "/program/assets/vue-cli2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4646-2Z/84ga12blUH10HVogKliYG0LI\"",
    "mtime": "2022-07-30T09:52:29.111Z",
    "size": 17990,
    "path": "../public/program/assets/vue-cli2.jpg"
  },
  "/program/assets/vue2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4597-QTjDdWrVyspr/EW58V/Ou8dpZ8Q\"",
    "mtime": "2022-07-30T09:59:10.430Z",
    "size": 17815,
    "path": "../public/program/assets/vue2.jpg"
  },
  "/program/assets/vue2main.js.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b30-VEmzx0I7m1KlohwF0ihvGAuAlDs\"",
    "mtime": "2022-07-30T09:59:36.513Z",
    "size": 39728,
    "path": "../public/program/assets/vue2main.js.jpg"
  },
  "/program/assets/vuecmd1.jpg": {
    "type": "image/jpeg",
    "etag": "\"acbd-hh8jJKG4IWUtvi3EqS3sNYjOU00\"",
    "mtime": "2022-07-30T09:57:37.218Z",
    "size": 44221,
    "path": "../public/program/assets/vuecmd1.jpg"
  },
  "/program/assets/vuecmd2.jpg": {
    "type": "image/jpeg",
    "etag": "\"c229-I7ECrH9pEk/Z5Tg9TqBDvEeV5fY\"",
    "mtime": "2022-07-30T09:57:53.009Z",
    "size": 49705,
    "path": "../public/program/assets/vuecmd2.jpg"
  },
  "/program/assets/vuecmd3.jpg": {
    "type": "image/jpeg",
    "etag": "\"9263-Mpw+B2MqbGDQUL62cLb7nWi2DVQ\"",
    "mtime": "2022-07-30T09:57:56.378Z",
    "size": 37475,
    "path": "../public/program/assets/vuecmd3.jpg"
  },
  "/program/assets/vuecmd4.jpg": {
    "type": "image/jpeg",
    "etag": "\"b02e-4z4XMO6gTyuGRzYIy8DdazGTa4k\"",
    "mtime": "2022-07-30T09:57:59.838Z",
    "size": 45102,
    "path": "../public/program/assets/vuecmd4.jpg"
  },
  "/program/assets/vuecmd5.jpg": {
    "type": "image/jpeg",
    "etag": "\"eb68-rYWOrgjoVtktJMIBjYH0geQN7KA\"",
    "mtime": "2022-07-30T09:58:03.264Z",
    "size": 60264,
    "path": "../public/program/assets/vuecmd5.jpg"
  },
  "/program/assets/vuecmd6.jpg": {
    "type": "image/jpeg",
    "etag": "\"e06b-XyYfMudOw6TgfEoVQKRfddB66pM\"",
    "mtime": "2022-07-30T09:58:06.857Z",
    "size": 57451,
    "path": "../public/program/assets/vuecmd6.jpg"
  },
  "/program/assets/vuecmd7.jpg": {
    "type": "image/jpeg",
    "etag": "\"d110-ZQ2LMWib3jmyl/8V0vciTm6gbKc\"",
    "mtime": "2022-07-30T09:58:10.121Z",
    "size": 53520,
    "path": "../public/program/assets/vuecmd7.jpg"
  },
  "/program/assets/vuecmd8.jpg": {
    "type": "image/jpeg",
    "etag": "\"99c3-Bk6JY0gQYR8Z8ki+smssekqU8QM\"",
    "mtime": "2022-07-30T09:58:13.329Z",
    "size": 39363,
    "path": "../public/program/assets/vuecmd8.jpg"
  },
  "/program/assets/vuecmd9.jpg": {
    "type": "image/jpeg",
    "etag": "\"10721-hsunUPrz79IKmjdG3Kim0RNT0qE\"",
    "mtime": "2022-07-30T09:58:17.103Z",
    "size": 67361,
    "path": "../public/program/assets/vuecmd9.jpg"
  },
  "/program/assets/vuerouter3.x-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1055d-qkvQpHWKqaY/FlWW/c/Y+nZC+t0\"",
    "mtime": "2022-07-30T10:00:42.333Z",
    "size": 66909,
    "path": "../public/program/assets/vuerouter3.x-2.jpg"
  },
  "/program/assets/vuerouter3.x-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"e0e9-wvwCw12L7WQhBB3jDFjNrUBMN9g\"",
    "mtime": "2022-07-30T10:00:49.300Z",
    "size": 57577,
    "path": "../public/program/assets/vuerouter3.x-3.jpg"
  },
  "/program/assets/vuerouter3.x-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"7fa6-2wIX2dBTWWvFdBz6xF5iqDJPs5A\"",
    "mtime": "2022-07-30T10:00:53.469Z",
    "size": 32678,
    "path": "../public/program/assets/vuerouter3.x-4.jpg"
  },
  "/program/assets/vuerouter3.x-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"4daf-SDt5xrs/F92oXRyIh3TKn+HEkR4\"",
    "mtime": "2022-07-30T10:00:57.214Z",
    "size": 19887,
    "path": "../public/program/assets/vuerouter3.x-5.jpg"
  },
  "/program/assets/vuerouter3.x.jpg": {
    "type": "image/jpeg",
    "etag": "\"249a-/Wxk474EyR4BPxOUl/dEJzoJF48\"",
    "mtime": "2022-07-30T10:00:33.094Z",
    "size": 9370,
    "path": "../public/program/assets/vuerouter3.x.jpg"
  },
  "/program/assets/vuerouter4.x.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9fa-zgHl2JJAq+NnPAUGPRH9frdXGOc\"",
    "mtime": "2022-07-30T10:00:08.382Z",
    "size": 51706,
    "path": "../public/program/assets/vuerouter4.x.jpg"
  },
  "/program/assets/vueui.jpg": {
    "type": "image/jpeg",
    "etag": "\"db5d-xegs5v/lKOiL0Oy7510awz31nG8\"",
    "mtime": "2022-07-30T09:52:51.578Z",
    "size": 56157,
    "path": "../public/program/assets/vueui.jpg"
  },
  "/program/assets/vueui2.jpg": {
    "type": "image/jpeg",
    "etag": "\"d9bb-xcIkb/Pp292fPHvjZ0oS9WnfN8o\"",
    "mtime": "2022-07-30T09:53:00.950Z",
    "size": 55739,
    "path": "../public/program/assets/vueui2.jpg"
  },
  "/program/assets/vueui3.jpg": {
    "type": "image/jpeg",
    "etag": "\"dcef-9o0wUDVXur1FzxbsIh3LWzaHbzc\"",
    "mtime": "2022-07-30T09:53:07.924Z",
    "size": 56559,
    "path": "../public/program/assets/vueui3.jpg"
  },
  "/program/assets/vueui4-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"12e1c-p8IN18Ir0iP8N9DSjtrv84EFcXU\"",
    "mtime": "2022-07-30T09:53:12.579Z",
    "size": 77340,
    "path": "../public/program/assets/vueui4-1.jpg"
  },
  "/program/assets/vueui4-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"15ca2-BsGU/k9LdZb0yb/hzHJXOOz16D8\"",
    "mtime": "2022-07-30T09:53:16.963Z",
    "size": 89250,
    "path": "../public/program/assets/vueui4-2.jpg"
  },
  "/program/assets/vueui5-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"c28d-FEWEsaTY+ZNy6Z52C6W2qUMFLMI\"",
    "mtime": "2022-07-30T09:53:31.925Z",
    "size": 49805,
    "path": "../public/program/assets/vueui5-1.jpg"
  },
  "/program/assets/vueui5-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"dba3-y5lXbe216VqRR151oVPC+ivVxcI\"",
    "mtime": "2022-07-30T09:53:35.519Z",
    "size": 56227,
    "path": "../public/program/assets/vueui5-2.jpg"
  },
  "/program/assets/vueui6.jpg": {
    "type": "image/jpeg",
    "etag": "\"874c-kR9Zkw0mNHhyBho3PLEb+fITPEM\"",
    "mtime": "2022-07-30T09:53:40.458Z",
    "size": 34636,
    "path": "../public/program/assets/vueui6.jpg"
  },
  "/program/assets/vueui7.jpg": {
    "type": "image/jpeg",
    "etag": "\"4f64-ddKNWjvGsJ/yrdfbeCuAsTwBigg\"",
    "mtime": "2022-07-30T09:53:44.553Z",
    "size": 20324,
    "path": "../public/program/assets/vueui7.jpg"
  },
  "/program/assets/vueui8.jpg": {
    "type": "image/jpeg",
    "etag": "\"2302c-kWYeqRlrUrNCfQswH8z2y5rYOzM\"",
    "mtime": "2022-07-30T09:53:48.994Z",
    "size": 143404,
    "path": "../public/program/assets/vueui8.jpg"
  },
  "/program/assets/vueui9.jpg": {
    "type": "image/jpeg",
    "etag": "\"122fb-Po4WBDvKNsW4VpE9IWotmz63YrI\"",
    "mtime": "2022-07-30T09:53:53.233Z",
    "size": 74491,
    "path": "../public/program/assets/vueui9.jpg"
  },
  "/program/assets/vue数据驱动视图.jpg": {
    "type": "image/jpeg",
    "etag": "\"4308-oKyZUUNcAHQm+MjHcagVidwl7A4\"",
    "mtime": "2022-07-25T05:39:33.882Z",
    "size": 17160,
    "path": "../public/program/assets/vue数据驱动视图.jpg"
  },
  "/program/assets/watch.jpg": {
    "type": "image/jpeg",
    "etag": "\"748b-/gqzRmgR0bknHT9IY25D9Rub3JM\"",
    "mtime": "2022-07-28T04:04:25.615Z",
    "size": 29835,
    "path": "../public/program/assets/watch.jpg"
  },
  "/program/assets/watch2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e6f-t/lecC7clSbrcz7fKzw3ecJm/TM\"",
    "mtime": "2022-07-28T04:04:45.874Z",
    "size": 32367,
    "path": "../public/program/assets/watch2.jpg"
  },
  "/program/assets/watch3.jpg": {
    "type": "image/jpeg",
    "etag": "\"9845-29X04HYFI8kY+cEWgcElRVbKdXU\"",
    "mtime": "2022-07-28T04:04:52.401Z",
    "size": 38981,
    "path": "../public/program/assets/watch3.jpg"
  },
  "/program/assets/watch4.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7e1-A7aVxJqKrc+fu4sS8QcpepFdUQo\"",
    "mtime": "2022-07-28T04:05:19.162Z",
    "size": 42977,
    "path": "../public/program/assets/watch4.jpg"
  },
  "/program/assets/watch5.jpg": {
    "type": "image/jpeg",
    "etag": "\"968f-47aqZLoEAhF+6BhgFsur40RQcFw\"",
    "mtime": "2022-07-28T04:05:33.660Z",
    "size": 38543,
    "path": "../public/program/assets/watch5.jpg"
  },
  "/program/assets/{{}}.jpg": {
    "type": "image/jpeg",
    "etag": "\"4f9e-a7Hu/MWBdaTJ7OOlQH8KFe/jb8I\"",
    "mtime": "2022-07-26T06:49:26.027Z",
    "size": 20382,
    "path": "../public/program/assets/{{}}.jpg"
  },
  "/program/assets/双向数据绑定01.jpg": {
    "type": "image/jpeg",
    "etag": "\"459b-75fvaPYZhsUzJ4h+3GYwqeHJeMw\"",
    "mtime": "2022-07-25T05:41:03.608Z",
    "size": 17819,
    "path": "../public/program/assets/双向数据绑定01.jpg"
  },
  "/program/assets/双向数据绑定02.jpg": {
    "type": "image/jpeg",
    "etag": "\"46fe-bmM9CYjZoa9XrWr4R1H8y05QDIw\"",
    "mtime": "2022-07-25T05:41:29.571Z",
    "size": 18174,
    "path": "../public/program/assets/双向数据绑定02.jpg"
  },
  "/program/assets/回调地域01.jpg": {
    "type": "image/jpeg",
    "etag": "\"7a6e-NQAfiasd71QuEB7zdkgOrYa/3Qk\"",
    "mtime": "2022-07-24T04:47:37.183Z",
    "size": 31342,
    "path": "../public/program/assets/回调地域01.jpg"
  },
  "/program/assets/回调地域02.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d3d-lqUl1JRsHNKar+VLFllTgXNpfQw\"",
    "mtime": "2022-07-24T04:48:16.281Z",
    "size": 19773,
    "path": "../public/program/assets/回调地域02.jpg"
  },
  "/program/assets/基于Promise 封装读文件的方法.jpg": {
    "type": "image/jpeg",
    "etag": "\"9b09-wxuO5XbD8eAG1RwX4J+jWENZ5cA\"",
    "mtime": "2022-07-24T06:31:45.614Z",
    "size": 39689,
    "path": "../public/program/assets/基于Promise 封装读文件的方法.jpg"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

var version$1 = "0.5.4";

const components = {
  "Logo": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/Logo.vue",
    "pascalName": "Logo",
    "kebabName": "logo",
    "chunkName": "components/logo",
    "shortPath": "components/Logo.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/components/Logo.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "TestIcon": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/components/TestIcon.vue",
    "pascalName": "TestIcon",
    "kebabName": "test-icon",
    "chunkName": "components/test-icon",
    "shortPath": "components/TestIcon.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/components/TestIcon.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppFooter": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "pascalName": "AppFooter",
    "kebabName": "app-footer",
    "chunkName": "components/app-footer",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppFooter.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeader": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "pascalName": "AppHeader",
    "kebabName": "app-header",
    "chunkName": "components/app-header",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppHeader.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderDialog": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "pascalName": "AppHeaderDialog",
    "kebabName": "app-header-dialog",
    "chunkName": "components/app-header-dialog",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderLogo": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "pascalName": "AppHeaderLogo",
    "kebabName": "app-header-logo",
    "chunkName": "components/app-header-logo",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppHeaderNavigation": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "pascalName": "AppHeaderNavigation",
    "kebabName": "app-header-navigation",
    "chunkName": "components/app-header-navigation",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppLayout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "pascalName": "AppLayout",
    "kebabName": "app-layout",
    "chunkName": "components/app-layout",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppLayout.vue",
    "meta": {
      "props": [
        {
          "name": "padded",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "true"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "padded",
          "type": "boolean",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "AppLoadingBar": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "pascalName": "AppLoadingBar",
    "kebabName": "app-loading-bar",
    "chunkName": "components/app-loading-bar",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue",
    "meta": {
      "props": [
        {
          "name": "throttle",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "200"
        },
        {
          "name": "duration",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "2000"
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "3"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppSearch": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "pascalName": "AppSearch",
    "kebabName": "app-search",
    "chunkName": "components/app-search",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppSearch.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "AppSocialIcons": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "pascalName": "AppSocialIcons",
    "kebabName": "app-social-icons",
    "chunkName": "components/app-social-icons",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocumentDrivenNotFound": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/DocumentDrivenNotFound.vue",
    "pascalName": "DocumentDrivenNotFound",
    "kebabName": "document-driven-not-found",
    "chunkName": "components/document-driven-not-found",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/DocumentDrivenNotFound.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/DocumentDrivenNotFound.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ThemeSelect": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "pascalName": "ThemeSelect",
    "kebabName": "theme-select",
    "chunkName": "components/theme-select",
    "shortPath": "node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsAside": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "pascalName": "DocsAside",
    "kebabName": "docs-aside",
    "chunkName": "components/docs-aside",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsAside.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsAsideTree": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "pascalName": "DocsAsideTree",
    "kebabName": "docs-aside-tree",
    "chunkName": "components/docs-aside-tree",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue",
    "meta": {
      "props": [
        {
          "name": "links",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "[]"
        },
        {
          "name": "level",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "0"
        },
        {
          "name": "max",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "null"
        },
        {
          "name": "parent",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "null"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "links",
          "type": "any",
          "description": "",
          "schema": "any"
        },
        {
          "name": "level",
          "type": "number",
          "description": "",
          "schema": "number"
        },
        {
          "name": "max",
          "type": "number",
          "description": "",
          "schema": "number"
        },
        {
          "name": "parent",
          "type": "any",
          "description": "",
          "schema": "any"
        }
      ]
    }
  },
  "DocsPageBottom": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "pascalName": "DocsPageBottom",
    "kebabName": "docs-page-bottom",
    "chunkName": "components/docs-page-bottom",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsPageBottom.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsPageLayout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "pascalName": "DocsPageLayout",
    "kebabName": "docs-page-layout",
    "chunkName": "components/docs-page-layout",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsPageLayout.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "DocsPrevNext": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "pascalName": "DocsPrevNext",
    "kebabName": "docs-prev-next",
    "chunkName": "components/docs-prev-next",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsPrevNext.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocsToc": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "pascalName": "DocsToc",
    "kebabName": "docs-toc",
    "chunkName": "components/docs-toc",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsToc.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [
        {
          "name": "move",
          "type": "any[]",
          "signature": "(event: \"move\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": []
    }
  },
  "DocsTocLinks": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "pascalName": "DocsTocLinks",
    "kebabName": "docs-toc-links",
    "chunkName": "components/docs-toc-links",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/DocsTocLinks.vue",
    "meta": {
      "props": [
        {
          "name": "links",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "TocLink[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "TocLink[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "TocLink[]",
                "schema": [
                  {
                    "kind": "object",
                    "type": "TocLink",
                    "schema": {
                      "id": {
                        "name": "id",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "string",
                        "schema": "string"
                      },
                      "text": {
                        "name": "text",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "string",
                        "schema": "string"
                      },
                      "depth": {
                        "name": "depth",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": true,
                        "type": "number",
                        "schema": "number"
                      },
                      "children": {
                        "name": "children",
                        "global": false,
                        "description": "",
                        "tags": [],
                        "required": false,
                        "type": "TocLink[] | undefined",
                        "schema": "TocLink[] | undefined"
                      }
                    }
                  }
                ]
              }
            ]
          },
          "default": "[]"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "move",
          "type": "any[]",
          "signature": "(event: \"move\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": [
        {
          "name": "links",
          "type": "TocLink[]",
          "description": "",
          "schema": {
            "kind": "array",
            "type": "TocLink[]",
            "schema": [
              {
                "kind": "object",
                "type": "TocLink",
                "schema": {
                  "id": {
                    "name": "id",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  },
                  "text": {
                    "name": "text",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  },
                  "depth": {
                    "name": "depth",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "number",
                    "schema": "number"
                  },
                  "children": {
                    "name": "children",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": false,
                    "type": "TocLink[] | undefined",
                    "schema": {
                      "kind": "enum",
                      "type": "TocLink[] | undefined",
                      "schema": [
                        "undefined",
                        "TocLink[]"
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  "EditOnLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "pascalName": "EditOnLink",
    "kebabName": "edit-on-link",
    "chunkName": "components/edit-on-link",
    "shortPath": "node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/docus/components/docs/EditOnLink.vue",
    "meta": {
      "props": [
        {
          "name": "owner",
          "global": false,
          "description": "Repository owner.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.github?.owner"
        },
        {
          "name": "repo",
          "global": false,
          "description": "Repository name.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.github?.repo"
        },
        {
          "name": "branch",
          "global": false,
          "description": "The branch to use for the edit link.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.github?.branch"
        },
        {
          "name": "dir",
          "global": false,
          "description": "A base directory to append to the source path.\n\nWon't be used if `page` is set.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "useAppConfig()?.github?.dir"
        },
        {
          "name": "source",
          "global": false,
          "description": "Source file path.\n\nWon't be used if `page` is set.",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "page",
          "global": false,
          "description": "Use page from @nuxt/content.",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "undefined"
        },
        {
          "name": "contentDir",
          "global": false,
          "description": "Content directory (to be used with `page`)",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"content\""
        },
        {
          "name": "edit",
          "global": false,
          "description": "Send to an edit page or not.",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "true"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "contentDir",
          "type": "string",
          "description": "Content directory (to be used with `page`)",
          "schema": "string"
        },
        {
          "name": "edit",
          "type": "boolean",
          "description": "Send to an edit page or not.",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "owner",
          "type": "string | undefined",
          "description": "Repository owner.",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "repo",
          "type": "string | undefined",
          "description": "Repository name.",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "branch",
          "type": "string | undefined",
          "description": "The branch to use for the edit link.",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "dir",
          "type": "string | undefined",
          "description": "A base directory to append to the source path.\n\nWon't be used if `page` is set.",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "source",
          "type": "string | undefined",
          "description": "Source file path.\n\nWon't be used if `page` is set.",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "page",
          "type": "any",
          "description": "Use page from @nuxt/content.",
          "schema": "any"
        },
        {
          "name": "url",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseA": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "pascalName": "ProseA",
    "kebabName": "prose-a",
    "chunkName": "components/prose-a",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseA.vue",
    "meta": {
      "props": [
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "blank",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "static",
          "global": false,
          "description": "`true` if `href` points to a static file",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "href",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "blank",
          "type": "boolean",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "static",
          "type": "boolean",
          "description": "`true` if `href` points to a static file",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "ProseBlockquote": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "pascalName": "ProseBlockquote",
    "kebabName": "prose-blockquote",
    "chunkName": "components/prose-blockquote",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseBlockquote.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseCode": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "pascalName": "ProseCode",
    "kebabName": "prose-code",
    "chunkName": "components/prose-code",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseCode.vue",
    "meta": {
      "props": [
        {
          "name": "code",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "language",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Lang | undefined",
          "schema": {
            "kind": "enum",
            "type": "Lang | undefined",
            "schema": [
              "undefined",
              "\"vue\"",
              "\"abap\"",
              "\"actionscript-3\"",
              "\"ada\"",
              "\"apache\"",
              "\"apex\"",
              "\"apl\"",
              "\"applescript\"",
              "\"asm\"",
              "\"astro\"",
              "\"awk\"",
              "\"ballerina\"",
              "\"bat\"",
              "\"batch\"",
              "\"berry\"",
              "\"be\"",
              "\"bibtex\"",
              "\"bicep\"",
              "\"c\"",
              "\"clojure\"",
              "\"clj\"",
              "\"cobol\"",
              "\"codeql\"",
              "\"ql\"",
              "\"coffee\"",
              "\"cpp\"",
              "\"crystal\"",
              "\"csharp\"",
              "\"c#\"",
              "\"css\"",
              "\"cue\"",
              "\"d\"",
              "\"dart\"",
              "\"diff\"",
              "\"docker\"",
              "\"dream-maker\"",
              "\"elixir\"",
              "\"elm\"",
              "\"erb\"",
              "\"erlang\"",
              "\"fish\"",
              "\"fsharp\"",
              "\"f#\"",
              "\"gherkin\"",
              "\"git-commit\"",
              "\"git-rebase\"",
              "\"gnuplot\"",
              "\"go\"",
              "\"graphql\"",
              "\"groovy\"",
              "\"hack\"",
              "\"haml\"",
              "\"handlebars\"",
              "\"hbs\"",
              "\"haskell\"",
              "\"hcl\"",
              "\"hlsl\"",
              "\"html\"",
              "\"ini\"",
              "\"java\"",
              "\"javascript\"",
              "\"js\"",
              "\"jinja-html\"",
              "\"json\"",
              "\"jsonc\"",
              "\"jsonnet\"",
              "\"jssm\"",
              "\"fsl\"",
              "\"jsx\"",
              "\"julia\"",
              "\"jupyter\"",
              "\"kotlin\"",
              "\"latex\"",
              "\"less\"",
              "\"lisp\"",
              "\"logo\"",
              "\"lua\"",
              "\"make\"",
              "\"makefile\"",
              "\"markdown\"",
              "\"md\"",
              "\"matlab\"",
              "\"mdx\"",
              "\"nginx\"",
              "\"nim\"",
              "\"nix\"",
              "\"objective-c\"",
              "\"objc\"",
              "\"objective-cpp\"",
              "\"ocaml\"",
              "\"pascal\"",
              "\"perl\"",
              "\"php\"",
              "\"plsql\"",
              "\"postcss\"",
              "\"powershell\"",
              "\"ps\"",
              "\"ps1\"",
              "\"prisma\"",
              "\"prolog\"",
              "\"pug\"",
              "\"jade\"",
              "\"puppet\"",
              "\"purescript\"",
              "\"python\"",
              "\"py\"",
              "\"r\"",
              "\"raku\"",
              "\"perl6\"",
              "\"razor\"",
              "\"riscv\"",
              "\"ruby\"",
              "\"rb\"",
              "\"rust\"",
              "\"rs\"",
              "\"sas\"",
              "\"sass\"",
              "\"scala\"",
              "\"scheme\"",
              "\"scss\"",
              "\"shaderlab\"",
              "\"shader\"",
              "\"shellscript\"",
              "\"shell\"",
              "\"bash\"",
              "\"sh\"",
              "\"zsh\"",
              "\"smalltalk\"",
              "\"solidity\"",
              "\"sparql\"",
              "\"sql\"",
              "\"ssh-config\"",
              "\"stylus\"",
              "\"styl\"",
              "\"svelte\"",
              "\"swift\"",
              "\"system-verilog\"",
              "\"tasl\"",
              "\"tcl\"",
              "\"tex\"",
              "\"toml\"",
              "\"tsx\"",
              "\"turtle\"",
              "\"twig\"",
              "\"typescript\"",
              "\"ts\"",
              "\"vb\"",
              "\"cmd\"",
              "\"verilog\"",
              "\"vhdl\"",
              "\"viml\"",
              "\"vim\"",
              "\"vimscript\"",
              "\"vue-html\"",
              "\"wasm\"",
              "\"wenyan\"",
              "\"文言\"",
              "\"xml\"",
              "\"xsl\"",
              "\"yaml\""
            ]
          },
          "default": "null"
        },
        {
          "name": "filename",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "null"
        },
        {
          "name": "highlights",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "number[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "number[]",
                "schema": [
                  "number"
                ]
              }
            ]
          },
          "default": "[]"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "code",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "language",
          "type": "Lang",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "Lang",
            "schema": [
              "\"vue\"",
              "\"abap\"",
              "\"actionscript-3\"",
              "\"ada\"",
              "\"apache\"",
              "\"apex\"",
              "\"apl\"",
              "\"applescript\"",
              "\"asm\"",
              "\"astro\"",
              "\"awk\"",
              "\"ballerina\"",
              "\"bat\"",
              "\"batch\"",
              "\"berry\"",
              "\"be\"",
              "\"bibtex\"",
              "\"bicep\"",
              "\"c\"",
              "\"clojure\"",
              "\"clj\"",
              "\"cobol\"",
              "\"codeql\"",
              "\"ql\"",
              "\"coffee\"",
              "\"cpp\"",
              "\"crystal\"",
              "\"csharp\"",
              "\"c#\"",
              "\"css\"",
              "\"cue\"",
              "\"d\"",
              "\"dart\"",
              "\"diff\"",
              "\"docker\"",
              "\"dream-maker\"",
              "\"elixir\"",
              "\"elm\"",
              "\"erb\"",
              "\"erlang\"",
              "\"fish\"",
              "\"fsharp\"",
              "\"f#\"",
              "\"gherkin\"",
              "\"git-commit\"",
              "\"git-rebase\"",
              "\"gnuplot\"",
              "\"go\"",
              "\"graphql\"",
              "\"groovy\"",
              "\"hack\"",
              "\"haml\"",
              "\"handlebars\"",
              "\"hbs\"",
              "\"haskell\"",
              "\"hcl\"",
              "\"hlsl\"",
              "\"html\"",
              "\"ini\"",
              "\"java\"",
              "\"javascript\"",
              "\"js\"",
              "\"jinja-html\"",
              "\"json\"",
              "\"jsonc\"",
              "\"jsonnet\"",
              "\"jssm\"",
              "\"fsl\"",
              "\"jsx\"",
              "\"julia\"",
              "\"jupyter\"",
              "\"kotlin\"",
              "\"latex\"",
              "\"less\"",
              "\"lisp\"",
              "\"logo\"",
              "\"lua\"",
              "\"make\"",
              "\"makefile\"",
              "\"markdown\"",
              "\"md\"",
              "\"matlab\"",
              "\"mdx\"",
              "\"nginx\"",
              "\"nim\"",
              "\"nix\"",
              "\"objective-c\"",
              "\"objc\"",
              "\"objective-cpp\"",
              "\"ocaml\"",
              "\"pascal\"",
              "\"perl\"",
              "\"php\"",
              "\"plsql\"",
              "\"postcss\"",
              "\"powershell\"",
              "\"ps\"",
              "\"ps1\"",
              "\"prisma\"",
              "\"prolog\"",
              "\"pug\"",
              "\"jade\"",
              "\"puppet\"",
              "\"purescript\"",
              "\"python\"",
              "\"py\"",
              "\"r\"",
              "\"raku\"",
              "\"perl6\"",
              "\"razor\"",
              "\"riscv\"",
              "\"ruby\"",
              "\"rb\"",
              "\"rust\"",
              "\"rs\"",
              "\"sas\"",
              "\"sass\"",
              "\"scala\"",
              "\"scheme\"",
              "\"scss\"",
              "\"shaderlab\"",
              "\"shader\"",
              "\"shellscript\"",
              "\"shell\"",
              "\"bash\"",
              "\"sh\"",
              "\"zsh\"",
              "\"smalltalk\"",
              "\"solidity\"",
              "\"sparql\"",
              "\"sql\"",
              "\"ssh-config\"",
              "\"stylus\"",
              "\"styl\"",
              "\"svelte\"",
              "\"swift\"",
              "\"system-verilog\"",
              "\"tasl\"",
              "\"tcl\"",
              "\"tex\"",
              "\"toml\"",
              "\"tsx\"",
              "\"turtle\"",
              "\"twig\"",
              "\"typescript\"",
              "\"ts\"",
              "\"vb\"",
              "\"cmd\"",
              "\"verilog\"",
              "\"vhdl\"",
              "\"viml\"",
              "\"vim\"",
              "\"vimscript\"",
              "\"vue-html\"",
              "\"wasm\"",
              "\"wenyan\"",
              "\"文言\"",
              "\"xml\"",
              "\"xsl\"",
              "\"yaml\""
            ]
          }
        },
        {
          "name": "filename",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "highlights",
          "type": "number[]",
          "description": "",
          "schema": {
            "kind": "array",
            "type": "number[]",
            "schema": [
              "number"
            ]
          }
        }
      ]
    }
  },
  "ProseCodeInline": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "pascalName": "ProseCodeInline",
    "kebabName": "prose-code-inline",
    "chunkName": "components/prose-code-inline",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseCodeInline.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseEm": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "pascalName": "ProseEm",
    "kebabName": "prose-em",
    "chunkName": "components/prose-em",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseEm.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseH1": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "pascalName": "ProseH1",
    "kebabName": "prose-h1",
    "chunkName": "components/prose-h1",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH1.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseH2": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "pascalName": "ProseH2",
    "kebabName": "prose-h2",
    "chunkName": "components/prose-h2",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH2.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseH3": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "pascalName": "ProseH3",
    "kebabName": "prose-h3",
    "chunkName": "components/prose-h3",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH3.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseH4": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "pascalName": "ProseH4",
    "kebabName": "prose-h4",
    "chunkName": "components/prose-h4",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH4.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseH5": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "pascalName": "ProseH5",
    "kebabName": "prose-h5",
    "chunkName": "components/prose-h5",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH5.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseH6": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "pascalName": "ProseH6",
    "kebabName": "prose-h6",
    "chunkName": "components/prose-h6",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseH6.vue",
    "meta": {
      "props": [
        {
          "name": "id",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "id",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ProseHr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "pascalName": "ProseHr",
    "kebabName": "prose-hr",
    "chunkName": "components/prose-hr",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseHr.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ProseImg": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "pascalName": "ProseImg",
    "kebabName": "prose-img",
    "chunkName": "components/prose-img",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseImg.vue",
    "meta": {
      "props": [
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          },
          "default": "undefined"
        },
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "alt",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "width",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | number | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          },
          "default": "undefined"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "src",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "alt",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "height",
          "type": "string | number | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          }
        },
        {
          "name": "width",
          "type": "string | number | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | number | undefined",
            "schema": [
              "undefined",
              "string",
              "number"
            ]
          }
        }
      ]
    }
  },
  "ProseLi": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "pascalName": "ProseLi",
    "kebabName": "prose-li",
    "chunkName": "components/prose-li",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseLi.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseOl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "pascalName": "ProseOl",
    "kebabName": "prose-ol",
    "chunkName": "components/prose-ol",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseOl.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseP": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "pascalName": "ProseP",
    "kebabName": "prose-p",
    "chunkName": "components/prose-p",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseP.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseStrong": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "pascalName": "ProseStrong",
    "kebabName": "prose-strong",
    "chunkName": "components/prose-strong",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseStrong.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTable": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "pascalName": "ProseTable",
    "kebabName": "prose-table",
    "chunkName": "components/prose-table",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseTable.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTbody": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "pascalName": "ProseTbody",
    "kebabName": "prose-tbody",
    "chunkName": "components/prose-tbody",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseTbody.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTd": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "pascalName": "ProseTd",
    "kebabName": "prose-td",
    "chunkName": "components/prose-td",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseTd.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTh": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "pascalName": "ProseTh",
    "kebabName": "prose-th",
    "chunkName": "components/prose-th",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseTh.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseThead": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "pascalName": "ProseThead",
    "kebabName": "prose-thead",
    "chunkName": "components/prose-thead",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseThead.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseTr": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "pascalName": "ProseTr",
    "kebabName": "prose-tr",
    "chunkName": "components/prose-tr",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseTr.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseUl": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "pascalName": "ProseUl",
    "kebabName": "prose-ul",
    "chunkName": "components/prose-ul",
    "shortPath": "node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/global/ProseUl.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "ProseCodeCopyButton": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "pascalName": "ProseCodeCopyButton",
    "kebabName": "prose-code-copy-button",
    "chunkName": "components/prose-code-copy-button",
    "shortPath": "node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/typography/components/ProseCodeCopyButton.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "show",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "content",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "show",
          "type": "boolean",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "Alert": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "pascalName": "Alert",
    "kebabName": "alert",
    "chunkName": "components/alert",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Alert.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "type",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "Badge": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "pascalName": "Badge",
    "kebabName": "badge",
    "chunkName": "components/badge",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Badge.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "type",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ButtonLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "pascalName": "ButtonLink",
    "kebabName": "button-link",
    "chunkName": "components/button-link",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/ButtonLink.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "Callout": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "pascalName": "Callout",
    "kebabName": "callout",
    "chunkName": "components/callout",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Callout.vue",
    "meta": {
      "props": [
        {
          "name": "type",
          "global": false,
          "description": "",
          "tags": [
            {
              "name": "values",
              "text": "info, success, warning, danger"
            }
          ],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"info\""
        },
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any",
          "schema": "any",
          "default": "ref(false)"
        }
      ],
      "slots": [
        {
          "name": "summary",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "content",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": [
        {
          "name": "type",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "modelValue",
          "type": "any",
          "description": "",
          "schema": "any"
        }
      ]
    }
  },
  "CodeBlock": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "pascalName": "CodeBlock",
    "kebabName": "code-block",
    "chunkName": "components/code-block",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/CodeBlock.vue",
    "meta": {
      "props": [
        {
          "name": "label",
          "global": false,
          "description": "Label to display for the tab",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        },
        {
          "name": "active",
          "global": false,
          "description": "Select which tab should be active",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        },
        {
          "name": "preview",
          "global": false,
          "description": "Preiew block are bordered and have small padding.",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "label",
          "type": "string",
          "description": "Label to display for the tab",
          "schema": "string"
        },
        {
          "name": "active",
          "type": "boolean",
          "description": "Select which tab should be active",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        },
        {
          "name": "preview",
          "type": "boolean",
          "description": "Preiew block are bordered and have small padding.",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "CodeGroup": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "pascalName": "CodeGroup",
    "kebabName": "code-group",
    "chunkName": "components/code-group",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/CodeGroup.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Container": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "pascalName": "Container",
    "kebabName": "container",
    "chunkName": "components/container",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Container.vue",
    "meta": {
      "props": [],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": []
    }
  },
  "CopyButton": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "pascalName": "CopyButton",
    "kebabName": "copy-button",
    "chunkName": "components/copy-button",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/CopyButton.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "content",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "Ellipsis": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Ellipsis.vue",
    "pascalName": "Ellipsis",
    "kebabName": "ellipsis",
    "chunkName": "components/ellipsis",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Ellipsis.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Ellipsis.vue",
    "meta": {
      "props": [
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10rem\""
        },
        {
          "name": "width",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10rem\""
        },
        {
          "name": "left",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"auto\""
        },
        {
          "name": "right",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"auto\""
        },
        {
          "name": "top",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"0\""
        },
        {
          "name": "zIndex",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"10\""
        },
        {
          "name": "blur",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"50px\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "height",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "width",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "left",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "right",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "top",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "zIndex",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "blur",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "List": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "pascalName": "List",
    "kebabName": "list",
    "chunkName": "components/list",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/List.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtImg": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "pascalName": "NuxtImg",
    "kebabName": "nuxt-img",
    "chunkName": "components/nuxt-img",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Props": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "pascalName": "Props",
    "kebabName": "props",
    "chunkName": "components/props",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Props.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Sandbox": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "pascalName": "Sandbox",
    "kebabName": "sandbox",
    "chunkName": "components/sandbox",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Sandbox.vue",
    "meta": {
      "props": [
        {
          "name": "repo",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "branch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "dir",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "file",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"app.vue\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "repo",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "branch",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "dir",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "src",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "file",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "SourceLink": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/SourceLink.vue",
    "pascalName": "SourceLink",
    "kebabName": "source-link",
    "chunkName": "components/source-link",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/SourceLink.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/SourceLink.vue",
    "meta": {
      "props": [
        {
          "name": "source",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "source",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "TabsHeader": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "pascalName": "TabsHeader",
    "kebabName": "tabs-header",
    "chunkName": "components/tabs-header",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/TabsHeader.vue",
    "meta": {
      "props": [
        {
          "name": "tabs",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "{ label: string; }[]",
          "schema": {
            "kind": "array",
            "type": "{ label: string; }[]",
            "schema": [
              {
                "kind": "object",
                "type": "{ label: string; }",
                "schema": {
                  "label": {
                    "name": "label",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  }
                }
              }
            ]
          }
        },
        {
          "name": "activeTabIndex",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "number",
          "schema": "number"
        }
      ],
      "slots": [
        {
          "name": "footer",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [
        {
          "name": "update:activeTabIndex",
          "type": "any[]",
          "signature": "(event: \"update:activeTabIndex\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": [
        {
          "name": "tabs",
          "type": "{ label: string; }[]",
          "description": "",
          "schema": {
            "kind": "array",
            "type": "{ label: string; }[]",
            "schema": [
              {
                "kind": "object",
                "type": "{ label: string; }",
                "schema": {
                  "label": {
                    "name": "label",
                    "global": false,
                    "description": "",
                    "tags": [],
                    "required": true,
                    "type": "string",
                    "schema": "string"
                  }
                }
              }
            ]
          }
        },
        {
          "name": "activeTabIndex",
          "type": "number",
          "description": "",
          "schema": "number"
        }
      ]
    }
  },
  "Terminal": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "pascalName": "Terminal",
    "kebabName": "terminal",
    "chunkName": "components/terminal",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/Terminal.vue",
    "meta": {
      "props": [
        {
          "name": "content",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "content",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "VideoPlayer": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "pascalName": "VideoPlayer",
    "kebabName": "video-player",
    "chunkName": "components/video-player",
    "shortPath": "node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/globals/VideoPlayer.vue",
    "meta": {
      "props": [
        {
          "name": "src",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "poster",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "sources",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "any[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "any[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "any[]",
                "schema": [
                  "any"
                ]
              }
            ]
          },
          "default": "[]"
        },
        {
          "name": "autoplay",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "false"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "src",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "poster",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "sources",
          "type": "any[]",
          "description": "",
          "schema": {
            "kind": "array",
            "type": "any[]",
            "schema": [
              "any"
            ]
          }
        },
        {
          "name": "autoplay",
          "type": "boolean",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "IconCodeSandBox": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "pascalName": "IconCodeSandBox",
    "kebabName": "icon-code-sand-box",
    "chunkName": "components/icon-code-sand-box",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconCodeSandBox.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconDocus": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "pascalName": "IconDocus",
    "kebabName": "icon-docus",
    "chunkName": "components/icon-docus",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconDocus.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxt": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "pascalName": "IconNuxt",
    "kebabName": "icon-nuxt",
    "chunkName": "components/icon-nuxt",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconNuxt.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtContent": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "pascalName": "IconNuxtContent",
    "kebabName": "icon-nuxt-content",
    "chunkName": "components/icon-nuxt-content",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconNuxtContent.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtLabs": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "pascalName": "IconNuxtLabs",
    "kebabName": "icon-nuxt-labs",
    "chunkName": "components/icon-nuxt-labs",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconNuxtLabs.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconNuxtStudio": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "pascalName": "IconNuxtStudio",
    "kebabName": "icon-nuxt-studio",
    "chunkName": "components/icon-nuxt-studio",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconNuxtStudio.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconStackBlitz": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "pascalName": "IconStackBlitz",
    "kebabName": "icon-stack-blitz",
    "chunkName": "components/icon-stack-blitz",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconStackBlitz.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "IconVueTelescope": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "pascalName": "IconVueTelescope",
    "kebabName": "icon-vue-telescope",
    "chunkName": "components/icon-vue-telescope",
    "shortPath": "node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/icons/IconVueTelescope.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "BlockHero": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "pascalName": "BlockHero",
    "kebabName": "block-hero",
    "chunkName": "components/block-hero",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/landing/BlockHero.vue",
    "meta": {
      "props": [
        {
          "name": "video",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "cta",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "secondary",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string[] | undefined",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "snippet",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [
        {
          "name": "announce",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "title",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "description",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "extra",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "actions",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "support",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "video",
          "type": "string[] | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "cta",
          "type": "string[] | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "secondary",
          "type": "string[] | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string[] | undefined",
            "schema": [
              "undefined",
              {
                "kind": "array",
                "type": "string[]",
                "schema": [
                  "string"
                ]
              }
            ]
          }
        },
        {
          "name": "snippet",
          "type": "string | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ]
    }
  },
  "Card": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "pascalName": "Card",
    "kebabName": "card",
    "chunkName": "components/card",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/landing/Card.vue",
    "meta": {
      "props": [
        {
          "name": "icon",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "iconClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "blurry",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          },
          "default": "true"
        }
      ],
      "slots": [
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "icon",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "iconClass",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "blurry",
          "type": "boolean",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean",
            "schema": [
              "false",
              "true"
            ]
          }
        }
      ]
    }
  },
  "CardGrid": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "pascalName": "CardGrid",
    "kebabName": "card-grid",
    "chunkName": "components/card-grid",
    "shortPath": "node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue",
    "meta": {
      "props": [
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Features\""
        }
      ],
      "slots": [
        {
          "name": "root",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "title",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        },
        {
          "name": "default",
          "type": "{}",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "{}",
            "schema": {}
          }
        }
      ],
      "events": [],
      "exposed": [
        {
          "name": "title",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "VoltaBoard": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "pascalName": "VoltaBoard",
    "kebabName": "volta-board",
    "chunkName": "components/volta-board",
    "shortPath": "node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/volta/VoltaBoard.vue",
    "meta": {
      "props": [
        {
          "name": "token",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "token",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ComponentPlayground": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "pascalName": "ComponentPlayground",
    "kebabName": "component-playground",
    "chunkName": "components/component-playground",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/ComponentPlayground.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ComponentPlaygroundData": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "pascalName": "ComponentPlaygroundData",
    "kebabName": "component-playground-data",
    "chunkName": "components/component-playground-data",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundData.vue",
    "meta": {
      "props": [
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        },
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "Record<string, any> | undefined",
          "schema": {
            "kind": "enum",
            "type": "Record<string, any> | undefined",
            "schema": [
              "undefined",
              "Record<string, any>"
            ]
          },
          "default": "{}"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": [
        {
          "name": "modelValue",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        },
        {
          "name": "componentData",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        }
      ]
    }
  },
  "ComponentPlaygroundProps": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "pascalName": "ComponentPlaygroundProps",
    "kebabName": "component-playground-props",
    "chunkName": "components/component-playground-props",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue",
    "meta": {
      "props": [
        {
          "name": "modelValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        },
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [
        {
          "name": "update:modelValue",
          "type": "any[]",
          "signature": "(event: \"update:modelValue\", ...args: any[]): void",
          "schema": [
            "any"
          ]
        }
      ],
      "exposed": [
        {
          "name": "modelValue",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        },
        {
          "name": "componentData",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        }
      ]
    }
  },
  "ComponentPlaygroundSlots": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "pascalName": "ComponentPlaygroundSlots",
    "kebabName": "component-playground-slots",
    "chunkName": "components/component-playground-slots",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundSlots.vue",
    "meta": {
      "props": [
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "componentData",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        }
      ]
    }
  },
  "ComponentPlaygroundTokens": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "pascalName": "ComponentPlaygroundTokens",
    "kebabName": "component-playground-tokens",
    "chunkName": "components/component-playground-tokens",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundTokens.vue",
    "meta": {
      "props": [
        {
          "name": "componentData",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "componentData",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        }
      ]
    }
  },
  "TokensPlayground": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "pascalName": "TokensPlayground",
    "kebabName": "tokens-playground",
    "chunkName": "components/tokens-playground",
    "shortPath": "node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt-themes/elements/components/meta/TokensPlayground.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentPreviewMode": {
    "mode": "all",
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "pascalName": "ContentPreviewMode",
    "kebabName": "content-preview-mode",
    "chunkName": "components/content-preview-mode",
    "shortPath": "node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxthq/studio/dist/runtime/components/ContentPreviewMode.vue",
    "meta": {
      "props": [
        {
          "name": "previewToken",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Record<string, any>",
          "schema": "Record<string, any>"
        },
        {
          "name": "apiURL",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "string",
          "schema": "string"
        },
        {
          "name": "storageReady",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Ref<boolean>",
          "schema": "Ref<boolean>"
        },
        {
          "name": "refresh",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Function",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\r\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@780": {
                "name": "__@hasInstance@780",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\r\nas a constructor function.\r\n\r\nA constructor function can control which objects are recognized as its instances by\r\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "init",
          "global": false,
          "description": "",
          "tags": [],
          "required": true,
          "type": "Function",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\r\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@780": {
                "name": "__@hasInstance@780",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\r\nas a constructor function.\r\n\r\nA constructor function can control which objects are recognized as its instances by\r\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "previewToken",
          "type": "Record<string, any>",
          "description": "",
          "schema": "Record<string, any>"
        },
        {
          "name": "apiURL",
          "type": "string",
          "description": "",
          "schema": "string"
        },
        {
          "name": "storageReady",
          "type": "Ref<boolean>",
          "description": "",
          "schema": "Ref<boolean>"
        },
        {
          "name": "refresh",
          "type": "Function",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\r\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@780": {
                "name": "__@hasInstance@780",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\r\nas a constructor function.\r\n\r\nA constructor function can control which objects are recognized as its instances by\r\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        },
        {
          "name": "init",
          "type": "Function",
          "description": "",
          "schema": {
            "kind": "object",
            "type": "Function",
            "schema": {
              "apply": {
                "name": "apply",
                "global": false,
                "description": "Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the this object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A set of arguments to be passed to the function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, argArray?: any) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, argArray?: any): any",
                  "schema": []
                }
              },
              "call": {
                "name": "call",
                "global": false,
                "description": "Calls a method of an object, substituting another object for the current object.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg The object to be used as the current object."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the method."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "bind": {
                "name": "bind",
                "global": false,
                "description": "For a given function, creates a bound function that has the same body as the original function.\r\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.",
                "tags": [
                  {
                    "name": "param",
                    "text": "thisArg An object to which the this keyword can refer inside the new function."
                  },
                  {
                    "name": "param",
                    "text": "argArray A list of arguments to be passed to the new function."
                  }
                ],
                "required": true,
                "type": "(this: Function, thisArg: any, ...argArray: any[]) => any",
                "schema": {
                  "kind": "event",
                  "type": "(this: Function, thisArg: any, ...argArray: any[]): any",
                  "schema": []
                }
              },
              "toString": {
                "name": "toString",
                "global": false,
                "description": "Returns a string representation of a function.",
                "tags": [],
                "required": true,
                "type": "() => string",
                "schema": {
                  "kind": "event",
                  "type": "(): string"
                }
              },
              "prototype": {
                "name": "prototype",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "length": {
                "name": "length",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "number",
                "schema": "number"
              },
              "arguments": {
                "name": "arguments",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "any",
                "schema": "any"
              },
              "caller": {
                "name": "caller",
                "global": false,
                "description": "",
                "tags": [],
                "required": true,
                "type": "Function",
                "schema": "Function"
              },
              "name": {
                "name": "name",
                "global": false,
                "description": "Returns the name of the function. Function names are read-only and can not be changed.",
                "tags": [],
                "required": true,
                "type": "string",
                "schema": "string"
              },
              "__@hasInstance@780": {
                "name": "__@hasInstance@780",
                "global": false,
                "description": "Determines whether the given value inherits from this function if this function was used\r\nas a constructor function.\r\n\r\nA constructor function can control which objects are recognized as its instances by\r\n'instanceof' by overriding this method.",
                "tags": [],
                "required": true,
                "type": "(value: any) => boolean",
                "schema": {
                  "kind": "event",
                  "type": "(value: any): boolean",
                  "schema": []
                }
              }
            }
          }
        }
      ]
    }
  },
  "ContentDoc": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "pascalName": "ContentDoc",
    "kebabName": "content-doc",
    "chunkName": "components/content-doc",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentList": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "pascalName": "ContentList",
    "kebabName": "content-list",
    "chunkName": "components/content-list",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentList.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentNavigation": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "pascalName": "ContentNavigation",
    "kebabName": "content-navigation",
    "chunkName": "components/content-navigation",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentQuery": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "pascalName": "ContentQuery",
    "kebabName": "content-query",
    "chunkName": "components/content-query",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentQuery.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentRenderer": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "pascalName": "ContentRenderer",
    "kebabName": "content-renderer",
    "chunkName": "components/content-renderer",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentRendererMarkdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "pascalName": "ContentRendererMarkdown",
    "kebabName": "content-renderer-markdown",
    "chunkName": "components/content-renderer-markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentRendererMarkdown.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "ContentSlot": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "pascalName": "ContentSlot",
    "kebabName": "content-slot",
    "chunkName": "components/content-slot",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/ContentSlot.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "DocumentDrivenEmpty": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "pascalName": "DocumentDrivenEmpty",
    "kebabName": "document-driven-empty",
    "chunkName": "components/document-driven-empty",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/DocumentDrivenEmpty.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "Markdown": {
    "mode": "all",
    "global": true,
    "prefetch": false,
    "preload": false,
    "filePath": "/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "pascalName": "Markdown",
    "kebabName": "markdown",
    "chunkName": "components/markdown",
    "shortPath": "node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "export": "default",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/components/Markdown.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtWelcome": {
    "export": "default",
    "chunkName": "components/nuxt-welcome",
    "global": false,
    "kebabName": "nuxt-welcome",
    "pascalName": "NuxtWelcome",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "name": "NuxtWelcome",
    "filePath": "/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue",
    "meta": {
      "props": [
        {
          "name": "appName",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Nuxt\""
        },
        {
          "name": "version",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"\""
        },
        {
          "name": "title",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Welcome to Nuxt!\""
        },
        {
          "name": "readDocs",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"We highly recommend you take a look at the Nuxt documentation, whether you are new or have previous experience with the framework.\""
        },
        {
          "name": "followTwitter",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Follow the Nuxt Twitter account to get latest news about releases, new modules, tutorials and tips.\""
        },
        {
          "name": "starGitHub",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"Nuxt is open source and the code is available on GitHub, feel free to star it, participate in discussions or dive into the source.\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtLayout": {
    "export": "default",
    "chunkName": "components/nuxt-layout",
    "global": false,
    "kebabName": "nuxt-layout",
    "pascalName": "NuxtLayout",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/layout",
    "name": "NuxtLayout",
    "filePath": "/node_modules/nuxt/dist/app/components/layout.mjs",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/layout.mjs",
    "meta": {
      "props": [
        {
          "name": "name",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | false | Ref<string | false> | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | false | Ref<string | false> | undefined",
            "schema": [
              "undefined",
              "string",
              "false",
              "Ref<string | false>"
            ]
          },
          "default": "null"
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "name",
          "type": "string | false | Ref<string | false>",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | false | Ref<string | false>",
            "schema": [
              "string",
              "false",
              "Ref<string | false>"
            ]
          }
        }
      ]
    }
  },
  "NuxtErrorBoundary": {
    "export": "default",
    "chunkName": "components/nuxt-error-boundary",
    "global": false,
    "kebabName": "nuxt-error-boundary",
    "pascalName": "NuxtErrorBoundary",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-error-boundary",
    "name": "NuxtErrorBoundary",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-error-boundary.mjs",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-error-boundary.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [
        {
          "name": "error",
          "type": "[_error: unknown]",
          "signature": "(event: \"error\", _error: unknown): void",
          "schema": [
            "unknown"
          ]
        }
      ],
      "exposed": []
    }
  },
  "ServerPlaceholder": {
    "export": "default",
    "chunkName": "components/server-placeholder",
    "global": false,
    "kebabName": "server-placeholder",
    "pascalName": "ServerPlaceholder",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/server-placeholder",
    "name": "ServerPlaceholder",
    "filePath": "/node_modules/nuxt/dist/app/components/server-placeholder.mjs",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/server-placeholder.mjs",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  },
  "NuxtLink": {
    "export": "default",
    "chunkName": "components/nuxt-link",
    "global": false,
    "kebabName": "nuxt-link",
    "pascalName": "NuxtLink",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-link",
    "name": "NuxtLink",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-link.mjs",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-link.mjs",
    "meta": {
      "props": [
        {
          "name": "to",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw | undefined",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              "RouteLocationPathRaw",
              "RouteLocationNamedRaw"
            ]
          }
        },
        {
          "name": "href",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "RouteLocationRaw | undefined",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              "RouteLocationPathRaw",
              "RouteLocationNamedRaw"
            ]
          }
        },
        {
          "name": "external",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "replace",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "custom",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "target",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
          "schema": {
            "kind": "enum",
            "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
            "schema": [
              "undefined",
              "null",
              "\"_blank\"",
              "\"_parent\"",
              "\"_self\"",
              "\"_top\"",
              {
                "kind": "object",
                "type": "string & {}",
                "schema": {
                  "toString": {
                    "name": "toString",
                    "global": false,
                    "description": "Returns a string representation of a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "charAt": {
                    "name": "charAt",
                    "global": false,
                    "description": "Returns the character at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "pos The zero-based index of the desired character."
                      }
                    ],
                    "required": true,
                    "type": "(pos: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): string",
                      "schema": []
                    }
                  },
                  "charCodeAt": {
                    "name": "charCodeAt",
                    "global": false,
                    "description": "Returns the Unicode value of the character at the specified location.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): number",
                      "schema": []
                    }
                  },
                  "concat": {
                    "name": "concat",
                    "global": false,
                    "description": "Returns a string that contains the concatenation of two or more strings.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "strings The strings to append to the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(...strings: string[]) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(...strings: string[]): string",
                      "schema": [
                        "string"
                      ]
                    }
                  },
                  "indexOf": {
                    "name": "indexOf",
                    "global": false,
                    "description": "Returns the position of the first occurrence of a substring.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for in the string"
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "lastIndexOf": {
                    "name": "lastIndexOf",
                    "global": false,
                    "description": "Returns the last occurrence of a substring in the string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for."
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching. If omitted, the search begins at the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "localeCompare": {
                    "name": "localeCompare",
                    "global": false,
                    "description": "Determines whether two strings are equivalent in the current locale.\nDetermines whether two strings are equivalent in the current or specified locale.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details."
                      },
                      {
                        "name": "param",
                        "text": "options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details."
                      }
                    ],
                    "required": true,
                    "type": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }",
                    "schema": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }"
                  },
                  "match": {
                    "name": "match",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an array containing the results of that search.\nMatches a string or an object that supports being matched against, and returns an array\r\ncontaining the results of that search, or null if no matches are found.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      },
                      {
                        "name": "param",
                        "text": "matcher An object that supports being matched against."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }",
                    "schema": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }"
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replaces text in a string, using a regular expression or search string.\nPasses a string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}. This method is expected to implement its own replacement algorithm.\nReplaces text in a string, using an object that supports replacement within a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string or regular expression to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace. When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of {@linkcode searchValue} is replaced."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue An object that supports searching for and replacing matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue The replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A object can search for and replace matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "search": {
                    "name": "search",
                    "global": false,
                    "description": "Finds the first substring match in a regular expression search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp The regular expression pattern and applicable flags."
                      },
                      {
                        "name": "param",
                        "text": "searcher An object which supports searching within a string."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }",
                    "schema": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }"
                  },
                  "slice": {
                    "name": "slice",
                    "global": false,
                    "description": "Returns a section of a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The index to the beginning of the specified portion of stringObj."
                      },
                      {
                        "name": "param",
                        "text": "end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.\r\nIf this value is not specified, the substring continues to the end of stringObj."
                      }
                    ],
                    "required": true,
                    "type": "(start?: number | undefined, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start?: number | undefined, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "split": {
                    "name": "split",
                    "global": false,
                    "description": "Split a string into substrings using the specified separator and return them as an array.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      },
                      {
                        "name": "param",
                        "text": "splitter An object that can split a string."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      }
                    ],
                    "required": true,
                    "type": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }",
                    "schema": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }"
                  },
                  "substring": {
                    "name": "substring",
                    "global": false,
                    "description": "Returns the substring at the specified location within a String object.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The zero-based index number indicating the beginning of the substring."
                      },
                      {
                        "name": "param",
                        "text": "end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.\r\nIf end is omitted, the characters from start through the end of the original string are returned."
                      }
                    ],
                    "required": true,
                    "type": "(start: number, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start: number, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "toLowerCase": {
                    "name": "toLowerCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to lowercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleLowerCase": {
                    "name": "toLocaleLowerCase",
                    "global": false,
                    "description": "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "toUpperCase": {
                    "name": "toUpperCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to uppercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleUpperCase": {
                    "name": "toLocaleUpperCase",
                    "global": false,
                    "description": "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "trim": {
                    "name": "trim",
                    "global": false,
                    "description": "Removes the leading and trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "length": {
                    "name": "length",
                    "global": false,
                    "description": "Returns the length of a String object.",
                    "tags": [],
                    "required": true,
                    "type": "number",
                    "schema": "number"
                  },
                  "substr": {
                    "name": "substr",
                    "global": false,
                    "description": "Gets a substring beginning at the specified location and having the specified length.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "from The starting position of the desired substring. The index of the first character in the string is zero."
                      },
                      {
                        "name": "param",
                        "text": "length The number of characters to include in the returned substring."
                      }
                    ],
                    "required": true,
                    "type": "(from: number, length?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(from: number, length?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "valueOf": {
                    "name": "valueOf",
                    "global": false,
                    "description": "Returns the primitive value of the specified object.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "codePointAt": {
                    "name": "codePointAt",
                    "global": false,
                    "description": "Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point\r\nvalue of the UTF-16 encoded code point starting at the string element at position pos in\r\nthe String resulting from converting this object to a String.\r\nIf there is no element at that position, the result is undefined.\r\nIf a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.",
                    "tags": [],
                    "required": true,
                    "type": "(pos: number) => number | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): number | undefined",
                      "schema": []
                    }
                  },
                  "includes": {
                    "name": "includes",
                    "global": false,
                    "description": "Returns true if searchString appears as a substring of the result of converting this\r\nobject to a String, at one or more positions that are\r\ngreater than or equal to position; otherwise, returns false.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString search string"
                      },
                      {
                        "name": "param",
                        "text": "position If position is undefined, 0 is assumed, so as to search all of the String."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "endsWith": {
                    "name": "endsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nendPosition – length(this). Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, endPosition?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, endPosition?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "normalize": {
                    "name": "normalize",
                    "global": false,
                    "description": "Returns the String value result of normalizing the string into the normalization form\r\nnamed by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\r\nis \"NFC\""
                      },
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\r\nis \"NFC\""
                      }
                    ],
                    "required": true,
                    "type": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }",
                    "schema": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }"
                  },
                  "repeat": {
                    "name": "repeat",
                    "global": false,
                    "description": "Returns a String value that is made from count copies appended together. If count is 0,\r\nthe empty string is returned.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "count number of copies to append"
                      }
                    ],
                    "required": true,
                    "type": "(count: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(count: number): string",
                      "schema": []
                    }
                  },
                  "startsWith": {
                    "name": "startsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nposition. Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "anchor": {
                    "name": "anchor",
                    "global": false,
                    "description": "Returns an `<a>` HTML anchor element and sets the name attribute to the text value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "name"
                      }
                    ],
                    "required": true,
                    "type": "(name: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(name: string): string",
                      "schema": []
                    }
                  },
                  "big": {
                    "name": "big",
                    "global": false,
                    "description": "Returns a `<big>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "blink": {
                    "name": "blink",
                    "global": false,
                    "description": "Returns a `<blink>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "bold": {
                    "name": "bold",
                    "global": false,
                    "description": "Returns a `<b>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fixed": {
                    "name": "fixed",
                    "global": false,
                    "description": "Returns a `<tt>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fontcolor": {
                    "name": "fontcolor",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the color attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(color: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(color: string): string",
                      "schema": []
                    }
                  },
                  "fontsize": {
                    "name": "fontsize",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the size attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "{ (size: number): string; (size: string): string; }",
                    "schema": "{ (size: number): string; (size: string): string; }"
                  },
                  "italics": {
                    "name": "italics",
                    "global": false,
                    "description": "Returns an `<i>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "link": {
                    "name": "link",
                    "global": false,
                    "description": "Returns an `<a>` HTML element and sets the href attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(url: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(url: string): string",
                      "schema": []
                    }
                  },
                  "small": {
                    "name": "small",
                    "global": false,
                    "description": "Returns a `<small>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "strike": {
                    "name": "strike",
                    "global": false,
                    "description": "Returns a `<strike>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sub": {
                    "name": "sub",
                    "global": false,
                    "description": "Returns a `<sub>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sup": {
                    "name": "sup",
                    "global": false,
                    "description": "Returns a `<sup>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "padStart": {
                    "name": "padStart",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the start (left) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\r\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\r\nIf this string is too long, it will be truncated and the left-most part will be applied.\r\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "padEnd": {
                    "name": "padEnd",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the end (right) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\r\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\r\nIf this string is too long, it will be truncated and the left-most part will be applied.\r\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "trimEnd": {
                    "name": "trimEnd",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimStart": {
                    "name": "trimStart",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimLeft": {
                    "name": "trimLeft",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimStart` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimRight": {
                    "name": "trimRight",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimEnd` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "matchAll": {
                    "name": "matchAll",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an iterable of matches\r\ncontaining the results of that search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      }
                    ],
                    "required": true,
                    "type": "(regexp: RegExp) => IterableIterator<RegExpMatchArray>",
                    "schema": {
                      "kind": "event",
                      "type": "(regexp: RegExp): IterableIterator<RegExpMatchArray>",
                      "schema": []
                    }
                  },
                  "replaceAll": {
                    "name": "replaceAll",
                    "global": false,
                    "description": "Replace all instances of a substring in a string, using a regular expression or search string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace for every successful match of searchValue in this string."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "at": {
                    "name": "at",
                    "global": false,
                    "description": "Returns a new String consisting of the single UTF-16 code unit located at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired code unit. A negative index will count back from the last item."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => string | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): string | undefined",
                      "schema": []
                    }
                  },
                  "__@iterator@634": {
                    "name": "__@iterator@634",
                    "global": false,
                    "description": "Iterator",
                    "tags": [],
                    "required": true,
                    "type": "() => IterableIterator<string>",
                    "schema": {
                      "kind": "event",
                      "type": "(): IterableIterator<string>"
                    }
                  }
                }
              }
            ]
          }
        },
        {
          "name": "rel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | null | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | null | undefined",
            "schema": [
              "undefined",
              "null",
              "string"
            ]
          }
        },
        {
          "name": "noRel",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "prefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "noPrefetch",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "boolean | undefined",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "activeClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "exactActiveClass",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "ariaCurrentValue",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "to",
          "type": "RouteLocationRaw | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              "RouteLocationPathRaw",
              "RouteLocationNamedRaw"
            ]
          }
        },
        {
          "name": "href",
          "type": "RouteLocationRaw | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "RouteLocationRaw | undefined",
            "schema": [
              "undefined",
              "string",
              "RouteLocationPathRaw",
              "RouteLocationNamedRaw"
            ]
          }
        },
        {
          "name": "external",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "replace",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "custom",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "target",
          "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | (string & {}) | null | undefined",
            "schema": [
              "undefined",
              "null",
              "\"_blank\"",
              "\"_parent\"",
              "\"_self\"",
              "\"_top\"",
              {
                "kind": "object",
                "type": "string & {}",
                "schema": {
                  "toString": {
                    "name": "toString",
                    "global": false,
                    "description": "Returns a string representation of a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "charAt": {
                    "name": "charAt",
                    "global": false,
                    "description": "Returns the character at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "pos The zero-based index of the desired character."
                      }
                    ],
                    "required": true,
                    "type": "(pos: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): string",
                      "schema": []
                    }
                  },
                  "charCodeAt": {
                    "name": "charCodeAt",
                    "global": false,
                    "description": "Returns the Unicode value of the character at the specified location.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): number",
                      "schema": []
                    }
                  },
                  "concat": {
                    "name": "concat",
                    "global": false,
                    "description": "Returns a string that contains the concatenation of two or more strings.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "strings The strings to append to the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(...strings: string[]) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(...strings: string[]): string",
                      "schema": [
                        "string"
                      ]
                    }
                  },
                  "indexOf": {
                    "name": "indexOf",
                    "global": false,
                    "description": "Returns the position of the first occurrence of a substring.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for in the string"
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "lastIndexOf": {
                    "name": "lastIndexOf",
                    "global": false,
                    "description": "Returns the last occurrence of a substring in the string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString The substring to search for."
                      },
                      {
                        "name": "param",
                        "text": "position The index at which to begin searching. If omitted, the search begins at the end of the string."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => number",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): number",
                      "schema": []
                    }
                  },
                  "localeCompare": {
                    "name": "localeCompare",
                    "global": false,
                    "description": "Determines whether two strings are equivalent in the current locale.\nDetermines whether two strings are equivalent in the current or specified locale.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "that String to compare to target string"
                      },
                      {
                        "name": "param",
                        "text": "locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details."
                      },
                      {
                        "name": "param",
                        "text": "options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details."
                      }
                    ],
                    "required": true,
                    "type": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }",
                    "schema": "{ (that: string): number; (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number; }"
                  },
                  "match": {
                    "name": "match",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an array containing the results of that search.\nMatches a string or an object that supports being matched against, and returns an array\r\ncontaining the results of that search, or null if no matches are found.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      },
                      {
                        "name": "param",
                        "text": "matcher An object that supports being matched against."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }",
                    "schema": "{ (regexp: string | RegExp): RegExpMatchArray | null; (matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null; }"
                  },
                  "replace": {
                    "name": "replace",
                    "global": false,
                    "description": "Replaces text in a string, using a regular expression or search string.\nPasses a string and {@linkcode replaceValue} to the `[Symbol.replace]` method on {@linkcode searchValue}. This method is expected to implement its own replacement algorithm.\nReplaces text in a string, using an object that supports replacement within a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string or regular expression to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace. When the {@linkcode searchValue} is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of {@linkcode searchValue} is replaced."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue An object that supports searching for and replacing matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue The replacement text."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A object can search for and replace matches within a string."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "search": {
                    "name": "search",
                    "global": false,
                    "description": "Finds the first substring match in a regular expression search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp The regular expression pattern and applicable flags."
                      },
                      {
                        "name": "param",
                        "text": "searcher An object which supports searching within a string."
                      }
                    ],
                    "required": true,
                    "type": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }",
                    "schema": "{ (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }"
                  },
                  "slice": {
                    "name": "slice",
                    "global": false,
                    "description": "Returns a section of a string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The index to the beginning of the specified portion of stringObj."
                      },
                      {
                        "name": "param",
                        "text": "end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.\r\nIf this value is not specified, the substring continues to the end of stringObj."
                      }
                    ],
                    "required": true,
                    "type": "(start?: number | undefined, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start?: number | undefined, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "split": {
                    "name": "split",
                    "global": false,
                    "description": "Split a string into substrings using the specified separator and return them as an array.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      },
                      {
                        "name": "param",
                        "text": "splitter An object that can split a string."
                      },
                      {
                        "name": "param",
                        "text": "limit A value used to limit the number of elements returned in the array."
                      }
                    ],
                    "required": true,
                    "type": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }",
                    "schema": "{ (separator: string | RegExp, limit?: number | undefined): string[]; (splitter: { [Symbol.split](string: string, limit?: number | undefined): string[]; }, limit?: number | undefined): string[]; }"
                  },
                  "substring": {
                    "name": "substring",
                    "global": false,
                    "description": "Returns the substring at the specified location within a String object.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "start The zero-based index number indicating the beginning of the substring."
                      },
                      {
                        "name": "param",
                        "text": "end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.\r\nIf end is omitted, the characters from start through the end of the original string are returned."
                      }
                    ],
                    "required": true,
                    "type": "(start: number, end?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(start: number, end?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "toLowerCase": {
                    "name": "toLowerCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to lowercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleLowerCase": {
                    "name": "toLocaleLowerCase",
                    "global": false,
                    "description": "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "toUpperCase": {
                    "name": "toUpperCase",
                    "global": false,
                    "description": "Converts all the alphabetic characters in a string to uppercase.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "toLocaleUpperCase": {
                    "name": "toLocaleUpperCase",
                    "global": false,
                    "description": "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
                    "tags": [],
                    "required": true,
                    "type": "(locales?: string | string[] | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(locales?: string | string[] | undefined): string",
                      "schema": []
                    }
                  },
                  "trim": {
                    "name": "trim",
                    "global": false,
                    "description": "Removes the leading and trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "length": {
                    "name": "length",
                    "global": false,
                    "description": "Returns the length of a String object.",
                    "tags": [],
                    "required": true,
                    "type": "number",
                    "schema": "number"
                  },
                  "substr": {
                    "name": "substr",
                    "global": false,
                    "description": "Gets a substring beginning at the specified location and having the specified length.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "from The starting position of the desired substring. The index of the first character in the string is zero."
                      },
                      {
                        "name": "param",
                        "text": "length The number of characters to include in the returned substring."
                      }
                    ],
                    "required": true,
                    "type": "(from: number, length?: number | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(from: number, length?: number | undefined): string",
                      "schema": []
                    }
                  },
                  "valueOf": {
                    "name": "valueOf",
                    "global": false,
                    "description": "Returns the primitive value of the specified object.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "codePointAt": {
                    "name": "codePointAt",
                    "global": false,
                    "description": "Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point\r\nvalue of the UTF-16 encoded code point starting at the string element at position pos in\r\nthe String resulting from converting this object to a String.\r\nIf there is no element at that position, the result is undefined.\r\nIf a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.",
                    "tags": [],
                    "required": true,
                    "type": "(pos: number) => number | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(pos: number): number | undefined",
                      "schema": []
                    }
                  },
                  "includes": {
                    "name": "includes",
                    "global": false,
                    "description": "Returns true if searchString appears as a substring of the result of converting this\r\nobject to a String, at one or more positions that are\r\ngreater than or equal to position; otherwise, returns false.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchString search string"
                      },
                      {
                        "name": "param",
                        "text": "position If position is undefined, 0 is assumed, so as to search all of the String."
                      }
                    ],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "endsWith": {
                    "name": "endsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nendPosition – length(this). Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, endPosition?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, endPosition?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "normalize": {
                    "name": "normalize",
                    "global": false,
                    "description": "Returns the String value result of normalizing the string into the normalization form\r\nnamed by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\r\nis \"NFC\""
                      },
                      {
                        "name": "param",
                        "text": "form Applicable values: \"NFC\", \"NFD\", \"NFKC\", or \"NFKD\", If not specified default\r\nis \"NFC\""
                      }
                    ],
                    "required": true,
                    "type": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }",
                    "schema": "{ (form: \"NFC\" | \"NFD\" | \"NFKC\" | \"NFKD\"): string; (form?: string | undefined): string; }"
                  },
                  "repeat": {
                    "name": "repeat",
                    "global": false,
                    "description": "Returns a String value that is made from count copies appended together. If count is 0,\r\nthe empty string is returned.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "count number of copies to append"
                      }
                    ],
                    "required": true,
                    "type": "(count: number) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(count: number): string",
                      "schema": []
                    }
                  },
                  "startsWith": {
                    "name": "startsWith",
                    "global": false,
                    "description": "Returns true if the sequence of elements of searchString converted to a String is the\r\nsame as the corresponding elements of this object (converted to a String) starting at\r\nposition. Otherwise returns false.",
                    "tags": [],
                    "required": true,
                    "type": "(searchString: string, position?: number | undefined) => boolean",
                    "schema": {
                      "kind": "event",
                      "type": "(searchString: string, position?: number | undefined): boolean",
                      "schema": []
                    }
                  },
                  "anchor": {
                    "name": "anchor",
                    "global": false,
                    "description": "Returns an `<a>` HTML anchor element and sets the name attribute to the text value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "param",
                        "text": "name"
                      }
                    ],
                    "required": true,
                    "type": "(name: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(name: string): string",
                      "schema": []
                    }
                  },
                  "big": {
                    "name": "big",
                    "global": false,
                    "description": "Returns a `<big>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "blink": {
                    "name": "blink",
                    "global": false,
                    "description": "Returns a `<blink>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "bold": {
                    "name": "bold",
                    "global": false,
                    "description": "Returns a `<b>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fixed": {
                    "name": "fixed",
                    "global": false,
                    "description": "Returns a `<tt>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "fontcolor": {
                    "name": "fontcolor",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the color attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(color: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(color: string): string",
                      "schema": []
                    }
                  },
                  "fontsize": {
                    "name": "fontsize",
                    "global": false,
                    "description": "Returns a `<font>` HTML element and sets the size attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      },
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "{ (size: number): string; (size: string): string; }",
                    "schema": "{ (size: number): string; (size: string): string; }"
                  },
                  "italics": {
                    "name": "italics",
                    "global": false,
                    "description": "Returns an `<i>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "link": {
                    "name": "link",
                    "global": false,
                    "description": "Returns an `<a>` HTML element and sets the href attribute value",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "(url: string) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(url: string): string",
                      "schema": []
                    }
                  },
                  "small": {
                    "name": "small",
                    "global": false,
                    "description": "Returns a `<small>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "strike": {
                    "name": "strike",
                    "global": false,
                    "description": "Returns a `<strike>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sub": {
                    "name": "sub",
                    "global": false,
                    "description": "Returns a `<sub>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "sup": {
                    "name": "sup",
                    "global": false,
                    "description": "Returns a `<sup>` HTML element",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "padStart": {
                    "name": "padStart",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the start (left) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\r\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\r\nIf this string is too long, it will be truncated and the left-most part will be applied.\r\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "padEnd": {
                    "name": "padEnd",
                    "global": false,
                    "description": "Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.\r\nThe padding is applied from the end (right) of the current string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "maxLength The length of the resulting string once the current string has been padded.\r\nIf this parameter is smaller than the current string's length, the current string will be returned as it is."
                      },
                      {
                        "name": "param",
                        "text": "fillString The string to pad the current string with.\r\nIf this string is too long, it will be truncated and the left-most part will be applied.\r\nThe default value for this parameter is \" \" (U+0020)."
                      }
                    ],
                    "required": true,
                    "type": "(maxLength: number, fillString?: string | undefined) => string",
                    "schema": {
                      "kind": "event",
                      "type": "(maxLength: number, fillString?: string | undefined): string",
                      "schema": []
                    }
                  },
                  "trimEnd": {
                    "name": "trimEnd",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimStart": {
                    "name": "trimStart",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimLeft": {
                    "name": "trimLeft",
                    "global": false,
                    "description": "Removes the leading white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimStart` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "trimRight": {
                    "name": "trimRight",
                    "global": false,
                    "description": "Removes the trailing white space and line terminator characters from a string.",
                    "tags": [
                      {
                        "name": "deprecated",
                        "text": "A legacy feature for browser compatibility. Use `trimEnd` instead"
                      }
                    ],
                    "required": true,
                    "type": "() => string",
                    "schema": {
                      "kind": "event",
                      "type": "(): string"
                    }
                  },
                  "matchAll": {
                    "name": "matchAll",
                    "global": false,
                    "description": "Matches a string with a regular expression, and returns an iterable of matches\r\ncontaining the results of that search.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "regexp A variable name or string literal containing the regular expression pattern and flags."
                      }
                    ],
                    "required": true,
                    "type": "(regexp: RegExp) => IterableIterator<RegExpMatchArray>",
                    "schema": {
                      "kind": "event",
                      "type": "(regexp: RegExp): IterableIterator<RegExpMatchArray>",
                      "schema": []
                    }
                  },
                  "replaceAll": {
                    "name": "replaceAll",
                    "global": false,
                    "description": "Replace all instances of a substring in a string, using a regular expression or search string.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replaceValue A string containing the text to replace for every successful match of searchValue in this string."
                      },
                      {
                        "name": "param",
                        "text": "searchValue A string to search for."
                      },
                      {
                        "name": "param",
                        "text": "replacer A function that returns the replacement text."
                      }
                    ],
                    "required": true,
                    "type": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }",
                    "schema": "{ (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; }"
                  },
                  "at": {
                    "name": "at",
                    "global": false,
                    "description": "Returns a new String consisting of the single UTF-16 code unit located at the specified index.",
                    "tags": [
                      {
                        "name": "param",
                        "text": "index The zero-based index of the desired code unit. A negative index will count back from the last item."
                      }
                    ],
                    "required": true,
                    "type": "(index: number) => string | undefined",
                    "schema": {
                      "kind": "event",
                      "type": "(index: number): string | undefined",
                      "schema": []
                    }
                  },
                  "__@iterator@634": {
                    "name": "__@iterator@634",
                    "global": false,
                    "description": "Iterator",
                    "tags": [],
                    "required": true,
                    "type": "() => IterableIterator<string>",
                    "schema": {
                      "kind": "event",
                      "type": "(): IterableIterator<string>"
                    }
                  }
                }
              }
            ]
          }
        },
        {
          "name": "rel",
          "type": "string | null | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | null | undefined",
            "schema": [
              "undefined",
              "null",
              "string"
            ]
          }
        },
        {
          "name": "noRel",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "prefetch",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "noPrefetch",
          "type": "boolean | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "boolean | undefined",
            "schema": [
              "undefined",
              "false",
              "true"
            ]
          }
        },
        {
          "name": "activeClass",
          "type": "string | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "exactActiveClass",
          "type": "string | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        },
        {
          "name": "ariaCurrentValue",
          "type": "string | undefined",
          "description": "",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          }
        }
      ]
    }
  },
  "NuxtLoadingIndicator": {
    "export": "default",
    "chunkName": "components/nuxt-loading-indicator",
    "global": false,
    "kebabName": "nuxt-loading-indicator",
    "pascalName": "NuxtLoadingIndicator",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-loading-indicator",
    "name": "NuxtLoadingIndicator",
    "filePath": "/node_modules/nuxt/dist/app/components/nuxt-loading-indicator.mjs",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/nuxt/dist/app/components/nuxt-loading-indicator.mjs",
    "meta": {
      "props": [
        {
          "name": "throttle",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "200"
        },
        {
          "name": "duration",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "2000"
        },
        {
          "name": "height",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "number | undefined",
          "schema": {
            "kind": "enum",
            "type": "number | undefined",
            "schema": [
              "undefined",
              "number"
            ]
          },
          "default": "3"
        },
        {
          "name": "color",
          "global": false,
          "description": "",
          "tags": [],
          "required": false,
          "type": "string | undefined",
          "schema": {
            "kind": "enum",
            "type": "string | undefined",
            "schema": [
              "undefined",
              "string"
            ]
          },
          "default": "\"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)\""
        }
      ],
      "slots": [],
      "events": [],
      "exposed": [
        {
          "name": "throttle",
          "type": "number",
          "description": "",
          "schema": "number"
        },
        {
          "name": "duration",
          "type": "number",
          "description": "",
          "schema": "number"
        },
        {
          "name": "height",
          "type": "number",
          "description": "",
          "schema": "number"
        },
        {
          "name": "color",
          "type": "string",
          "description": "",
          "schema": "string"
        }
      ]
    }
  },
  "ColorScheme": {
    "export": "default",
    "chunkName": "components/color-scheme",
    "global": false,
    "kebabName": "color-scheme",
    "pascalName": "ColorScheme",
    "prefetch": false,
    "preload": false,
    "mode": "all",
    "shortPath": "D:/Python/Project/TestDocus/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "name": "ColorScheme",
    "filePath": "/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "fullPath": "D:/Python/Project/TestDocus/node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue",
    "meta": {
      "props": [],
      "slots": [],
      "events": [],
      "exposed": []
    }
  }
};

const _QTHqYa = eventHandler(async (event) => {
  const filteredComponents = Object.values(components).filter((c) => c.global).filter((c) => !c.pascalName.startsWith("Content")).filter((c) => !c.pascalName.startsWith("DocumentDriven")).filter((c) => !c.pascalName.startsWith("Markdown")).filter((c) => !c.pascalName.startsWith("Prose")).map(({ pascalName, filePath, meta }) => {
    return {
      name: pascalName,
      path: filePath,
      meta: {
        props: meta.props,
        slots: meta.slots,
        events: meta.events
      }
    };
  });
  const runtimeConfig = useRuntimeConfig();
  const { app, content: { sources, ignores, locales, highlight, navigation, documentDriven, experiment } } = runtimeConfig;
  const appConfigSchema = runtimeConfig?.appConfigSchema;
  let appConfig = {};
  if (appConfigSchema) {
    appConfig = await $fetch.native(joinURL(app.baseURL, "/__app_config.json")).then((r) => r.json());
  }
  const hasPinceau = runtimeConfig?.pinceau?.studio;
  let tokensConfig;
  let tokensConfigSchema;
  if (hasPinceau) {
    tokensConfig = await $fetch.native(joinURL(app.baseURL, "/__pinceau_tokens_config.json")).then((r) => r.json());
    tokensConfigSchema = await $fetch.native(joinURL(app.baseURL, "/__pinceau_tokens_schema.json")).then((r) => r.json());
  }
  return {
    version: version$1,
    appConfigSchema: appConfigSchema || {},
    appConfig,
    tokensConfigSchema,
    tokensConfig,
    content: { sources, ignores, locales, highlight, navigation, documentDriven, experiment },
    components: filteredComponents
  };
});

const _AhZtah = defineEventHandler((event) => {
  appendHeader(event, "Access-Control-Allow-Origin", "*");
  const componentName = event.context.params["component?"];
  if (componentName) {
    const meta = components[pascalCase(componentName)];
    if (!meta) {
      throw createError({
        statusMessage: "Components not found!",
        statusCode: 404,
        data: {
          description: "Please make sure you are looking for correct component"
        }
      });
    }
    return meta;
  }
  return components;
});

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];

const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), q]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    $not: (item, condition) => !match(item, condition),
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    $type: (item, condition) => typeof item === String(condition),
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    $lt: (item, condition) => {
      return item < condition;
    },
    $lte: (item, condition) => {
      return item <= condition;
    },
    $gt: (item, condition) => {
      return item > condition;
    },
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before || 1;
    after = after || 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    (data, params) => params.surround ? surround(data, params.surround) : data,
    (data, params) => params.skip ? data.slice(params.skip) : data,
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    (data, params) => apply(withoutKeys(params.without))(data),
    (data, params) => apply(withKeys(params.only))(data)
  ];
  return async (query) => {
    const data = await getContentsList();
    const params = query.params();
    const filteredData = pipelines.reduce(($data, pipe) => pipe($data, params) || $data, data);
    if (params.first) {
      return filteredData[0];
    }
    return filteredData;
  };
}

const defineTransformer = (transformer) => {
  return transformer;
};
const createSingleton = (fn) => {
  let instance;
  return (...args) => {
    if (!instance) {
      instance = fn(...args);
    }
    return instance;
  };
};

function createTokenizer(parser, initialize, from) {
  let point = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];
      if (typeof chunk === "string") {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }
    context.previous = code;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all) ? all : all ? [all] : []
          ];
          return handleListOfConstructs(list)(code);
        }
      }
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
      }
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

function initializeDocument(effects) {
  const self = this;
  const delimiter = (this.parser.delimiter || ",").charCodeAt(0);
  return enterRow;
  function enterRow(code) {
    return effects.attempt(
      { tokenize: attemptLastLine },
      (code2) => {
        effects.consume(code2);
        return enterRow;
      },
      (code2) => {
        effects.enter("row");
        return enterColumn(code2);
      }
    )(code);
  }
  function enterColumn(code) {
    effects.enter("column");
    return content(code);
  }
  function content(code) {
    if (code === null) {
      effects.exit("column");
      effects.exit("row");
      effects.consume(code);
      return content;
    }
    if (code === 34) {
      return quotedData(code);
    }
    if (code === delimiter) {
      if (self.previous === delimiter || markdownLineEnding(self.previous) || self.previous === null) {
        effects.enter("data");
        effects.exit("data");
      }
      effects.exit("column");
      effects.enter("columnSeparator");
      effects.consume(code);
      effects.exit("columnSeparator");
      effects.enter("column");
      return content;
    }
    if (markdownLineEnding(code)) {
      effects.exit("column");
      effects.enter("newline");
      effects.consume(code);
      effects.exit("newline");
      effects.exit("row");
      return enterRow;
    }
    return data(code);
  }
  function data(code) {
    effects.enter("data");
    return dataChunk(code);
  }
  function dataChunk(code) {
    if (code === null || markdownLineEnding(code) || code === delimiter) {
      effects.exit("data");
      return content(code);
    }
    if (code === 92) {
      return escapeCharacter(code);
    }
    effects.consume(code);
    return dataChunk;
  }
  function escapeCharacter(code) {
    effects.consume(code);
    return function(code2) {
      effects.consume(code2);
      return content;
    };
  }
  function quotedData(code) {
    effects.enter("quotedData");
    effects.enter("quotedDataChunk");
    effects.consume(code);
    return quotedDataChunk;
  }
  function quotedDataChunk(code) {
    if (code === 92) {
      return escapeCharacter(code);
    }
    if (code === 34) {
      return effects.attempt(
        { tokenize: attemptDoubleQuote },
        (code2) => {
          effects.exit("quotedDataChunk");
          effects.enter("quotedDataChunk");
          return quotedDataChunk(code2);
        },
        (code2) => {
          effects.consume(code2);
          effects.exit("quotedDataChunk");
          effects.exit("quotedData");
          return content;
        }
      )(code);
    }
    effects.consume(code);
    return quotedDataChunk;
  }
}
function attemptDoubleQuote(effects, ok, nok) {
  return startSequence;
  function startSequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.enter("quoteFence");
    effects.consume(code);
    return sequence;
  }
  function sequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.consume(code);
    effects.exit("quoteFence");
    return (code2) => ok(code2);
  }
}
function attemptLastLine(effects, ok, nok) {
  return enterLine;
  function enterLine(code) {
    if (!markdownSpace(code) && code !== null) {
      return nok(code);
    }
    effects.enter("emptyLine");
    return continueLine(code);
  }
  function continueLine(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return continueLine;
    }
    if (code === null) {
      effects.exit("emptyLine");
      return ok(code);
    }
    return nok(code);
  }
}
const parse$1 = (options) => {
  return createTokenizer(
    { ...options },
    { tokenize: initializeDocument },
    void 0
  );
};

const own = {}.hasOwnProperty;
const initialPoint = {
  line: 1,
  column: 1,
  offset: 0
};
const fromCSV = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler$1()(
    postprocess(
      parse$1(options).write(preprocess()(value, encoding, true))
    )
  );
};
function compiler$1() {
  const config = {
    enter: {
      column: opener(openColumn),
      row: opener(openRow),
      data: onenterdata,
      quotedData: onenterdata
    },
    exit: {
      row: closer(),
      column: closer(),
      data: onexitdata,
      quotedData: onexitQuotedData
    }
  };
  return compile;
  function compile(events) {
    const tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      resume
    };
    let index = -1;
    while (++index < events.length) {
      const handler = config[events[index][0]];
      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index][2].sliceSerialize
            },
            context
          ),
          events[index][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : initialPoint
      ),
      end: point(
        events.length > 0 ? events[events.length - 2][1].end : initialPoint
      )
    };
    return tree;
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) {
        and.call(this, token);
      }
    }
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) {
        and.call(this, token);
      }
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point(token.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token).trim().replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function onexitQuotedData(token) {
    const tail = this.stack.pop();
    const value = this.sliceSerialize(token);
    tail.value += this.sliceSerialize(token).trim().substring(1, value.length - 1).replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function text() {
    return {
      type: "text",
      value: ""
    };
  }
  function openColumn() {
    return {
      type: "column",
      children: []
    };
  }
  function openRow() {
    return {
      type: "row",
      children: []
    };
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

function csvParse(options) {
  const parser = (doc) => {
    return fromCSV(doc, options);
  };
  Object.assign(this, { Parser: parser });
  const toJsonObject = (tree) => {
    const [header, ...rows] = tree.children;
    const columns = header.children.map((col) => col.children[0].value);
    const data = rows.map((row) => {
      return row.children.reduce((acc, col, i) => {
        acc[String(columns[i])] = col.children[0]?.value;
        return acc;
      }, {});
    });
    return data;
  };
  const toJsonArray = (tree) => {
    const data = tree.children.map((row) => {
      return row.children.map((col) => col.children[0]?.value);
    });
    return data;
  };
  const compiler = (doc) => {
    if (options.json) {
      return toJsonObject(doc);
    }
    return toJsonArray(doc);
  };
  Object.assign(this, { Compiler: compiler });
}
const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const stream = unified().use(csvParse, {
      delimiter: ",",
      json: true,
      ...options
    });
    const { result } = await stream.process(content);
    return {
      _id,
      _type: "csv",
      body: result
    };
  }
});

function flattenNodeText(node) {
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}

function parseThematicBlock(lang) {
  if (!lang) {
    return {
      language: void 0,
      highlights: void 0,
      fileName: void 0
    };
  }
  const language = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokens = lang.match(/{([^}]+)}/);
  const filenameTokens = lang.match(/\[(.+)\]/);
  return {
    language: language ? language[0] : void 0,
    highlights: parseHighlightedLines(highlightTokens && highlightTokens[1]),
    filename: Array.isArray(filenameTokens) ? filenameTokens[1] : void 0
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
function wrap(nodes, loose = false) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index < nodes.length) {
    if (index) {
      result.push(u("text", "\n"));
    }
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}

const code = (h, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename } = parseThematicBlock(lang);
  const code = node.value ? detab(node.value + "\n") : "";
  return h(
    node.position,
    "code",
    {
      language,
      filename,
      highlights,
      code
    },
    [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]
  );
};

function html(h, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (tagName === "code") {
    node.value = node.value.replace(tagName, "code-inline");
  }
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}

function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (_id) => {
  const [_source, ...parts] = _id.split(":");
  const [, filename, _extension] = parts[parts.length - 1].match(/(.*)\.([^.]+)$/);
  parts[parts.length - 1] = filename;
  const _path = parts.join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en" } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = generatePath(parts.join("/"));
    return {
      _path: filePath,
      _dir: filePath.split("/").slice(-2)[0],
      _draft: isDraft(_path),
      _partial: isPartial(_path),
      _locale,
      ...content,
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path, { forceLeadingSlash = true } = {}) => {
  path = path.split("/").map((part) => slugify(refineUrlPart(part), { lower: true })).join("/");
  return forceLeadingSlash ? withLeadingSlash(withoutTrailingSlash(path)) : path;
};
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

function link(h, node) {
  const props = {
    ...node.attributes || {},
    href: encode(normalizeLink(node.url))
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "a", props, all(h, node));
}
function normalizeLink(link2) {
  if (link2.endsWith(".md") && (isRelative(link2) || !/^https?/.test(link2) && !link2.startsWith("/"))) {
    return generatePath(link2.replace(/\.md$/, ""), { forceLeadingSlash: false });
  } else {
    return link2;
  }
}

function list(h, node) {
  const props = {};
  const name = `${node.ordered ? "ol" : "ul"}`;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    props.className = ["contains-task-list"];
  }
  return h(node, name, props, wrap(all(h, node), true));
}

function listItem(h, node, parent) {
  const result = all(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  let wrapped = [];
  let index;
  let child;
  if (typeof node.checked === "boolean") {
    result.unshift(
      h({}, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  const length = result.length;
  index = -1;
  while (++index < length) {
    child = result[index];
    if (child.tagName === "p" && !loose) {
      wrapped = wrapped.concat(child.children || []);
    } else {
      wrapped.push(child);
    }
  }
  return h(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  const length = children.length;
  let index = -1;
  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  const children = node.children || [];
  return spread === void 0 || spread === null ? children.length > 1 : spread;
}

function table(h, node) {
  const rows = node.children;
  const align = node.align || [];
  const result = rows.map((row, index) => {
    const childres = row.children;
    const name = index === 0 ? "th" : "td";
    let pos = node.align ? align.length : childres.length;
    const out = [];
    while (pos--) {
      const cell = childres[pos];
      out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
    }
    return h(row, "tr", wrap(out, true));
  });
  const body = result[1] && h(
    {
      start: position(result[1]).start,
      end: position(result[result.length - 1]).end
    },
    "tbody",
    wrap(result.slice(1), true)
  );
  return h(node, "table", wrap([h(result[0].position, "thead", wrap([result[0]], true))].concat(body || []), true));
}

function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}

function image(h, node) {
  const props = {
    ...node.attributes,
    src: encode(node.url),
    alt: node.alt
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "img", props);
}

function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}

function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}

function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}

function thematicBreak(h, node) {
  return h(node, "hr");
}

function containerComponent(h, node) {
  const hast = h(node, node.tagName, node.attributes, all(h, node));
  hast.attributes = node.attributes;
  hast.fmAttributes = node.fmAttributes;
  return hast;
}

const handlers$1 = {
  emphasis,
  code,
  paragraph,
  html,
  link,
  list,
  listItem,
  heading,
  table,
  image,
  blockquote,
  strong,
  inlineCode,
  thematicBreak,
  containerComponent
};

function compiler(_options) {
  function parseAsJSON(node) {
    if (Array.isArray(node)) {
      return node.map(parseAsJSON).filter(Boolean);
    }
    if (node.tagName?.startsWith("h") && node.properties.id) {
      node.properties.id = node.properties.id.replace(/-+/g, "-").replace(/-$/, "").replace(/^-/, "");
    }
    if (node.type === "element") {
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children.flatMap((child) => {
          if (child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {}
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      return {
        type: "element",
        tag: node.tagName,
        props: node.properties,
        children: parseAsJSON(node.children || [])
      };
    }
    if (node.type === "text") {
      if (node.value === "\n") {
        return null;
      }
      return {
        type: "text",
        value: node.value
      };
    }
    if (node.type === "comment") {
      return null;
    }
    node.children = parseAsJSON(node.children || []);
    return node;
  }
  this.Compiler = function(root) {
    return {
      type: "root",
      children: parseAsJSON(root.children || [])
    };
  };
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}

const usePlugins = (plugins, stream) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin) {
      const { instance, ...options } = plugin;
      stream.use(instance, options);
    }
  }
};
function generateBody(content, options) {
  const rehypeOptions = {
    handlers: handlers$1,
    allowDangerousHtml: true
  };
  return new Promise((resolve, reject) => {
    const stream = unified().use(remarkParse);
    if (options.mdc) {
      stream.use(remarkMDC);
    }
    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options);
    stream.process(
      {
        value: content,
        data: options.data
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        Object.assign(options.data, file?.data || {});
        resolve(file?.result);
      }
    );
  });
}
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type !== "text" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const useDefaultOptions = () => ({
  mdc: true,
  toc: {
    depth: 2,
    searchDepth: 2
  },
  tags: {},
  remarkPlugins: {
    "remark-emoji": {
      instance: remarkEmoji
    },
    "remark-squeeze-paragraphs": {
      instance: remarkSqueezeParagraphs
    },
    "remark-gfm": {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    "rehype-slug": {
      instance: rehypeSlug
    },
    "rehype-external-links": {
      instance: rehypeExternalLinks
    },
    "rehype-sort-attribute-values": {
      instance: rehypeSortAttributeValues
    },
    "rehype-sort-attributes": {
      instance: rehypeSortAttributes
    },
    "rehype-raw": {
      instance: rehypeRaw,
      passThrough: ["element"]
    }
  }
});
async function parse(file, userOptions = {}) {
  const options = defu(userOptions, useDefaultOptions());
  const { content, data } = await parseFrontMatter(file);
  const body = await generateBody(content, { ...options, data });
  let toc;
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc);
    toc = generateToc(body, tocOption);
  }
  const excerptString = useExcerpt(content);
  const excerpt = excerptString ? await generateBody(excerptString, { ...options, data }) : void 0;
  const heading = contentHeading(body);
  return {
    body: {
      ...body,
      toc
    },
    meta: {
      _empty: content.trim().length === 0,
      title: heading.title,
      description: heading.description,
      excerpt,
      ...data
    }
  };
}
function useExcerpt(content, delimiter = /<!--\s*?more\s*?-->/i) {
  if (!delimiter) {
    return "";
  }
  let idx = -1;
  const match = delimiter.exec(content);
  if (match) {
    idx = match.index;
  }
  if (idx !== -1) {
    return content.slice(0, idx);
  }
  return content;
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const parsed = await parse(content, config);
    return {
      ...parsed.meta,
      body: parsed.body,
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(name).then((m) => m.default || m),
        ...plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: async (_id, content) => {
    const { data } = await parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

var information_for_contributors = [
	"This file has been converted from https://github.com/docusgen/vscode-extension/blob/main/syntaxes/mdc.tmLanguage.json",
	"If you want to provide a fix or improvement, please create a pull request against the original repository.",
	"Once accepted there, we are happy to receive an update request."
];
var version = "https://github.com/docusgen/vscode-extension/blob/1303abd16342880a42a4d143a660da049c79ea6c/syntaxes/mdc.tmLanguage.json";
var name = "markdown";
var injectionSelector = "L:text.html.markdown";
var scopeName = "text.markdown.mdc";
var patterns = [
	{
		include: "text.html.markdown#frontMatter"
	},
	{
		include: "#component_block"
	},
	{
		include: "#block"
	}
];
var repository = {
	block: {
		comment: "Same as `text.html.markdown#block`, but without `raw_block`",
		patterns: [
			{
				include: "#component_block"
			},
			{
				include: "text.html.markdown#separator"
			},
			{
				include: "#heading"
			},
			{
				include: "#blockquote"
			},
			{
				include: "#lists"
			},
			{
				include: "#paragraph"
			},
			{
				include: "text.html.markdown#fenced_code_block"
			},
			{
				include: "text.html.markdown#link-def"
			},
			{
				include: "text.html.markdown#html"
			}
		]
	},
	inline: {
		patterns: [
			{
				include: "#component_inline"
			},
			{
				include: "#span"
			},
			{
				include: "#markdown_attributes"
			}
		]
	},
	markdown_attributes: {
		match: "(?x)([^ ])(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
		name: "markup.component.attribute",
		captures: {
			"4": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		}
	},
	span: {
		match: "(?x)\n  (\\[)           # Open\n    ([^]]*)\n  (\\])\n  (               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )?",
		name: "markup.component.span",
		captures: {
			"2": {
				name: "string.other.link.description.title.markdown"
			},
			"4": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			}
		}
	},
	attributes: {
		match: "(?x)(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
		name: "markup.attributes",
		captures: {
			"3": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		}
	},
	component_inline: {
		match: "(?x)\n  (^|\\G|\\s+)\n  (:)           # component colon\n  (?i:             # component name\n    (\\w[\\w\\d-]*)\n  )\n  (\n      ({[^}]*})        # attributes\n      (\\[[^\\]]*\\]?) # slot\n      # reverse order\n    | (\\[[^\\]]*\\])  # slot\n      ({[^}]*})?       # attributes\n  )?",
		name: "markup.component.inline",
		captures: {
			"2": {
				name: "punctuation.definition.tag.start.component"
			},
			"3": {
				name: "entity.name.tag.component"
			},
			"5": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			},
			"6": {
				patterns: [
					{
						include: "#span"
					}
				]
			},
			"7": {
				patterns: [
					{
						include: "#span"
					}
				]
			},
			"8": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			}
		}
	},
	component_block: {
		begin: "(?x)\n  (^|\\G)(\\s*)\n  (:{2,})     # component colons\n  (?i:\n    (\\w[\\w\\d-]+)   # component name\n    (                 # folowing spaces or attributes\n        \\s*\n      | {([^{]*)}\n    )\n    $\n  )",
		name: "markup.component.block",
		end: "(^|\\G)(\\2)(\\3)\\s*$",
		beginCaptures: {
			"4": {
				name: "entity.name.tag.component"
			},
			"5": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		},
		patterns: [
			{
				include: "#content"
			}
		]
	},
	content: {
		begin: "(^|\\G)(\\s*)(.*)",
		"while": "(^|\\G)(?!\\s*([:]{2,})\\s*$)",
		contentName: "meta.embedded.block.component",
		patterns: [
			{
				begin: "(^|\\G)(\\s*)(-{3})(\\s*)$",
				end: "(^|\\G)(\\s*(-{3})(\\s*)$)",
				patterns: [
					{
						include: "source.yaml"
					}
				]
			},
			{
				match: "^(\\s*)(#[\\w\\-\\_]*)\\s*(<!--(.*)-->)?$",
				captures: {
					"2": {
						name: "entity.other.attribute-name.html"
					},
					"3": {
						name: "comment.block.html"
					}
				}
			},
			{
				comment: "Block Repository created to disable 4-space raw block inside components",
				include: "#block"
			}
		]
	},
	attribute: {
		patterns: [
			{
				match: "(?x)\n  (\n    ([^=><\\s]*)  # attribute name\n    (             # attribute value\n        =[\"]([^\"]*)([\"])|[']([^']*)(['])\n      | =[^\\s'\"]*\n    )?\n    \\s*\n  )",
				captures: {
					"2": {
						name: "entity.other.attribute-name.html"
					},
					"3": {
						patterns: [
							{
								include: "#attribute-interior"
							}
						]
					}
				}
			}
		]
	},
	"attribute-interior": {
		comment: "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L376",
		patterns: [
			{
				begin: "=",
				beginCaptures: {
					"0": {
						name: "punctuation.separator.key-value.html"
					}
				},
				end: "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
				patterns: [
					{
						match: "([^\\s\"'=<>`/]|/(?!>))+",
						name: "string.unquoted.html"
					},
					{
						begin: "\"",
						beginCaptures: {
							"0": {
								name: "punctuation.definition.string.begin.html"
							}
						},
						end: "\"",
						endCaptures: {
							"0": {
								name: "punctuation.definition.string.end.html"
							}
						},
						name: "string.quoted.double.html",
						patterns: [
							{
								include: "#entities"
							}
						]
					},
					{
						begin: "'",
						beginCaptures: {
							"0": {
								name: "punctuation.definition.string.begin.html"
							}
						},
						end: "'",
						endCaptures: {
							"0": {
								name: "punctuation.definition.string.end.html"
							}
						},
						name: "string.quoted.single.html",
						patterns: [
							{
								include: "#entities"
							}
						]
					},
					{
						match: "=",
						name: "invalid.illegal.unexpected-equals-sign.html"
					}
				]
			}
		]
	},
	entities: {
		comment: "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L532",
		patterns: [
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"912": {
						name: "punctuation.definition.entity.html"
					}
				},
				comment: "Yes this is a bit ridiculous, there are quite a lot of these",
				match: "(?x)\n\t\t\t\t\t\t(&)\t(?=[a-zA-Z])\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t(a(s(ymp(eq)?|cr|t)|n(d(slope|d|v|and)?|g(s(t|ph)|zarr|e|le|rt(vb(d)?)?|msd(a(h|c|d|e|f|a|g|b))?)?)|c(y|irc|d|ute|E)?|tilde|o(pf|gon)|uml|p(id|os|prox(eq)?|e|E|acir)?|elig|f(r)?|w(conint|int)|l(pha|e(ph|fsym))|acute|ring|grave|m(p|a(cr|lg))|breve)|A(s(sign|cr)|nd|MP|c(y|irc)|tilde|o(pf|gon)|uml|pplyFunction|fr|Elig|lpha|acute|ring|grave|macr|breve))\n\t\t\t\t\t\t  | (B(scr|cy|opf|umpeq|e(cause|ta|rnoullis)|fr|a(ckslash|r(v|wed))|reve)|b(s(cr|im(e)?|ol(hsub|b)?|emi)|n(ot|e(quiv)?)|c(y|ong)|ig(s(tar|qcup)|c(irc|up|ap)|triangle(down|up)|o(times|dot|plus)|uplus|vee|wedge)|o(t(tom)?|pf|wtie|x(h(d|u|D|U)?|times|H(d|u|D|U)?|d(R|l|r|L)|u(R|l|r|L)|plus|D(R|l|r|L)|v(R|h|H|l|r|L)?|U(R|l|r|L)|V(R|h|H|l|r|L)?|minus|box))|Not|dquo|u(ll(et)?|mp(e(q)?|E)?)|prime|e(caus(e)?|t(h|ween|a)|psi|rnou|mptyv)|karow|fr|l(ock|k(1(2|4)|34)|a(nk|ck(square|triangle(down|left|right)?|lozenge)))|a(ck(sim(eq)?|cong|prime|epsilon)|r(vee|wed(ge)?))|r(eve|vbar)|brk(tbrk)?))\n\t\t\t\t\t\t  | (c(s(cr|u(p(e)?|b(e)?))|h(cy|i|eck(mark)?)|ylcty|c(irc|ups(sm)?|edil|a(ps|ron))|tdot|ir(scir|c(eq|le(d(R|circ|S|dash|ast)|arrow(left|right)))?|e|fnint|E|mid)?|o(n(int|g(dot)?)|p(y(sr)?|f|rod)|lon(e(q)?)?|m(p(fn|le(xes|ment))?|ma(t)?))|dot|u(darr(l|r)|p(s|c(up|ap)|or|dot|brcap)?|e(sc|pr)|vee|wed|larr(p)?|r(vearrow(left|right)|ly(eq(succ|prec)|vee|wedge)|arr(m)?|ren))|e(nt(erdot)?|dil|mptyv)|fr|w(conint|int)|lubs(uit)?|a(cute|p(s|c(up|ap)|dot|and|brcup)?|r(on|et))|r(oss|arr))|C(scr|hi|c(irc|onint|edil|aron)|ircle(Minus|Times|Dot|Plus)|Hcy|o(n(tourIntegral|int|gruent)|unterClockwiseContourIntegral|p(f|roduct)|lon(e)?)|dot|up(Cap)?|OPY|e(nterDot|dilla)|fr|lo(seCurly(DoubleQuote|Quote)|ckwiseContourIntegral)|a(yleys|cute|p(italDifferentialD)?)|ross))\n\t\t\t\t\t\t  | (d(s(c(y|r)|trok|ol)|har(l|r)|c(y|aron)|t(dot|ri(f)?)|i(sin|e|v(ide(ontimes)?|onx)?|am(s|ond(suit)?)?|gamma)|Har|z(cy|igrarr)|o(t(square|plus|eq(dot)?|minus)?|ublebarwedge|pf|wn(harpoon(left|right)|downarrows|arrow)|llar)|d(otseq|a(rr|gger))?|u(har|arr)|jcy|e(lta|g|mptyv)|f(isht|r)|wangle|lc(orn|rop)|a(sh(v)?|leth|rr|gger)|r(c(orn|rop)|bkarow)|b(karow|lac)|Arr)|D(s(cr|trok)|c(y|aron)|Scy|i(fferentialD|a(critical(Grave|Tilde|Do(t|ubleAcute)|Acute)|mond))|o(t(Dot|Equal)?|uble(Right(Tee|Arrow)|ContourIntegral|Do(t|wnArrow)|Up(DownArrow|Arrow)|VerticalBar|L(ong(RightArrow|Left(RightArrow|Arrow))|eft(RightArrow|Tee|Arrow)))|pf|wn(Right(TeeVector|Vector(Bar)?)|Breve|Tee(Arrow)?|arrow|Left(RightVector|TeeVector|Vector(Bar)?)|Arrow(Bar|UpArrow)?))|Zcy|el(ta)?|D(otrahd)?|Jcy|fr|a(shv|rr|gger)))\n\t\t\t\t\t\t  | (e(s(cr|im|dot)|n(sp|g)|c(y|ir(c)?|olon|aron)|t(h|a)|o(pf|gon)|dot|u(ro|ml)|p(si(v|lon)?|lus|ar(sl)?)|e|D(ot|Dot)|q(s(im|lant(less|gtr))|c(irc|olon)|u(iv(DD)?|est|als)|vparsl)|f(Dot|r)|l(s(dot)?|inters|l)?|a(ster|cute)|r(Dot|arr)|g(s(dot)?|rave)?|x(cl|ist|p(onentiale|ectation))|m(sp(1(3|4))?|pty(set|v)?|acr))|E(s(cr|im)|c(y|irc|aron)|ta|o(pf|gon)|NG|dot|uml|TH|psilon|qu(ilibrium|al(Tilde)?)|fr|lement|acute|grave|x(ists|ponentialE)|m(pty(SmallSquare|VerySmallSquare)|acr)))\n\t\t\t\t\t\t  | (f(scr|nof|cy|ilig|o(pf|r(k(v)?|all))|jlig|partint|emale|f(ilig|l(ig|lig)|r)|l(tns|lig|at)|allingdotseq|r(own|a(sl|c(1(2|8|3|4|5|6)|78|2(3|5)|3(8|4|5)|45|5(8|6)))))|F(scr|cy|illed(SmallSquare|VerySmallSquare)|o(uriertrf|pf|rAll)|fr))\n\t\t\t\t\t\t  | (G(scr|c(y|irc|edil)|t|opf|dot|T|Jcy|fr|amma(d)?|reater(Greater|SlantEqual|Tilde|Equal(Less)?|FullEqual|Less)|g|breve)|g(s(cr|im(e|l)?)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|irc)|t(c(c|ir)|dot|quest|lPar|r(sim|dot|eq(qless|less)|less|a(pprox|rr)))?|imel|opf|dot|jcy|e(s(cc|dot(o(l)?)?|l(es)?)?|q(slant|q)?|l)?|v(nE|ertneqq)|fr|E(l)?|l(j|E|a)?|a(cute|p|mma(d)?)|rave|g(g)?|breve))\n\t\t\t\t\t\t  | (h(s(cr|trok|lash)|y(phen|bull)|circ|o(ok(leftarrow|rightarrow)|pf|arr|rbar|mtht)|e(llip|arts(uit)?|rcon)|ks(earow|warow)|fr|a(irsp|lf|r(dcy|r(cir|w)?)|milt)|bar|Arr)|H(s(cr|trok)|circ|ilbertSpace|o(pf|rizontalLine)|ump(DownHump|Equal)|fr|a(cek|t)|ARDcy))\n\t\t\t\t\t\t  | (i(s(cr|in(s(v)?|dot|v|E)?)|n(care|t(cal|prod|e(rcal|gers)|larhk)?|odot|fin(tie)?)?|c(y|irc)?|t(ilde)?|i(nfin|i(nt|int)|ota)?|o(cy|ta|pf|gon)|u(kcy|ml)|jlig|prod|e(cy|xcl)|quest|f(f|r)|acute|grave|m(of|ped|a(cr|th|g(part|e|line))))|I(scr|n(t(e(rsection|gral))?|visible(Comma|Times))|c(y|irc)|tilde|o(ta|pf|gon)|dot|u(kcy|ml)|Ocy|Jlig|fr|Ecy|acute|grave|m(plies|a(cr|ginaryI))?))\n\t\t\t\t\t\t  | (j(s(cr|ercy)|c(y|irc)|opf|ukcy|fr|math)|J(s(cr|ercy)|c(y|irc)|opf|ukcy|fr))\n\t\t\t\t\t\t  | (k(scr|hcy|c(y|edil)|opf|jcy|fr|appa(v)?|green)|K(scr|c(y|edil)|Hcy|opf|Jcy|fr|appa))\n\t\t\t\t\t\t  | (l(s(h|cr|trok|im(e|g)?|q(uo(r)?|b)|aquo)|h(ar(d|u(l)?)|blk)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|ub|e(il|dil)|aron)|Barr|t(hree|c(c|ir)|imes|dot|quest|larr|r(i(e|f)?|Par))?|Har|o(ng(left(arrow|rightarrow)|rightarrow|mapsto)|times|z(enge|f)?|oparrow(left|right)|p(f|lus|ar)|w(ast|bar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|r(dhar|ushar))|ur(dshar|uhar)|jcy|par(lt)?|e(s(s(sim|dot|eq(qgtr|gtr)|approx|gtr)|cc|dot(o(r)?)?|g(es)?)?|q(slant|q)?|ft(harpoon(down|up)|threetimes|leftarrows|arrow(tail)?|right(squigarrow|harpoons|arrow(s)?))|g)?|v(nE|ertneqq)|f(isht|loor|r)|E(g)?|l(hard|corner|tri|arr)?|a(ng(d|le)?|cute|t(e(s)?|ail)?|p|emptyv|quo|rr(sim|hk|tl|pl|fs|lp|b(fs)?)?|gran|mbda)|r(har(d)?|corner|tri|arr|m)|g(E)?|m(idot|oust(ache)?)|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr))|L(s(h|cr|trok)|c(y|edil|aron)|t|o(ng(RightArrow|left(arrow|rightarrow)|rightarrow|Left(RightArrow|Arrow))|pf|wer(RightArrow|LeftArrow))|T|e(ss(Greater|SlantEqual|Tilde|EqualGreater|FullEqual|Less)|ft(Right(Vector|Arrow)|Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|rightarrow|Floor|A(ngleBracket|rrow(RightArrow|Bar)?)))|Jcy|fr|l(eftarrow)?|a(ng|cute|placetrf|rr|mbda)|midot))\n\t\t\t\t\t\t  | (M(scr|cy|inusPlus|opf|u|e(diumSpace|llintrf)|fr|ap)|m(s(cr|tpos)|ho|nplus|c(y|omma)|i(nus(d(u)?|b)?|cro|d(cir|dot|ast)?)|o(dels|pf)|dash|u(ltimap|map)?|p|easuredangle|DDot|fr|l(cp|dr)|a(cr|p(sto(down|up|left)?)?|l(t(ese)?|e)|rker)))\n\t\t\t\t\t\t  | (n(s(hort(parallel|mid)|c(cue|e|r)?|im(e(q)?)?|u(cc(eq)?|p(set(eq(q)?)?|e|E)?|b(set(eq(q)?)?|e|E)?)|par|qsu(pe|be)|mid)|Rightarrow|h(par|arr|Arr)|G(t(v)?|g)|c(y|ong(dot)?|up|edil|a(p|ron))|t(ilde|lg|riangle(left(eq)?|right(eq)?)|gl)|i(s(d)?|v)?|o(t(ni(v(c|a|b))?|in(dot|v(c|a|b)|E)?)?|pf)|dash|u(m(sp|ero)?)?|jcy|p(olint|ar(sl|t|allel)?|r(cue|e(c(eq)?)?)?)|e(s(im|ear)|dot|quiv|ar(hk|r(ow)?)|xist(s)?|Arr)?|v(sim|infin|Harr|dash|Dash|l(t(rie)?|e|Arr)|ap|r(trie|Arr)|g(t|e))|fr|w(near|ar(hk|r(ow)?)|Arr)|V(dash|Dash)|l(sim|t(ri(e)?)?|dr|e(s(s)?|q(slant|q)?|ft(arrow|rightarrow))?|E|arr|Arr)|a(ng|cute|tur(al(s)?)?|p(id|os|prox|E)?|bla)|r(tri(e)?|ightarrow|arr(c|w)?|Arr)|g(sim|t(r)?|e(s|q(slant|q)?)?|E)|mid|L(t(v)?|eft(arrow|rightarrow)|l)|b(sp|ump(e)?))|N(scr|c(y|edil|aron)|tilde|o(nBreakingSpace|Break|t(R(ightTriangle(Bar|Equal)?|everseElement)|Greater(Greater|SlantEqual|Tilde|Equal|FullEqual|Less)?|S(u(cceeds(SlantEqual|Tilde|Equal)?|perset(Equal)?|bset(Equal)?)|quareSu(perset(Equal)?|bset(Equal)?))|Hump(DownHump|Equal)|Nested(GreaterGreater|LessLess)|C(ongruent|upCap)|Tilde(Tilde|Equal|FullEqual)?|DoubleVerticalBar|Precedes(SlantEqual|Equal)?|E(qual(Tilde)?|lement|xists)|VerticalBar|Le(ss(Greater|SlantEqual|Tilde|Equal|Less)?|ftTriangle(Bar|Equal)?))?|pf)|u|e(sted(GreaterGreater|LessLess)|wLine|gative(MediumSpace|Thi(nSpace|ckSpace)|VeryThinSpace))|Jcy|fr|acute))\n\t\t\t\t\t\t  | (o(s(cr|ol|lash)|h(m|bar)|c(y|ir(c)?)|ti(lde|mes(as)?)|S|int|opf|d(sold|iv|ot|ash|blac)|uml|p(erp|lus|ar)|elig|vbar|f(cir|r)|l(c(ir|ross)|t|ine|arr)|a(st|cute)|r(slope|igof|or|d(er(of)?|f|m)?|v|arr)?|g(t|on|rave)|m(i(nus|cron|d)|ega|acr))|O(s(cr|lash)|c(y|irc)|ti(lde|mes)|opf|dblac|uml|penCurly(DoubleQuote|Quote)|ver(B(ar|rac(e|ket))|Parenthesis)|fr|Elig|acute|r|grave|m(icron|ega|acr)))\n\t\t\t\t\t\t  | (p(s(cr|i)|h(i(v)?|one|mmat)|cy|i(tchfork|v)?|o(intint|und|pf)|uncsp|er(cnt|tenk|iod|p|mil)|fr|l(us(sim|cir|two|d(o|u)|e|acir|mn|b)?|an(ck(h)?|kv))|ar(s(im|l)|t|a(llel)?)?|r(sim|n(sim|E|ap)|cue|ime(s)?|o(d|p(to)?|f(surf|line|alar))|urel|e(c(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?)?|E|ap)?|m)|P(s(cr|i)|hi|cy|i|o(incareplane|pf)|fr|lusMinus|artialD|r(ime|o(duct|portion(al)?)|ecedes(SlantEqual|Tilde|Equal)?)?))\n\t\t\t\t\t\t  | (q(scr|int|opf|u(ot|est(eq)?|at(int|ernions))|prime|fr)|Q(scr|opf|UOT|fr))\n\t\t\t\t\t\t  | (R(s(h|cr)|ho|c(y|edil|aron)|Barr|ight(Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|Floor|A(ngleBracket|rrow(Bar|LeftArrow)?))|o(undImplies|pf)|uleDelayed|e(verse(UpEquilibrium|E(quilibrium|lement)))?|fr|EG|a(ng|cute|rr(tl)?)|rightarrow)|r(s(h|cr|q(uo(r)?|b)|aquo)|h(o(v)?|ar(d|u(l)?))|nmid|c(y|ub|e(il|dil)|aron)|Barr|t(hree|imes|ri(e|f|ltri)?)|i(singdotseq|ng|ght(squigarrow|harpoon(down|up)|threetimes|left(harpoons|arrows)|arrow(tail)?|rightarrows))|Har|o(times|p(f|lus|ar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|ldhar)|uluhar|p(polint|ar(gt)?)|e(ct|al(s|ine|part)?|g)|f(isht|loor|r)|l(har|arr|m)|a(ng(d|e|le)?|c(ute|e)|t(io(nals)?|ail)|dic|emptyv|quo|rr(sim|hk|c|tl|pl|fs|w|lp|ap|b(fs)?)?)|rarr|x|moust(ache)?|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr)))\n\t\t\t\t\t\t  | (s(s(cr|tarf|etmn|mile)|h(y|c(hcy|y)|ort(parallel|mid)|arp)|c(sim|y|n(sim|E|ap)|cue|irc|polint|e(dil)?|E|a(p|ron))?|t(ar(f)?|r(ns|aight(phi|epsilon)))|i(gma(v|f)?|m(ne|dot|plus|e(q)?|l(E)?|rarr|g(E)?)?)|zlig|o(pf|ftcy|l(b(ar)?)?)|dot(e|b)?|u(ng|cc(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?|p(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|hs(ol|ub)|1|n(e|E)|2|d(sub|ot)|3|plus|e(dot)?|E|larr|mult)?|m|b(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|n(e|E)|dot|plus|e(dot)?|E|rarr|mult)?)|pa(des(uit)?|r)|e(swar|ct|tm(n|inus)|ar(hk|r(ow)?)|xt|mi|Arr)|q(su(p(set(eq)?|e)?|b(set(eq)?|e)?)|c(up(s)?|ap(s)?)|u(f|ar(e|f))?)|fr(own)?|w(nwar|ar(hk|r(ow)?)|Arr)|larr|acute|rarr|m(t(e(s)?)?|i(d|le)|eparsl|a(shp|llsetminus))|bquo)|S(scr|hort(RightArrow|DownArrow|UpArrow|LeftArrow)|c(y|irc|edil|aron)?|tar|igma|H(cy|CHcy)|opf|u(c(hThat|ceeds(SlantEqual|Tilde|Equal)?)|p(set|erset(Equal)?)?|m|b(set(Equal)?)?)|OFTcy|q(uare(Su(perset(Equal)?|bset(Equal)?)|Intersection|Union)?|rt)|fr|acute|mallCircle))\n\t\t\t\t\t\t  | (t(s(hcy|c(y|r)|trok)|h(i(nsp|ck(sim|approx))|orn|e(ta(sym|v)?|re(4|fore))|k(sim|ap))|c(y|edil|aron)|i(nt|lde|mes(d|b(ar)?)?)|o(sa|p(cir|f(ork)?|bot)?|ea)|dot|prime|elrec|fr|w(ixt|ohead(leftarrow|rightarrow))|a(u|rget)|r(i(sb|time|dot|plus|e|angle(down|q|left(eq)?|right(eq)?)?|minus)|pezium|ade)|brk)|T(s(cr|trok)|RADE|h(i(nSpace|ckSpace)|e(ta|refore))|c(y|edil|aron)|S(cy|Hcy)|ilde(Tilde|Equal|FullEqual)?|HORN|opf|fr|a(u|b)|ripleDot))\n\t\t\t\t\t\t  | (u(scr|h(ar(l|r)|blk)|c(y|irc)|t(ilde|dot|ri(f)?)|Har|o(pf|gon)|d(har|arr|blac)|u(arr|ml)|p(si(h|lon)?|harpoon(left|right)|downarrow|uparrows|lus|arrow)|f(isht|r)|wangle|l(c(orn(er)?|rop)|tri)|a(cute|rr)|r(c(orn(er)?|rop)|tri|ing)|grave|m(l|acr)|br(cy|eve)|Arr)|U(scr|n(ion(Plus)?|der(B(ar|rac(e|ket))|Parenthesis))|c(y|irc)|tilde|o(pf|gon)|dblac|uml|p(si(lon)?|downarrow|Tee(Arrow)?|per(RightArrow|LeftArrow)|DownArrow|Equilibrium|arrow|Arrow(Bar|DownArrow)?)|fr|a(cute|rr(ocir)?)|ring|grave|macr|br(cy|eve)))\n\t\t\t\t\t\t  | (v(s(cr|u(pn(e|E)|bn(e|E)))|nsu(p|b)|cy|Bar(v)?|zigzag|opf|dash|prop|e(e(eq|bar)?|llip|r(t|bar))|Dash|fr|ltri|a(ngrt|r(s(igma|u(psetneq(q)?|bsetneq(q)?))|nothing|t(heta|riangle(left|right))|p(hi|i|ropto)|epsilon|kappa|r(ho)?))|rtri|Arr)|V(scr|cy|opf|dash(l)?|e(e|r(yThinSpace|t(ical(Bar|Separator|Tilde|Line))?|bar))|Dash|vdash|fr|bar))\n\t\t\t\t\t\t  | (w(scr|circ|opf|p|e(ierp|d(ge(q)?|bar))|fr|r(eath)?)|W(scr|circ|opf|edge|fr))\n\t\t\t\t\t\t  | (X(scr|i|opf|fr)|x(s(cr|qcup)|h(arr|Arr)|nis|c(irc|up|ap)|i|o(time|dot|p(f|lus))|dtri|u(tri|plus)|vee|fr|wedge|l(arr|Arr)|r(arr|Arr)|map))\n\t\t\t\t\t\t  | (y(scr|c(y|irc)|icy|opf|u(cy|ml)|en|fr|ac(y|ute))|Y(scr|c(y|irc)|opf|uml|Icy|Ucy|fr|acute|Acy))\n\t\t\t\t\t\t  | (z(scr|hcy|c(y|aron)|igrarr|opf|dot|e(ta|etrf)|fr|w(nj|j)|acute)|Z(scr|c(y|aron)|Hcy|opf|dot|e(ta|roWidthSpace)|fr|acute))\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(;)\n\t\t\t\t\t",
				name: "constant.character.entity.named.$2.html"
			},
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"3": {
						name: "punctuation.definition.entity.html"
					}
				},
				match: "(&)#[0-9]+(;)",
				name: "constant.character.entity.numeric.decimal.html"
			},
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"3": {
						name: "punctuation.definition.entity.html"
					}
				},
				match: "(&)#[xX][0-9a-fA-F]+(;)",
				name: "constant.character.entity.numeric.hexadecimal.html"
			},
			{
				match: "&(?=[a-zA-Z0-9]+;)",
				name: "invalid.illegal.ambiguous-ampersand.html"
			}
		]
	},
	heading: {
		match: "(?:^|\\G)[ ]*(#{1,6}\\s+(.*?)(\\s+#{1,6})?\\s*)$",
		captures: {
			"1": {
				patterns: [
					{
						match: "(#{6})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.6.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{5})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.5.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{4})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.4.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{3})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.3.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{2})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.2.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{1})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.1.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					}
				]
			}
		},
		name: "markup.heading.markdown",
		patterns: [
			{
				include: "text.html.markdown#inline"
			}
		]
	},
	"heading-setext": {
		patterns: [
			{
				match: "^(={3,})(?=[ \\t]*$\\n?)",
				name: "markup.heading.setext.1.markdown"
			},
			{
				match: "^(-{3,})(?=[ \\t]*$\\n?)",
				name: "markup.heading.setext.2.markdown"
			}
		]
	},
	lists: {
		patterns: [
			{
				begin: "(^|\\G)([ ]*)([*+-])([ \\t])",
				beginCaptures: {
					"3": {
						name: "punctuation.definition.list.begin.markdown"
					}
				},
				comment: "Currently does not support un-indented second lines.",
				name: "markup.list.unnumbered.markdown",
				patterns: [
					{
						include: "#block"
					},
					{
						include: "text.html.markdown#list_paragraph"
					}
				],
				"while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
			},
			{
				begin: "(^|\\G)([ ]*)([0-9]+\\.)([ \\t])",
				beginCaptures: {
					"3": {
						name: "punctuation.definition.list.begin.markdown"
					}
				},
				name: "markup.list.numbered.markdown",
				patterns: [
					{
						include: "#block"
					},
					{
						include: "text.html.markdown#list_paragraph"
					}
				],
				"while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
			}
		]
	},
	paragraph: {
		begin: "(^|\\G)[ ]*(?=\\S)",
		name: "meta.paragraph.markdown",
		patterns: [
			{
				include: "#inline"
			},
			{
				include: "text.html.markdown#inline"
			},
			{
				include: "text.html.derivative"
			},
			{
				include: "#heading-setext"
			}
		],
		"while": "(^|\\G)((?=\\s*[-=]{3,}\\s*$)|[ ]{4,}(?=\\S))"
	},
	blockquote: {
		begin: "(^|\\G)[ ]*(>) ?",
		captures: {
			"2": {
				name: "punctuation.definition.quote.begin.markdown"
			}
		},
		name: "markup.quote.markdown",
		patterns: [
			{
				include: "#block"
			}
		],
		"while": "(^|\\G)\\s*(>) ?"
	}
};
const mdcTMLanguage = {
	information_for_contributors: information_for_contributors,
	version: version,
	name: name,
	injectionSelector: injectionSelector,
	scopeName: scopeName,
	patterns: patterns,
	repository: repository
};

const logger = consola.withScope("@nuxt/content");
const resolveLang = (lang) => BUNDLED_LANGUAGES.find((l) => l.id === lang || l.aliases?.includes(lang))?.id || lang;
const resolveTheme = (theme) => {
  if (!theme) {
    return;
  }
  if (typeof theme === "string") {
    theme = {
      default: theme
    };
  }
  return Object.entries(theme).reduce((acc, [key, value]) => {
    acc[key] = BUNDLED_THEMES.find((t) => t === value);
    return acc;
  }, {});
};
const useShikiHighlighter = createSingleton((opts) => {
  const { theme, preload } = opts || {};
  let promise;
  const getShikiHighlighter = () => {
    if (!promise) {
      promise = getHighlighter({
        theme: theme?.default || theme || "dark-plus",
        langs: [
          ...preload || [],
          "diff",
          "json",
          "js",
          "ts",
          "css",
          "shell",
          "html",
          "md",
          "yaml",
          "vue",
          {
            id: "md",
            scopeName: "text.markdown.mdc",
            path: "mdc.tmLanguage.json",
            aliases: ["markdown", "md", "mdc"],
            grammar: mdcTMLanguage
          }
        ]
      });
    }
    return promise;
  };
  const getHighlightedTokens = async (code, lang, theme2) => {
    const highlighter = await getShikiHighlighter();
    code = code.replace(/\n+$/, "");
    lang = resolveLang(lang || "");
    theme2 = resolveTheme(theme2 || "") || { default: highlighter.getTheme() };
    if (!lang) {
      return [[{ content: code }]];
    }
    if (!highlighter.getLoadedLanguages().includes(lang)) {
      let message = "Content Highlighter Error\n\n";
      message = message + `Language "${lang}" is not loaded Shiki. Falling back to plain code.

`;
      message = message + `Please make sure you add "${lang}" to the 'preload' list in your Nuxt config.

`;
      message = message + "See: https://content.nuxtjs.org/api/configuration#highlight";
      logger.warn(message);
      return [[{ content: code }]];
    }
    await Promise.all(
      Object.values(theme2).map(async (theme3) => {
        if (!highlighter.getLoadedThemes().includes(theme3)) {
          await highlighter.loadTheme(theme3);
        }
      })
    );
    const coloredTokens = Object.entries(theme2).map(([key, theme3]) => {
      const tokens = highlighter.codeToThemedTokens(code, lang, theme3);
      return {
        key,
        theme: theme3,
        tokens
      };
    });
    const highlightedCode = [];
    for (const line in coloredTokens[0].tokens) {
      highlightedCode[line] = coloredTokens.reduce((acc, color) => {
        return mergeLines({
          key: coloredTokens[0].key,
          tokens: acc
        }, {
          key: color.key,
          tokens: color.tokens[line]
        });
      }, coloredTokens[0].tokens[line]);
    }
    return highlightedCode;
  };
  const getHighlightedAST = async (code, lang, theme2, opts2) => {
    const lines = await getHighlightedTokens(code, lang, theme2);
    const { highlights = [], colorMap = {} } = opts2 || {};
    return lines.map((line, lineIndex) => ({
      type: "element",
      tag: "span",
      props: { class: ["line", highlights.includes(lineIndex + 1) ? "highlight" : ""].join(" ").trim() },
      children: line.map(tokenSpan)
    }));
    function getColorProps(token) {
      if (!token.color) {
        return {};
      }
      if (typeof token.color === "string") {
        return { style: { color: token.color } };
      }
      const key = Object.values(token.color).join("");
      if (!colorMap[key]) {
        colorMap[key] = {
          colors: token.color,
          className: "ct-" + Math.random().toString(16).substring(2, 8)
        };
      }
      return { class: colorMap[key].className };
    }
    function tokenSpan(token) {
      return {
        type: "element",
        tag: "span",
        props: getColorProps(token),
        children: [{ type: "text", value: token.content }]
      };
    }
  };
  const getHighlightedCode = async (code, lang, theme2, opts2) => {
    const colorMap = opts2?.colorMap || {};
    const highlights = opts2?.highlights || [];
    const ast = await getHighlightedAST(code, lang, theme2, { colorMap, highlights });
    function renderNode(node) {
      if (node.type === "text") {
        return node.value;
      }
      const children = node.children.map(renderNode).join("");
      return `<${node.tag} class="${node.props.class}">${children}</${node.tag}>`;
    }
    return {
      code: ast.map(renderNode).join(""),
      styles: generateStyles(colorMap)
    };
  };
  const generateStyles = (colorMap) => {
    const colors = [];
    for (const colorClass of Object.values(colorMap)) {
      Object.entries(colorClass.colors).forEach(([variant, color]) => {
        if (variant === "default") {
          colors.unshift(`.${colorClass.className}{color:${color}}`);
        } else {
          colors.push(`.${variant} .${colorClass.className}{color:${color}}`);
        }
      });
    }
    return colors.join("\n");
  };
  return {
    getHighlightedTokens,
    getHighlightedAST,
    getHighlightedCode,
    generateStyles
  };
});
function mergeLines(line1, line2) {
  const mergedTokens = [];
  const getColors = (h, i) => typeof h.tokens[i].color === "string" ? { [h.key]: h.tokens[i].color } : h.tokens[i].color;
  const right = {
    key: line1.key,
    tokens: line1.tokens.slice()
  };
  const left = {
    key: line2.key,
    tokens: line2.tokens.slice()
  };
  let index = 0;
  while (index < right.tokens.length) {
    const rightToken = right.tokens[index];
    const leftToken = left.tokens[index];
    if (rightToken.content === leftToken.content) {
      mergedTokens.push({
        content: rightToken.content,
        color: {
          ...getColors(right, index),
          ...getColors(left, index)
        }
      });
      index += 1;
      continue;
    }
    if (rightToken.content.startsWith(leftToken.content)) {
      const nextRightToken = {
        ...rightToken,
        content: rightToken.content.slice(leftToken.content.length)
      };
      rightToken.content = leftToken.content;
      right.tokens.splice(index + 1, 0, nextRightToken);
      continue;
    }
    if (leftToken.content.startsWith(rightToken.content)) {
      const nextLeftToken = {
        ...leftToken,
        content: leftToken.content.slice(rightToken.content.length)
      };
      leftToken.content = rightToken.content;
      left.tokens.splice(index + 1, 0, nextLeftToken);
      continue;
    }
    throw new Error("Unexpected token");
  }
  return mergedTokens;
}

const shiki = defineTransformer({
  name: "highlight",
  extensions: [".md"],
  transform: async (content, options = {}) => {
    const shikiHighlighter = useShikiHighlighter(options);
    const colorMap = {};
    const codeBlocks = [];
    const inlineCodes = [];
    visit(
      content.body,
      (node) => node.tag === "code" && node?.props.code || node.tag === "code-inline" && (node.props?.lang || node.props?.language),
      (node) => {
        if (node.tag === "code") {
          codeBlocks.push(node);
        } else if (node.tag === "code-inline") {
          inlineCodes.push(node);
        }
      }
    );
    await Promise.all(codeBlocks.map(highlightBlock));
    await Promise.all(inlineCodes.map(highlightInline));
    if (Object.values(colorMap).length) {
      content.body.children.push({
        type: "element",
        tag: "style",
        children: [{ type: "text", value: shikiHighlighter.generateStyles(colorMap) }]
      });
    }
    return content;
    async function highlightInline(node) {
      const code = node.children[0].value;
      const lines = await shikiHighlighter.getHighlightedAST(code, node.props.lang || node.props.language, options.theme, { colorMap });
      node.children = lines[0].children;
      node.props = Object.assign(node.props || {}, { class: "colored" });
      return node;
    }
    async function highlightBlock(node) {
      const { code, language: lang, highlights = [] } = node.props;
      const innerCodeNode = node.children[0].children[0];
      innerCodeNode.children = await shikiHighlighter.getHighlightedAST(code, lang, options.theme, { colorMap, highlights });
      return node;
    }
  }
});

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    } else {
      parsed = content;
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  shiki,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)];
    if (transformOptions === false) {
      return next;
    }
    return cur.transform(next, transformOptions || {});
  }, Promise.resolve(parsed));
  return result;
}

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  const defaultLocale = useRuntimeConfig().content.defaultLocale;
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await getContentsList(event);
    contentIndex = data.reduce((acc, item) => {
      acc[item._path] = acc[item._path] || [];
      if (item._locale === defaultLocale) {
        acc[item._path].unshift(item._id);
      } else {
        acc[item._path].push(item._id);
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).flatMap((key) => index[key]);
    const contents = await Promise.all(keys.map((key) => getContent(event, key)));
    return contents;
  }
  return getContentsList(event);
}

const transformers = [];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map(
  (p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p
);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || contentIgnores.some((prefix) => prefix.test(key))) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
const getContentsList = async (event, prefix) => {
  const keys = await getContentsIds(event, prefix);
  const contents = await Promise.all(keys.map((key) => getContent(event, key)));
  return contents;
};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const hash$1 = hash({
    meta,
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  const body = await sourceStorage.getItem(id);
  if (body === null) {
    return { _id: contentId, body: null };
  }
  const parsed = await parseContent(contentId, body);
  await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
  });
  return parsed;
};
async function parseContent(id, content, opts = {}) {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: contentConfig.markdown,
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      highlight: contentConfig.highlight,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales
      }
    }
  );
  const file = { _id: id, body: content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
}
const createServerQueryFetch = (event, path) => (query) => {
  if (path) {
    if (query.params().first) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!query.params().sort?.length) {
    query.sort({ _file: 1, $numeric: true });
  }
  if (contentConfig.locales.length) {
    const queryLocale = query.params().where?.find((w) => w._locale)?._locale;
    if (!queryLocale) {
      query.locale(contentConfig.defaultLocale);
    }
  }
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, path, ...pathParts) {
  if (typeof path === "string") {
    path = withLeadingSlash(joinURL(path, ...pathParts));
    return createQuery(createServerQueryFetch(event, path));
  }
  return createQuery(createServerQueryFetch(event), path || {});
}

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseJSONQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError({ statusCode: 400, message: "Invalid _params query" });
  }
};
const decodeQuryParams = (encoded) => {
  encoded = encoded.replace(/\//g, "");
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
  encoded = encoded.padEnd(encoded.length + (4 - encoded.length % 4) % 4, "=");
  return parseJSONQueryParams(typeof Buffer !== "undefined" ? Buffer.from(encoded, "base64").toString() : atob(encoded));
};
const memory = {};
const getContentQuery = (event) => {
  const { params } = event.context.params || {};
  if (params) {
    return decodeQuryParams(params.replace(/.json$/, ""));
  }
  const qid = event.context.params.qid?.replace(/.json$/, "");
  const query = getQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseJSONQueryParams(query._params);
    if (memory[qid].where && !Array.isArray(memory[qid].where)) {
      memory[qid].where = [memory[qid].where];
    }
    return memory[qid];
  }
  if (memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseJSONQueryParams(query._params);
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (query.sort) {
    query.sort = String(query.sort).split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where = query.where || {};
    query.where[key] = query[key];
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  return query;
};

const _ufkC6A = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (query.first) {
    const content = await serverQueryContent(event, query).findOne();
    const path = content?._path || query.where?.find((w) => w._path)?._path;
    if (path) {
      const _dir = await serverQueryContent(event).where({ _path: join(path, "_dir") }).without("_").findOne();
      if (_dir && !Array.isArray(_dir)) {
        return {
          _path: path,
          ...content || {},
          _dir
        };
      }
    }
    if (!content) {
      throw createError({
        statusMessage: "Document not found!",
        statusCode: 404,
        data: {
          description: "Could not find document for the given query.",
          query
        }
      });
    }
    return content;
  }
  const contents = await serverQueryContent(event, query).find();
  return contents;
});

const _WFSShX = defineEventHandler(async (event) => {
  const { content } = useRuntimeConfig();
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch(`${content.api.baseURL}/navigation`);
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents,
    navigation
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _b5dSgl = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    _partial: false,
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    if (conf.title?.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
});

const _lazy_NIkbcJ = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_NIkbcJ, lazy: true, middleware: false, method: undefined },
  { route: '/__studio.json', handler: _QTHqYa, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta', handler: _AhZtah, lazy: false, middleware: false, method: "get" },
  { route: '/api/component-meta/:component?', handler: _AhZtah, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid/**:params', handler: _ufkC6A, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid', handler: _ufkC6A, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _ufkC6A, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.1673718910241.json', handler: _WFSShX, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid/**:params', handler: _b5dSgl, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _b5dSgl, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _b5dSgl, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_NIkbcJ, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
