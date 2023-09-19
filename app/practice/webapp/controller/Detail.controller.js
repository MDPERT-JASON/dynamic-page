sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",		
    "sap/m/MessageToast",
    "sap/ui/core/ListItem",
    "sap/ui/table/Column",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/ComboBox",
    "sap/m/HBox",
    "sap/m/VBox",
    "sap/m/DatePicker",
    "sap/m/DateRangeSelection",
    "sap/ui/core/Title",
    "sap/ui/layout/form/SimpleForm",
    "sap/ui/layout/GridData"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, ListItem, 
            UIColumn, Label, Text, Input, ComboBox, HBox, VBox, 
            DatePicker, DateRangeSelection, cTitle, SimpleForm, GridData) {
        "use strict";

        return Controller.extend("practice.controller.Detail", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter().getRoute("Detail");
                oRouter.attachMatched(this._getRoutedMatched,this);
                
            },
            _getRoutedMatched : function(oEvent){
                let sObjId = oEvent.getParameter("arguments")['objectId'];
                let sId = oEvent.getParameter("arguments")['objectId2'];
                let sLayout = oEvent.getParameter("arguments")['layout'];
                let oView = this.getView()
                let oContentVBox = oView.byId("contentVBox");
                // oContentVBox.destroyItems()
                let oAppViewModel = this.getOwnerComponent().getModel("appView");
                let oModel = this.getOwnerComponent().getModel("account");
                let oDetailModel = this.getOwnerComponent().getModel("Detail");
                oAppViewModel.setProperty("/layout", sLayout);
                oAppViewModel.setProperty("objectId",sObjId);
                oAppViewModel.setProperty("objectId2",sId);
                if (oAppViewModel.getProperty("/layout") !== "MidColumnFullScreen") {
                    this.byId("exitFullButton").setVisible(false);
                    this.byId("fullButton").setVisible(true);
                }
                else{
                    this.byId("exitFullButton").setVisible(true);
                    this.byId("fullButton").setVisible(false);
                }
      
                let oPath = oModel.createKey('/AccountMaster', {
                    accountID: sId
                });
                oModel.read(oPath, {
                    urlParameters: {
                        '$expand' : 'accountSpec'                    
                    },
 
                    success: function (oData) {
               
                        oDetailModel.setProperty("/Name", oData.accountName);
                    
                        let oResults = oData.accountSpec.results
                        let oResultGroupByType = oResults.reduce(function(acc, obj){
                            let {groupType} = obj;
                            acc[groupType] = acc[groupType] ?? [] 
                            acc[groupType].push(obj);
                            return acc;
                          }, {});
                        
                        let tempArray = []
                        let resultArray = []
                        for (let i = 0; i < oResults.length; i++) {
                            let item = oResults[i]
                            if (tempArray.includes(item["groupType"])) {
                                continue
                            } 
                            else {
                                resultArray.push(item.groupType)
                                tempArray.push(item["groupType"])
                            }
                        }
                        for(let i = 0; i<resultArray.length;i++){
                            let oGroup = oResultGroupByType[resultArray[i]]
                            let simpleFormItems = [];
                            let oItem = []
                            oGroup.forEach(function(item){
                                if(item.componetType == "text"){
                                    oItem = [
                                        new Label({
                                            text : item.label + ":"
                                        }),
                                        new Text({
                                            text : item.dataType == 'text' ? item.displayValue : "",
                                            width:"100%"
                                        })
                                    ]
                                }
                                else if(item.componetType == "input"){
                                    oItem = [
                                        new Label({
                                            text : item.label 
                                        }),
                                        new Input({
                                            value : item.dataType == 'text' ? item.displayValue : "",
                                            width:"100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if(item.componetType == "combobox"){
                                    oItem = [
                                        new Label({
                                            text : item.label
                                        }),
                                        new ComboBox({
                                            width:"100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if(item.componetType == "datePicker"){
                                    oItem = [
                                        new Label({
                                            text : item.label
                                        }),
                                        new DatePicker({
                                            width:"100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if(item.componetType == "dateRange"){
                                    oItem = [
                                        new Label({
                                            text : item.label
                                            
                                        }),
                                        new DateRangeSelection({
                                            width:"100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                if(item.displayType === "row"){
                                    let oHBox = new HBox({
                                        items : oItem,
                                        alignItems : "Center",
                                        width:"100%",
                                        layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                                    })
                                    simpleFormItems.push(oHBox)
                                }
                                else{
                                    let oVBox = new VBox({
                                        items : oItem,
                                        width:"100%",
                                        layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                                    })
                                    simpleFormItems.push(oVBox)
                                }
                            }.bind(this));

                            let oSimpleForm = new SimpleForm({
                                maxContainerCols: 2,
                                editable: true,
                                layout: "ResponsiveGridLayout",
                                adjustLabelSpan: false,
                                labelSpanL: 4,
                                labelSpanM: 4,
                                emptySpanL: 0,
                                emptySpanM: 0,
                                columnsL: 2,
                                columnsM: 2,
                                title : resultArray[i],
                                content: simpleFormItems
                            });
                            oContentVBox.addItem(oSimpleForm)
                        }
                    },
                    error: function (oError) {
                        try {                            
                            console.group("Read Detail");
                            console.log("error");
                            console.log(oError);
                            console.groupEnd();
                        } finally {
                            oView.setBusy(false);              
                        }
                    }
                });
            },
            onNavBack : function(){
                this.getOwnerComponent().getRouter().navTo("RouteView1")
            },
            onPressFull : function(){
                this.getOwnerComponent().getModel("appView").setProperty("/layout", "MidColumnFullScreen");
                this.byId("exitFullButton").setVisible(true);
                this.byId("fullButton").setVisible(false);
            },
            onExitFull : function(){
                this.getOwnerComponent().getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                this.byId("exitFullButton").setVisible(false);
                this.byId("fullButton").setVisible(true);
            }
        });
    });
