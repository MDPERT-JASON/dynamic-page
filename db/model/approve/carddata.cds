using { Currency, managed, sap } from '@sap/cds/common';
using { com.mdpert.common.account as accountCDS } from '../common/accountMaster';
using { com.mdpert.approve.approve as approveCDS } from './approve';

namespace com.mdpert.approve.carddata;


entity CardData {
    key ID                      : UUID;
    gubun                       : String(10);
    approveDate                 : String(10);
    approveTime                 : String(8); 
    buyDate                     : String(10);
    changeDate                  : String(10);
    cardNum                     : String(120);
    approveNum                  : String(10);
    delDate                     : String(10);
    currency                    : Currency;
    approveAmt                  : Decimal;
    tax                         : Decimal;
    serviceCharge               : Decimal;
    approveTotal                : Decimal;
    buyCollectionNum            : String(20);
    installmentMonth            : String(2);
    remainInstallmentMonth      : String(2);
    venderNum                   : String(20);
    abroadUse                   : String(2);
    abroadCurrency              : Currency;
    venderTaxNum                : String(20);
    venderName                  : String(200);
    venderPerson                : String(20);
    venderTel                   : String(20);
    venderAddress1              : String(50);
    venderAddress2              : String(50);
    venderCloseInfo             : String(10);
    mmcCode                     : String(8);
    venderZipCode               : String(10);
    mmcName                     : String(50);
    actualPlaceAmt              : Decimal;
    taxGubun                    : String(2);
    taxGubunName                : String(50);
    updateDateTime              : DateTime;
    accountMaster   : Association to one accountCDS.AccountMaster;
    approve         : Association to one approveCDS.Approve
}

