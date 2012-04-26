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
            items: [
                this.buildToDoGridPanel()
            ]
        };

        this.callParent();
    },

    buildToDoGridPanel: function() {
        return {
            xtype: 'todolist',
            itemId: 'toDoList',
            width: 500
        }
    },

    getToDoList: function() {
        return this.getComponent('toDoList');
    }
});