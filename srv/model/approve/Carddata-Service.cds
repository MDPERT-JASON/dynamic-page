using { com.mdpert.approve.carddata as carddata } from '../../../db/model/approve/carddata';
using { com.mdpert.approve.approve as approve } from '../../../db/model/approve/approve';

service CarddataService 
{
  entity CardData as projection on carddata.CardData;
  entity Approve as projection on approve.Approve;
}
