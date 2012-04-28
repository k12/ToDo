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
        var logs = '';

        for (var i=0; i<errors.length; i++) {
            logs += ('Field ' + errors.items[i].field + ' ' + errors.items[i].message + '\n');
        }

        console.log(logs);
    }
});