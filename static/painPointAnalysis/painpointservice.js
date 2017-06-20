/**
 * Created by heshanjayasinghe on 6/17/17.
 */
 angular.module('autoSuppor.controllers')
    .service('dataService', function($http,$q) {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
   this.getData = function() {
        var deferred = $q.defer();
       $.get('/api/sentimentgraph', function(response){
       //print(response);
        console.log(response)
       // var json = JSON.parse(response);
        var data = response.id;
        console.log(data)
           if(data != null)
               sentimentgraph(data);
       // return data;
    });
   }
   this.getsentimentreviw = function() {
        var deferred = $q.defer();
       $.get('/api/painpointgraph', function(response){
       //print(response);
        console.log(response)
       // var json = JSON.parse(response);
        var data = response.id;
        console.log(data)
           if(data != null)
               painpointgraph(data);
       // return data;
    });
   }
   this.sentimentchecks = function(reviews) {

        $http.post('http://localhost:5000/api/sentimentreviw', {
            review : "坏",

        }).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
               // $scope.dataLoading = false;
                // jsons.push(response.data)

                // var dataObject = {
                //     "name": " ",
                //     "children": response.data.children
                // };


               // console.log(dataObject);

               // $scope.d3json = dataObject;
            });

    }





    //     $http({
    //     url: '/api/sentimentreviw',
    //     method: "POST",
    //     data: { "review" : "坏" }
    // })
    // .then(function(response) {
    //         console.log(response)
    // },
    // function(response) { // optional
    //         // failed
    // });
    // //    $.post('/api/sentimentreviw',{ "review" : "坏" } , function(response){
    // //    //print(response);
    // //     console.log(response)
    // //    // var json = JSON.parse(response);
    // //     var data = response.id;
    // //     console.log(data)
    // //
    // //     return data;
    // //     });

   this.getpainpoint = function() {
        var deferred = $q.defer();
       $.get('/api/painpointgraph', function(response){
       //print(response);
        console.log(response)
       // var json = JSON.parse(response);
        var data = response.id;
        console.log(data)
           if(data != null)
               painpointgraph(data);
       // return data;
    });
   }
   this.getloyalty = function() {
        var deferred = $q.defer();
       $.get('/api/ployaltygraph', function(response){
       //print(response);
        console.log(response)
       // var json = JSON.parse(response);
        var data = response.id;
        console.log(data)
           if(data != null)
               loyaltygraph(data);
       // return data;
    });
   }
      //  var deferred = $q.defer();
      // $http.get('/api/sentimentgraph')
      //     .then(function (response) {
      //         var gdata = response.id;
      //         deferred.resolve(gdata);
      //         //return gdata;
      //     }, function (_error) {
      //           deferred.reject(_error);
      //       });
      //
      //
      //
      //
      //
      //   return deferred.promise;
      //  //return gdata;
      //  };


 });

// function loadsentimentgraph() {
//
//
//     //
//     // clear table
//     //
//
//
//     $.get('/api/sentimentgraph', function(response){
//        //print(response);
//         console.log(response)
//        // var json = JSON.parse(response);
//         var data = response.id;
//         console.log(data)
//         return data;
//     });
// }