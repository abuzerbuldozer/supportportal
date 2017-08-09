
//	sap.ui.define(['sap/m/MessageBox','sap/ui/model/Filter'], function(MessageBox,Filter) {
//	"use strict";
//	var appName = "a41s.go.test1";
//	return sap.ui.controller(appName+".view.Master", {
//		onListItemPress:function(ev){
//			
////			var listitem = ev.getParameters.listItem;
//		},
//		buttonpress:function(){
//			var Route = sap.ui.core.UIComponent.getRouterFor(this);
//			Route.navTo("goHelp");
//		},
//		handleLinkPress: function (evt) {
//			jQuery.sap.require("sap.m.MessageBox"); 
//			MessageBox.alert(('Id'));
//		},	
//		onNavBack : function (sRoute, mData) {
//			var prevHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
//			if (prevHash !== undefined) {
//				window.history.back();
//			} else {
//				window.location = '#';
//			}
//		}	
//
//	});
//});

sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	'sap/ui/model/json/JSONModel',
	'sap/ui/commons/ComboBox',
	'sap/m/MessageToast',
	"sap/m/HBox"
], function(jQuery, Controller, Filter, Sorter, JSONModel,ComboBox, MessageToast) {
	"use strict";
	var appName = "a41s.go.test1";
	return sap.ui.controller(appName+".view.Master", {
		onInit: function () {
		var sServiceUrl = "proxy/http/a41103.sapprd.all-for-one.net:8800/sap/opu/odata/sap/Z_TICKET_SEARCH_SRV/";
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);  
		
		
		var oJsonModel = new sap.ui.model.json.JSONModel();
 		
		
//		oModel.read("/ticket_s",null,null,true,function(oData,repsonse){oJsonModel.setData(oData)});
		sap.ui.getCore().setModel(oJsonModel); 
		this.getView().setModel(oModel); 
		this._sorter = new sap.ui.model.Sorter("Id", false); 
		
			this.aKeys = ["Id", "Name", "Surname"];
			this.oSelectName = this.getSelect("slId");
			this.oSelectCategory = this.getSelect("slName");
			this.oSelectSupplierName = this.getSelect("slSurname");
//			this.oModel.setProperty("/Filter/text", "Filtered by None");
//			this.addSnappedLabel();
		},
		
		doReload : function(aFilters) {
		    var oTable = this.byId("idProductsTable");
		    var oBinding = oTable.getBinding("items");
		    oBinding.filter(aFilters);
		},

		onReset : function(oEvent) {
		    this.doReload();
		},

		onSearch : function(oEvt) {
		    var oFilterBar = oEvt.getSource(), aFilters = [];
		    aFilters = oEvt.getParameter("selectionSet");
		    this.doReload(aFilters);
		},
  
		onSortID: function(){ 
			this._sorter.bDescending =!this._sorter.bDescending;
			this.byId("idProductsTable").getBinding("items").sort(this._sorter);
			},
		onExit: function () {
			this.aKeys = [];
			this.aFilters = [];
			this.oModel = null;
		}, 
		onSelectChange: function() {
//			var id =  this.oSelectName.getSelectedItem().getText();
//			var filter = new sap.ui.model.Filter("Id", sap.ui.model.FilterOperator.EQ, id);
//			this.getTableItems().filter([filter]);
//			return;
//			var aCurrentFilterValues = [];
// 
//			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
//			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
//			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));
// 
//			this.filterTable(aCurrentFilterValues);
		},
 
		filterTable: function (aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
			this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
		},
 
		updateFilterCriterias : function (aFilterCriterias) {
			this.removeSnappedLabel(); /* because in case of label with an empty text, */
			this.addSnappedLabel(); /* a space for the snapped content will be allocated and can lead to title misalignment */
//			this.oModel.setProkperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
		},
 
//		addSnappedLabel : function() {
//			var oSnappedLabel = this.getSnappedLabel();
//			oSnappedLabel.attachBrowserEvent("click", this.onToggleHeader, this);
//			this.getPageTitle().addSnappedContent(oSnappedLabel);
//		},
 
//		removeSnappedLabel : function() {
//			this.getPageTitle().destroySnappedContent();
//		},
 
		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];
 
			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new sap.ui.model.Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});
 
			return this.aFilters;
		},
		getFilterCriteria : function (aCurrentFilterValues){
			return this.aKeys.filter(function (el, i) {
				if (aCurrentFilterValues[i] !== "") return  el;
			});
		},
		getFormattedSummaryText : function (aFilterCriterias) {
			if (aFilterCriterias.length > 0) {	
				return "Filtered by (" + aFilterCriterias.length + "): " + aFilterCriterias.join(", ");
			} else {
				return "Filtered by None";
			}
		},
 
		getTable : function () {
			return this.getView().byId("idProductsTable");
		},
		getTableItems : function () {
			return this.getTable().getBinding("items");
		},
		getSelect : function (sId) {
			return this.getView().byId(sId);
		},
		getSelectedItemText : function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getText() : ""; 
		},
		getPage : function() {
			return this.getView().byId("dynamicPageId");
		},
		getPageTitle: function() {
			return this.getPage().getTitle();
		},
		getSnappedLabel : function () {
			return new sap.m.Label({text: "{/Filter/text}"});
		},
		
		handleSuchen : function (oEvent) {   		
			   var filter = ""; 
			   var filters = [""];
		       var sTerm;  
		       var SType;
		       var aCurrentFilterValues = [];
		       
		       
		       for(var i = 0; i < count; i++ ){
		    	   
		    	var x= i+1;
		       
		       sTerm = this.getView().byId('Input' + x).getValue(); 
		       SType = this.getView().byId("SearchType"+x);
		       
		       if ( SType.getSelectedKey() == "Id" ) {
		       filter = new sap.ui.model.Filter("ObjectId", sap.ui.model.FilterOperator.EQ, sTerm); 
		} else if ( SType.getSelectedKey() == "Pr" ) {
		filter = new sap.ui.model.Filter("Priority", sap.ui.model.FilterOperator.EQ, sTerm);
		} else if ( SType.getSelectedKey() == "Cp" ) {
		filter = new sap.ui.model.Filter("CompanyNr", sap.ui.model.FilterOperator.EQ, sTerm); 
		}   
		       //	filters.push(filter); 
		       filters[i] = filter;

		//return;			
	
		       }

		      // aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));  
		       
		       if (filters[0].oValue1 == "" ){
	            this.getTableItems().filter([filter]);
		       } else {
		    	   this.getTableItems().filter(filters);
		       }

		},
		onSearch : function (ev) {
			var filter, filters = [];
			var query = ev.getParameter("query");
			if (query && query.length > 0) {
				var SType = this.getView().byId("SearchType"); 

				if ( SType.getSelectedKey() == "Id" ) {
					filter = new sap.ui.model.Filter("ObjectId", sap.ui.model.FilterOperator.EQ, query);
				} else if ( SType.getSelectedKey() == "Pr" ) {
					filter = new sap.ui.model.Filter("Priority", sap.ui.model.FilterOperator.EQ, query);
				} else if ( SType.getSelectedKey() == "Cp" ) {
					filter = new sap.ui.model.Filter("CompanyNr", sap.ui.model.FilterOperator.EQ, query);					
				}  else 
				
				filters.push(filter); 
			} else {
				filter = new sap.ui.model.Filter("ObjectId", sap.ui.model.FilterOperator.EQ, query);
				return;
			}
            
			//return;
			//var aCurrentFilterValues = [];

			//aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));   
			this.getTableItems().filter([filters]);
		},
		
		onAdd : function (ev) {
			

			count++;
			
			var me = this;
			var grid = this.byId('verticalLayout');
			//var dynamicPageId =  this.byId('dynamicPageId');
			var toolbar = new sap.m.Toolbar('testToolbar'+count);
			var selectList = new sap.m.Select(this.createId("SearchType"+count) );
			var oListItem1 = new sap.ui.core.Item({
				key : "Id" ,
				text : "Incident ID"
			});
			var oListItem2 = new sap.ui.core.ListItem({
				key : "Pr" ,
				text : "Priority"
			});
			var oListItem3 = new sap.ui.core.ListItem({
				key : "Cp" ,
				text : "Company Number"
			});
			selectList.addItem(oListItem1);
			selectList.addItem(oListItem2);
			selectList.addItem(oListItem3);
			
			//testSearchType.addItem( new sap.ui.core.Item('"key":"Id";"text":"Incident ID"') );
			
			var inputField = new sap.m.Input( this.createId("Input" + count) );
			var testButtonAdd = new sap.m.Button('ButtonAdd'+count,{icon : "sap-icon://add" , press:[this.onAdd,this]});
			var testButtonDelete = new sap.m.Button('ButtonRemove'+count,{icon : "sap-icon://delete",press:[this.onCancel,this]}).data("ordernum",count);
			
			toolbar.addContent(selectList);	
			toolbar.addContent(inputField);
			toolbar.addContent(testButtonAdd); 
			toolbar.addContent(testButtonDelete);
			grid.addContent(toolbar);
			//dynamicPageId.addContent(toolbar );
			//toolbar.placeAt("a41s.go.test1");

			
			
			
		},
		
		onCancel : function (ev) {
			
			var grid = this.byId('verticalLayout'); 
			var rowToDelete = ev.getSource().data('ordernum');
			var objectIdToDelete = "testToolbar" + rowToDelete;
			var objectToDelete = sap.ui.getCore().byId( objectIdToDelete );
			grid.removeContent(objectToDelete);
			
		}
	});
});
