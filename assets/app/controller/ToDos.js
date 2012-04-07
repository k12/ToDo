Ext.define('ToDo.controller.ToDos', {
    extend: 'Ext.app.Controller',

    stores: ['ToDos'],
    models: ['ToDo'],
    views:  ['todo.List', 'todo.Add'],

    init: function() {
        this.control({
            'todoadd button[action=save]': {
                click: this.addToDo
            }
        });
    },

    addToDo: function(button) {
        var pagingTB = Ext.getCmp('toDoPagingTB'),
            toDo = Ext.getCmp('toDoTextField').getValue(),
            dueDate = Ext.util.Format.date(Ext.getCmp('dueDateField').getValue(), 'Y-m-d'),
            model = new ToDo.model.ToDo({toDo: toDo, dueDate: dueDate}),
            store = Ext.getStore('ToDos'),
            win = button.up('window'),
            form = win.down('form').getForm();

        if (form.isValid())
        {
            store.insert(0, model);
            store.totalCount++;
            pagingTB.updateInfo();
            win.close();
        }
    }
});