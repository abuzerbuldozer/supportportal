sap.ui.define([], function() {
	"use strict";
	var appName = "a41s.go.test1";
	return sap.ui.jsview(appName+".view.App", {
		createContent: function (oController) {
			this.setDisplayBlock(true); // to avoid scroll bars on desktop the root view must be set to block display
			this.app = new sap.m.App( appName+'App');
			return this.app;
		}
	});
});
