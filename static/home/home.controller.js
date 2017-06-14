/**
 * Created by Ravan on 2/25/2017.
 */
angular.module('autoSuppor.controllers', ['ui.bootstrap'])
    .controller('HomeController', ['$scope','$timeout','$uibModal','$q',homeController]);

function homeController($scope,$timeout,$uibModal,$q) {
    var owl= $('.owl-carousel');
    $(document).ready(function () {
        owl.owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplaySpeed:3000,
            autoplayHoverPause: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    loop: true,
                    nav: false
                },
                300: {
                    items: 3,
                    loop: true,
                    nav: false
                },
                490: {
                    items: 4,
                    loop: true,
                    nav: false
                },
                570: {
                    items: 4,
                    loop: true,
                    nav: false
                },
                650: {
                    items: 5,
                    loop: true,
                    nav: false
                },
                768: {
                    items: 5,
                    loop: true,
                    nav: false
                },
                990: {
                    items: 6,
                    loop: true,
                    nav: false
                }
                ,
                1500: {
                    items: 7,
                    loop: true,
                    nav: false
                }
            }
        });
        $('.customNextBtn').click(function() {
            owl.trigger('next.owl.carousel');
        });
                // Go to the previous item
        $('.customPrevBtn').click(function() {
            owl.trigger('prev.owl.carousel', [300]);
        });

    });

    $('.carousel').carousel({
        interval: 5000
    });

    $scope.animationsEnabled = true;
    $scope.modelInstance;
    $scope.login = function () {
        console.log('login');
        var modelInstance =  $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './../login/login.html',
            backdrop: true
        });
        modelInstance.result.then(function(){
            //Get triggers when modal is closed
            $q.reject(true);

        }, function(){
            //gets triggers when modal is dismissed.
            $q.reject(true);
        });


    };
    $scope.modelInstanceDetail;
    $scope.homeDetail= function(){
        var modelInstanceDetail =  $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './../homeDetail/homeDetail.html',
            backdrop: true
        }).result.then(function(){
            //Get triggers when modal is closed
            $q.reject(true);

        }, function(){
            //gets triggers when modal is dismissed.
            $q.reject(true);
        });
    }
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

}