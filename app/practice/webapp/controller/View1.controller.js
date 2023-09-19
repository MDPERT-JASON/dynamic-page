// sap.ui.define([
// ],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (Controller, Filter, FilterOperator, JSONModel) {
//     "use strict";

//     return Controller.extend("practice.controller.View1", {
//       onInit: function () {
//         let oComponent = this.getOwnerComponent();
//         let oModel = oComponent.getModel("account");
//         oComponent.setModel(new JSONModel, "wsfStatus")
//         let oPath = oModel.createKey('/ComCode', {
//           ID: 16
//         });

//         // let aFilter = [];

//         // let oCombobox = this.byId("myCombobox");
//         // let oBinding = oCombobox.getBinding("items");
//         // oBinding()

//         // oBinding.filter(aFilter);

//         // aFilter.push(new Filter("parent_ID"),FilterOperator.EQ,oPath.parent_ID);

//         let oWsfStatusModel = oComponent.getModel("wsfStatus");
//         oModel.read(oPath, {
//           // f    lters: aFilter,
//           urlParameters: {
//             '$expand': 'children'
//           },
//           success: function (oData) {
//             console.log('scc');
//             let oChildren = oData.children.results;
//             oWsfStatusModel.setProperty("/code", oChildren)

//           },
//           error: function (oData) {
//             console.log('err');
//             console.log(oData);
//           }
//         });
//       },
//     }
//   });





sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/json/JSONModel"

],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("practice.controller.View1", {
      onInit: function () {
        let oComponent = this.getOwnerComponent();
        let oModel = oComponent.getModel("account");
        oComponent.setModel(new JSONModel, "wsfStatus")
        let oPath = oModel.createKey('/ComCode', {
          ID: 16
        });

        // let aFilter = [];

        // let oCombobox = this.byId("myCombobox");
        // let oBinding = oCombobox.getBinding("items");
        // oBinding()

        // oBinding.filter(aFilter);

        // aFilter.push(new Filter("parent_ID"),FilterOperator.EQ,oPath.parent_ID);

        let oWsfStatusModel = oComponent.getModel("wsfStatus");
        oModel.read(oPath, {
          // f    lters: aFilter,
          urlParameters: {
            '$expand': 'children'
          },
          success: function (oData) {
            console.log('scc');
            let oChildren = oData.children.results;
            oWsfStatusModel.setProperty("/code", oChildren)

          },
          error: function (oData) {
            console.log('err');
            console.log(oData);
          }
        });
        this.getOwnerComponent().getRouter().getRoute("RouteView1").attachPatternMatched(this._onAttchMatched, this);
      },
      _onAttchMatched: function (oEvent) {
        this.getOwnerComponent().getModel("appView").setProperty("/layout", "OneColumn");
      },
      onPressNav: function (oEvent) {
        const oComponent = this.getOwnerComponent();
        let oModel = oComponent.getModel();
        // let oDetailViewModel = new JSONModel();
        // this.getOwnerComponent().setModel(oDetailViewModel, "Detail");

        let sPath = oEvent.getSource().getBindingContext().getPath();
        let oBuyDate = oModel.getProperty(sPath).buyDate;
        let oApproveAmt = oModel.getProperty(sPath).approveAmt;
        let oMmcName = oModel.getProperty(sPath).mmcName;
        let oVenderName = oModel.getProperty(sPath).venderName;
        // let oSelectedKey = this.getView().byId("myAccountComboBoxItem").getSelectedKey();
        let sAccountPath =
          oComponent.getModel("account").createKey("/AccountMaster", {
            "accountID":  oModel.getProperty(sPath).accountMaster_accountID});
        let oAccount=oComponent.getModel("account").getProperty(sAccountPath);


        let oDetailModel = oComponent.getModel("Detail");
        oDetailModel.setProperty("/buyDate", oBuyDate);
        oDetailModel.setProperty("/approveAmt", oApproveAmt);
        oDetailModel.setProperty("/mmcName", oMmcName);
        oDetailModel.setProperty("/venderName", oVenderName);
        oDetailModel.setProperty("/accountID", oAccount.accountID);
        oDetailModel.setProperty("/accountName", oAccount.accountName);
        let sId = oModel.getProperty(sPath).ID;
        let sId2 = oModel.getProperty(sPath).accountMaster_accountID;
        // oModel.setProperty("/sPath", sPath);
        // let accountMaster = oModel.getProperty(sPath).mas 
        this.getOwnerComponent().getRouter().navTo("Detail", {
          layout: 'TwoColumnsMidExpanded',
          objectId: sId,
          objectId2: sId2
        });
      }
    });
  })