using { com.mdpert.common.account as accountCDS } from '../../../db/model/common/accountMaster';
using { com.mdpert.common.masterCode as mastercodeCDS } from '../../../db/model/common/masterCode';


service accountService 
{ 
  entity AccountMaster as projection on accountCDS.AccountMaster;
  entity AccountSpec   as projection on accountCDS.AccountSpec;


  entity ComCode   as projection on mastercodeCDS.ComCode;

}
