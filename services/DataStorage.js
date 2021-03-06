var nodePromise = require("node-promise");
var Promise = nodePromise.Promise;

var azure = require('azure-storage');
var tableService = azure.createTableService();

var service = {};

service.init = function() {
	tableService.createTableIfNotExists('GWABRegistration', function() {});
	tableService.createTableIfNotExists('GWABFeedback', function() {});
};

service.getEntities = function(tableName, partitionKey, rowKey, customFilter) {
	var combinedFilterProperties = customFilter || {};

	if (!!partitionKey) {
		combinedFilterProperties.PartitionKey = partitionKey;
	}

	if (!!rowKey) {
		combinedFilterProperties.RowKey = rowKey;
	}

	var query;

	if (combinedFilterProperties.length === 0) {
		query = new azure.TableQuery();
	} else {
		var combinedFilterQuery = null;

		for (var property in combinedFilterProperties) {
			var filter = azure.TableQuery.stringFilter(property, azure.TableUtilities.QueryComparisons.EQUAL, combinedFilterProperties[property]);
			if (combinedFilterQuery === null) {
				combinedFilterQuery = filter;
			} else {
				combinedFilterQuery = azure.TableQuery.combineFilters(combinedFilterQuery, azure.TableUtilities.TableOperators.AND, filter);
			}
		}

		query = new azure.TableQuery().where(combinedFilterQuery);
	}

	var promise = new Promise();

	tableService.queryEntities(tableName, query, null, function(error, result){
		promise.resolve(result.entries);
	});

	return promise;
};

service.insertEntity = function(tableName, entity) {
	var promise = new Promise();

	tableService.insertEntity(tableName, entity, function(error, result, response){
		if (error) {
			var message = null;

			if (response.body['odata.error'].code === 'EntityAlreadyExists') {
				message = 'Указаный вами EMail уже зарегистрирован.';
			}

			promise.resolve({'isError' : true, errorMessage: message });
		} else {
			promise.resolve({'isError' : false });
		}
	});

	return promise;
};

service.mergeEntity = function(tableName, entity) {
	var promise = new Promise();

	tableService.mergeEntity(tableName, entity, function(error, result, response){
		console.log(error);

		if (error) {
			var message = null;

			if (response.body['odata.error'].code === 'EntityAlreadyExists') {
				message = 'Вы уже заполнили форму обратной связи.';
			}

			if (response.body['odata.error'].code === 'ResourceNotFound') {
				message = 'Вы зашли по неверной ссылке.';
			}

			promise.resolve({'isError' : true, errorMessage: message });
		} else {
			promise.resolve({'isError' : false });
		}
	});

	return promise;
};

module.exports = service;