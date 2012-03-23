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
            flex: 3,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            header: 'Created At',
            dataIndex: 'createdAt'
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
                        list = Ext.getCmp('toDoList'),
                        selection = list.getSelectionModel().getSelection()[0];

                    if (selection) {
                        store.remove(selection);
                        store.loadPage(store.currentPage);
                    }
                }
            }]
        },
        {
            xtype: 'pagingtoolbar',
            store: 'ToDos',
            dock: 'bottom',
            displayInfo: true
        }];

        this.callParent();
    }
});