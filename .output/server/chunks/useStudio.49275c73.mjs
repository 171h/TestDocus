import { p as useNuxtApp, o as useRuntimeConfig, k as useState, B as useCookie, C as callWithNuxt, i as useAppConfig } from './server.mjs';
import { createApp } from 'vue';
import { r as refreshNuxtData } from './asyncData.cb84d807.mjs';
import ContentPreviewMode from './ContentPreviewMode.82663105.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'ohash';
import 'cookie-es';
import 'nanoid';
import 'scule';
import 'defu';
import 'vue/server-renderer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';

const mergeDraft = (dbFiles = [], draftAdditions, draftDeletions) => {
  const additions = [...draftAdditions || []];
  const deletions = [...draftDeletions || []];
  const mergedFiles = JSON.parse(JSON.stringify(dbFiles));
  for (const addition of additions) {
    if (addition.oldPath) {
      deletions.splice(deletions.findIndex((d) => d.path === addition.oldPath), 1);
      const oldPathExistInCache = additions.find((a) => a.path === addition.oldPath);
      if (oldPathExistInCache) {
        mergedFiles.push({ path: addition.path, parsed: addition.parsed });
      } else {
        const file = mergedFiles.find((f) => f.path === addition.oldPath);
        if (file) {
          file.path = addition.path;
          if (addition.parsed) {
            file.parsed = addition.parsed;
          } else if (addition.pathMeta) {
            ["_file", "_path", "_id", "_locale"].forEach((key) => {
              file.parsed[key] = addition.pathMeta[key];
            });
          }
        }
      }
    } else if (addition.new) {
      mergedFiles.push({ path: addition.path, parsed: addition.parsed });
    } else {
      const file = mergedFiles.find((f) => f.path === addition.path);
      if (file) {
        Object.assign(file, { path: addition.path, parsed: addition.parsed });
      }
    }
  }
  for (const deletion of deletions) {
    mergedFiles.splice(mergedFiles.findIndex((f) => f.path === deletion.path), 1);
  }
  const comperable = new Intl.Collator(void 0, { numeric: true });
  mergedFiles.sort((a, b) => comperable.compare(a.path, b.path));
  return mergedFiles;
};
const StudioConfigRoot = ".studio";
const StudioConfigFiles = {
  appConfig: `${StudioConfigRoot}/app.config.json`,
  tokensConfig: `${StudioConfigRoot}/tokens.config.json`
};
const createSingleton = (fn) => {
  let instance;
  return (...args) => {
    if (!instance) {
      instance = fn();
    }
    return instance;
  };
};
function deepDelete(obj, newObj) {
  for (const key in obj) {
    const val = newObj[key];
    if (!(key in newObj)) {
      delete obj[key];
    }
    if (val !== null && typeof val === "object") {
      deepDelete(obj[key], newObj[key]);
    }
  }
}
function deepAssign(obj, newObj) {
  for (const key in newObj) {
    const val = newObj[key];
    if (val !== null && typeof val === "object") {
      obj[key] = obj[key] || {};
      deepAssign(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
}
const useDefaultAppConfig = createSingleton(() => JSON.parse(JSON.stringify(useAppConfig())));
const useStudio = () => {
  const nuxtApp = useNuxtApp();
  const runtimeConfig = useRuntimeConfig().public.studio || {};
  const initialAppConfig = useDefaultAppConfig();
  let initialTokensConfig;
  const storage = useState("studio-client-db", () => null);
  const dbFiles = useState("studio-preview-db-files", () => []);
  nuxtApp.hook("content:storage", (_storage) => {
    storage.value = _storage;
  });
  const syncPreviewFiles = async (contentStorage, files, ignoreBuiltContents = true) => {
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    const keys = await contentStorage.getKeys(`${previewToken.value}:`);
    await Promise.all(keys.map((key) => contentStorage.removeItem(key)));
    await contentStorage.setItem(`${previewToken.value}$`, JSON.stringify({ ignoreBuiltContents }));
    await Promise.all(
      files.map((item) => {
        var _a;
        return contentStorage.setItem(`${previewToken.value}:${(_a = item.parsed) == null ? void 0 : _a._id}`, JSON.stringify(item.parsed));
      })
    );
  };
  const syncPreviewAppConfig = (appConfig) => {
    const _appConfig = callWithNuxt(nuxtApp, useAppConfig);
    deepAssign(_appConfig, appConfig || initialAppConfig);
    if (!appConfig) {
      deepDelete(_appConfig, initialAppConfig);
    }
  };
  const syncPreviewTokensConfig = (tokensConfig) => {
    var _a, _b, _c, _d;
    const themeSheet = (_d = (_c = (_b = (_a = nuxtApp == null ? void 0 : nuxtApp.vueApp) == null ? void 0 : _a._context) == null ? void 0 : _b.config) == null ? void 0 : _c.globalProperties) == null ? void 0 : _d.$pinceauTheme;
    if (!themeSheet || !(themeSheet == null ? void 0 : themeSheet.updateTheme)) {
      return;
    }
    if (!initialTokensConfig) {
      initialTokensConfig = JSON.parse(JSON.stringify((themeSheet == null ? void 0 : themeSheet.theme.value) || {}));
    }
    callWithNuxt(nuxtApp, themeSheet.updateTheme, [tokensConfig || initialTokensConfig]);
  };
  const syncPreview = async (data) => {
    dbFiles.value = data.files = data.files || dbFiles.value || [];
    if (!storage.value) {
      return false;
    }
    const mergedFiles = mergeDraft(data.files, data.additions, data.deletions);
    const contentFiles = mergedFiles.filter((item) => !item.path.startsWith(StudioConfigRoot));
    await syncPreviewFiles(storage.value, contentFiles, (data.files || []).length !== 0);
    const appConfig = mergedFiles.find((item) => item.path === StudioConfigFiles.appConfig);
    syncPreviewAppConfig(appConfig == null ? void 0 : appConfig.parsed);
    const tokensConfig = mergedFiles.find((item) => item.path === StudioConfigFiles.tokensConfig);
    syncPreviewTokensConfig(tokensConfig == null ? void 0 : tokensConfig.parsed);
    requestRerender();
    return true;
  };
  const requestPreviewSynchronization = async () => {
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    await $fetch("api/projects/preview/sync", {
      baseURL: runtimeConfig.apiURL,
      method: "POST",
      params: {
        token: previewToken.value
      }
    });
  };
  const mountPreviewUI = () => {
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    const el = document.createElement("div");
    el.id = "__nuxt_preview_wrapper";
    document.body.appendChild(el);
    createApp(ContentPreviewMode, {
      previewToken,
      apiURL: runtimeConfig.apiURL,
      syncPreview,
      requestPreviewSyncAPI: requestPreviewSynchronization
    }).mount(el);
  };
  const findContentWithId = async (path) => {
    var _a, _b;
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    if (!path) {
      return null;
    }
    path = path.replace(/\/$/, "");
    let content = await ((_a = storage.value) == null ? void 0 : _a.getItem(`${previewToken.value}:${path}`));
    if (!content) {
      content = await ((_b = storage.value) == null ? void 0 : _b.getItem(path));
    }
    return content;
  };
  const updateContent = (content) => {
    var _a;
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    if (!storage.value) {
      return;
    }
    storage.value.setItem(`${previewToken.value}:${(_a = content.parsed) == null ? void 0 : _a._id}`, JSON.stringify(content.parsed));
  };
  const removeContentWithId = async (path) => {
    var _a;
    const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
    await ((_a = storage.value) == null ? void 0 : _a.removeItem(`${previewToken.value}:${path}`));
  };
  const requestRerender = () => {
    callWithNuxt(nuxtApp, refreshNuxtData);
  };
  return {
    apiURL: runtimeConfig.apiURL,
    contentStorage: storage,
    syncPreviewFiles,
    syncPreviewAppConfig,
    syncPreviewTokensConfig,
    requestPreviewSynchronization,
    mountPreviewUI,
    findContentWithId,
    updateContent,
    removeContentWithId,
    requestRerender
  };
};

export { useStudio };
//# sourceMappingURL=useStudio.49275c73.mjs.map
