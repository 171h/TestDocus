import { getCurrentInstance, ref, onServerPrefetch, toRef, isRef, inject, reactive, defineAsyncComponent, version, computed, useSSRContext, defineComponent, createElementBlock, unref, watch, h, Suspense, nextTick, Transition, provide, resolveComponent, shallowRef, mergeProps, createVNode, resolveDynamicComponent, withCtx, renderSlot, withAsyncContext, openBlock, createBlock, createCommentVNode, toDisplayString, createElementVNode, createTextVNode, Fragment as Fragment$1, renderList, createApp, onErrorCaptured, onScopeDispose } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { withLeadingSlash, joinURL, withoutTrailingSlash, hasProtocol, isEqual as isEqual$1, withBase, parseURL } from 'ufo';
import { createError as createError$1, appendHeader, sendRedirect } from 'h3';
import { useHead as useHead$1, createHead as createHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { hash, isEqual } from 'ohash';
import { parse, serialize } from 'cookie-es';
import fs from 'node:fs';
import { join } from 'pathe';
import { nanoid } from 'nanoid';
import { kebabCase } from 'scule';
import { defu } from 'defu';
import { ssrRenderAttrs, ssrRenderVNode, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderTeleport, ssrRenderAttr, ssrRenderSuspense } from 'vue/server-renderer';
import { Icon as Icon$1 } from '@iconify/vue/dist/offline';
import { loadIcon } from '@iconify/vue';
import { a as useRuntimeConfig$1 } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:url';
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
import 'html-tags';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';

var _a, _b, _c, _d;
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin2, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin2 of plugins2) {
    await applyPlugin(nuxtApp, plugin2);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin2) => {
    if (typeof plugin2 !== "function") {
      return null;
    }
    if (plugin2.length > 1) {
      return (nuxtApp) => plugin2(nuxtApp, nuxtApp.provide);
    }
    return plugin2;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin2) {
  plugin2[NuxtPluginIndicator] = true;
  return plugin2;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const getDefault = () => null;
function useAsyncData(...args) {
  var _a2, _b2, _c2, _d2, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.lazy = (_c2 = options.lazy) != null ? _c2 : false;
  options.immediate = (_d2 = options.immediate) != null ? _d2 : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_g = (_f = getCachedData()) != null ? _f : (_e = options.default) == null ? void 0 : _e.call(options)) != null ? _g : null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3, _b3;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_b3 = (_a3 = options.default) == null ? void 0 : _a3.call(options)) != null ? _b3 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  if (options.global || typeof name === "function") {
    nuxtApp._middleware.global.push(typeof name === "function" ? name : middleware);
  } else {
    nuxtApp._middleware.named[name] = middleware;
  }
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2, _b2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b2 = cookies[name]) != null ? _b2 : (_a2 = opts.default) == null ? void 0 : _a2.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a2;
  {
    return parse(((_a2 = useRequestEvent()) == null ? void 0 : _a2.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName2 = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName2,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c2;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c2 = slots.default) == null ? void 0 : _c2.call(slots));
      };
    }
  });
}
const __nuxt_component_0$5 = defineNuxtLink({ componentName: "NuxtLink" });
const nuxtLink = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineNuxtLink,
  default: __nuxt_component_0$5
}, Symbol.toStringTag, { value: "Module" }));
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue, _namespace) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const cfg0 = defineAppConfig({
  docus: {
    title: "Docus",
    description: "My Docus Project",
    url: "http://biaozhun.online",
    image: "/social-card-preview.png",
    socials: {
      twitter: "@docus_",
      github: "nuxtlabs/docus"
    },
    github: {
      root: "content",
      edit: true,
      contributors: false
    },
    layout: {
      fluid: false
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: ["/program/learngit", "/program/learnnode.js"]
    },
    header: {
      title: "Test header.title",
      logo: true,
      showLinkIcon: true,
      exclude: []
    },
    footer: {
      credits: {
        text: "Powered by 171H",
        href: "https://github.com/weiyidechicheng"
      },
      textLinks: [
        {
          text: "Test textlinks weibo",
          href: "https://weibo.com/u/2361655911"
        }
      ],
      iconLinks: [
        {
          label: "Weibo",
          href: "https://weibo.com/u/2361655911",
          icon: "ri:weibo-fill"
        }
      ]
    }
  }
});
const cfg1 = defineAppConfig({
  prose: {
    copyButton: {
      iconCopy: "ph:copy",
      iconCopied: "ph:check"
    },
    headings: {
      icon: "ph:link"
    }
  }
});
const cfg2 = defineAppConfig({});
const inlineConfig = {};
const __appConfig = defuFn(cfg0, cfg1, cfg2, inlineConfig);
function deepAssign(obj, newObj) {
  for (const key in newObj) {
    const val = newObj[key];
    if (val !== null && typeof val === "object") {
      deepAssign(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
}
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
function updateAppConfig(appConfig2) {
  const _appConfig = useAppConfig();
  deepAssign(_appConfig, appConfig2);
}
const components = {
  AppFooter: defineAsyncComponent(() => Promise.resolve().then(() => AppFooter).then((c) => c.default || c)),
  AppHeader: defineAsyncComponent(() => Promise.resolve().then(() => AppHeader).then((c) => c.default || c)),
  AppHeaderDialog: defineAsyncComponent(() => Promise.resolve().then(() => AppHeaderDialog).then((c) => c.default || c)),
  AppHeaderLogo: defineAsyncComponent(() => Promise.resolve().then(() => AppHeaderLogo).then((c) => c.default || c)),
  AppHeaderNavigation: defineAsyncComponent(() => Promise.resolve().then(() => AppHeaderNavigation).then((c) => c.default || c)),
  AppLayout: defineAsyncComponent(() => Promise.resolve().then(() => AppLayout).then((c) => c.default || c)),
  AppLoadingBar: defineAsyncComponent(() => Promise.resolve().then(() => AppLoadingBar).then((c) => c.default || c)),
  AppSearch: defineAsyncComponent(() => Promise.resolve().then(() => AppSearch).then((c) => c.default || c)),
  AppSocialIcons: defineAsyncComponent(() => Promise.resolve().then(() => AppSocialIcons).then((c) => c.default || c)),
  DocumentDrivenNotFound: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/document-driven-not-found" */
    './DocumentDrivenNotFound.71af563a.mjs'
  ).then((c) => c.default || c)),
  ThemeSelect: defineAsyncComponent(() => Promise.resolve().then(() => ThemeSelect).then((c) => c.default || c)),
  DocsAside: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-aside" */
    './DocsAside.bba59540.mjs'
  ).then((c) => c.default || c)),
  DocsAsideTree: defineAsyncComponent(() => Promise.resolve().then(() => DocsAsideTree).then((c) => c.default || c)),
  DocsPageBottom: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-page-bottom" */
    './DocsPageBottom.611f3a8e.mjs'
  ).then((c) => c.default || c)),
  DocsPageLayout: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-page-layout" */
    './DocsPageLayout.1a67a497.mjs'
  ).then((c) => c.default || c)),
  DocsPrevNext: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-prev-next" */
    './DocsPrevNext.32274920.mjs'
  ).then((c) => c.default || c)),
  DocsToc: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-toc" */
    './DocsToc.ac4f38bc.mjs'
  ).then((c) => c.default || c)),
  DocsTocLinks: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/docs-toc-links" */
    './DocsTocLinks.68a3ca32.mjs'
  ).then((c) => c.default || c)),
  EditOnLink: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/edit-on-link" */
    './EditOnLink.05f50931.mjs'
  ).then((c) => c.default || c)),
  ProseA: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-a" */
    './ProseA.9a0f1ac2.mjs'
  ).then((c) => c.default || c)),
  ProseBlockquote: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-blockquote" */
    './ProseBlockquote.ccc4e7f9.mjs'
  ).then((c) => c.default || c)),
  ProseCode: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-code" */
    './ProseCode.355dde17.mjs'
  ).then((n) => n.a).then((c) => c.default || c)),
  ProseCodeInline: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-code-inline" */
    './ProseCodeInline.c5c395f1.mjs'
  ).then((c) => c.default || c)),
  ProseEm: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-em" */
    './ProseEm.7e5e2b64.mjs'
  ).then((c) => c.default || c)),
  ProseH1: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h1" */
    './ProseH1.3518aaaf.mjs'
  ).then((c) => c.default || c)),
  ProseH2: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h2" */
    './ProseH2.3ba4663e.mjs'
  ).then((c) => c.default || c)),
  ProseH3: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h3" */
    './ProseH3.39ff0ebb.mjs'
  ).then((c) => c.default || c)),
  ProseH4: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h4" */
    './ProseH4.53766126.mjs'
  ).then((c) => c.default || c)),
  ProseH5: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h5" */
    './ProseH5.6a392a30.mjs'
  ).then((c) => c.default || c)),
  ProseH6: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-h6" */
    './ProseH6.6d79cf92.mjs'
  ).then((c) => c.default || c)),
  ProseHr: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-hr" */
    './ProseHr.e8aa90f7.mjs'
  ).then((c) => c.default || c)),
  ProseImg: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-img" */
    './ProseImg.72e926df.mjs'
  ).then((c) => c.default || c)),
  ProseLi: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-li" */
    './ProseLi.c3ef04ed.mjs'
  ).then((c) => c.default || c)),
  ProseOl: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-ol" */
    './ProseOl.84af1315.mjs'
  ).then((c) => c.default || c)),
  ProseP: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-p" */
    './ProseP.8c46058e.mjs'
  ).then((c) => c.default || c)),
  ProseStrong: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-strong" */
    './ProseStrong.335a3a3a.mjs'
  ).then((c) => c.default || c)),
  ProseTable: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-table" */
    './ProseTable.bfa0c54c.mjs'
  ).then((c) => c.default || c)),
  ProseTbody: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-tbody" */
    './ProseTbody.d04d4f1d.mjs'
  ).then((c) => c.default || c)),
  ProseTd: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-td" */
    './ProseTd.bd041569.mjs'
  ).then((c) => c.default || c)),
  ProseTh: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-th" */
    './ProseTh.03c39ab4.mjs'
  ).then((c) => c.default || c)),
  ProseThead: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-thead" */
    './ProseThead.c04c0296.mjs'
  ).then((c) => c.default || c)),
  ProseTr: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-tr" */
    './ProseTr.33b3e1b3.mjs'
  ).then((c) => c.default || c)),
  ProseUl: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/prose-ul" */
    './ProseUl.0fe999f5.mjs'
  ).then((c) => c.default || c)),
  Alert: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/alert" */
    './Alert.6d66466e.mjs'
  ).then((c) => c.default || c)),
  Badge: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/badge" */
    './Badge.d135f4e4.mjs'
  ).then((c) => c.default || c)),
  ButtonLink: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/button-link" */
    './ButtonLink.bec9878a.mjs'
  ).then((c) => c.default || c)),
  Callout: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/callout" */
    './Callout.54d6a266.mjs'
  ).then((c) => c.default || c)),
  CodeBlock: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/code-block" */
    './CodeBlock.09d12af1.mjs'
  ).then((c) => c.default || c)),
  CodeGroup: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/code-group" */
    './CodeGroup.91e9ea6a.mjs'
  ).then((c) => c.default || c)),
  Container: defineAsyncComponent(() => Promise.resolve().then(() => Container).then((c) => c.default || c)),
  CopyButton: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/copy-button" */
    './CopyButton.c89d2141.mjs'
  ).then((c) => c.default || c)),
  Ellipsis: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/ellipsis" */
    './Ellipsis.f42ca8e6.mjs'
  ).then((c) => c.default || c)),
  List: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/list" */
    './List.71fae228.mjs'
  ).then((c) => c.default || c)),
  NuxtImg: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/nuxt-img" */
    './NuxtImg.3a48767a.mjs'
  ).then((c) => c.default || c)),
  Props: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/props" */
    './Props.a385f41b.mjs'
  ).then((c) => c.default || c)),
  Sandbox: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/sandbox" */
    './Sandbox.172b644f.mjs'
  ).then((c) => c.default || c)),
  SourceLink: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/source-link" */
    './SourceLink.a7724c52.mjs'
  ).then((c) => c.default || c)),
  TabsHeader: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/tabs-header" */
    './TabsHeader.22e08c37.mjs'
  ).then((c) => c.default || c)),
  Terminal: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/terminal" */
    './Terminal.100beac5.mjs'
  ).then((c) => c.default || c)),
  VideoPlayer: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/video-player" */
    './VideoPlayer.fecaf7c5.mjs'
  ).then((c) => c.default || c)),
  IconCodeSandBox: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-code-sand-box" */
    './IconCodeSandBox.5a781914.mjs'
  ).then((c) => c.default || c)),
  IconDocus: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-docus" */
    './IconDocus.27791b6b.mjs'
  ).then((c) => c.default || c)),
  IconNuxt: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-nuxt" */
    './IconNuxt.172621ac.mjs'
  ).then((c) => c.default || c)),
  IconNuxtContent: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-nuxt-content" */
    './IconNuxtContent.fa050961.mjs'
  ).then((c) => c.default || c)),
  IconNuxtLabs: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-nuxt-labs" */
    './IconNuxtLabs.29c11bd5.mjs'
  ).then((c) => c.default || c)),
  IconNuxtStudio: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-nuxt-studio" */
    './IconNuxtStudio.f06c1f19.mjs'
  ).then((c) => c.default || c)),
  IconStackBlitz: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-stack-blitz" */
    './IconStackBlitz.112c135a.mjs'
  ).then((c) => c.default || c)),
  IconVueTelescope: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/icon-vue-telescope" */
    './IconVueTelescope.18ef6644.mjs'
  ).then((c) => c.default || c)),
  BlockHero: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/block-hero" */
    './BlockHero.e8b55ed7.mjs'
  ).then((c) => c.default || c)),
  Card: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/card" */
    './Card.34dfc739.mjs'
  ).then((c) => c.default || c)),
  CardGrid: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/card-grid" */
    './CardGrid.626ff56a.mjs'
  ).then((c) => c.default || c)),
  VoltaBoard: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/volta-board" */
    './VoltaBoard.9d839b8d.mjs'
  ).then((c) => c.default || c)),
  ComponentPlayground: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/component-playground" */
    './ComponentPlayground.6d949e5c.mjs'
  ).then((c) => c.default || c)),
  ComponentPlaygroundData: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/component-playground-data" */
    './ComponentPlaygroundData.5e78e5ce.mjs'
  ).then((c) => c.default || c)),
  ComponentPlaygroundProps: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/component-playground-props" */
    './ComponentPlaygroundProps.e2a6a1c4.mjs'
  ).then((c) => c.default || c)),
  ComponentPlaygroundSlots: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/component-playground-slots" */
    './ComponentPlaygroundSlots.660e5428.mjs'
  ).then((c) => c.default || c)),
  ComponentPlaygroundTokens: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/component-playground-tokens" */
    './ComponentPlaygroundTokens.61d5d3e8.mjs'
  ).then((c) => c.default || c)),
  TokensPlayground: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/tokens-playground" */
    './TokensPlayground.916adb52.mjs'
  ).then((c) => c.default || c)),
  ContentDoc: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-doc" */
    './ContentDoc.50d72d75.mjs'
  ).then((c) => c.default || c)),
  ContentList: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-list" */
    './ContentList.cf52178b.mjs'
  ).then((c) => c.default || c)),
  ContentNavigation: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-navigation" */
    './ContentNavigation.02479f46.mjs'
  ).then((c) => c.default || c)),
  ContentQuery: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-query" */
    './ContentQuery.66bfb719.mjs'
  ).then((c) => c.default || c)),
  ContentRenderer: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-renderer" */
    './ContentRenderer.332d2548.mjs'
  ).then((c) => c.default || c)),
  ContentRendererMarkdown: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-renderer-markdown" */
    './ContentRendererMarkdown.962a843d.mjs'
  ).then((c) => c.default || c)),
  ContentSlot: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/content-slot" */
    './ContentSlot.9840f63c.mjs'
  ).then((c) => c.default || c)),
  DocumentDrivenEmpty: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/document-driven-empty" */
    './DocumentDrivenEmpty.b1426f16.mjs'
  ).then((c) => c.default || c)),
  Markdown: defineAsyncComponent(() => import(
    /* webpackChunkName: "components/markdown" */
    './Markdown.b38cf60d.mjs'
  ).then((c) => c.default || c)),
  Icon: defineAsyncComponent(() => Promise.resolve().then(() => Icon).then((c) => c.default || c))
};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin2) {
      unhead.use(plugin2);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead$1(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead$1;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const { renderSSRHead } = await import('@unhead/ssr');
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const __nuxt_page_meta$1 = {};
const __nuxt_page_meta = {};
const _routes = [
  {
    name: (_a = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) != null ? _a : "slug",
    path: (_b = __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) != null ? _b : "/:slug(.*)*",
    file: "D:/Python/Project/TestDocus/node_modules/@nuxt/content/dist/runtime/pages/document-driven.vue",
    children: [],
    meta: __nuxt_page_meta$1,
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect) || void 0,
    component: () => import('./document-driven.84bed97e.mjs').then((m) => m.default || m)
  },
  {
    name: (_c = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _c : "__app_config.json",
    path: (_d = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _d : "/__app_config.json",
    file: "D:/Python/Project/TestDocus/node_modules/@nuxthq/studio/dist/runtime/pages/empty",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./empty.0cebcfcc.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, _form, savedPosition) {
    if (history.state.stop) {
      return;
    }
    if (history.state.smooth) {
      return {
        el: history.state.smooth,
        behavior: "smooth"
      };
    }
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (!el) {
        return;
      }
      const { marginTop } = getComputedStyle(el);
      const marginTopValue = parseInt(marginTop);
      const offset = document.querySelector(to.hash).offsetTop - marginTopValue;
      return {
        top: offset,
        behavior: "smooth"
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
};
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => {
      var _a2;
      return !!((_a2 = route.meta.pageTransition) != null ? _a2 : appPageTransition);
    };
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions1,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c2, _d2;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history2 = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d2 = (_c2 = routerOptions.routes) == null ? void 0 : _c2.call(routerOptions, _routes)) != null ? _d2 : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history: history2,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c3, _d3;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d3 = (_c3 = from.matched[0]) == null ? void 0 : _c3.components) == null ? void 0 : _d3.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual$1(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const get$1 = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
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
      const values = [get$1(a, key), get$1(b, key)].map((value) => {
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
function jsonStringify(value) {
  return JSON.stringify(value, regExpReplacer);
}
function regExpReplacer(_key, value) {
  if (value instanceof RegExp) {
    return `--REGEX ${value.toString()}`;
  }
  return value;
}
const encodeQueryParams = (params) => {
  let encoded = jsonStringify(params);
  encoded = typeof Buffer !== "undefined" ? Buffer.from(encoded).toString("base64") : btoa(encoded);
  encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const chunks = encoded.match(/.{1,100}/g) || [];
  return chunks.join("/");
};
const TEXT_TAGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
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
function unwrap(vnode, tags = ["p"]) {
  if (Array.isArray(vnode)) {
    return vnode.flatMap((node) => unwrap(node, tags));
  }
  let result = vnode;
  if (tags.some((tag) => tag === "*" || isTag(vnode, tag))) {
    result = nodeChildren(vnode) || vnode;
    if (!Array.isArray(result) && TEXT_TAGS.some((tag) => isTag(vnode, tag))) {
      result = [result];
    }
  }
  return result;
}
function flatUnwrap(vnodes, tags = ["p"]) {
  vnodes = Array.isArray(vnodes) ? vnodes : [vnodes];
  if (!tags.length) {
    return vnodes;
  }
  return vnodes.flatMap((vnode) => flatUnwrap(unwrap(vnode, [tags[0]]), tags.slice(1))).filter((vnode) => !(isText(vnode) && nodeTextContent(vnode).trim() === ""));
}
const withContentBase = (url) => withBase(url, useRuntimeConfig().public.content.api.baseURL);
const useUnwrap = () => ({
  unwrap,
  flatUnwrap
});
const addPrerenderPath = (path) => {
  const event = useRequestEvent();
  event.res.setHeader(
    "x-nitro-prerender",
    [
      event.res.getHeader("x-nitro-prerender"),
      path
    ].filter(Boolean).join(",")
  );
};
const shouldUseClientDB = () => {
  useRuntimeConfig().content;
  {
    return false;
  }
};
const createQueryFetch = (path) => async (query) => {
  var _a2, _b2, _c2;
  const { content } = useRuntimeConfig().public;
  if (path) {
    if (query.params().first && (query.params().where || []).length === 0) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!((_a2 = query.params().sort) == null ? void 0 : _a2.length)) {
    query.sort({ _file: 1, $numeric: true });
  }
  if (content.locales.length) {
    const queryLocale = (_c2 = (_b2 = query.params().where) == null ? void 0 : _b2.find((w) => w._locale)) == null ? void 0 : _c2._locale;
    if (!queryLocale) {
      query.locale(content.defaultLocale);
    }
  }
  const params = query.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/query/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/query/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const db = await import('./client-db.5b86d289.mjs').then((m) => m.useContentDatabase());
    return db.fetch(query);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
function queryContent(query, ...pathParts) {
  if (typeof query === "string") {
    return createQuery(createQueryFetch(withLeadingSlash(joinURL(query, ...pathParts))));
  }
  return createQuery(createQueryFetch(), query);
}
const navBottomLink = (link) => {
  if (!link.children) {
    return link._path;
  }
  for (const child of (link == null ? void 0 : link.children) || []) {
    const result = navBottomLink(child);
    if (result) {
      return result;
    }
  }
};
const navDirFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path && !file._id) {
      return file.children;
    }
    if (file.children) {
      const result = navDirFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navPageFromPath = (path, tree) => {
  for (const file of tree) {
    if (file._path === path) {
      return file;
    }
    if (file.children) {
      const result = navPageFromPath(path, file.children);
      if (result) {
        return result;
      }
    }
  }
};
const navKeyFromPath = (path, key, tree) => {
  let value;
  const goDeep = (path2, tree2) => {
    for (const file of tree2) {
      if ((path2 == null ? void 0 : path2.startsWith(file._path)) && file[key]) {
        value = file[key];
      }
      if (file._path === path2) {
        return;
      }
      if (file.children) {
        goDeep(path2, file.children);
      }
    }
  };
  goDeep(path, tree);
  return value;
};
const useContentHelpers = () => {
  return {
    navBottomLink,
    navDirFromPath,
    navPageFromPath,
    navKeyFromPath
  };
};
const useContentState = () => {
  const pages = useState("dd-pages", () => ({}));
  const surrounds = useState("dd-surrounds", () => ({}));
  const navigation = useState("dd-navigation");
  const globals = useState("dd-globals", () => ({}));
  return {
    pages,
    surrounds,
    navigation,
    globals
  };
};
const useContent = () => {
  const { navigation, pages, surrounds, globals } = useContentState();
  const _path = computed(() => withoutTrailingSlash(useRoute().path));
  const page2 = computed(() => pages.value[_path.value]);
  const surround = computed(() => surrounds.value[_path.value]);
  const toc = computed(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = page2 == null ? void 0 : page2.value) == null ? void 0 : _a2.body) == null ? void 0 : _b2.toc;
  });
  const type = computed(() => {
    var _a2;
    return (_a2 = page2.value) == null ? void 0 : _a2.type;
  });
  const excerpt = computed(() => {
    var _a2;
    return (_a2 = page2.value) == null ? void 0 : _a2.excerpt;
  });
  const layout = computed(() => {
    var _a2;
    return (_a2 = page2.value) == null ? void 0 : _a2.layout;
  });
  const next = computed(() => {
    var _a2;
    return (_a2 = surround.value) == null ? void 0 : _a2[1];
  });
  const prev = computed(() => {
    var _a2;
    return (_a2 = surround.value) == null ? void 0 : _a2[0];
  });
  return {
    globals,
    navigation,
    surround,
    page: page2,
    excerpt,
    toc,
    type,
    layout,
    next,
    prev
  };
};
const fetchContentNavigation = async (queryBuilder) => {
  var _a2, _b2;
  const { content } = useRuntimeConfig().public;
  const params = typeof (queryBuilder == null ? void 0 : queryBuilder.params) === "function" ? queryBuilder.params() : queryBuilder || {};
  if (content.locales.length) {
    const queryLocale = (_b2 = (_a2 = params.where) == null ? void 0 : _a2.find((w) => w._locale)) == null ? void 0 : _b2._locale;
    if (!queryLocale) {
      params.where = params.where || [];
      params.where.push({ _locale: content.defaultLocale });
    }
  }
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/navigation/${`${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(`/navigation/${hash(params)}.${content.integrity}.json`);
  {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const generateNavigation = await import('./client-db.5b86d289.mjs').then((m) => m.generateNavigation);
    return generateNavigation(params);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useCookie("previewToken").value
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
const layouts = {
  default: () => import('./default.439ccce8.mjs').then((m) => m.default || m),
  page: () => import('./page.4af7ad5d.mjs').then((m) => m.default || m)
};
const node_modules__64nuxt_content_dist_runtime_plugins_documentDriven_mjs_9cX98v59ZY = defineNuxtPlugin((nuxt) => {
  var _a2, _b2;
  const { documentDriven: moduleOptions, experimental } = (_b2 = (_a2 = useRuntimeConfig()) == null ? void 0 : _a2.public) == null ? void 0 : _b2.content;
  const findLayout = (to, page2, navigation, globals) => {
    var _a3;
    if (page2 && (page2 == null ? void 0 : page2.layout)) {
      return page2.layout;
    }
    if (to.matched.length && ((_a3 = to.matched[0].meta) == null ? void 0 : _a3.layout)) {
      return to.matched[0].meta.layout;
    }
    if (navigation && page2) {
      const { navKeyFromPath: navKeyFromPath2 } = useContentHelpers();
      const layoutFromNav = navKeyFromPath2(page2._path, "layout", navigation);
      if (layoutFromNav) {
        return layoutFromNav;
      }
    }
    if (moduleOptions.layoutFallbacks && globals) {
      let layoutFallback;
      for (const fallback of moduleOptions.layoutFallbacks) {
        if (globals[fallback] && globals[fallback].layout) {
          layoutFallback = globals[fallback].layout;
          break;
        }
      }
      if (layoutFallback) {
        return layoutFallback;
      }
    }
    return "default";
  };
  const refresh = async (to, dedup = false) => {
    nuxt.callHook("content:document-driven:start", { route: to, dedup });
    const routeConfig = to.meta.documentDriven || {};
    if (to.meta.documentDriven === false) {
      return;
    }
    const { navigation, pages, globals, surrounds } = useContentState();
    const _path = withoutTrailingSlash(to.path);
    const promises = [];
    if (moduleOptions.navigation && routeConfig.navigation !== false) {
      const navigationQuery = () => {
        const { navigation: navigation2 } = useContentState();
        if (navigation2.value && !dedup) {
          return navigation2.value;
        }
        return fetchContentNavigation().then((_navigation) => {
          navigation2.value = _navigation;
          return _navigation;
        }).catch(() => null);
      };
      promises.push(navigationQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.globals) {
      const globalsQuery = () => {
        const { globals: globals2 } = useContentState();
        if (typeof moduleOptions.globals === "object" && Array.isArray(moduleOptions.globals)) {
          console.log("Globals must be a list of keys with QueryBuilderParams as a value.");
          return;
        }
        return Promise.all(
          Object.entries(moduleOptions.globals).map(
            ([key, query]) => {
              if (!dedup && globals2.value[key]) {
                return globals2.value[key];
              }
              let type = "findOne";
              if (query == null ? void 0 : query.type) {
                type = query.type;
              }
              return queryContent(query)[type]().catch(() => null);
            }
          )
        ).then(
          (values) => {
            return values.reduce(
              (acc, value, index) => {
                const key = Object.keys(moduleOptions.globals)[index];
                acc[key] = value;
                return acc;
              },
              {}
            );
          }
        );
      };
      promises.push(globalsQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.page && routeConfig.page !== false) {
      let where = { _path };
      if (typeof routeConfig.page === "string") {
        where = { _path: routeConfig.page };
      }
      if (typeof routeConfig.page === "object") {
        where = routeConfig.page;
      }
      const pageQuery = () => {
        const { pages: pages2 } = useContentState();
        if (!dedup && pages2.value[_path] && pages2.value[_path]._path === _path) {
          return pages2.value[_path];
        }
        return queryContent().where(where).findOne().catch(() => null);
      };
      promises.push(pageQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    if (moduleOptions.surround && routeConfig.surround !== false) {
      let surround = _path;
      if (["string", "object"].includes(typeof routeConfig.page)) {
        surround = routeConfig.page;
      }
      if (["string", "object"].includes(typeof routeConfig.surround)) {
        surround = routeConfig.surround;
      }
      const surroundQuery = () => {
        const { surrounds: surrounds2 } = useContentState();
        if (!dedup && surrounds2.value[_path]) {
          return surrounds2.value[_path];
        }
        return queryContent().where({
          _partial: { $not: true },
          navigation: { $not: false }
        }).without(["body"]).findSurround(surround).catch(() => null);
      };
      promises.push(surroundQuery);
    } else {
      promises.push(() => Promise.resolve(null));
    }
    return await Promise.all(promises.map((promise) => promise())).then(async ([
      _navigation,
      _globals,
      _page,
      _surround
    ]) => {
      var _a3, _b3, _c2, _d2;
      if (_navigation) {
        navigation.value = _navigation;
      }
      if (_globals) {
        globals.value = _globals;
      }
      if (_page == null ? void 0 : _page.redirect) {
        return _page == null ? void 0 : _page.redirect;
      }
      if ((_b3 = (_a3 = _page == null ? void 0 : _page._dir) == null ? void 0 : _a3.navigation) == null ? void 0 : _b3.redirect) {
        return (_d2 = (_c2 = _page == null ? void 0 : _page._dir) == null ? void 0 : _c2.navigation) == null ? void 0 : _d2.redirect;
      }
      if (_page) {
        const layoutName = findLayout(to, _page, _navigation, _globals);
        const layout = layouts[layoutName];
        if (layout && typeof layout === "function") {
          await layout();
        }
        to.meta.layout = layoutName;
        _page.layout = layoutName;
        pages.value[_path] = _page;
      }
      if (_surround) {
        surrounds.value[_path] = _surround;
      }
      await nuxt.callHook("content:document-driven:finish", { route: to, dedup, page: _page, navigation: _navigation, globals: _globals, surround: _surround });
    });
  };
  addRouteMiddleware(async (to, from) => {
    if (to.path.includes("favicon.ico")) {
      return;
    }
    const redirect = await refresh(to, false);
    if (redirect) {
      if (hasProtocol(redirect)) {
        return callWithNuxt(nuxt, navigateTo, [redirect, { external: true }]);
      } else {
        return redirect;
      }
    }
  });
  {
    delete nuxt.payload.prerenderedAt;
  }
  nuxt.hook("app:data:refresh", async () => false);
});
const node_modules__64nuxt_content_dist_runtime_plugins_ws_mjs_JuoSZH52OQ = defineNuxtPlugin(() => {
  useRuntimeConfig().public;
});
const node_modules__64nuxthq_studio_dist_runtime_plugins_app_config_server_mjs_3EJd2il4WQ = defineNuxtPlugin(() => {
  const event = useRequestEvent();
  if (event.path === "/__app_config.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(useAppConfig(), null, 2));
  }
});
const node_modules__64nuxthq_studio_dist_runtime_plugins_preview_detector_mjs_wuXocrN5Sn = defineNuxtPlugin((nuxtApp) => {
  const contentStorage = useState("client-db", () => null);
  const runtimeConfig = useRuntimeConfig().public.studio || {};
  const route = useRoute();
  const previewToken = useCookie("previewToken", { sameSite: "none", secure: true });
  async function initializePreview() {
    nuxtApp.hook("page:finish", () => {
      refreshNuxtData();
      nuxtApp.hook("content:storage", (storage) => {
        contentStorage.value = storage;
      });
      queryContent("/non-existing-path").findOne();
    });
    const useStudio = await import('./useStudio.f9943a11.mjs').then((m) => m.useStudio);
    const { mountPreviewUI } = useStudio();
    mountPreviewUI(contentStorage);
  }
  if (runtimeConfig.apiURL) {
    if (Object.prototype.hasOwnProperty.call(route.query, "preview") && !route.query.preview) {
      return false;
    }
    if (!route.query.preview && !previewToken.value) {
      return false;
    }
    if (route.query.preview && previewToken.value !== route.query.preview) {
      previewToken.value = String(route.query.preview);
    }
    nuxtApp.hook("app:mounted", async () => {
      await initializePreview();
    });
  }
});
function set(object, paths, value, splitter = ".") {
  var _a2;
  if (typeof paths === "string") {
    paths = paths.split(splitter);
  }
  const limit = paths.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key2 = paths[i];
    object = (_a2 = object[key2]) != null ? _a2 : object[key2] = {};
  }
  const key = paths[limit];
  object[key] = value;
}
function get(object, paths, splitter = ".") {
  var _a2;
  if (typeof paths === "string") {
    paths = paths.split(splitter);
  }
  const limit = paths.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key2 = paths[i];
    object = (_a2 = object[key2]) != null ? _a2 : object[key2] = {};
  }
  const key = paths[limit];
  return object[key];
}
function walkTokens(obj, cb, paths = []) {
  let result = {};
  if (obj.value) {
    result = cb(obj, result, paths);
  } else {
    for (const k in obj) {
      if (obj[k] && typeof obj[k] === "object") {
        result[k] = walkTokens(obj[k], cb, [...paths, k]);
      }
    }
  }
  return result;
}
function normalizeConfig(obj, mqKeys, removeSchemaKeys = false) {
  let result = {};
  if (obj.value) {
    result = obj;
  } else {
    for (const k in obj) {
      if (k === "$schema") {
        if (!removeSchemaKeys) {
          result[k] = obj[k];
        }
        continue;
      }
      if (k === "utils") {
        result[k] = obj[k];
        continue;
      }
      if (obj[k] && (typeof obj[k] === "string" || typeof obj[k] === "number" || typeof obj[k] === "boolean" || typeof obj[k] === "symbol" || typeof obj[k] === "bigint")) {
        result[k] = { value: obj[k] };
      } else if (obj[k] && typeof obj[k] === "object") {
        const keys = Object.keys(obj[k]);
        if (keys.includes("initial") && keys.some((key) => mqKeys.includes(key))) {
          result[k] = { value: obj[k] };
          continue;
        }
        result[k] = normalizeConfig(obj[k], mqKeys, removeSchemaKeys);
      }
    }
  }
  return result;
}
const referencesRegex = new RegExp(
  "\\{([^}]+)\\}",
  "g"
);
const keyRegex = /{(.*)}/g;
const DARK = "@dark";
const LIGHT = "@light";
const INITIAL = "@initial";
const responsiveMediaQueryRegex = /^(:|\.)/;
function createTokensHelper(theme2 = {}, options = {}) {
  const defaultHelperOptions = {
    key: "attributes.variable",
    onNotFound: false,
    ...options
  };
  function $tokens(path = void 0, options2) {
    if (!path) {
      return unref(theme2);
    }
    const $tokensOptions = { ...defaultHelperOptions, ...options2 };
    const { key, onNotFound } = $tokensOptions;
    const token = get(unref(theme2), path);
    if (!token && typeof onNotFound === "function") {
      onNotFound(path, $tokensOptions);
      return;
    }
    return key ? token ? token[key] ? token[key] : get(token, key) : token : token;
  }
  return $tokens.bind(this);
}
function pathToVarName(path) {
  if (Array.isArray(path)) {
    path = path.join("-");
  }
  if (path.charAt(0) === "{" && path.charAt(path.length - 1) === "}") {
    path = path.substr(1, path.length - 2);
  }
  return `--${path.split(".").join("-")}`;
}
function resolveCssProperty(property, value, style, selectors, ctx, loc) {
  const directive = resolveCustomDirectives(property, value, selectors, ctx, loc);
  if (directive) {
    return directive;
  }
  if (ctx.utils[property]) {
    if (typeof ctx.utils[property] === "function") {
      return ctx.utils[property](value);
    }
    return value ? ctx.utils[property] : {};
  }
  value = castValues(property, value, ctx, loc);
  return {
    [property]: value
  };
}
function castValues(property, value, ctx, loc) {
  if (Array.isArray(value) || typeof value === "string" || typeof value === "number") {
    if (Array.isArray(value)) {
      value = value.map((v) => castValue(property, v, ctx, loc)).join(",");
    } else {
      value = castValue(property, value, ctx, loc);
    }
  }
  return value;
}
function castValue(property, value, ctx, loc) {
  if (typeof value === "number") {
    return value;
  }
  if (value.match(referencesRegex)) {
    value = resolveReferences(property, value, ctx, loc);
  }
  if (value === "{}") {
    return "";
  }
  return value;
}
function resolveReferences(_, value, ctx, loc) {
  if (!(typeof value === "string")) {
    return value;
  }
  value = value.replace(
    referencesRegex,
    (_2, tokenPath) => {
      const token = ctx.$tokens(tokenPath, { key: void 0, loc });
      const tokenValue = typeof token === "string" ? token : (token == null ? void 0 : token.variable) || (token == null ? void 0 : token.value);
      if (!tokenValue) {
        return `var(${pathToVarName(tokenPath)})`;
      }
      return tokenValue;
    }
  );
  return value;
}
function resolveCustomDirectives(property, value, selectors, ctx, loc) {
  if (property.startsWith("@")) {
    const resolveColorScheme = (scheme) => {
      scheme = ctx.options.colorSchemeMode === "class" ? `:root.${scheme} &` : `@media (prefers-color-scheme: ${scheme})`;
      return {
        [scheme]: value
      };
    };
    if (property === DARK) {
      return resolveColorScheme("dark");
    }
    if (property === LIGHT) {
      return resolveColorScheme("light");
    }
    if (property === INITIAL) {
      const token = ctx.$tokens("media.initial", { key: "value", onNotFound: false, loc });
      return {
        [`@media${token ? ` ${token}` : ""}`]: value
      };
    }
    const mediaQueries = ctx.$tokens("media", { key: void 0, loc });
    if (mediaQueries) {
      const query = property.replace("@", "");
      if (mediaQueries[query]) {
        return {
          [`@media ${mediaQueries[query].value}`]: value
        };
      }
    }
    return {
      [property]: value
    };
  }
}
const comma = /\s*,\s*(?![^()]*\))/;
const getResolvedSelectors = (parentSelectors, nestedSelectors) => parentSelectors.reduce(
  (resolvedSelectors, parentSelector) => {
    resolvedSelectors.push(
      ...nestedSelectors.map(
        (selector) => selector.includes("&") ? selector.replace(
          /&/g,
          /[ +>|~]/.test(parentSelector) && /&.*&/.test(selector) ? `:is(${parentSelector})` : parentSelector
        ) : `${parentSelector} ${selector}`
      )
    );
    return resolvedSelectors;
  },
  []
);
const { prototype: { toString } } = Object;
const stringify = (value, replacer = void 0) => {
  const used = /* @__PURE__ */ new WeakSet();
  const write = (cssText, selectors, conditions, name, data, isAtRuleLike) => {
    for (let i = 0; i < conditions.length; ++i) {
      if (!used.has(conditions[i])) {
        used.add(conditions[i]);
        cssText += `${conditions[i]}{`;
      }
    }
    if (selectors.length && !used.has(selectors)) {
      used.add(selectors);
      cssText += `${selectors}{`;
    }
    if (isAtRuleLike) {
      name = `${name} `;
    } else {
      name = `${kebabCase(name)}:`;
    }
    cssText += `${name + String(data)};`;
    return cssText;
  };
  const parse2 = (style, selectors, conditions, prevName, prevData) => {
    let cssText = "";
    for (const name in style) {
      const isAtRuleLike = name.charCodeAt(0) === 64;
      for (const data of isAtRuleLike && Array.isArray(style[name]) ? style[name] : [style[name]]) {
        if (replacer && (name !== prevName || data !== prevData)) {
          const next = replacer(name, data, style, selectors);
          if (next !== null) {
            cssText += typeof next === "object" && next ? parse2(next, selectors, conditions, name, data) : next == null ? "" : next;
            continue;
          }
        }
        const isObjectLike = typeof data === "object" && data && data.toString === toString;
        if (isObjectLike) {
          if (used.has(selectors)) {
            used.delete(selectors);
            cssText += "}";
          }
          const usedName = Object(name);
          let nextSelectors;
          if (isAtRuleLike) {
            nextSelectors = selectors;
            cssText += parse2(
              data,
              nextSelectors,
              conditions.concat(usedName)
            );
          } else {
            nextSelectors = selectors.length ? getResolvedSelectors(selectors, name.split(comma)) : name.split(comma);
            cssText += parse2(
              data,
              nextSelectors,
              conditions
            );
          }
          if (used.has(usedName)) {
            used.delete(usedName);
            cssText += "}";
          }
          if (used.has(nextSelectors)) {
            used.delete(nextSelectors);
            cssText += "}";
          }
        } else {
          cssText = write(cssText, selectors, conditions, name, data, isAtRuleLike);
        }
      }
    }
    return cssText;
  };
  return parse2(value, [], []);
};
const HYDRATION_SELECTOR = ".phy[--]";
function usePinceauRuntimeSheet($tokens, initialUtils = {}, colorSchemeMode, appId) {
  const sheet = ref();
  const utils2 = ref(initialUtils);
  const cache2 = {};
  function stringify$1(decl, loc) {
    return stringify(decl, (property, value, style, selectors) => resolveCssProperty(property, value, style, selectors, { $tokens, utils: utils2.value, options: { colorSchemeMode } }, loc));
  }
  function resolveStylesheet() {
    const global = globalThis || window;
    let style;
    let hydratableSheet;
    if (global && global.document) {
      const doc = global.document;
      hydratableSheet = doc.querySelector(`style#pinceau-runtime-hydratable${appId ? `-${appId}` : ""}`);
      const styleNode = doc.createElement("style");
      styleNode.id = `pinceau-runtime${appId ? `-${appId}` : ""}`;
      styleNode.type = "text/css";
      style = doc.head.appendChild(styleNode);
    }
    sheet.value = (style == null ? void 0 : style.sheet) || getSSRStylesheet();
    return hydratableSheet ? hydrateStylesheet(hydratableSheet) : void 0;
  }
  function hydrateStylesheet(el) {
    var _a2, _b2;
    const hydratableRules2 = {};
    for (const _rule of Object.entries(((_a2 = el == null ? void 0 : el.sheet) == null ? void 0 : _a2.cssRules) || ((_b2 = sheet.value) == null ? void 0 : _b2.cssRules) || {})) {
      const [index, rule] = _rule;
      const uids = resolveUid(rule);
      if (!uids || !uids.uid) {
        continue;
      }
      if (!hydratableRules2[uids.uid]) {
        hydratableRules2[uids.uid] = {};
      }
      const newIndex = sheet.value.insertRule(rule.cssText, Number(index));
      hydratableRules2[uids.uid][uids.type] = sheet.value.cssRules.item(newIndex);
    }
    if (el) {
      el.remove();
    }
    return hydratableRules2;
  }
  function toString2() {
    if (!sheet.value) {
      return "";
    }
    return Object.entries(sheet.value.cssRules).reduce(
      (acc, [, rule]) => {
        acc += `${rule == null ? void 0 : rule.cssText}
` || "";
        return acc;
      },
      ""
    );
  }
  function pushDeclaration(uid, type, declaration, previousRule, loc) {
    if (!Object.keys(declaration).length) {
      return;
    }
    const cssText = stringify$1(
      {
        "@media": {
          [HYDRATION_SELECTOR]: { "--puid": `${uid}-${type}` },
          ...declaration
        }
      },
      loc
    );
    if (!cssText) {
      return;
    }
    if (previousRule) {
      deleteRule(previousRule);
    }
    const ruleId = sheet.value.insertRule(cssText);
    return sheet.value.cssRules[ruleId];
  }
  function deleteRule(rule) {
    const ruleIndex = Object.values(sheet.value.cssRules).indexOf(rule);
    if (typeof ruleIndex === "undefined" || isNaN(ruleIndex)) {
      return;
    }
    try {
      sheet.value.deleteRule(ruleIndex);
    } catch (e) {
    }
  }
  const hydratableRules = resolveStylesheet();
  return {
    stringify: stringify$1,
    cache: cache2,
    pushDeclaration,
    deleteRule,
    sheet,
    toString: toString2,
    hydratableRules
  };
}
function getSSRStylesheet() {
  return {
    cssRules: [],
    insertRule(cssText, index = this.cssRules.length) {
      this.cssRules.splice(index, 1, { cssText });
      return index;
    },
    deleteRule(index) {
      delete this.cssRules[index];
    }
  };
}
function resolveUid(rule) {
  const uidRule = rule.cssRules && rule.cssRules.length ? Object.entries(rule == null ? void 0 : rule.cssRules).find(([_, rule2]) => rule2.selectorText === HYDRATION_SELECTOR) : void 0;
  if (!uidRule) {
    return;
  }
  const uidRegex = /--puid:(.*)?-(c|v|p)?/m;
  const [, uid, type] = uidRule[1].cssText.match(uidRegex);
  if (!uid) {
    return;
  }
  return { uid, type };
}
function usePinceauRuntimeIds(instance, classes, _) {
  var _a2, _b2, _c2;
  let uid;
  const el = (_a2 = instance == null ? void 0 : instance.vnode) == null ? void 0 : _a2.el;
  if (el && el.classList) {
    el.classList.forEach(
      (elClass) => {
        if (uid) {
          return;
        }
        if (elClass.startsWith("pc-")) {
          uid = elClass.split("pc-")[1];
        }
      }
    );
  } else {
    uid = nanoid(6);
  }
  const scopeId = (_c2 = (_b2 = instance == null ? void 0 : instance.vnode) == null ? void 0 : _b2.type) == null ? void 0 : _c2.__scopeId;
  const ids = {
    uid,
    componentId: scopeId ? `[${scopeId}]` : "",
    uniqueClassName: `pc-${uid}`
  };
  classes.value.c = ids.uniqueClassName;
  return computed(() => ids);
}
function isToken(token) {
  return typeof token === "string" && keyRegex.test(token);
}
function scale(type, prop, scales, valueTransform) {
  if (typeof prop === "object") {
    return prop;
  }
  if (typeof prop === "string") {
    const to_ret = {};
    if (isToken(prop)) {
      to_ret.initial = prop;
      return to_ret;
    }
    if (typeof scales === "string") {
      to_ret.initial = `{${type}.${prop}.${scales}}`;
    }
    if (typeof scales === "object") {
      Object.entries(scales).forEach(
        ([mqId, scaleValue]) => {
          if (typeof prop === "string") {
            to_ret[mqId] = `{${type}.${prop}.${scaleValue}}`;
          }
        }
      );
    }
    return valueTransform ? Object.entries(to_ret).reduce(
      (acc, [key, value]) => {
        acc[key] = valueTransform(value);
        return acc;
      },
      {}
    ) : to_ret;
  }
}
const utils$1 = {
  isToken,
  scale
};
function usePinceauThemeSheet(initialTheme, tokensHelperConfig = {}) {
  const sheet = ref();
  const theme2 = ref(initialTheme || {});
  tokensHelperConfig = Object.assign(
    {
      key: "variable"
    },
    tokensHelperConfig || {}
  );
  const $tokens = createTokensHelper(
    theme2,
    tokensHelperConfig
  );
  let cache2 = {};
  resolveStylesheet();
  function findThemeSheet(document2) {
    var _a2;
    for (const sheet2 of document2.styleSheets) {
      if ((_a2 = sheet2 == null ? void 0 : sheet2.ownerNode) == null ? void 0 : _a2.textContent.includes("--pinceau-mq")) {
        return sheet2.ownerNode;
      }
    }
  }
  function resolveStylesheet() {
    var _a2;
    const global = globalThis || window;
    if (global && global.document) {
      let sheetElement = document.querySelector("#pinceau-theme");
      if (!sheetElement) {
        sheetElement = findThemeSheet(document);
      }
      sheet.value = sheetElement == null ? void 0 : sheetElement.sheet;
      if (sheet.value) {
        hydrateStylesheet((_a2 = sheet.value) == null ? void 0 : _a2.cssRules);
      }
    }
  }
  function hydrateStylesheet(cssRules) {
    cache2 = {};
    Object.entries(cssRules || {}).forEach(
      ([_, rule]) => {
        var _a2, _b2;
        if ((rule == null ? void 0 : rule.type) !== 4 && !((_a2 = rule == null ? void 0 : rule.cssText) == null ? void 0 : _a2.includes("--pinceau-mq"))) {
          return false;
        }
        let currentTheme = "initial";
        (_b2 = rule.cssText.match(/--([\w-]+)\s*:\s*(.+?);/gm)) == null ? void 0 : _b2.forEach((match) => {
          var _a3;
          const [variable, value] = match.replace(";", "").split(/:\s(.*)/s);
          if (variable === "--pinceau-mq") {
            currentTheme = value;
            if (!cache2[value]) {
              const ruleReference = (_a3 = Object.entries((rule == null ? void 0 : rule.cssRules) || {}).find(([_2, cssRule]) => cssRule == null ? void 0 : cssRule.cssText.includes(`--pinceau-mq: ${value}`))) == null ? void 0 : _a3[1];
              if (ruleReference) {
                cache2[value] = ruleReference;
              }
            }
            return;
          }
          const path = [...variable.substring(2).split("-")];
          set(theme2.value, path, getSetValue(path, value, variable, currentTheme));
        });
      }
    );
  }
  function updateTheme(value) {
    var _a2;
    const mqKeys = Array.from(/* @__PURE__ */ new Set(["dark", "light", ...Object.keys((value == null ? void 0 : value.media) || {}), ...Object.keys(((_a2 = theme2.value) == null ? void 0 : _a2.media) || {})]));
    const config = normalizeConfig(value || {}, mqKeys, true);
    walkTokens(config, (token, _, paths) => updateToken(paths, token.value));
  }
  function updateToken(path, value, mq = "initial") {
    var _a2;
    if (typeof value === "object") {
      Object.entries(value).forEach(([mq2, mqValue]) => updateToken(path, mqValue, mq2));
      return;
    }
    const varName = pathToVarName(path);
    if (!(cache2 == null ? void 0 : cache2[mq])) {
      createMqRule(mq);
    }
    const resolvedValue = resolveReferences(void 0, value, { $tokens });
    set(
      theme2.value,
      path,
      getSetValue(path, resolvedValue, varName, mq)
    );
    (_a2 = cache2 == null ? void 0 : cache2[mq]) == null ? void 0 : _a2.style.setProperty(varName, resolvedValue);
  }
  function reactiveToken(path) {
    return computed(
      {
        get() {
          return get(theme2.value, `${path}.value`);
        },
        set(v) {
          updateToken(path, v);
        }
      }
    );
  }
  function getSetValue(path, value, variable, mq = "initial") {
    const varRef = `var(${variable})`;
    const setValue = { value, variable: varRef };
    const existingValue = get(theme2.value, path);
    if (existingValue) {
      if (typeof (existingValue == null ? void 0 : existingValue.value) === "object") {
        setValue.value = { ...existingValue.value, [mq]: value };
      } else {
        setValue.value = { initial: existingValue.value, [mq]: value };
      }
    }
    return setValue;
  }
  function createMqRule(mq) {
    var _a2, _b2, _c2;
    if (cache2 == null ? void 0 : cache2[mq]) {
      return cache2 == null ? void 0 : cache2[mq];
    }
    let mqValue;
    if (mq === "dark" || mq === "light") {
      mqValue = `:root.${mq}`;
    } else {
      mqValue = (_c2 = (_b2 = (_a2 = theme2.value) == null ? void 0 : _a2.media) == null ? void 0 : _b2[mq]) == null ? void 0 : _c2.value;
    }
    let css;
    if (mqValue.match(responsiveMediaQueryRegex)) {
      css = `@media { ${mqValue} { --pinceau-mq: ${mq}; } }`;
    } else {
      css = `@media ${mqValue} { :root { --pinceau-mq: ${mq}; } }`;
    }
    cache2[mq] = sheet.value.cssRules.item(sheet.value.insertRule(css, sheet.value.cssRules.length)).cssRules[0];
    return cache2[mq];
  }
  return {
    $tokens,
    updateToken,
    updateTheme,
    reactiveToken,
    resolveStylesheet,
    theme: theme2
  };
}
function usePinceauComputedStyles(ids, computedStyles, sheet, loc) {
  var _a2, _b2;
  let rule = (_b2 = (_a2 = sheet.hydratableRules) == null ? void 0 : _a2[ids.value.uid]) == null ? void 0 : _b2.c;
  watch(
    computedStyles,
    (newComputedStyles) => {
      newComputedStyles = transformComputedStylesToDeclaration(ids.value, newComputedStyles);
      rule = sheet.pushDeclaration(
        ids.value.uid,
        "c",
        newComputedStyles,
        rule,
        { ...loc, type: "c" }
      );
    },
    {
      immediate: !rule,
      deep: true
    }
  );
  onScopeDispose(() => rule && sheet.deleteRule(rule));
}
function transformComputedStylesToDeclaration(ids, computedStyles) {
  const declaration = {};
  const targetId = `.${ids.uniqueClassName}${ids.componentId}`;
  if (computedStyles && Object.keys(computedStyles).length) {
    declaration[targetId] = declaration[targetId] || {};
    for (const [varName, _value] of Object.entries(computedStyles)) {
      const value = unref(_value);
      if (varName === "css") {
        declaration[targetId] = Object.assign(declaration[targetId], value);
        continue;
      }
      if (typeof value === "object") {
        for (const [mqId, mqPropValue] of Object.entries(value)) {
          const _value2 = unref(mqPropValue);
          if (!_value2) {
            continue;
          }
          if (mqId === "initial") {
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            declaration[targetId][`--${varName}`] = _value2;
          }
          const mediaId = `@${mqId}`;
          if (!declaration[mediaId]) {
            declaration[mediaId] = {};
          }
          if (!declaration[mediaId][targetId]) {
            declaration[mediaId][targetId] = {};
          }
          declaration[mediaId][targetId][`--${kebabCase(varName)}`] = _value2;
        }
      } else {
        const _value2 = unref(value);
        if (_value2) {
          declaration[targetId][`--${kebabCase(varName)}`] = _value2;
        }
      }
    }
  }
  return declaration;
}
const usePinceauVariants = (ids, variants, props, sheet, classes, loc) => {
  var _a2, _b2;
  let rule = (_b2 = (_a2 = sheet.hydratableRules) == null ? void 0 : _a2[ids.value.uid]) == null ? void 0 : _b2.v;
  const variantsState = computed(() => variants && (variants == null ? void 0 : variants.value) ? resolveVariantsState(ids.value, props.value, variants.value) : {});
  watch(
    variantsState,
    ({ cacheId, variantsProps }) => {
      let variantClass;
      if (sheet.cache[cacheId]) {
        const cachedRule = sheet.cache[cacheId];
        rule = cachedRule.rule;
        variantClass = cachedRule.variantClass;
        cachedRule.count++;
      } else {
        variantClass = `pv-${nanoid(6)}`;
        const transformed = transformVariantsToDeclaration(variantClass, ids.value, variants.value, variantsProps);
        rule = sheet.pushDeclaration(ids.value.uid, "v", transformed, void 0, { ...loc, type: "v" });
        sheet.cache[cacheId] = { rule, variantClass, count: 1 };
      }
      classes.value.v = variantClass;
    },
    {
      immediate: true
    }
  );
  onScopeDispose(
    () => {
      var _a3;
      const state = variantsState == null ? void 0 : variantsState.value;
      const cachedRule = (_a3 = sheet.cache) == null ? void 0 : _a3[state.cacheId];
      if (cachedRule) {
        cachedRule.count--;
        if (cachedRule.count <= 0) {
          sheet.deleteRule(cachedRule.rule);
          delete sheet.cache[state.cacheId];
        }
      }
    }
  );
};
function transformVariantsToDeclaration(variantClass, ids, variants, props) {
  var _a2, _b2;
  const declaration = {};
  if (props && Object.keys(props).length) {
    const targetId = `.${variantClass}`;
    for (const [propName, propValue] of Object.entries(props)) {
      if (typeof propValue === "object") {
        for (const [mqId, mqPropValue] of Object.entries(propValue)) {
          const _value = (mqPropValue == null ? void 0 : mqPropValue.toString()) || mqPropValue;
          const variantValue = variants[propName][_value];
          if (!variantValue) {
            continue;
          }
          if (!declaration[targetId]) {
            declaration[targetId] = {};
          }
          if (mqId === "initial") {
            if (!declaration[targetId]) {
              declaration[targetId] = {};
            }
            declaration[targetId] = defu(declaration[targetId], variantValue);
          }
          const mediaId = `@${mqId}`;
          if (!declaration[mediaId]) {
            declaration[mediaId] = {};
          }
          if (!declaration[mediaId][targetId]) {
            declaration[mediaId][targetId] = {};
          }
          declaration[mediaId][targetId] = defu(declaration[mediaId][targetId], variantValue);
        }
      } else {
        const _value = ((_a2 = propValue == null ? void 0 : propValue.toString) == null ? void 0 : _a2.call(propValue)) || propValue;
        const variantValue = (_b2 = variants == null ? void 0 : variants[propName]) == null ? void 0 : _b2[_value];
        if (!variantValue) {
          continue;
        }
        if (!declaration[targetId]) {
          declaration[targetId] = {};
        }
        declaration[targetId] = defu(declaration[targetId], variantValue);
      }
    }
  }
  return declaration;
}
function resolveVariantsState(ids, props, variants) {
  if (!props || !variants) {
    return {};
  }
  let cacheId = ids.componentId;
  const variantsProps = Object.entries(props).reduce(
    (acc, [propName, propValue]) => {
      if (!variants[propName]) {
        return acc;
      }
      if (typeof propValue === "object") {
        Object.entries(propValue).forEach(
          ([key, value]) => {
            cacheId += `${propName}:${key}:${value}|`;
          }
        );
      } else {
        cacheId += `${propName}:${propValue}|`;
      }
      acc[propName] = propValue;
      return acc;
    },
    {}
  );
  return { cacheId, variantsProps };
}
function usePinceauCssProp(ids, props, sheet, loc) {
  var _a2, _b2;
  let rule = (_b2 = (_a2 = sheet.hydratableRules) == null ? void 0 : _a2[ids.value.uid]) == null ? void 0 : _b2.p;
  const css = computed(() => {
    var _a3;
    return (_a3 = props.value) == null ? void 0 : _a3.css;
  });
  watch(
    css,
    (newCss) => {
      newCss = transformCssPropToDeclaration(ids.value, newCss);
      if (rule) {
        sheet.deleteRule(rule);
      }
      rule = sheet.pushDeclaration(
        ids.value.uid,
        "p",
        newCss,
        void 0,
        { ...loc, type: "c" }
      );
    },
    {
      immediate: !rule
    }
  );
  onScopeDispose(() => rule && sheet.deleteRule(rule));
}
function transformCssPropToDeclaration(ids, css) {
  const declaration = {};
  if (css) {
    const targetId = `.${ids.uniqueClassName}${ids.componentId}`;
    declaration[targetId] = Object.assign(declaration[targetId] || {}, css);
  }
  return declaration;
}
const defaultRuntimeOptions = {
  theme: {},
  utils: {},
  tokensHelperConfig: {},
  multiApp: false,
  colorSchemeMode: "media",
  dev: "production" !== "production"
};
const plugin = {
  install(app, options) {
    options = Object.assign(defaultRuntimeOptions, options);
    const { theme: theme2, tokensHelperConfig, dev, multiApp, colorSchemeMode, utils: utils2 } = options;
    const themeSheet = usePinceauThemeSheet(theme2);
    if (dev && true) {
      import('./debug.34d22480.mjs').then(({ usePinceauRuntimeDebug }) => {
        usePinceauRuntimeDebug(tokensHelperConfig);
      });
    }
    const multiAppId = multiApp ? nanoid(6) : void 0;
    const runtimeSheet = usePinceauRuntimeSheet(themeSheet.$tokens, utils2, colorSchemeMode, multiAppId);
    function usePinceauRuntime2(props, variants, computedStyles) {
      const instance = getCurrentInstance();
      let loc;
      if (dev && true) {
        const { __file: file, __name: name } = instance.vnode.type;
        loc = { file, name };
      }
      const classes = ref({
        v: "",
        c: ""
      });
      const ids = usePinceauRuntimeIds(instance, classes);
      if (computedStyles && (computedStyles == null ? void 0 : computedStyles.value) && Object.keys(computedStyles.value).length > 0) {
        usePinceauComputedStyles(ids, computedStyles, runtimeSheet, loc);
      }
      if (variants && (variants == null ? void 0 : variants.value) && Object.keys(variants.value).length > 0) {
        usePinceauVariants(ids, variants, props, runtimeSheet, classes, loc);
      }
      if (props.value.css && Object.keys(props.value.css).length > 0) {
        usePinceauCssProp(ids, props, runtimeSheet, loc);
      }
      return {
        $pinceau: computed(() => `${classes.value.v} ${classes.value.c}`)
      };
    }
    app.config.globalProperties.$pinceauRuntime = usePinceauRuntime2;
    app.config.globalProperties.$pinceauTheme = themeSheet;
    app.config.globalProperties.$pinceauSsr = { get: () => runtimeSheet.toString() };
    app.provide("pinceauRuntime", usePinceauRuntime2);
    app.provide("pinceauTheme", themeSheet);
  }
};
function usePinceauRuntime(props, variants, computedStyles) {
  return inject("pinceauRuntime")(props, variants, computedStyles);
}
function usePinceauTheme() {
  return inject("pinceauTheme");
}
function computedStyle(attribute, defaultValue, required = false) {
  return {
    type: [String, Object],
    required,
    default: defaultValue
  };
}
const utils = {
  "stateColors": (value) => {
    return {
      color: `{elements.state.${value}.color.primary}`,
      backgroundColor: `{elements.state.${value}.backgroundColor.primary}`,
      borderColor: `{elements.state.${value}.borderColor.primary}`,
      ":deep(p code)": {
        color: `{elements.state.${value}.color.secondary}`,
        backgroundColor: `{elements.state.${value}.backgroundColor.secondary}`
      },
      ":deep(a)": {
        borderColor: "currentColor",
        "&:hover": {
          color: `{elements.state.${value}.color.secondary}`,
          borderColor: "currentColor"
        }
      }
    };
  },
  "my": (value) => {
    return {
      marginTop: value,
      marginBottom: value
    };
  },
  "mx": (value) => {
    return {
      marginLeft: value,
      marginRight: value
    };
  },
  "py": (value) => {
    return {
      paddingTop: value,
      paddingBottom: value
    };
  },
  "px": (value) => {
    return {
      paddingLeft: value,
      paddingRight: value
    };
  },
  "truncate": {
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
  },
  "lineClamp": (lines) => ({
    "overflow": "hidden",
    "display": "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": lines
  }),
  "text": (size) => ({
    fontSize: `{text.${size}.fontSize}`,
    lineHeight: `{text.${size}.lineHeight}`
  })
};
const theme = {
  "color": {
    "primary": {
      "50": {
        "value": "#d9f8ff",
        "variable": "var(--color-primary-50)"
      },
      "100": {
        "value": "#b3f1ff",
        "variable": "var(--color-primary-100)"
      },
      "200": {
        "value": "#8deaff",
        "variable": "var(--color-primary-200)"
      },
      "300": {
        "value": "#66e4ff",
        "variable": "var(--color-primary-300)"
      },
      "400": {
        "value": "#40ddff",
        "variable": "var(--color-primary-400)"
      },
      "500": {
        "value": "#1ad6ff",
        "variable": "var(--color-primary-500)"
      },
      "600": {
        "value": "#00b9e1",
        "variable": "var(--color-primary-600)"
      },
      "700": {
        "value": "#008aa9",
        "variable": "var(--color-primary-700)"
      },
      "800": {
        "value": "#005c70",
        "variable": "var(--color-primary-800)"
      },
      "900": {
        "value": "#002e38",
        "variable": "var(--color-primary-900)"
      }
    },
    "secondary": {
      "50": {
        "value": "#fafafa",
        "variable": "var(--color-secondary-50)"
      },
      "100": {
        "value": "#f4f4f5",
        "variable": "var(--color-secondary-100)"
      },
      "200": {
        "value": "#e4e4e7",
        "variable": "var(--color-secondary-200)"
      },
      "300": {
        "value": "#D4d4d8",
        "variable": "var(--color-secondary-300)"
      },
      "400": {
        "value": "#a1a1aa",
        "variable": "var(--color-secondary-400)"
      },
      "500": {
        "value": "#71717A",
        "variable": "var(--color-secondary-500)"
      },
      "600": {
        "value": "#52525B",
        "variable": "var(--color-secondary-600)"
      },
      "700": {
        "value": "#3f3f46",
        "variable": "var(--color-secondary-700)"
      },
      "800": {
        "value": "#27272A",
        "variable": "var(--color-secondary-800)"
      },
      "900": {
        "value": "#18181B",
        "variable": "var(--color-secondary-900)"
      }
    },
    "white": {
      "value": "#ffffff",
      "variable": "var(--color-white)"
    },
    "black": {
      "value": "#0c0c0d",
      "variable": "var(--color-black)"
    },
    "gray": {
      "50": {
        "value": "#fafafa",
        "variable": "var(--color-gray-50)"
      },
      "100": {
        "value": "#f4f4f5",
        "variable": "var(--color-gray-100)"
      },
      "200": {
        "value": "#e4e4e7",
        "variable": "var(--color-gray-200)"
      },
      "300": {
        "value": "#D4d4d8",
        "variable": "var(--color-gray-300)"
      },
      "400": {
        "value": "#a1a1aa",
        "variable": "var(--color-gray-400)"
      },
      "500": {
        "value": "#71717A",
        "variable": "var(--color-gray-500)"
      },
      "600": {
        "value": "#52525B",
        "variable": "var(--color-gray-600)"
      },
      "700": {
        "value": "#3f3f46",
        "variable": "var(--color-gray-700)"
      },
      "800": {
        "value": "#27272A",
        "variable": "var(--color-gray-800)"
      },
      "900": {
        "value": "#18181B",
        "variable": "var(--color-gray-900)"
      }
    },
    "green": {
      "50": {
        "value": "#d6ffee",
        "variable": "var(--color-green-50)"
      },
      "100": {
        "value": "#acffdd",
        "variable": "var(--color-green-100)"
      },
      "200": {
        "value": "#83ffcc",
        "variable": "var(--color-green-200)"
      },
      "300": {
        "value": "#30ffaa",
        "variable": "var(--color-green-300)"
      },
      "400": {
        "value": "#00dc82",
        "variable": "var(--color-green-400)"
      },
      "500": {
        "value": "#00bd6f",
        "variable": "var(--color-green-500)"
      },
      "600": {
        "value": "#009d5d",
        "variable": "var(--color-green-600)"
      },
      "700": {
        "value": "#007e4a",
        "variable": "var(--color-green-700)"
      },
      "800": {
        "value": "#005e38",
        "variable": "var(--color-green-800)"
      },
      "900": {
        "value": "#003f25",
        "variable": "var(--color-green-900)"
      }
    },
    "yellow": {
      "50": {
        "value": "#fdf6db",
        "variable": "var(--color-yellow-50)"
      },
      "100": {
        "value": "#fcedb7",
        "variable": "var(--color-yellow-100)"
      },
      "200": {
        "value": "#fae393",
        "variable": "var(--color-yellow-200)"
      },
      "300": {
        "value": "#f8da70",
        "variable": "var(--color-yellow-300)"
      },
      "400": {
        "value": "#f7d14c",
        "variable": "var(--color-yellow-400)"
      },
      "500": {
        "value": "#f5c828",
        "variable": "var(--color-yellow-500)"
      },
      "600": {
        "value": "#daac0a",
        "variable": "var(--color-yellow-600)"
      },
      "700": {
        "value": "#a38108",
        "variable": "var(--color-yellow-700)"
      },
      "800": {
        "value": "#6d5605",
        "variable": "var(--color-yellow-800)"
      },
      "900": {
        "value": "#362b03",
        "variable": "var(--color-yellow-900)"
      }
    },
    "orange": {
      "50": {
        "value": "#ffe9d9",
        "variable": "var(--color-orange-50)"
      },
      "100": {
        "value": "#ffd3b3",
        "variable": "var(--color-orange-100)"
      },
      "200": {
        "value": "#ffbd8d",
        "variable": "var(--color-orange-200)"
      },
      "300": {
        "value": "#ffa666",
        "variable": "var(--color-orange-300)"
      },
      "400": {
        "value": "#ff9040",
        "variable": "var(--color-orange-400)"
      },
      "500": {
        "value": "#ff7a1a",
        "variable": "var(--color-orange-500)"
      },
      "600": {
        "value": "#e15e00",
        "variable": "var(--color-orange-600)"
      },
      "700": {
        "value": "#a94700",
        "variable": "var(--color-orange-700)"
      },
      "800": {
        "value": "#702f00",
        "variable": "var(--color-orange-800)"
      },
      "900": {
        "value": "#381800",
        "variable": "var(--color-orange-900)"
      }
    },
    "red": {
      "50": {
        "value": "#ffdbd9",
        "variable": "var(--color-red-50)"
      },
      "100": {
        "value": "#ffb7b3",
        "variable": "var(--color-red-100)"
      },
      "200": {
        "value": "#ff948d",
        "variable": "var(--color-red-200)"
      },
      "300": {
        "value": "#ff7066",
        "variable": "var(--color-red-300)"
      },
      "400": {
        "value": "#ff4c40",
        "variable": "var(--color-red-400)"
      },
      "500": {
        "value": "#ff281a",
        "variable": "var(--color-red-500)"
      },
      "600": {
        "value": "#e10e00",
        "variable": "var(--color-red-600)"
      },
      "700": {
        "value": "#a90a00",
        "variable": "var(--color-red-700)"
      },
      "800": {
        "value": "#700700",
        "variable": "var(--color-red-800)"
      },
      "900": {
        "value": "#380300",
        "variable": "var(--color-red-900)"
      }
    },
    "pear": {
      "50": {
        "value": "#f7f8dc",
        "variable": "var(--color-pear-50)"
      },
      "100": {
        "value": "#eff0ba",
        "variable": "var(--color-pear-100)"
      },
      "200": {
        "value": "#e8e997",
        "variable": "var(--color-pear-200)"
      },
      "300": {
        "value": "#e0e274",
        "variable": "var(--color-pear-300)"
      },
      "400": {
        "value": "#d8da52",
        "variable": "var(--color-pear-400)"
      },
      "500": {
        "value": "#d0d32f",
        "variable": "var(--color-pear-500)"
      },
      "600": {
        "value": "#a8aa24",
        "variable": "var(--color-pear-600)"
      },
      "700": {
        "value": "#7e801b",
        "variable": "var(--color-pear-700)"
      },
      "800": {
        "value": "#545512",
        "variable": "var(--color-pear-800)"
      },
      "900": {
        "value": "#2a2b09",
        "variable": "var(--color-pear-900)"
      }
    },
    "teal": {
      "50": {
        "value": "#d7faf8",
        "variable": "var(--color-teal-50)"
      },
      "100": {
        "value": "#aff4f0",
        "variable": "var(--color-teal-100)"
      },
      "200": {
        "value": "#87efe9",
        "variable": "var(--color-teal-200)"
      },
      "300": {
        "value": "#5fe9e1",
        "variable": "var(--color-teal-300)"
      },
      "400": {
        "value": "#36e4da",
        "variable": "var(--color-teal-400)"
      },
      "500": {
        "value": "#1cd1c6",
        "variable": "var(--color-teal-500)"
      },
      "600": {
        "value": "#16a79e",
        "variable": "var(--color-teal-600)"
      },
      "700": {
        "value": "#117d77",
        "variable": "var(--color-teal-700)"
      },
      "800": {
        "value": "#0b544f",
        "variable": "var(--color-teal-800)"
      },
      "900": {
        "value": "#062a28",
        "variable": "var(--color-teal-900)"
      }
    },
    "lightblue": {
      "50": {
        "value": "#d9f8ff",
        "variable": "var(--color-lightblue-50)"
      },
      "100": {
        "value": "#b3f1ff",
        "variable": "var(--color-lightblue-100)"
      },
      "200": {
        "value": "#8deaff",
        "variable": "var(--color-lightblue-200)"
      },
      "300": {
        "value": "#66e4ff",
        "variable": "var(--color-lightblue-300)"
      },
      "400": {
        "value": "#40ddff",
        "variable": "var(--color-lightblue-400)"
      },
      "500": {
        "value": "#1ad6ff",
        "variable": "var(--color-lightblue-500)"
      },
      "600": {
        "value": "#00b9e1",
        "variable": "var(--color-lightblue-600)"
      },
      "700": {
        "value": "#008aa9",
        "variable": "var(--color-lightblue-700)"
      },
      "800": {
        "value": "#005c70",
        "variable": "var(--color-lightblue-800)"
      },
      "900": {
        "value": "#002e38",
        "variable": "var(--color-lightblue-900)"
      }
    },
    "blue": {
      "50": {
        "value": "#d9f1ff",
        "variable": "var(--color-blue-50)"
      },
      "100": {
        "value": "#b3e4ff",
        "variable": "var(--color-blue-100)"
      },
      "200": {
        "value": "#8dd6ff",
        "variable": "var(--color-blue-200)"
      },
      "300": {
        "value": "#66c8ff",
        "variable": "var(--color-blue-300)"
      },
      "400": {
        "value": "#40bbff",
        "variable": "var(--color-blue-400)"
      },
      "500": {
        "value": "#1aadff",
        "variable": "var(--color-blue-500)"
      },
      "600": {
        "value": "#0090e1",
        "variable": "var(--color-blue-600)"
      },
      "700": {
        "value": "#006ca9",
        "variable": "var(--color-blue-700)"
      },
      "800": {
        "value": "#004870",
        "variable": "var(--color-blue-800)"
      },
      "900": {
        "value": "#002438",
        "variable": "var(--color-blue-900)"
      }
    },
    "indigoblue": {
      "50": {
        "value": "#d9e5ff",
        "variable": "var(--color-indigoblue-50)"
      },
      "100": {
        "value": "#b3cbff",
        "variable": "var(--color-indigoblue-100)"
      },
      "200": {
        "value": "#8db0ff",
        "variable": "var(--color-indigoblue-200)"
      },
      "300": {
        "value": "#6696ff",
        "variable": "var(--color-indigoblue-300)"
      },
      "400": {
        "value": "#407cff",
        "variable": "var(--color-indigoblue-400)"
      },
      "500": {
        "value": "#1a62ff",
        "variable": "var(--color-indigoblue-500)"
      },
      "600": {
        "value": "#0047e1",
        "variable": "var(--color-indigoblue-600)"
      },
      "700": {
        "value": "#0035a9",
        "variable": "var(--color-indigoblue-700)"
      },
      "800": {
        "value": "#002370",
        "variable": "var(--color-indigoblue-800)"
      },
      "900": {
        "value": "#001238",
        "variable": "var(--color-indigoblue-900)"
      }
    },
    "royalblue": {
      "50": {
        "value": "#dfdbfb",
        "variable": "var(--color-royalblue-50)"
      },
      "100": {
        "value": "#c0b7f7",
        "variable": "var(--color-royalblue-100)"
      },
      "200": {
        "value": "#a093f3",
        "variable": "var(--color-royalblue-200)"
      },
      "300": {
        "value": "#806ff0",
        "variable": "var(--color-royalblue-300)"
      },
      "400": {
        "value": "#614bec",
        "variable": "var(--color-royalblue-400)"
      },
      "500": {
        "value": "#4127e8",
        "variable": "var(--color-royalblue-500)"
      },
      "600": {
        "value": "#2c15c4",
        "variable": "var(--color-royalblue-600)"
      },
      "700": {
        "value": "#211093",
        "variable": "var(--color-royalblue-700)"
      },
      "800": {
        "value": "#160a62",
        "variable": "var(--color-royalblue-800)"
      },
      "900": {
        "value": "#0b0531",
        "variable": "var(--color-royalblue-900)"
      }
    },
    "purple": {
      "50": {
        "value": "#ead9ff",
        "variable": "var(--color-purple-50)"
      },
      "100": {
        "value": "#d5b3ff",
        "variable": "var(--color-purple-100)"
      },
      "200": {
        "value": "#c08dff",
        "variable": "var(--color-purple-200)"
      },
      "300": {
        "value": "#ab66ff",
        "variable": "var(--color-purple-300)"
      },
      "400": {
        "value": "#9640ff",
        "variable": "var(--color-purple-400)"
      },
      "500": {
        "value": "#811aff",
        "variable": "var(--color-purple-500)"
      },
      "600": {
        "value": "#6500e1",
        "variable": "var(--color-purple-600)"
      },
      "700": {
        "value": "#4c00a9",
        "variable": "var(--color-purple-700)"
      },
      "800": {
        "value": "#330070",
        "variable": "var(--color-purple-800)"
      },
      "900": {
        "value": "#190038",
        "variable": "var(--color-purple-900)"
      }
    },
    "pink": {
      "50": {
        "value": "#ffd9f2",
        "variable": "var(--color-pink-50)"
      },
      "100": {
        "value": "#ffb3e5",
        "variable": "var(--color-pink-100)"
      },
      "200": {
        "value": "#ff8dd8",
        "variable": "var(--color-pink-200)"
      },
      "300": {
        "value": "#ff66cc",
        "variable": "var(--color-pink-300)"
      },
      "400": {
        "value": "#ff40bf",
        "variable": "var(--color-pink-400)"
      },
      "500": {
        "value": "#ff1ab2",
        "variable": "var(--color-pink-500)"
      },
      "600": {
        "value": "#e10095",
        "variable": "var(--color-pink-600)"
      },
      "700": {
        "value": "#a90070",
        "variable": "var(--color-pink-700)"
      },
      "800": {
        "value": "#70004b",
        "variable": "var(--color-pink-800)"
      },
      "900": {
        "value": "#380025",
        "variable": "var(--color-pink-900)"
      }
    },
    "ruby": {
      "50": {
        "value": "#ffd9e4",
        "variable": "var(--color-ruby-50)"
      },
      "100": {
        "value": "#ffb3c9",
        "variable": "var(--color-ruby-100)"
      },
      "200": {
        "value": "#ff8dae",
        "variable": "var(--color-ruby-200)"
      },
      "300": {
        "value": "#ff6694",
        "variable": "var(--color-ruby-300)"
      },
      "400": {
        "value": "#ff4079",
        "variable": "var(--color-ruby-400)"
      },
      "500": {
        "value": "#ff1a5e",
        "variable": "var(--color-ruby-500)"
      },
      "600": {
        "value": "#e10043",
        "variable": "var(--color-ruby-600)"
      },
      "700": {
        "value": "#a90032",
        "variable": "var(--color-ruby-700)"
      },
      "800": {
        "value": "#700021",
        "variable": "var(--color-ruby-800)"
      },
      "900": {
        "value": "#380011",
        "variable": "var(--color-ruby-900)"
      }
    }
  },
  "elements": {
    "color": {
      "text": {
        "primary": {
          "default": {
            "value": {
              "initial": "#18181B",
              "dark": "#fafafa"
            },
            "variable": "var(--elements-color-text-primary-default)"
          },
          "hover": {}
        },
        "secondary": {
          "default": {
            "value": {
              "initial": "#71717A",
              "dark": "#a1a1aa"
            },
            "variable": "var(--elements-color-text-secondary-default)"
          },
          "hover": {
            "value": {
              "initial": "#3f3f46",
              "dark": "#e4e4e7"
            },
            "variable": "var(--elements-color-text-secondary-hover)"
          }
        }
      }
    },
    "container": {
      "maxWidth": {
        "value": "80rem",
        "variable": "var(--elements-container-maxWidth)"
      },
      "padding": {
        "mobile": {
          "value": "1rem",
          "variable": "var(--elements-container-padding-mobile)"
        },
        "xs": {
          "value": "1rem",
          "variable": "var(--elements-container-padding-xs)"
        },
        "sm": {
          "value": "1.5rem",
          "variable": "var(--elements-container-padding-sm)"
        },
        "md": {
          "value": "1.5rem",
          "variable": "var(--elements-container-padding-md)"
        }
      }
    },
    "backdrop": {
      "filter": {
        "value": "saturate(200%) blur(20px)",
        "variable": "var(--elements-backdrop-filter)"
      },
      "background": {
        "value": {
          "initial": "#fffc",
          "dark": "#0c0d0ccc"
        },
        "variable": "var(--elements-backdrop-background)"
      }
    },
    "border": {
      "primary": {
        "default": {
          "value": {
            "initial": "#f4f4f5",
            "dark": "#18181B"
          },
          "variable": "var(--elements-border-primary-default)"
        },
        "hover": {
          "value": {
            "initial": "#e4e4e7",
            "dark": "#27272A"
          },
          "variable": "var(--elements-border-primary-hover)"
        }
      },
      "secondary": {
        "default": {
          "value": {
            "initial": "#e4e4e7",
            "dark": "#27272A"
          },
          "variable": "var(--elements-border-secondary-default)"
        },
        "hover": {
          "value": {
            "initial": "",
            "dark": ""
          },
          "variable": "var(--elements-border-secondary-hover)"
        }
      }
    },
    "surface": {
      "background": {
        "base": {
          "value": {
            "initial": "#f4f4f5",
            "dark": "#18181B"
          },
          "variable": "var(--elements-surface-background-base)"
        }
      }
    },
    "state": {
      "primary": {
        "color": {
          "primary": {
            "value": {
              "initial": "#00b9e1",
              "dark": "#40ddff"
            },
            "variable": "var(--elements-state-primary-color-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#008aa9",
              "dark": "#8deaff"
            },
            "variable": "var(--elements-state-primary-color-secondary)"
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "#d9f8ff",
              "dark": "#002e38"
            },
            "variable": "var(--elements-state-primary-backgroundColor-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#b3f1ff",
              "dark": "#005c70"
            },
            "variable": "var(--elements-state-primary-backgroundColor-secondary)"
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "#b3f1ff",
              "dark": "#005c70"
            },
            "variable": "var(--elements-state-primary-borderColor-primary)"
          },
          "secondary": {}
        }
      },
      "info": {
        "color": {
          "primary": {
            "value": {
              "initial": "#1aadff",
              "dark": "#40bbff"
            },
            "variable": "var(--elements-state-info-color-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#0090e1",
              "dark": "#8dd6ff"
            },
            "variable": "var(--elements-state-info-color-secondary)"
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "#d9f1ff",
              "dark": "#002438"
            },
            "variable": "var(--elements-state-info-backgroundColor-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#b3e4ff",
              "dark": "#004870"
            },
            "variable": "var(--elements-state-info-backgroundColor-secondary)"
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "#b3e4ff",
              "dark": "#004870"
            },
            "variable": "var(--elements-state-info-borderColor-primary)"
          },
          "secondary": {}
        }
      },
      "success": {
        "color": {
          "primary": {
            "value": {
              "initial": "#00bd6f",
              "dark": "#00dc82"
            },
            "variable": "var(--elements-state-success-color-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#009d5d",
              "dark": "#83ffcc"
            },
            "variable": "var(--elements-state-success-color-secondary)"
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "#d6ffee",
              "dark": "#003f25"
            },
            "variable": "var(--elements-state-success-backgroundColor-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#acffdd",
              "dark": "#005e38"
            },
            "variable": "var(--elements-state-success-backgroundColor-secondary)"
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "#acffdd",
              "dark": "#005e38"
            },
            "variable": "var(--elements-state-success-borderColor-primary)"
          },
          "secondary": {}
        }
      },
      "warning": {
        "color": {
          "primary": {
            "value": {
              "initial": "#daac0a",
              "dark": "#f7d14c"
            },
            "variable": "var(--elements-state-warning-color-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#a38108",
              "dark": "#fae393"
            },
            "variable": "var(--elements-state-warning-color-secondary)"
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "#fdf6db",
              "dark": "#362b03"
            },
            "variable": "var(--elements-state-warning-backgroundColor-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#fcedb7",
              "dark": "#6d5605"
            },
            "variable": "var(--elements-state-warning-backgroundColor-secondary)"
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "#fcedb7",
              "dark": "#6d5605"
            },
            "variable": "var(--elements-state-warning-borderColor-primary)"
          },
          "secondary": {}
        }
      },
      "danger": {
        "color": {
          "primary": {
            "value": {
              "initial": "#ff281a",
              "dark": "#ff7066"
            },
            "variable": "var(--elements-state-danger-color-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#e10e00",
              "dark": "#ff948d"
            },
            "variable": "var(--elements-state-danger-color-secondary)"
          }
        },
        "backgroundColor": {
          "primary": {
            "value": {
              "initial": "#ffdbd9",
              "dark": "#380300"
            },
            "variable": "var(--elements-state-danger-backgroundColor-primary)"
          },
          "secondary": {
            "value": {
              "initial": "#ffb7b3",
              "dark": "#700700"
            },
            "variable": "var(--elements-state-danger-backgroundColor-secondary)"
          }
        },
        "borderColor": {
          "primary": {
            "value": {
              "initial": "#ffb7b3",
              "dark": "#700700"
            },
            "variable": "var(--elements-state-danger-borderColor-primary)"
          },
          "secondary": {}
        }
      }
    }
  },
  "typography": {
    "verticalMargin": {
      "sm": {
        "value": "16px",
        "variable": "var(--typography-verticalMargin-sm)"
      },
      "base": {
        "value": "32px",
        "variable": "var(--typography-verticalMargin-base)"
      }
    },
    "letterSpacing": {
      "tight": {
        "value": "-0.025em",
        "variable": "var(--typography-letterSpacing-tight)"
      },
      "wide": {
        "value": "0.025em",
        "variable": "var(--typography-letterSpacing-wide)"
      }
    },
    "fontSize": {
      "xs": {
        "value": "12px",
        "variable": "var(--typography-fontSize-xs)"
      },
      "sm": {
        "value": "14px",
        "variable": "var(--typography-fontSize-sm)"
      },
      "base": {
        "value": "16px",
        "variable": "var(--typography-fontSize-base)"
      },
      "lg": {
        "value": "18px",
        "variable": "var(--typography-fontSize-lg)"
      },
      "xl": {
        "value": "20px",
        "variable": "var(--typography-fontSize-xl)"
      },
      "2xl": {
        "value": "24px",
        "variable": "var(--typography-fontSize-2xl)"
      },
      "3xl": {
        "value": "30px",
        "variable": "var(--typography-fontSize-3xl)"
      },
      "4xl": {
        "value": "36px",
        "variable": "var(--typography-fontSize-4xl)"
      },
      "5xl": {
        "value": "48px",
        "variable": "var(--typography-fontSize-5xl)"
      },
      "6xl": {
        "value": "60px",
        "variable": "var(--typography-fontSize-6xl)"
      },
      "7xl": {
        "value": "72px",
        "variable": "var(--typography-fontSize-7xl)"
      },
      "8xl": {
        "value": "96px",
        "variable": "var(--typography-fontSize-8xl)"
      },
      "9xl": {
        "value": "128px",
        "variable": "var(--typography-fontSize-9xl)"
      }
    },
    "fontWeight": {
      "thin": {
        "value": "100",
        "variable": "var(--typography-fontWeight-thin)"
      },
      "extralight": {
        "value": "200",
        "variable": "var(--typography-fontWeight-extralight)"
      },
      "light": {
        "value": "300",
        "variable": "var(--typography-fontWeight-light)"
      },
      "normal": {
        "value": "400",
        "variable": "var(--typography-fontWeight-normal)"
      },
      "medium": {
        "value": "500",
        "variable": "var(--typography-fontWeight-medium)"
      },
      "semibold": {
        "value": "600",
        "variable": "var(--typography-fontWeight-semibold)"
      },
      "bold": {
        "value": "700",
        "variable": "var(--typography-fontWeight-bold)"
      },
      "extrabold": {
        "value": "800",
        "variable": "var(--typography-fontWeight-extrabold)"
      },
      "black": {
        "value": "900",
        "variable": "var(--typography-fontWeight-black)"
      }
    },
    "lead": {
      "none": {
        "value": "1",
        "variable": "var(--typography-lead-none)"
      },
      "tight": {
        "value": "1.25",
        "variable": "var(--typography-lead-tight)"
      },
      "snug": {
        "value": "1.375",
        "variable": "var(--typography-lead-snug)"
      },
      "normal": {
        "value": "1.5",
        "variable": "var(--typography-lead-normal)"
      },
      "relaxed": {
        "value": "1.625",
        "variable": "var(--typography-lead-relaxed)"
      },
      "loose": {
        "value": "2",
        "variable": "var(--typography-lead-loose)"
      }
    },
    "color": {
      "primary": {
        "50": {
          "value": "#d9f8ff",
          "variable": "var(--typography-color-primary-50)"
        },
        "100": {
          "value": "#b3f1ff",
          "variable": "var(--typography-color-primary-100)"
        },
        "200": {
          "value": "#8deaff",
          "variable": "var(--typography-color-primary-200)"
        },
        "300": {
          "value": "#66e4ff",
          "variable": "var(--typography-color-primary-300)"
        },
        "400": {
          "value": "#40ddff",
          "variable": "var(--typography-color-primary-400)"
        },
        "500": {
          "value": "#1ad6ff",
          "variable": "var(--typography-color-primary-500)"
        },
        "600": {
          "value": "#00b9e1",
          "variable": "var(--typography-color-primary-600)"
        },
        "700": {
          "value": "#008aa9",
          "variable": "var(--typography-color-primary-700)"
        },
        "800": {
          "value": "#005c70",
          "variable": "var(--typography-color-primary-800)"
        },
        "900": {
          "value": "#002e38",
          "variable": "var(--typography-color-primary-900)"
        }
      },
      "secondary": {
        "50": {
          "value": "#fafafa",
          "variable": "var(--typography-color-secondary-50)"
        },
        "100": {
          "value": "#f4f4f5",
          "variable": "var(--typography-color-secondary-100)"
        },
        "200": {
          "value": "#e4e4e7",
          "variable": "var(--typography-color-secondary-200)"
        },
        "300": {
          "value": "#D4d4d8",
          "variable": "var(--typography-color-secondary-300)"
        },
        "400": {
          "value": "#a1a1aa",
          "variable": "var(--typography-color-secondary-400)"
        },
        "500": {
          "value": "#71717A",
          "variable": "var(--typography-color-secondary-500)"
        },
        "600": {
          "value": "#52525B",
          "variable": "var(--typography-color-secondary-600)"
        },
        "700": {
          "value": "#3f3f46",
          "variable": "var(--typography-color-secondary-700)"
        },
        "800": {
          "value": "#27272A",
          "variable": "var(--typography-color-secondary-800)"
        },
        "900": {
          "value": "#18181B",
          "variable": "var(--typography-color-secondary-900)"
        }
      }
    }
  },
  "prose": {
    "p": {
      "fontSize": {
        "value": "16px",
        "variable": "var(--prose-p-fontSize)"
      },
      "lineHeight": {
        "value": "1.5",
        "variable": "var(--prose-p-lineHeight)"
      },
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-p-margin)"
      },
      "br": {
        "margin": {
          "value": "32px 0 0 0",
          "variable": "var(--prose-p-br-margin)"
        }
      }
    },
    "h1": {
      "margin": {
        "value": "0 0 2rem",
        "variable": "var(--prose-h1-margin)"
      },
      "fontSize": {
        "value": "48px",
        "variable": "var(--prose-h1-fontSize)"
      },
      "lineHeight": {
        "value": "1.25",
        "variable": "var(--prose-h1-lineHeight)"
      },
      "fontWeight": {
        "value": "700",
        "variable": "var(--prose-h1-fontWeight)"
      },
      "letterSpacing": {
        "value": "-0.025em",
        "variable": "var(--prose-h1-letterSpacing)"
      },
      "iconSize": {
        "value": "30px",
        "variable": "var(--prose-h1-iconSize)"
      }
    },
    "h2": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h2-margin)"
      },
      "fontSize": {
        "value": "36px",
        "variable": "var(--prose-h2-fontSize)"
      },
      "lineHeight": {
        "value": "1.25",
        "variable": "var(--prose-h2-lineHeight)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-h2-fontWeight)"
      },
      "letterSpacing": {
        "value": "-0.025em",
        "variable": "var(--prose-h2-letterSpacing)"
      },
      "iconSize": {
        "value": "24px",
        "variable": "var(--prose-h2-iconSize)"
      }
    },
    "h3": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h3-margin)"
      },
      "fontSize": {
        "value": "30px",
        "variable": "var(--prose-h3-fontSize)"
      },
      "lineHeight": {
        "value": "1.375",
        "variable": "var(--prose-h3-lineHeight)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-h3-fontWeight)"
      },
      "letterSpacing": {
        "value": "-0.025em",
        "variable": "var(--prose-h3-letterSpacing)"
      },
      "iconSize": {
        "value": "20px",
        "variable": "var(--prose-h3-iconSize)"
      }
    },
    "h4": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h4-margin)"
      },
      "fontSize": {
        "value": "24px",
        "variable": "var(--prose-h4-fontSize)"
      },
      "lineHeight": {
        "value": "1.375",
        "variable": "var(--prose-h4-lineHeight)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-h4-fontWeight)"
      },
      "letterSpacing": {
        "value": "-0.025em",
        "variable": "var(--prose-h4-letterSpacing)"
      },
      "iconSize": {
        "value": "18px",
        "variable": "var(--prose-h4-iconSize)"
      }
    },
    "h5": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h5-margin)"
      },
      "fontSize": {
        "value": "20px",
        "variable": "var(--prose-h5-fontSize)"
      },
      "lineHeight": {
        "value": "1.375",
        "variable": "var(--prose-h5-lineHeight)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-h5-fontWeight)"
      },
      "iconSize": {
        "value": "18px",
        "variable": "var(--prose-h5-iconSize)"
      }
    },
    "h6": {
      "margin": {
        "value": "3rem 0 2rem",
        "variable": "var(--prose-h6-margin)"
      },
      "fontSize": {
        "value": "18px",
        "variable": "var(--prose-h6-fontSize)"
      },
      "lineHeight": {
        "value": "1.5",
        "variable": "var(--prose-h6-lineHeight)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-h6-fontWeight)"
      },
      "iconSize": {
        "value": "16px",
        "variable": "var(--prose-h6-iconSize)"
      }
    },
    "strong": {
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-strong-fontWeight)"
      }
    },
    "img": {
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-img-margin)"
      }
    },
    "a": {
      "textDecoration": {
        "value": "none",
        "variable": "var(--prose-a-textDecoration)"
      },
      "color": {
        "light": {
          "default": {
            "value": "inherit",
            "variable": "var(--prose-a-color-light-default)"
          },
          "hover": {
            "value": "#1ad6ff",
            "variable": "var(--prose-a-color-light-hover)"
          }
        },
        "dark": {
          "default": {
            "value": "inherit",
            "variable": "var(--prose-a-color-dark-default)"
          },
          "hover": {
            "value": "#40ddff",
            "variable": "var(--prose-a-color-dark-hover)"
          }
        }
      },
      "borderBottom": {
        "value": "1px dashed #a1a1aa",
        "variable": "var(--prose-a-borderBottom)"
      },
      "borderWidth": {
        "value": "1px",
        "variable": "var(--prose-a-borderWidth)"
      },
      "borderColor": {
        "light": {
          "default": {
            "value": "#a1a1aa",
            "variable": "var(--prose-a-borderColor-light-default)"
          },
          "hover": {
            "value": "#1ad6ff",
            "variable": "var(--prose-a-borderColor-light-hover)"
          }
        },
        "dark": {
          "default": {
            "value": "#a1a1aa",
            "variable": "var(--prose-a-borderColor-dark-default)"
          },
          "hover": {
            "value": "#1ad6ff",
            "variable": "var(--prose-a-borderColor-dark-hover)"
          }
        }
      },
      "borderStyle": {
        "default": {
          "value": "dashed",
          "variable": "var(--prose-a-borderStyle-default)"
        },
        "hover": {
          "value": "solid",
          "variable": "var(--prose-a-borderStyle-hover)"
        }
      },
      "borderDistance": {
        "value": "2px",
        "variable": "var(--prose-a-borderDistance)"
      },
      "fontWeight": {
        "value": "500",
        "variable": "var(--prose-a-fontWeight)"
      },
      "hasCode": {
        "borderBottom": {
          "value": "none",
          "variable": "var(--prose-a-hasCode-borderBottom)"
        }
      },
      "code": {
        "border": {
          "value": "1px dashed #a1a1aa",
          "variable": "var(--prose-a-code-border)"
        },
        "borderColor": {
          "light": {
            "default": {
              "value": "#a1a1aa",
              "variable": "var(--prose-a-code-borderColor-light-default)"
            },
            "hover": {
              "value": "#1ad6ff",
              "variable": "var(--prose-a-code-borderColor-light-hover)"
            }
          },
          "dark": {
            "default": {
              "value": "#52525B",
              "variable": "var(--prose-a-code-borderColor-dark-default)"
            },
            "hover": {
              "value": "#00b9e1",
              "variable": "var(--prose-a-code-borderColor-dark-hover)"
            }
          }
        },
        "color": {
          "light": {
            "hover": {
              "value": "#1ad6ff",
              "variable": "var(--prose-a-code-color-light-hover)"
            }
          },
          "dark": {
            "hover": {
              "value": "#66e4ff",
              "variable": "var(--prose-a-code-color-dark-hover)"
            }
          }
        },
        "background": {
          "light": {
            "hover": {
              "value": "#d9f8ff",
              "variable": "var(--prose-a-code-background-light-hover)"
            }
          },
          "dark": {
            "hover": {
              "value": "#002e38",
              "variable": "var(--prose-a-code-background-dark-hover)"
            }
          }
        }
      }
    },
    "blockquote": {
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-blockquote-margin)"
      },
      "padding": {
        "value": "0 0 0 24px",
        "variable": "var(--prose-blockquote-padding)"
      },
      "quotes": {
        "value": "'201C' '201D' '2018' '2019'",
        "variable": "var(--prose-blockquote-quotes)"
      },
      "color": {
        "light": {
          "value": "#71717A",
          "variable": "var(--prose-blockquote-color-light)"
        },
        "dark": {
          "value": "#a1a1aa",
          "variable": "var(--prose-blockquote-color-dark)"
        }
      },
      "borderLeft": {
        "value": "1px solid #e4e4e7",
        "variable": "var(--prose-blockquote-borderLeft)"
      },
      "borderColor": {
        "light": {
          "value": "#e4e4e7",
          "variable": "var(--prose-blockquote-borderColor-light)"
        },
        "dark": {
          "value": "#3f3f46",
          "variable": "var(--prose-blockquote-borderColor-dark)"
        }
      }
    },
    "ul": {
      "listStyleType": {
        "value": "disc",
        "variable": "var(--prose-ul-listStyleType)"
      },
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-ul-margin)"
      },
      "padding": {
        "value": "0 0 0 21px",
        "variable": "var(--prose-ul-padding)"
      },
      "li": {
        "markerColor": {
          "light": {
            "value": "#D4d4d8",
            "variable": "var(--prose-ul-li-markerColor-light)"
          },
          "dark": {
            "value": "#27272A",
            "variable": "var(--prose-ul-li-markerColor-dark)"
          }
        }
      }
    },
    "ol": {
      "listStyleType": {
        "value": "decimal",
        "variable": "var(--prose-ol-listStyleType)"
      },
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-ol-margin)"
      },
      "padding": {
        "value": "0 0 0 21px",
        "variable": "var(--prose-ol-padding)"
      },
      "li": {
        "markerColor": {
          "light": {
            "value": "#71717A",
            "variable": "var(--prose-ol-li-markerColor-light)"
          },
          "dark": {
            "value": "#71717A",
            "variable": "var(--prose-ol-li-markerColor-dark)"
          }
        }
      }
    },
    "li": {
      "margin": {
        "value": "16px 0",
        "variable": "var(--prose-li-margin)"
      },
      "listStylePosition": {
        "value": "outside",
        "variable": "var(--prose-li-listStylePosition)"
      }
    },
    "hr": {
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-hr-margin)"
      },
      "style": {
        "value": "solid",
        "variable": "var(--prose-hr-style)"
      },
      "width": {
        "value": "1px",
        "variable": "var(--prose-hr-width)"
      },
      "color": {
        "light": {
          "value": "#e4e4e7",
          "variable": "var(--prose-hr-color-light)"
        },
        "dark": {
          "value": "#27272A",
          "variable": "var(--prose-hr-color-dark)"
        }
      }
    },
    "table": {
      "margin": {
        "value": "32px 0",
        "variable": "var(--prose-table-margin)"
      },
      "textAlign": {
        "value": "left",
        "variable": "var(--prose-table-textAlign)"
      },
      "fontSize": {
        "value": "14px",
        "variable": "var(--prose-table-fontSize)"
      },
      "lineHeight": {
        "value": "inherit",
        "variable": "var(--prose-table-lineHeight)"
      }
    },
    "thead": {
      "border": {
        "value": "none",
        "variable": "var(--prose-thead-border)"
      },
      "borderBottom": {
        "value": "1px solid #D4d4d8",
        "variable": "var(--prose-thead-borderBottom)"
      },
      "borderColor": {
        "light": {
          "value": "#D4d4d8",
          "variable": "var(--prose-thead-borderColor-light)"
        },
        "dark": {
          "value": "#52525B",
          "variable": "var(--prose-thead-borderColor-dark)"
        }
      }
    },
    "th": {
      "color": {
        "light": {
          "value": "#52525B",
          "variable": "var(--prose-th-color-light)"
        },
        "dark": {
          "value": "#a1a1aa",
          "variable": "var(--prose-th-color-dark)"
        }
      },
      "padding": {
        "value": "0 16px 16px 16px",
        "variable": "var(--prose-th-padding)"
      },
      "fontWeight": {
        "value": "600",
        "variable": "var(--prose-th-fontWeight)"
      }
    },
    "tbody": {
      "tr": {
        "borderBottom": {
          "value": "1px dashed #D4d4d8",
          "variable": "var(--prose-tbody-tr-borderBottom)"
        },
        "borderColor": {
          "light": {
            "value": "#D4d4d8",
            "variable": "var(--prose-tbody-tr-borderColor-light)"
          },
          "dark": {
            "value": "#3f3f46",
            "variable": "var(--prose-tbody-tr-borderColor-dark)"
          }
        }
      },
      "td": {
        "padding": {
          "value": "16px",
          "variable": "var(--prose-tbody-td-padding)"
        }
      },
      "code": {
        "inline": {
          "fontSize": {
            "value": "14px",
            "variable": "var(--prose-tbody-code-inline-fontSize)"
          }
        }
      }
    },
    "code": {
      "block": {
        "fontSize": {
          "value": "14px",
          "variable": "var(--prose-code-block-fontSize)"
        },
        "margin": {
          "value": "32px 0",
          "variable": "var(--prose-code-block-margin)"
        },
        "borderColor": {
          "light": {
            "value": "#e4e4e7",
            "variable": "var(--prose-code-block-borderColor-light)"
          },
          "dark": {
            "value": "#27272A",
            "variable": "var(--prose-code-block-borderColor-dark)"
          }
        },
        "color": {
          "light": {
            "value": "#3f3f46",
            "variable": "var(--prose-code-block-color-light)"
          },
          "dark": {
            "value": "#e4e4e7",
            "variable": "var(--prose-code-block-color-dark)"
          }
        },
        "backgroundColor": {
          "light": {
            "value": "#f4f4f5",
            "variable": "var(--prose-code-block-backgroundColor-light)"
          },
          "dark": {
            "value": "#18181B",
            "variable": "var(--prose-code-block-backgroundColor-dark)"
          }
        },
        "pre": {
          "padding": {
            "value": "16px",
            "variable": "var(--prose-code-block-pre-padding)"
          }
        }
      },
      "inline": {
        "borderRadius": {
          "value": "0.375rem",
          "variable": "var(--prose-code-inline-borderRadius)"
        },
        "padding": {
          "value": "0.25rem 0.375rem 0.25rem 0.375rem",
          "variable": "var(--prose-code-inline-padding)"
        },
        "fontSize": {
          "value": "14px",
          "variable": "var(--prose-code-inline-fontSize)"
        },
        "fontWeight": {
          "value": "400",
          "variable": "var(--prose-code-inline-fontWeight)"
        },
        "color": {
          "light": {
            "value": "#3f3f46",
            "variable": "var(--prose-code-inline-color-light)"
          },
          "dark": {
            "value": "#e4e4e7",
            "variable": "var(--prose-code-inline-color-dark)"
          }
        },
        "backgroundColor": {
          "light": {
            "value": "#f4f4f5",
            "variable": "var(--prose-code-inline-backgroundColor-light)"
          },
          "dark": {
            "value": "#27272A",
            "variable": "var(--prose-code-inline-backgroundColor-dark)"
          }
        }
      }
    }
  },
  "docus": {
    "header": {
      "height": {
        "value": "64px",
        "variable": "var(--docus-header-height)"
      }
    },
    "footer": {
      "padding": {
        "value": "1rem 0",
        "variable": "var(--docus-footer-padding)"
      }
    },
    "readableLine": {
      "value": "78ch",
      "variable": "var(--docus-readableLine)"
    }
  },
  "colors": {
    "primary": {
      "50": {
        "value": "#ffedcc",
        "variable": "var(--colors-primary-50)"
      },
      "100": {
        "value": "#ffdd9f",
        "variable": "var(--colors-primary-100)"
      },
      "200": {
        "value": "#ffcd71",
        "variable": "var(--colors-primary-200)"
      },
      "300": {
        "value": "#ffbd44",
        "variable": "var(--colors-primary-300)"
      },
      "400": {
        "value": "#ffad17",
        "variable": "var(--colors-primary-400)"
      },
      "500": {
        "value": "orange",
        "variable": "var(--colors-primary-500)"
      },
      "600": {
        "value": "#bb7900",
        "variable": "var(--colors-primary-600)"
      },
      "700": {
        "value": "#8e5c00",
        "variable": "var(--colors-primary-700)"
      },
      "800": {
        "value": "#603e00",
        "variable": "var(--colors-primary-800)"
      },
      "900": {
        "value": "#332100",
        "variable": "var(--colors-primary-900)"
      }
    }
  },
  "width": {
    "screen": {
      "value": "100vw",
      "variable": "var(--width-screen)"
    }
  },
  "height": {
    "screen": {
      "value": "100vh",
      "variable": "var(--height-screen)"
    }
  },
  "shadow": {
    "xs": {
      "value": "0px 1px 2px 0px #000000",
      "variable": "var(--shadow-xs)"
    },
    "sm": {
      "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000",
      "variable": "var(--shadow-sm)"
    },
    "md": {
      "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000",
      "variable": "var(--shadow-md)"
    },
    "lg": {
      "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000",
      "variable": "var(--shadow-lg)"
    },
    "xl": {
      "value": "0px 20px 25px -5px #a1a1aa, 0px 8px 10px -6px #000000",
      "variable": "var(--shadow-xl)"
    },
    "2xl": {
      "value": "0px 25px 50px -12px #18181B",
      "variable": "var(--shadow-2xl)"
    },
    "none": {
      "value": "0px 0px 0px 0px transparent",
      "variable": "var(--shadow-none)"
    }
  },
  "radii": {
    "none": {
      "value": "0px",
      "variable": "var(--radii-none)"
    },
    "2xs": {
      "value": "0.125rem",
      "variable": "var(--radii-2xs)"
    },
    "xs": {
      "value": "0.25rem",
      "variable": "var(--radii-xs)"
    },
    "sm": {
      "value": "0.375rem",
      "variable": "var(--radii-sm)"
    },
    "md": {
      "value": "0.5rem",
      "variable": "var(--radii-md)"
    },
    "lg": {
      "value": "0.75rem",
      "variable": "var(--radii-lg)"
    },
    "xl": {
      "value": "1rem",
      "variable": "var(--radii-xl)"
    },
    "2xl": {
      "value": "1.5rem",
      "variable": "var(--radii-2xl)"
    },
    "3xl": {
      "value": "1.75rem",
      "variable": "var(--radii-3xl)"
    },
    "full": {
      "value": "9999px",
      "variable": "var(--radii-full)"
    }
  },
  "size": {
    "0": {
      "value": "0px",
      "variable": "var(--size-0)"
    },
    "2": {
      "value": "2px",
      "variable": "var(--size-2)"
    },
    "4": {
      "value": "4px",
      "variable": "var(--size-4)"
    },
    "6": {
      "value": "6px",
      "variable": "var(--size-6)"
    },
    "8": {
      "value": "8px",
      "variable": "var(--size-8)"
    },
    "12": {
      "value": "12px",
      "variable": "var(--size-12)"
    },
    "16": {
      "value": "16px",
      "variable": "var(--size-16)"
    },
    "20": {
      "value": "20px",
      "variable": "var(--size-20)"
    },
    "24": {
      "value": "24px",
      "variable": "var(--size-24)"
    },
    "32": {
      "value": "32px",
      "variable": "var(--size-32)"
    },
    "40": {
      "value": "40px",
      "variable": "var(--size-40)"
    },
    "48": {
      "value": "48px",
      "variable": "var(--size-48)"
    },
    "56": {
      "value": "56px",
      "variable": "var(--size-56)"
    },
    "64": {
      "value": "64px",
      "variable": "var(--size-64)"
    },
    "80": {
      "value": "80px",
      "variable": "var(--size-80)"
    },
    "104": {
      "value": "104px",
      "variable": "var(--size-104)"
    },
    "200": {
      "value": "200px",
      "variable": "var(--size-200)"
    },
    "xs": {
      "value": "20rem",
      "variable": "var(--size-xs)"
    },
    "sm": {
      "value": "24rem",
      "variable": "var(--size-sm)"
    },
    "md": {
      "value": "28rem",
      "variable": "var(--size-md)"
    },
    "lg": {
      "value": "32rem",
      "variable": "var(--size-lg)"
    },
    "xl": {
      "value": "36rem",
      "variable": "var(--size-xl)"
    },
    "2xl": {
      "value": "42rem",
      "variable": "var(--size-2xl)"
    },
    "3xl": {
      "value": "48rem",
      "variable": "var(--size-3xl)"
    },
    "4xl": {
      "value": "56rem",
      "variable": "var(--size-4xl)"
    },
    "5xl": {
      "value": "64rem",
      "variable": "var(--size-5xl)"
    },
    "6xl": {
      "value": "72rem",
      "variable": "var(--size-6xl)"
    },
    "7xl": {
      "value": "80rem",
      "variable": "var(--size-7xl)"
    },
    "full": {
      "value": "100%",
      "variable": "var(--size-full)"
    }
  },
  "space": {
    "0": {
      "value": "0px",
      "variable": "var(--space-0)"
    },
    "1": {
      "value": "0.25rem",
      "variable": "var(--space-1)"
    },
    "2": {
      "value": "0.5rem",
      "variable": "var(--space-2)"
    },
    "3": {
      "value": "0.75rem",
      "variable": "var(--space-3)"
    },
    "4": {
      "value": "1rem",
      "variable": "var(--space-4)"
    },
    "5": {
      "value": "1.25rem",
      "variable": "var(--space-5)"
    },
    "6": {
      "value": "1.5rem",
      "variable": "var(--space-6)"
    },
    "7": {
      "value": "1.75rem",
      "variable": "var(--space-7)"
    },
    "8": {
      "value": "2rem",
      "variable": "var(--space-8)"
    },
    "9": {
      "value": "2.25rem",
      "variable": "var(--space-9)"
    },
    "10": {
      "value": "2.5rem",
      "variable": "var(--space-10)"
    },
    "11": {
      "value": "2.75rem",
      "variable": "var(--space-11)"
    },
    "12": {
      "value": "3rem",
      "variable": "var(--space-12)"
    },
    "14": {
      "value": "3.5rem",
      "variable": "var(--space-14)"
    },
    "16": {
      "value": "4rem",
      "variable": "var(--space-16)"
    },
    "20": {
      "value": "5rem",
      "variable": "var(--space-20)"
    },
    "24": {
      "value": "6rem",
      "variable": "var(--space-24)"
    },
    "28": {
      "value": "7rem",
      "variable": "var(--space-28)"
    },
    "32": {
      "value": "8rem",
      "variable": "var(--space-32)"
    },
    "36": {
      "value": "9rem",
      "variable": "var(--space-36)"
    },
    "40": {
      "value": "10rem",
      "variable": "var(--space-40)"
    },
    "44": {
      "value": "11rem",
      "variable": "var(--space-44)"
    },
    "48": {
      "value": "12rem",
      "variable": "var(--space-48)"
    },
    "52": {
      "value": "13rem",
      "variable": "var(--space-52)"
    },
    "56": {
      "value": "14rem",
      "variable": "var(--space-56)"
    },
    "60": {
      "value": "15rem",
      "variable": "var(--space-60)"
    },
    "64": {
      "value": "16rem",
      "variable": "var(--space-64)"
    },
    "72": {
      "value": "18rem",
      "variable": "var(--space-72)"
    },
    "80": {
      "value": "20rem",
      "variable": "var(--space-80)"
    },
    "96": {
      "value": "24rem",
      "variable": "var(--space-96)"
    },
    "px": {
      "value": "1px",
      "variable": "var(--space-px)"
    },
    "rem": {
      "125": {
        "value": "0.125rem",
        "variable": "var(--space-rem-125)"
      },
      "375": {
        "value": "0.375rem",
        "variable": "var(--space-rem-375)"
      },
      "625": {
        "value": "0.625rem",
        "variable": "var(--space-rem-625)"
      },
      "875": {
        "value": "0.875rem",
        "variable": "var(--space-rem-875)"
      }
    }
  },
  "borderWidth": {
    "noBorder": {
      "value": "0",
      "variable": "var(--borderWidth-noBorder)"
    },
    "sm": {
      "value": "1px",
      "variable": "var(--borderWidth-sm)"
    },
    "md": {
      "value": "2px",
      "variable": "var(--borderWidth-md)"
    },
    "lg": {
      "value": "3px",
      "variable": "var(--borderWidth-lg)"
    }
  },
  "opacity": {
    "noOpacity": {
      "value": "0",
      "variable": "var(--opacity-noOpacity)"
    },
    "bright": {
      "value": "0.1",
      "variable": "var(--opacity-bright)"
    },
    "light": {
      "value": "0.15",
      "variable": "var(--opacity-light)"
    },
    "soft": {
      "value": "0.3",
      "variable": "var(--opacity-soft)"
    },
    "medium": {
      "value": "0.5",
      "variable": "var(--opacity-medium)"
    },
    "high": {
      "value": "0.8",
      "variable": "var(--opacity-high)"
    },
    "total": {
      "value": "1",
      "variable": "var(--opacity-total)"
    }
  },
  "font": {
    "sans": {
      "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
      "variable": "var(--font-sans)"
    },
    "serif": {
      "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif",
      "variable": "var(--font-serif)"
    },
    "mono": {
      "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      "variable": "var(--font-mono)"
    }
  },
  "fontWeight": {
    "thin": {
      "value": "100",
      "variable": "var(--fontWeight-thin)"
    },
    "extralight": {
      "value": "200",
      "variable": "var(--fontWeight-extralight)"
    },
    "light": {
      "value": "300",
      "variable": "var(--fontWeight-light)"
    },
    "normal": {
      "value": "400",
      "variable": "var(--fontWeight-normal)"
    },
    "medium": {
      "value": "500",
      "variable": "var(--fontWeight-medium)"
    },
    "semibold": {
      "value": "600",
      "variable": "var(--fontWeight-semibold)"
    },
    "bold": {
      "value": "700",
      "variable": "var(--fontWeight-bold)"
    },
    "extrabold": {
      "value": "800",
      "variable": "var(--fontWeight-extrabold)"
    },
    "black": {
      "value": "900",
      "variable": "var(--fontWeight-black)"
    }
  },
  "fontSize": {
    "xs": {
      "value": "0.75rem",
      "variable": "var(--fontSize-xs)"
    },
    "sm": {
      "value": "0.875rem",
      "variable": "var(--fontSize-sm)"
    },
    "base": {
      "value": "1rem",
      "variable": "var(--fontSize-base)"
    },
    "lg": {
      "value": "1.125rem",
      "variable": "var(--fontSize-lg)"
    },
    "xl": {
      "value": "1.25rem",
      "variable": "var(--fontSize-xl)"
    },
    "2xl": {
      "value": "1.5rem",
      "variable": "var(--fontSize-2xl)"
    },
    "3xl": {
      "value": "1.875rem",
      "variable": "var(--fontSize-3xl)"
    },
    "4xl": {
      "value": "2.25rem",
      "variable": "var(--fontSize-4xl)"
    },
    "5xl": {
      "value": "3rem",
      "variable": "var(--fontSize-5xl)"
    },
    "6xl": {
      "value": "3.75rem",
      "variable": "var(--fontSize-6xl)"
    },
    "7xl": {
      "value": "4.5rem",
      "variable": "var(--fontSize-7xl)"
    },
    "8xl": {
      "value": "6rem",
      "variable": "var(--fontSize-8xl)"
    },
    "9xl": {
      "value": "8rem",
      "variable": "var(--fontSize-9xl)"
    }
  },
  "letterSpacing": {
    "tighter": {
      "value": "-0.05em",
      "variable": "var(--letterSpacing-tighter)"
    },
    "tight": {
      "value": "-0.025em",
      "variable": "var(--letterSpacing-tight)"
    },
    "normal": {
      "value": "0em",
      "variable": "var(--letterSpacing-normal)"
    },
    "wide": {
      "value": "0.025em",
      "variable": "var(--letterSpacing-wide)"
    },
    "wider": {
      "value": "0.05em",
      "variable": "var(--letterSpacing-wider)"
    },
    "widest": {
      "value": "0.1em",
      "variable": "var(--letterSpacing-widest)"
    }
  },
  "lead": {
    "1": {
      "value": ".025rem",
      "variable": "var(--lead-1)"
    },
    "2": {
      "value": ".5rem",
      "variable": "var(--lead-2)"
    },
    "3": {
      "value": ".75rem",
      "variable": "var(--lead-3)"
    },
    "4": {
      "value": "1rem",
      "variable": "var(--lead-4)"
    },
    "5": {
      "value": "1.25rem",
      "variable": "var(--lead-5)"
    },
    "6": {
      "value": "1.5rem",
      "variable": "var(--lead-6)"
    },
    "7": {
      "value": "1.75rem",
      "variable": "var(--lead-7)"
    },
    "8": {
      "value": "2rem",
      "variable": "var(--lead-8)"
    },
    "9": {
      "value": "2.25rem",
      "variable": "var(--lead-9)"
    },
    "10": {
      "value": "2.5rem",
      "variable": "var(--lead-10)"
    },
    "none": {
      "value": "1",
      "variable": "var(--lead-none)"
    },
    "tight": {
      "value": "1.25",
      "variable": "var(--lead-tight)"
    },
    "snug": {
      "value": "1.375",
      "variable": "var(--lead-snug)"
    },
    "normal": {
      "value": "1.5",
      "variable": "var(--lead-normal)"
    },
    "relaxed": {
      "value": "1.625",
      "variable": "var(--lead-relaxed)"
    },
    "loose": {
      "value": "2",
      "variable": "var(--lead-loose)"
    }
  },
  "text": {
    "xs": {
      "fontSize": {
        "value": "0.75rem",
        "variable": "var(--text-xs-fontSize)"
      },
      "lineHeight": {
        "value": "1rem",
        "variable": "var(--text-xs-lineHeight)"
      }
    },
    "sm": {
      "fontSize": {
        "value": "0.875rem",
        "variable": "var(--text-sm-fontSize)"
      },
      "lineHeight": {
        "value": "1.25rem",
        "variable": "var(--text-sm-lineHeight)"
      }
    },
    "base": {
      "fontSize": {
        "value": "1rem",
        "variable": "var(--text-base-fontSize)"
      },
      "lineHeight": {
        "value": "1.5rem",
        "variable": "var(--text-base-lineHeight)"
      }
    },
    "lg": {
      "fontSize": {
        "value": "1.125rem",
        "variable": "var(--text-lg-fontSize)"
      },
      "lineHeight": {
        "value": "1.75rem",
        "variable": "var(--text-lg-lineHeight)"
      }
    },
    "xl": {
      "fontSize": {
        "value": "1.25rem",
        "variable": "var(--text-xl-fontSize)"
      },
      "lineHeight": {
        "value": "1.75rem",
        "variable": "var(--text-xl-lineHeight)"
      }
    },
    "2xl": {
      "fontSize": {
        "value": "1.5rem",
        "variable": "var(--text-2xl-fontSize)"
      },
      "lineHeight": {
        "value": "2rem",
        "variable": "var(--text-2xl-lineHeight)"
      }
    },
    "3xl": {
      "fontSize": {
        "value": "1.875rem",
        "variable": "var(--text-3xl-fontSize)"
      },
      "lineHeight": {
        "value": "2.25rem",
        "variable": "var(--text-3xl-lineHeight)"
      }
    },
    "4xl": {
      "fontSize": {
        "value": "2.25rem",
        "variable": "var(--text-4xl-fontSize)"
      },
      "lineHeight": {
        "value": "2.5rem",
        "variable": "var(--text-4xl-lineHeight)"
      }
    },
    "5xl": {
      "fontSize": {
        "value": "3rem",
        "variable": "var(--text-5xl-fontSize)"
      },
      "lineHeight": {
        "value": "1",
        "variable": "var(--text-5xl-lineHeight)"
      }
    },
    "6xl": {
      "fontSize": {
        "value": "3.75rem",
        "variable": "var(--text-6xl-fontSize)"
      },
      "lineHeight": {
        "value": "1",
        "variable": "var(--text-6xl-lineHeight)"
      }
    }
  },
  "media": {
    "xs": {
      "value": "(min-width: 475px)",
      "variable": "var(--media-xs)"
    },
    "sm": {
      "value": "(min-width: 640px)",
      "variable": "var(--media-sm)"
    },
    "md": {
      "value": "(min-width: 768px)",
      "variable": "var(--media-md)"
    },
    "lg": {
      "value": "(min-width: 1024px)",
      "variable": "var(--media-lg)"
    },
    "xl": {
      "value": "(min-width: 1280px)",
      "variable": "var(--media-xl)"
    },
    "2xl": {
      "value": "(min-width: 1536px)",
      "variable": "var(--media-2xl)"
    },
    "rm": {
      "value": "(prefers-reduced-motion: reduce)",
      "variable": "var(--media-rm)"
    },
    "landscape": {
      "value": "only screen and (orientation: landscape)",
      "variable": "var(--media-landscape)"
    },
    "portrait": {
      "value": "only screen and (orientation: portrait)",
      "variable": "var(--media-portrait)"
    }
  }
};
const _nuxt_pinceau_nuxt_plugin_server_mjs_KEuz79zT4K = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(plugin, { colorSchemeMode: "class", theme, utils });
  const { pinceau: runtimeConfig } = useRuntimeConfig();
  nuxtApp.hook("app:rendered", async (app) => {
    app.ssrContext.event.pinceauContent = app.ssrContext.event.pinceauContent || {};
    let themeCSS = "";
    try {
      themeCSS = fs.readFileSync(join(runtimeConfig.outputDir, "index.css"), "utf-8");
    } catch (e) {
    }
    app.ssrContext.event.pinceauContent.theme = themeCSS;
    const content = app.ssrContext.nuxt.vueApp.config.globalProperties.$pinceauSsr.get();
    app.ssrContext.event.pinceauContent.runtime = content;
  });
});
const schema = {
  "properties": {
    "id": "#tokensConfig",
    "properties": {
      "color": {
        "title": "Your website color palette.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type color",
          "@studio-icon ph:palette"
        ],
        "id": "#tokensConfig/color",
        "properties": {
          "primary": {
            "id": "#tokensConfig/color/primary",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/primary/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/50/value",
                    "default": "#d9f8ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9f8ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/primary/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/100/value",
                    "default": "#b3f1ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3f1ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/primary/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/200/value",
                    "default": "#8deaff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8deaff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/primary/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/300/value",
                    "default": "#66e4ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#66e4ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/primary/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/400/value",
                    "default": "#40ddff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#40ddff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/primary/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/500/value",
                    "default": "#1ad6ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1ad6ff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/primary/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/600/value",
                    "default": "#00b9e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00b9e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/primary/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/700/value",
                    "default": "#008aa9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#008aa9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/primary/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/800/value",
                    "default": "#005c70"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#005c70"
                }
              },
              "900": {
                "id": "#tokensConfig/color/primary/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/primary/900/value",
                    "default": "#002e38"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002e38"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9f8ff"
              },
              "100": {
                "value": "#b3f1ff"
              },
              "200": {
                "value": "#8deaff"
              },
              "300": {
                "value": "#66e4ff"
              },
              "400": {
                "value": "#40ddff"
              },
              "500": {
                "value": "#1ad6ff"
              },
              "600": {
                "value": "#00b9e1"
              },
              "700": {
                "value": "#008aa9"
              },
              "800": {
                "value": "#005c70"
              },
              "900": {
                "value": "#002e38"
              }
            }
          },
          "secondary": {
            "id": "#tokensConfig/color/secondary",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/secondary/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/50/value",
                    "default": "#fafafa"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#fafafa"
                }
              },
              "100": {
                "id": "#tokensConfig/color/secondary/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/100/value",
                    "default": "#f4f4f5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f4f4f5"
                }
              },
              "200": {
                "id": "#tokensConfig/color/secondary/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/200/value",
                    "default": "#e4e4e7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e4e4e7"
                }
              },
              "300": {
                "id": "#tokensConfig/color/secondary/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/300/value",
                    "default": "#D4d4d8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#D4d4d8"
                }
              },
              "400": {
                "id": "#tokensConfig/color/secondary/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/400/value",
                    "default": "#a1a1aa"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a1a1aa"
                }
              },
              "500": {
                "id": "#tokensConfig/color/secondary/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/500/value",
                    "default": "#71717A"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#71717A"
                }
              },
              "600": {
                "id": "#tokensConfig/color/secondary/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/600/value",
                    "default": "#52525B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#52525B"
                }
              },
              "700": {
                "id": "#tokensConfig/color/secondary/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/700/value",
                    "default": "#3f3f46"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#3f3f46"
                }
              },
              "800": {
                "id": "#tokensConfig/color/secondary/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/800/value",
                    "default": "#27272A"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#27272A"
                }
              },
              "900": {
                "id": "#tokensConfig/color/secondary/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/secondary/900/value",
                    "default": "#18181B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#18181B"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#fafafa"
              },
              "100": {
                "value": "#f4f4f5"
              },
              "200": {
                "value": "#e4e4e7"
              },
              "300": {
                "value": "#D4d4d8"
              },
              "400": {
                "value": "#a1a1aa"
              },
              "500": {
                "value": "#71717A"
              },
              "600": {
                "value": "#52525B"
              },
              "700": {
                "value": "#3f3f46"
              },
              "800": {
                "value": "#27272A"
              },
              "900": {
                "value": "#18181B"
              }
            }
          },
          "white": {
            "id": "#tokensConfig/color/white",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/color/white/value",
                "default": "#ffffff"
              }
            },
            "type": "object",
            "default": {
              "value": "#ffffff"
            }
          },
          "black": {
            "id": "#tokensConfig/color/black",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/color/black/value",
                "default": "#0c0c0d"
              }
            },
            "type": "object",
            "default": {
              "value": "#0c0c0d"
            }
          },
          "gray": {
            "id": "#tokensConfig/color/gray",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/gray/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/50/value",
                    "default": "#fafafa"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#fafafa"
                }
              },
              "100": {
                "id": "#tokensConfig/color/gray/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/100/value",
                    "default": "#f4f4f5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f4f4f5"
                }
              },
              "200": {
                "id": "#tokensConfig/color/gray/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/200/value",
                    "default": "#e4e4e7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e4e4e7"
                }
              },
              "300": {
                "id": "#tokensConfig/color/gray/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/300/value",
                    "default": "#D4d4d8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#D4d4d8"
                }
              },
              "400": {
                "id": "#tokensConfig/color/gray/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/400/value",
                    "default": "#a1a1aa"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a1a1aa"
                }
              },
              "500": {
                "id": "#tokensConfig/color/gray/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/500/value",
                    "default": "#71717A"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#71717A"
                }
              },
              "600": {
                "id": "#tokensConfig/color/gray/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/600/value",
                    "default": "#52525B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#52525B"
                }
              },
              "700": {
                "id": "#tokensConfig/color/gray/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/700/value",
                    "default": "#3f3f46"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#3f3f46"
                }
              },
              "800": {
                "id": "#tokensConfig/color/gray/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/800/value",
                    "default": "#27272A"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#27272A"
                }
              },
              "900": {
                "id": "#tokensConfig/color/gray/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/gray/900/value",
                    "default": "#18181B"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#18181B"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#fafafa"
              },
              "100": {
                "value": "#f4f4f5"
              },
              "200": {
                "value": "#e4e4e7"
              },
              "300": {
                "value": "#D4d4d8"
              },
              "400": {
                "value": "#a1a1aa"
              },
              "500": {
                "value": "#71717A"
              },
              "600": {
                "value": "#52525B"
              },
              "700": {
                "value": "#3f3f46"
              },
              "800": {
                "value": "#27272A"
              },
              "900": {
                "value": "#18181B"
              }
            }
          },
          "green": {
            "id": "#tokensConfig/color/green",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/green/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/50/value",
                    "default": "#d6ffee"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d6ffee"
                }
              },
              "100": {
                "id": "#tokensConfig/color/green/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/100/value",
                    "default": "#acffdd"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#acffdd"
                }
              },
              "200": {
                "id": "#tokensConfig/color/green/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/200/value",
                    "default": "#83ffcc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#83ffcc"
                }
              },
              "300": {
                "id": "#tokensConfig/color/green/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/300/value",
                    "default": "#30ffaa"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#30ffaa"
                }
              },
              "400": {
                "id": "#tokensConfig/color/green/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/400/value",
                    "default": "#00dc82"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00dc82"
                }
              },
              "500": {
                "id": "#tokensConfig/color/green/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/500/value",
                    "default": "#00bd6f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00bd6f"
                }
              },
              "600": {
                "id": "#tokensConfig/color/green/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/600/value",
                    "default": "#009d5d"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#009d5d"
                }
              },
              "700": {
                "id": "#tokensConfig/color/green/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/700/value",
                    "default": "#007e4a"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#007e4a"
                }
              },
              "800": {
                "id": "#tokensConfig/color/green/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/800/value",
                    "default": "#005e38"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#005e38"
                }
              },
              "900": {
                "id": "#tokensConfig/color/green/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/green/900/value",
                    "default": "#003f25"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#003f25"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d6ffee"
              },
              "100": {
                "value": "#acffdd"
              },
              "200": {
                "value": "#83ffcc"
              },
              "300": {
                "value": "#30ffaa"
              },
              "400": {
                "value": "#00dc82"
              },
              "500": {
                "value": "#00bd6f"
              },
              "600": {
                "value": "#009d5d"
              },
              "700": {
                "value": "#007e4a"
              },
              "800": {
                "value": "#005e38"
              },
              "900": {
                "value": "#003f25"
              }
            }
          },
          "yellow": {
            "id": "#tokensConfig/color/yellow",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/yellow/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/50/value",
                    "default": "#fdf6db"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#fdf6db"
                }
              },
              "100": {
                "id": "#tokensConfig/color/yellow/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/100/value",
                    "default": "#fcedb7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#fcedb7"
                }
              },
              "200": {
                "id": "#tokensConfig/color/yellow/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/200/value",
                    "default": "#fae393"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#fae393"
                }
              },
              "300": {
                "id": "#tokensConfig/color/yellow/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/300/value",
                    "default": "#f8da70"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f8da70"
                }
              },
              "400": {
                "id": "#tokensConfig/color/yellow/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/400/value",
                    "default": "#f7d14c"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f7d14c"
                }
              },
              "500": {
                "id": "#tokensConfig/color/yellow/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/500/value",
                    "default": "#f5c828"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f5c828"
                }
              },
              "600": {
                "id": "#tokensConfig/color/yellow/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/600/value",
                    "default": "#daac0a"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#daac0a"
                }
              },
              "700": {
                "id": "#tokensConfig/color/yellow/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/700/value",
                    "default": "#a38108"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a38108"
                }
              },
              "800": {
                "id": "#tokensConfig/color/yellow/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/800/value",
                    "default": "#6d5605"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6d5605"
                }
              },
              "900": {
                "id": "#tokensConfig/color/yellow/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/yellow/900/value",
                    "default": "#362b03"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#362b03"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#fdf6db"
              },
              "100": {
                "value": "#fcedb7"
              },
              "200": {
                "value": "#fae393"
              },
              "300": {
                "value": "#f8da70"
              },
              "400": {
                "value": "#f7d14c"
              },
              "500": {
                "value": "#f5c828"
              },
              "600": {
                "value": "#daac0a"
              },
              "700": {
                "value": "#a38108"
              },
              "800": {
                "value": "#6d5605"
              },
              "900": {
                "value": "#362b03"
              }
            }
          },
          "orange": {
            "id": "#tokensConfig/color/orange",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/orange/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/50/value",
                    "default": "#ffe9d9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffe9d9"
                }
              },
              "100": {
                "id": "#tokensConfig/color/orange/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/100/value",
                    "default": "#ffd3b3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd3b3"
                }
              },
              "200": {
                "id": "#tokensConfig/color/orange/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/200/value",
                    "default": "#ffbd8d"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffbd8d"
                }
              },
              "300": {
                "id": "#tokensConfig/color/orange/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/300/value",
                    "default": "#ffa666"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffa666"
                }
              },
              "400": {
                "id": "#tokensConfig/color/orange/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/400/value",
                    "default": "#ff9040"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff9040"
                }
              },
              "500": {
                "id": "#tokensConfig/color/orange/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/500/value",
                    "default": "#ff7a1a"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff7a1a"
                }
              },
              "600": {
                "id": "#tokensConfig/color/orange/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/600/value",
                    "default": "#e15e00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e15e00"
                }
              },
              "700": {
                "id": "#tokensConfig/color/orange/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/700/value",
                    "default": "#a94700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a94700"
                }
              },
              "800": {
                "id": "#tokensConfig/color/orange/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/800/value",
                    "default": "#702f00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#702f00"
                }
              },
              "900": {
                "id": "#tokensConfig/color/orange/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/orange/900/value",
                    "default": "#381800"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#381800"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffe9d9"
              },
              "100": {
                "value": "#ffd3b3"
              },
              "200": {
                "value": "#ffbd8d"
              },
              "300": {
                "value": "#ffa666"
              },
              "400": {
                "value": "#ff9040"
              },
              "500": {
                "value": "#ff7a1a"
              },
              "600": {
                "value": "#e15e00"
              },
              "700": {
                "value": "#a94700"
              },
              "800": {
                "value": "#702f00"
              },
              "900": {
                "value": "#381800"
              }
            }
          },
          "red": {
            "id": "#tokensConfig/color/red",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/red/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/50/value",
                    "default": "#ffdbd9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffdbd9"
                }
              },
              "100": {
                "id": "#tokensConfig/color/red/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/100/value",
                    "default": "#ffb7b3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffb7b3"
                }
              },
              "200": {
                "id": "#tokensConfig/color/red/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/200/value",
                    "default": "#ff948d"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff948d"
                }
              },
              "300": {
                "id": "#tokensConfig/color/red/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/300/value",
                    "default": "#ff7066"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff7066"
                }
              },
              "400": {
                "id": "#tokensConfig/color/red/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/400/value",
                    "default": "#ff4c40"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff4c40"
                }
              },
              "500": {
                "id": "#tokensConfig/color/red/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/500/value",
                    "default": "#ff281a"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff281a"
                }
              },
              "600": {
                "id": "#tokensConfig/color/red/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/600/value",
                    "default": "#e10e00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e10e00"
                }
              },
              "700": {
                "id": "#tokensConfig/color/red/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/700/value",
                    "default": "#a90a00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a90a00"
                }
              },
              "800": {
                "id": "#tokensConfig/color/red/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/800/value",
                    "default": "#700700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#700700"
                }
              },
              "900": {
                "id": "#tokensConfig/color/red/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/red/900/value",
                    "default": "#380300"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#380300"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffdbd9"
              },
              "100": {
                "value": "#ffb7b3"
              },
              "200": {
                "value": "#ff948d"
              },
              "300": {
                "value": "#ff7066"
              },
              "400": {
                "value": "#ff4c40"
              },
              "500": {
                "value": "#ff281a"
              },
              "600": {
                "value": "#e10e00"
              },
              "700": {
                "value": "#a90a00"
              },
              "800": {
                "value": "#700700"
              },
              "900": {
                "value": "#380300"
              }
            }
          },
          "pear": {
            "id": "#tokensConfig/color/pear",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/pear/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/50/value",
                    "default": "#f7f8dc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#f7f8dc"
                }
              },
              "100": {
                "id": "#tokensConfig/color/pear/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/100/value",
                    "default": "#eff0ba"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#eff0ba"
                }
              },
              "200": {
                "id": "#tokensConfig/color/pear/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/200/value",
                    "default": "#e8e997"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e8e997"
                }
              },
              "300": {
                "id": "#tokensConfig/color/pear/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/300/value",
                    "default": "#e0e274"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e0e274"
                }
              },
              "400": {
                "id": "#tokensConfig/color/pear/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/400/value",
                    "default": "#d8da52"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d8da52"
                }
              },
              "500": {
                "id": "#tokensConfig/color/pear/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/500/value",
                    "default": "#d0d32f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d0d32f"
                }
              },
              "600": {
                "id": "#tokensConfig/color/pear/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/600/value",
                    "default": "#a8aa24"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a8aa24"
                }
              },
              "700": {
                "id": "#tokensConfig/color/pear/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/700/value",
                    "default": "#7e801b"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#7e801b"
                }
              },
              "800": {
                "id": "#tokensConfig/color/pear/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/800/value",
                    "default": "#545512"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#545512"
                }
              },
              "900": {
                "id": "#tokensConfig/color/pear/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pear/900/value",
                    "default": "#2a2b09"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#2a2b09"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#f7f8dc"
              },
              "100": {
                "value": "#eff0ba"
              },
              "200": {
                "value": "#e8e997"
              },
              "300": {
                "value": "#e0e274"
              },
              "400": {
                "value": "#d8da52"
              },
              "500": {
                "value": "#d0d32f"
              },
              "600": {
                "value": "#a8aa24"
              },
              "700": {
                "value": "#7e801b"
              },
              "800": {
                "value": "#545512"
              },
              "900": {
                "value": "#2a2b09"
              }
            }
          },
          "teal": {
            "id": "#tokensConfig/color/teal",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/teal/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/50/value",
                    "default": "#d7faf8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d7faf8"
                }
              },
              "100": {
                "id": "#tokensConfig/color/teal/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/100/value",
                    "default": "#aff4f0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#aff4f0"
                }
              },
              "200": {
                "id": "#tokensConfig/color/teal/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/200/value",
                    "default": "#87efe9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#87efe9"
                }
              },
              "300": {
                "id": "#tokensConfig/color/teal/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/300/value",
                    "default": "#5fe9e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#5fe9e1"
                }
              },
              "400": {
                "id": "#tokensConfig/color/teal/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/400/value",
                    "default": "#36e4da"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#36e4da"
                }
              },
              "500": {
                "id": "#tokensConfig/color/teal/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/500/value",
                    "default": "#1cd1c6"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1cd1c6"
                }
              },
              "600": {
                "id": "#tokensConfig/color/teal/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/600/value",
                    "default": "#16a79e"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#16a79e"
                }
              },
              "700": {
                "id": "#tokensConfig/color/teal/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/700/value",
                    "default": "#117d77"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#117d77"
                }
              },
              "800": {
                "id": "#tokensConfig/color/teal/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/800/value",
                    "default": "#0b544f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0b544f"
                }
              },
              "900": {
                "id": "#tokensConfig/color/teal/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/teal/900/value",
                    "default": "#062a28"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#062a28"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d7faf8"
              },
              "100": {
                "value": "#aff4f0"
              },
              "200": {
                "value": "#87efe9"
              },
              "300": {
                "value": "#5fe9e1"
              },
              "400": {
                "value": "#36e4da"
              },
              "500": {
                "value": "#1cd1c6"
              },
              "600": {
                "value": "#16a79e"
              },
              "700": {
                "value": "#117d77"
              },
              "800": {
                "value": "#0b544f"
              },
              "900": {
                "value": "#062a28"
              }
            }
          },
          "lightblue": {
            "id": "#tokensConfig/color/lightblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/lightblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/50/value",
                    "default": "#d9f8ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9f8ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/lightblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/100/value",
                    "default": "#b3f1ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3f1ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/lightblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/200/value",
                    "default": "#8deaff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8deaff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/lightblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/300/value",
                    "default": "#66e4ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#66e4ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/lightblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/400/value",
                    "default": "#40ddff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#40ddff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/lightblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/500/value",
                    "default": "#1ad6ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1ad6ff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/lightblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/600/value",
                    "default": "#00b9e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#00b9e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/lightblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/700/value",
                    "default": "#008aa9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#008aa9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/lightblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/800/value",
                    "default": "#005c70"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#005c70"
                }
              },
              "900": {
                "id": "#tokensConfig/color/lightblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/lightblue/900/value",
                    "default": "#002e38"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002e38"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9f8ff"
              },
              "100": {
                "value": "#b3f1ff"
              },
              "200": {
                "value": "#8deaff"
              },
              "300": {
                "value": "#66e4ff"
              },
              "400": {
                "value": "#40ddff"
              },
              "500": {
                "value": "#1ad6ff"
              },
              "600": {
                "value": "#00b9e1"
              },
              "700": {
                "value": "#008aa9"
              },
              "800": {
                "value": "#005c70"
              },
              "900": {
                "value": "#002e38"
              }
            }
          },
          "blue": {
            "id": "#tokensConfig/color/blue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/blue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/50/value",
                    "default": "#d9f1ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9f1ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/blue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/100/value",
                    "default": "#b3e4ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3e4ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/blue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/200/value",
                    "default": "#8dd6ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8dd6ff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/blue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/300/value",
                    "default": "#66c8ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#66c8ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/blue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/400/value",
                    "default": "#40bbff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#40bbff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/blue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/500/value",
                    "default": "#1aadff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1aadff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/blue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/600/value",
                    "default": "#0090e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0090e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/blue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/700/value",
                    "default": "#006ca9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#006ca9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/blue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/800/value",
                    "default": "#004870"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#004870"
                }
              },
              "900": {
                "id": "#tokensConfig/color/blue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/blue/900/value",
                    "default": "#002438"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002438"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9f1ff"
              },
              "100": {
                "value": "#b3e4ff"
              },
              "200": {
                "value": "#8dd6ff"
              },
              "300": {
                "value": "#66c8ff"
              },
              "400": {
                "value": "#40bbff"
              },
              "500": {
                "value": "#1aadff"
              },
              "600": {
                "value": "#0090e1"
              },
              "700": {
                "value": "#006ca9"
              },
              "800": {
                "value": "#004870"
              },
              "900": {
                "value": "#002438"
              }
            }
          },
          "indigoblue": {
            "id": "#tokensConfig/color/indigoblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/indigoblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/50/value",
                    "default": "#d9e5ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d9e5ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/indigoblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/100/value",
                    "default": "#b3cbff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#b3cbff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/indigoblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/200/value",
                    "default": "#8db0ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8db0ff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/indigoblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/300/value",
                    "default": "#6696ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6696ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/indigoblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/400/value",
                    "default": "#407cff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#407cff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/indigoblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/500/value",
                    "default": "#1a62ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#1a62ff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/indigoblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/600/value",
                    "default": "#0047e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0047e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/indigoblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/700/value",
                    "default": "#0035a9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0035a9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/indigoblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/800/value",
                    "default": "#002370"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#002370"
                }
              },
              "900": {
                "id": "#tokensConfig/color/indigoblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/indigoblue/900/value",
                    "default": "#001238"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#001238"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#d9e5ff"
              },
              "100": {
                "value": "#b3cbff"
              },
              "200": {
                "value": "#8db0ff"
              },
              "300": {
                "value": "#6696ff"
              },
              "400": {
                "value": "#407cff"
              },
              "500": {
                "value": "#1a62ff"
              },
              "600": {
                "value": "#0047e1"
              },
              "700": {
                "value": "#0035a9"
              },
              "800": {
                "value": "#002370"
              },
              "900": {
                "value": "#001238"
              }
            }
          },
          "royalblue": {
            "id": "#tokensConfig/color/royalblue",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/royalblue/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/50/value",
                    "default": "#dfdbfb"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#dfdbfb"
                }
              },
              "100": {
                "id": "#tokensConfig/color/royalblue/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/100/value",
                    "default": "#c0b7f7"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#c0b7f7"
                }
              },
              "200": {
                "id": "#tokensConfig/color/royalblue/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/200/value",
                    "default": "#a093f3"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a093f3"
                }
              },
              "300": {
                "id": "#tokensConfig/color/royalblue/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/300/value",
                    "default": "#806ff0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#806ff0"
                }
              },
              "400": {
                "id": "#tokensConfig/color/royalblue/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/400/value",
                    "default": "#614bec"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#614bec"
                }
              },
              "500": {
                "id": "#tokensConfig/color/royalblue/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/500/value",
                    "default": "#4127e8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#4127e8"
                }
              },
              "600": {
                "id": "#tokensConfig/color/royalblue/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/600/value",
                    "default": "#2c15c4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#2c15c4"
                }
              },
              "700": {
                "id": "#tokensConfig/color/royalblue/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/700/value",
                    "default": "#211093"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#211093"
                }
              },
              "800": {
                "id": "#tokensConfig/color/royalblue/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/800/value",
                    "default": "#160a62"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#160a62"
                }
              },
              "900": {
                "id": "#tokensConfig/color/royalblue/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/royalblue/900/value",
                    "default": "#0b0531"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#0b0531"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#dfdbfb"
              },
              "100": {
                "value": "#c0b7f7"
              },
              "200": {
                "value": "#a093f3"
              },
              "300": {
                "value": "#806ff0"
              },
              "400": {
                "value": "#614bec"
              },
              "500": {
                "value": "#4127e8"
              },
              "600": {
                "value": "#2c15c4"
              },
              "700": {
                "value": "#211093"
              },
              "800": {
                "value": "#160a62"
              },
              "900": {
                "value": "#0b0531"
              }
            }
          },
          "purple": {
            "id": "#tokensConfig/color/purple",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/purple/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/50/value",
                    "default": "#ead9ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ead9ff"
                }
              },
              "100": {
                "id": "#tokensConfig/color/purple/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/100/value",
                    "default": "#d5b3ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#d5b3ff"
                }
              },
              "200": {
                "id": "#tokensConfig/color/purple/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/200/value",
                    "default": "#c08dff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#c08dff"
                }
              },
              "300": {
                "id": "#tokensConfig/color/purple/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/300/value",
                    "default": "#ab66ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ab66ff"
                }
              },
              "400": {
                "id": "#tokensConfig/color/purple/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/400/value",
                    "default": "#9640ff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#9640ff"
                }
              },
              "500": {
                "id": "#tokensConfig/color/purple/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/500/value",
                    "default": "#811aff"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#811aff"
                }
              },
              "600": {
                "id": "#tokensConfig/color/purple/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/600/value",
                    "default": "#6500e1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#6500e1"
                }
              },
              "700": {
                "id": "#tokensConfig/color/purple/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/700/value",
                    "default": "#4c00a9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#4c00a9"
                }
              },
              "800": {
                "id": "#tokensConfig/color/purple/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/800/value",
                    "default": "#330070"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#330070"
                }
              },
              "900": {
                "id": "#tokensConfig/color/purple/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/purple/900/value",
                    "default": "#190038"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#190038"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ead9ff"
              },
              "100": {
                "value": "#d5b3ff"
              },
              "200": {
                "value": "#c08dff"
              },
              "300": {
                "value": "#ab66ff"
              },
              "400": {
                "value": "#9640ff"
              },
              "500": {
                "value": "#811aff"
              },
              "600": {
                "value": "#6500e1"
              },
              "700": {
                "value": "#4c00a9"
              },
              "800": {
                "value": "#330070"
              },
              "900": {
                "value": "#190038"
              }
            }
          },
          "pink": {
            "id": "#tokensConfig/color/pink",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/pink/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/50/value",
                    "default": "#ffd9f2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd9f2"
                }
              },
              "100": {
                "id": "#tokensConfig/color/pink/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/100/value",
                    "default": "#ffb3e5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffb3e5"
                }
              },
              "200": {
                "id": "#tokensConfig/color/pink/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/200/value",
                    "default": "#ff8dd8"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff8dd8"
                }
              },
              "300": {
                "id": "#tokensConfig/color/pink/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/300/value",
                    "default": "#ff66cc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff66cc"
                }
              },
              "400": {
                "id": "#tokensConfig/color/pink/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/400/value",
                    "default": "#ff40bf"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff40bf"
                }
              },
              "500": {
                "id": "#tokensConfig/color/pink/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/500/value",
                    "default": "#ff1ab2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff1ab2"
                }
              },
              "600": {
                "id": "#tokensConfig/color/pink/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/600/value",
                    "default": "#e10095"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e10095"
                }
              },
              "700": {
                "id": "#tokensConfig/color/pink/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/700/value",
                    "default": "#a90070"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a90070"
                }
              },
              "800": {
                "id": "#tokensConfig/color/pink/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/800/value",
                    "default": "#70004b"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#70004b"
                }
              },
              "900": {
                "id": "#tokensConfig/color/pink/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/pink/900/value",
                    "default": "#380025"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#380025"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffd9f2"
              },
              "100": {
                "value": "#ffb3e5"
              },
              "200": {
                "value": "#ff8dd8"
              },
              "300": {
                "value": "#ff66cc"
              },
              "400": {
                "value": "#ff40bf"
              },
              "500": {
                "value": "#ff1ab2"
              },
              "600": {
                "value": "#e10095"
              },
              "700": {
                "value": "#a90070"
              },
              "800": {
                "value": "#70004b"
              },
              "900": {
                "value": "#380025"
              }
            }
          },
          "ruby": {
            "id": "#tokensConfig/color/ruby",
            "properties": {
              "50": {
                "id": "#tokensConfig/color/ruby/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/50/value",
                    "default": "#ffd9e4"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffd9e4"
                }
              },
              "100": {
                "id": "#tokensConfig/color/ruby/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/100/value",
                    "default": "#ffb3c9"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffb3c9"
                }
              },
              "200": {
                "id": "#tokensConfig/color/ruby/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/200/value",
                    "default": "#ff8dae"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff8dae"
                }
              },
              "300": {
                "id": "#tokensConfig/color/ruby/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/300/value",
                    "default": "#ff6694"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff6694"
                }
              },
              "400": {
                "id": "#tokensConfig/color/ruby/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/400/value",
                    "default": "#ff4079"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff4079"
                }
              },
              "500": {
                "id": "#tokensConfig/color/ruby/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/500/value",
                    "default": "#ff1a5e"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ff1a5e"
                }
              },
              "600": {
                "id": "#tokensConfig/color/ruby/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/600/value",
                    "default": "#e10043"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#e10043"
                }
              },
              "700": {
                "id": "#tokensConfig/color/ruby/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/700/value",
                    "default": "#a90032"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#a90032"
                }
              },
              "800": {
                "id": "#tokensConfig/color/ruby/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/800/value",
                    "default": "#700021"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#700021"
                }
              },
              "900": {
                "id": "#tokensConfig/color/ruby/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/color/ruby/900/value",
                    "default": "#380011"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#380011"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffd9e4"
              },
              "100": {
                "value": "#ffb3c9"
              },
              "200": {
                "value": "#ff8dae"
              },
              "300": {
                "value": "#ff6694"
              },
              "400": {
                "value": "#ff4079"
              },
              "500": {
                "value": "#ff1a5e"
              },
              "600": {
                "value": "#e10043"
              },
              "700": {
                "value": "#a90032"
              },
              "800": {
                "value": "#700021"
              },
              "900": {
                "value": "#380011"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "primary": {
            "50": {
              "value": "#d9f8ff"
            },
            "100": {
              "value": "#b3f1ff"
            },
            "200": {
              "value": "#8deaff"
            },
            "300": {
              "value": "#66e4ff"
            },
            "400": {
              "value": "#40ddff"
            },
            "500": {
              "value": "#1ad6ff"
            },
            "600": {
              "value": "#00b9e1"
            },
            "700": {
              "value": "#008aa9"
            },
            "800": {
              "value": "#005c70"
            },
            "900": {
              "value": "#002e38"
            }
          },
          "secondary": {
            "50": {
              "value": "#fafafa"
            },
            "100": {
              "value": "#f4f4f5"
            },
            "200": {
              "value": "#e4e4e7"
            },
            "300": {
              "value": "#D4d4d8"
            },
            "400": {
              "value": "#a1a1aa"
            },
            "500": {
              "value": "#71717A"
            },
            "600": {
              "value": "#52525B"
            },
            "700": {
              "value": "#3f3f46"
            },
            "800": {
              "value": "#27272A"
            },
            "900": {
              "value": "#18181B"
            }
          },
          "white": {
            "value": "#ffffff"
          },
          "black": {
            "value": "#0c0c0d"
          },
          "gray": {
            "50": {
              "value": "#fafafa"
            },
            "100": {
              "value": "#f4f4f5"
            },
            "200": {
              "value": "#e4e4e7"
            },
            "300": {
              "value": "#D4d4d8"
            },
            "400": {
              "value": "#a1a1aa"
            },
            "500": {
              "value": "#71717A"
            },
            "600": {
              "value": "#52525B"
            },
            "700": {
              "value": "#3f3f46"
            },
            "800": {
              "value": "#27272A"
            },
            "900": {
              "value": "#18181B"
            }
          },
          "green": {
            "50": {
              "value": "#d6ffee"
            },
            "100": {
              "value": "#acffdd"
            },
            "200": {
              "value": "#83ffcc"
            },
            "300": {
              "value": "#30ffaa"
            },
            "400": {
              "value": "#00dc82"
            },
            "500": {
              "value": "#00bd6f"
            },
            "600": {
              "value": "#009d5d"
            },
            "700": {
              "value": "#007e4a"
            },
            "800": {
              "value": "#005e38"
            },
            "900": {
              "value": "#003f25"
            }
          },
          "yellow": {
            "50": {
              "value": "#fdf6db"
            },
            "100": {
              "value": "#fcedb7"
            },
            "200": {
              "value": "#fae393"
            },
            "300": {
              "value": "#f8da70"
            },
            "400": {
              "value": "#f7d14c"
            },
            "500": {
              "value": "#f5c828"
            },
            "600": {
              "value": "#daac0a"
            },
            "700": {
              "value": "#a38108"
            },
            "800": {
              "value": "#6d5605"
            },
            "900": {
              "value": "#362b03"
            }
          },
          "orange": {
            "50": {
              "value": "#ffe9d9"
            },
            "100": {
              "value": "#ffd3b3"
            },
            "200": {
              "value": "#ffbd8d"
            },
            "300": {
              "value": "#ffa666"
            },
            "400": {
              "value": "#ff9040"
            },
            "500": {
              "value": "#ff7a1a"
            },
            "600": {
              "value": "#e15e00"
            },
            "700": {
              "value": "#a94700"
            },
            "800": {
              "value": "#702f00"
            },
            "900": {
              "value": "#381800"
            }
          },
          "red": {
            "50": {
              "value": "#ffdbd9"
            },
            "100": {
              "value": "#ffb7b3"
            },
            "200": {
              "value": "#ff948d"
            },
            "300": {
              "value": "#ff7066"
            },
            "400": {
              "value": "#ff4c40"
            },
            "500": {
              "value": "#ff281a"
            },
            "600": {
              "value": "#e10e00"
            },
            "700": {
              "value": "#a90a00"
            },
            "800": {
              "value": "#700700"
            },
            "900": {
              "value": "#380300"
            }
          },
          "pear": {
            "50": {
              "value": "#f7f8dc"
            },
            "100": {
              "value": "#eff0ba"
            },
            "200": {
              "value": "#e8e997"
            },
            "300": {
              "value": "#e0e274"
            },
            "400": {
              "value": "#d8da52"
            },
            "500": {
              "value": "#d0d32f"
            },
            "600": {
              "value": "#a8aa24"
            },
            "700": {
              "value": "#7e801b"
            },
            "800": {
              "value": "#545512"
            },
            "900": {
              "value": "#2a2b09"
            }
          },
          "teal": {
            "50": {
              "value": "#d7faf8"
            },
            "100": {
              "value": "#aff4f0"
            },
            "200": {
              "value": "#87efe9"
            },
            "300": {
              "value": "#5fe9e1"
            },
            "400": {
              "value": "#36e4da"
            },
            "500": {
              "value": "#1cd1c6"
            },
            "600": {
              "value": "#16a79e"
            },
            "700": {
              "value": "#117d77"
            },
            "800": {
              "value": "#0b544f"
            },
            "900": {
              "value": "#062a28"
            }
          },
          "lightblue": {
            "50": {
              "value": "#d9f8ff"
            },
            "100": {
              "value": "#b3f1ff"
            },
            "200": {
              "value": "#8deaff"
            },
            "300": {
              "value": "#66e4ff"
            },
            "400": {
              "value": "#40ddff"
            },
            "500": {
              "value": "#1ad6ff"
            },
            "600": {
              "value": "#00b9e1"
            },
            "700": {
              "value": "#008aa9"
            },
            "800": {
              "value": "#005c70"
            },
            "900": {
              "value": "#002e38"
            }
          },
          "blue": {
            "50": {
              "value": "#d9f1ff"
            },
            "100": {
              "value": "#b3e4ff"
            },
            "200": {
              "value": "#8dd6ff"
            },
            "300": {
              "value": "#66c8ff"
            },
            "400": {
              "value": "#40bbff"
            },
            "500": {
              "value": "#1aadff"
            },
            "600": {
              "value": "#0090e1"
            },
            "700": {
              "value": "#006ca9"
            },
            "800": {
              "value": "#004870"
            },
            "900": {
              "value": "#002438"
            }
          },
          "indigoblue": {
            "50": {
              "value": "#d9e5ff"
            },
            "100": {
              "value": "#b3cbff"
            },
            "200": {
              "value": "#8db0ff"
            },
            "300": {
              "value": "#6696ff"
            },
            "400": {
              "value": "#407cff"
            },
            "500": {
              "value": "#1a62ff"
            },
            "600": {
              "value": "#0047e1"
            },
            "700": {
              "value": "#0035a9"
            },
            "800": {
              "value": "#002370"
            },
            "900": {
              "value": "#001238"
            }
          },
          "royalblue": {
            "50": {
              "value": "#dfdbfb"
            },
            "100": {
              "value": "#c0b7f7"
            },
            "200": {
              "value": "#a093f3"
            },
            "300": {
              "value": "#806ff0"
            },
            "400": {
              "value": "#614bec"
            },
            "500": {
              "value": "#4127e8"
            },
            "600": {
              "value": "#2c15c4"
            },
            "700": {
              "value": "#211093"
            },
            "800": {
              "value": "#160a62"
            },
            "900": {
              "value": "#0b0531"
            }
          },
          "purple": {
            "50": {
              "value": "#ead9ff"
            },
            "100": {
              "value": "#d5b3ff"
            },
            "200": {
              "value": "#c08dff"
            },
            "300": {
              "value": "#ab66ff"
            },
            "400": {
              "value": "#9640ff"
            },
            "500": {
              "value": "#811aff"
            },
            "600": {
              "value": "#6500e1"
            },
            "700": {
              "value": "#4c00a9"
            },
            "800": {
              "value": "#330070"
            },
            "900": {
              "value": "#190038"
            }
          },
          "pink": {
            "50": {
              "value": "#ffd9f2"
            },
            "100": {
              "value": "#ffb3e5"
            },
            "200": {
              "value": "#ff8dd8"
            },
            "300": {
              "value": "#ff66cc"
            },
            "400": {
              "value": "#ff40bf"
            },
            "500": {
              "value": "#ff1ab2"
            },
            "600": {
              "value": "#e10095"
            },
            "700": {
              "value": "#a90070"
            },
            "800": {
              "value": "#70004b"
            },
            "900": {
              "value": "#380025"
            }
          },
          "ruby": {
            "50": {
              "value": "#ffd9e4"
            },
            "100": {
              "value": "#ffb3c9"
            },
            "200": {
              "value": "#ff8dae"
            },
            "300": {
              "value": "#ff6694"
            },
            "400": {
              "value": "#ff4079"
            },
            "500": {
              "value": "#ff1a5e"
            },
            "600": {
              "value": "#e10043"
            },
            "700": {
              "value": "#a90032"
            },
            "800": {
              "value": "#700021"
            },
            "900": {
              "value": "#380011"
            }
          }
        }
      },
      "elements": {
        "title": "All the configurable tokens for your Elements.",
        "tags": [
          "@studio-icon uiw:component"
        ],
        "id": "#tokensConfig/elements",
        "properties": {
          "color": {
            "title": "Colors used in Elements.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type color",
              "@studio-icon ph:palette"
            ],
            "id": "#tokensConfig/elements/color",
            "properties": {
              "text": {
                "id": "#tokensConfig/elements/color/text",
                "properties": {
                  "primary": {
                    "id": "#tokensConfig/elements/color/text/primary",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/elements/color/text/primary/default",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/color/text/primary/default/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/primary/default/value/initial",
                                "default": "{color.gray.900}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/primary/default/value/dark",
                                "default": "{color.gray.50}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.900}",
                              "dark": "{color.gray.50}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.900}",
                            "dark": "{color.gray.50}"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/elements/color/text/primary/hover",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": {
                          "initial": "{color.gray.900}",
                          "dark": "{color.gray.50}"
                        }
                      },
                      "hover": {}
                    }
                  },
                  "secondary": {
                    "id": "#tokensConfig/elements/color/text/secondary",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/elements/color/text/secondary/default",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/color/text/secondary/default/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/secondary/default/value/initial",
                                "default": "{color.gray.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/secondary/default/value/dark",
                                "default": "{color.gray.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.500}",
                              "dark": "{color.gray.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.500}",
                            "dark": "{color.gray.400}"
                          }
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/elements/color/text/secondary/hover",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/color/text/secondary/hover/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/secondary/hover/value/initial",
                                "default": "{color.gray.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/color/text/secondary/hover/value/dark",
                                "default": "{color.gray.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.gray.700}",
                              "dark": "{color.gray.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.gray.700}",
                            "dark": "{color.gray.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": {
                          "initial": "{color.gray.500}",
                          "dark": "{color.gray.400}"
                        }
                      },
                      "hover": {
                        "value": {
                          "initial": "{color.gray.700}",
                          "dark": "{color.gray.200}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "primary": {
                    "default": {
                      "value": {
                        "initial": "{color.gray.900}",
                        "dark": "{color.gray.50}"
                      }
                    },
                    "hover": {}
                  },
                  "secondary": {
                    "default": {
                      "value": {
                        "initial": "{color.gray.500}",
                        "dark": "{color.gray.400}"
                      }
                    },
                    "hover": {
                      "value": {
                        "initial": "{color.gray.700}",
                        "dark": "{color.gray.200}"
                      }
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "text": {
                "primary": {
                  "default": {
                    "value": {
                      "initial": "{color.gray.900}",
                      "dark": "{color.gray.50}"
                    }
                  },
                  "hover": {}
                },
                "secondary": {
                  "default": {
                    "value": {
                      "initial": "{color.gray.500}",
                      "dark": "{color.gray.400}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{color.gray.700}",
                      "dark": "{color.gray.200}"
                    }
                  }
                }
              }
            }
          },
          "container": {
            "title": "Main container sizings.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type size",
              "@studio-icon material-symbols:width-full-outline"
            ],
            "id": "#tokensConfig/elements/container",
            "properties": {
              "maxWidth": {
                "id": "#tokensConfig/elements/container/maxWidth",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/elements/container/maxWidth/value",
                    "default": "80rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "80rem"
                }
              },
              "padding": {
                "id": "#tokensConfig/elements/container/padding",
                "properties": {
                  "mobile": {
                    "id": "#tokensConfig/elements/container/padding/mobile",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/mobile/value",
                        "default": "{space.4}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.4}"
                    }
                  },
                  "xs": {
                    "id": "#tokensConfig/elements/container/padding/xs",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/xs/value",
                        "default": "{space.4}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.4}"
                    }
                  },
                  "sm": {
                    "id": "#tokensConfig/elements/container/padding/sm",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/sm/value",
                        "default": "{space.6}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.6}"
                    }
                  },
                  "md": {
                    "id": "#tokensConfig/elements/container/padding/md",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/elements/container/padding/md/value",
                        "default": "{space.6}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{space.6}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "mobile": {
                    "value": "{space.4}"
                  },
                  "xs": {
                    "value": "{space.4}"
                  },
                  "sm": {
                    "value": "{space.6}"
                  },
                  "md": {
                    "value": "{space.6}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "maxWidth": {
                "value": "80rem"
              },
              "padding": {
                "mobile": {
                  "value": "{space.4}"
                },
                "xs": {
                  "value": "{space.4}"
                },
                "sm": {
                  "value": "{space.6}"
                },
                "md": {
                  "value": "{space.6}"
                }
              }
            }
          },
          "backdrop": {
            "title": "Backdrops used in Elements.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type size",
              "@studio-icon material-symbols:blur-circular"
            ],
            "id": "#tokensConfig/elements/backdrop",
            "properties": {
              "filter": {
                "id": "#tokensConfig/elements/backdrop/filter",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/elements/backdrop/filter/value",
                    "default": "saturate(200%) blur(20px)"
                  }
                },
                "type": "object",
                "default": {
                  "value": "saturate(200%) blur(20px)"
                }
              },
              "background": {
                "id": "#tokensConfig/elements/backdrop/background",
                "properties": {
                  "value": {
                    "id": "#tokensConfig/elements/backdrop/background/value",
                    "properties": {
                      "initial": {
                        "type": "string",
                        "id": "#tokensConfig/elements/backdrop/background/value/initial",
                        "default": "#fffc"
                      },
                      "dark": {
                        "type": "string",
                        "id": "#tokensConfig/elements/backdrop/background/value/dark",
                        "default": "#0c0d0ccc"
                      }
                    },
                    "type": "object",
                    "default": {
                      "initial": "#fffc",
                      "dark": "#0c0d0ccc"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "value": {
                    "initial": "#fffc",
                    "dark": "#0c0d0ccc"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "filter": {
                "value": "saturate(200%) blur(20px)"
              },
              "background": {
                "value": {
                  "initial": "#fffc",
                  "dark": "#0c0d0ccc"
                }
              }
            }
          },
          "border": {
            "title": "Borders used in Elements.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type color",
              "@studio-icon material-symbols:border-all-outline-rounded"
            ],
            "id": "#tokensConfig/elements/border",
            "properties": {
              "primary": {
                "id": "#tokensConfig/elements/border/primary",
                "properties": {
                  "default": {
                    "id": "#tokensConfig/elements/border/primary/default",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/primary/default/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/default/value/initial",
                            "default": "{color.gray.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/default/value/dark",
                            "default": "{color.gray.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.100}",
                          "dark": "{color.gray.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.100}",
                        "dark": "{color.gray.900}"
                      }
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/elements/border/primary/hover",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/primary/hover/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/hover/value/initial",
                            "default": "{color.gray.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/primary/hover/value/dark",
                            "default": "{color.gray.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.200}",
                          "dark": "{color.gray.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.200}",
                        "dark": "{color.gray.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "default": {
                    "value": {
                      "initial": "{color.gray.100}",
                      "dark": "{color.gray.900}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "{color.gray.200}",
                      "dark": "{color.gray.800}"
                    }
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/elements/border/secondary",
                "properties": {
                  "default": {
                    "id": "#tokensConfig/elements/border/secondary/default",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/secondary/default/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/default/value/initial",
                            "default": "{color.gray.200}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/default/value/dark",
                            "default": "{color.gray.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.200}",
                          "dark": "{color.gray.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.200}",
                        "dark": "{color.gray.800}"
                      }
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/elements/border/secondary/hover",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/border/secondary/hover/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/hover/value/initial",
                            "default": ""
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/border/secondary/hover/value/dark",
                            "default": ""
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "",
                          "dark": ""
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "",
                        "dark": ""
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "default": {
                    "value": {
                      "initial": "{color.gray.200}",
                      "dark": "{color.gray.800}"
                    }
                  },
                  "hover": {
                    "value": {
                      "initial": "",
                      "dark": ""
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "default": {
                  "value": {
                    "initial": "{color.gray.100}",
                    "dark": "{color.gray.900}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{color.gray.200}",
                    "dark": "{color.gray.800}"
                  }
                }
              },
              "secondary": {
                "default": {
                  "value": {
                    "initial": "{color.gray.200}",
                    "dark": "{color.gray.800}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "",
                    "dark": ""
                  }
                }
              }
            }
          },
          "surface": {
            "title": "Surfaces used in Elements.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type color",
              "@studio-icon fluent:surface-hub-20-filled"
            ],
            "id": "#tokensConfig/elements/surface",
            "properties": {
              "background": {
                "id": "#tokensConfig/elements/surface/background",
                "properties": {
                  "base": {
                    "id": "#tokensConfig/elements/surface/background/base",
                    "properties": {
                      "value": {
                        "id": "#tokensConfig/elements/surface/background/base/value",
                        "properties": {
                          "initial": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/background/base/value/initial",
                            "default": "{color.gray.100}"
                          },
                          "dark": {
                            "type": "string",
                            "id": "#tokensConfig/elements/surface/background/base/value/dark",
                            "default": "{color.gray.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "initial": "{color.gray.100}",
                          "dark": "{color.gray.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": {
                        "initial": "{color.gray.100}",
                        "dark": "{color.gray.900}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "base": {
                    "value": {
                      "initial": "{color.gray.100}",
                      "dark": "{color.gray.900}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "background": {
                "base": {
                  "value": {
                    "initial": "{color.gray.100}",
                    "dark": "{color.gray.900}"
                  }
                }
              }
            }
          },
          "state": {
            "title": "Color states used in Elements.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type color",
              "@studio-icon mdi:palette-advanced"
            ],
            "id": "#tokensConfig/elements/state",
            "properties": {
              "primary": {
                "id": "#tokensConfig/elements/state/primary",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/primary/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/primary/value/initial",
                                "default": "{color.primary.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/primary/value/dark",
                                "default": "{color.primary.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.600}",
                              "dark": "{color.primary.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.600}",
                            "dark": "{color.primary.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/secondary/value/initial",
                                "default": "{color.primary.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/color/secondary/value/dark",
                                "default": "{color.primary.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.700}",
                              "dark": "{color.primary.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.700}",
                            "dark": "{color.primary.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.600}",
                          "dark": "{color.primary.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.primary.700}",
                          "dark": "{color.primary.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/primary/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value/initial",
                                "default": "{color.primary.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/primary/value/dark",
                                "default": "{color.primary.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.50}",
                              "dark": "{color.primary.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.50}",
                            "dark": "{color.primary.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value/initial",
                                "default": "{color.primary.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/backgroundColor/secondary/value/dark",
                                "default": "{color.primary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.100}",
                              "dark": "{color.primary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.100}",
                            "dark": "{color.primary.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.50}",
                          "dark": "{color.primary.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.primary.100}",
                          "dark": "{color.primary.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/primary/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/primary/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/primary/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/primary/value/initial",
                                "default": "{color.primary.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/primary/borderColor/primary/value/dark",
                                "default": "{color.primary.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.primary.100}",
                              "dark": "{color.primary.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.primary.100}",
                            "dark": "{color.primary.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/primary/borderColor/secondary",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.primary.100}",
                          "dark": "{color.primary.800}"
                        }
                      },
                      "secondary": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.600}",
                        "dark": "{color.primary.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.primary.700}",
                        "dark": "{color.primary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.50}",
                        "dark": "{color.primary.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.primary.100}",
                        "dark": "{color.primary.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.primary.100}",
                        "dark": "{color.primary.800}"
                      }
                    },
                    "secondary": {}
                  }
                }
              },
              "info": {
                "id": "#tokensConfig/elements/state/info",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/info/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/primary/value/initial",
                                "default": "{color.blue.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/primary/value/dark",
                                "default": "{color.blue.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.500}",
                              "dark": "{color.blue.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.500}",
                            "dark": "{color.blue.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/secondary/value/initial",
                                "default": "{color.blue.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/color/secondary/value/dark",
                                "default": "{color.blue.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.600}",
                              "dark": "{color.blue.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.600}",
                            "dark": "{color.blue.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.500}",
                          "dark": "{color.blue.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.blue.600}",
                          "dark": "{color.blue.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/info/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value/initial",
                                "default": "{color.blue.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/primary/value/dark",
                                "default": "{color.blue.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.50}",
                              "dark": "{color.blue.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.50}",
                            "dark": "{color.blue.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value/initial",
                                "default": "{color.blue.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/backgroundColor/secondary/value/dark",
                                "default": "{color.blue.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.100}",
                              "dark": "{color.blue.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.100}",
                            "dark": "{color.blue.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.50}",
                          "dark": "{color.blue.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.blue.100}",
                          "dark": "{color.blue.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/info/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/info/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/info/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/primary/value/initial",
                                "default": "{color.blue.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/info/borderColor/primary/value/dark",
                                "default": "{color.blue.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.blue.100}",
                              "dark": "{color.blue.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.blue.100}",
                            "dark": "{color.blue.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/info/borderColor/secondary",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.blue.100}",
                          "dark": "{color.blue.800}"
                        }
                      },
                      "secondary": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.500}",
                        "dark": "{color.blue.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.blue.600}",
                        "dark": "{color.blue.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.50}",
                        "dark": "{color.blue.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.blue.100}",
                        "dark": "{color.blue.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.blue.100}",
                        "dark": "{color.blue.800}"
                      }
                    },
                    "secondary": {}
                  }
                }
              },
              "success": {
                "id": "#tokensConfig/elements/state/success",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/success/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/primary/value/initial",
                                "default": "{color.green.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/primary/value/dark",
                                "default": "{color.green.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.500}",
                              "dark": "{color.green.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.500}",
                            "dark": "{color.green.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/secondary/value/initial",
                                "default": "{color.green.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/color/secondary/value/dark",
                                "default": "{color.green.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.600}",
                              "dark": "{color.green.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.600}",
                            "dark": "{color.green.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.500}",
                          "dark": "{color.green.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.green.600}",
                          "dark": "{color.green.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/success/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value/initial",
                                "default": "{color.green.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/primary/value/dark",
                                "default": "{color.green.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.50}",
                              "dark": "{color.green.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.50}",
                            "dark": "{color.green.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value/initial",
                                "default": "{color.green.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/backgroundColor/secondary/value/dark",
                                "default": "{color.green.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.100}",
                              "dark": "{color.green.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.100}",
                            "dark": "{color.green.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.50}",
                          "dark": "{color.green.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.green.100}",
                          "dark": "{color.green.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/success/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/success/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/success/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/primary/value/initial",
                                "default": "{color.green.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/success/borderColor/primary/value/dark",
                                "default": "{color.green.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.green.100}",
                              "dark": "{color.green.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.green.100}",
                            "dark": "{color.green.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/success/borderColor/secondary",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.green.100}",
                          "dark": "{color.green.800}"
                        }
                      },
                      "secondary": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.500}",
                        "dark": "{color.green.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.green.600}",
                        "dark": "{color.green.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.50}",
                        "dark": "{color.green.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.green.100}",
                        "dark": "{color.green.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.green.100}",
                        "dark": "{color.green.800}"
                      }
                    },
                    "secondary": {}
                  }
                }
              },
              "warning": {
                "id": "#tokensConfig/elements/state/warning",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/warning/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/primary/value/initial",
                                "default": "{color.yellow.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/primary/value/dark",
                                "default": "{color.yellow.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.600}",
                              "dark": "{color.yellow.400}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.600}",
                            "dark": "{color.yellow.400}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/secondary/value/initial",
                                "default": "{color.yellow.700}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/color/secondary/value/dark",
                                "default": "{color.yellow.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.700}",
                              "dark": "{color.yellow.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.700}",
                            "dark": "{color.yellow.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.600}",
                          "dark": "{color.yellow.400}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.yellow.700}",
                          "dark": "{color.yellow.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/warning/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value/initial",
                                "default": "{color.yellow.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/primary/value/dark",
                                "default": "{color.yellow.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.50}",
                              "dark": "{color.yellow.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.50}",
                            "dark": "{color.yellow.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value/initial",
                                "default": "{color.yellow.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/backgroundColor/secondary/value/dark",
                                "default": "{color.yellow.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.100}",
                              "dark": "{color.yellow.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.100}",
                            "dark": "{color.yellow.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.50}",
                          "dark": "{color.yellow.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.yellow.100}",
                          "dark": "{color.yellow.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/warning/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/warning/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/warning/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/primary/value/initial",
                                "default": "{color.yellow.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/warning/borderColor/primary/value/dark",
                                "default": "{color.yellow.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.yellow.100}",
                              "dark": "{color.yellow.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.yellow.100}",
                            "dark": "{color.yellow.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/warning/borderColor/secondary",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.yellow.100}",
                          "dark": "{color.yellow.800}"
                        }
                      },
                      "secondary": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.600}",
                        "dark": "{color.yellow.400}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.yellow.700}",
                        "dark": "{color.yellow.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.50}",
                        "dark": "{color.yellow.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.yellow.100}",
                        "dark": "{color.yellow.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.yellow.100}",
                        "dark": "{color.yellow.800}"
                      }
                    },
                    "secondary": {}
                  }
                }
              },
              "danger": {
                "id": "#tokensConfig/elements/state/danger",
                "properties": {
                  "color": {
                    "id": "#tokensConfig/elements/state/danger/color",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/color/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/color/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/primary/value/initial",
                                "default": "{color.red.500}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/primary/value/dark",
                                "default": "{color.red.300}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.500}",
                              "dark": "{color.red.300}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.500}",
                            "dark": "{color.red.300}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/color/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/color/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/secondary/value/initial",
                                "default": "{color.red.600}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/color/secondary/value/dark",
                                "default": "{color.red.200}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.600}",
                              "dark": "{color.red.200}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.600}",
                            "dark": "{color.red.200}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.500}",
                          "dark": "{color.red.300}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.red.600}",
                          "dark": "{color.red.200}"
                        }
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/elements/state/danger/backgroundColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/backgroundColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value/initial",
                                "default": "{color.red.50}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/primary/value/dark",
                                "default": "{color.red.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.50}",
                              "dark": "{color.red.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.50}",
                            "dark": "{color.red.900}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value/initial",
                                "default": "{color.red.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/backgroundColor/secondary/value/dark",
                                "default": "{color.red.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.100}",
                              "dark": "{color.red.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.100}",
                            "dark": "{color.red.800}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.50}",
                          "dark": "{color.red.900}"
                        }
                      },
                      "secondary": {
                        "value": {
                          "initial": "{color.red.100}",
                          "dark": "{color.red.800}"
                        }
                      }
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/elements/state/danger/borderColor",
                    "properties": {
                      "primary": {
                        "id": "#tokensConfig/elements/state/danger/borderColor/primary",
                        "properties": {
                          "value": {
                            "id": "#tokensConfig/elements/state/danger/borderColor/primary/value",
                            "properties": {
                              "initial": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/primary/value/initial",
                                "default": "{color.red.100}"
                              },
                              "dark": {
                                "type": "string",
                                "id": "#tokensConfig/elements/state/danger/borderColor/primary/value/dark",
                                "default": "{color.red.800}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "initial": "{color.red.100}",
                              "dark": "{color.red.800}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": {
                            "initial": "{color.red.100}",
                            "dark": "{color.red.800}"
                          }
                        }
                      },
                      "secondary": {
                        "id": "#tokensConfig/elements/state/danger/borderColor/secondary",
                        "type": "any",
                        "default": {}
                      }
                    },
                    "type": "object",
                    "default": {
                      "primary": {
                        "value": {
                          "initial": "{color.red.100}",
                          "dark": "{color.red.800}"
                        }
                      },
                      "secondary": {}
                    }
                  }
                },
                "type": "object",
                "default": {
                  "color": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.500}",
                        "dark": "{color.red.300}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.red.600}",
                        "dark": "{color.red.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.50}",
                        "dark": "{color.red.900}"
                      }
                    },
                    "secondary": {
                      "value": {
                        "initial": "{color.red.100}",
                        "dark": "{color.red.800}"
                      }
                    }
                  },
                  "borderColor": {
                    "primary": {
                      "value": {
                        "initial": "{color.red.100}",
                        "dark": "{color.red.800}"
                      }
                    },
                    "secondary": {}
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.600}",
                      "dark": "{color.primary.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.primary.700}",
                      "dark": "{color.primary.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.50}",
                      "dark": "{color.primary.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.primary.100}",
                      "dark": "{color.primary.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.primary.100}",
                      "dark": "{color.primary.800}"
                    }
                  },
                  "secondary": {}
                }
              },
              "info": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.500}",
                      "dark": "{color.blue.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.blue.600}",
                      "dark": "{color.blue.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.50}",
                      "dark": "{color.blue.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.blue.100}",
                      "dark": "{color.blue.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.blue.100}",
                      "dark": "{color.blue.800}"
                    }
                  },
                  "secondary": {}
                }
              },
              "success": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.500}",
                      "dark": "{color.green.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.green.600}",
                      "dark": "{color.green.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.50}",
                      "dark": "{color.green.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.green.100}",
                      "dark": "{color.green.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.green.100}",
                      "dark": "{color.green.800}"
                    }
                  },
                  "secondary": {}
                }
              },
              "warning": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.600}",
                      "dark": "{color.yellow.400}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.yellow.700}",
                      "dark": "{color.yellow.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.50}",
                      "dark": "{color.yellow.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.yellow.100}",
                      "dark": "{color.yellow.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.yellow.100}",
                      "dark": "{color.yellow.800}"
                    }
                  },
                  "secondary": {}
                }
              },
              "danger": {
                "color": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.500}",
                      "dark": "{color.red.300}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.red.600}",
                      "dark": "{color.red.200}"
                    }
                  }
                },
                "backgroundColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.50}",
                      "dark": "{color.red.900}"
                    }
                  },
                  "secondary": {
                    "value": {
                      "initial": "{color.red.100}",
                      "dark": "{color.red.800}"
                    }
                  }
                },
                "borderColor": {
                  "primary": {
                    "value": {
                      "initial": "{color.red.100}",
                      "dark": "{color.red.800}"
                    }
                  },
                  "secondary": {}
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "color": {
            "text": {
              "primary": {
                "default": {
                  "value": {
                    "initial": "{color.gray.900}",
                    "dark": "{color.gray.50}"
                  }
                },
                "hover": {}
              },
              "secondary": {
                "default": {
                  "value": {
                    "initial": "{color.gray.500}",
                    "dark": "{color.gray.400}"
                  }
                },
                "hover": {
                  "value": {
                    "initial": "{color.gray.700}",
                    "dark": "{color.gray.200}"
                  }
                }
              }
            }
          },
          "container": {
            "maxWidth": {
              "value": "80rem"
            },
            "padding": {
              "mobile": {
                "value": "{space.4}"
              },
              "xs": {
                "value": "{space.4}"
              },
              "sm": {
                "value": "{space.6}"
              },
              "md": {
                "value": "{space.6}"
              }
            }
          },
          "backdrop": {
            "filter": {
              "value": "saturate(200%) blur(20px)"
            },
            "background": {
              "value": {
                "initial": "#fffc",
                "dark": "#0c0d0ccc"
              }
            }
          },
          "border": {
            "primary": {
              "default": {
                "value": {
                  "initial": "{color.gray.100}",
                  "dark": "{color.gray.900}"
                }
              },
              "hover": {
                "value": {
                  "initial": "{color.gray.200}",
                  "dark": "{color.gray.800}"
                }
              }
            },
            "secondary": {
              "default": {
                "value": {
                  "initial": "{color.gray.200}",
                  "dark": "{color.gray.800}"
                }
              },
              "hover": {
                "value": {
                  "initial": "",
                  "dark": ""
                }
              }
            }
          },
          "surface": {
            "background": {
              "base": {
                "value": {
                  "initial": "{color.gray.100}",
                  "dark": "{color.gray.900}"
                }
              }
            }
          },
          "state": {
            "primary": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.600}",
                    "dark": "{color.primary.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.primary.700}",
                    "dark": "{color.primary.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.50}",
                    "dark": "{color.primary.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.primary.100}",
                    "dark": "{color.primary.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.primary.100}",
                    "dark": "{color.primary.800}"
                  }
                },
                "secondary": {}
              }
            },
            "info": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.500}",
                    "dark": "{color.blue.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.blue.600}",
                    "dark": "{color.blue.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.50}",
                    "dark": "{color.blue.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.blue.100}",
                    "dark": "{color.blue.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.blue.100}",
                    "dark": "{color.blue.800}"
                  }
                },
                "secondary": {}
              }
            },
            "success": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.green.500}",
                    "dark": "{color.green.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.green.600}",
                    "dark": "{color.green.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.green.50}",
                    "dark": "{color.green.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.green.100}",
                    "dark": "{color.green.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.green.100}",
                    "dark": "{color.green.800}"
                  }
                },
                "secondary": {}
              }
            },
            "warning": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.600}",
                    "dark": "{color.yellow.400}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.yellow.700}",
                    "dark": "{color.yellow.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.50}",
                    "dark": "{color.yellow.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.yellow.100}",
                    "dark": "{color.yellow.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.yellow.100}",
                    "dark": "{color.yellow.800}"
                  }
                },
                "secondary": {}
              }
            },
            "danger": {
              "color": {
                "primary": {
                  "value": {
                    "initial": "{color.red.500}",
                    "dark": "{color.red.300}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.red.600}",
                    "dark": "{color.red.200}"
                  }
                }
              },
              "backgroundColor": {
                "primary": {
                  "value": {
                    "initial": "{color.red.50}",
                    "dark": "{color.red.900}"
                  }
                },
                "secondary": {
                  "value": {
                    "initial": "{color.red.100}",
                    "dark": "{color.red.800}"
                  }
                }
              },
              "borderColor": {
                "primary": {
                  "value": {
                    "initial": "{color.red.100}",
                    "dark": "{color.red.800}"
                  }
                },
                "secondary": {}
              }
            }
          }
        }
      },
      "typography": {
        "title": "All the configurable tokens for your Typography.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type color",
          "@studio-icon material-symbols:article"
        ],
        "id": "#tokensConfig/typography",
        "properties": {
          "verticalMargin": {
            "title": "Vertical spacings between paragraphs.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type size",
              "@studio-icon mingcute:line-height-line"
            ],
            "id": "#tokensConfig/typography/verticalMargin",
            "properties": {
              "sm": {
                "id": "#tokensConfig/typography/verticalMargin/sm",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/verticalMargin/sm/value",
                    "default": "16px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "16px"
                }
              },
              "base": {
                "id": "#tokensConfig/typography/verticalMargin/base",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/verticalMargin/base/value",
                    "default": "32px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "32px"
                }
              }
            },
            "type": "object",
            "default": {
              "sm": {
                "value": "16px"
              },
              "base": {
                "value": "32px"
              }
            }
          },
          "letterSpacing": {
            "title": "Horizontal spacings between letters.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type size",
              "@studio-icon mingcute:letter-spacing-line"
            ],
            "id": "#tokensConfig/typography/letterSpacing",
            "properties": {
              "tight": {
                "id": "#tokensConfig/typography/letterSpacing/tight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/letterSpacing/tight/value",
                    "default": "-0.025em"
                  }
                },
                "type": "object",
                "default": {
                  "value": "-0.025em"
                }
              },
              "wide": {
                "id": "#tokensConfig/typography/letterSpacing/wide",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/letterSpacing/wide/value",
                    "default": "0.025em"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.025em"
                }
              }
            },
            "type": "object",
            "default": {
              "tight": {
                "value": "-0.025em"
              },
              "wide": {
                "value": "0.025em"
              }
            }
          },
          "fontSize": {
            "title": "Horizontal spacings between letters.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type font-size",
              "@studio-icon mingcute:font-size-fill"
            ],
            "id": "#tokensConfig/typography/fontSize",
            "properties": {
              "xs": {
                "id": "#tokensConfig/typography/fontSize/xs",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/xs/value",
                    "default": "12px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "12px"
                }
              },
              "sm": {
                "id": "#tokensConfig/typography/fontSize/sm",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/sm/value",
                    "default": "14px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "14px"
                }
              },
              "base": {
                "id": "#tokensConfig/typography/fontSize/base",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/base/value",
                    "default": "16px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "16px"
                }
              },
              "lg": {
                "id": "#tokensConfig/typography/fontSize/lg",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/lg/value",
                    "default": "18px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "18px"
                }
              },
              "xl": {
                "id": "#tokensConfig/typography/fontSize/xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/xl/value",
                    "default": "20px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "20px"
                }
              },
              "2xl": {
                "id": "#tokensConfig/typography/fontSize/2xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/2xl/value",
                    "default": "24px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "24px"
                }
              },
              "3xl": {
                "id": "#tokensConfig/typography/fontSize/3xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/3xl/value",
                    "default": "30px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "30px"
                }
              },
              "4xl": {
                "id": "#tokensConfig/typography/fontSize/4xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/4xl/value",
                    "default": "36px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "36px"
                }
              },
              "5xl": {
                "id": "#tokensConfig/typography/fontSize/5xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/5xl/value",
                    "default": "48px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "48px"
                }
              },
              "6xl": {
                "id": "#tokensConfig/typography/fontSize/6xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/6xl/value",
                    "default": "60px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "60px"
                }
              },
              "7xl": {
                "id": "#tokensConfig/typography/fontSize/7xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/7xl/value",
                    "default": "72px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "72px"
                }
              },
              "8xl": {
                "id": "#tokensConfig/typography/fontSize/8xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/8xl/value",
                    "default": "96px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "96px"
                }
              },
              "9xl": {
                "id": "#tokensConfig/typography/fontSize/9xl",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontSize/9xl/value",
                    "default": "128px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "128px"
                }
              }
            },
            "type": "object",
            "default": {
              "xs": {
                "value": "12px"
              },
              "sm": {
                "value": "14px"
              },
              "base": {
                "value": "16px"
              },
              "lg": {
                "value": "18px"
              },
              "xl": {
                "value": "20px"
              },
              "2xl": {
                "value": "24px"
              },
              "3xl": {
                "value": "30px"
              },
              "4xl": {
                "value": "36px"
              },
              "5xl": {
                "value": "48px"
              },
              "6xl": {
                "value": "60px"
              },
              "7xl": {
                "value": "72px"
              },
              "8xl": {
                "value": "96px"
              },
              "9xl": {
                "value": "128px"
              }
            }
          },
          "fontWeight": {
            "title": "Font weights used in typography.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type font-size",
              "@studio-icon mingcute:bold-fill"
            ],
            "id": "#tokensConfig/typography/fontWeight",
            "properties": {
              "thin": {
                "id": "#tokensConfig/typography/fontWeight/thin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/thin/value",
                    "default": "100"
                  }
                },
                "type": "object",
                "default": {
                  "value": "100"
                }
              },
              "extralight": {
                "id": "#tokensConfig/typography/fontWeight/extralight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/extralight/value",
                    "default": "200"
                  }
                },
                "type": "object",
                "default": {
                  "value": "200"
                }
              },
              "light": {
                "id": "#tokensConfig/typography/fontWeight/light",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/light/value",
                    "default": "300"
                  }
                },
                "type": "object",
                "default": {
                  "value": "300"
                }
              },
              "normal": {
                "id": "#tokensConfig/typography/fontWeight/normal",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/normal/value",
                    "default": "400"
                  }
                },
                "type": "object",
                "default": {
                  "value": "400"
                }
              },
              "medium": {
                "id": "#tokensConfig/typography/fontWeight/medium",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/medium/value",
                    "default": "500"
                  }
                },
                "type": "object",
                "default": {
                  "value": "500"
                }
              },
              "semibold": {
                "id": "#tokensConfig/typography/fontWeight/semibold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/semibold/value",
                    "default": "600"
                  }
                },
                "type": "object",
                "default": {
                  "value": "600"
                }
              },
              "bold": {
                "id": "#tokensConfig/typography/fontWeight/bold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/bold/value",
                    "default": "700"
                  }
                },
                "type": "object",
                "default": {
                  "value": "700"
                }
              },
              "extrabold": {
                "id": "#tokensConfig/typography/fontWeight/extrabold",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/extrabold/value",
                    "default": "800"
                  }
                },
                "type": "object",
                "default": {
                  "value": "800"
                }
              },
              "black": {
                "id": "#tokensConfig/typography/fontWeight/black",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/fontWeight/black/value",
                    "default": "900"
                  }
                },
                "type": "object",
                "default": {
                  "value": "900"
                }
              }
            },
            "type": "object",
            "default": {
              "thin": {
                "value": "100"
              },
              "extralight": {
                "value": "200"
              },
              "light": {
                "value": "300"
              },
              "normal": {
                "value": "400"
              },
              "medium": {
                "value": "500"
              },
              "semibold": {
                "value": "600"
              },
              "bold": {
                "value": "700"
              },
              "extrabold": {
                "value": "800"
              },
              "black": {
                "value": "900"
              }
            }
          },
          "lead": {
            "title": "Line heights used in your typography.",
            "tags": [
              "@studio-input design-token",
              "@studio-input-token-type font-size",
              "@studio-icon material-symbols:height-rounded"
            ],
            "id": "#tokensConfig/typography/lead",
            "properties": {
              "none": {
                "id": "#tokensConfig/typography/lead/none",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/none/value",
                    "default": "1"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1"
                }
              },
              "tight": {
                "id": "#tokensConfig/typography/lead/tight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/tight/value",
                    "default": "1.25"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.25"
                }
              },
              "snug": {
                "id": "#tokensConfig/typography/lead/snug",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/snug/value",
                    "default": "1.375"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.375"
                }
              },
              "normal": {
                "id": "#tokensConfig/typography/lead/normal",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/normal/value",
                    "default": "1.5"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.5"
                }
              },
              "relaxed": {
                "id": "#tokensConfig/typography/lead/relaxed",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/relaxed/value",
                    "default": "1.625"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1.625"
                }
              },
              "loose": {
                "id": "#tokensConfig/typography/lead/loose",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/typography/lead/loose/value",
                    "default": "2"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2"
                }
              }
            },
            "type": "object",
            "default": {
              "none": {
                "value": "1"
              },
              "tight": {
                "value": "1.25"
              },
              "snug": {
                "value": "1.375"
              },
              "normal": {
                "value": "1.5"
              },
              "relaxed": {
                "value": "1.625"
              },
              "loose": {
                "value": "2"
              }
            }
          },
          "color": {
            "id": "#tokensConfig/typography/color",
            "properties": {
              "primary": {
                "id": "#tokensConfig/typography/color/primary",
                "properties": {
                  "50": {
                    "id": "#tokensConfig/typography/color/primary/50",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/50/value",
                        "default": "{color.primary.50}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.50}"
                    }
                  },
                  "100": {
                    "id": "#tokensConfig/typography/color/primary/100",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/100/value",
                        "default": "{color.primary.100}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.100}"
                    }
                  },
                  "200": {
                    "id": "#tokensConfig/typography/color/primary/200",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/200/value",
                        "default": "{color.primary.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.200}"
                    }
                  },
                  "300": {
                    "id": "#tokensConfig/typography/color/primary/300",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/300/value",
                        "default": "{color.primary.300}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.300}"
                    }
                  },
                  "400": {
                    "id": "#tokensConfig/typography/color/primary/400",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/400/value",
                        "default": "{color.primary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.400}"
                    }
                  },
                  "500": {
                    "id": "#tokensConfig/typography/color/primary/500",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/500/value",
                        "default": "{color.primary.500}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.500}"
                    }
                  },
                  "600": {
                    "id": "#tokensConfig/typography/color/primary/600",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/600/value",
                        "default": "{color.primary.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.600}"
                    }
                  },
                  "700": {
                    "id": "#tokensConfig/typography/color/primary/700",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/700/value",
                        "default": "{color.primary.700}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.700}"
                    }
                  },
                  "800": {
                    "id": "#tokensConfig/typography/color/primary/800",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/800/value",
                        "default": "{color.primary.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.800}"
                    }
                  },
                  "900": {
                    "id": "#tokensConfig/typography/color/primary/900",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/primary/900/value",
                        "default": "{color.primary.900}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.primary.900}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "50": {
                    "value": "{color.primary.50}"
                  },
                  "100": {
                    "value": "{color.primary.100}"
                  },
                  "200": {
                    "value": "{color.primary.200}"
                  },
                  "300": {
                    "value": "{color.primary.300}"
                  },
                  "400": {
                    "value": "{color.primary.400}"
                  },
                  "500": {
                    "value": "{color.primary.500}"
                  },
                  "600": {
                    "value": "{color.primary.600}"
                  },
                  "700": {
                    "value": "{color.primary.700}"
                  },
                  "800": {
                    "value": "{color.primary.800}"
                  },
                  "900": {
                    "value": "{color.primary.900}"
                  }
                }
              },
              "secondary": {
                "id": "#tokensConfig/typography/color/secondary",
                "properties": {
                  "50": {
                    "id": "#tokensConfig/typography/color/secondary/50",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/50/value",
                        "default": "{color.gray.50}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.50}"
                    }
                  },
                  "100": {
                    "id": "#tokensConfig/typography/color/secondary/100",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/100/value",
                        "default": "{color.gray.100}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.100}"
                    }
                  },
                  "200": {
                    "id": "#tokensConfig/typography/color/secondary/200",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/200/value",
                        "default": "{color.gray.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.200}"
                    }
                  },
                  "300": {
                    "id": "#tokensConfig/typography/color/secondary/300",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/300/value",
                        "default": "{color.gray.300}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.300}"
                    }
                  },
                  "400": {
                    "id": "#tokensConfig/typography/color/secondary/400",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/400/value",
                        "default": "{color.gray.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.400}"
                    }
                  },
                  "500": {
                    "id": "#tokensConfig/typography/color/secondary/500",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/500/value",
                        "default": "{color.gray.500}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.500}"
                    }
                  },
                  "600": {
                    "id": "#tokensConfig/typography/color/secondary/600",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/600/value",
                        "default": "{color.gray.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.600}"
                    }
                  },
                  "700": {
                    "id": "#tokensConfig/typography/color/secondary/700",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/700/value",
                        "default": "{color.gray.700}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.700}"
                    }
                  },
                  "800": {
                    "id": "#tokensConfig/typography/color/secondary/800",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/800/value",
                        "default": "{color.gray.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.800}"
                    }
                  },
                  "900": {
                    "id": "#tokensConfig/typography/color/secondary/900",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/typography/color/secondary/900/value",
                        "default": "{color.gray.900}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{color.gray.900}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "50": {
                    "value": "{color.gray.50}"
                  },
                  "100": {
                    "value": "{color.gray.100}"
                  },
                  "200": {
                    "value": "{color.gray.200}"
                  },
                  "300": {
                    "value": "{color.gray.300}"
                  },
                  "400": {
                    "value": "{color.gray.400}"
                  },
                  "500": {
                    "value": "{color.gray.500}"
                  },
                  "600": {
                    "value": "{color.gray.600}"
                  },
                  "700": {
                    "value": "{color.gray.700}"
                  },
                  "800": {
                    "value": "{color.gray.800}"
                  },
                  "900": {
                    "value": "{color.gray.900}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "primary": {
                "50": {
                  "value": "{color.primary.50}"
                },
                "100": {
                  "value": "{color.primary.100}"
                },
                "200": {
                  "value": "{color.primary.200}"
                },
                "300": {
                  "value": "{color.primary.300}"
                },
                "400": {
                  "value": "{color.primary.400}"
                },
                "500": {
                  "value": "{color.primary.500}"
                },
                "600": {
                  "value": "{color.primary.600}"
                },
                "700": {
                  "value": "{color.primary.700}"
                },
                "800": {
                  "value": "{color.primary.800}"
                },
                "900": {
                  "value": "{color.primary.900}"
                }
              },
              "secondary": {
                "50": {
                  "value": "{color.gray.50}"
                },
                "100": {
                  "value": "{color.gray.100}"
                },
                "200": {
                  "value": "{color.gray.200}"
                },
                "300": {
                  "value": "{color.gray.300}"
                },
                "400": {
                  "value": "{color.gray.400}"
                },
                "500": {
                  "value": "{color.gray.500}"
                },
                "600": {
                  "value": "{color.gray.600}"
                },
                "700": {
                  "value": "{color.gray.700}"
                },
                "800": {
                  "value": "{color.gray.800}"
                },
                "900": {
                  "value": "{color.gray.900}"
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "verticalMargin": {
            "sm": {
              "value": "16px"
            },
            "base": {
              "value": "32px"
            }
          },
          "letterSpacing": {
            "tight": {
              "value": "-0.025em"
            },
            "wide": {
              "value": "0.025em"
            }
          },
          "fontSize": {
            "xs": {
              "value": "12px"
            },
            "sm": {
              "value": "14px"
            },
            "base": {
              "value": "16px"
            },
            "lg": {
              "value": "18px"
            },
            "xl": {
              "value": "20px"
            },
            "2xl": {
              "value": "24px"
            },
            "3xl": {
              "value": "30px"
            },
            "4xl": {
              "value": "36px"
            },
            "5xl": {
              "value": "48px"
            },
            "6xl": {
              "value": "60px"
            },
            "7xl": {
              "value": "72px"
            },
            "8xl": {
              "value": "96px"
            },
            "9xl": {
              "value": "128px"
            }
          },
          "fontWeight": {
            "thin": {
              "value": "100"
            },
            "extralight": {
              "value": "200"
            },
            "light": {
              "value": "300"
            },
            "normal": {
              "value": "400"
            },
            "medium": {
              "value": "500"
            },
            "semibold": {
              "value": "600"
            },
            "bold": {
              "value": "700"
            },
            "extrabold": {
              "value": "800"
            },
            "black": {
              "value": "900"
            }
          },
          "lead": {
            "none": {
              "value": "1"
            },
            "tight": {
              "value": "1.25"
            },
            "snug": {
              "value": "1.375"
            },
            "normal": {
              "value": "1.5"
            },
            "relaxed": {
              "value": "1.625"
            },
            "loose": {
              "value": "2"
            }
          },
          "color": {
            "primary": {
              "50": {
                "value": "{color.primary.50}"
              },
              "100": {
                "value": "{color.primary.100}"
              },
              "200": {
                "value": "{color.primary.200}"
              },
              "300": {
                "value": "{color.primary.300}"
              },
              "400": {
                "value": "{color.primary.400}"
              },
              "500": {
                "value": "{color.primary.500}"
              },
              "600": {
                "value": "{color.primary.600}"
              },
              "700": {
                "value": "{color.primary.700}"
              },
              "800": {
                "value": "{color.primary.800}"
              },
              "900": {
                "value": "{color.primary.900}"
              }
            },
            "secondary": {
              "50": {
                "value": "{color.gray.50}"
              },
              "100": {
                "value": "{color.gray.100}"
              },
              "200": {
                "value": "{color.gray.200}"
              },
              "300": {
                "value": "{color.gray.300}"
              },
              "400": {
                "value": "{color.gray.400}"
              },
              "500": {
                "value": "{color.gray.500}"
              },
              "600": {
                "value": "{color.gray.600}"
              },
              "700": {
                "value": "{color.gray.700}"
              },
              "800": {
                "value": "{color.gray.800}"
              },
              "900": {
                "value": "{color.gray.900}"
              }
            }
          }
        }
      },
      "prose": {
        "title": "All the configurable tokens for your Prose components.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type font-size",
          "@studio-icon lucide:component"
        ],
        "id": "#tokensConfig/prose",
        "properties": {
          "p": {
            "id": "#tokensConfig/prose/p",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/prose/p/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/fontSize/value",
                    "default": "{typography.fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.base}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/p/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/lineHeight/value",
                    "default": "{typography.lead.normal}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.normal}"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/p/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/p/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "br": {
                "id": "#tokensConfig/prose/p/br",
                "properties": {
                  "margin": {
                    "id": "#tokensConfig/prose/p/br/margin",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/p/br/margin/value",
                        "default": "{typography.verticalMargin.base} 0 0 0"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.base} 0 0 0"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "margin": {
                    "value": "{typography.verticalMargin.base} 0 0 0"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{typography.fontSize.base}"
              },
              "lineHeight": {
                "value": "{typography.lead.normal}"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "br": {
                "margin": {
                  "value": "{typography.verticalMargin.base} 0 0 0"
                }
              }
            }
          },
          "h1": {
            "id": "#tokensConfig/prose/h1",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h1/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/margin/value",
                    "default": "0 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h1/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/fontSize/value",
                    "default": "{typography.fontSize.5xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.5xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h1/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/lineHeight/value",
                    "default": "{typography.lead.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.tight}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h1/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/fontWeight/value",
                    "default": "{typography.fontWeight.bold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.bold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h1/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h1/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h1/iconSize/value",
                    "default": "{typography.fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.3xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "0 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.5xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.tight}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.bold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.3xl}"
              }
            }
          },
          "h2": {
            "id": "#tokensConfig/prose/h2",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h2/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h2/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/fontSize/value",
                    "default": "{typography.fontSize.4xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.4xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h2/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/lineHeight/value",
                    "default": "{typography.lead.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.tight}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h2/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h2/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h2/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h2/iconSize/value",
                    "default": "{typography.fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.2xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.4xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.tight}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.2xl}"
              }
            }
          },
          "h3": {
            "id": "#tokensConfig/prose/h3",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h3/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h3/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/fontSize/value",
                    "default": "{typography.fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.3xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h3/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h3/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h3/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h3/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h3/iconSize/value",
                    "default": "{typography.fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.xl}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.3xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.xl}"
              }
            }
          },
          "h4": {
            "id": "#tokensConfig/prose/h4",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h4/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h4/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/fontSize/value",
                    "default": "{typography.fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.2xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h4/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h4/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "letterSpacing": {
                "id": "#tokensConfig/prose/h4/letterSpacing",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/letterSpacing/value",
                    "default": "{typography.letterSpacing.tight}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.letterSpacing.tight}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h4/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h4/iconSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.2xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "letterSpacing": {
                "value": "{typography.letterSpacing.tight}"
              },
              "iconSize": {
                "value": "{typography.fontSize.lg}"
              }
            }
          },
          "h5": {
            "id": "#tokensConfig/prose/h5",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h5/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h5/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/fontSize/value",
                    "default": "{typography.fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h5/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/lineHeight/value",
                    "default": "{typography.lead.snug}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.snug}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h5/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h5/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h5/iconSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.xl}"
              },
              "lineHeight": {
                "value": "{typography.lead.snug}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "iconSize": {
                "value": "{typography.fontSize.lg}"
              }
            }
          },
          "h6": {
            "id": "#tokensConfig/prose/h6",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/h6/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/margin/value",
                    "default": "3rem 0 2rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "3rem 0 2rem"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/h6/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/fontSize/value",
                    "default": "{typography.fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.lg}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/h6/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/lineHeight/value",
                    "default": "{typography.lead.normal}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.lead.normal}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/h6/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              },
              "iconSize": {
                "id": "#tokensConfig/prose/h6/iconSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/h6/iconSize/value",
                    "default": "{typography.fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.base}"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "3rem 0 2rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.lg}"
              },
              "lineHeight": {
                "value": "{typography.lead.normal}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              },
              "iconSize": {
                "value": "{typography.fontSize.base}"
              }
            }
          },
          "strong": {
            "id": "#tokensConfig/prose/strong",
            "properties": {
              "fontWeight": {
                "id": "#tokensConfig/prose/strong/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/strong/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              }
            }
          },
          "img": {
            "id": "#tokensConfig/prose/img",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/img/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/img/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              }
            }
          },
          "a": {
            "id": "#tokensConfig/prose/a",
            "properties": {
              "textDecoration": {
                "id": "#tokensConfig/prose/a/textDecoration",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/textDecoration/value",
                    "default": "none"
                  }
                },
                "type": "object",
                "default": {
                  "value": "none"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/a/color",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/a/color/light",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/prose/a/color/light/default",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/light/default/value",
                            "default": "inherit"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "inherit"
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/color/light/hover",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/light/hover/value",
                            "default": "{typography.color.primary.500}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.primary.500}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": "inherit"
                      },
                      "hover": {
                        "value": "{typography.color.primary.500}"
                      }
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/a/color/dark",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/prose/a/color/dark/default",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/dark/default/value",
                            "default": "inherit"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "inherit"
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/color/dark/hover",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/color/dark/hover/value",
                            "default": "{typography.color.primary.400}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.primary.400}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": "inherit"
                      },
                      "hover": {
                        "value": "{typography.color.primary.400}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "default": {
                      "value": "inherit"
                    },
                    "hover": {
                      "value": "{typography.color.primary.500}"
                    }
                  },
                  "dark": {
                    "default": {
                      "value": "inherit"
                    },
                    "hover": {
                      "value": "{typography.color.primary.400}"
                    }
                  }
                }
              },
              "borderBottom": {
                "id": "#tokensConfig/prose/a/borderBottom",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/borderBottom/value",
                    "default": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
                }
              },
              "borderWidth": {
                "id": "#tokensConfig/prose/a/borderWidth",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/borderWidth/value",
                    "default": "1px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1px"
                }
              },
              "borderColor": {
                "id": "#tokensConfig/prose/a/borderColor",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/a/borderColor/light",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/prose/a/borderColor/light/default",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/borderColor/light/default/value",
                            "default": "{typography.color.secondary.400}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.400}"
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/borderColor/light/hover",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/borderColor/light/hover/value",
                            "default": "{typography.color.primary.500}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.primary.500}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": "{typography.color.secondary.400}"
                      },
                      "hover": {
                        "value": "{typography.color.primary.500}"
                      }
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/a/borderColor/dark",
                    "properties": {
                      "default": {
                        "id": "#tokensConfig/prose/a/borderColor/dark/default",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/borderColor/dark/default/value",
                            "default": "{typography.color.secondary.400}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.400}"
                        }
                      },
                      "hover": {
                        "id": "#tokensConfig/prose/a/borderColor/dark/hover",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/a/borderColor/dark/hover/value",
                            "default": "{typography.color.primary.500}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.primary.500}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "default": {
                        "value": "{typography.color.secondary.400}"
                      },
                      "hover": {
                        "value": "{typography.color.primary.500}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "default": {
                      "value": "{typography.color.secondary.400}"
                    },
                    "hover": {
                      "value": "{typography.color.primary.500}"
                    }
                  },
                  "dark": {
                    "default": {
                      "value": "{typography.color.secondary.400}"
                    },
                    "hover": {
                      "value": "{typography.color.primary.500}"
                    }
                  }
                }
              },
              "borderStyle": {
                "id": "#tokensConfig/prose/a/borderStyle",
                "properties": {
                  "default": {
                    "id": "#tokensConfig/prose/a/borderStyle/default",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/borderStyle/default/value",
                        "default": "dashed"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "dashed"
                    }
                  },
                  "hover": {
                    "id": "#tokensConfig/prose/a/borderStyle/hover",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/borderStyle/hover/value",
                        "default": "solid"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "solid"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "default": {
                    "value": "dashed"
                  },
                  "hover": {
                    "value": "solid"
                  }
                }
              },
              "borderDistance": {
                "id": "#tokensConfig/prose/a/borderDistance",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/borderDistance/value",
                    "default": "2px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "2px"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/a/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/a/fontWeight/value",
                    "default": "{typography.fontWeight.medium}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.medium}"
                }
              },
              "hasCode": {
                "id": "#tokensConfig/prose/a/hasCode",
                "properties": {
                  "borderBottom": {
                    "id": "#tokensConfig/prose/a/hasCode/borderBottom",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/hasCode/borderBottom/value",
                        "default": "none"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "none"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderBottom": {
                    "value": "none"
                  }
                }
              },
              "code": {
                "id": "#tokensConfig/prose/a/code",
                "properties": {
                  "border": {
                    "id": "#tokensConfig/prose/a/code/border",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/a/code/border/value",
                        "default": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/prose/a/code/borderColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/a/code/borderColor/light",
                        "properties": {
                          "default": {
                            "id": "#tokensConfig/prose/a/code/borderColor/light/default",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/borderColor/light/default/value",
                                "default": "{typography.color.secondary.400}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.secondary.400}"
                            }
                          },
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/borderColor/light/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/borderColor/light/hover/value",
                                "default": "{typography.color.primary.500}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.500}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "default": {
                            "value": "{typography.color.secondary.400}"
                          },
                          "hover": {
                            "value": "{typography.color.primary.500}"
                          }
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/a/code/borderColor/dark",
                        "properties": {
                          "default": {
                            "id": "#tokensConfig/prose/a/code/borderColor/dark/default",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/borderColor/dark/default/value",
                                "default": "{typography.color.secondary.600}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.secondary.600}"
                            }
                          },
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/borderColor/dark/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/borderColor/dark/hover/value",
                                "default": "{typography.color.primary.600}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.600}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "default": {
                            "value": "{typography.color.secondary.600}"
                          },
                          "hover": {
                            "value": "{typography.color.primary.600}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "default": {
                          "value": "{typography.color.secondary.400}"
                        },
                        "hover": {
                          "value": "{typography.color.primary.500}"
                        }
                      },
                      "dark": {
                        "default": {
                          "value": "{typography.color.secondary.600}"
                        },
                        "hover": {
                          "value": "{typography.color.primary.600}"
                        }
                      }
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/a/code/color",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/a/code/color/light",
                        "properties": {
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/color/light/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/light/hover/value",
                                "default": "{typography.color.primary.500}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.500}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "hover": {
                            "value": "{typography.color.primary.500}"
                          }
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/a/code/color/dark",
                        "properties": {
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/color/dark/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/color/dark/hover/value",
                                "default": "{typography.color.primary.300}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.300}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "hover": {
                            "value": "{typography.color.primary.300}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "hover": {
                          "value": "{typography.color.primary.500}"
                        }
                      },
                      "dark": {
                        "hover": {
                          "value": "{typography.color.primary.300}"
                        }
                      }
                    }
                  },
                  "background": {
                    "id": "#tokensConfig/prose/a/code/background",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/a/code/background/light",
                        "properties": {
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/background/light/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/background/light/hover/value",
                                "default": "{typography.color.primary.50}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.50}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "hover": {
                            "value": "{typography.color.primary.50}"
                          }
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/a/code/background/dark",
                        "properties": {
                          "hover": {
                            "id": "#tokensConfig/prose/a/code/background/dark/hover",
                            "properties": {
                              "value": {
                                "type": "string",
                                "id": "#tokensConfig/prose/a/code/background/dark/hover/value",
                                "default": "{typography.color.primary.900}"
                              }
                            },
                            "type": "object",
                            "default": {
                              "value": "{typography.color.primary.900}"
                            }
                          }
                        },
                        "type": "object",
                        "default": {
                          "hover": {
                            "value": "{typography.color.primary.900}"
                          }
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "hover": {
                          "value": "{typography.color.primary.50}"
                        }
                      },
                      "dark": {
                        "hover": {
                          "value": "{typography.color.primary.900}"
                        }
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "border": {
                    "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
                  },
                  "borderColor": {
                    "light": {
                      "default": {
                        "value": "{typography.color.secondary.400}"
                      },
                      "hover": {
                        "value": "{typography.color.primary.500}"
                      }
                    },
                    "dark": {
                      "default": {
                        "value": "{typography.color.secondary.600}"
                      },
                      "hover": {
                        "value": "{typography.color.primary.600}"
                      }
                    }
                  },
                  "color": {
                    "light": {
                      "hover": {
                        "value": "{typography.color.primary.500}"
                      }
                    },
                    "dark": {
                      "hover": {
                        "value": "{typography.color.primary.300}"
                      }
                    }
                  },
                  "background": {
                    "light": {
                      "hover": {
                        "value": "{typography.color.primary.50}"
                      }
                    },
                    "dark": {
                      "hover": {
                        "value": "{typography.color.primary.900}"
                      }
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "textDecoration": {
                "value": "none"
              },
              "color": {
                "light": {
                  "default": {
                    "value": "inherit"
                  },
                  "hover": {
                    "value": "{typography.color.primary.500}"
                  }
                },
                "dark": {
                  "default": {
                    "value": "inherit"
                  },
                  "hover": {
                    "value": "{typography.color.primary.400}"
                  }
                }
              },
              "borderBottom": {
                "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
              },
              "borderWidth": {
                "value": "1px"
              },
              "borderColor": {
                "light": {
                  "default": {
                    "value": "{typography.color.secondary.400}"
                  },
                  "hover": {
                    "value": "{typography.color.primary.500}"
                  }
                },
                "dark": {
                  "default": {
                    "value": "{typography.color.secondary.400}"
                  },
                  "hover": {
                    "value": "{typography.color.primary.500}"
                  }
                }
              },
              "borderStyle": {
                "default": {
                  "value": "dashed"
                },
                "hover": {
                  "value": "solid"
                }
              },
              "borderDistance": {
                "value": "2px"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.medium}"
              },
              "hasCode": {
                "borderBottom": {
                  "value": "none"
                }
              },
              "code": {
                "border": {
                  "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
                },
                "borderColor": {
                  "light": {
                    "default": {
                      "value": "{typography.color.secondary.400}"
                    },
                    "hover": {
                      "value": "{typography.color.primary.500}"
                    }
                  },
                  "dark": {
                    "default": {
                      "value": "{typography.color.secondary.600}"
                    },
                    "hover": {
                      "value": "{typography.color.primary.600}"
                    }
                  }
                },
                "color": {
                  "light": {
                    "hover": {
                      "value": "{typography.color.primary.500}"
                    }
                  },
                  "dark": {
                    "hover": {
                      "value": "{typography.color.primary.300}"
                    }
                  }
                },
                "background": {
                  "light": {
                    "hover": {
                      "value": "{typography.color.primary.50}"
                    }
                  },
                  "dark": {
                    "hover": {
                      "value": "{typography.color.primary.900}"
                    }
                  }
                }
              }
            }
          },
          "blockquote": {
            "id": "#tokensConfig/prose/blockquote",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/blockquote/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "padding": {
                "id": "#tokensConfig/prose/blockquote/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/padding/value",
                    "default": "0 0 0 24px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 0 0 24px"
                }
              },
              "quotes": {
                "id": "#tokensConfig/prose/blockquote/quotes",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/quotes/value",
                    "default": "'201C' '201D' '2018' '2019'"
                  }
                },
                "type": "object",
                "default": {
                  "value": "'201C' '201D' '2018' '2019'"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/blockquote/color",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/blockquote/color/light",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/color/light/value",
                        "default": "{typography.color.secondary.500}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.500}"
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/blockquote/color/dark",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/color/dark/value",
                        "default": "{typography.color.secondary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.400}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "value": "{typography.color.secondary.500}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.400}"
                  }
                }
              },
              "borderLeft": {
                "id": "#tokensConfig/prose/blockquote/borderLeft",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/blockquote/borderLeft/value",
                    "default": "1px solid {prose.blockquote.borderColor.light}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1px solid {prose.blockquote.borderColor.light}"
                }
              },
              "borderColor": {
                "id": "#tokensConfig/prose/blockquote/borderColor",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/blockquote/borderColor/light",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/borderColor/light/value",
                        "default": "{typography.color.secondary.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.200}"
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/blockquote/borderColor/dark",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/blockquote/borderColor/dark/value",
                        "default": "{typography.color.secondary.700}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.700}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "value": "{typography.color.secondary.200}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.700}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "padding": {
                "value": "0 0 0 24px"
              },
              "quotes": {
                "value": "'201C' '201D' '2018' '2019'"
              },
              "color": {
                "light": {
                  "value": "{typography.color.secondary.500}"
                },
                "dark": {
                  "value": "{typography.color.secondary.400}"
                }
              },
              "borderLeft": {
                "value": "1px solid {prose.blockquote.borderColor.light}"
              },
              "borderColor": {
                "light": {
                  "value": "{typography.color.secondary.200}"
                },
                "dark": {
                  "value": "{typography.color.secondary.700}"
                }
              }
            }
          },
          "ul": {
            "id": "#tokensConfig/prose/ul",
            "properties": {
              "listStyleType": {
                "id": "#tokensConfig/prose/ul/listStyleType",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/listStyleType/value",
                    "default": "disc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "disc"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/ul/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "padding": {
                "id": "#tokensConfig/prose/ul/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ul/padding/value",
                    "default": "0 0 0 21px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 0 0 21px"
                }
              },
              "li": {
                "id": "#tokensConfig/prose/ul/li",
                "properties": {
                  "markerColor": {
                    "id": "#tokensConfig/prose/ul/li/markerColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/ul/li/markerColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ul/li/markerColor/light/value",
                            "default": "{typography.color.secondary.300}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.300}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/ul/li/markerColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ul/li/markerColor/dark/value",
                            "default": "{typography.color.secondary.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.300}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "markerColor": {
                    "light": {
                      "value": "{typography.color.secondary.300}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.800}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "listStyleType": {
                "value": "disc"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "padding": {
                "value": "0 0 0 21px"
              },
              "li": {
                "markerColor": {
                  "light": {
                    "value": "{typography.color.secondary.300}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.800}"
                  }
                }
              }
            }
          },
          "ol": {
            "id": "#tokensConfig/prose/ol",
            "properties": {
              "listStyleType": {
                "id": "#tokensConfig/prose/ol/listStyleType",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/listStyleType/value",
                    "default": "decimal"
                  }
                },
                "type": "object",
                "default": {
                  "value": "decimal"
                }
              },
              "margin": {
                "id": "#tokensConfig/prose/ol/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "padding": {
                "id": "#tokensConfig/prose/ol/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/ol/padding/value",
                    "default": "0 0 0 21px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 0 0 21px"
                }
              },
              "li": {
                "id": "#tokensConfig/prose/ol/li",
                "properties": {
                  "markerColor": {
                    "id": "#tokensConfig/prose/ol/li/markerColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/ol/li/markerColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ol/li/markerColor/light/value",
                            "default": "{typography.color.secondary.500}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.500}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/ol/li/markerColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/ol/li/markerColor/dark/value",
                            "default": "{typography.color.secondary.500}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.500}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.500}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.500}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "markerColor": {
                    "light": {
                      "value": "{typography.color.secondary.500}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.500}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "listStyleType": {
                "value": "decimal"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "padding": {
                "value": "0 0 0 21px"
              },
              "li": {
                "markerColor": {
                  "light": {
                    "value": "{typography.color.secondary.500}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.500}"
                  }
                }
              }
            }
          },
          "li": {
            "id": "#tokensConfig/prose/li",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/li/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/li/margin/value",
                    "default": "{typography.verticalMargin.sm} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.sm} 0"
                }
              },
              "listStylePosition": {
                "id": "#tokensConfig/prose/li/listStylePosition",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/li/listStylePosition/value",
                    "default": "outside"
                  }
                },
                "type": "object",
                "default": {
                  "value": "outside"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.sm} 0"
              },
              "listStylePosition": {
                "value": "outside"
              }
            }
          },
          "hr": {
            "id": "#tokensConfig/prose/hr",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/hr/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "style": {
                "id": "#tokensConfig/prose/hr/style",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/style/value",
                    "default": "solid"
                  }
                },
                "type": "object",
                "default": {
                  "value": "solid"
                }
              },
              "width": {
                "id": "#tokensConfig/prose/hr/width",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/hr/width/value",
                    "default": "1px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1px"
                }
              },
              "color": {
                "id": "#tokensConfig/prose/hr/color",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/hr/color/light",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/hr/color/light/value",
                        "default": "{typography.color.secondary.200}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.200}"
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/hr/color/dark",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/hr/color/dark/value",
                        "default": "{typography.color.secondary.800}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.800}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "value": "{typography.color.secondary.200}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.800}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "style": {
                "value": "solid"
              },
              "width": {
                "value": "1px"
              },
              "color": {
                "light": {
                  "value": "{typography.color.secondary.200}"
                },
                "dark": {
                  "value": "{typography.color.secondary.800}"
                }
              }
            }
          },
          "table": {
            "id": "#tokensConfig/prose/table",
            "properties": {
              "margin": {
                "id": "#tokensConfig/prose/table/margin",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/margin/value",
                    "default": "{typography.verticalMargin.base} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.verticalMargin.base} 0"
                }
              },
              "textAlign": {
                "id": "#tokensConfig/prose/table/textAlign",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/textAlign/value",
                    "default": "left"
                  }
                },
                "type": "object",
                "default": {
                  "value": "left"
                }
              },
              "fontSize": {
                "id": "#tokensConfig/prose/table/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/fontSize/value",
                    "default": "{typography.fontSize.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontSize.sm}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/prose/table/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/table/lineHeight/value",
                    "default": "inherit"
                  }
                },
                "type": "object",
                "default": {
                  "value": "inherit"
                }
              }
            },
            "type": "object",
            "default": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "textAlign": {
                "value": "left"
              },
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "lineHeight": {
                "value": "inherit"
              }
            }
          },
          "thead": {
            "id": "#tokensConfig/prose/thead",
            "properties": {
              "border": {
                "id": "#tokensConfig/prose/thead/border",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/thead/border/value",
                    "default": "none"
                  }
                },
                "type": "object",
                "default": {
                  "value": "none"
                }
              },
              "borderBottom": {
                "id": "#tokensConfig/prose/thead/borderBottom",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/thead/borderBottom/value",
                    "default": "1px solid {prose.thead.borderColor.light}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "1px solid {prose.thead.borderColor.light}"
                }
              },
              "borderColor": {
                "id": "#tokensConfig/prose/thead/borderColor",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/thead/borderColor/light",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/borderColor/light/value",
                        "default": "{typography.color.secondary.300}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.300}"
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/thead/borderColor/dark",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/thead/borderColor/dark/value",
                        "default": "{typography.color.secondary.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.600}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "value": "{typography.color.secondary.300}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.600}"
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "border": {
                "value": "none"
              },
              "borderBottom": {
                "value": "1px solid {prose.thead.borderColor.light}"
              },
              "borderColor": {
                "light": {
                  "value": "{typography.color.secondary.300}"
                },
                "dark": {
                  "value": "{typography.color.secondary.600}"
                }
              }
            }
          },
          "th": {
            "id": "#tokensConfig/prose/th",
            "properties": {
              "color": {
                "id": "#tokensConfig/prose/th/color",
                "properties": {
                  "light": {
                    "id": "#tokensConfig/prose/th/color/light",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/th/color/light/value",
                        "default": "{typography.color.secondary.600}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.600}"
                    }
                  },
                  "dark": {
                    "id": "#tokensConfig/prose/th/color/dark",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/th/color/dark/value",
                        "default": "{typography.color.secondary.400}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.color.secondary.400}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "light": {
                    "value": "{typography.color.secondary.600}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.400}"
                  }
                }
              },
              "padding": {
                "id": "#tokensConfig/prose/th/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/th/padding/value",
                    "default": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
                }
              },
              "fontWeight": {
                "id": "#tokensConfig/prose/th/fontWeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/prose/th/fontWeight/value",
                    "default": "{typography.fontWeight.semibold}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{typography.fontWeight.semibold}"
                }
              }
            },
            "type": "object",
            "default": {
              "color": {
                "light": {
                  "value": "{typography.color.secondary.600}"
                },
                "dark": {
                  "value": "{typography.color.secondary.400}"
                }
              },
              "padding": {
                "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.semibold}"
              }
            }
          },
          "tbody": {
            "id": "#tokensConfig/prose/tbody",
            "properties": {
              "tr": {
                "id": "#tokensConfig/prose/tbody/tr",
                "properties": {
                  "borderBottom": {
                    "id": "#tokensConfig/prose/tbody/tr/borderBottom",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/tbody/tr/borderBottom/value",
                        "default": "1px dashed {prose.tbody.tr.borderColor.light}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "1px dashed {prose.tbody.tr.borderColor.light}"
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/prose/tbody/tr/borderColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/tbody/tr/borderColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/tr/borderColor/light/value",
                            "default": "{typography.color.secondary.300}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.300}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/tbody/tr/borderColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/tr/borderColor/dark/value",
                            "default": "{typography.color.secondary.700}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.700}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.300}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.700}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderBottom": {
                    "value": "1px dashed {prose.tbody.tr.borderColor.light}"
                  },
                  "borderColor": {
                    "light": {
                      "value": "{typography.color.secondary.300}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.700}"
                    }
                  }
                }
              },
              "td": {
                "id": "#tokensConfig/prose/tbody/td",
                "properties": {
                  "padding": {
                    "id": "#tokensConfig/prose/tbody/td/padding",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/tbody/td/padding/value",
                        "default": "{typography.verticalMargin.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.sm}"
                    }
                  }
                },
                "type": "object",
                "default": {
                  "padding": {
                    "value": "{typography.verticalMargin.sm}"
                  }
                }
              },
              "code": {
                "id": "#tokensConfig/prose/tbody/code",
                "properties": {
                  "inline": {
                    "id": "#tokensConfig/prose/tbody/code/inline",
                    "properties": {
                      "fontSize": {
                        "id": "#tokensConfig/prose/tbody/code/inline/fontSize",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/tbody/code/inline/fontSize/value",
                            "default": "{typography.fontSize.sm}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.fontSize.sm}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "fontSize": {
                        "value": "{typography.fontSize.sm}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "inline": {
                    "fontSize": {
                      "value": "{typography.fontSize.sm}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "tr": {
                "borderBottom": {
                  "value": "1px dashed {prose.tbody.tr.borderColor.light}"
                },
                "borderColor": {
                  "light": {
                    "value": "{typography.color.secondary.300}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.700}"
                  }
                }
              },
              "td": {
                "padding": {
                  "value": "{typography.verticalMargin.sm}"
                }
              },
              "code": {
                "inline": {
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  }
                }
              }
            }
          },
          "code": {
            "id": "#tokensConfig/prose/code",
            "properties": {
              "block": {
                "id": "#tokensConfig/prose/code/block",
                "properties": {
                  "fontSize": {
                    "id": "#tokensConfig/prose/code/block/fontSize",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/block/fontSize/value",
                        "default": "{typography.fontSize.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontSize.sm}"
                    }
                  },
                  "margin": {
                    "id": "#tokensConfig/prose/code/block/margin",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/block/margin/value",
                        "default": "{typography.verticalMargin.base} 0"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.verticalMargin.base} 0"
                    }
                  },
                  "borderColor": {
                    "id": "#tokensConfig/prose/code/block/borderColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/code/block/borderColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/borderColor/light/value",
                            "default": "{typography.color.secondary.200}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.200}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/code/block/borderColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/borderColor/dark/value",
                            "default": "{typography.color.secondary.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.200}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.800}"
                      }
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/code/block/color",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/code/block/color/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/color/light/value",
                            "default": "{typography.color.secondary.700}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.700}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/code/block/color/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/color/dark/value",
                            "default": "{typography.color.secondary.200}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.200}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.700}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/prose/code/block/backgroundColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/code/block/backgroundColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backgroundColor/light/value",
                            "default": "{typography.color.secondary.100}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.100}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/code/block/backgroundColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/backgroundColor/dark/value",
                            "default": "{typography.color.secondary.900}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.900}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.100}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.900}"
                      }
                    }
                  },
                  "pre": {
                    "id": "#tokensConfig/prose/code/block/pre",
                    "properties": {
                      "padding": {
                        "id": "#tokensConfig/prose/code/block/pre/padding",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/block/pre/padding/value",
                            "default": "{typography.verticalMargin.sm}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.verticalMargin.sm}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "padding": {
                        "value": "{typography.verticalMargin.sm}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  },
                  "margin": {
                    "value": "{typography.verticalMargin.base} 0"
                  },
                  "borderColor": {
                    "light": {
                      "value": "{typography.color.secondary.200}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.800}"
                    }
                  },
                  "color": {
                    "light": {
                      "value": "{typography.color.secondary.700}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.200}"
                    }
                  },
                  "backgroundColor": {
                    "light": {
                      "value": "{typography.color.secondary.100}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.900}"
                    }
                  },
                  "pre": {
                    "padding": {
                      "value": "{typography.verticalMargin.sm}"
                    }
                  }
                }
              },
              "inline": {
                "id": "#tokensConfig/prose/code/inline",
                "properties": {
                  "borderRadius": {
                    "id": "#tokensConfig/prose/code/inline/borderRadius",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/borderRadius/value",
                        "default": "0.375rem"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "0.375rem"
                    }
                  },
                  "padding": {
                    "id": "#tokensConfig/prose/code/inline/padding",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/padding/value",
                        "default": "0.25rem 0.375rem 0.25rem 0.375rem"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "0.25rem 0.375rem 0.25rem 0.375rem"
                    }
                  },
                  "fontSize": {
                    "id": "#tokensConfig/prose/code/inline/fontSize",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/fontSize/value",
                        "default": "{typography.fontSize.sm}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontSize.sm}"
                    }
                  },
                  "fontWeight": {
                    "id": "#tokensConfig/prose/code/inline/fontWeight",
                    "properties": {
                      "value": {
                        "type": "string",
                        "id": "#tokensConfig/prose/code/inline/fontWeight/value",
                        "default": "{typography.fontWeight.normal}"
                      }
                    },
                    "type": "object",
                    "default": {
                      "value": "{typography.fontWeight.normal}"
                    }
                  },
                  "color": {
                    "id": "#tokensConfig/prose/code/inline/color",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/code/inline/color/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/color/light/value",
                            "default": "{typography.color.secondary.700}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.700}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/code/inline/color/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/color/dark/value",
                            "default": "{typography.color.secondary.200}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.200}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.700}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.200}"
                      }
                    }
                  },
                  "backgroundColor": {
                    "id": "#tokensConfig/prose/code/inline/backgroundColor",
                    "properties": {
                      "light": {
                        "id": "#tokensConfig/prose/code/inline/backgroundColor/light",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/backgroundColor/light/value",
                            "default": "{typography.color.secondary.100}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.100}"
                        }
                      },
                      "dark": {
                        "id": "#tokensConfig/prose/code/inline/backgroundColor/dark",
                        "properties": {
                          "value": {
                            "type": "string",
                            "id": "#tokensConfig/prose/code/inline/backgroundColor/dark/value",
                            "default": "{typography.color.secondary.800}"
                          }
                        },
                        "type": "object",
                        "default": {
                          "value": "{typography.color.secondary.800}"
                        }
                      }
                    },
                    "type": "object",
                    "default": {
                      "light": {
                        "value": "{typography.color.secondary.100}"
                      },
                      "dark": {
                        "value": "{typography.color.secondary.800}"
                      }
                    }
                  }
                },
                "type": "object",
                "default": {
                  "borderRadius": {
                    "value": "0.375rem"
                  },
                  "padding": {
                    "value": "0.25rem 0.375rem 0.25rem 0.375rem"
                  },
                  "fontSize": {
                    "value": "{typography.fontSize.sm}"
                  },
                  "fontWeight": {
                    "value": "{typography.fontWeight.normal}"
                  },
                  "color": {
                    "light": {
                      "value": "{typography.color.secondary.700}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.200}"
                    }
                  },
                  "backgroundColor": {
                    "light": {
                      "value": "{typography.color.secondary.100}"
                    },
                    "dark": {
                      "value": "{typography.color.secondary.800}"
                    }
                  }
                }
              }
            },
            "type": "object",
            "default": {
              "block": {
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                },
                "margin": {
                  "value": "{typography.verticalMargin.base} 0"
                },
                "borderColor": {
                  "light": {
                    "value": "{typography.color.secondary.200}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.800}"
                  }
                },
                "color": {
                  "light": {
                    "value": "{typography.color.secondary.700}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.200}"
                  }
                },
                "backgroundColor": {
                  "light": {
                    "value": "{typography.color.secondary.100}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.900}"
                  }
                },
                "pre": {
                  "padding": {
                    "value": "{typography.verticalMargin.sm}"
                  }
                }
              },
              "inline": {
                "borderRadius": {
                  "value": "0.375rem"
                },
                "padding": {
                  "value": "0.25rem 0.375rem 0.25rem 0.375rem"
                },
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                },
                "fontWeight": {
                  "value": "{typography.fontWeight.normal}"
                },
                "color": {
                  "light": {
                    "value": "{typography.color.secondary.700}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.200}"
                  }
                },
                "backgroundColor": {
                  "light": {
                    "value": "{typography.color.secondary.100}"
                  },
                  "dark": {
                    "value": "{typography.color.secondary.800}"
                  }
                }
              }
            }
          }
        },
        "type": "object",
        "default": {
          "p": {
            "fontSize": {
              "value": "{typography.fontSize.base}"
            },
            "lineHeight": {
              "value": "{typography.lead.normal}"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "br": {
              "margin": {
                "value": "{typography.verticalMargin.base} 0 0 0"
              }
            }
          },
          "h1": {
            "margin": {
              "value": "0 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.5xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.tight}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.bold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.3xl}"
            }
          },
          "h2": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.4xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.tight}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.2xl}"
            }
          },
          "h3": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.3xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.xl}"
            }
          },
          "h4": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.2xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "letterSpacing": {
              "value": "{typography.letterSpacing.tight}"
            },
            "iconSize": {
              "value": "{typography.fontSize.lg}"
            }
          },
          "h5": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.xl}"
            },
            "lineHeight": {
              "value": "{typography.lead.snug}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "iconSize": {
              "value": "{typography.fontSize.lg}"
            }
          },
          "h6": {
            "margin": {
              "value": "3rem 0 2rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.lg}"
            },
            "lineHeight": {
              "value": "{typography.lead.normal}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            },
            "iconSize": {
              "value": "{typography.fontSize.base}"
            }
          },
          "strong": {
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            }
          },
          "img": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            }
          },
          "a": {
            "textDecoration": {
              "value": "none"
            },
            "color": {
              "light": {
                "default": {
                  "value": "inherit"
                },
                "hover": {
                  "value": "{typography.color.primary.500}"
                }
              },
              "dark": {
                "default": {
                  "value": "inherit"
                },
                "hover": {
                  "value": "{typography.color.primary.400}"
                }
              }
            },
            "borderBottom": {
              "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
            },
            "borderWidth": {
              "value": "1px"
            },
            "borderColor": {
              "light": {
                "default": {
                  "value": "{typography.color.secondary.400}"
                },
                "hover": {
                  "value": "{typography.color.primary.500}"
                }
              },
              "dark": {
                "default": {
                  "value": "{typography.color.secondary.400}"
                },
                "hover": {
                  "value": "{typography.color.primary.500}"
                }
              }
            },
            "borderStyle": {
              "default": {
                "value": "dashed"
              },
              "hover": {
                "value": "solid"
              }
            },
            "borderDistance": {
              "value": "2px"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.medium}"
            },
            "hasCode": {
              "borderBottom": {
                "value": "none"
              }
            },
            "code": {
              "border": {
                "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
              },
              "borderColor": {
                "light": {
                  "default": {
                    "value": "{typography.color.secondary.400}"
                  },
                  "hover": {
                    "value": "{typography.color.primary.500}"
                  }
                },
                "dark": {
                  "default": {
                    "value": "{typography.color.secondary.600}"
                  },
                  "hover": {
                    "value": "{typography.color.primary.600}"
                  }
                }
              },
              "color": {
                "light": {
                  "hover": {
                    "value": "{typography.color.primary.500}"
                  }
                },
                "dark": {
                  "hover": {
                    "value": "{typography.color.primary.300}"
                  }
                }
              },
              "background": {
                "light": {
                  "hover": {
                    "value": "{typography.color.primary.50}"
                  }
                },
                "dark": {
                  "hover": {
                    "value": "{typography.color.primary.900}"
                  }
                }
              }
            }
          },
          "blockquote": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "padding": {
              "value": "0 0 0 24px"
            },
            "quotes": {
              "value": "'201C' '201D' '2018' '2019'"
            },
            "color": {
              "light": {
                "value": "{typography.color.secondary.500}"
              },
              "dark": {
                "value": "{typography.color.secondary.400}"
              }
            },
            "borderLeft": {
              "value": "1px solid {prose.blockquote.borderColor.light}"
            },
            "borderColor": {
              "light": {
                "value": "{typography.color.secondary.200}"
              },
              "dark": {
                "value": "{typography.color.secondary.700}"
              }
            }
          },
          "ul": {
            "listStyleType": {
              "value": "disc"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "padding": {
              "value": "0 0 0 21px"
            },
            "li": {
              "markerColor": {
                "light": {
                  "value": "{typography.color.secondary.300}"
                },
                "dark": {
                  "value": "{typography.color.secondary.800}"
                }
              }
            }
          },
          "ol": {
            "listStyleType": {
              "value": "decimal"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "padding": {
              "value": "0 0 0 21px"
            },
            "li": {
              "markerColor": {
                "light": {
                  "value": "{typography.color.secondary.500}"
                },
                "dark": {
                  "value": "{typography.color.secondary.500}"
                }
              }
            }
          },
          "li": {
            "margin": {
              "value": "{typography.verticalMargin.sm} 0"
            },
            "listStylePosition": {
              "value": "outside"
            }
          },
          "hr": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "style": {
              "value": "solid"
            },
            "width": {
              "value": "1px"
            },
            "color": {
              "light": {
                "value": "{typography.color.secondary.200}"
              },
              "dark": {
                "value": "{typography.color.secondary.800}"
              }
            }
          },
          "table": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "textAlign": {
              "value": "left"
            },
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "lineHeight": {
              "value": "inherit"
            }
          },
          "thead": {
            "border": {
              "value": "none"
            },
            "borderBottom": {
              "value": "1px solid {prose.thead.borderColor.light}"
            },
            "borderColor": {
              "light": {
                "value": "{typography.color.secondary.300}"
              },
              "dark": {
                "value": "{typography.color.secondary.600}"
              }
            }
          },
          "th": {
            "color": {
              "light": {
                "value": "{typography.color.secondary.600}"
              },
              "dark": {
                "value": "{typography.color.secondary.400}"
              }
            },
            "padding": {
              "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.semibold}"
            }
          },
          "tbody": {
            "tr": {
              "borderBottom": {
                "value": "1px dashed {prose.tbody.tr.borderColor.light}"
              },
              "borderColor": {
                "light": {
                  "value": "{typography.color.secondary.300}"
                },
                "dark": {
                  "value": "{typography.color.secondary.700}"
                }
              }
            },
            "td": {
              "padding": {
                "value": "{typography.verticalMargin.sm}"
              }
            },
            "code": {
              "inline": {
                "fontSize": {
                  "value": "{typography.fontSize.sm}"
                }
              }
            }
          },
          "code": {
            "block": {
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "margin": {
                "value": "{typography.verticalMargin.base} 0"
              },
              "borderColor": {
                "light": {
                  "value": "{typography.color.secondary.200}"
                },
                "dark": {
                  "value": "{typography.color.secondary.800}"
                }
              },
              "color": {
                "light": {
                  "value": "{typography.color.secondary.700}"
                },
                "dark": {
                  "value": "{typography.color.secondary.200}"
                }
              },
              "backgroundColor": {
                "light": {
                  "value": "{typography.color.secondary.100}"
                },
                "dark": {
                  "value": "{typography.color.secondary.900}"
                }
              },
              "pre": {
                "padding": {
                  "value": "{typography.verticalMargin.sm}"
                }
              }
            },
            "inline": {
              "borderRadius": {
                "value": "0.375rem"
              },
              "padding": {
                "value": "0.25rem 0.375rem 0.25rem 0.375rem"
              },
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              },
              "fontWeight": {
                "value": "{typography.fontWeight.normal}"
              },
              "color": {
                "light": {
                  "value": "{typography.color.secondary.700}"
                },
                "dark": {
                  "value": "{typography.color.secondary.200}"
                }
              },
              "backgroundColor": {
                "light": {
                  "value": "{typography.color.secondary.100}"
                },
                "dark": {
                  "value": "{typography.color.secondary.800}"
                }
              }
            }
          }
        }
      },
      "docus": {
        "title": "All the configurable tokens from Docus.",
        "tags": [
          "@studio-icon material-symbols:docs"
        ],
        "id": "#tokensConfig/docus",
        "properties": {
          "header": {
            "id": "#tokensConfig/docus/header",
            "properties": {
              "height": {
                "id": "#tokensConfig/docus/header/height",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/header/height/value",
                    "default": "64px"
                  }
                },
                "type": "object",
                "default": {
                  "value": "64px"
                }
              }
            },
            "type": "object",
            "default": {
              "height": {
                "value": "64px"
              }
            }
          },
          "footer": {
            "id": "#tokensConfig/docus/footer",
            "properties": {
              "padding": {
                "id": "#tokensConfig/docus/footer/padding",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/docus/footer/padding/value",
                    "default": "{space.4} 0"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{space.4} 0"
                }
              }
            },
            "type": "object",
            "default": {
              "padding": {
                "value": "{space.4} 0"
              }
            }
          },
          "readableLine": {
            "id": "#tokensConfig/docus/readableLine",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/docus/readableLine/value",
                "default": "78ch"
              }
            },
            "type": "object",
            "default": {
              "value": "78ch"
            }
          }
        },
        "type": "object",
        "default": {
          "header": {
            "height": {
              "value": "64px"
            }
          },
          "footer": {
            "padding": {
              "value": "{space.4} 0"
            }
          },
          "readableLine": {
            "value": "78ch"
          }
        }
      },
      "colors": {
        "id": "#tokensConfig/colors",
        "properties": {
          "primary": {
            "id": "#tokensConfig/colors/primary",
            "properties": {
              "50": {
                "id": "#tokensConfig/colors/primary/50",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/50/value",
                    "default": "#ffedcc"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffedcc"
                }
              },
              "100": {
                "id": "#tokensConfig/colors/primary/100",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/100/value",
                    "default": "#ffdd9f"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffdd9f"
                }
              },
              "200": {
                "id": "#tokensConfig/colors/primary/200",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/200/value",
                    "default": "#ffcd71"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffcd71"
                }
              },
              "300": {
                "id": "#tokensConfig/colors/primary/300",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/300/value",
                    "default": "#ffbd44"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffbd44"
                }
              },
              "400": {
                "id": "#tokensConfig/colors/primary/400",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/400/value",
                    "default": "#ffad17"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#ffad17"
                }
              },
              "500": {
                "id": "#tokensConfig/colors/primary/500",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/500/value",
                    "default": "orange"
                  }
                },
                "type": "object",
                "default": {
                  "value": "orange"
                }
              },
              "600": {
                "id": "#tokensConfig/colors/primary/600",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/600/value",
                    "default": "#bb7900"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#bb7900"
                }
              },
              "700": {
                "id": "#tokensConfig/colors/primary/700",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/700/value",
                    "default": "#8e5c00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#8e5c00"
                }
              },
              "800": {
                "id": "#tokensConfig/colors/primary/800",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/800/value",
                    "default": "#603e00"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#603e00"
                }
              },
              "900": {
                "id": "#tokensConfig/colors/primary/900",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/colors/primary/900/value",
                    "default": "#332100"
                  }
                },
                "type": "object",
                "default": {
                  "value": "#332100"
                }
              }
            },
            "type": "object",
            "default": {
              "50": {
                "value": "#ffedcc"
              },
              "100": {
                "value": "#ffdd9f"
              },
              "200": {
                "value": "#ffcd71"
              },
              "300": {
                "value": "#ffbd44"
              },
              "400": {
                "value": "#ffad17"
              },
              "500": {
                "value": "orange"
              },
              "600": {
                "value": "#bb7900"
              },
              "700": {
                "value": "#8e5c00"
              },
              "800": {
                "value": "#603e00"
              },
              "900": {
                "value": "#332100"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "primary": {
            "50": {
              "value": "#ffedcc"
            },
            "100": {
              "value": "#ffdd9f"
            },
            "200": {
              "value": "#ffcd71"
            },
            "300": {
              "value": "#ffbd44"
            },
            "400": {
              "value": "#ffad17"
            },
            "500": {
              "value": "orange"
            },
            "600": {
              "value": "#bb7900"
            },
            "700": {
              "value": "#8e5c00"
            },
            "800": {
              "value": "#603e00"
            },
            "900": {
              "value": "#332100"
            }
          }
        }
      },
      "width": {
        "title": "Your website screen sizings.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon ph:ruler"
        ],
        "id": "#tokensConfig/width",
        "properties": {
          "screen": {
            "id": "#tokensConfig/width/screen",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/width/screen/value",
                "default": "100vw"
              }
            },
            "type": "object",
            "default": {
              "value": "100vw"
            }
          }
        },
        "type": "object",
        "default": {
          "screen": {
            "value": "100vw"
          }
        }
      },
      "height": {
        "title": "Your website screen sizings.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon ph:ruler"
        ],
        "id": "#tokensConfig/height",
        "properties": {
          "screen": {
            "id": "#tokensConfig/height/screen",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/height/screen/value",
                "default": "100vh"
              }
            },
            "type": "object",
            "default": {
              "value": "100vh"
            }
          }
        },
        "type": "object",
        "default": {
          "screen": {
            "value": "100vh"
          }
        }
      },
      "shadow": {
        "title": "Your website shadows.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type shadow",
          "@studio-icon mdi:box-shadow"
        ],
        "id": "#tokensConfig/shadow",
        "properties": {
          "xs": {
            "id": "#tokensConfig/shadow/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/xs/value",
                "default": "0px 1px 2px 0px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 1px 2px 0px #000000"
            }
          },
          "sm": {
            "id": "#tokensConfig/shadow/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/sm/value",
                "default": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
            }
          },
          "md": {
            "id": "#tokensConfig/shadow/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/md/value",
                "default": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
            }
          },
          "lg": {
            "id": "#tokensConfig/shadow/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/lg/value",
                "default": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
            }
          },
          "xl": {
            "id": "#tokensConfig/shadow/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/xl/value",
                "default": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
            }
          },
          "2xl": {
            "id": "#tokensConfig/shadow/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/2xl/value",
                "default": "0px 25px 50px -12px {color.gray.900}"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 25px 50px -12px {color.gray.900}"
            }
          },
          "none": {
            "id": "#tokensConfig/shadow/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/shadow/none/value",
                "default": "0px 0px 0px 0px transparent"
              }
            },
            "type": "object",
            "default": {
              "value": "0px 0px 0px 0px transparent"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "0px 1px 2px 0px #000000"
          },
          "sm": {
            "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
          },
          "md": {
            "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
          },
          "lg": {
            "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
          },
          "xl": {
            "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
          },
          "2xl": {
            "value": "0px 25px 50px -12px {color.gray.900}"
          },
          "none": {
            "value": "0px 0px 0px 0px transparent"
          }
        }
      },
      "radii": {
        "title": "Your website border radiuses.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon material-symbols:rounded-corner"
        ],
        "id": "#tokensConfig/radii",
        "properties": {
          "none": {
            "id": "#tokensConfig/radii/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/none/value",
                "default": "0px"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/none/description",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px",
              "description": "0px"
            }
          },
          "2xs": {
            "id": "#tokensConfig/radii/2xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/2xs/value",
                "default": "0.125rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/2xs/description",
                "default": "2px"
              }
            },
            "type": "object",
            "default": {
              "value": "0.125rem",
              "description": "2px"
            }
          },
          "xs": {
            "id": "#tokensConfig/radii/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/xs/value",
                "default": "0.25rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/xs/description",
                "default": "4px"
              }
            },
            "type": "object",
            "default": {
              "value": "0.25rem",
              "description": "4px"
            }
          },
          "sm": {
            "id": "#tokensConfig/radii/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/sm/value",
                "default": "0.375rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/sm/description",
                "default": "6px"
              }
            },
            "type": "object",
            "default": {
              "value": "0.375rem",
              "description": "6px"
            }
          },
          "md": {
            "id": "#tokensConfig/radii/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/md/value",
                "default": "0.5rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/md/description",
                "default": "8px"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5rem",
              "description": "8px"
            }
          },
          "lg": {
            "id": "#tokensConfig/radii/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/lg/value",
                "default": "0.75rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/lg/description",
                "default": "12px"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem",
              "description": "12px"
            }
          },
          "xl": {
            "id": "#tokensConfig/radii/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/xl/value",
                "default": "1rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/xl/description",
                "default": "16px"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem",
              "description": "16px"
            }
          },
          "2xl": {
            "id": "#tokensConfig/radii/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/2xl/value",
                "default": "1.5rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/2xl/description",
                "default": "24px"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem",
              "description": "24px"
            }
          },
          "3xl": {
            "id": "#tokensConfig/radii/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/3xl/value",
                "default": "1.75rem"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/3xl/description",
                "default": "24px"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem",
              "description": "24px"
            }
          },
          "full": {
            "id": "#tokensConfig/radii/full",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/radii/full/value",
                "default": "9999px"
              },
              "description": {
                "type": "string",
                "id": "#tokensConfig/radii/full/description",
                "default": "A very large value to handle every cases"
              }
            },
            "type": "object",
            "default": {
              "value": "9999px",
              "description": "A very large value to handle every cases"
            }
          }
        },
        "type": "object",
        "default": {
          "none": {
            "value": "0px",
            "description": "0px"
          },
          "2xs": {
            "value": "0.125rem",
            "description": "2px"
          },
          "xs": {
            "value": "0.25rem",
            "description": "4px"
          },
          "sm": {
            "value": "0.375rem",
            "description": "6px"
          },
          "md": {
            "value": "0.5rem",
            "description": "8px"
          },
          "lg": {
            "value": "0.75rem",
            "description": "12px"
          },
          "xl": {
            "value": "1rem",
            "description": "16px"
          },
          "2xl": {
            "value": "1.5rem",
            "description": "24px"
          },
          "3xl": {
            "value": "1.75rem",
            "description": "24px"
          },
          "full": {
            "value": "9999px",
            "description": "A very large value to handle every cases"
          }
        }
      },
      "size": {
        "title": "Your website sizings.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon ph:ruler"
        ],
        "id": "#tokensConfig/size",
        "properties": {
          "0": {
            "id": "#tokensConfig/size/0",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/0/value",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px"
            }
          },
          "2": {
            "id": "#tokensConfig/size/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/2/value",
                "default": "2px"
              }
            },
            "type": "object",
            "default": {
              "value": "2px"
            }
          },
          "4": {
            "id": "#tokensConfig/size/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/4/value",
                "default": "4px"
              }
            },
            "type": "object",
            "default": {
              "value": "4px"
            }
          },
          "6": {
            "id": "#tokensConfig/size/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/6/value",
                "default": "6px"
              }
            },
            "type": "object",
            "default": {
              "value": "6px"
            }
          },
          "8": {
            "id": "#tokensConfig/size/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/8/value",
                "default": "8px"
              }
            },
            "type": "object",
            "default": {
              "value": "8px"
            }
          },
          "12": {
            "id": "#tokensConfig/size/12",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/12/value",
                "default": "12px"
              }
            },
            "type": "object",
            "default": {
              "value": "12px"
            }
          },
          "16": {
            "id": "#tokensConfig/size/16",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/16/value",
                "default": "16px"
              }
            },
            "type": "object",
            "default": {
              "value": "16px"
            }
          },
          "20": {
            "id": "#tokensConfig/size/20",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/20/value",
                "default": "20px"
              }
            },
            "type": "object",
            "default": {
              "value": "20px"
            }
          },
          "24": {
            "id": "#tokensConfig/size/24",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/24/value",
                "default": "24px"
              }
            },
            "type": "object",
            "default": {
              "value": "24px"
            }
          },
          "32": {
            "id": "#tokensConfig/size/32",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/32/value",
                "default": "32px"
              }
            },
            "type": "object",
            "default": {
              "value": "32px"
            }
          },
          "40": {
            "id": "#tokensConfig/size/40",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/40/value",
                "default": "40px"
              }
            },
            "type": "object",
            "default": {
              "value": "40px"
            }
          },
          "48": {
            "id": "#tokensConfig/size/48",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/48/value",
                "default": "48px"
              }
            },
            "type": "object",
            "default": {
              "value": "48px"
            }
          },
          "56": {
            "id": "#tokensConfig/size/56",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/56/value",
                "default": "56px"
              }
            },
            "type": "object",
            "default": {
              "value": "56px"
            }
          },
          "64": {
            "id": "#tokensConfig/size/64",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/64/value",
                "default": "64px"
              }
            },
            "type": "object",
            "default": {
              "value": "64px"
            }
          },
          "80": {
            "id": "#tokensConfig/size/80",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/80/value",
                "default": "80px"
              }
            },
            "type": "object",
            "default": {
              "value": "80px"
            }
          },
          "104": {
            "id": "#tokensConfig/size/104",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/104/value",
                "default": "104px"
              }
            },
            "type": "object",
            "default": {
              "value": "104px"
            }
          },
          "200": {
            "id": "#tokensConfig/size/200",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/200/value",
                "default": "200px"
              }
            },
            "type": "object",
            "default": {
              "value": "200px"
            }
          },
          "xs": {
            "id": "#tokensConfig/size/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/xs/value",
                "default": "20rem"
              }
            },
            "type": "object",
            "default": {
              "value": "20rem"
            }
          },
          "sm": {
            "id": "#tokensConfig/size/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/sm/value",
                "default": "24rem"
              }
            },
            "type": "object",
            "default": {
              "value": "24rem"
            }
          },
          "md": {
            "id": "#tokensConfig/size/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/md/value",
                "default": "28rem"
              }
            },
            "type": "object",
            "default": {
              "value": "28rem"
            }
          },
          "lg": {
            "id": "#tokensConfig/size/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/lg/value",
                "default": "32rem"
              }
            },
            "type": "object",
            "default": {
              "value": "32rem"
            }
          },
          "xl": {
            "id": "#tokensConfig/size/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/xl/value",
                "default": "36rem"
              }
            },
            "type": "object",
            "default": {
              "value": "36rem"
            }
          },
          "2xl": {
            "id": "#tokensConfig/size/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/2xl/value",
                "default": "42rem"
              }
            },
            "type": "object",
            "default": {
              "value": "42rem"
            }
          },
          "3xl": {
            "id": "#tokensConfig/size/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/3xl/value",
                "default": "48rem"
              }
            },
            "type": "object",
            "default": {
              "value": "48rem"
            }
          },
          "4xl": {
            "id": "#tokensConfig/size/4xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/4xl/value",
                "default": "56rem"
              }
            },
            "type": "object",
            "default": {
              "value": "56rem"
            }
          },
          "5xl": {
            "id": "#tokensConfig/size/5xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/5xl/value",
                "default": "64rem"
              }
            },
            "type": "object",
            "default": {
              "value": "64rem"
            }
          },
          "6xl": {
            "id": "#tokensConfig/size/6xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/6xl/value",
                "default": "72rem"
              }
            },
            "type": "object",
            "default": {
              "value": "72rem"
            }
          },
          "7xl": {
            "id": "#tokensConfig/size/7xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/7xl/value",
                "default": "80rem"
              }
            },
            "type": "object",
            "default": {
              "value": "80rem"
            }
          },
          "full": {
            "id": "#tokensConfig/size/full",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/size/full/value",
                "default": "100%"
              }
            },
            "type": "object",
            "default": {
              "value": "100%"
            }
          }
        },
        "type": "object",
        "default": {
          "0": {
            "value": "0px"
          },
          "2": {
            "value": "2px"
          },
          "4": {
            "value": "4px"
          },
          "6": {
            "value": "6px"
          },
          "8": {
            "value": "8px"
          },
          "12": {
            "value": "12px"
          },
          "16": {
            "value": "16px"
          },
          "20": {
            "value": "20px"
          },
          "24": {
            "value": "24px"
          },
          "32": {
            "value": "32px"
          },
          "40": {
            "value": "40px"
          },
          "48": {
            "value": "48px"
          },
          "56": {
            "value": "56px"
          },
          "64": {
            "value": "64px"
          },
          "80": {
            "value": "80px"
          },
          "104": {
            "value": "104px"
          },
          "200": {
            "value": "200px"
          },
          "xs": {
            "value": "20rem"
          },
          "sm": {
            "value": "24rem"
          },
          "md": {
            "value": "28rem"
          },
          "lg": {
            "value": "32rem"
          },
          "xl": {
            "value": "36rem"
          },
          "2xl": {
            "value": "42rem"
          },
          "3xl": {
            "value": "48rem"
          },
          "4xl": {
            "value": "56rem"
          },
          "5xl": {
            "value": "64rem"
          },
          "6xl": {
            "value": "72rem"
          },
          "7xl": {
            "value": "80rem"
          },
          "full": {
            "value": "100%"
          }
        }
      },
      "space": {
        "title": "Your website spacings.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon ph:ruler"
        ],
        "id": "#tokensConfig/space",
        "properties": {
          "0": {
            "id": "#tokensConfig/space/0",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/0/value",
                "default": "0px"
              }
            },
            "type": "object",
            "default": {
              "value": "0px"
            }
          },
          "1": {
            "id": "#tokensConfig/space/1",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/1/value",
                "default": "0.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.25rem"
            }
          },
          "2": {
            "id": "#tokensConfig/space/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/2/value",
                "default": "0.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5rem"
            }
          },
          "3": {
            "id": "#tokensConfig/space/3",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/3/value",
                "default": "0.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem"
            }
          },
          "4": {
            "id": "#tokensConfig/space/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/4/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "5": {
            "id": "#tokensConfig/space/5",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/5/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "6": {
            "id": "#tokensConfig/space/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/6/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "7": {
            "id": "#tokensConfig/space/7",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/7/value",
                "default": "1.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem"
            }
          },
          "8": {
            "id": "#tokensConfig/space/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/8/value",
                "default": "2rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2rem"
            }
          },
          "9": {
            "id": "#tokensConfig/space/9",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/9/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "10": {
            "id": "#tokensConfig/space/10",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/10/value",
                "default": "2.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.5rem"
            }
          },
          "11": {
            "id": "#tokensConfig/space/11",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/11/value",
                "default": "2.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.75rem"
            }
          },
          "12": {
            "id": "#tokensConfig/space/12",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/12/value",
                "default": "3rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3rem"
            }
          },
          "14": {
            "id": "#tokensConfig/space/14",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/14/value",
                "default": "3.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3.5rem"
            }
          },
          "16": {
            "id": "#tokensConfig/space/16",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/16/value",
                "default": "4rem"
              }
            },
            "type": "object",
            "default": {
              "value": "4rem"
            }
          },
          "20": {
            "id": "#tokensConfig/space/20",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/20/value",
                "default": "5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "5rem"
            }
          },
          "24": {
            "id": "#tokensConfig/space/24",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/24/value",
                "default": "6rem"
              }
            },
            "type": "object",
            "default": {
              "value": "6rem"
            }
          },
          "28": {
            "id": "#tokensConfig/space/28",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/28/value",
                "default": "7rem"
              }
            },
            "type": "object",
            "default": {
              "value": "7rem"
            }
          },
          "32": {
            "id": "#tokensConfig/space/32",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/32/value",
                "default": "8rem"
              }
            },
            "type": "object",
            "default": {
              "value": "8rem"
            }
          },
          "36": {
            "id": "#tokensConfig/space/36",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/36/value",
                "default": "9rem"
              }
            },
            "type": "object",
            "default": {
              "value": "9rem"
            }
          },
          "40": {
            "id": "#tokensConfig/space/40",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/40/value",
                "default": "10rem"
              }
            },
            "type": "object",
            "default": {
              "value": "10rem"
            }
          },
          "44": {
            "id": "#tokensConfig/space/44",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/44/value",
                "default": "11rem"
              }
            },
            "type": "object",
            "default": {
              "value": "11rem"
            }
          },
          "48": {
            "id": "#tokensConfig/space/48",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/48/value",
                "default": "12rem"
              }
            },
            "type": "object",
            "default": {
              "value": "12rem"
            }
          },
          "52": {
            "id": "#tokensConfig/space/52",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/52/value",
                "default": "13rem"
              }
            },
            "type": "object",
            "default": {
              "value": "13rem"
            }
          },
          "56": {
            "id": "#tokensConfig/space/56",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/56/value",
                "default": "14rem"
              }
            },
            "type": "object",
            "default": {
              "value": "14rem"
            }
          },
          "60": {
            "id": "#tokensConfig/space/60",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/60/value",
                "default": "15rem"
              }
            },
            "type": "object",
            "default": {
              "value": "15rem"
            }
          },
          "64": {
            "id": "#tokensConfig/space/64",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/64/value",
                "default": "16rem"
              }
            },
            "type": "object",
            "default": {
              "value": "16rem"
            }
          },
          "72": {
            "id": "#tokensConfig/space/72",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/72/value",
                "default": "18rem"
              }
            },
            "type": "object",
            "default": {
              "value": "18rem"
            }
          },
          "80": {
            "id": "#tokensConfig/space/80",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/80/value",
                "default": "20rem"
              }
            },
            "type": "object",
            "default": {
              "value": "20rem"
            }
          },
          "96": {
            "id": "#tokensConfig/space/96",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/96/value",
                "default": "24rem"
              }
            },
            "type": "object",
            "default": {
              "value": "24rem"
            }
          },
          "px": {
            "id": "#tokensConfig/space/px",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/space/px/value",
                "default": "1px"
              }
            },
            "type": "object",
            "default": {
              "value": "1px"
            }
          },
          "rem": {
            "id": "#tokensConfig/space/rem",
            "properties": {
              "125": {
                "id": "#tokensConfig/space/rem/125",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/125/value",
                    "default": "0.125rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.125rem"
                }
              },
              "375": {
                "id": "#tokensConfig/space/rem/375",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/375/value",
                    "default": "0.375rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.375rem"
                }
              },
              "625": {
                "id": "#tokensConfig/space/rem/625",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/625/value",
                    "default": "0.625rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.625rem"
                }
              },
              "875": {
                "id": "#tokensConfig/space/rem/875",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/space/rem/875/value",
                    "default": "0.875rem"
                  }
                },
                "type": "object",
                "default": {
                  "value": "0.875rem"
                }
              }
            },
            "type": "object",
            "default": {
              "125": {
                "value": "0.125rem"
              },
              "375": {
                "value": "0.375rem"
              },
              "625": {
                "value": "0.625rem"
              },
              "875": {
                "value": "0.875rem"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "0": {
            "value": "0px"
          },
          "1": {
            "value": "0.25rem"
          },
          "2": {
            "value": "0.5rem"
          },
          "3": {
            "value": "0.75rem"
          },
          "4": {
            "value": "1rem"
          },
          "5": {
            "value": "1.25rem"
          },
          "6": {
            "value": "1.5rem"
          },
          "7": {
            "value": "1.75rem"
          },
          "8": {
            "value": "2rem"
          },
          "9": {
            "value": "2.25rem"
          },
          "10": {
            "value": "2.5rem"
          },
          "11": {
            "value": "2.75rem"
          },
          "12": {
            "value": "3rem"
          },
          "14": {
            "value": "3.5rem"
          },
          "16": {
            "value": "4rem"
          },
          "20": {
            "value": "5rem"
          },
          "24": {
            "value": "6rem"
          },
          "28": {
            "value": "7rem"
          },
          "32": {
            "value": "8rem"
          },
          "36": {
            "value": "9rem"
          },
          "40": {
            "value": "10rem"
          },
          "44": {
            "value": "11rem"
          },
          "48": {
            "value": "12rem"
          },
          "52": {
            "value": "13rem"
          },
          "56": {
            "value": "14rem"
          },
          "60": {
            "value": "15rem"
          },
          "64": {
            "value": "16rem"
          },
          "72": {
            "value": "18rem"
          },
          "80": {
            "value": "20rem"
          },
          "96": {
            "value": "24rem"
          },
          "px": {
            "value": "1px"
          },
          "rem": {
            "125": {
              "value": "0.125rem"
            },
            "375": {
              "value": "0.375rem"
            },
            "625": {
              "value": "0.625rem"
            },
            "875": {
              "value": "0.875rem"
            }
          }
        }
      },
      "borderWidth": {
        "title": "Your website border widths.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon material-symbols:border-all-outline-rounded"
        ],
        "id": "#tokensConfig/borderWidth",
        "properties": {
          "noBorder": {
            "id": "#tokensConfig/borderWidth/noBorder",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/noBorder/value",
                "default": "0"
              }
            },
            "type": "object",
            "default": {
              "value": "0"
            }
          },
          "sm": {
            "id": "#tokensConfig/borderWidth/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/sm/value",
                "default": "1px"
              }
            },
            "type": "object",
            "default": {
              "value": "1px"
            }
          },
          "md": {
            "id": "#tokensConfig/borderWidth/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/md/value",
                "default": "2px"
              }
            },
            "type": "object",
            "default": {
              "value": "2px"
            }
          },
          "lg": {
            "id": "#tokensConfig/borderWidth/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/borderWidth/lg/value",
                "default": "3px"
              }
            },
            "type": "object",
            "default": {
              "value": "3px"
            }
          }
        },
        "type": "object",
        "default": {
          "noBorder": {
            "value": "0"
          },
          "sm": {
            "value": "1px"
          },
          "md": {
            "value": "2px"
          },
          "lg": {
            "value": "3px"
          }
        }
      },
      "opacity": {
        "title": "Your website opacities.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type opacity",
          "@studio-icon material-symbols:opacity"
        ],
        "id": "#tokensConfig/opacity",
        "properties": {
          "noOpacity": {
            "id": "#tokensConfig/opacity/noOpacity",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/noOpacity/value",
                "default": "0"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/noOpacity/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0",
              "type": "opacity"
            }
          },
          "bright": {
            "id": "#tokensConfig/opacity/bright",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/bright/value",
                "default": "0.1"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/bright/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0.1",
              "type": "opacity"
            }
          },
          "light": {
            "id": "#tokensConfig/opacity/light",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/light/value",
                "default": "0.15"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/light/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0.15",
              "type": "opacity"
            }
          },
          "soft": {
            "id": "#tokensConfig/opacity/soft",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/soft/value",
                "default": "0.3"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/soft/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0.3",
              "type": "opacity"
            }
          },
          "medium": {
            "id": "#tokensConfig/opacity/medium",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/medium/value",
                "default": "0.5"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/medium/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0.5",
              "type": "opacity"
            }
          },
          "high": {
            "id": "#tokensConfig/opacity/high",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/high/value",
                "default": "0.8"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/high/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "0.8",
              "type": "opacity"
            }
          },
          "total": {
            "id": "#tokensConfig/opacity/total",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/opacity/total/value",
                "default": "1"
              },
              "type": {
                "type": "string",
                "id": "#tokensConfig/opacity/total/type",
                "default": "opacity"
              }
            },
            "type": "object",
            "default": {
              "value": "1",
              "type": "opacity"
            }
          }
        },
        "type": "object",
        "default": {
          "noOpacity": {
            "value": "0",
            "type": "opacity"
          },
          "bright": {
            "value": "0.1",
            "type": "opacity"
          },
          "light": {
            "value": "0.15",
            "type": "opacity"
          },
          "soft": {
            "value": "0.3",
            "type": "opacity"
          },
          "medium": {
            "value": "0.5",
            "type": "opacity"
          },
          "high": {
            "value": "0.8",
            "type": "opacity"
          },
          "total": {
            "value": "1",
            "type": "opacity"
          }
        }
      },
      "font": {
        "title": "Your website fonts",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type font",
          "@studio-icon material-symbols:font-download-rounded"
        ],
        "id": "#tokensConfig/font",
        "properties": {
          "sans": {
            "id": "#tokensConfig/font/sans",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/sans/value",
                "default": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
            }
          },
          "serif": {
            "id": "#tokensConfig/font/serif",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/serif/value",
                "default": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
            }
          },
          "mono": {
            "id": "#tokensConfig/font/mono",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/font/mono/value",
                "default": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
              }
            },
            "type": "object",
            "default": {
              "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
            }
          }
        },
        "type": "object",
        "default": {
          "sans": {
            "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
          },
          "serif": {
            "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
          },
          "mono": {
            "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
          }
        }
      },
      "fontWeight": {
        "title": "Your website font weights.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type font-weight",
          "@studio-icon radix-icons:font-style"
        ],
        "id": "#tokensConfig/fontWeight",
        "properties": {
          "thin": {
            "id": "#tokensConfig/fontWeight/thin",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/thin/value",
                "default": "100"
              }
            },
            "type": "object",
            "default": {
              "value": "100"
            }
          },
          "extralight": {
            "id": "#tokensConfig/fontWeight/extralight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/extralight/value",
                "default": "200"
              }
            },
            "type": "object",
            "default": {
              "value": "200"
            }
          },
          "light": {
            "id": "#tokensConfig/fontWeight/light",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/light/value",
                "default": "300"
              }
            },
            "type": "object",
            "default": {
              "value": "300"
            }
          },
          "normal": {
            "id": "#tokensConfig/fontWeight/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/normal/value",
                "default": "400"
              }
            },
            "type": "object",
            "default": {
              "value": "400"
            }
          },
          "medium": {
            "id": "#tokensConfig/fontWeight/medium",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/medium/value",
                "default": "500"
              }
            },
            "type": "object",
            "default": {
              "value": "500"
            }
          },
          "semibold": {
            "id": "#tokensConfig/fontWeight/semibold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/semibold/value",
                "default": "600"
              }
            },
            "type": "object",
            "default": {
              "value": "600"
            }
          },
          "bold": {
            "id": "#tokensConfig/fontWeight/bold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/bold/value",
                "default": "700"
              }
            },
            "type": "object",
            "default": {
              "value": "700"
            }
          },
          "extrabold": {
            "id": "#tokensConfig/fontWeight/extrabold",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/extrabold/value",
                "default": "800"
              }
            },
            "type": "object",
            "default": {
              "value": "800"
            }
          },
          "black": {
            "id": "#tokensConfig/fontWeight/black",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontWeight/black/value",
                "default": "900"
              }
            },
            "type": "object",
            "default": {
              "value": "900"
            }
          }
        },
        "type": "object",
        "default": {
          "thin": {
            "value": "100"
          },
          "extralight": {
            "value": "200"
          },
          "light": {
            "value": "300"
          },
          "normal": {
            "value": "400"
          },
          "medium": {
            "value": "500"
          },
          "semibold": {
            "value": "600"
          },
          "bold": {
            "value": "700"
          },
          "extrabold": {
            "value": "800"
          },
          "black": {
            "value": "900"
          }
        }
      },
      "fontSize": {
        "title": "Your website font sizes.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type font-size",
          "@studio-icon radix-icons:font-style"
        ],
        "id": "#tokensConfig/fontSize",
        "properties": {
          "xs": {
            "id": "#tokensConfig/fontSize/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/xs/value",
                "default": "0.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.75rem"
            }
          },
          "sm": {
            "id": "#tokensConfig/fontSize/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/sm/value",
                "default": "0.875rem"
              }
            },
            "type": "object",
            "default": {
              "value": "0.875rem"
            }
          },
          "base": {
            "id": "#tokensConfig/fontSize/base",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/base/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "lg": {
            "id": "#tokensConfig/fontSize/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/lg/value",
                "default": "1.125rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.125rem"
            }
          },
          "xl": {
            "id": "#tokensConfig/fontSize/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/xl/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "2xl": {
            "id": "#tokensConfig/fontSize/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/2xl/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "3xl": {
            "id": "#tokensConfig/fontSize/3xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/3xl/value",
                "default": "1.875rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.875rem"
            }
          },
          "4xl": {
            "id": "#tokensConfig/fontSize/4xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/4xl/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "5xl": {
            "id": "#tokensConfig/fontSize/5xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/5xl/value",
                "default": "3rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3rem"
            }
          },
          "6xl": {
            "id": "#tokensConfig/fontSize/6xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/6xl/value",
                "default": "3.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "3.75rem"
            }
          },
          "7xl": {
            "id": "#tokensConfig/fontSize/7xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/7xl/value",
                "default": "4.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "4.5rem"
            }
          },
          "8xl": {
            "id": "#tokensConfig/fontSize/8xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/8xl/value",
                "default": "6rem"
              }
            },
            "type": "object",
            "default": {
              "value": "6rem"
            }
          },
          "9xl": {
            "id": "#tokensConfig/fontSize/9xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/fontSize/9xl/value",
                "default": "8rem"
              }
            },
            "type": "object",
            "default": {
              "value": "8rem"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "0.75rem"
          },
          "sm": {
            "value": "0.875rem"
          },
          "base": {
            "value": "1rem"
          },
          "lg": {
            "value": "1.125rem"
          },
          "xl": {
            "value": "1.25rem"
          },
          "2xl": {
            "value": "1.5rem"
          },
          "3xl": {
            "value": "1.875rem"
          },
          "4xl": {
            "value": "2.25rem"
          },
          "5xl": {
            "value": "3rem"
          },
          "6xl": {
            "value": "3.75rem"
          },
          "7xl": {
            "value": "4.5rem"
          },
          "8xl": {
            "value": "6rem"
          },
          "9xl": {
            "value": "8rem"
          }
        }
      },
      "letterSpacing": {
        "title": "Your website letter spacings.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type letter-spacing",
          "@studio-icon fluent:font-space-tracking-out-24-filled"
        ],
        "id": "#tokensConfig/letterSpacing",
        "properties": {
          "tighter": {
            "id": "#tokensConfig/letterSpacing/tighter",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/tighter/value",
                "default": "-0.05em"
              }
            },
            "type": "object",
            "default": {
              "value": "-0.05em"
            }
          },
          "tight": {
            "id": "#tokensConfig/letterSpacing/tight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/tight/value",
                "default": "-0.025em"
              }
            },
            "type": "object",
            "default": {
              "value": "-0.025em"
            }
          },
          "normal": {
            "id": "#tokensConfig/letterSpacing/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/normal/value",
                "default": "0em"
              }
            },
            "type": "object",
            "default": {
              "value": "0em"
            }
          },
          "wide": {
            "id": "#tokensConfig/letterSpacing/wide",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/wide/value",
                "default": "0.025em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.025em"
            }
          },
          "wider": {
            "id": "#tokensConfig/letterSpacing/wider",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/wider/value",
                "default": "0.05em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.05em"
            }
          },
          "widest": {
            "id": "#tokensConfig/letterSpacing/widest",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/letterSpacing/widest/value",
                "default": "0.1em"
              }
            },
            "type": "object",
            "default": {
              "value": "0.1em"
            }
          }
        },
        "type": "object",
        "default": {
          "tighter": {
            "value": "-0.05em"
          },
          "tight": {
            "value": "-0.025em"
          },
          "normal": {
            "value": "0em"
          },
          "wide": {
            "value": "0.025em"
          },
          "wider": {
            "value": "0.05em"
          },
          "widest": {
            "value": "0.1em"
          }
        }
      },
      "lead": {
        "title": "Your website line heights.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon icon-park-outline:auto-line-height"
        ],
        "id": "#tokensConfig/lead",
        "properties": {
          "1": {
            "id": "#tokensConfig/lead/1",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/1/value",
                "default": ".025rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".025rem"
            }
          },
          "2": {
            "id": "#tokensConfig/lead/2",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/2/value",
                "default": ".5rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".5rem"
            }
          },
          "3": {
            "id": "#tokensConfig/lead/3",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/3/value",
                "default": ".75rem"
              }
            },
            "type": "object",
            "default": {
              "value": ".75rem"
            }
          },
          "4": {
            "id": "#tokensConfig/lead/4",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/4/value",
                "default": "1rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1rem"
            }
          },
          "5": {
            "id": "#tokensConfig/lead/5",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/5/value",
                "default": "1.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25rem"
            }
          },
          "6": {
            "id": "#tokensConfig/lead/6",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/6/value",
                "default": "1.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5rem"
            }
          },
          "7": {
            "id": "#tokensConfig/lead/7",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/7/value",
                "default": "1.75rem"
              }
            },
            "type": "object",
            "default": {
              "value": "1.75rem"
            }
          },
          "8": {
            "id": "#tokensConfig/lead/8",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/8/value",
                "default": "2rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2rem"
            }
          },
          "9": {
            "id": "#tokensConfig/lead/9",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/9/value",
                "default": "2.25rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.25rem"
            }
          },
          "10": {
            "id": "#tokensConfig/lead/10",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/10/value",
                "default": "2.5rem"
              }
            },
            "type": "object",
            "default": {
              "value": "2.5rem"
            }
          },
          "none": {
            "id": "#tokensConfig/lead/none",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/none/value",
                "default": "1"
              }
            },
            "type": "object",
            "default": {
              "value": "1"
            }
          },
          "tight": {
            "id": "#tokensConfig/lead/tight",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/tight/value",
                "default": "1.25"
              }
            },
            "type": "object",
            "default": {
              "value": "1.25"
            }
          },
          "snug": {
            "id": "#tokensConfig/lead/snug",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/snug/value",
                "default": "1.375"
              }
            },
            "type": "object",
            "default": {
              "value": "1.375"
            }
          },
          "normal": {
            "id": "#tokensConfig/lead/normal",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/normal/value",
                "default": "1.5"
              }
            },
            "type": "object",
            "default": {
              "value": "1.5"
            }
          },
          "relaxed": {
            "id": "#tokensConfig/lead/relaxed",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/relaxed/value",
                "default": "1.625"
              }
            },
            "type": "object",
            "default": {
              "value": "1.625"
            }
          },
          "loose": {
            "id": "#tokensConfig/lead/loose",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/lead/loose/value",
                "default": "2"
              }
            },
            "type": "object",
            "default": {
              "value": "2"
            }
          }
        },
        "type": "object",
        "default": {
          "1": {
            "value": ".025rem"
          },
          "2": {
            "value": ".5rem"
          },
          "3": {
            "value": ".75rem"
          },
          "4": {
            "value": "1rem"
          },
          "5": {
            "value": "1.25rem"
          },
          "6": {
            "value": "1.5rem"
          },
          "7": {
            "value": "1.75rem"
          },
          "8": {
            "value": "2rem"
          },
          "9": {
            "value": "2.25rem"
          },
          "10": {
            "value": "2.5rem"
          },
          "none": {
            "value": "1"
          },
          "tight": {
            "value": "1.25"
          },
          "snug": {
            "value": "1.375"
          },
          "normal": {
            "value": "1.5"
          },
          "relaxed": {
            "value": "1.625"
          },
          "loose": {
            "value": "2"
          }
        }
      },
      "text": {
        "title": "Your website text scales.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type size",
          "@studio-icon material-symbols:format-size-rounded"
        ],
        "id": "#tokensConfig/text",
        "properties": {
          "xs": {
            "id": "#tokensConfig/text/xs",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/xs/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xs/fontSize/value",
                    "default": "{fontSize.xs}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.xs}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/xs/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xs/lineHeight/value",
                    "default": "{lead.4}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.4}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.xs}"
              },
              "lineHeight": {
                "value": "{lead.4}"
              }
            }
          },
          "sm": {
            "id": "#tokensConfig/text/sm",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/sm/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/sm/fontSize/value",
                    "default": "{fontSize.sm}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.sm}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/sm/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/sm/lineHeight/value",
                    "default": "{lead.5}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.5}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.sm}"
              },
              "lineHeight": {
                "value": "{lead.5}"
              }
            }
          },
          "base": {
            "id": "#tokensConfig/text/base",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/base/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/base/fontSize/value",
                    "default": "{fontSize.base}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.base}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/base/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/base/lineHeight/value",
                    "default": "{lead.6}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.6}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.base}"
              },
              "lineHeight": {
                "value": "{lead.6}"
              }
            }
          },
          "lg": {
            "id": "#tokensConfig/text/lg",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/lg/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/lg/fontSize/value",
                    "default": "{fontSize.lg}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.lg}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/lg/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/lg/lineHeight/value",
                    "default": "{lead.7}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.7}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.lg}"
              },
              "lineHeight": {
                "value": "{lead.7}"
              }
            }
          },
          "xl": {
            "id": "#tokensConfig/text/xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xl/fontSize/value",
                    "default": "{fontSize.xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/xl/lineHeight/value",
                    "default": "{lead.7}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.7}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.xl}"
              },
              "lineHeight": {
                "value": "{lead.7}"
              }
            }
          },
          "2xl": {
            "id": "#tokensConfig/text/2xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/2xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/2xl/fontSize/value",
                    "default": "{fontSize.2xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.2xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/2xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/2xl/lineHeight/value",
                    "default": "{lead.8}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.8}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.2xl}"
              },
              "lineHeight": {
                "value": "{lead.8}"
              }
            }
          },
          "3xl": {
            "id": "#tokensConfig/text/3xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/3xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/3xl/fontSize/value",
                    "default": "{fontSize.3xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.3xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/3xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/3xl/lineHeight/value",
                    "default": "{lead.9}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.9}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.3xl}"
              },
              "lineHeight": {
                "value": "{lead.9}"
              }
            }
          },
          "4xl": {
            "id": "#tokensConfig/text/4xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/4xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/4xl/fontSize/value",
                    "default": "{fontSize.4xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.4xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/4xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/4xl/lineHeight/value",
                    "default": "{lead.10}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.10}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.4xl}"
              },
              "lineHeight": {
                "value": "{lead.10}"
              }
            }
          },
          "5xl": {
            "id": "#tokensConfig/text/5xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/5xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/5xl/fontSize/value",
                    "default": "{fontSize.5xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.5xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/5xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/5xl/lineHeight/value",
                    "default": "{lead.none}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.none}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.5xl}"
              },
              "lineHeight": {
                "value": "{lead.none}"
              }
            }
          },
          "6xl": {
            "id": "#tokensConfig/text/6xl",
            "properties": {
              "fontSize": {
                "id": "#tokensConfig/text/6xl/fontSize",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/6xl/fontSize/value",
                    "default": "{fontSize.6xl}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{fontSize.6xl}"
                }
              },
              "lineHeight": {
                "id": "#tokensConfig/text/6xl/lineHeight",
                "properties": {
                  "value": {
                    "type": "string",
                    "id": "#tokensConfig/text/6xl/lineHeight/value",
                    "default": "{lead.none}"
                  }
                },
                "type": "object",
                "default": {
                  "value": "{lead.none}"
                }
              }
            },
            "type": "object",
            "default": {
              "fontSize": {
                "value": "{fontSize.6xl}"
              },
              "lineHeight": {
                "value": "{lead.none}"
              }
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "fontSize": {
              "value": "{fontSize.xs}"
            },
            "lineHeight": {
              "value": "{lead.4}"
            }
          },
          "sm": {
            "fontSize": {
              "value": "{fontSize.sm}"
            },
            "lineHeight": {
              "value": "{lead.5}"
            }
          },
          "base": {
            "fontSize": {
              "value": "{fontSize.base}"
            },
            "lineHeight": {
              "value": "{lead.6}"
            }
          },
          "lg": {
            "fontSize": {
              "value": "{fontSize.lg}"
            },
            "lineHeight": {
              "value": "{lead.7}"
            }
          },
          "xl": {
            "fontSize": {
              "value": "{fontSize.xl}"
            },
            "lineHeight": {
              "value": "{lead.7}"
            }
          },
          "2xl": {
            "fontSize": {
              "value": "{fontSize.2xl}"
            },
            "lineHeight": {
              "value": "{lead.8}"
            }
          },
          "3xl": {
            "fontSize": {
              "value": "{fontSize.3xl}"
            },
            "lineHeight": {
              "value": "{lead.9}"
            }
          },
          "4xl": {
            "fontSize": {
              "value": "{fontSize.4xl}"
            },
            "lineHeight": {
              "value": "{lead.10}"
            }
          },
          "5xl": {
            "fontSize": {
              "value": "{fontSize.5xl}"
            },
            "lineHeight": {
              "value": "{lead.none}"
            }
          },
          "6xl": {
            "fontSize": {
              "value": "{fontSize.6xl}"
            },
            "lineHeight": {
              "value": "{lead.none}"
            }
          }
        }
      },
      "media": {
        "title": "Your website media queries.",
        "tags": [
          "@studio-input design-token",
          "@studio-input-token-type color",
          "@studio-icon material-symbols:screenshot-monitor-outline-rounded"
        ],
        "id": "#tokensConfig/media",
        "properties": {
          "xs": {
            "id": "#tokensConfig/media/xs",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/xs/value",
                "default": "(min-width: 475px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 475px)"
            }
          },
          "sm": {
            "id": "#tokensConfig/media/sm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/sm/value",
                "default": "(min-width: 640px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 640px)"
            }
          },
          "md": {
            "id": "#tokensConfig/media/md",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/md/value",
                "default": "(min-width: 768px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 768px)"
            }
          },
          "lg": {
            "id": "#tokensConfig/media/lg",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/lg/value",
                "default": "(min-width: 1024px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1024px)"
            }
          },
          "xl": {
            "id": "#tokensConfig/media/xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/xl/value",
                "default": "(min-width: 1280px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1280px)"
            }
          },
          "2xl": {
            "id": "#tokensConfig/media/2xl",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/2xl/value",
                "default": "(min-width: 1536px)"
              }
            },
            "type": "object",
            "default": {
              "value": "(min-width: 1536px)"
            }
          },
          "rm": {
            "id": "#tokensConfig/media/rm",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/rm/value",
                "default": "(prefers-reduced-motion: reduce)"
              }
            },
            "type": "object",
            "default": {
              "value": "(prefers-reduced-motion: reduce)"
            }
          },
          "landscape": {
            "id": "#tokensConfig/media/landscape",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/landscape/value",
                "default": "only screen and (orientation: landscape)"
              }
            },
            "type": "object",
            "default": {
              "value": "only screen and (orientation: landscape)"
            }
          },
          "portrait": {
            "id": "#tokensConfig/media/portrait",
            "properties": {
              "value": {
                "type": "string",
                "id": "#tokensConfig/media/portrait/value",
                "default": "only screen and (orientation: portrait)"
              }
            },
            "type": "object",
            "default": {
              "value": "only screen and (orientation: portrait)"
            }
          }
        },
        "type": "object",
        "default": {
          "xs": {
            "value": "(min-width: 475px)"
          },
          "sm": {
            "value": "(min-width: 640px)"
          },
          "md": {
            "value": "(min-width: 768px)"
          },
          "lg": {
            "value": "(min-width: 1024px)"
          },
          "xl": {
            "value": "(min-width: 1280px)"
          },
          "2xl": {
            "value": "(min-width: 1536px)"
          },
          "rm": {
            "value": "(prefers-reduced-motion: reduce)"
          },
          "landscape": {
            "value": "only screen and (orientation: landscape)"
          },
          "portrait": {
            "value": "only screen and (orientation: portrait)"
          }
        }
      }
    },
    "type": "object",
    "default": {
      "color": {
        "primary": {
          "50": {
            "value": "#d9f8ff"
          },
          "100": {
            "value": "#b3f1ff"
          },
          "200": {
            "value": "#8deaff"
          },
          "300": {
            "value": "#66e4ff"
          },
          "400": {
            "value": "#40ddff"
          },
          "500": {
            "value": "#1ad6ff"
          },
          "600": {
            "value": "#00b9e1"
          },
          "700": {
            "value": "#008aa9"
          },
          "800": {
            "value": "#005c70"
          },
          "900": {
            "value": "#002e38"
          }
        },
        "secondary": {
          "50": {
            "value": "#fafafa"
          },
          "100": {
            "value": "#f4f4f5"
          },
          "200": {
            "value": "#e4e4e7"
          },
          "300": {
            "value": "#D4d4d8"
          },
          "400": {
            "value": "#a1a1aa"
          },
          "500": {
            "value": "#71717A"
          },
          "600": {
            "value": "#52525B"
          },
          "700": {
            "value": "#3f3f46"
          },
          "800": {
            "value": "#27272A"
          },
          "900": {
            "value": "#18181B"
          }
        },
        "white": {
          "value": "#ffffff"
        },
        "black": {
          "value": "#0c0c0d"
        },
        "gray": {
          "50": {
            "value": "#fafafa"
          },
          "100": {
            "value": "#f4f4f5"
          },
          "200": {
            "value": "#e4e4e7"
          },
          "300": {
            "value": "#D4d4d8"
          },
          "400": {
            "value": "#a1a1aa"
          },
          "500": {
            "value": "#71717A"
          },
          "600": {
            "value": "#52525B"
          },
          "700": {
            "value": "#3f3f46"
          },
          "800": {
            "value": "#27272A"
          },
          "900": {
            "value": "#18181B"
          }
        },
        "green": {
          "50": {
            "value": "#d6ffee"
          },
          "100": {
            "value": "#acffdd"
          },
          "200": {
            "value": "#83ffcc"
          },
          "300": {
            "value": "#30ffaa"
          },
          "400": {
            "value": "#00dc82"
          },
          "500": {
            "value": "#00bd6f"
          },
          "600": {
            "value": "#009d5d"
          },
          "700": {
            "value": "#007e4a"
          },
          "800": {
            "value": "#005e38"
          },
          "900": {
            "value": "#003f25"
          }
        },
        "yellow": {
          "50": {
            "value": "#fdf6db"
          },
          "100": {
            "value": "#fcedb7"
          },
          "200": {
            "value": "#fae393"
          },
          "300": {
            "value": "#f8da70"
          },
          "400": {
            "value": "#f7d14c"
          },
          "500": {
            "value": "#f5c828"
          },
          "600": {
            "value": "#daac0a"
          },
          "700": {
            "value": "#a38108"
          },
          "800": {
            "value": "#6d5605"
          },
          "900": {
            "value": "#362b03"
          }
        },
        "orange": {
          "50": {
            "value": "#ffe9d9"
          },
          "100": {
            "value": "#ffd3b3"
          },
          "200": {
            "value": "#ffbd8d"
          },
          "300": {
            "value": "#ffa666"
          },
          "400": {
            "value": "#ff9040"
          },
          "500": {
            "value": "#ff7a1a"
          },
          "600": {
            "value": "#e15e00"
          },
          "700": {
            "value": "#a94700"
          },
          "800": {
            "value": "#702f00"
          },
          "900": {
            "value": "#381800"
          }
        },
        "red": {
          "50": {
            "value": "#ffdbd9"
          },
          "100": {
            "value": "#ffb7b3"
          },
          "200": {
            "value": "#ff948d"
          },
          "300": {
            "value": "#ff7066"
          },
          "400": {
            "value": "#ff4c40"
          },
          "500": {
            "value": "#ff281a"
          },
          "600": {
            "value": "#e10e00"
          },
          "700": {
            "value": "#a90a00"
          },
          "800": {
            "value": "#700700"
          },
          "900": {
            "value": "#380300"
          }
        },
        "pear": {
          "50": {
            "value": "#f7f8dc"
          },
          "100": {
            "value": "#eff0ba"
          },
          "200": {
            "value": "#e8e997"
          },
          "300": {
            "value": "#e0e274"
          },
          "400": {
            "value": "#d8da52"
          },
          "500": {
            "value": "#d0d32f"
          },
          "600": {
            "value": "#a8aa24"
          },
          "700": {
            "value": "#7e801b"
          },
          "800": {
            "value": "#545512"
          },
          "900": {
            "value": "#2a2b09"
          }
        },
        "teal": {
          "50": {
            "value": "#d7faf8"
          },
          "100": {
            "value": "#aff4f0"
          },
          "200": {
            "value": "#87efe9"
          },
          "300": {
            "value": "#5fe9e1"
          },
          "400": {
            "value": "#36e4da"
          },
          "500": {
            "value": "#1cd1c6"
          },
          "600": {
            "value": "#16a79e"
          },
          "700": {
            "value": "#117d77"
          },
          "800": {
            "value": "#0b544f"
          },
          "900": {
            "value": "#062a28"
          }
        },
        "lightblue": {
          "50": {
            "value": "#d9f8ff"
          },
          "100": {
            "value": "#b3f1ff"
          },
          "200": {
            "value": "#8deaff"
          },
          "300": {
            "value": "#66e4ff"
          },
          "400": {
            "value": "#40ddff"
          },
          "500": {
            "value": "#1ad6ff"
          },
          "600": {
            "value": "#00b9e1"
          },
          "700": {
            "value": "#008aa9"
          },
          "800": {
            "value": "#005c70"
          },
          "900": {
            "value": "#002e38"
          }
        },
        "blue": {
          "50": {
            "value": "#d9f1ff"
          },
          "100": {
            "value": "#b3e4ff"
          },
          "200": {
            "value": "#8dd6ff"
          },
          "300": {
            "value": "#66c8ff"
          },
          "400": {
            "value": "#40bbff"
          },
          "500": {
            "value": "#1aadff"
          },
          "600": {
            "value": "#0090e1"
          },
          "700": {
            "value": "#006ca9"
          },
          "800": {
            "value": "#004870"
          },
          "900": {
            "value": "#002438"
          }
        },
        "indigoblue": {
          "50": {
            "value": "#d9e5ff"
          },
          "100": {
            "value": "#b3cbff"
          },
          "200": {
            "value": "#8db0ff"
          },
          "300": {
            "value": "#6696ff"
          },
          "400": {
            "value": "#407cff"
          },
          "500": {
            "value": "#1a62ff"
          },
          "600": {
            "value": "#0047e1"
          },
          "700": {
            "value": "#0035a9"
          },
          "800": {
            "value": "#002370"
          },
          "900": {
            "value": "#001238"
          }
        },
        "royalblue": {
          "50": {
            "value": "#dfdbfb"
          },
          "100": {
            "value": "#c0b7f7"
          },
          "200": {
            "value": "#a093f3"
          },
          "300": {
            "value": "#806ff0"
          },
          "400": {
            "value": "#614bec"
          },
          "500": {
            "value": "#4127e8"
          },
          "600": {
            "value": "#2c15c4"
          },
          "700": {
            "value": "#211093"
          },
          "800": {
            "value": "#160a62"
          },
          "900": {
            "value": "#0b0531"
          }
        },
        "purple": {
          "50": {
            "value": "#ead9ff"
          },
          "100": {
            "value": "#d5b3ff"
          },
          "200": {
            "value": "#c08dff"
          },
          "300": {
            "value": "#ab66ff"
          },
          "400": {
            "value": "#9640ff"
          },
          "500": {
            "value": "#811aff"
          },
          "600": {
            "value": "#6500e1"
          },
          "700": {
            "value": "#4c00a9"
          },
          "800": {
            "value": "#330070"
          },
          "900": {
            "value": "#190038"
          }
        },
        "pink": {
          "50": {
            "value": "#ffd9f2"
          },
          "100": {
            "value": "#ffb3e5"
          },
          "200": {
            "value": "#ff8dd8"
          },
          "300": {
            "value": "#ff66cc"
          },
          "400": {
            "value": "#ff40bf"
          },
          "500": {
            "value": "#ff1ab2"
          },
          "600": {
            "value": "#e10095"
          },
          "700": {
            "value": "#a90070"
          },
          "800": {
            "value": "#70004b"
          },
          "900": {
            "value": "#380025"
          }
        },
        "ruby": {
          "50": {
            "value": "#ffd9e4"
          },
          "100": {
            "value": "#ffb3c9"
          },
          "200": {
            "value": "#ff8dae"
          },
          "300": {
            "value": "#ff6694"
          },
          "400": {
            "value": "#ff4079"
          },
          "500": {
            "value": "#ff1a5e"
          },
          "600": {
            "value": "#e10043"
          },
          "700": {
            "value": "#a90032"
          },
          "800": {
            "value": "#700021"
          },
          "900": {
            "value": "#380011"
          }
        }
      },
      "elements": {
        "color": {
          "text": {
            "primary": {
              "default": {
                "value": {
                  "initial": "{color.gray.900}",
                  "dark": "{color.gray.50}"
                }
              },
              "hover": {}
            },
            "secondary": {
              "default": {
                "value": {
                  "initial": "{color.gray.500}",
                  "dark": "{color.gray.400}"
                }
              },
              "hover": {
                "value": {
                  "initial": "{color.gray.700}",
                  "dark": "{color.gray.200}"
                }
              }
            }
          }
        },
        "container": {
          "maxWidth": {
            "value": "80rem"
          },
          "padding": {
            "mobile": {
              "value": "{space.4}"
            },
            "xs": {
              "value": "{space.4}"
            },
            "sm": {
              "value": "{space.6}"
            },
            "md": {
              "value": "{space.6}"
            }
          }
        },
        "backdrop": {
          "filter": {
            "value": "saturate(200%) blur(20px)"
          },
          "background": {
            "value": {
              "initial": "#fffc",
              "dark": "#0c0d0ccc"
            }
          }
        },
        "border": {
          "primary": {
            "default": {
              "value": {
                "initial": "{color.gray.100}",
                "dark": "{color.gray.900}"
              }
            },
            "hover": {
              "value": {
                "initial": "{color.gray.200}",
                "dark": "{color.gray.800}"
              }
            }
          },
          "secondary": {
            "default": {
              "value": {
                "initial": "{color.gray.200}",
                "dark": "{color.gray.800}"
              }
            },
            "hover": {
              "value": {
                "initial": "",
                "dark": ""
              }
            }
          }
        },
        "surface": {
          "background": {
            "base": {
              "value": {
                "initial": "{color.gray.100}",
                "dark": "{color.gray.900}"
              }
            }
          }
        },
        "state": {
          "primary": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.primary.600}",
                  "dark": "{color.primary.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.primary.700}",
                  "dark": "{color.primary.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.primary.50}",
                  "dark": "{color.primary.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.primary.100}",
                  "dark": "{color.primary.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.primary.100}",
                  "dark": "{color.primary.800}"
                }
              },
              "secondary": {}
            }
          },
          "info": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.blue.500}",
                  "dark": "{color.blue.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.blue.600}",
                  "dark": "{color.blue.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.blue.50}",
                  "dark": "{color.blue.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.blue.100}",
                  "dark": "{color.blue.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.blue.100}",
                  "dark": "{color.blue.800}"
                }
              },
              "secondary": {}
            }
          },
          "success": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.green.500}",
                  "dark": "{color.green.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.green.600}",
                  "dark": "{color.green.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.green.50}",
                  "dark": "{color.green.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.green.100}",
                  "dark": "{color.green.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.green.100}",
                  "dark": "{color.green.800}"
                }
              },
              "secondary": {}
            }
          },
          "warning": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.600}",
                  "dark": "{color.yellow.400}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.yellow.700}",
                  "dark": "{color.yellow.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.50}",
                  "dark": "{color.yellow.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.yellow.100}",
                  "dark": "{color.yellow.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.yellow.100}",
                  "dark": "{color.yellow.800}"
                }
              },
              "secondary": {}
            }
          },
          "danger": {
            "color": {
              "primary": {
                "value": {
                  "initial": "{color.red.500}",
                  "dark": "{color.red.300}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.red.600}",
                  "dark": "{color.red.200}"
                }
              }
            },
            "backgroundColor": {
              "primary": {
                "value": {
                  "initial": "{color.red.50}",
                  "dark": "{color.red.900}"
                }
              },
              "secondary": {
                "value": {
                  "initial": "{color.red.100}",
                  "dark": "{color.red.800}"
                }
              }
            },
            "borderColor": {
              "primary": {
                "value": {
                  "initial": "{color.red.100}",
                  "dark": "{color.red.800}"
                }
              },
              "secondary": {}
            }
          }
        }
      },
      "typography": {
        "verticalMargin": {
          "sm": {
            "value": "16px"
          },
          "base": {
            "value": "32px"
          }
        },
        "letterSpacing": {
          "tight": {
            "value": "-0.025em"
          },
          "wide": {
            "value": "0.025em"
          }
        },
        "fontSize": {
          "xs": {
            "value": "12px"
          },
          "sm": {
            "value": "14px"
          },
          "base": {
            "value": "16px"
          },
          "lg": {
            "value": "18px"
          },
          "xl": {
            "value": "20px"
          },
          "2xl": {
            "value": "24px"
          },
          "3xl": {
            "value": "30px"
          },
          "4xl": {
            "value": "36px"
          },
          "5xl": {
            "value": "48px"
          },
          "6xl": {
            "value": "60px"
          },
          "7xl": {
            "value": "72px"
          },
          "8xl": {
            "value": "96px"
          },
          "9xl": {
            "value": "128px"
          }
        },
        "fontWeight": {
          "thin": {
            "value": "100"
          },
          "extralight": {
            "value": "200"
          },
          "light": {
            "value": "300"
          },
          "normal": {
            "value": "400"
          },
          "medium": {
            "value": "500"
          },
          "semibold": {
            "value": "600"
          },
          "bold": {
            "value": "700"
          },
          "extrabold": {
            "value": "800"
          },
          "black": {
            "value": "900"
          }
        },
        "lead": {
          "none": {
            "value": "1"
          },
          "tight": {
            "value": "1.25"
          },
          "snug": {
            "value": "1.375"
          },
          "normal": {
            "value": "1.5"
          },
          "relaxed": {
            "value": "1.625"
          },
          "loose": {
            "value": "2"
          }
        },
        "color": {
          "primary": {
            "50": {
              "value": "{color.primary.50}"
            },
            "100": {
              "value": "{color.primary.100}"
            },
            "200": {
              "value": "{color.primary.200}"
            },
            "300": {
              "value": "{color.primary.300}"
            },
            "400": {
              "value": "{color.primary.400}"
            },
            "500": {
              "value": "{color.primary.500}"
            },
            "600": {
              "value": "{color.primary.600}"
            },
            "700": {
              "value": "{color.primary.700}"
            },
            "800": {
              "value": "{color.primary.800}"
            },
            "900": {
              "value": "{color.primary.900}"
            }
          },
          "secondary": {
            "50": {
              "value": "{color.gray.50}"
            },
            "100": {
              "value": "{color.gray.100}"
            },
            "200": {
              "value": "{color.gray.200}"
            },
            "300": {
              "value": "{color.gray.300}"
            },
            "400": {
              "value": "{color.gray.400}"
            },
            "500": {
              "value": "{color.gray.500}"
            },
            "600": {
              "value": "{color.gray.600}"
            },
            "700": {
              "value": "{color.gray.700}"
            },
            "800": {
              "value": "{color.gray.800}"
            },
            "900": {
              "value": "{color.gray.900}"
            }
          }
        }
      },
      "prose": {
        "p": {
          "fontSize": {
            "value": "{typography.fontSize.base}"
          },
          "lineHeight": {
            "value": "{typography.lead.normal}"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "br": {
            "margin": {
              "value": "{typography.verticalMargin.base} 0 0 0"
            }
          }
        },
        "h1": {
          "margin": {
            "value": "0 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.5xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.tight}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.bold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.3xl}"
          }
        },
        "h2": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.4xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.tight}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.2xl}"
          }
        },
        "h3": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.3xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.xl}"
          }
        },
        "h4": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.2xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "letterSpacing": {
            "value": "{typography.letterSpacing.tight}"
          },
          "iconSize": {
            "value": "{typography.fontSize.lg}"
          }
        },
        "h5": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.xl}"
          },
          "lineHeight": {
            "value": "{typography.lead.snug}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "iconSize": {
            "value": "{typography.fontSize.lg}"
          }
        },
        "h6": {
          "margin": {
            "value": "3rem 0 2rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.lg}"
          },
          "lineHeight": {
            "value": "{typography.lead.normal}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          },
          "iconSize": {
            "value": "{typography.fontSize.base}"
          }
        },
        "strong": {
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          }
        },
        "img": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          }
        },
        "a": {
          "textDecoration": {
            "value": "none"
          },
          "color": {
            "light": {
              "default": {
                "value": "inherit"
              },
              "hover": {
                "value": "{typography.color.primary.500}"
              }
            },
            "dark": {
              "default": {
                "value": "inherit"
              },
              "hover": {
                "value": "{typography.color.primary.400}"
              }
            }
          },
          "borderBottom": {
            "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
          },
          "borderWidth": {
            "value": "1px"
          },
          "borderColor": {
            "light": {
              "default": {
                "value": "{typography.color.secondary.400}"
              },
              "hover": {
                "value": "{typography.color.primary.500}"
              }
            },
            "dark": {
              "default": {
                "value": "{typography.color.secondary.400}"
              },
              "hover": {
                "value": "{typography.color.primary.500}"
              }
            }
          },
          "borderStyle": {
            "default": {
              "value": "dashed"
            },
            "hover": {
              "value": "solid"
            }
          },
          "borderDistance": {
            "value": "2px"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.medium}"
          },
          "hasCode": {
            "borderBottom": {
              "value": "none"
            }
          },
          "code": {
            "border": {
              "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
            },
            "borderColor": {
              "light": {
                "default": {
                  "value": "{typography.color.secondary.400}"
                },
                "hover": {
                  "value": "{typography.color.primary.500}"
                }
              },
              "dark": {
                "default": {
                  "value": "{typography.color.secondary.600}"
                },
                "hover": {
                  "value": "{typography.color.primary.600}"
                }
              }
            },
            "color": {
              "light": {
                "hover": {
                  "value": "{typography.color.primary.500}"
                }
              },
              "dark": {
                "hover": {
                  "value": "{typography.color.primary.300}"
                }
              }
            },
            "background": {
              "light": {
                "hover": {
                  "value": "{typography.color.primary.50}"
                }
              },
              "dark": {
                "hover": {
                  "value": "{typography.color.primary.900}"
                }
              }
            }
          }
        },
        "blockquote": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "padding": {
            "value": "0 0 0 24px"
          },
          "quotes": {
            "value": "'201C' '201D' '2018' '2019'"
          },
          "color": {
            "light": {
              "value": "{typography.color.secondary.500}"
            },
            "dark": {
              "value": "{typography.color.secondary.400}"
            }
          },
          "borderLeft": {
            "value": "1px solid {prose.blockquote.borderColor.light}"
          },
          "borderColor": {
            "light": {
              "value": "{typography.color.secondary.200}"
            },
            "dark": {
              "value": "{typography.color.secondary.700}"
            }
          }
        },
        "ul": {
          "listStyleType": {
            "value": "disc"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "padding": {
            "value": "0 0 0 21px"
          },
          "li": {
            "markerColor": {
              "light": {
                "value": "{typography.color.secondary.300}"
              },
              "dark": {
                "value": "{typography.color.secondary.800}"
              }
            }
          }
        },
        "ol": {
          "listStyleType": {
            "value": "decimal"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "padding": {
            "value": "0 0 0 21px"
          },
          "li": {
            "markerColor": {
              "light": {
                "value": "{typography.color.secondary.500}"
              },
              "dark": {
                "value": "{typography.color.secondary.500}"
              }
            }
          }
        },
        "li": {
          "margin": {
            "value": "{typography.verticalMargin.sm} 0"
          },
          "listStylePosition": {
            "value": "outside"
          }
        },
        "hr": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "style": {
            "value": "solid"
          },
          "width": {
            "value": "1px"
          },
          "color": {
            "light": {
              "value": "{typography.color.secondary.200}"
            },
            "dark": {
              "value": "{typography.color.secondary.800}"
            }
          }
        },
        "table": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "textAlign": {
            "value": "left"
          },
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "lineHeight": {
            "value": "inherit"
          }
        },
        "thead": {
          "border": {
            "value": "none"
          },
          "borderBottom": {
            "value": "1px solid {prose.thead.borderColor.light}"
          },
          "borderColor": {
            "light": {
              "value": "{typography.color.secondary.300}"
            },
            "dark": {
              "value": "{typography.color.secondary.600}"
            }
          }
        },
        "th": {
          "color": {
            "light": {
              "value": "{typography.color.secondary.600}"
            },
            "dark": {
              "value": "{typography.color.secondary.400}"
            }
          },
          "padding": {
            "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.semibold}"
          }
        },
        "tbody": {
          "tr": {
            "borderBottom": {
              "value": "1px dashed {prose.tbody.tr.borderColor.light}"
            },
            "borderColor": {
              "light": {
                "value": "{typography.color.secondary.300}"
              },
              "dark": {
                "value": "{typography.color.secondary.700}"
              }
            }
          },
          "td": {
            "padding": {
              "value": "{typography.verticalMargin.sm}"
            }
          },
          "code": {
            "inline": {
              "fontSize": {
                "value": "{typography.fontSize.sm}"
              }
            }
          }
        },
        "code": {
          "block": {
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "margin": {
              "value": "{typography.verticalMargin.base} 0"
            },
            "borderColor": {
              "light": {
                "value": "{typography.color.secondary.200}"
              },
              "dark": {
                "value": "{typography.color.secondary.800}"
              }
            },
            "color": {
              "light": {
                "value": "{typography.color.secondary.700}"
              },
              "dark": {
                "value": "{typography.color.secondary.200}"
              }
            },
            "backgroundColor": {
              "light": {
                "value": "{typography.color.secondary.100}"
              },
              "dark": {
                "value": "{typography.color.secondary.900}"
              }
            },
            "pre": {
              "padding": {
                "value": "{typography.verticalMargin.sm}"
              }
            }
          },
          "inline": {
            "borderRadius": {
              "value": "0.375rem"
            },
            "padding": {
              "value": "0.25rem 0.375rem 0.25rem 0.375rem"
            },
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            },
            "fontWeight": {
              "value": "{typography.fontWeight.normal}"
            },
            "color": {
              "light": {
                "value": "{typography.color.secondary.700}"
              },
              "dark": {
                "value": "{typography.color.secondary.200}"
              }
            },
            "backgroundColor": {
              "light": {
                "value": "{typography.color.secondary.100}"
              },
              "dark": {
                "value": "{typography.color.secondary.800}"
              }
            }
          }
        }
      },
      "docus": {
        "header": {
          "height": {
            "value": "64px"
          }
        },
        "footer": {
          "padding": {
            "value": "{space.4} 0"
          }
        },
        "readableLine": {
          "value": "78ch"
        }
      },
      "colors": {
        "primary": {
          "50": {
            "value": "#ffedcc"
          },
          "100": {
            "value": "#ffdd9f"
          },
          "200": {
            "value": "#ffcd71"
          },
          "300": {
            "value": "#ffbd44"
          },
          "400": {
            "value": "#ffad17"
          },
          "500": {
            "value": "orange"
          },
          "600": {
            "value": "#bb7900"
          },
          "700": {
            "value": "#8e5c00"
          },
          "800": {
            "value": "#603e00"
          },
          "900": {
            "value": "#332100"
          }
        }
      },
      "width": {
        "screen": {
          "value": "100vw"
        }
      },
      "height": {
        "screen": {
          "value": "100vh"
        }
      },
      "shadow": {
        "xs": {
          "value": "0px 1px 2px 0px #000000"
        },
        "sm": {
          "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
        },
        "md": {
          "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
        },
        "lg": {
          "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
        },
        "xl": {
          "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
        },
        "2xl": {
          "value": "0px 25px 50px -12px {color.gray.900}"
        },
        "none": {
          "value": "0px 0px 0px 0px transparent"
        }
      },
      "radii": {
        "none": {
          "value": "0px",
          "description": "0px"
        },
        "2xs": {
          "value": "0.125rem",
          "description": "2px"
        },
        "xs": {
          "value": "0.25rem",
          "description": "4px"
        },
        "sm": {
          "value": "0.375rem",
          "description": "6px"
        },
        "md": {
          "value": "0.5rem",
          "description": "8px"
        },
        "lg": {
          "value": "0.75rem",
          "description": "12px"
        },
        "xl": {
          "value": "1rem",
          "description": "16px"
        },
        "2xl": {
          "value": "1.5rem",
          "description": "24px"
        },
        "3xl": {
          "value": "1.75rem",
          "description": "24px"
        },
        "full": {
          "value": "9999px",
          "description": "A very large value to handle every cases"
        }
      },
      "size": {
        "0": {
          "value": "0px"
        },
        "2": {
          "value": "2px"
        },
        "4": {
          "value": "4px"
        },
        "6": {
          "value": "6px"
        },
        "8": {
          "value": "8px"
        },
        "12": {
          "value": "12px"
        },
        "16": {
          "value": "16px"
        },
        "20": {
          "value": "20px"
        },
        "24": {
          "value": "24px"
        },
        "32": {
          "value": "32px"
        },
        "40": {
          "value": "40px"
        },
        "48": {
          "value": "48px"
        },
        "56": {
          "value": "56px"
        },
        "64": {
          "value": "64px"
        },
        "80": {
          "value": "80px"
        },
        "104": {
          "value": "104px"
        },
        "200": {
          "value": "200px"
        },
        "xs": {
          "value": "20rem"
        },
        "sm": {
          "value": "24rem"
        },
        "md": {
          "value": "28rem"
        },
        "lg": {
          "value": "32rem"
        },
        "xl": {
          "value": "36rem"
        },
        "2xl": {
          "value": "42rem"
        },
        "3xl": {
          "value": "48rem"
        },
        "4xl": {
          "value": "56rem"
        },
        "5xl": {
          "value": "64rem"
        },
        "6xl": {
          "value": "72rem"
        },
        "7xl": {
          "value": "80rem"
        },
        "full": {
          "value": "100%"
        }
      },
      "space": {
        "0": {
          "value": "0px"
        },
        "1": {
          "value": "0.25rem"
        },
        "2": {
          "value": "0.5rem"
        },
        "3": {
          "value": "0.75rem"
        },
        "4": {
          "value": "1rem"
        },
        "5": {
          "value": "1.25rem"
        },
        "6": {
          "value": "1.5rem"
        },
        "7": {
          "value": "1.75rem"
        },
        "8": {
          "value": "2rem"
        },
        "9": {
          "value": "2.25rem"
        },
        "10": {
          "value": "2.5rem"
        },
        "11": {
          "value": "2.75rem"
        },
        "12": {
          "value": "3rem"
        },
        "14": {
          "value": "3.5rem"
        },
        "16": {
          "value": "4rem"
        },
        "20": {
          "value": "5rem"
        },
        "24": {
          "value": "6rem"
        },
        "28": {
          "value": "7rem"
        },
        "32": {
          "value": "8rem"
        },
        "36": {
          "value": "9rem"
        },
        "40": {
          "value": "10rem"
        },
        "44": {
          "value": "11rem"
        },
        "48": {
          "value": "12rem"
        },
        "52": {
          "value": "13rem"
        },
        "56": {
          "value": "14rem"
        },
        "60": {
          "value": "15rem"
        },
        "64": {
          "value": "16rem"
        },
        "72": {
          "value": "18rem"
        },
        "80": {
          "value": "20rem"
        },
        "96": {
          "value": "24rem"
        },
        "px": {
          "value": "1px"
        },
        "rem": {
          "125": {
            "value": "0.125rem"
          },
          "375": {
            "value": "0.375rem"
          },
          "625": {
            "value": "0.625rem"
          },
          "875": {
            "value": "0.875rem"
          }
        }
      },
      "borderWidth": {
        "noBorder": {
          "value": "0"
        },
        "sm": {
          "value": "1px"
        },
        "md": {
          "value": "2px"
        },
        "lg": {
          "value": "3px"
        }
      },
      "opacity": {
        "noOpacity": {
          "value": "0",
          "type": "opacity"
        },
        "bright": {
          "value": "0.1",
          "type": "opacity"
        },
        "light": {
          "value": "0.15",
          "type": "opacity"
        },
        "soft": {
          "value": "0.3",
          "type": "opacity"
        },
        "medium": {
          "value": "0.5",
          "type": "opacity"
        },
        "high": {
          "value": "0.8",
          "type": "opacity"
        },
        "total": {
          "value": "1",
          "type": "opacity"
        }
      },
      "font": {
        "sans": {
          "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
        },
        "serif": {
          "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
        },
        "mono": {
          "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
        }
      },
      "fontWeight": {
        "thin": {
          "value": "100"
        },
        "extralight": {
          "value": "200"
        },
        "light": {
          "value": "300"
        },
        "normal": {
          "value": "400"
        },
        "medium": {
          "value": "500"
        },
        "semibold": {
          "value": "600"
        },
        "bold": {
          "value": "700"
        },
        "extrabold": {
          "value": "800"
        },
        "black": {
          "value": "900"
        }
      },
      "fontSize": {
        "xs": {
          "value": "0.75rem"
        },
        "sm": {
          "value": "0.875rem"
        },
        "base": {
          "value": "1rem"
        },
        "lg": {
          "value": "1.125rem"
        },
        "xl": {
          "value": "1.25rem"
        },
        "2xl": {
          "value": "1.5rem"
        },
        "3xl": {
          "value": "1.875rem"
        },
        "4xl": {
          "value": "2.25rem"
        },
        "5xl": {
          "value": "3rem"
        },
        "6xl": {
          "value": "3.75rem"
        },
        "7xl": {
          "value": "4.5rem"
        },
        "8xl": {
          "value": "6rem"
        },
        "9xl": {
          "value": "8rem"
        }
      },
      "letterSpacing": {
        "tighter": {
          "value": "-0.05em"
        },
        "tight": {
          "value": "-0.025em"
        },
        "normal": {
          "value": "0em"
        },
        "wide": {
          "value": "0.025em"
        },
        "wider": {
          "value": "0.05em"
        },
        "widest": {
          "value": "0.1em"
        }
      },
      "lead": {
        "1": {
          "value": ".025rem"
        },
        "2": {
          "value": ".5rem"
        },
        "3": {
          "value": ".75rem"
        },
        "4": {
          "value": "1rem"
        },
        "5": {
          "value": "1.25rem"
        },
        "6": {
          "value": "1.5rem"
        },
        "7": {
          "value": "1.75rem"
        },
        "8": {
          "value": "2rem"
        },
        "9": {
          "value": "2.25rem"
        },
        "10": {
          "value": "2.5rem"
        },
        "none": {
          "value": "1"
        },
        "tight": {
          "value": "1.25"
        },
        "snug": {
          "value": "1.375"
        },
        "normal": {
          "value": "1.5"
        },
        "relaxed": {
          "value": "1.625"
        },
        "loose": {
          "value": "2"
        }
      },
      "text": {
        "xs": {
          "fontSize": {
            "value": "{fontSize.xs}"
          },
          "lineHeight": {
            "value": "{lead.4}"
          }
        },
        "sm": {
          "fontSize": {
            "value": "{fontSize.sm}"
          },
          "lineHeight": {
            "value": "{lead.5}"
          }
        },
        "base": {
          "fontSize": {
            "value": "{fontSize.base}"
          },
          "lineHeight": {
            "value": "{lead.6}"
          }
        },
        "lg": {
          "fontSize": {
            "value": "{fontSize.lg}"
          },
          "lineHeight": {
            "value": "{lead.7}"
          }
        },
        "xl": {
          "fontSize": {
            "value": "{fontSize.xl}"
          },
          "lineHeight": {
            "value": "{lead.7}"
          }
        },
        "2xl": {
          "fontSize": {
            "value": "{fontSize.2xl}"
          },
          "lineHeight": {
            "value": "{lead.8}"
          }
        },
        "3xl": {
          "fontSize": {
            "value": "{fontSize.3xl}"
          },
          "lineHeight": {
            "value": "{lead.9}"
          }
        },
        "4xl": {
          "fontSize": {
            "value": "{fontSize.4xl}"
          },
          "lineHeight": {
            "value": "{lead.10}"
          }
        },
        "5xl": {
          "fontSize": {
            "value": "{fontSize.5xl}"
          },
          "lineHeight": {
            "value": "{lead.none}"
          }
        },
        "6xl": {
          "fontSize": {
            "value": "{fontSize.6xl}"
          },
          "lineHeight": {
            "value": "{lead.none}"
          }
        }
      },
      "media": {
        "xs": {
          "value": "(min-width: 475px)"
        },
        "sm": {
          "value": "(min-width: 640px)"
        },
        "md": {
          "value": "(min-width: 768px)"
        },
        "lg": {
          "value": "(min-width: 1024px)"
        },
        "xl": {
          "value": "(min-width: 1280px)"
        },
        "2xl": {
          "value": "(min-width: 1536px)"
        },
        "rm": {
          "value": "(prefers-reduced-motion: reduce)"
        },
        "landscape": {
          "value": "only screen and (orientation: landscape)"
        },
        "portrait": {
          "value": "only screen and (orientation: portrait)"
        }
      }
    }
  },
  "default": {
    "color": {
      "primary": {
        "50": {
          "value": "#d9f8ff"
        },
        "100": {
          "value": "#b3f1ff"
        },
        "200": {
          "value": "#8deaff"
        },
        "300": {
          "value": "#66e4ff"
        },
        "400": {
          "value": "#40ddff"
        },
        "500": {
          "value": "#1ad6ff"
        },
        "600": {
          "value": "#00b9e1"
        },
        "700": {
          "value": "#008aa9"
        },
        "800": {
          "value": "#005c70"
        },
        "900": {
          "value": "#002e38"
        }
      },
      "secondary": {
        "50": {
          "value": "#fafafa"
        },
        "100": {
          "value": "#f4f4f5"
        },
        "200": {
          "value": "#e4e4e7"
        },
        "300": {
          "value": "#D4d4d8"
        },
        "400": {
          "value": "#a1a1aa"
        },
        "500": {
          "value": "#71717A"
        },
        "600": {
          "value": "#52525B"
        },
        "700": {
          "value": "#3f3f46"
        },
        "800": {
          "value": "#27272A"
        },
        "900": {
          "value": "#18181B"
        }
      },
      "white": {
        "value": "#ffffff"
      },
      "black": {
        "value": "#0c0c0d"
      },
      "gray": {
        "50": {
          "value": "#fafafa"
        },
        "100": {
          "value": "#f4f4f5"
        },
        "200": {
          "value": "#e4e4e7"
        },
        "300": {
          "value": "#D4d4d8"
        },
        "400": {
          "value": "#a1a1aa"
        },
        "500": {
          "value": "#71717A"
        },
        "600": {
          "value": "#52525B"
        },
        "700": {
          "value": "#3f3f46"
        },
        "800": {
          "value": "#27272A"
        },
        "900": {
          "value": "#18181B"
        }
      },
      "green": {
        "50": {
          "value": "#d6ffee"
        },
        "100": {
          "value": "#acffdd"
        },
        "200": {
          "value": "#83ffcc"
        },
        "300": {
          "value": "#30ffaa"
        },
        "400": {
          "value": "#00dc82"
        },
        "500": {
          "value": "#00bd6f"
        },
        "600": {
          "value": "#009d5d"
        },
        "700": {
          "value": "#007e4a"
        },
        "800": {
          "value": "#005e38"
        },
        "900": {
          "value": "#003f25"
        }
      },
      "yellow": {
        "50": {
          "value": "#fdf6db"
        },
        "100": {
          "value": "#fcedb7"
        },
        "200": {
          "value": "#fae393"
        },
        "300": {
          "value": "#f8da70"
        },
        "400": {
          "value": "#f7d14c"
        },
        "500": {
          "value": "#f5c828"
        },
        "600": {
          "value": "#daac0a"
        },
        "700": {
          "value": "#a38108"
        },
        "800": {
          "value": "#6d5605"
        },
        "900": {
          "value": "#362b03"
        }
      },
      "orange": {
        "50": {
          "value": "#ffe9d9"
        },
        "100": {
          "value": "#ffd3b3"
        },
        "200": {
          "value": "#ffbd8d"
        },
        "300": {
          "value": "#ffa666"
        },
        "400": {
          "value": "#ff9040"
        },
        "500": {
          "value": "#ff7a1a"
        },
        "600": {
          "value": "#e15e00"
        },
        "700": {
          "value": "#a94700"
        },
        "800": {
          "value": "#702f00"
        },
        "900": {
          "value": "#381800"
        }
      },
      "red": {
        "50": {
          "value": "#ffdbd9"
        },
        "100": {
          "value": "#ffb7b3"
        },
        "200": {
          "value": "#ff948d"
        },
        "300": {
          "value": "#ff7066"
        },
        "400": {
          "value": "#ff4c40"
        },
        "500": {
          "value": "#ff281a"
        },
        "600": {
          "value": "#e10e00"
        },
        "700": {
          "value": "#a90a00"
        },
        "800": {
          "value": "#700700"
        },
        "900": {
          "value": "#380300"
        }
      },
      "pear": {
        "50": {
          "value": "#f7f8dc"
        },
        "100": {
          "value": "#eff0ba"
        },
        "200": {
          "value": "#e8e997"
        },
        "300": {
          "value": "#e0e274"
        },
        "400": {
          "value": "#d8da52"
        },
        "500": {
          "value": "#d0d32f"
        },
        "600": {
          "value": "#a8aa24"
        },
        "700": {
          "value": "#7e801b"
        },
        "800": {
          "value": "#545512"
        },
        "900": {
          "value": "#2a2b09"
        }
      },
      "teal": {
        "50": {
          "value": "#d7faf8"
        },
        "100": {
          "value": "#aff4f0"
        },
        "200": {
          "value": "#87efe9"
        },
        "300": {
          "value": "#5fe9e1"
        },
        "400": {
          "value": "#36e4da"
        },
        "500": {
          "value": "#1cd1c6"
        },
        "600": {
          "value": "#16a79e"
        },
        "700": {
          "value": "#117d77"
        },
        "800": {
          "value": "#0b544f"
        },
        "900": {
          "value": "#062a28"
        }
      },
      "lightblue": {
        "50": {
          "value": "#d9f8ff"
        },
        "100": {
          "value": "#b3f1ff"
        },
        "200": {
          "value": "#8deaff"
        },
        "300": {
          "value": "#66e4ff"
        },
        "400": {
          "value": "#40ddff"
        },
        "500": {
          "value": "#1ad6ff"
        },
        "600": {
          "value": "#00b9e1"
        },
        "700": {
          "value": "#008aa9"
        },
        "800": {
          "value": "#005c70"
        },
        "900": {
          "value": "#002e38"
        }
      },
      "blue": {
        "50": {
          "value": "#d9f1ff"
        },
        "100": {
          "value": "#b3e4ff"
        },
        "200": {
          "value": "#8dd6ff"
        },
        "300": {
          "value": "#66c8ff"
        },
        "400": {
          "value": "#40bbff"
        },
        "500": {
          "value": "#1aadff"
        },
        "600": {
          "value": "#0090e1"
        },
        "700": {
          "value": "#006ca9"
        },
        "800": {
          "value": "#004870"
        },
        "900": {
          "value": "#002438"
        }
      },
      "indigoblue": {
        "50": {
          "value": "#d9e5ff"
        },
        "100": {
          "value": "#b3cbff"
        },
        "200": {
          "value": "#8db0ff"
        },
        "300": {
          "value": "#6696ff"
        },
        "400": {
          "value": "#407cff"
        },
        "500": {
          "value": "#1a62ff"
        },
        "600": {
          "value": "#0047e1"
        },
        "700": {
          "value": "#0035a9"
        },
        "800": {
          "value": "#002370"
        },
        "900": {
          "value": "#001238"
        }
      },
      "royalblue": {
        "50": {
          "value": "#dfdbfb"
        },
        "100": {
          "value": "#c0b7f7"
        },
        "200": {
          "value": "#a093f3"
        },
        "300": {
          "value": "#806ff0"
        },
        "400": {
          "value": "#614bec"
        },
        "500": {
          "value": "#4127e8"
        },
        "600": {
          "value": "#2c15c4"
        },
        "700": {
          "value": "#211093"
        },
        "800": {
          "value": "#160a62"
        },
        "900": {
          "value": "#0b0531"
        }
      },
      "purple": {
        "50": {
          "value": "#ead9ff"
        },
        "100": {
          "value": "#d5b3ff"
        },
        "200": {
          "value": "#c08dff"
        },
        "300": {
          "value": "#ab66ff"
        },
        "400": {
          "value": "#9640ff"
        },
        "500": {
          "value": "#811aff"
        },
        "600": {
          "value": "#6500e1"
        },
        "700": {
          "value": "#4c00a9"
        },
        "800": {
          "value": "#330070"
        },
        "900": {
          "value": "#190038"
        }
      },
      "pink": {
        "50": {
          "value": "#ffd9f2"
        },
        "100": {
          "value": "#ffb3e5"
        },
        "200": {
          "value": "#ff8dd8"
        },
        "300": {
          "value": "#ff66cc"
        },
        "400": {
          "value": "#ff40bf"
        },
        "500": {
          "value": "#ff1ab2"
        },
        "600": {
          "value": "#e10095"
        },
        "700": {
          "value": "#a90070"
        },
        "800": {
          "value": "#70004b"
        },
        "900": {
          "value": "#380025"
        }
      },
      "ruby": {
        "50": {
          "value": "#ffd9e4"
        },
        "100": {
          "value": "#ffb3c9"
        },
        "200": {
          "value": "#ff8dae"
        },
        "300": {
          "value": "#ff6694"
        },
        "400": {
          "value": "#ff4079"
        },
        "500": {
          "value": "#ff1a5e"
        },
        "600": {
          "value": "#e10043"
        },
        "700": {
          "value": "#a90032"
        },
        "800": {
          "value": "#700021"
        },
        "900": {
          "value": "#380011"
        }
      }
    },
    "elements": {
      "color": {
        "text": {
          "primary": {
            "default": {
              "value": {
                "initial": "{color.gray.900}",
                "dark": "{color.gray.50}"
              }
            },
            "hover": {}
          },
          "secondary": {
            "default": {
              "value": {
                "initial": "{color.gray.500}",
                "dark": "{color.gray.400}"
              }
            },
            "hover": {
              "value": {
                "initial": "{color.gray.700}",
                "dark": "{color.gray.200}"
              }
            }
          }
        }
      },
      "container": {
        "maxWidth": {
          "value": "80rem"
        },
        "padding": {
          "mobile": {
            "value": "{space.4}"
          },
          "xs": {
            "value": "{space.4}"
          },
          "sm": {
            "value": "{space.6}"
          },
          "md": {
            "value": "{space.6}"
          }
        }
      },
      "backdrop": {
        "filter": {
          "value": "saturate(200%) blur(20px)"
        },
        "background": {
          "value": {
            "initial": "#fffc",
            "dark": "#0c0d0ccc"
          }
        }
      },
      "border": {
        "primary": {
          "default": {
            "value": {
              "initial": "{color.gray.100}",
              "dark": "{color.gray.900}"
            }
          },
          "hover": {
            "value": {
              "initial": "{color.gray.200}",
              "dark": "{color.gray.800}"
            }
          }
        },
        "secondary": {
          "default": {
            "value": {
              "initial": "{color.gray.200}",
              "dark": "{color.gray.800}"
            }
          },
          "hover": {
            "value": {
              "initial": "",
              "dark": ""
            }
          }
        }
      },
      "surface": {
        "background": {
          "base": {
            "value": {
              "initial": "{color.gray.100}",
              "dark": "{color.gray.900}"
            }
          }
        }
      },
      "state": {
        "primary": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.primary.600}",
                "dark": "{color.primary.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.primary.700}",
                "dark": "{color.primary.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.primary.50}",
                "dark": "{color.primary.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.primary.100}",
                "dark": "{color.primary.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.primary.100}",
                "dark": "{color.primary.800}"
              }
            },
            "secondary": {}
          }
        },
        "info": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.blue.500}",
                "dark": "{color.blue.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.blue.600}",
                "dark": "{color.blue.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.blue.50}",
                "dark": "{color.blue.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.blue.100}",
                "dark": "{color.blue.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.blue.100}",
                "dark": "{color.blue.800}"
              }
            },
            "secondary": {}
          }
        },
        "success": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.green.500}",
                "dark": "{color.green.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.green.600}",
                "dark": "{color.green.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.green.50}",
                "dark": "{color.green.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.green.100}",
                "dark": "{color.green.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.green.100}",
                "dark": "{color.green.800}"
              }
            },
            "secondary": {}
          }
        },
        "warning": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.yellow.600}",
                "dark": "{color.yellow.400}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.yellow.700}",
                "dark": "{color.yellow.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.yellow.50}",
                "dark": "{color.yellow.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.yellow.100}",
                "dark": "{color.yellow.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.yellow.100}",
                "dark": "{color.yellow.800}"
              }
            },
            "secondary": {}
          }
        },
        "danger": {
          "color": {
            "primary": {
              "value": {
                "initial": "{color.red.500}",
                "dark": "{color.red.300}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.red.600}",
                "dark": "{color.red.200}"
              }
            }
          },
          "backgroundColor": {
            "primary": {
              "value": {
                "initial": "{color.red.50}",
                "dark": "{color.red.900}"
              }
            },
            "secondary": {
              "value": {
                "initial": "{color.red.100}",
                "dark": "{color.red.800}"
              }
            }
          },
          "borderColor": {
            "primary": {
              "value": {
                "initial": "{color.red.100}",
                "dark": "{color.red.800}"
              }
            },
            "secondary": {}
          }
        }
      }
    },
    "typography": {
      "verticalMargin": {
        "sm": {
          "value": "16px"
        },
        "base": {
          "value": "32px"
        }
      },
      "letterSpacing": {
        "tight": {
          "value": "-0.025em"
        },
        "wide": {
          "value": "0.025em"
        }
      },
      "fontSize": {
        "xs": {
          "value": "12px"
        },
        "sm": {
          "value": "14px"
        },
        "base": {
          "value": "16px"
        },
        "lg": {
          "value": "18px"
        },
        "xl": {
          "value": "20px"
        },
        "2xl": {
          "value": "24px"
        },
        "3xl": {
          "value": "30px"
        },
        "4xl": {
          "value": "36px"
        },
        "5xl": {
          "value": "48px"
        },
        "6xl": {
          "value": "60px"
        },
        "7xl": {
          "value": "72px"
        },
        "8xl": {
          "value": "96px"
        },
        "9xl": {
          "value": "128px"
        }
      },
      "fontWeight": {
        "thin": {
          "value": "100"
        },
        "extralight": {
          "value": "200"
        },
        "light": {
          "value": "300"
        },
        "normal": {
          "value": "400"
        },
        "medium": {
          "value": "500"
        },
        "semibold": {
          "value": "600"
        },
        "bold": {
          "value": "700"
        },
        "extrabold": {
          "value": "800"
        },
        "black": {
          "value": "900"
        }
      },
      "lead": {
        "none": {
          "value": "1"
        },
        "tight": {
          "value": "1.25"
        },
        "snug": {
          "value": "1.375"
        },
        "normal": {
          "value": "1.5"
        },
        "relaxed": {
          "value": "1.625"
        },
        "loose": {
          "value": "2"
        }
      },
      "color": {
        "primary": {
          "50": {
            "value": "{color.primary.50}"
          },
          "100": {
            "value": "{color.primary.100}"
          },
          "200": {
            "value": "{color.primary.200}"
          },
          "300": {
            "value": "{color.primary.300}"
          },
          "400": {
            "value": "{color.primary.400}"
          },
          "500": {
            "value": "{color.primary.500}"
          },
          "600": {
            "value": "{color.primary.600}"
          },
          "700": {
            "value": "{color.primary.700}"
          },
          "800": {
            "value": "{color.primary.800}"
          },
          "900": {
            "value": "{color.primary.900}"
          }
        },
        "secondary": {
          "50": {
            "value": "{color.gray.50}"
          },
          "100": {
            "value": "{color.gray.100}"
          },
          "200": {
            "value": "{color.gray.200}"
          },
          "300": {
            "value": "{color.gray.300}"
          },
          "400": {
            "value": "{color.gray.400}"
          },
          "500": {
            "value": "{color.gray.500}"
          },
          "600": {
            "value": "{color.gray.600}"
          },
          "700": {
            "value": "{color.gray.700}"
          },
          "800": {
            "value": "{color.gray.800}"
          },
          "900": {
            "value": "{color.gray.900}"
          }
        }
      }
    },
    "prose": {
      "p": {
        "fontSize": {
          "value": "{typography.fontSize.base}"
        },
        "lineHeight": {
          "value": "{typography.lead.normal}"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "br": {
          "margin": {
            "value": "{typography.verticalMargin.base} 0 0 0"
          }
        }
      },
      "h1": {
        "margin": {
          "value": "0 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.5xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.tight}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.bold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.3xl}"
        }
      },
      "h2": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.4xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.tight}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.2xl}"
        }
      },
      "h3": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.3xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.xl}"
        }
      },
      "h4": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.2xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "letterSpacing": {
          "value": "{typography.letterSpacing.tight}"
        },
        "iconSize": {
          "value": "{typography.fontSize.lg}"
        }
      },
      "h5": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.xl}"
        },
        "lineHeight": {
          "value": "{typography.lead.snug}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "iconSize": {
          "value": "{typography.fontSize.lg}"
        }
      },
      "h6": {
        "margin": {
          "value": "3rem 0 2rem"
        },
        "fontSize": {
          "value": "{typography.fontSize.lg}"
        },
        "lineHeight": {
          "value": "{typography.lead.normal}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        },
        "iconSize": {
          "value": "{typography.fontSize.base}"
        }
      },
      "strong": {
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        }
      },
      "img": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        }
      },
      "a": {
        "textDecoration": {
          "value": "none"
        },
        "color": {
          "light": {
            "default": {
              "value": "inherit"
            },
            "hover": {
              "value": "{typography.color.primary.500}"
            }
          },
          "dark": {
            "default": {
              "value": "inherit"
            },
            "hover": {
              "value": "{typography.color.primary.400}"
            }
          }
        },
        "borderBottom": {
          "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.borderColor.light.default}"
        },
        "borderWidth": {
          "value": "1px"
        },
        "borderColor": {
          "light": {
            "default": {
              "value": "{typography.color.secondary.400}"
            },
            "hover": {
              "value": "{typography.color.primary.500}"
            }
          },
          "dark": {
            "default": {
              "value": "{typography.color.secondary.400}"
            },
            "hover": {
              "value": "{typography.color.primary.500}"
            }
          }
        },
        "borderStyle": {
          "default": {
            "value": "dashed"
          },
          "hover": {
            "value": "solid"
          }
        },
        "borderDistance": {
          "value": "2px"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.medium}"
        },
        "hasCode": {
          "borderBottom": {
            "value": "none"
          }
        },
        "code": {
          "border": {
            "value": "{prose.a.borderWidth} {prose.a.borderStyle.default} {prose.a.code.borderColor.light.default}"
          },
          "borderColor": {
            "light": {
              "default": {
                "value": "{typography.color.secondary.400}"
              },
              "hover": {
                "value": "{typography.color.primary.500}"
              }
            },
            "dark": {
              "default": {
                "value": "{typography.color.secondary.600}"
              },
              "hover": {
                "value": "{typography.color.primary.600}"
              }
            }
          },
          "color": {
            "light": {
              "hover": {
                "value": "{typography.color.primary.500}"
              }
            },
            "dark": {
              "hover": {
                "value": "{typography.color.primary.300}"
              }
            }
          },
          "background": {
            "light": {
              "hover": {
                "value": "{typography.color.primary.50}"
              }
            },
            "dark": {
              "hover": {
                "value": "{typography.color.primary.900}"
              }
            }
          }
        }
      },
      "blockquote": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "padding": {
          "value": "0 0 0 24px"
        },
        "quotes": {
          "value": "'201C' '201D' '2018' '2019'"
        },
        "color": {
          "light": {
            "value": "{typography.color.secondary.500}"
          },
          "dark": {
            "value": "{typography.color.secondary.400}"
          }
        },
        "borderLeft": {
          "value": "1px solid {prose.blockquote.borderColor.light}"
        },
        "borderColor": {
          "light": {
            "value": "{typography.color.secondary.200}"
          },
          "dark": {
            "value": "{typography.color.secondary.700}"
          }
        }
      },
      "ul": {
        "listStyleType": {
          "value": "disc"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "padding": {
          "value": "0 0 0 21px"
        },
        "li": {
          "markerColor": {
            "light": {
              "value": "{typography.color.secondary.300}"
            },
            "dark": {
              "value": "{typography.color.secondary.800}"
            }
          }
        }
      },
      "ol": {
        "listStyleType": {
          "value": "decimal"
        },
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "padding": {
          "value": "0 0 0 21px"
        },
        "li": {
          "markerColor": {
            "light": {
              "value": "{typography.color.secondary.500}"
            },
            "dark": {
              "value": "{typography.color.secondary.500}"
            }
          }
        }
      },
      "li": {
        "margin": {
          "value": "{typography.verticalMargin.sm} 0"
        },
        "listStylePosition": {
          "value": "outside"
        }
      },
      "hr": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "style": {
          "value": "solid"
        },
        "width": {
          "value": "1px"
        },
        "color": {
          "light": {
            "value": "{typography.color.secondary.200}"
          },
          "dark": {
            "value": "{typography.color.secondary.800}"
          }
        }
      },
      "table": {
        "margin": {
          "value": "{typography.verticalMargin.base} 0"
        },
        "textAlign": {
          "value": "left"
        },
        "fontSize": {
          "value": "{typography.fontSize.sm}"
        },
        "lineHeight": {
          "value": "inherit"
        }
      },
      "thead": {
        "border": {
          "value": "none"
        },
        "borderBottom": {
          "value": "1px solid {prose.thead.borderColor.light}"
        },
        "borderColor": {
          "light": {
            "value": "{typography.color.secondary.300}"
          },
          "dark": {
            "value": "{typography.color.secondary.600}"
          }
        }
      },
      "th": {
        "color": {
          "light": {
            "value": "{typography.color.secondary.600}"
          },
          "dark": {
            "value": "{typography.color.secondary.400}"
          }
        },
        "padding": {
          "value": "0 {typography.verticalMargin.sm} {typography.verticalMargin.sm} {typography.verticalMargin.sm}"
        },
        "fontWeight": {
          "value": "{typography.fontWeight.semibold}"
        }
      },
      "tbody": {
        "tr": {
          "borderBottom": {
            "value": "1px dashed {prose.tbody.tr.borderColor.light}"
          },
          "borderColor": {
            "light": {
              "value": "{typography.color.secondary.300}"
            },
            "dark": {
              "value": "{typography.color.secondary.700}"
            }
          }
        },
        "td": {
          "padding": {
            "value": "{typography.verticalMargin.sm}"
          }
        },
        "code": {
          "inline": {
            "fontSize": {
              "value": "{typography.fontSize.sm}"
            }
          }
        }
      },
      "code": {
        "block": {
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "margin": {
            "value": "{typography.verticalMargin.base} 0"
          },
          "borderColor": {
            "light": {
              "value": "{typography.color.secondary.200}"
            },
            "dark": {
              "value": "{typography.color.secondary.800}"
            }
          },
          "color": {
            "light": {
              "value": "{typography.color.secondary.700}"
            },
            "dark": {
              "value": "{typography.color.secondary.200}"
            }
          },
          "backgroundColor": {
            "light": {
              "value": "{typography.color.secondary.100}"
            },
            "dark": {
              "value": "{typography.color.secondary.900}"
            }
          },
          "pre": {
            "padding": {
              "value": "{typography.verticalMargin.sm}"
            }
          }
        },
        "inline": {
          "borderRadius": {
            "value": "0.375rem"
          },
          "padding": {
            "value": "0.25rem 0.375rem 0.25rem 0.375rem"
          },
          "fontSize": {
            "value": "{typography.fontSize.sm}"
          },
          "fontWeight": {
            "value": "{typography.fontWeight.normal}"
          },
          "color": {
            "light": {
              "value": "{typography.color.secondary.700}"
            },
            "dark": {
              "value": "{typography.color.secondary.200}"
            }
          },
          "backgroundColor": {
            "light": {
              "value": "{typography.color.secondary.100}"
            },
            "dark": {
              "value": "{typography.color.secondary.800}"
            }
          }
        }
      }
    },
    "docus": {
      "header": {
        "height": {
          "value": "64px"
        }
      },
      "footer": {
        "padding": {
          "value": "{space.4} 0"
        }
      },
      "readableLine": {
        "value": "78ch"
      }
    },
    "colors": {
      "primary": {
        "50": {
          "value": "#ffedcc"
        },
        "100": {
          "value": "#ffdd9f"
        },
        "200": {
          "value": "#ffcd71"
        },
        "300": {
          "value": "#ffbd44"
        },
        "400": {
          "value": "#ffad17"
        },
        "500": {
          "value": "orange"
        },
        "600": {
          "value": "#bb7900"
        },
        "700": {
          "value": "#8e5c00"
        },
        "800": {
          "value": "#603e00"
        },
        "900": {
          "value": "#332100"
        }
      }
    },
    "width": {
      "screen": {
        "value": "100vw"
      }
    },
    "height": {
      "screen": {
        "value": "100vh"
      }
    },
    "shadow": {
      "xs": {
        "value": "0px 1px 2px 0px #000000"
      },
      "sm": {
        "value": "0px 1px 3px 0px #000000, 0px 1px 2px -1px #000000"
      },
      "md": {
        "value": "0px 4px 6px -1px #000000, 0px 2px 4px -2px #000000"
      },
      "lg": {
        "value": "0px 10px 15px -3px #000000, 0px 4px 6px -4px #000000"
      },
      "xl": {
        "value": "0px 20px 25px -5px {color.gray.400}, 0px 8px 10px -6px #000000"
      },
      "2xl": {
        "value": "0px 25px 50px -12px {color.gray.900}"
      },
      "none": {
        "value": "0px 0px 0px 0px transparent"
      }
    },
    "radii": {
      "none": {
        "value": "0px",
        "description": "0px"
      },
      "2xs": {
        "value": "0.125rem",
        "description": "2px"
      },
      "xs": {
        "value": "0.25rem",
        "description": "4px"
      },
      "sm": {
        "value": "0.375rem",
        "description": "6px"
      },
      "md": {
        "value": "0.5rem",
        "description": "8px"
      },
      "lg": {
        "value": "0.75rem",
        "description": "12px"
      },
      "xl": {
        "value": "1rem",
        "description": "16px"
      },
      "2xl": {
        "value": "1.5rem",
        "description": "24px"
      },
      "3xl": {
        "value": "1.75rem",
        "description": "24px"
      },
      "full": {
        "value": "9999px",
        "description": "A very large value to handle every cases"
      }
    },
    "size": {
      "0": {
        "value": "0px"
      },
      "2": {
        "value": "2px"
      },
      "4": {
        "value": "4px"
      },
      "6": {
        "value": "6px"
      },
      "8": {
        "value": "8px"
      },
      "12": {
        "value": "12px"
      },
      "16": {
        "value": "16px"
      },
      "20": {
        "value": "20px"
      },
      "24": {
        "value": "24px"
      },
      "32": {
        "value": "32px"
      },
      "40": {
        "value": "40px"
      },
      "48": {
        "value": "48px"
      },
      "56": {
        "value": "56px"
      },
      "64": {
        "value": "64px"
      },
      "80": {
        "value": "80px"
      },
      "104": {
        "value": "104px"
      },
      "200": {
        "value": "200px"
      },
      "xs": {
        "value": "20rem"
      },
      "sm": {
        "value": "24rem"
      },
      "md": {
        "value": "28rem"
      },
      "lg": {
        "value": "32rem"
      },
      "xl": {
        "value": "36rem"
      },
      "2xl": {
        "value": "42rem"
      },
      "3xl": {
        "value": "48rem"
      },
      "4xl": {
        "value": "56rem"
      },
      "5xl": {
        "value": "64rem"
      },
      "6xl": {
        "value": "72rem"
      },
      "7xl": {
        "value": "80rem"
      },
      "full": {
        "value": "100%"
      }
    },
    "space": {
      "0": {
        "value": "0px"
      },
      "1": {
        "value": "0.25rem"
      },
      "2": {
        "value": "0.5rem"
      },
      "3": {
        "value": "0.75rem"
      },
      "4": {
        "value": "1rem"
      },
      "5": {
        "value": "1.25rem"
      },
      "6": {
        "value": "1.5rem"
      },
      "7": {
        "value": "1.75rem"
      },
      "8": {
        "value": "2rem"
      },
      "9": {
        "value": "2.25rem"
      },
      "10": {
        "value": "2.5rem"
      },
      "11": {
        "value": "2.75rem"
      },
      "12": {
        "value": "3rem"
      },
      "14": {
        "value": "3.5rem"
      },
      "16": {
        "value": "4rem"
      },
      "20": {
        "value": "5rem"
      },
      "24": {
        "value": "6rem"
      },
      "28": {
        "value": "7rem"
      },
      "32": {
        "value": "8rem"
      },
      "36": {
        "value": "9rem"
      },
      "40": {
        "value": "10rem"
      },
      "44": {
        "value": "11rem"
      },
      "48": {
        "value": "12rem"
      },
      "52": {
        "value": "13rem"
      },
      "56": {
        "value": "14rem"
      },
      "60": {
        "value": "15rem"
      },
      "64": {
        "value": "16rem"
      },
      "72": {
        "value": "18rem"
      },
      "80": {
        "value": "20rem"
      },
      "96": {
        "value": "24rem"
      },
      "px": {
        "value": "1px"
      },
      "rem": {
        "125": {
          "value": "0.125rem"
        },
        "375": {
          "value": "0.375rem"
        },
        "625": {
          "value": "0.625rem"
        },
        "875": {
          "value": "0.875rem"
        }
      }
    },
    "borderWidth": {
      "noBorder": {
        "value": "0"
      },
      "sm": {
        "value": "1px"
      },
      "md": {
        "value": "2px"
      },
      "lg": {
        "value": "3px"
      }
    },
    "opacity": {
      "noOpacity": {
        "value": "0",
        "type": "opacity"
      },
      "bright": {
        "value": "0.1",
        "type": "opacity"
      },
      "light": {
        "value": "0.15",
        "type": "opacity"
      },
      "soft": {
        "value": "0.3",
        "type": "opacity"
      },
      "medium": {
        "value": "0.5",
        "type": "opacity"
      },
      "high": {
        "value": "0.8",
        "type": "opacity"
      },
      "total": {
        "value": "1",
        "type": "opacity"
      }
    },
    "font": {
      "sans": {
        "value": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
      },
      "serif": {
        "value": "ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
      },
      "mono": {
        "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
      }
    },
    "fontWeight": {
      "thin": {
        "value": "100"
      },
      "extralight": {
        "value": "200"
      },
      "light": {
        "value": "300"
      },
      "normal": {
        "value": "400"
      },
      "medium": {
        "value": "500"
      },
      "semibold": {
        "value": "600"
      },
      "bold": {
        "value": "700"
      },
      "extrabold": {
        "value": "800"
      },
      "black": {
        "value": "900"
      }
    },
    "fontSize": {
      "xs": {
        "value": "0.75rem"
      },
      "sm": {
        "value": "0.875rem"
      },
      "base": {
        "value": "1rem"
      },
      "lg": {
        "value": "1.125rem"
      },
      "xl": {
        "value": "1.25rem"
      },
      "2xl": {
        "value": "1.5rem"
      },
      "3xl": {
        "value": "1.875rem"
      },
      "4xl": {
        "value": "2.25rem"
      },
      "5xl": {
        "value": "3rem"
      },
      "6xl": {
        "value": "3.75rem"
      },
      "7xl": {
        "value": "4.5rem"
      },
      "8xl": {
        "value": "6rem"
      },
      "9xl": {
        "value": "8rem"
      }
    },
    "letterSpacing": {
      "tighter": {
        "value": "-0.05em"
      },
      "tight": {
        "value": "-0.025em"
      },
      "normal": {
        "value": "0em"
      },
      "wide": {
        "value": "0.025em"
      },
      "wider": {
        "value": "0.05em"
      },
      "widest": {
        "value": "0.1em"
      }
    },
    "lead": {
      "1": {
        "value": ".025rem"
      },
      "2": {
        "value": ".5rem"
      },
      "3": {
        "value": ".75rem"
      },
      "4": {
        "value": "1rem"
      },
      "5": {
        "value": "1.25rem"
      },
      "6": {
        "value": "1.5rem"
      },
      "7": {
        "value": "1.75rem"
      },
      "8": {
        "value": "2rem"
      },
      "9": {
        "value": "2.25rem"
      },
      "10": {
        "value": "2.5rem"
      },
      "none": {
        "value": "1"
      },
      "tight": {
        "value": "1.25"
      },
      "snug": {
        "value": "1.375"
      },
      "normal": {
        "value": "1.5"
      },
      "relaxed": {
        "value": "1.625"
      },
      "loose": {
        "value": "2"
      }
    },
    "text": {
      "xs": {
        "fontSize": {
          "value": "{fontSize.xs}"
        },
        "lineHeight": {
          "value": "{lead.4}"
        }
      },
      "sm": {
        "fontSize": {
          "value": "{fontSize.sm}"
        },
        "lineHeight": {
          "value": "{lead.5}"
        }
      },
      "base": {
        "fontSize": {
          "value": "{fontSize.base}"
        },
        "lineHeight": {
          "value": "{lead.6}"
        }
      },
      "lg": {
        "fontSize": {
          "value": "{fontSize.lg}"
        },
        "lineHeight": {
          "value": "{lead.7}"
        }
      },
      "xl": {
        "fontSize": {
          "value": "{fontSize.xl}"
        },
        "lineHeight": {
          "value": "{lead.7}"
        }
      },
      "2xl": {
        "fontSize": {
          "value": "{fontSize.2xl}"
        },
        "lineHeight": {
          "value": "{lead.8}"
        }
      },
      "3xl": {
        "fontSize": {
          "value": "{fontSize.3xl}"
        },
        "lineHeight": {
          "value": "{lead.9}"
        }
      },
      "4xl": {
        "fontSize": {
          "value": "{fontSize.4xl}"
        },
        "lineHeight": {
          "value": "{lead.10}"
        }
      },
      "5xl": {
        "fontSize": {
          "value": "{fontSize.5xl}"
        },
        "lineHeight": {
          "value": "{lead.none}"
        }
      },
      "6xl": {
        "fontSize": {
          "value": "{fontSize.6xl}"
        },
        "lineHeight": {
          "value": "{lead.none}"
        }
      }
    },
    "media": {
      "xs": {
        "value": "(min-width: 475px)"
      },
      "sm": {
        "value": "(min-width: 640px)"
      },
      "md": {
        "value": "(min-width: 768px)"
      },
      "lg": {
        "value": "(min-width: 1024px)"
      },
      "xl": {
        "value": "(min-width: 1280px)"
      },
      "2xl": {
        "value": "(min-width: 1536px)"
      },
      "rm": {
        "value": "(prefers-reduced-motion: reduce)"
      },
      "landscape": {
        "value": "only screen and (orientation: landscape)"
      },
      "portrait": {
        "value": "only screen and (orientation: portrait)"
      }
    }
  }
};
const node_modules_pinceau_dist_runtime_schema_server_mjs_zIxGbBm233 = defineNuxtPlugin(() => {
  const event = useRequestEvent();
  if (event.path === "/__pinceau_tokens_config.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(theme, null, 2));
  }
  if (event.path === "/__pinceau_tokens_schema.json") {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 200;
    event.node.res.end(JSON.stringify(schema, null, 2));
  }
});
const preference = "system";
const componentName = "ColorScheme";
const dataValue = "theme";
const node_modules__64nuxtjs_color_mode_dist_runtime_plugin_server_mjs_XNCxeHyTuP = defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      {
        htmlAttrs[`data-${dataValue}`] = colorMode.value;
      }
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const node_modules__64nuxt_themes_docus_plugins_menu_ts_13PGuw7IWk = defineNuxtPlugin((ctx) => {
  const visible = ref(false);
  const open = () => visible.value = true;
  const close = () => visible.value = false;
  const toggle = () => visible.value = !visible.value;
  ctx.$router.afterEach(() => setTimeout(close, 50));
  return {
    provide: {
      menu: {
        visible,
        close,
        open,
        toggle
      }
    }
  };
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64nuxt_content_dist_runtime_plugins_documentDriven_mjs_9cX98v59ZY,
  node_modules__64nuxt_content_dist_runtime_plugins_ws_mjs_JuoSZH52OQ,
  node_modules__64nuxthq_studio_dist_runtime_plugins_app_config_server_mjs_3EJd2il4WQ,
  node_modules__64nuxthq_studio_dist_runtime_plugins_preview_detector_mjs_wuXocrN5Sn,
  _nuxt_pinceau_nuxt_plugin_server_mjs_KEuz79zT4K,
  node_modules_pinceau_dist_runtime_schema_server_mjs_zIxGbBm233,
  node_modules__64nuxtjs_color_mode_dist_runtime_plugin_server_mjs_XNCxeHyTuP,
  node_modules__64nuxt_themes_docus_plugins_menu_ts_13PGuw7IWk
];
const _sfc_main$g = {
  __name: "AppLoadingBar",
  __ssrInlineRender: true,
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    }
  },
  setup(__props) {
    const props = __props;
    const nuxtApp = useNuxtApp();
    const data = reactive({
      percent: 0,
      show: false,
      canSucceed: true
    });
    let _timer = null;
    let _throttle = null;
    let _cut;
    function clear() {
      _timer && clearInterval(_timer);
      _throttle && clearTimeout(_throttle);
      _timer = null;
    }
    function start() {
      if (data.show) {
        return;
      }
      clear();
      data.percent = 0;
      data.canSucceed = true;
      if (props.throttle) {
        _throttle = setTimeout(startTimer, props.throttle);
      } else {
        startTimer();
      }
    }
    function increase(num) {
      data.percent = Math.min(100, Math.floor(data.percent + num));
    }
    function finish() {
      data.percent = 100;
      hide();
    }
    function hide() {
      clear();
      setTimeout(() => {
        data.show = false;
        setTimeout(() => {
          data.percent = 0;
        }, 400);
      }, 500);
    }
    function startTimer() {
      data.show = true;
      _cut = 1e4 / Math.floor(props.duration);
      _timer = setInterval(() => {
        increase(_cut);
      }, 100);
    }
    nuxtApp.hook("content:middleware:start", start);
    nuxtApp.hook("page:start", start);
    nuxtApp.hook("page:finish", finish);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["nuxt-progress", {
          "nuxt-progress-failed": !unref(data).canSucceed
        }],
        style: {
          width: `${unref(data).percent}%`,
          left: unref(data).left,
          height: `${props.height}px`,
          opacity: unref(data).show ? 1 : 0,
          backgroundSize: `${100 / unref(data).percent * 100}% auto`
        }
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppLoadingBar.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const AppLoadingBar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Container",
  __ssrInlineRender: true,
  props: {
    as: {
      type: String,
      required: false,
      default: "div"
    },
    ...{ "padded": { "required": false, "type": [Boolean, Object], "default": true }, "fluid": { "required": false, "type": [Boolean, Object], "default": false } }
  },
  setup(__props) {
    const __$pProps = __props;
    const __$pVariants = ref({ "padded": { "true": { "px": "{elements.container.padding.mobile}", "@xs": { "px": "{elements.container.padding.xs}" }, "@sm": { "px": "{elements.container.padding.sm}" }, "@md": { "px": "{elements.container.padding.md}" } } }, "fluid": { "true": {}, "false": { "maxWidth": "{elements.container.maxWidth}" } } });
    const { $pinceau } = usePinceauRuntime(computed(() => __$pProps), __$pVariants, void 0);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as), mergeProps({
        class: ["container", [unref($pinceau)]]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/Container.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-43a7862c"]]);
const Container = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const nuxtApp = useNuxtApp();
    const nuxtIcon = useAppConfig().nuxtIcon;
    const state = useState("icons", () => ({}));
    const isFetching = ref(false);
    const iconName = computed(() => ((nuxtIcon == null ? void 0 : nuxtIcon.aliases) || {})[props.name] || props.name);
    const icon = computed(() => {
      var _a2;
      return (_a2 = state.value) == null ? void 0 : _a2[iconName.value];
    });
    const component = computed(() => nuxtApp.vueApp.component(iconName.value));
    const sSize = computed(() => {
      const size = props.size || (nuxtIcon == null ? void 0 : nuxtIcon.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    async function loadIconComponent() {
      var _a2;
      if (component.value) {
        return;
      }
      if (!((_a2 = state.value) == null ? void 0 : _a2[iconName.value])) {
        isFetching.value = true;
        state.value[iconName.value] = await loadIcon(iconName.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    watch(() => iconName.value, loadIconComponent);
    !component.value && ([__temp, __restore] = withAsyncContext(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isFetching)) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "icon",
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs))} data-v-047565da></span>`);
      } else if (unref(icon)) {
        _push(ssrRenderComponent(unref(Icon$1), mergeProps({
          icon: unref(icon),
          class: "icon",
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs), null, _parent));
      } else if (unref(component)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(component)), mergeProps({
          class: "icon",
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs), null), _parent);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "icon",
          style: { fontSize: unref(sSize), lineHeight: unref(sSize), width: unref(sSize), height: unref(sSize) }
        }, _attrs))} data-v-047565da>${ssrInterpolate(__props.name)}</span>`);
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icon/dist/runtime/Icon.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-047565da"]]);
const Icon = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$3
}, Symbol.toStringTag, { value: "Module" }));
const useDocus = () => computed(() => useAppConfig().docus);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "AppSocialIcons",
  __ssrInlineRender: true,
  setup(__props) {
    const socials = ["twitter", "facebook", "instagram", "youtube", "github", "medium"];
    const docus = useDocus();
    const icons = computed(() => {
      return Object.entries(docus.value.socials || {}).map(([key, value]) => {
        if (typeof value === "object") {
          return value;
        } else if (typeof value === "string" && value && socials.includes(key)) {
          return {
            href: `https://${key}.com/${value}`,
            icon: `fa-brands:${key}`,
            label: value
          };
        } else {
          return null;
        }
      }).filter(Boolean);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_Icon = __nuxt_component_0$3;
      _push(`<!--[-->`);
      ssrRenderList(unref(icons), (icon) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: icon.label,
          rel: "noopener noreferrer",
          title: icon.label,
          "aria-label": icon.label,
          href: icon.href,
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (icon.icon) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: icon.icon
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                icon.icon ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: icon.icon
                }, null, 8, ["name"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppSocialIcons.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-a04f4d62"]]);
const AppSocialIcons = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_3$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DocsAsideTree",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    parent: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    var _a2;
    const props = __props;
    const route = useRoute();
    const docus = useDocus();
    const collapsedMap = useState(`docus-docs-aside-collapse-map-${((_a2 = props.parent) == null ? void 0 : _a2._path) || "/"}`, () => {
      if (props.level === 0) {
        return {};
      }
      return props.links.filter((link) => !!link.children).reduce((map, link) => {
        map[link._path] = true;
        return map;
      }, {});
    });
    const isActive = (link) => {
      return route.path === link._path;
    };
    const isCollapsed = (link) => {
      var _a3, _b2;
      if (link.children) {
        if (typeof collapsedMap.value[link._path] !== "undefined") {
          return collapsedMap.value[link._path];
        }
        if (link == null ? void 0 : link.collapsed) {
          return link == null ? void 0 : link.collapsed;
        }
        if ((_a3 = docus.value.aside) == null ? void 0 : _a3.collapsed) {
          return (_b2 = docus.value.aside) == null ? void 0 : _b2.collapsed;
        }
      }
      return false;
    };
    const hasNesting = computed(() => props.links.some((link) => link.children));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$3;
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_DocsAsideTree = __nuxt_component_0$2;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "docs-aside-tree" }, _attrs))} data-v-1478bcff><!--[-->`);
      ssrRenderList(__props.links, (link) => {
        var _a3, _b2, _c2, _d2, _e;
        _push(`<li class="${ssrRenderClass({
          "has-parent-icon": (_a3 = __props.parent) == null ? void 0 : _a3.icon,
          "has-children": __props.level > 0 && link.children,
          "bordered": __props.level > 0 || !unref(hasNesting),
          "active": isActive(link)
        })}" data-v-1478bcff>`);
        if (link.children) {
          _push(`<button class="title-collapsible-button" data-v-1478bcff><span class="content" data-v-1478bcff>`);
          if (((_b2 = link == null ? void 0 : link.navigation) == null ? void 0 : _b2.icon) || link.icon) {
            _push(ssrRenderComponent(_component_Icon, {
              name: ((_c2 = link == null ? void 0 : link.navigation) == null ? void 0 : _c2.icon) || link.icon,
              class: "icon"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-1478bcff>${ssrInterpolate(((_d2 = link == null ? void 0 : link.navigation) == null ? void 0 : _d2.title) || link.title || link._path)}</span></span><span data-v-1478bcff>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: isCollapsed(link) ? "lucide:chevrons-up-down" : "lucide:chevrons-down-up",
            class: "collapsible-icon"
          }, null, _parent));
          _push(`</span></button>`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.redirect ? link.redirect : link._path,
            class: ["link", {
              "padded": __props.level > 0 || !unref(hasNesting),
              "active": isActive(link)
            }],
            exact: link.exact
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a4, _b3, _c3, _d3, _e2, _f;
              if (_push2) {
                _push2(`<span class="content" data-v-1478bcff${_scopeId}>`);
                if (((_a4 = link == null ? void 0 : link.navigation) == null ? void 0 : _a4.icon) || link.icon) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: ((_b3 = link == null ? void 0 : link.navigation) == null ? void 0 : _b3.icon) || link.icon,
                    class: "icon"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span data-v-1478bcff${_scopeId}>${ssrInterpolate(((_c3 = link == null ? void 0 : link.navigation) == null ? void 0 : _c3.title) || link.title || link._path)}</span></span>`);
              } else {
                return [
                  createVNode("span", { class: "content" }, [
                    ((_d3 = link == null ? void 0 : link.navigation) == null ? void 0 : _d3.icon) || link.icon ? (openBlock(), createBlock(_component_Icon, {
                      key: 0,
                      name: ((_e2 = link == null ? void 0 : link.navigation) == null ? void 0 : _e2.icon) || link.icon,
                      class: "icon"
                    }, null, 8, ["name"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(((_f = link == null ? void 0 : link.navigation) == null ? void 0 : _f.title) || link.title || link._path), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        if (((_e = link.children) == null ? void 0 : _e.length) && (__props.max === null || __props.level + 1 < __props.max)) {
          _push(ssrRenderComponent(_component_DocsAsideTree, {
            style: !isCollapsed(link) ? null : { display: "none" },
            links: link.children,
            level: __props.level + 1,
            parent: link,
            max: __props.max,
            class: "recursive"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/docs/DocsAsideTree.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-1478bcff"]]);
const DocsAsideTree = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$2
}, Symbol.toStringTag, { value: "Module" }));
const useMenu = () => {
  const { $menu } = useNuxtApp();
  return $menu;
};
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a2;
      if (mounted.value) {
        return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const cache = /* @__PURE__ */ new WeakMap();
function createClientOnly(component) {
  if (cache.has(component)) {
    return cache.get(component);
  }
  const clone = { ...component };
  if (clone.render) {
    clone.render = (ctx, ...args) => {
      var _a2;
      if (ctx.mounted$) {
        const res = component.render(ctx, ...args);
        return res.children === null || typeof res.children === "string" ? createElementVNode(res.type, res.props, res.children, res.patchFlag, res.dynamicProps, res.shapeFlag) : h(res);
      } else {
        return h("div", (_a2 = ctx.$attrs) != null ? _a2 : ctx._.attrs);
      }
    };
  } else if (clone.template) {
    clone.template = `
      <template v-if="mounted$">${component.template}</template>
      <template v-else><div></div></template>
    `;
  }
  clone.setup = (props, ctx) => {
    var _a2;
    const mounted$ = ref(false);
    return Promise.resolve(((_a2 = component.setup) == null ? void 0 : _a2.call(component, props, ctx)) || {}).then((setupState) => {
      return typeof setupState !== "function" ? { ...setupState, mounted$ } : (...args) => {
        if (mounted$.value) {
          const res = setupState(...args);
          return res.children === null || typeof res.children === "string" ? createElementVNode(res.type, res.props, res.children, res.patchFlag, res.dynamicProps, res.shapeFlag) : h(res);
        } else {
          return h("div", ctx.attrs);
        }
      };
    });
  };
  cache.set(component, clone);
  return clone;
}
const clientOnly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$1,
  createClientOnly
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  name: componentName,
  props: {
    placeholder: String,
    tag: {
      type: String,
      default: "span"
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_ClientOnly, mergeProps({
    placeholder: $props.placeholder,
    "placeholder-tag": $props.tag
  }, _attrs), null, _parent));
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$2]]);
const component_vue3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ThemeSelect",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ColorScheme = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$3;
      _push(`<button${ssrRenderAttrs(mergeProps({ "aria-label": "Color Mode" }, _attrs))} data-v-4a6c39b0>`);
      _push(ssrRenderComponent(_component_ColorScheme, { placeholder: "..." }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(colorMode).preference === "dark") {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:moon" }, null, _parent2, _scopeId));
            } else if (unref(colorMode).preference === "light") {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:sun" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, { name: "uil:desktop" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(colorMode).preference === "dark" ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "uil:moon"
              })) : unref(colorMode).preference === "light" ? (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "uil:sun"
              })) : (openBlock(), createBlock(_component_Icon, {
                key: 2,
                name: "uil:desktop"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/ThemeSelect.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-4a6c39b0"]]);
const ThemeSelect = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const { navigation } = useContent();
    const docus = useDocus();
    const filtered = computed(() => {
      var _a2;
      return ((_a2 = docus.value.aside) == null ? void 0 : _a2.exclude) || [];
    });
    const links = computed(() => {
      return (navigation.value || []).filter((item) => {
        if (filtered.value.includes(item._path)) {
          return false;
        }
        return true;
      });
    });
    const { visible, open, close } = useMenu();
    watch(visible, (v) => v ? open() : close());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$3;
      const _component_AppSocialIcons = __nuxt_component_3$1;
      const _component_DocsAsideTree = __nuxt_component_0$2;
      _push(`<!--[--><button aria-label="Menu" data-v-d5915f9a>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons-outline:menu",
        "aria-hidden": "\u201Dtrue\u201D"
      }, null, _parent));
      _push(`</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(visible)) {
          _push2(`<nav class="dialog" data-v-d5915f9a><div data-v-d5915f9a><div data-v-d5915f9a><button aria-label="Menu" data-v-d5915f9a>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons-outline:x",
            "aria-hidden": "\u201Dtrue\u201D"
          }, null, _parent));
          _push2(`</button><div class="icons" data-v-d5915f9a>`);
          _push2(ssrRenderComponent(__nuxt_component_5, null, null, _parent));
          _push2(ssrRenderComponent(_component_AppSocialIcons, null, null, _parent));
          _push2(`</div></div>`);
          _push2(ssrRenderComponent(_component_DocsAsideTree, { links: unref(links) }, null, _parent));
          _push2(`</div></nav>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeaderDialog.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-d5915f9a"]]);
const AppHeaderDialog = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 32 32"
  }, _attrs))}><path fill="currentColor" d="M26 18a3.995 3.995 0 0 0-3.858 3H18a3.003 3.003 0 0 1-3-3v-4a4.951 4.951 0 0 0-1.026-3h8.168a4 4 0 1 0 0-2H9.858a4 4 0 1 0 0 2H10a3.003 3.003 0 0 1 3 3v4a5.006 5.006 0 0 0 5 5h4.142A3.994 3.994 0 1 0 26 18Zm0-10a2 2 0 1 1-2 2a2.002 2.002 0 0 1 2-2ZM6 12a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm20 12a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2Z"></path></svg>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Logo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$1]]);
const Logo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderLogo",
  __ssrInlineRender: true,
  setup(__props) {
    const docus = useDocus();
    const logo = computed(() => {
      var _a2;
      return ((_a2 = docus.value.header) == null ? void 0 : _a2.logo) || false;
    });
    const title = computed(() => {
      var _a2;
      return ((_a2 = docus.value.header) == null ? void 0 : _a2.title) || docus.value.title;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_Logo = __nuxt_component_1$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "navbar-logo",
        to: "/",
        "aria-label": unref(title)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(logo) && typeof unref(logo) === "string") {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(logo)), null, null), _parent2, _scopeId);
            } else if (unref(logo)) {
              _push2(ssrRenderComponent(_component_Logo, null, null, _parent2, _scopeId));
            } else {
              _push2(`<span data-v-e6343474${_scopeId}>${ssrInterpolate(unref(title))}</span>`);
            }
          } else {
            return [
              unref(logo) && typeof unref(logo) === "string" ? (openBlock(), createBlock(resolveDynamicComponent(unref(logo)), { key: 0 })) : unref(logo) ? (openBlock(), createBlock(_component_Logo, { key: 1 })) : (openBlock(), createBlock("span", { key: 2 }, toDisplayString(unref(title)), 1))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeaderLogo.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-e6343474"]]);
const AppHeaderLogo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_2$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { navBottomLink: navBottomLink2 } = useContentHelpers();
    const { navigation } = useContent();
    const docus = useDocus();
    const hasNavigation = computed(() => {
      var _a2;
      return !!((_a2 = docus.value.aside) == null ? void 0 : _a2.level);
    });
    const filtered = computed(() => {
      var _a2;
      return ((_a2 = docus.value.header) == null ? void 0 : _a2.exclude) || [];
    });
    const tree = computed(() => {
      return (navigation.value || []).filter((item) => {
        if (filtered.value.includes(item._path)) {
          return false;
        }
        return true;
      });
    });
    const isActive = (link) => link.exact ? route.fullPath === link._path : route.fullPath.startsWith(link._path);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_Icon = __nuxt_component_0$3;
      if (unref(hasNavigation)) {
        _push(`<nav${ssrRenderAttrs(_attrs)} data-v-69787aa3><ul data-v-69787aa3><!--[-->`);
        ssrRenderList(unref(tree), (link) => {
          _push(`<li data-v-69787aa3>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: ["link", { active: isActive(link) }],
            to: link.redirect ? link.redirect : unref(navBottomLink2)(link)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (link.icon && unref(docus).header.showLinkIcon) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: link.icon
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(link.title)}`);
              } else {
                return [
                  link.icon && unref(docus).header.showLinkIcon ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: link.icon
                  }, null, 8, ["name"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(link.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeaderNavigation.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-69787aa3"]]);
const AppHeaderNavigation = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_3
}, Symbol.toStringTag, { value: "Module" }));
const useDocSearch = () => {
  const { $docSearch } = useNuxtApp();
  if (!$docSearch) {
    return {
      hasDocSearch: ref(false)
    };
  }
  return $docSearch;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AppSearch",
  __ssrInlineRender: true,
  setup(__props) {
    useDocSearch();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "doc-search" }, _attrs))} data-v-1e99f08b><button type="button" aria-label="Search" data-v-1e99f08b><span class="content" data-v-1e99f08b>`);
      _push(ssrRenderComponent(_component_Icon, { name: "heroicons-outline:search" }, null, _parent));
      _push(`<span data-v-1e99f08b>Search</span><span data-v-1e99f08b><kbd data-v-1e99f08b>\u2318</kbd><kbd data-v-1e99f08b>K</kbd></span></span></button></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppSearch.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-1e99f08b"]]);
const AppSearch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const docus = useDocus();
    const { navigation } = useContent();
    const { hasDocSearch } = useDocSearch();
    const hasDialog = computed(() => {
      var _a2;
      return ((_a2 = navigation.value) == null ? void 0 : _a2.length) > 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_Container = __nuxt_component_0$4;
      const _component_AppHeaderDialog = __nuxt_component_1$3;
      const _component_AppHeaderLogo = __nuxt_component_2$1;
      const _component_AppHeaderNavigation = __nuxt_component_3;
      const _component_AppSearch = __nuxt_component_4;
      const _component_ThemeSelect = __nuxt_component_5;
      const _component_AppSocialIcons = __nuxt_component_3$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: { "has-dialog": unref(hasDialog), "has-doc-search": unref(hasDocSearch) }
      }, _attrs))} data-v-5003bf9a>`);
      _push(ssrRenderComponent(_component_Container, {
        fluid: ((_b2 = (_a2 = unref(docus)) == null ? void 0 : _a2.layout) == null ? void 0 : _b2.fluid) || false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="section left" data-v-5003bf9a${_scopeId}>`);
            if (unref(hasDialog)) {
              _push2(ssrRenderComponent(_component_AppHeaderDialog, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppHeaderLogo, null, null, _parent2, _scopeId));
            _push2(`</div><div class="section center" data-v-5003bf9a${_scopeId}>`);
            if (unref(hasDialog)) {
              _push2(ssrRenderComponent(_component_AppHeaderLogo, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppHeaderNavigation, null, null, _parent2, _scopeId));
            _push2(`</div><div class="section right" data-v-5003bf9a${_scopeId}>`);
            if (unref(hasDocSearch)) {
              _push2(ssrRenderComponent(_component_AppSearch, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_ThemeSelect, null, null, _parent2, _scopeId));
            _push2(`<div class="social-icons" data-v-5003bf9a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppSocialIcons, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "section left" }, [
                unref(hasDialog) ? (openBlock(), createBlock(_component_AppHeaderDialog, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_AppHeaderLogo)
              ]),
              createVNode("div", { class: "section center" }, [
                unref(hasDialog) ? (openBlock(), createBlock(_component_AppHeaderLogo, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_AppHeaderNavigation)
              ]),
              createVNode("div", { class: "section right" }, [
                unref(hasDocSearch) ? (openBlock(), createBlock(_component_AppSearch, { key: 0 })) : createCommentVNode("", true),
                createVNode(_component_ThemeSelect),
                createVNode("div", { class: "social-icons" }, [
                  createVNode(_component_AppSocialIcons)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5003bf9a"]]);
const AppHeader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const docus = useDocus();
    const socialIcons = ref(null);
    const icons = computed(() => {
      var _a2, _b2;
      return ((_b2 = (_a2 = docus.value) == null ? void 0 : _a2.footer) == null ? void 0 : _b2.iconLinks) || [];
    });
    const textLinks = computed(() => {
      var _a2, _b2;
      return ((_b2 = (_a2 = docus.value) == null ? void 0 : _a2.footer) == null ? void 0 : _b2.textLinks) || [];
    });
    const socialIconsCount = computed(() => {
      var _a2;
      return Object.entries(((_a2 = docus.value) == null ? void 0 : _a2.socials) || {}).filter(([_, v]) => v).length;
    });
    const nbSocialIcons = computed(() => socialIcons.value ? socialIconsCount.value : 0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_Container = __nuxt_component_0$4;
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_Icon = __nuxt_component_0$3;
      const _component_AppSocialIcons = __nuxt_component_3$1;
      _push(`<footer${ssrRenderAttrs(_attrs)} data-v-78ab1914>`);
      _push(ssrRenderComponent(_component_Container, {
        fluid: (_b2 = (_a2 = unref(docus)) == null ? void 0 : _a2.layout) == null ? void 0 : _b2.fluid,
        padded: "",
        class: "footer-container"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
          if (_push2) {
            _push2(`<div class="left" data-v-78ab1914${_scopeId}>`);
            if ((_b3 = (_a3 = unref(docus)) == null ? void 0 : _a3.footer) == null ? void 0 : _b3.credits) {
              _push2(`<a${ssrRenderAttr("href", ((_e = (_d2 = (_c2 = unref(docus)) == null ? void 0 : _c2.footer) == null ? void 0 : _d2.credits) == null ? void 0 : _e.href) || "#")} rel="noopener" target="_blank" data-v-78ab1914${_scopeId}>`);
              if ((_h = (_g = (_f = unref(docus)) == null ? void 0 : _f.footer) == null ? void 0 : _g.credits) == null ? void 0 : _h.icon) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent((_k = (_j = (_i = unref(docus)) == null ? void 0 : _i.footer) == null ? void 0 : _j.credits) == null ? void 0 : _k.icon), { class: "left-icon" }, null), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if ((_n = (_m = (_l = unref(docus)) == null ? void 0 : _l.footer) == null ? void 0 : _m.credits) == null ? void 0 : _n.text) {
                _push2(`<p data-v-78ab1914${_scopeId}>${ssrInterpolate(unref(docus).footer.credits.text)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="center" data-v-78ab1914${_scopeId}><!--[-->`);
            ssrRenderList(unref(textLinks), (link) => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                key: link.href,
                class: "text-link",
                "aria-label": link.text,
                href: link.href,
                target: link.target || "_self"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(link.text)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(link.text), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="right" data-v-78ab1914${_scopeId}><!--[-->`);
            ssrRenderList(unref(icons).slice(0, 6 - unref(nbSocialIcons)), (icon) => {
              _push2(`<a class="icon-link" rel="noopener"${ssrRenderAttr("aria-label", icon.label)}${ssrRenderAttr("href", icon.href)} target="_blank" data-v-78ab1914${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: icon.icon || icon.component
              }, null, _parent2, _scopeId));
              _push2(`</a>`);
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_AppSocialIcons, {
              ref_key: "socialIcons",
              ref: socialIcons
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "left" }, [
                ((_p = (_o = unref(docus)) == null ? void 0 : _o.footer) == null ? void 0 : _p.credits) ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: ((_s = (_r = (_q = unref(docus)) == null ? void 0 : _q.footer) == null ? void 0 : _r.credits) == null ? void 0 : _s.href) || "#",
                  rel: "noopener",
                  target: "_blank"
                }, [
                  ((_v = (_u = (_t = unref(docus)) == null ? void 0 : _t.footer) == null ? void 0 : _u.credits) == null ? void 0 : _v.icon) ? (openBlock(), createBlock(resolveDynamicComponent((_y = (_x = (_w = unref(docus)) == null ? void 0 : _w.footer) == null ? void 0 : _x.credits) == null ? void 0 : _y.icon), {
                    key: 0,
                    class: "left-icon"
                  })) : createCommentVNode("", true),
                  ((_B = (_A = (_z = unref(docus)) == null ? void 0 : _z.footer) == null ? void 0 : _A.credits) == null ? void 0 : _B.text) ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(docus).footer.credits.text), 1)) : createCommentVNode("", true)
                ], 8, ["href"])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "center" }, [
                (openBlock(true), createBlock(Fragment$1, null, renderList(unref(textLinks), (link) => {
                  return openBlock(), createBlock(_component_NuxtLink, {
                    key: link.href,
                    class: "text-link",
                    "aria-label": link.text,
                    href: link.href,
                    target: link.target || "_self"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(link.text), 1)
                    ]),
                    _: 2
                  }, 1032, ["aria-label", "href", "target"]);
                }), 128))
              ]),
              createVNode("div", { class: "right" }, [
                (openBlock(true), createBlock(Fragment$1, null, renderList(unref(icons).slice(0, 6 - unref(nbSocialIcons)), (icon) => {
                  return openBlock(), createBlock("a", {
                    key: icon.label,
                    class: "icon-link",
                    rel: "noopener",
                    "aria-label": icon.label,
                    href: icon.href,
                    target: "_blank"
                  }, [
                    createVNode(_component_Icon, {
                      name: icon.icon || icon.component
                    }, null, 8, ["name"])
                  ], 8, ["aria-label", "href"]);
                }), 128)),
                createVNode(_component_AppSocialIcons, {
                  ref_key: "socialIcons",
                  ref: socialIcons
                }, null, 512)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-78ab1914"]]);
const AppFooter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_2
}, Symbol.toStringTag, { value: "Module" }));
const useContentHead = (_content, to = useRoute()) => {
  const content = unref(_content);
  const refreshHead = (data = content) => {
    if (!to.path || !data) {
      return;
    }
    const head = Object.assign({}, (data == null ? void 0 : data.head) || {});
    const title = head.title || (data == null ? void 0 : data.title);
    if (title) {
      head.title = title;
    }
    head.meta = [...head.meta || []];
    const description = (head == null ? void 0 : head.description) || (data == null ? void 0 : data.description);
    if (description && head.meta.filter((m) => m.name === "description").length === 0) {
      head.meta.push({
        name: "description",
        content: description
      });
    }
    const image = (head == null ? void 0 : head.image) || (data == null ? void 0 : data.image);
    if (image && head.meta.filter((m) => m.property === "og:image").length === 0) {
      if (typeof image === "string") {
        head.meta.push({
          property: "og:image",
          content: image
        });
      }
      if (typeof image === "object") {
        const imageKeys = [
          "src",
          "secure_url",
          "type",
          "width",
          "height",
          "alt"
        ];
        for (const key of imageKeys) {
          if (key === "src" && image.src) {
            head.meta.push({
              property: "og:image",
              content: image[key]
            });
          } else if (image[key]) {
            head.meta.push({
              property: `og:image:${key}`,
              content: image[key]
            });
          }
        }
      }
    }
    {
      useHead(head);
    }
  };
  watch(() => unref(_content), refreshHead, { immediate: true });
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    padded: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const docus = useDocus();
    const { navigation, page: page2 } = useContent();
    const { navKeyFromPath: navKeyFromPath2 } = useContentHelpers();
    const titleTemplate = computed(() => {
      var _a2, _b2;
      const appTitleTemplate = ((_a2 = docus.value.head) == null ? void 0 : _a2.titleTemplate) || `%s \xB7 ${docus.value.title}`;
      if (page2.value) {
        return ((_b2 = page2.value.head) == null ? void 0 : _b2.titleTemplate) || navKeyFromPath2(page2.value._path, "titleTemplate", navigation.value || []) || appTitleTemplate;
      }
      return appTitleTemplate;
    });
    useHead({
      titleTemplate: titleTemplate.value,
      meta: [
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    watch(titleTemplate, () => {
      useHead({ titleTemplate: titleTemplate.value });
    });
    useContentHead(docus.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLoadingBar = _sfc_main$g;
      const _component_AppHeader = __nuxt_component_1$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AppLoadingBar, null, null, _parent));
      if (unref(docus).header) {
        _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (unref(docus).footer) {
        _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/components/app/AppLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a2;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a3;
    return ((_a3 = m.components) == null ? void 0 : _a3.default) === routeProps.Component.type;
  });
  const source = (_a2 = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a2 : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a2, _b2, _c2, _d2;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b2 = (_a2 = props.transition) != null ? _a2 : routeProps.route.meta.pageTransition) != null ? _b2 : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d2 = (_c2 = props.keepalive) != null ? _c2 : routeProps.route.meta.keepalive) != null ? _d2 : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppLayout = _sfc_main$2;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_AppLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/docus/app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./error-component.2d4c5ee0.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { AppHeaderNavigation as $, _wrapIf as A, useCookie as B, callWithNuxt as C, updateAppConfig as D, refreshNuxtData as E, useRequestEvent as F, get$1 as G, assertArray as H, ensureArray as I, sortList as J, apply as K, withoutKeys as L, withKeys as M, createQuery as N, nuxtLink as O, AppLoadingBar as P, Container as Q, Icon as R, AppSocialIcons as S, DocsAsideTree as T, clientOnly as U, component_vue3 as V, ThemeSelect as W, AppHeaderDialog as X, Logo as Y, AppHeaderLogo as Z, _export_sfc as _, usePinceauRuntime as a, AppSearch as a0, AppHeader as a1, AppFooter as a2, AppLayout as a3, page as a4, __nuxt_component_0$5 as b, computedStyle as c, __nuxt_component_0$3 as d, entry$1 as default, useUnwrap as e, useContent as f, useDocus as g, useRoute as h, useContentHelpers as i, __nuxt_component_0$2 as j, useAppConfig as k, useState as l, __nuxt_component_0$4 as m, useRouter as n, useAsyncData as o, useColorMode as p, useNuxtApp as q, usePinceauTheme as r, useContentHead as s, queryContent as t, utils$1 as u, useRuntimeConfig as v, useHead as w, fetchContentNavigation as x, layouts as y, appLayoutTransition as z };
//# sourceMappingURL=server.mjs.map
