Ext.define('ToDo.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'ToDo.view.todo.List'
    ],

    layout: {
        align: 'middle',
        pack: 'center',
        type: 'hbox'
    },

    initComponent: function() {
        this.items = {
            items: [{
                xtype: 'todolist',
                width: 500,
                id: 'toDoList'
            }]
        };

        this.callParent();
    }
});