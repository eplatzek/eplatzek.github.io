FoodModule.factory('Foods', function ($resource) {
    console.log("FF");
                  
    var Foods = $resource('https://api.mongolab.com/api/1/databases/swagdb/collections/fda/:id', {
        apiKey:'BjlEUWGYCJqtGRf2OpBLLXtZ_U-BFEmg',
        id:'@_id.$oid'
    });

    return Foods;
});