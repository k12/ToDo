Ext.define('ToDo.view.todo.List', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.todolist',
    title: 'What To Do List:',
    enableColumnHide: false,
    columnLines: true,
    multiSelect: true,

    store: 'ToDos',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        }
    },

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
            flex: 3,
            renderer: Ext.util.Format.htmlEncode,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            header: 'Due Date',
            dataIndex: 'dueDate',
            renderer: function(date, metadata, record, rowIndex){
                var now = Ext.util.Format.date(new Date, 'Y-m-d');
                date = Ext.util.Format.date(date, 'Y-m-d');

                if (date < now && date)
                {
                    metadata.style = 'color: #DD0000';
                }

                return date;
            },
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'Y-m-d'
            }
        }, {
            xtype: 'actioncolumn',
            width: 40,
            align: 'center',
            items: [{
                icon: 'images/delete.gif',
                tooltip: 'Delete',
                action: 'onRowDeleteClick'
            }]
        }];

        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                xtype: 'textfield',
                name: 'todo',
                id: 'toDoTextField',
                allowBlank: false,
                width: 250,
                emptyText: 'What to do, sir?'
            }, {
                xtype: 'datefield',
                name: 'dueDate',
                id: 'dueDateField',
                width: 100,
                format: 'Y-m-d',
                emptyText: 'Y-m-d'
            }, {
                text: 'Add',
                iconCls: 'add-icon',
                tooltip: 'Add New',
                action: 'onAddClick'
            },
            '-',
            {
                text: 'Delete',
                iconCls: 'delete-icon',
                tooltip: 'Delete Selected',
                action: 'onDeleteClick'
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