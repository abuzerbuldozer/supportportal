sap.ui.define([], function() {
    "use strict";
    var appName = "a41s.go.test1";
    return sap.ui.jsview(appName+".view.Help", {
        createContent: function (cont) {
            var iframe = ('de' ==  sap.ui.getCore().getConfiguration().getLanguage().split('-')[0])
                ?'<iframe src="https://fiori-hilfe.all-for-one.com/kapitel/1.3" width="100%" height="99%" style="border-width:0px;"/>'
                :'<iframe src="https://fiori-help.all-for-one.com/kapitel/1.3" width="100%" height="99%" style="border-width:0px;"/>';

            return (
                new sap.m.Page({
                    title:"{i18n>HelpTitle}",
                    showNavButton:true,
                    navButtonPress: function () {
                        if ( sap.ui.core.routing.History.getInstance().getPreviousHash() === undefined ) {
                            window.location = '#';
                        } else {
                            window.history.back();
                        }
                    },
                    content: new sap.ui.core.HTML({content:iframe})
                })
            );
        }
    });
});