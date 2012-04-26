Ext.define('ToDo.store.ToDos', {
    extend: 'Ext.data.Store',

    model: 'ToDo.model.ToDo',
    autoSync: false,
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: 'todo/read',
            update: 'todo/update',
            destroy: 'todo/delete',
            create: 'todo/create'
        },
        reader: {
            type: 'json',
            root: 'todos',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty : "message"
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            successProperty: 'success',
            messageProperty : "message"
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log("ToDos store exception: ", arguments);

                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: 'Status Code: ' + response.status + ' ' + response.statusText + '<br /> Error Message: ' + operation.error,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});