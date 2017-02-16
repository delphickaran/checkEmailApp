var mailApp = angular.module('mailApp', ['ngRoute', 'ngResource']);
mailApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/email', {
            templateUrl: 'pages/email.html',
            controller: 'emailController'
        })
        .when('/email-details/:id', {
            templateUrl: 'pages/email_details.html',
            controller: 'emailDetailsController'
        })
});

mailApp.controller('homeController', ['$scope','emailService', function($scope, emailService) {


}]);
mailApp.controller('emailController', ['$scope', '$http','emailService', function($scope, $http, emailService) {
    var url = "http://triangular-api.oxygenna.com/email/inbox";
    $http.get(url)
        .success(function(data, status, headers, config) {
            $scope.emails = data;
            emailService.addEmailList(data);
            console.log($scope.emails);
        })
        .error(function(error, status, headers, config) {
            console.log(status);
            console.log("Error occured");
        });
        $scope.singleEmailClickHanlder = function() {
            console.log("item clicked");
        }
    
}]);

mailApp.controller('emailDetailsController', ['$scope', '$http','$routeParams','emailService', function($scope, $http,$routeParams, emailService) {
    var emailIndex = $routeParams.id;
    $scope.emailDetails = emailService.getEmailAtIndex(emailIndex);
    console.log("data ......", $scope.emailDetails);
}]);

mailApp.service('emailService', function() {
  var EmailList = [];

  var addEmailList = function(emailList) {
      EmailList = emailList;
  };

  var getEmailList = function(){
      return EmailList;
  };

  var getEmailAtIndex = function(index) {
    return EmailList[index];
  }

  return {
    addEmailList: addEmailList,
    getEmailList: getEmailList,
    getEmailAtIndex: getEmailAtIndex
  };

});
