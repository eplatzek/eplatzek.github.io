FoodModule.controller('FoodController',  function ($scope, Foods) {

    $scope.foods = Foods.query();
    
    /*
    $scope.remove = function (car) {
        food.$delete();
    };

    $scope.add = function () {
        var food = new Foods({
            name: $scope.foodName,
            qty: $scope.foodQty,
        });
        food.$save();
    };
    */
console.log("FC");
});