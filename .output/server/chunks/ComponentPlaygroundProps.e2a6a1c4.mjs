import __nuxt_component_0 from './ProseH4.53766126.mjs';
import __nuxt_component_1$1 from './ProseCodeInline.c5c395f1.mjs';
import __nuxt_component_2 from './Badge.d135f4e4.mjs';
import __nuxt_component_3 from './ProseP.8c46058e.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as useVModel } from './index.0f8cfee8.mjs';
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
import 'node:fs';
import 'pathe';
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
import './ContentSlot.9840f63c.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ComponentPlaygroundProps",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    componentData: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const formData = useVModel(props, "modelValue", emits);
    const componentProps = computed(() => {
      var _a, _b;
      return (_b = (_a = props == null ? void 0 : props.componentData) == null ? void 0 : _a.meta) == null ? void 0 : _b.props;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProseH4 = __nuxt_component_0;
      const _component_ProseCodeInline = __nuxt_component_1$1;
      const _component_Badge = __nuxt_component_2;
      const _component_ProseP = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "component-playground-data-section" }, _attrs))} data-v-acf5a6ce><!--[-->`);
      ssrRenderList(unref(componentProps), (prop) => {
        _push(`<div data-v-acf5a6ce><div${ssrRenderAttr("id", prop.name)} class="prop-title" data-v-acf5a6ce>`);
        _push(ssrRenderComponent(_component_ProseH4, {
          id: prop.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(prop.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(prop.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span data-v-acf5a6ce>`);
        _push(ssrRenderComponent(_component_ProseCodeInline, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(prop.type)}`);
            } else {
              return [
                createTextVNode(toDisplayString(prop.type), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (!prop.required) {
          _push(ssrRenderComponent(_component_Badge, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Required `);
              } else {
                return [
                  createTextVNode(" Required ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</span></div>`);
        if (prop.description) {
          _push(ssrRenderComponent(_component_ProseP, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(prop.description)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(prop.description), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<input${ssrRenderAttr("value", unref(formData)[prop.name])} data-v-acf5a6ce></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt-themes/elements/components/meta/ComponentPlaygroundProps.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-acf5a6ce"]]);

export { __nuxt_component_1 as default };
//# sourceMappingURL=ComponentPlaygroundProps.e2a6a1c4.mjs.map
