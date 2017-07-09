'use strict';

app
	.controller('LoginCtrl', ['$scope', 'Auth', function($scope, $http, $state, $cookies, toastr, Auth, $location){

		$scope.user = {};

        $scope.login = function() {
                $http.post('/file/v1/api/Login.php', $scope.user)
                    .then(function (response){
                        if(response.data.CODE === 100){
                            var configAPI = angular.copy(response.data.RESULT).map(function (item){
                                return{
                                    id: item.ID,
                                    email: item.EMAIL,
                                    nama: item.NAMA,
                                    alamat: item.ALAMAT
                                }
                            });

                            toastr.success(response.data.DESC, 'Success', 5000);

                            //$state.go('app.dashboard');
                            Auth.setUser(configAPI[0].email);

                        } else {
                        	console.log(JSON.stringify(response.data));
                            toastr.error(response.data.DESC, 'Error!', 5000);
                        }

                    })
                    .catch(function(error){
                        alert(error);
                    })
        }

        $scope.logout = function(){
        	Auth.setUser(null);
            $location.path('/login');
        }
	}])