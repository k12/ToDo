Ext.define('ToDo.view.todo.List', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.todolist',
    title: 'What To Do List:',
    enableColumnHide: false,
    columnLines: true,

    store: 'ToDos',

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],

    initComponent: function() {
        this.columns = [{
            header: 'Job',
            dataIndex: 'toDo',
            renderer: Ext.util.Format.htmlEncode,
            flex: 3,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            header: 'Due Date',
            dataIndex: 'dueDate',
            renderer: Ext.util.Format.htmlEncode
        }];

        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: 'Add',
                iconCls: 'add-icon',
                handler: function(){
                    var view = Ext.widget('todoadd');
                }
            },
            '-',
            {
                text: 'Delete',
                iconCls: 'delete-icon',
                handler: function(){
                    var store = Ext.getStore('ToDos'),
                        pagingTB = Ext.getCmp('toDoPagingTB'),
                        list = Ext.getCmp('toDoList'),
                        selection = list.getSelectionModel().getSelection()[0];

                    if (selection) {
                        store.remove(selection);
                        store.totalCount--;
                        pagingTB.updateInfo();
                    }
                }
            }]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'ToDos',
            dock: 'bottom',
            displayInfo: true,
            id: 'toDoPagingTB'
        }];

        this.callParent();
    }
});