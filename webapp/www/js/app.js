(function () {
    angular.module('portalApp', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // LazyLoad Plugin
    ])
})();

// Other libraries are loaded dynamically in the config.js