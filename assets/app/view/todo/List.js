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
            xtype: 'datecolumn',
            format: 'Y-m-d',
            renderer: Ext.util.Format.htmlEncode,
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
                icon   : 'images/delete.gif',
                tooltip: 'Delete',
                handler: this.onRowDeleteClick
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
                emptyText: 'What to do, sir?',
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            //this.onAddClick();
                        }
                    }
                }
            }, {
                xtype: 'datefield',
                name: 'dueDate',
                id: 'dueDateField',
                width: 100,
                format: 'Y-m-d',
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            //this.onAddClick();
                        }
                    }
                }
            }, {
                text: 'Add',
                iconCls: 'add-icon',
                tooltip: 'Add New',
                handler: this.onAddClick
            },
            '-',
            {
                text: 'Delete',
                iconCls: 'delete-icon',
                tooltip: 'Delete Selected',
                handler: this.onDeleteClick
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
    },

    onAddClick: function()
    {
        var pagingTB = Ext.getCmp('toDoPagingTB'),
            toDoTextField = Ext.getCmp('toDoTextField'),
            dueDateField = Ext.getCmp('dueDateField'),
            toDo = toDoTextField.getValue(),
            dueDate = Ext.util.Format.date(dueDateField.getValue(), 'Y-m-d'),
            model = new ToDo.model.ToDo({toDo: toDo, dueDate: dueDate}),
            store = Ext.getStore('ToDos');

        if (toDoTextField.isValid() && dueDateField.isValid())
        {
            store.insert(0, model);
            store.totalCount++;
            store.sync();
            pagingTB.updateInfo();

            toDoTextField.reset();
            dueDateField.reset();
        }
    },

    onDeleteClick: function()
    {
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
    },

    onRowDeleteClick: function(grid, rowIndex)
    {
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
});