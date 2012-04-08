Ext.define('ToDo.view.todo.List', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.todolist',
    title: 'What To Do List:',
    enableColumnHide: false,
    columnLines: true,
    multiSelect: true,

    store: 'ToDos',

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function(editor, e) {
                    var store = Ext.getStore('ToDos');
                    store.sync();
                }
            }
        })
    ],

    selModel: Ext.create('Ext.selection.CheckboxModel'),

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
            xtype: 'datecolumn',
            format: 'Y-m-d',
            renderer: Ext.util.Format.htmlEncode,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'Y-m-d'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 40,
            align: 'center',
            items: [{
                icon   : 'images/delete.gif',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
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
            }]
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