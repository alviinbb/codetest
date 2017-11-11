/**
 * MainCtrl - controller
 * Main Controller Module.
 *
 */
function MainCtrl($http, $state, $scope, sessionSvc){
    // Parent scope controller.

    // Hide/Show Home / Online store on sidebar nav
    $state.showHome = true;
    $state.showOnlineStore = false;
    $scope.src = "_ngAjax";    
    
    // Get data from local storage
    this.userName = localStorage.getItem('userName');

    this.logOut = function(){
        var data = {
            src: $scope.src,
            logout: true,
            user_action: "logout"
        };

        var req = {
            method: 'POST',
            url: 'api/auth/CustomerActions.php',
            data: data,
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        };

        $http(req).then(function(data){
            if(data.data.success){
                sessionSvc.logOutUser();
            }
        });
    }
}

/**
 * LoginCtrl - controller
 * Login Module.
 * 
 * Uses: User Login, Forgot Password Module
 *
 */
function LoginCtrl($http, $scope, $timeout, $state, $location, sessionSvc){
    $scope.initMessage = "Please Log in below with your credentials.";

    $scope.showLoginAlert = false;
    $scope.loginErrorMsg = "";
    
    this.tryLogin = function(){
        var data = { 
            username: $scope.username,
            pw: $scope.pw,
            src: $scope.src,
            user_action: "login"
        };

        var req = {
            method: 'POST',
            url: 'api/auth/CustomerAuthenticate.php',
            data: data,
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        };

        $http(req).then(function(data){            
            if(!data.data.success){
                $scope.showLoginAlert = true;
                $scope.loginErrorMsg = data.data.err_msg;
                $scope.pw = "";

                $timeout(function() {                    
                    $scope.showLoginAlert = false;
                    $scope.loginErrorMsg = "";
                }, 3000); 
                
            }
            else{
                sessionSvc.setSessionLocalStorage(data.data.data[0])
                $state.go('home.dashboard');
            }
        });

        return false;
    };

    this.requestPasswordReset = function(){
        var data = {
            emailId: $scope.emailId,
            src: $scope.src,
            param: "forgot_password",
            user_action: "validate_forgot_pw"
        };

        $scope.showForgotPwAlert = false;
        $scope.forgotPasswordErrorMsg = "";
        $scope.alertType = "alert alert-danger";

        var req = {
            method: 'POST',
            url: 'api/auth/CustomerActions.php',
            data: data,
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        };

        if( (typeof $scope.emailId !== undefined) && $scope.emailId != "" ){
            $http(req).then(function(data){
                if(data.data.success == "false"){
                    $scope.showForgotPwAlert = true;
                    $scope.forgotPasswordErrorMsg = data.data.msg;
                    $scope.alertType = "alert alert-danger";

                    $timeout(function() {                    
                        $scope.showForgotPwAlert = false;
                        $scope.forgotPasswordErrorMsg = "";
                    }, 3000); 
                }
                else{
                    $scope.alertType = "alert alert-success"
                }
            });
        }
    };    
}

/**
 * AccountCtrl - controller
 * Account Module.
 * 
 * Uses: Accounts Tab
 *
 */
function AccountCtrl($http, $state, $location, $scope, dataTableSvc, sessionSvc){
    $scope.accessRestrictionMessage = "";
    $scope.showAccountsPortalLogin = false;

    var accountsPortalFormLogin = $("#frmLogon");
    var ReportsTable = $('#reports-table');
    var lotteryTable = $("#lotto-table");

    /**
     * $scope.getPowerballData - function()
     * Perform HTTP Request to get Powerball data.
     * 
     */
    $scope.getPowerballData = function(){
        var params = {
            src: $scope.src,
            user_action: "getPowerballData",
            customer_id: localStorage.getItem('userId'),
            _t: localStorage.getItem('sessionId')
        };

        var req = {
            method: 'GET',
            url: 'api/accounts/Powerball.php',
            params: params,
            headers : {'Content-Type':'application/json; charset=UTF-8'}
        };

        $http(req).then(function(data){
            if(data.data.restricted){
                $scope.onAccessDenied(data.data.msg);
            }
            else if(data.data._l){
                sessionSvc.logOutUser();
            }
            else{
                dataTableSvc.ReportTableInit(ReportsTable, data.data);
            }           
        });

        return false;
    }
    /**
     * $scope.contractsInit - function()
     * Perform HTTP Request to get contracts data.
     * 
     */
    $scope.contractsInit = function(){

        $scope.s1Total = 0;
        $scope.s2Total = 0;
        
        var params = {
            src: $scope.src,
            user_action: "getContractsData",
            customer_id: localStorage.getItem('userId'),
            is_admin: localStorage.getItem('is_admin'),
            _t: localStorage.getItem('sessionId')
        };

        var req = {
            method: 'GET',
            url: 'api/accounts/super-jackpot-lottery.php',
            params: params,
            headers : {'Content-Type':'application/json; charset=UTF-8'}
        };

        $http(req).then(function(data){
            if(data.data.success){
                $scope.s1Total = data.data.s1_grand_total;
                $scope.s2Total = data.data.s2_grand_total;
                dataTableSvc.superjackpotlotteryTableInit(lotteryTable, data.data.data);
            }
            else if(data.data._l){
                sessionSvc.logOutUser();
            }
            else{
                return false;
            }
        });
    }
}



/**
 * networkManagementCtrl - controller
 * Network Management Module.
 * 
 * Uses: Network Management modules
 *
 */


angular
.module('portalApp')
.controller('MainCtrl', MainCtrl)
.controller('LoginCtrl', LoginCtrl)
.controller('AccountCtrl', AccountCtrl)



