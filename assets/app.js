Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'ToDo',
    autoCreateViewport: true,
    appFolder: 'assets/app',

    controllers: [
        'ToDos'
    ]
});