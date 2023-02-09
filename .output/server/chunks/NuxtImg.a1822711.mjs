import { defineComponent, computed, h, useSSRContext } from 'vue';
import { o as useRuntimeConfig } from './server.mjs';
import { withBase } from 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
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

const _sfc_main = defineComponent({
  props: {
    src: {
      type: [String, Object],
      default: null
    }
  },
  setup(props) {
    const srcWithBase = (src) => {
      if (src && src.startsWith("/") && !src.startsWith("//")) {
        return withBase(src, useRuntimeConfig().app.baseURL);
      }
      return src;
    };
    const imgSrc = computed(() => {
      let src = props.src;
      try {
        src = JSON.parse(src);
      } catch (e) {
        src = props.src;
      }
      if (typeof src === "string") {
        return srcWithBase(props.src);
      }
      return {
        light: srcWithBase(src.light),
        dark: srcWithBase(src.dark)
      };
    });
    return {
      imgSrc
    };
  },
  render({ imgSrc }) {
    if (typeof imgSrc === "string") {
      return h("img", { src: imgSrc, ...this.$attrs });
    }
    const nodes = [];
    if (imgSrc.light) {
      nodes.push(h("img", { src: imgSrc.light, class: ["dark-img"], ...this.$attrs }));
    }
    if (imgSrc.dark) {
      nodes.push(h("img", { src: imgSrc.dark, class: ["light-img"], ...this.$attrs }));
    }
    return nodes;
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/NuxtImg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=NuxtImg.a1822711.mjs.map
