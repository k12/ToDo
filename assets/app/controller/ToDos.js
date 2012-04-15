Ext.define('ToDo.controller.ToDos', {
    extend: 'Ext.app.Controller',

    stores: ['ToDos'],
    models: ['ToDo'],
    views:  ['todo.List'],

    init: function() {
        this.control({
            '#toDoTextField': { //FIXIT: how to join it with #dueDateField
                specialkey: this.onSpecialKey
            },
            '#dueDateField': {
                specialkey: this.onSpecialKey
            },
            'button[action=onAddClick]': {
                click: this.onAddClick
            },
            'button[action=onDeleteClick]': {
                click: this.onDeleteClick
            },
            'actioncolumn': { //FIXIT: why actioncolumn[action=onRowDeleteClick] doesnt work?
                click: this.onRowDeleteClick
            }
        });
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onAddClick();
        }
    },

    onAddClick: function()
    {
        var pagingTB = Ext.getCmp('toDoPagingTB'),
            toDoTextField = Ext.getCmp('toDoTextField'),
            dueDateField = Ext.getCmp('dueDateField'),
            toDo = toDoTextField.getValue(),
            dueDate = Ext.util.Format.date(dueDateField.getValue(), 'Y-m-d'),
            model = new ToDo.model.ToDo({toDo: toDo, dueDate: dueDate}),
            store = Ext.getStore('ToDos');

        if (toDoTextField.isValid() && dueDateField.isValid())
        {
            store.insert(0, model);
            store.totalCount++;
            store.sync();
            pagingTB.updateInfo();

            toDoTextField.reset();
            dueDateField.reset();
        }
    },

    onDeleteClick: function()
    {
        var store = Ext.getStore('ToDos'),
            pagingTB = Ext.getCmp('toDoPagingTB'),
            list = Ext.getCmp('toDoList'),
            selections = list.getSelectionModel().getSelection();

        if (selections.length > 0) {
            Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
                if (btn == 'yes'){
                    store.remove(selections);
                    store.totalCount -= selections.length;
                    store.sync();
                    pagingTB.updateInfo();
                    list.getSelectionModel().deselectAll();
                }
            });
        }
    },

    onRowDeleteClick: function(grid, html, rowIndex)
    {
        console.log(arguments);
        var store = Ext.getStore('ToDos'),
            pagingTB = Ext.getCmp('toDoPagingTB');

        Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn) {
            if (btn == 'yes') {
                store.remove(store.getAt(rowIndex));
                store.totalCount--;
                store.sync();
                pagingTB.updateInfo();
            }
        });
    }
});