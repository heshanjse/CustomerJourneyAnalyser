/**
 * Created by heshanjayasinghe on 6/14/17.
 */

angular.module('autoSuppor.controllers')
    .controller('painpointController', ['$scope','dataService','$http','$timeout','$uibModal','$q',painpointController]);


function painpointController($scope,dataService,$q) {
    //data = loadsentimentgraph();
    $scope.data = null;
    $scope.data = dataService.getData();
    $scope.data = dataService.getpainpoint();
    $scope.data = dataService.getloyalty();
    $scope.sentimentcheck = function() {dataService.sentimentchecks($scope.review);}

     //     $.post("/api/sentimentreviw", { "review" : $scope.review }, function(response){
    //     console.log(response.id);
    //     //return response.id;
    //
    // });

    // var review = $scope.review;
    // $scope.sentimentcheck = function() {
    //     $.post("/api/sentimentreviw", { "review" : $scope.review }, function(response){
    //     console.log(response.id);
    //     //return response.id;
    //
    // });
    //    // console.log($scope.review);
    // }
        // .then(function () {
        //         Notification.change(-1);
        //     }, function (_error) {
        //         console.log(_error);
        //     });


   //  var getdata = function() {
   //      // $http() returns a $promise that we can add handlers with .then()
   //      return $http({
   //
   // url: 'http://localhost:5000/api/sentimentgraph',
   // method:'GET'})
   //   }
   //  if($scope.data!= null){
   //      sentimentgraph($scope.data.id);
   //  }


   //painpointgraph();
   // loyaltygraph();



}
