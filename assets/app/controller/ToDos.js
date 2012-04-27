Ext.define('ToDo.controller.ToDos', {
    extend: 'Ext.app.Controller',

    stores: ['ToDos'],
    models: ['ToDo'],
    views:  ['todo.List'],

    refs: [{
        ref: 'ToDo',
        selector: '#toDo'
    }, {
        ref: 'DueDate',
        selector: '#dueDate'
    }, {
        ref: 'Viewport',
        selector: 'viewport'
    }],

    init: function() {
        this.control({
            '#toDo': { //FIXIT: how to join it with #dueDateField
                specialkey: this.onSpecialKey
            },
            '#dueDate': {
                specialkey: this.onSpecialKey
            },
            'button[action=create]': {
                click: this.create
            },
            'button[action=delete]': {
                click: this.delete
            }
        });
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.create();
        }
    },

    create: function() {
        var model = this.getToDoModel(),
            store = this.getToDosStore(),
            toDoModel = new model({
                toDo: this.getToDo().getValue(),
                dueDate: this.getDueDate().getValue()
            }),
            errors = toDoModel.validate();

        if (errors.isValid()) {
            store.insert(0, toDoModel);
            store.sync();

            this.getToDo().reset();
            this.getDueDate().reset();
        }
        else {
            toDoModel.logErrors(errors);
        }
    },

    delete: function() {
        var store = this.getToDosStore(),
            list = this.getViewport().getToDoList(),
            records = list.getSelectionModel().getSelection();

        if (records.length > 0) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
                if (btn == 'yes'){
                    store.remove(records);
                    store.sync();
                    list.getSelectionModel().deselectAll();
                }
            });
        }
    }

});