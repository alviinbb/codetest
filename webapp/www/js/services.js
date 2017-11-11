/**
 * dataTableSvc - Service
 * General Service Provider for Customer Portal DataTables
 * 
 */
function dataTableSvc(){

    /**
     * this.monthlyReportTableInit - function()
     * Initialize JQuery DataTable module on Monthly Report
     * 
     */
    this.ReportTableInit = function(ReportsTable, tableData){
        var table = ReportsTable.DataTable({
            columnDefs: [
                {"className": "text-center", "targets": "_all"}
            ],
            pageLength: 10,
            responsive: true,
            data: tableData,
            columns: [
                { data: "name" },
                { data: "description" },
                { data: "price" },
                { data: "range" },
            ],
            createdRow: function(row, data, idx){
               
            }
        });       
    }


    this.superjackpotlotteryTableInit = function(lotteryTable, tableData){
        var table = lotteryTable.DataTable({
            columnDefs: [
                {"className": "text-center", "targets": "_all"}
            ],
            pageLength: 10,
            responsive: true,
            data: tableData,
            columns: [
                { data: "name" },
                { data: "description" },
                { data: "price" },
                { data: "range" },
            ],
            createdRow: function(row, data, idx){
                
            }
        });       
    }

}

/**
 * sessionSvc - Service
 * General Service Provider for Session Handling
 * 
 */
function sessionSvc(encodeSvc, $state){

    /**
     * this.setSessionLocalStorage - function()
     * Set session items to LocalStorage
     * 
     */
    this.setSessionLocalStorage = function(data){
        angular.forEach(data, function(value, key){
            localStorage.setItem(encodeSvc.decode(key), encodeSvc.decode(value));
        });
    }

    /**
     * this.logOutUser - function()
     * Remove session items to LocalStorage & logs user out (redirect to login page)
     * 
     */
    this.logOutUser = function(msg){
        localStorage.clear();
        $state.go('login');
    }
}

/**
 * encodeSvc - Service
 * General Service Provider for Encoding / Decoding Data
 * 
 */
function encodeSvc(){

    /**
     * this.encode - function()
     * Encode input to Base64
     * 
     */
    this.encode = function(data){
        return window.btoa(window.btoa(data));
    }

    /**
     * this.decode - function()
     * Decode Base64 input 
     * 
     */
    this.decode = function(data){
        return window.atob(window.atob(data));
    }
}

/**
 * nocDataService - Service
 * General Service Provider for fetching NOC data
 * 
 */
function nocDataSvc($http, dataTableSvc){

    var lastUpdate = "";
    this.fetchNocData = function(src = '_ngAjax'){
        var data = {
            src: src,
            user_action: "getNoc",
            customer_id: localStorage.getItem('userId'),
            _t: localStorage.getItem('sessionId')
        };

        var req = {
            method: 'POST',
            url: 'api/network-management/NOC',
            data: data,
            headers : {'Content-Type':'application/json; charset=UTF-8'}
        };

        $http(req).then(function(data){
            if(data.data.success){                     
                lastUpdate = "Last Update: "+data.data.last_update;  

                // Workaround on AngularJS not waiting for the API call to finish before assigning scope value.
                $("#lastUpdate").html(lastUpdate);        

                dataTableSvc.nocTableInit($("#nocTable"), data.data.msg);
            }
        });

        return true;
    }

    this.getLastUpdate = function(){
        return lastUpdate;
    }
}

angular
    .module("portalApp")
    .service("dataTableSvc", dataTableSvc)
    .service("sessionSvc", sessionSvc)
    .service("encodeSvc", encodeSvc)
    .service("nocDataSvc", nocDataSvc);
