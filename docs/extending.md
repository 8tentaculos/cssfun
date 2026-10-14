# Extending

`StyleSheet` can be customized through its options, or by subclassing it.

## Renderers

Renderers are functions that transform style objects into CSS strings. They are applied in sequence, with each renderer receiving the output of the previous one.

**CSSFUN** uses two built-in renderers by default:
1. **`parseStyles`**: Transforms the style object (expands nested selectors, replaces class references, converts camelCase to dashed-case, handles global styles)
2. **`renderStyles`**: Converts the processed object into a CSS string

The final renderer in the chain outputs the CSS string that gets injected into the DOM.

The transformations `parseStyles` applies are described in [Style syntax](./styles.md#style-syntax).

**Example flow:**
```
Input styles object
    ↓
[parseStyles] → Transforms object (expands nested, replaces references, converts camelCase)
    ↓
[renderStyles] → Converts object to CSS string
    ↓
Output CSS string
```

### Custom renderers

You can customize the renderers via [`options.renderers`](./api.md#new-stylesheetstyles-options) (or by setting `renderers` on a [`StyleSheet`](./api.md#stylesheet) subclass).

Elements in the `renderers` array can be either functions or strings that reference methods of the [`StyleSheet`](./api.md#stylesheet) instance. Method-name strings are looked up on the instance when the styles are rendered. Every renderer is called with the instance as `this`.

Renderers are applied in array order, each receiving the previous one's output. By default, [`StyleSheet`](./api.md#stylesheet) instances use `[this.parseStyles, this.renderStyles]`: `parseStyles` runs first (transforms the object), then `renderStyles` (converts it to the CSS string).

`renderers` may also be given as a function that returns the array, resolved by `render` on every call.

## Subclassing & dynamic values

Declare `prefix`, `attributes` and `renderers` as **getters** on a subclass. A getter lives on the prototype, so it is in place before the constructor runs, and TypeScript accepts it.

```javascript
class ScopedStyleSheet extends StyleSheet {
    static prefix = 'app';

    get attributes() {
        return { 'data-scope' : 'app' };
    }
}
```

`prefix` is a plain string. Its default lives in the static `prefix` of the class; `options.prefix` overrides it per instance. For a prefix that depends on runtime state, the getter is read while the instance is created:

```javascript
class TenantStyleSheet extends StyleSheet {
    get prefix() {
        return resolveTenant();
    }
}
```

`attributes` and `renderers` are also accepted as a value or as a **function** returning the value, both as options and as members. Both are resolved every time they are read — `attributes` on each render, `renderers` on each `render()` call.

In plain JavaScript a method is equivalent to the function form — `attributes() { return { … }; }` — because a function-valued member is called when it is resolved. TypeScript rejects a method that overrides a declared property, so a subclass written in TypeScript uses a getter.

Matching options still take precedence over a getter (or over a value set in `preinitialize`): they are defined as own properties on the instance, which shadows the accessor.

The constructor reads `prefix` to generate the `uid` and the class names, so an instance class field does not work for it — fields are assigned after `super()` returns. A field on `attributes` or `renderers` also replaces a matching option rather than being overridden by it. Use a getter when the option should be able to override.

For subclasses, the `preinitialize` method runs at the very start of the constructor — before the options are applied and before the class names are generated. It is the only place where `options` can be read that early, so use it to derive instance properties from custom options.

Instances are added to the `registry` of their own class, and the static `toString`, `toCSS` and `destroy` read the registry of the class they are called on. A subclass shares `StyleSheet.registry` by default; declare its own to keep its stylesheets apart, for example to render them separately on the server:

```javascript
class WidgetStyleSheet extends StyleSheet {
    static prefix = 'widget';
    static registry = [];
}

WidgetStyleSheet.toString(); // only the widget stylesheets
StyleSheet.toString();       // everything else
```

See [Content Security Policy (CSP)](./ssr.md#content-security-policy-csp) for a real-world example.
