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
        this.items = [
            this.buildToDoGridPanel()
        ];

        this.callParent();
    },

    buildToDoGridPanel: function() {
        return {
            xtype: 'toDoList',
            itemId: 'toDoList',
            width: 500
        }
    },

    getToDoList: function() {
        return this.getComponent('toDoList');
    }
});