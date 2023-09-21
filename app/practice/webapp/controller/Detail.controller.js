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
    "sap/ui/layout/GridData",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, ListItem,
        UIColumn, Label, Text, Input, ComboBox, HBox, VBox,
        DatePicker, DateRangeSelection, cTitle, SimpleForm, GridData, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("practice.controller.Detail", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter().getRoute("Detail");
                oRouter.attachMatched(this._getRoutedMatched, this);
                // let oView = this.getView();
                // let oContentVBox = oView.byId("contentVBox");
                // let oDetailModel = this.getOwnerComponent().getModel("Detail");

                // // let sKey = 

                // let oModel = this.getOwnerComponent().getModel("account");
                // let oPath = oModel.createKey('/AccountMaster', {
                //     "accountID": sKey
                // });
                // this._createDetailForm(oModel, oPath, oDetailModel, oContentVBox);


            },
            _getRoutedMatched: function (oEvent) {
                // let oComponent = this.getOwnerComponent();
                // let oModel = oComponent.getModel("account");
                let oAppViewModel = this.getOwnerComponent().getModel("appView");
                // let oDetailModel = this.getOwnerComponent().getModel("Detail");
                let oView = this.getView();

                let cardID = oEvent.getParameter("arguments")['objectId']; this.getOwnerComponent().getModel("Detail").setProperty("/ID", cardID)
                let accountID = oEvent.getParameter("arguments")['objectId2'];
                let sLayout = oEvent.getParameter("arguments")['layout'];


                oAppViewModel.setProperty("/layout", sLayout);

                if (sLayout === "Detail") {
                    oAppViewModel.setProperty("/objectId", cardID);
                    oAppViewModel.setProperty("/objectId2", accountID);
                }
                else
                    accountID = oView.byId("myAccountComboBox").getSelectedItemId();
                if (oAppViewModel.getProperty("/layout") !== "MidColumnFullScreen") {
                    this.byId("exitFullButton").setVisible(false);
                    this.byId("fullButton").setVisible(true);
                }
                else {
                    this.byId("exitFullButton").setVisible(true);
                    this.byId("fullButton").setVisible(false);
                }

                // let oPath = oModel.createKey('/AccountMaster', {
                //     "accountID": accountID
                // });
                // oModel.read(oPath, {
                //     urlParameters: {
                //         '$expand': 'accountSpec'
                //     },

                //     success: function (oData) {

                //         oDetailModel.setProperty("/Name", oData.accountName);

                //         let oResults = oData.accountSpec.results
                //         let oResultGroupByType = oResults.reduce(function (acc, obj) {
                //             let { groupType } = obj;
                //             acc[groupType] = acc[groupType] ?? []
                //             acc[groupType].push(obj);
                //             return acc;
                //         }, {});

                //         let tempArray = []
                //         let resultArray = []
                //         for (let i = 0; i < oResults.length; i++) {
                //             let item = oResults[i]
                //             if (tempArray.includes(item["groupType"])) {
                //                 continue
                //             }
                //             else {
                //                 resultArray.push(item.groupType)
                //                 tempArray.push(item["groupType"])
                //             }
                //         }
                //         for (let i = 0; i < resultArray.length; i++) {
                //             let oGroup = oResultGroupByType[resultArray[i]]
                //             let simpleFormItems = [];
                //             let oItem = []
                //             oGroup.forEach(function (item) {
                //                 if (item.componetType == "text") {
                //                     oItem = [
                //                         new Label({
                //                             text: item.label + ":"
                //                         }),
                //                         new Text({
                //                             text: item.dataType == 'text' ? item.displayValue : "",
                //                             width: "100%"
                //                         })
                //                     ]
                //                 }
                //                 else if (item.componetType == "input") {
                //                     oItem = [
                //                         new Label({
                //                             text: item.label
                //                         }),
                //                         new Input({
                //                             value: item.dataType == 'text' ? item.displayValue : "",
                //                             width: "100%",
                //                             required: item.mandatory === 'Y' ? true : false
                //                         })
                //                     ]
                //                 }
                //                 else if (item.componetType == "combobox") {
                //                     oItem = [
                //                         new Label({
                //                             text: item.label
                //                         }),
                //                         new ComboBox({
                //                             width: "100%",
                //                             required: item.mandatory === 'Y' ? true : false
                //                         })
                //                     ]
                //                 }
                //                 else if (item.componetType == "datePicker") {
                //                     oItem = [
                //                         new Label({
                //                             text: item.label
                //                         }),
                //                         new DatePicker({
                //                             width: "100%",
                //                             required: item.mandatory === 'Y' ? true : false
                //                         })
                //                     ]
                //                 }
                //                 else if (item.componetType == "dateRange") {
                //                     oItem = [
                //                         new Label({
                //                             text: item.label

                //                         }),
                //                         new DateRangeSelection({
                //                             width: "100%",
                //                             required: item.mandatory === 'Y' ? true : false
                //                         })
                //                     ]
                //                 }
                //                 if (item.displayType === "row") {
                //                     let oHBox = new HBox({
                //                         items: oItem,
                //                         alignItems: "Center",
                //                         width: "100%",
                //                         layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                //                     })
                //                     simpleFormItems.push(oHBox)
                //                 }
                //                 else {
                //                     let oVBox = new VBox({
                //                         items: oItem,
                //                         width: "100%",
                //                         layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                //                     })
                //                     simpleFormItems.push(oVBox)
                //                 }
                //             }.bind(this));

                //             let oSimpleForm = new SimpleForm({
                //                 maxContainerCols: 2,
                //                 editable: true,
                //                 layout: "ResponsiveGridLayout",
                //                 adjustLabelSpan: false,
                //                 labelSpanL: 4,
                //                 labelSpanM: 4,
                //                 emptySpanL: 0,
                //                 emptySpanM: 0,
                //                 columnsL: 2,
                //                 columnsM: 2,
                //                 title: resultArray[i],
                //                 content: simpleFormItems
                //             });
                //             oContentVBox.addItem(oSimpleForm)
                //         }
                //     },
                //     error: function (oError) {
                //         try {
                //             console.group("Read Detail");
                //             console.log("error");
                //             console.log(oError);
                //             console.groupEnd();
                //         } finally {
                //             oView.setBusy(false);
                //         }
                //     }
                // });

            },
            onNavBack: function () {
                this.getOwnerComponent().getRouter().navTo("RouteView1")
            },
            onPressFull: function () {
                this.getOwnerComponent().getModel("appView").setProperty("/layout", "MidColumnFullScreen");
                this.byId("exitFullButton").setVisible(true);
                this.byId("fullButton").setVisible(false);
            },
            onExitFull: function () {
                this.getOwnerComponent().getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                this.byId("exitFullButton").setVisible(false);
                this.byId("fullButton").setVisible(true);
            },
            _createDetailForm: function (oModel, oPath, oContentVBox) {
                // oDetailModel.getProperty("selectedAccountID")
                //   let  oCardModel = this.getOwnerComponent().getModel();
                // oCardModel.createKey("/CardData",{"accountMaster_accountID": })
                // oCardModel.read();

                // oModel.getProperty("/accountID")
                let oCardOData;
                let sCardID = this.getOwnerComponent().getModel("Detail").getProperty("/ID")

                let sPath = this.getOwnerComponent().getModel().createKey("/CardData", {
                    "ID": this.getOwnerComponent().getModel("Detail").getProperty("/ID")
                });
                // this.getOwnerComponent().getModel().read("/CardData",
                //     {
                //         // success: function (oData) { oCardOData = oData; console.log('succ'); console.log(oData) },
                //         // error: function () { console.log('err') }
                //         filters: [
                //             new Filter({
                //                 path: "ID",
                //                 operator: FilterOperator.EQ,
                //                 value1: sCardID
                //             })
                //         ],
                //         success: function () { console.log(1) },
                //         error: function () { try { console.log(2) } catch (err) { console.error(err) } }
                //     }
                // );
                this.getOwnerComponent().getModel().read(sPath,
                    {
                        // success: function (oData) { oCardOData = oData; console.log('succ'); console.log(oData) },
                        // error: function () { console.log('err') }
                       success: function (oData) { console.log(1); oCardOData=oData },
                        error: function () { try { console.log(2) } catch (err) { console.error(err) } }
                    }
                );

                // this.getOwnerComponent().getModel().getProperty("/accountID");
                // this.getOwnerComponent().getModel().read()

                oModel.read(oPath, {
                    urlParameters: {
                        '$expand': 'accountSpec'
                    },

                    success: function (oData) {

                        // oDetailModel.setProperty("/Name", oData.accountName);

                        let oResults = oData.accountSpec.results
                        let oResultGroupByType = oResults.reduce(function (acc, obj) {
                            let { groupType } = obj;
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
                        for (let i = 0; i < resultArray.length; i++) {
                            let oGroup = oResultGroupByType[resultArray[i]]
                            let simpleFormItems = [];
                            let oItem = []
                            oGroup.forEach(function (item) {
                                if (item.componetType == "text") {
                                    oItem = [
                                        new Label({
                                            text: item.label + ":"
                                        }),
                                        new Text({
                                            text: item.dataType == 'text' ? item.displayValue : "",
                                            width: "100%"
                                        })
                                    ]
                                }
                                else if (item.componetType == "input") {
                                    oItem = [
                                        new Label({
                                            text: item.label
                                        }),
                                        new Input({
                                            value: item.dataType == 'text' ? item.displayValue : "",
                                            width: "100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if (item.componetType == "combobox") {
                                    oItem = [
                                        new Label({
                                            text: item.label
                                        }),
                                        new ComboBox({
                                            width: "100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if (item.componetType == "datePicker") {
                                    oItem = [
                                        new Label({
                                            text: item.label
                                        }),
                                        new DatePicker({
                                            width: "100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                else if (item.componetType == "dateRange") {
                                    oItem = [
                                        new Label({
                                            text: item.label

                                        }),
                                        new DateRangeSelection({
                                            width: "100%",
                                            required: item.mandatory === 'Y' ? true : false
                                        })
                                    ]
                                }
                                if (item.displayType === "row") {
                                    let oHBox = new HBox({
                                        items: oItem,
                                        alignItems: "Center",
                                        width: "100%",
                                        layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                                    })
                                    simpleFormItems.push(oHBox)
                                }
                                else {
                                    let oVBox = new VBox({
                                        items: oItem,
                                        width: "100%",
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
                                title: resultArray[i],
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
            onClickForm: function (oEvent) {
                let oSelectedItem = oEvent.getParameter("selectedItem");
                let oView = this.getView();
                let oContentVBox = oView.byId("contentVBox");
                oContentVBox.destroyItems();

                if (oSelectedItem) {
                    let sKey = oSelectedItem.getKey();
                    let sText = oSelectedItem.getText();

                    console.log("Selected Key:", sKey);
                    console.log("Selected Text:", sText);

                    let oDetailModel = this.getOwnerComponent().getModel("Detail");
                    // oDetailModel.setProperty("/clickedAccountID", sKey);
                    // oDetailModel.setProperty("/clickedAccountName", sText);

                    let oModel = this.getOwnerComponent().getModel("account");
                    let oPath = oModel.createKey('/AccountMaster', {
                        "accountID": sKey
                    });
                    this._createDetailForm(oModel, oPath, oContentVBox);
                    // oModel.read(oPath, {
                    //     urlParameters: {
                    //         '$expand': 'accountSpec'
                    //     },

                    //     success: function (oData) {

                    //         oDetailModel.setProperty("/Name", oData.accountName);

                    //         let oResults = oData.accountSpec.results
                    //         let oResultGroupByType = oResults.reduce(function (acc, obj) {
                    //             let { groupType } = obj;
                    //             acc[groupType] = acc[groupType] ?? []
                    //             acc[groupType].push(obj);
                    //             return acc;
                    //         }, {});

                    //         let tempArray = []
                    //         let resultArray = []
                    //         for (let i = 0; i < oResults.length; i++) {
                    //             let item = oResults[i]
                    //             if (tempArray.includes(item["groupType"])) {
                    //                 continue
                    //             }
                    //             else {
                    //                 resultArray.push(item.groupType)
                    //                 tempArray.push(item["groupType"])
                    //             }
                    //         }
                    //         for (let i = 0; i < resultArray.length; i++) {
                    //             let oGroup = oResultGroupByType[resultArray[i]]
                    //             let simpleFormItems = [];
                    //             let oItem = []
                    //             oGroup.forEach(function (item) {
                    //                 if (item.componetType == "text") {
                    //                     oItem = [
                    //                         new Label({
                    //                             text: item.label + ":"
                    //                         }),
                    //                         new Text({
                    //                             text: item.dataType == 'text' ? item.displayValue : "",
                    //                             width: "100%"
                    //                         })
                    //                     ]
                    //                 }
                    //                 else if (item.componetType == "input") {
                    //                     oItem = [
                    //                         new Label({
                    //                             text: item.label
                    //                         }),
                    //                         new Input({
                    //                             value: item.dataType == 'text' ? item.displayValue : "",
                    //                             width: "100%",
                    //                             required: item.mandatory === 'Y' ? true : false
                    //                         })
                    //                     ]
                    //                 }
                    //                 else if (item.componetType == "combobox") {
                    //                     oItem = [
                    //                         new Label({
                    //                             text: item.label
                    //                         }),
                    //                         new ComboBox({
                    //                             width: "100%",
                    //                             required: item.mandatory === 'Y' ? true : false
                    //                         })
                    //                     ]
                    //                 }
                    //                 else if (item.componetType == "datePicker") {
                    //                     oItem = [
                    //                         new Label({
                    //                             text: item.label
                    //                         }),
                    //                         new DatePicker({
                    //                             width: "100%",
                    //                             required: item.mandatory === 'Y' ? true : false
                    //                         })
                    //                     ]
                    //                 }
                    //                 else if (item.componetType == "dateRange") {
                    //                     oItem = [
                    //                         new Label({
                    //                             text: item.label

                    //                         }),
                    //                         new DateRangeSelection({
                    //                             width: "100%",
                    //                             required: item.mandatory === 'Y' ? true : false
                    //                         })
                    //                     ]
                    //                 }
                    //                 if (item.displayType === "row") {
                    //                     let oHBox = new HBox({
                    //                         items: oItem,
                    //                         alignItems: "Center",
                    //                         width: "100%",
                    //                         layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                    //                     })
                    //                     simpleFormItems.push(oHBox)
                    //                 }
                    //                 else {
                    //                     let oVBox = new VBox({
                    //                         items: oItem,
                    //                         width: "100%",
                    //                         layoutData: new GridData({ span: "XL4 L4 M5 S10" })
                    //                     })
                    //                     simpleFormItems.push(oVBox)
                    //                 }
                    //             }.bind(this));

                    //             let oSimpleForm = new SimpleForm({
                    //                 maxContainerCols: 2,
                    //                 editable: true,
                    //                 layout: "ResponsiveGridLayout",
                    //                 adjustLabelSpan: false,
                    //                 labelSpanL: 4,
                    //                 labelSpanM: 4,
                    //                 emptySpanL: 0,
                    //                 emptySpanM: 0,
                    //                 columnsL: 2,
                    //                 columnsM: 2,
                    //                 title: resultArray[i],
                    //                 content: simpleFormItems
                    //             });
                    //             oContentVBox.addItem(oSimpleForm)
                    //         }
                    //     },
                    //     error: function (oError) {
                    //         try {
                    //             console.group("Read Detail");
                    //             console.log("error");
                    //             console.log(oError);
                    //             console.groupEnd();
                    //         } finally {
                    //             oView.setBusy(false);
                    //         }
                    //     }
                    // });
                }



            }
        });
    });
