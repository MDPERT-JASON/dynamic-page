using { Currency, managed, sap } from '@sap/cds/common';
namespace com.mdpert.common.account;

entity AccountMaster {
    key accountID : String(20);
    accountName : String(100);
    accountSpec : Composition of many AccountSpec
                             on accountSpec.accountMaster = $self;
}

entity AccountSpec {
    key ID : UUID;
    accountMaster : Association to AccountMaster;
    label : String(200);
    groupType: String(10);
    mandatory : String(2);
    readonly : String(2);
    componetType : String(10) enum { text; input; combobox; datePicker; dateRange;};
    dataType : String(10) enum { text; numeric; json; date;};
    displayType : String(10) enum { row; section2;};
    displayValue: String(2000);
    sortNo: Int16;
}

entity Genres : sap.common.CodeList { 
  key ID   : Integer;
  parent   : Association to Genres;
  children : Composition of many Genres on children.parent = $self;
}
