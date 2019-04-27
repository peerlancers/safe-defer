# safe-defer.js

`safe-defer.js` is a simple, SEO friendly, pure Javascript library for deferring image loading, class appending, and applying styles. Its aim is to be a middle ground for achieving improved page load performance and SEO compliance.
### SEO friendly
Although in theory, crawlers execute scripts so they will see the replaced images. This approach allows SEO crawlers to locate and index your images without the need for javascript to run.

before defer process
```html
<img src="my-image.png" data-safe-defer-src/>
```
during defer process (starts when DOM is ready)
```html
<img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    data-safe-deferred-src="my-image.png"/>
```
after defer process
```html
<img src="my-image.png" />
```
### Defer CSS Classes
Although CSS `class` would rarely include definition for images and icons they can also be deferred using this library.

before defer process
```html
<div class="my-custom-icon left-arrow-icon" data-safe-defer-class="left-arrow-icon"/>
```
during defer process (starts when DOM is ready)
```html
<div class="my-custom-icon" data-safe-defer-class="left-arrow-icon"/>
```
after defer process
```html
<img class="my-custom-icon left-arrow-icon" />
```
### Safe-Defer Inline Styles
In-case you need to use inline style with your `background-image` you can also safely defer them.

before defer process
```html
<div style="background-image: url('/images/my-wallpaper.png');" data-safe-defer-style/>
```
during defer process (starts when DOM is ready)
```html
<div style="" data-safe-defer-style="background-image: url('/images/my-wallpaper.png');" />
```
after defer process
```html
<div style="background-image: url('/images/my-wallpaper.png');"/>
```
### IDE friendly
Since we don't use image placeholders by default, you can still see your images while designing your HTML pages.

## Usage

Add the library just before the HTML body closing tag
  ```html
  <html>
    <head>
        // meta stuff
    </head>
    <body>
        // DOM stuff
        // More DOM stuff
        <script type="text/javascript" src="safe-defer.min.js"></script>
        <script>
            (function() {
                safeDefer.deferAll();
            })();
        </script>
        // other cool scripts & stylesheet references
    </body>
  </html>
  ```
## Configurations

Settings must be customized before calling `safeDefer.deferAll();` if you want to override the default configuration.
```html
<script>
    (function() {
        safeDefer.debugMode = true;
        safeDefer.imagePlaceholder = "placeholder.jpg";
        safeDefer.srcDeferAttribute = "data-defer-my-src";
        safeDefer.styleDeferAttribute = "data-defer-my-style";
        safeDefer.classDeferAttribute = "data-defer-this-class";
        safeDefer.deferAll();
    })();
</script>
  ```
`debugMode` (boolean) - enables trace logs in console, defaults to `false`

`imagePlaceholder` (string) - placeholder used during image swaps, it can be an image path or base64, dafaults to `data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`

`srcDeferAttribute` (string) - HTML attribute flag used for deferring sources, defaults to `data-safe-defer-src`

`styleDeferAttribute` (string) - HTML attribute flag used for deferring styles, defaults to `data-safe-defer-style`

`classDeferAttribute` (string) - HTML attribute flag used for deferring classes, defaults to `data-safe-defer-class`

It's also possible to customize your deferring process via these functions:
`deferSources`, `deferClasses`, `deferStyles` instead of calling `deferAll`.


## Capabilities

### Defer a `src`
Add the `data-safe-defer-src` attribute to an `img` element to defer the source.
```html
<img src="my-image.png" data-safe-defer-src/>
```
Disclaimer: `data-safe-defer-src` would work on any HTML element that has `src` attribute however it was only tested on image tags.

### Defer a `class`
Place the class to be deferred in the `data-safe-defer-class` attribute.
```html
<div class="my-custom-icon left-arrow-icon" data-safe-defer-class="left-arrow-icon"/>
```
### Defer a `style`
Add the `data-safe-defer-style` attribute to any HTML element where you want the style to be deferred.
```html
<div style="background-image: url('/images/my-wallpaper.png');" data-safe-defer-style/>
```
WARNING: This will defer everything inside the `style` attribute of the element.

## Browser Support

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![IE][ie-image] | ![Opera][opera-image] | ![Safari][safari-image]
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | 6.1+ ✔ |

## License
[MIT](https://github.com/philip-badilla/safe-defer/blob/master/LICENSE)

[chrome-image]: https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[firefox-image]: https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[ie-image]: https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[opera-image]: https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[safari-image]: https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png