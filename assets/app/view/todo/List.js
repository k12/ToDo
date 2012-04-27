Ext.define('ToDo.view.todo.List', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.todolist',
    title: 'What To Do List:',

    multiSelect: true,
    enableColumnHide: false,

    selModel: Ext.create('Ext.selection.CheckboxModel'),

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
                    Ext.getStore('ToDos').sync();
                }
            }
        })
    ],

    initComponent: function() {
        this.columns = [
            this.buildToDoColumn(),
            this.buildDueDateColumn()
        ],

        this.dockedItems = [
            this.buildToolBar()
        ];

        this.callParent();
    },

    buildToDoColumn: function() {
        return {
            header:         'Task',
            dataIndex:      'toDo',
            renderer:       Ext.util.Format.htmlEncode,
            flex:           3,
            editor: {
                xtype:      'textfield',
                allowBlank: false
            }
        };
    },

    buildDueDateColumn: function() {
        return {
            header:         'Due Date',
            dataIndex:      'dueDate',
            renderer:       this.dueDateColumnRenderer,
            editor: {
                xtype:      'datefield',
                format:     'Y-m-d',
                allowBlank: false
            }
        };
    },

    buildToolBar: function() {
        return {
            xtype: 'toolbar',
            items: [{
                xtype:      'textfield',
                name:       'toDo',
                id:         'toDo',
                width:      250,
                allowBlank: false,
                emptyText:  'What to do, sir?'
            }, {
                xtype:      'datefield',
                name:       'dueDate',
                id:         'dueDate',
                width:      100,
                format:     'Y-m-d',
                emptyText:  'Y-m-d'
            }, {
                text:       'Add',
                iconCls:    'add-icon',
                tooltip:    'Add New',
                action:     'create'
            },
            '-', {
                text:       'Delete',
                iconCls:    'delete-icon',
                tooltip:    'Delete Selected',
                action:     'delete'
            }]
        }
    },

    dueDateColumnRenderer: function(date, metadata, record, rowIndex) {
        var now = Ext.util.Format.date(new Date, 'Y-m-d');

        date = Ext.util.Format.date(date, 'Y-m-d');

        if (date < now && date) {
            metadata.style = 'color: #DD0000';
        }

        return date;
    }
});