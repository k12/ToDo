Ext.define('ToDo.model.ToDo', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id',        type: 'integer'},
        {name: 'toDo',      type: 'string'},
        {name: 'dueDate',   type: 'date',    dateFormat: 'Y-m-d'},
        {name: 'createdAt', type: 'date',    dateFormat: 'Y-m-d'}
    ],

    validations: [
        {type: 'presence',  field: 'toDo'}
    ],

    logErrors: function(errors) {
        console.log(errors);
    }
});