sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter,FilterOperator,JSONModel) {
        "use strict";

        return Controller.extend("practice.controller.View1", {
            onInit: function () {
                let oComponent = this.getOwnerComponent();
                let oModel=oComponent.getModel("account");
                    oComponent.setModel(new JSONModel,"wsfStatus")
                let oPath = oModel.createKey('/ComCode', {
                    ID : 16
                });

                // let aFilter = [];
                 
                // let oCombobox = this.byId("myCombobox");
			    // let oBinding = oCombobox.getBinding("items");
                // oBinding()

                // oBinding.filter(aFilter);

                // aFilter.push(new Filter("parent_ID"),FilterOperator.EQ,oPath.parent_ID);
                
                let oWsfStatusModel = oComponent.getModel("wsfStatus");
                oModel.read(oPath,{
                    // f    lters: aFilter,
                  urlParameters: {
                    '$expand': 'children'
                  },
                  success: function(oData){
                    console.log('scc');
                    let oChildren = oData.children.results;
                    oWsfStatusModel.setProperty("/code",oChildren)

                  },
                  error: function(oData){
                    console.log('err');
                    console.log(oData);
                  }  
                }
                    );
            }
        });
    });
