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
        var toDo = Ext.getCmp('toDoTextField').getValue(),
            model = new ToDo.model.ToDo({toDo: toDo}),
            store = Ext.getStore('ToDos'),
            win = button.up('window'),
            form = win.down('form').getForm();

        if (form.isValid())
        {
            store.insert(0, model);
            store.load();
            win.close();
        }
    }
});