Ext.define('ToDo.controller.ToDos', {
    extend: 'Ext.app.Controller',

    stores: ['ToDos'],
    models: ['ToDo'],
    views:  ['todo.List'],

    refs: [{
        ref: 'ToDo',
        selector: '#toDoTextField'
    }, {
        ref: 'DueDate',
        selector: '#dueDateField'
    }, {
        ref: 'Viewport',
        selector: 'viewport'
    }],

    init: function() {
        this.control({
            '#toDoTextField': { //FIXIT: how to join it with #dueDateField
                specialkey: this.onSpecialKey
            },
            '#dueDateField': {
                specialkey: this.onSpecialKey
            },
            'button[action=onAddClick]': {
                click: this.create
            },
            'button[action=onDeleteClick]': {
                click: this.delete
            },
            'actioncolumn': { //FIXIT: why actioncolumn[action=onRowDeleteClick] doesnt work?
                click: this.onRowDeleteClick
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
    },

    onRowDeleteClick: function(grid, html, rowIndex) {
        var store = this.getToDosStore();

        Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
            if (btn == 'yes') {
                store.remove(store.getAt(rowIndex));
                store.totalCount--;
                store.sync();
            }
        });
    }
});