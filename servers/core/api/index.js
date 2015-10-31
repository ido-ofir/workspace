
var express = require('express');

var Emitter = require('./Emitter');
var Collection = require('./Collection.js');
var Rest = require('./Rest.js');
var utils = require('../utils');

var actions = require('./Actions.js')();

module.exports = function(schemas, orm, config){

    var router = express.Router();

    function options(stage, name) {
        if(!actions[stage]) return console.error(`"${stage}" should be "before" or "after"`)
        if(!actions[stage][name]) return console.error(`"${name}" is not a valid api action`);
        return {
            exceptFor: function(models, listener){
                if(!Array.isArray(models)) models = [models];
                models.map(function(model){
                  // what now ?
                });
            },
            of: function(models, listener){
              if(!Array.isArray(models)) models = [models];
              models.map(function(model){
                // what now ?
              });
            }
        }
    }

    function run(method, collection, action, exec){
      if(!action.data) action.data = {};
      if(action.data.uuid) action.uuid = action.data.uuid;
      if(!actions.before[method]) return console.error(`"${action.name}" should be "before" or "after"`)
      action.method = method;
      action.collection = collection.name;
      actions.before[method](action, function(){
        collection.actions.before[method](action, function(){
          exec(function(){
            collection.actions.after[method](action, function(){
              actions.after[method](action, function(){
                action.done(action.data);
              });
            });
          });
        });
      });
    }

    var api = {
      router: router,
      config: config,
      schemas: schemas,
      models: orm.collections,
      routes: {},
      before(actionNames, listener){
        if(!listener) return options('before', actionNames);
        if(!Array.isArray(actionNames)) actionNames = [actionNames];
        actionNames.map(function(actionName){
          if(!actions.before[actionName]) return console.error(`cannot find action ${actionName}`);
          actions.before[actionName].use(listener);
        });
      },
      after(actionNames, listener){
        if(!listener) return options('after', actionNames);
        if(!Array.isArray(actionNames)) actionNames = [actionNames];
        actionNames.map(function(actionName){
          if(!actions.after[actionName]) return console.error(`cannot find action ${actionName}`);
          actions.after[actionName].use(listener);
        });
      },
      action(action){
        var data = action.data;
        var args = data.args;
        if(!data.route) return action.fail(`cannot find route ${data.route}`);
        if(!data.action) return action.fail(`cannot find action ${data.action}`);
        if(!args) return action.fail(`cannot find args array ${data.args}`);
        if(!Array.isArray(args)) args = [args];
        var collection = api.routes[data.route];
        if(!collection) return action.fail(`cannot find collection for route ${route}`);
        if(!collection[data.action]) return action.fail(`api does not have a function ${data.action}`);
        action.data = args;
        collection[data.action](action);
      }
    };
    var schema, model, collection;

    for(var name in schemas){
      model = orm.collections[name.toLowerCase()];
      if(model) {
        collection = Collection(name, model, router, run);
        Rest(collection);   // legacy rest api
        api.routes[name] = collection;
      }
      else console.error('cannot load model ' + name);
    }

    return api;
};
