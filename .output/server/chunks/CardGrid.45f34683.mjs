import ContentSlot from './ContentSlot.355b3abd.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CardGrid",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Features"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentSlot = ContentSlot;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card-grid" }, _attrs))} data-v-8f7bcfd2>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.root
      }, null, _parent));
      _push(`<h2 class="title" data-v-8f7bcfd2>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.title,
        unwrap: "p"
      }, null, _parent));
      _push(`</h2><div class="layout" data-v-8f7bcfd2>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/landing/CardGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CardGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f7bcfd2"]]);

export { CardGrid as default };
//# sourceMappingURL=CardGrid.45f34683.mjs.map
