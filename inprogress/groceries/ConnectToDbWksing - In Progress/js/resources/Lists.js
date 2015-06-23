ListModule.factory('Lists', function ($resource) {
    console.log("LF");
    var Lists = $resource('https://api.mongolab.com/api/1/databases/swagdb/collections/lists/:id', {
        apiKey:'BjlEUWGYCJqtGRf2OpBLLXtZ_U-BFEmg',
        id:'@_id.$oid'
    });

    return Lists;
});