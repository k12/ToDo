Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'ToDo',
    autoCreateViewport: true,

    controllers: [
        'ToDos'
    ]
});