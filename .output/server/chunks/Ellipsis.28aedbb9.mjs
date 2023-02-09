import { useSSRContext, defineComponent, computed, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, u as utils$1, a as usePinceauRuntime } from './server.mjs';
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
  __name: "Ellipsis",
  __ssrInlineRender: true,
  props: {
    width: {
      type: String,
      default: "10rem"
    },
    height: {
      type: String,
      default: "10rem"
    },
    zIndex: {
      type: String,
      default: "10"
    },
    top: {
      type: String,
      default: "0"
    },
    left: {
      type: String,
      default: "auto"
    },
    right: {
      type: String,
      default: "auto"
    },
    blur: {
      type: String,
      default: "50px"
    },
    colors: {
      type: Array,
      default: () => ["rgba(0, 71, 225, 0.22)", "rgba(26, 214, 255, 0.22)", "rgba(0, 220, 130, 0.22)"]
    }
  },
  setup(__props) {
    const __$pProps = __props;
    const _6HG_top = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.top)());
    const _31J_left = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.left)());
    const _n9M_right = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.right)());
    const _s6J_zIndex = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.zIndex)());
    const _5M0_maxWidth = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.width)());
    const _KGs_height = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => props.height)());
    const _GxB_filter = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => `blur(${props.blur})`)());
    const _618_background = computed(() => ((props = __$pProps, utils$1$1 = utils$1) => {
      var _a, _b, _c;
      return `linear-gradient(97.62deg, ${(_a = props == null ? void 0 : props.colors) == null ? void 0 : _a[0]} 2.27%, ${(_b = props == null ? void 0 : props.colors) == null ? void 0 : _b[1]} 50.88%, ${(_c = props == null ? void 0 : props.colors) == null ? void 0 : _c[2]} 98.48%)`;
    })());
    const { $pinceau } = usePinceauRuntime(computed(() => __$pProps), void 0, ref({ _6HG_top, _31J_left, _n9M_right, _s6J_zIndex, _5M0_maxWidth, _KGs_height, _GxB_filter, _618_background }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["ellipsis", [unref($pinceau)]]
      }, _attrs))} data-v-b9bd96ba><div class="ellipsis-item" data-v-b9bd96ba></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/globals/Ellipsis.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Ellipsis = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9bd96ba"]]);

export { Ellipsis as default };
//# sourceMappingURL=Ellipsis.28aedbb9.mjs.map
