Ext.define('ToDo.store.ToDos', {
    extend: 'Ext.data.Store',


    model: 'ToDo.model.ToDo',
    autoSync: true,
    pageSize: 25,
    autoLoad: {start: 0, limit: this.pageSize},

    proxy: {
        type: 'ajax',
        api: {
            read: 'php/read.php',
            update: 'php/update.php',
            destroy: 'php/delete.php',
            create: 'php/create.php'
        },
        reader: {
            type: 'json',
            root: 'todos',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            successProperty: 'success'
        }
    }
});