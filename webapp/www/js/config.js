function config($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // General Routing
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { bg: "img/loginbg.jpg", pageTitle: 'Login', specialClass: "gray-bg bg-coms" },
            resolve: { authenticateSession : authenticateSession }
        })

        .state('/', {
            url: "/",
            data: { bg: "img/loginbg.jpg", pageTitle: 'Login', specialClass: "gray-bg bg-coms" },
            resolve: { authenticateSession : authenticateSession }
        })

        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "views/common/content.html"
        })

        .state('home.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard-alt.html",
            data: { bg: "",pageTitle: 'Home', specialClass: "fixed-nav colour2", otherBodyTags: 'data-gr-c-s-loaded="true"' },
            resolve: { authenticateSession : authenticateSession }
        })

        .state('myAccount', {
            abstract: true,
            url: "/my-account",
            templateUrl: "views/common/content.html"
        })

        .state('myAccount.powerball', {
            url: "/powerball",
            templateUrl: "views/powerball.html",
            data: { bg: "",pageTitle: 'Powerball', specialClass: "fixed-nav colour2", otherBodyTags: 'data-gr-c-s-loaded="true"' },
            resolve: { authenticateSession : authenticateSession }
        })
        
        .state('myAccount.surf-lifesavers', {
            url: "/surf-lifesavers",
            templateUrl: "views/surf-lifesavers.html",
            data: { bg: "",pageTitle: 'Surf Lifesavers', specialClass: "fixed-nav colour2", otherBodyTags: 'data-gr-c-s-loaded="true"' },
            resolve: { authenticateSession : authenticateSession }
        })

        .state('myAccount.saturday-lotto', {
            url: "/saturday-lotto",
            templateUrl: "views/saturday-lotto.html",
            data: { bg: "",pageTitle: 'Saturday Lotto', specialClass: "fixed-nav colour2", otherBodyTags: 'data-gr-c-s-loaded="true"' },
            resolve: { authenticateSession : authenticateSession }
        })

        .state('myAccount.super-jackpot-lottery', {
            url: "/super-jackpot-lottery",
            templateUrl: "views/super-jackpot-lottery.html",
            data: { bg: "",pageTitle: 'Super Jackpot Lottery', specialClass: "fixed-nav colour2", otherBodyTags: 'data-gr-c-s-loaded="true"' },
            resolve: { authenticateSession : authenticateSession }
        })

       

       
      
        
        $locationProvider.hashPrefix(''); // by default '!'
        $locationProvider.html5Mode(true);
        
}

function authenticateSession($http, $state, $location){
    if(localStorage.getItem('sessionId') != "" && localStorage.getItem('sessionId') != null ){        
        if($location.$$path == "/"){
            $location.url("/home/dashboard");
        }
        else{
            $location.url($location.$$path);
        }
        return false;
    }
    else{
        
        $location.url('login');
        return false;
    }
}  

angular
    .module('portalApp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
