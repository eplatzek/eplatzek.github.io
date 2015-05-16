ListModule.controller('ListController',  function ($scope, Lists) {

    $scope.lists = Lists.query();
    

    $scope.remove = function (list) {
        list.$delete();
    };

    $scope.add = function () {
        var list = new Lists({
            name: $scope.listName,
        });
        list.$save();
    };
console.log("LC");
});