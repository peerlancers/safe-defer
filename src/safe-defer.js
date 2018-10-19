var safeDefer = {
  srcDeferAttribute: "data-safe-defer-src",
  styleDeferAttribute: "data-safe-defer-style",
  classDeferAttribute: "data-safe-defer-class",
  srcBackingAttribute: "data-safe-deferred-src",
  imagePlaceholder: "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
  debugMode: false,

  deferAll: function() {
    this.deferSources();
    this.deferClasses();
    this.deferStyles();
  },

  deferSources: function() {
    // Find all elements that requires src attribute to be deferred
    var selector =  "*[" + this.srcDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var originalSource = element.getAttribute("src");
      if (this.debugMode) {
        console.log("Deferring Source: " + originalSource);
      }
      // Only defer sources that aren't loaded yet
      var notFullyLoaded = !element.complete;
      if (notFullyLoaded) {
        // Move original src to back-up attribute and use a placeholder on src
        element.setAttribute(this.srcBackingAttribute, originalSource);
        element.setAttribute("src", this.imagePlaceholder);
      }
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(this.srcDeferAttribute);
    }
  },

  deferClasses: function() {
    // Find all elements that requires src attribute to be deferred
    var selector =  "*[" + this.classDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredClasses = element.getAttribute(this.classDeferAttribute);
      var deferredClassesList = deferredClasses.split(" ");

      deferredClassesList.forEach(function(value) {
        if (this.debugMode) {
          console.log("Deferring Class: " + value);
        }

        element.classList.remove(value);
      });
    }
  },

  deferStyles: function() {
    // Find all elements that requires style attribute to be deferred
    var selector =  "*[" + this.styleDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var orignalStyle = element.getAttribute("style");
      if (this.debugMode) {
        console.log("Deferring Style: " + orignalStyle);
      }
      // Move original style to back-up attribute and remove current style
      element.setAttribute(this.styleDeferAttribute, orignalStyle);
      element.setAttribute("style", "");
    }
  },

  loadAllDeferred: function() {
    this.loadDeferredClasses();
    this.loadDeferredSources();
    this.loadDeferredStyles();
  },

  loadDeferredSources: function() {
    // Find all elements that has deferred src attribute
    var selector =  "*[" + this.srcBackingAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredSource = element.getAttribute(this.srcBackingAttribute);
      if (this.debugMode) {
        console.log("Loading Source: " + deferredSource);
      }
      // Apply the defered source
      element.setAttribute("src", deferredSource);
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(this.srcBackingAttribute);
    }
  },

  loadDeferredClasses: function() {
    // Find all elements that has deferred class attribute
    var selector =  "*[" + this.classDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredClasses = element.getAttribute(this.classDeferAttribute);
      var deferredClassesList = deferredClasses.split(" ");

      deferredClassesList.forEach(function(value) {
        if (this.debugMode) {
          console.log("Appending Class: " + value);
        }
        element.classList.add(value);
      });

      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(this.classDeferAttribute);
    }
  },

  loadDeferredStyles: function() {
    // Find all elements that has deferred style attribute
    var selector =  "*[" + this.styleDeferAttribute + "]";
    var elements = document.querySelectorAll(selector);

    // Iterate each element
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var deferredStyle = element.getAttribute(this.styleDeferAttribute);
      if (this.debugMode) {
        console.log("Setting Style: " + deferredStyle);
      }
      // Apply the deferred style
      element.setAttribute("style", deferredStyle);
      // Clean up the DOM, we no longer need this attribute
      element.removeAttribute(this.styleDeferAttribute);
    }
  }
};

window.addEventListener("load", function () {
  if (safeDefer.debugMode) {
    console.log("Page load complete!");
  }
  safeDefer.loadAllDeferred();
}, false);
