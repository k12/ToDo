Ext.define('ToDo.controller.ToDos', {
    extend: 'Ext.app.Controller',

    stores: ['ToDos'],
    models: ['ToDo'],
    views:  ['todo.List'],

    init: function() {

    }
});