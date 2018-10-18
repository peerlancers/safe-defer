var safeDefer = {
  srcDeferAttribute: "data-safe-defer-src",
  styleDeferAttribute: "data-safe-defer-style",
  classDeferAttribute: "data-safe-defer-class",
  srcBackingAttribute: "data-safe-deferred-src",
  imagePlaceholder: "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
  debugMode: false,

  deferAll: function() {
    safeDefer.deferSources();
    safeDefer.deferClasses();
    safeDefer.deferStyles();
  },

  deferSources: function() {
    // Find all elements that requires src attribute to be deferred
    var selector =  "*[" + safeDefer.srcDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var originalSource = element.getAttribute("src");
      if (safeDefer.debugMode) {
        console.log("Deferring Source: " + originalSource);
      }
      // Only defer sources that aren't loaded yet
      var notFullyLoaded = !element.complete;
      if (notFullyLoaded) {
        // Move original src to back-up attribute and use a placeholder on src
        element.setAttribute(safeDefer.srcBackingAttribute, originalSource);
        element.setAttribute("src", safeDefer.imagePlaceholder);
      }
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(safeDefer.srcDeferAttribute);
    }
  },

  deferClasses: function() {
    // Find all elements that requires src attribute to be deferred
    var selector =  "*[" + safeDefer.classDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredClasses = element.getAttribute(safeDefer.classDeferAttribute);
      var deferredClassesList = deferredClasses.split(" ");

      deferredClassesList.forEach(function(value) {
        if (safeDefer.debugMode) {
          console.log("Deferring Source: " + value);
        }

        element.classList.remove(value);
      });
    }
  },

  deferStyles: function() {
    // Find all elements that requires style attribute to be deferred
    var selector =  "*[" + safeDefer.styleDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var orignalStyle = element.getAttribute("style");
      if (safeDefer.debugMode) {
        console.log("Deferring Style: " + orignalStyle);
      }
      // Move original style to back-up attribute and remove current style
      element.setAttribute(safeDefer.styleDeferAttribute, orignalStyle);
      element.setAttribute("style", "");
    }
  },

  loadAllDeferred: function() {
    safeDefer.loadDeferredClasses();
    safeDefer.loadDeferredSources();
    safeDefer.loadDeferredStyles();
  },

  loadDeferredSources: function() {
    // Find all elements that has deferred src attribute
    var selector =  "*[" + safeDefer.srcBackingAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredSource = element.getAttribute(safeDefer.srcBackingAttribute);
      if (safeDefer.debugMode) {
        console.log("Loading Source: " + deferredSource);
      }
      // Apply the defered source
      element.setAttribute("src", deferredSource);
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(safeDefer.srcBackingAttribute);
    }
  },

  loadDeferredClasses: function() {
    // Find all elements that has deferred class attribute
    var selector =  "*[" + safeDefer.classDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredClasses = element.getAttribute(safeDefer.classDeferAttribute);
      var deferredClassesList = deferredClasses.split(" ");

      deferredClassesList.forEach(function(value) {
        if (safeDefer.debugMode) {
          console.log("Appending Class: " + value);
        }
        element.classList.add(value);
      });

      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(safeDefer.classDeferAttribute);
    }
  },

  loadDeferredStyles: function() {
    // Find all elements that has deferred style attribute
    var selector =  "*[" + safeDefer.styleDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredStyle = element.getAttribute(safeDefer.styleDeferAttribute);
      if (safeDefer.debugMode) {
        console.log("Setting Style: " + deferredStyle);
      }
      // Apply the deferred style
      element.setAttribute("style", deferredStyle);
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(safeDefer.styleDeferAttribute);
    }
  }
};

(function() {
  if (safeDefer.debugMode) {
    console.log("DOM is available!");
  }
  safeDefer.deferAll();
})();

window.addEventListener("load", function () {
  if (safeDefer.debugMode) {
    console.log("Page load complete!");
  }
  safeDefer.loadAllDeferred();
}, false);
