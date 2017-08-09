var c = console;
var count = "1";
sap.ui
		.define(
				[ "sap/ui/core/UIComponent", "sap/m/MessageBox" ],
				function(UIComponent, MessageBox) {
					"use strict";
					var appName = "a41s.go.test1";

					return UIComponent
							.extend(
									"a41s.go.test1.Component",
									{

										metadata : {
//											rootView: "a41s.go.test1",
											dependencies : {
//												"minUI5Version" : "1.28.1",
												"libs" : [ "sap.ui.core",
															"sap.m", "sap.f",
															"sap.ui.table",  
															"sap.ui.layout" ]
											},
											config : {										
//												sample: {
//													stretch : true,
//													files: [
//														"Master.view.xml",
//														"Master.controller.js"
//													]
//												},											
												resourceBundle : "i18n/i18n.properties",
												serviceUrl : "/sap/opu/odata/sap/Z_TICKET_SEARCH_SRV/",
												titleResource : "ShellTitle"
											},
											routing : {
												config : {
													routerClass : "sap.m.routing.Router",
													viewType : "XML",
													viewPath : appName + ".view",
													controlId : appName + 'App',
													controlAggregation : "pages",
													bypassed : {
														"target" : [ "notFound" ]
													}
												},
												routes : [ {
													pattern : "",
													name : "goMain",
													target : [ "master" ]
												}, {
													pattern : "help",
													name : "goHelp",
													target : [ "help" ]
												} ],
												targets : {
													master : {
														viewName : "Master",
														viewLevel : 1,
														viewId : "Master"
													},
													notFound : {
														viewName : "NotFound",
														viewId : "notFound",
														viewType : "JS"
													},
													help : {
														viewName : "Help",
														viewId : "help",
														viewType : "JS"
													}

												}
											}

										},
										init : function() {
//											sap.ui.core.UIComponent.prototype.init
//													.apply(this, arguments);
											 UIComponent.prototype.init.apply(
											 this, arguments);
											 this.getRouter().initialize();
										},
										destroy : function() {
											sap.ui.core.UIComponent.prototype.destroy
													.apply(this, arguments);
										},
										createContent : function() {

											var mConfig = this.getMetadata()
													.getConfig();
											var appPath = $.sap
													.getModulePath(appName);
											var i18nModel = new sap.ui.model.resource.ResourceModel(
													{
														bundleUrl : appPath
																+ '/'
																+ mConfig.resourceBundle,
														bundleLocale : sap.ui
																.getCore()
																.getConfiguration()
																.getLanguage()
																.split('-')[0]
													// aus
													// "de-DE"
													// =>
													// "de"
													});
											this.setModel(i18nModel, "i18n");

											var oModel = new sap.ui.model.odata.ODataModel(
													mConfig.serviceUrl, {
														json : true
													});
											oModel
													.setDefaultCountMode(sap.ui.model.odata.CountMode.None); // fragt
											// mit
											// $count
											// nicht
											// mehr
											oModel
													.setDefaultBindingMode("TwoWay");
											oModel.setRefreshAfterChange(false);

											oModel
													.attachRequestFailed(function(
															er) {
														MessageBox
																.show(
																		JSON
																				.parse(er
																						.getParameters().responseText).error.message.value,
																		{
																			icon : MessageBox.Icon.ERROR,
																			title : "Error"
																		});
													});
											this.setModel(oModel);

											var appProp = new sap.ui.model.json.JSONModel(
													{
														appName : appName,
														isPhone : sap.ui.Device.system.phone, // jQuery.device.is.phone
														appPath : appPath,
														appBusy : false
													// editMode:false,
													// showError:'',
													// showText:''
													});
											this.setModel(appProp, 'appProp');

											return sap.ui
													.view({ // =
														// sap.ui.core.mvc.View
														viewName : appName
																+ ".view.App",
														type : sap.ui.core.mvc.ViewType.JS,
														viewData : {
															component : this
														}
													});
										}
									});

				});
