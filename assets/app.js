Ext.Loader.setConfig({
    enabled: true
});

//FIX for ExtJS bug
//http://www.sencha.com/forum/showthread.php?191131-CheckboxModel-does-not-work-with-grid-drag-drop-in-extjs-4
Ext.override(Ext.dd.DragSource,{
    handleMouseDown: function(e) {
        var element = Ext.get(e.target.id);


        if(element != null && element.hasCls('x-grid-row-checker')){
            return false;
        }


        if (this.dragging) {
            return;
        }
        var data = this.getDragData(e);
        if (data && this.onBeforeDrag(data, e) !== false) {
            this.dragData = data;
            this.proxy.stop();
            this.callParent(arguments);
        }
    }
});

Ext.override(Ext.view.DragZone,{
    onItemMouseDown: function(view, record, item, index, e) {
        var element;

        if (!this.isPreventDrag(e, record, item, index)) {
            this.handleMouseDown(e);

            // If we want to allow dragging of multi-selections, then veto the following handlers (which, in the absence of ctrlKey, would deselect)
            // if the mousedowned record is selected
            element = Ext.get(e.target.id);
            if (element != null && view.getSelectionModel().selectionMode == 'MULTI' && !e.ctrlKey && view.getSelectionModel().isSelected(record)) {
                return element.hasCls('x-grid-row-checker');
            }
        }
    }
});

Ext.application({
    name: 'ToDo',
    autoCreateViewport: true,
    appFolder: 'assets/app',

    controllers: [
        'ToDos'
    ]
});