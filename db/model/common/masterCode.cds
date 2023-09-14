using { Currency, managed, sap } from '@sap/cds/common';
namespace com.mdpert.common.masterCode;

entity MasterCode {
    key masterCode : String(50);
    masterName : String(100);
    remark : String(100);
    status : String(1);
}



entity SubCode {
    key masterCode : String(50);
    key subCode : String(100);
    subName : String(100);
    sortOrder : Int16;
    remark : String(100);
    status : String(1);
}

entity ComCode : sap.common.CodeList {
  key ID   : Integer;
  parent   : Association to ComCode;
  code     : String(100);
  children : Composition of many ComCode on children.parent = $self;
}
