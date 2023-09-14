using { Currency, managed, sap } from '@sap/cds/common';
using { com.mdpert.approve.carddata as cardCDS } from './carddata';

namespace com.mdpert.approve.approve;

entity Approve {
    key ID : UUID;
    wfDate          : DateTime;
    wfStatus        : String(2);
    remark          : String(200);
    acctNum         : String(20);
    approveType     : String(20);
    carddata        : Association to cardCDS.CardData on carddata.approve = $self;    
}
