OverlayWidget
=============

#Features
*Add overlay functionality to links
*Can load remote files
*Will ignore functionality based on width of screen

#Sample

Place this before the closing `<body>` tag
```
<div id="overlay-container">
  <div class="close-wrap">
  	<a href="#" class="close"></a>
  </div>
  <div class="overlay-wrap"></div>
</div>	

<div id="exposeMask"></div>
```


Use this to trigger overlay with links
```
<a href="external-url1.html" class="overlay" rel="#overlay-container"></a>
<a href="external-url2.html" class="overlay" rel="#overlay-container"></a>
```

#Options
**Links**
```
<a href="your_link" class="overlay" rel="#overlay-container"></a>
```
*href* | Link to the page you want to load

**Body**
```
<body data-min-overlay-width="900"></body>
```
*data-min-overlay-width* | minimum width of screen to use this functionality

**Placing other divs above the overlay**
*z-index* >= 10001