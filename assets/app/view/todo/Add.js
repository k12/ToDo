Ext.define('ToDo.view.todo.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.todoadd',

    title : 'Add To Do',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'todo',
                        id: 'toDoTextField',
                        msgTarget: 'under',
                        fieldLabel: 'Job',
                        width: 350,
                        labelWidth: 70,
                        allowBlank: false,
                        margin: 10,
                        emptyText: 'What to do, sir?'
                    }, {
                        xtype: 'datefield',
                        name: 'dueDate',
                        id: 'dueDateField',
                        msgTarget: 'under',
                        fieldLabel: 'Due Date',
                        width: 350,
                        labelWidth: 70,
                        margin: 10,
                        format: 'Y-m-d'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});