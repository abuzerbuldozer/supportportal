sap.ui.define([], function() {
    "use strict";
    var appName = "a41s.ticketCreate";
    return sap.ui.jsview(appName+".view.NotFound", {
        createContent: function (cont) {
            return (
                new sap.m.MessagePage({
                    title:"{i18n>NotFoundTitle}",
                    text:"{i18n>NotFoundText}",
					icon:"{sap-icon://document}",
					description:"{i18n>NotFoundDescr}",
                    showNavButton:true,
                    navButtonPress: function () {
                        if ( sap.ui.core.routing.History.getInstance().getPreviousHash() === undefined ) {
                            window.location = '#';
                        } else {
                            window.history.back();
                        }
                    }
                })
            );
        }
    });
});
