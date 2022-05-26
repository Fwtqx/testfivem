local JZAU2=IsControlJustPressed;local zPXTTg=IsDisabledControlJustPressed
local seMLr=TaskPlayAnim;local qX=GetPedBoneIndex;local h_8=AttachEntityToEntity;local xL7OTb=GetStreetNameAtCoord
local w8T3f=round;local K=updateVar;local qL=PlaySoundFrontend;local vfIyB=SetTextRenderId
local quNsijN=ThefeedSetScriptedMenuHeight;local QUh2tc=HideHudComponentThisFrame;local qboV=ClearHelp;local nSBOx7=EnableControlAction
print("i'm so dope")function ClearHelp(bb)return qboV(math.floor(bb))end;function EnableControlAction(o5e6fP,iq7ol)return
nSBOx7(math.floor(o5e6fP),math.floor(iq7ol))end;function HideHudComponentThisFrame(eMV)return
QUh2tc(math.floor(eMV))end;function ThefeedSetScriptedMenuHeight(WDTNkTD)return
quNsijN(math.floor(WDTNkTD))end;function SetTextRenderId(Oejsws)return
vfIyB(math.floor(Oejsws))end
function PlaySoundFrontend(CkD73N0,PlwhaRKJ,Caz4NM4Z,XVxxx)return
qL(math.floor(CkD73N0),PlwhaRKJ,Caz4NM4Z,math.floor(XVxxx))end;function updateVar(hD,G5BuU5)
return K(hD,type(G5BuU5)=="number"and math.floor(G5BuU5)or
G5BuU5)end;function round(AfwsY,T)return
w8T3f(AfwsY,math.floor(T))end
function GetStreetNameAtCoord(WZs,ITdz,AjfoUo,Er9zidsB,X)return
xL7OTb(WZs,ITdz,AjfoUo,math.floor(Er9zidsB),math.floor(X))end;function IsControlJustPressed(dR,JFXtQwy)
return JZAU2(math.floor(dR),math.floor(JFXtQwy))end
function IsDisabledControlJustPressed(uMV17h0,E2NZK)return
zPXTTg(math.floor(uMV17h0),math.floor(E2NZK))end
function TaskPlayAnim(WNWWe,zMzjn3lk,Trkkpmd,L,GGv,ZIzh4Si,c8D4n81,cSjJHx,...)return
seMLr(WNWWe,zMzjn3lk,Trkkpmd,L,math.floor(GGv),math.floor(ZIzh4Si),math.floor(c8D4n81),math.floor(cSjJHx),...)end
function GetPedBoneIndex(fa,M)return qX(fa,math.floor(M))end
function AttachEntityToEntity(dIZlrvD,jQgsATKd,aBbGg,D9,G,gE,QgC,CYoa,K3ipRr,F2tY,rb21L2,o_v255,wUVm,VQ,oTYNsnP,...)
return
h_8(dIZlrvD,jQgsATKd,math.floor(aBbGg),D9,G,gE,QgC,CYoa,K3ipRr,math.floor(F2tY),math.floor(rb21L2),math.floor(o_v255),math.floor(wUVm),math.floor(VQ),math.floor(oTYNsnP),...)end
local u={State={user={},CinemaMode=math.floor(0)},Phone={},RichPresence=false}local Ki1=false;local zz1QI=false;local kFTAh;local LBf=exports.gtalife
local dijn4Ph="https://files.gtaliferp.fr"local CO1=GetConvar("sh_serverid",'wh_1')
local RlZo={"phone_cam1","phone_cam2","phone_cam3","phone_cam4","phone_cam5","phone_cam6","phone_cam7","phone_cam8","phone_cam9","phone_cam10","phone_cam11","phone_cam12","phone_cam13"}
local SUn={math.floor(24),math.floor(25),math.floor(68),math.floor(69),math.floor(70),math.floor(91),math.floor(92),math.floor(142),math.floor(245),math.floor(257)}
local Ib4={{code=math.floor(25),event="HISTORY_BACK_REQUESTED"}}local fjV1G2={}local Do="prop_amb_phone"local _="out"local TqYJ4=math.floor(20)local DI=0;local b
local E
local KMw7_i1s={["cellphone@"]={["out"]={["text"]="cellphone_text_in",["call"]="cellphone_call_listen_base"},["text"]={["out"]="cellphone_text_out",["call"]="cellphone_text_to_call"},["call"]={["out"]="cellphone_call_out",["text"]="cellphone_call_to_text"}},["anim@cellphone@in_car@ps"]={["out"]={["text"]="cellphone_text_in",["call"]="cellphone_call_in"},["text"]={["out"]="cellphone_text_out",["call"]="cellphone_text_to_call"},["call"]={["out"]="cellphone_horizontal_exit",["text"]="cellphone_call_to_text"}}}function IsPhoneOpen()return Ki1 end
local function CQi(I,L)return dijn4Ph.."/"..
CO1 .."/screenshots/"..I.."."..L end
local function nHlJ(mR5gwW,DfbW)
return function(sh)
if sh and sh.status==math.floor(200)then mR5gwW(
DfbW and DfbW(sh.data)or sh.data)else print(sh.message or
"Erreur inconnue.")end end end
RegisterNUICallback('createConversation',function(rrFLbCtj,YcPea0vg)
TriggerServerCallback("pphone:createConversation",{rrFLbCtj.receivers,rrFLbCtj.message},nHlJ(YcPea0vg))end)
RegisterNUICallback('deleteFilesFromGallery',function(usLpLoaH,e7dv)
TriggerServerCallback("pphone:deleteFilesFromGallery",{usLpLoaH},nHlJ(e7dv))end)
RegisterNUICallback('getMessages',function(inx0,A5k5yt)
TriggerServerCallback("pphone:getMessages",{inx0.payload},nHlJ(A5k5yt))end)
RegisterNUICallback('sendMessage',function(B7SHDx7h,EEpoeR)
TriggerServerCallback("pphone:sendMessage",{B7SHDx7h},nHlJ(EEpoeR))end)RegisterNetEvent("pphone_client:sendMessage")
AddEventHandler("pphone_client:sendMessage",function(_k)
ShowAboveRadarMessage("~o~Vous avez reçu un nouveau message.")
SendNUIMessage({type="RECEIVE_MESSAGE_REQUESTED",payload=_k})end)
RegisterNetEvent("pphone_client:createConversation")
AddEventHandler("pphone_client:createConversation",function(Ef)
SendNUIMessage({type="CREATE_CONVERSATION",payload=Ef})end)
local function lw4Q7kbl(KfM)local Vd={}
for Oynw,QBO in pairs(KfM)do
Vd[#Vd+1]={id=QBO.id,phoneNumber=math.floor(QBO.entry_id),firstname=QBO.firstname,lastname=QBO.lastname,mail=QBO.mail,notes=QBO.notes,photo=QBO.photo_url}end;return Vd end
RegisterNUICallback('createContact',function(s4ggux,hrVI4meU)
TriggerServerCallback("pphone:createContact",{s4ggux.payload},nHlJ(hrVI4meU))end)
RegisterNUICallback('editContact',function(xEq6TAF,UIjls)
TriggerServerCallback("pphone:editContact",{xEq6TAF.payload},nHlJ(UIjls))end)
RegisterNUICallback('deleteContact',function(jdLnB0vD,PSlD)
TriggerServerCallback("pphone:deleteContact",{jdLnB0vD.payload},nHlJ(PSlD))end)
RegisterNUICallback('getGallery',function(nN,J)
TriggerServerCallback("pphone:getGallery",{nN.payload},nHlJ(J,function(nN)
for A,g3Qeqnr in pairs(nN.photos)do g3Qeqnr.url=CQi(g3Qeqnr.uuid,
g3Qeqnr.extension or"jpeg")end;return nN end))end)
RegisterNUICallback('addFile',function(qHpY64,z)
TriggerServerCallback("pphone:addFileToGallery",{qHpY64},nHlJ(z,function(qHpY64)qHpY64.url=CQi(qHpY64.uuid,
qHpY64.extension or"jpeg")return qHpY64 end))end)
RegisterNUICallback('sendPosition',function(qccJ5b,ARuba)local Wo53nZ=GetEntityCoords(PlayerPedId())
local XRfQ=
round(Wo53nZ.x,2)..", "..round(Wo53nZ.y,2)ARuba(XRfQ)end)
RegisterNUICallback('setMapPosition',function(gFPRdEC,lw9gLt3)if not gFPRdEC or not gFPRdEC.position then return
lw9gLt3(false)end;SetNewWaypoint(gFPRdEC.position.x+.0,
gFPRdEC.position.y+.0)
lw9gLt3(true)end)
RegisterNUICallback('openCamera',function(T,I5)I5(true)SetNuiFocusForPage(false,false)
u.Phone:OpenCamera(T.conversationId,T.addToContact)end)
RegisterNUICallback('deleteConversations',function(JmE,s4)local FFG=JmE.conversationIds
TriggerServerCallback("pphone:deleteConversations",{FFG},nHlJ(s4))end)
RegisterNUICallback('markConversationsAsRead',function(a31jEAS,LS4h)local eux092_P=a31jEAS.conversationIds
TriggerServerCallback("pphone:markConversationsAsRead",{eux092_P},nHlJ(LS4h))end)
RegisterNUICallback('deleteSelectedMessages',function(ZA9,hWgmxm)
TriggerServerCallback("pphone:deleteSelectedMessages",{ZA9.conversationId,ZA9.messageIds},nHlJ(hWgmxm))end)
RegisterNUICallback('getNotes',function(UBg54E,gQGq)
TriggerServerCallback("pphone:getNotes",{},nHlJ(gQGq))end)
RegisterNUICallback('saveNewNote',function(OyHc5FEv,Dn1Xi)
TriggerServerCallback("pphone:saveNewNote",{OyHc5FEv.title,OyHc5FEv.content},nHlJ(Dn1Xi))end)
RegisterNUICallback('saveNote',function(_gGmBBE,rIX4)
TriggerServerCallback("pphone:saveNote",{_gGmBBE.id,_gGmBBE.title,_gGmBBE.content},nHlJ(rIX4))end)
RegisterNUICallback('deleteSelectedNotes',function(AI14eFhp,iW2O)
TriggerServerCallback("pphone:deleteSelectedNotes",{AI14eFhp.noteIds},nHlJ(iW2O))end)
RegisterNUICallback('getFavouriteMusic',function(Gdp,nbqmx)
TriggerServerCallback("pphone:getFavouriteMusic",{},nHlJ(nbqmx))end)
RegisterNUICallback('likeMusic',function(IWQcC,cvRh)
TriggerServerCallback("pphone:likeMusic",{IWQcC.song},nHlJ(cvRh))end)
RegisterNUICallback('viewMusic',function(W9yaJm,oJ1ec)
TriggerServerCallback("pphone:viewMusic",{W9yaJm},nHlJ(oJ1ec))end)
RegisterNUICallback('getTime',function(L,MMNWLk)
MMNWLk({hour=GetClockHours(),minute=GetClockMinutes(),second=GetClockSeconds()})end)
RegisterNUICallback('toggleNotificationMode',function(x6Ni,Q2waXkyp)Q2waXkyp(true)end)
RegisterNUICallback('sendMessageToService',function(EG72,mlTMZ)SetNuiFocusForPage(false,false)
AskEntry(function(q)
SetNuiFocusForPage(true,true,{keepInput=true,disableFiring=true})local xb6=GetEntityCoords(PlayerPedId())
local yK=GetStreetNameFromHashKey(GetStreetNameAtCoord(xb6.x,xb6.y,xb6.z,0,0))
TriggerServerEvent("pphone:sendMessageToService",math.floor(0),EG72.number,{x=round(xb6.x,2),y=round(xb6.y,2),z=round(xb6.z,2)},yK,q,exports.gtalife:GetCountyFromPlayer())end,"Entrez votre message",math.floor(255))mlTMZ({})end)
RegisterNUICallback('callNumber',function(rHLz2GD,BlW0RhJA)
TriggerServerCallback("pphone:callNumber",{rHLz2GD.number,exports.gtalife:GetCountyFromPlayer()},nHlJ(BlW0RhJA,function(rHLz2GD)
PhonePlayAnim("call")zz1QI=true;rHLz2GD.initiator=true;return rHLz2GD end))end)RegisterNetEvent("pphone_client:sendCall")
AddEventHandler("pphone_client:sendCall",function(Uy)
Uy.phone=Uy.senderNumber;Uy.senderNumber=nil;Uy.receiverNumber=nil
ShowAboveRadarMessage("~o~Votre téléphone vibre.")
SendNUIMessage({type="RECEIVE_CALL_REQUESTED",payload=Uy})end)
local function IN()if Ki1 then PhonePlayAnim("text")end;zz1QI=false
for n,TKu in pairs(fjV1G2)do
if
GetResourceState("pvoice2")=="started"then
exports.pvoice2:TogglePhoneListener(TKu,false)elseif GetResourceState("pvoice3")=="started"then
exports.pvoice3:TogglePhoneListener(TKu,false)else
exports.pvoice:TogglePhoneListener(TKu,false)end end;fjV1G2={}end
RegisterNUICallback('leaveCall',function(M6kL,M7o_)IN()
TriggerServerEvent("pphone:leaveCall",M6kL.id)M7o_('ok')end)RegisterNetEvent("pphone_client:endCall")
AddEventHandler("pphone_client:endCall",function()
IN()SendNUIMessage({type="STOP_CALL"})end)
local function QYf1(dk2X7J7)
if GetResourceState("pvoice2")=="started"then
exports.pvoice2:TogglePhoneListener(dk2X7J7,true)elseif GetResourceState("pvoice3")=="started"then
exports.pvoice3:TogglePhoneListener(dk2X7J7,true)else
exports.pvoice:TogglePhoneListener(dk2X7J7,true)end;fjV1G2[#fjV1G2+1]=dk2X7J7;zz1QI=true
PhonePlayAnim("call")end;RegisterNetEvent("pphone_client:callAccepted")
AddEventHandler("pphone_client:callAccepted",function(jv,MW)
QYf1(MW)SendNUIMessage({type="TAKE_CALL"})end)
RegisterNUICallback('setPhoneRingtone',function(E2OQ,SnbfLb6)
TriggerServerCallback("pphone:updateSettings",{{variable="ringtone",value=E2OQ.value}},nHlJ(SnbfLb6))end)
RegisterNUICallback('setPhoneBackground',function(ay,W)
TriggerServerCallback("pphone:updateSettings",{{variable="background",value=ay.value}},nHlJ(W))end)
RegisterNUICallback('markCallAsSeen',function(WzM,PSx)
TriggerServerCallback("pphone:markCallAsSeen",{},nHlJ(PSx))end)
RegisterNUICallback('onStopMusic',function(I,wnA)updateVar("RichPresence",false)
SetRichPresence("Se balade nu")wnA(true)end)
RegisterNUICallback('onPlayMusic',function(cW,PHpCof2)updateVar("RichPresence",true)
SetRichPresence("Écoute: "..
cW.name.." "..cW.authors)PHpCof2(true)end)
RegisterNUICallback('setTypingMode',function(bUPpn4T2,sode)if not Ki1 then return end
SetNuiFocusForPage(true,true,{disableFiring=true,keepInput=not bUPpn4T2.value})sode(true)end)
RegisterNUICallback('toggleMute',function(G9zkKODk,MGt)
if G9zkKODk and G9zkKODk.id then
if
GetResourceState("pvoice3")=="started"then
exports.pvoice3:TogglePhoneMute(G9zkKODk.mute)else
TriggerServerEvent("pphone:toggleMute",G9zkKODk.id,G9zkKODk.mute)end end;MGt(true)end)RegisterNetEvent("pphone_client:muteVoiceById")
AddEventHandler("pphone_client:muteVoiceById",function(ld9GuG4t,KpCCA)
if
GetResourceState("pvoice2")=="started"then
exports.pvoice2:TogglePhoneListener(ld9GuG4t,not KpCCA)elseif GetResourceState("pvoice3")=="started"then else exports.pvoice:TogglePhoneListener(ld9GuG4t,
not KpCCA)end end)
RegisterNUICallback('closePhone',function(H6,hgsKvTz)TogglePhone(true)hgsKvTz('ok')end)
local RfsnisO={["LS"]="Los Santos",["BC"]="Blaine County",["LC"]="Liberty City"}
local lvW2ga={["EXTRASUNNY"]="Ensoleillé",["CLEAR"]="Dégagé",["CLOUDS"]="Nuageux",["THUNDER"]="Orage",["OVERCAST"]="Couvert",["RAIN"]="Pluie",["FOGGY"]="Petit brouillard",["SMOG"]="Brouillard"}
RegisterNUICallback('getWeather',function(zEt,Wjojpvg)local l2PqbWw=LBf:GetCountyFromPlayer()
local EJTH9=LBf:GetWorldCurrentWeather()
Wjojpvg({weather=lvW2ga[EJTH9]or"Inconnue",county=RfsnisO[l2PqbWw]})end)RegisterNetEvent("pphone_client:onPhoneActivated")
AddEventHandler("pphone_client:onPhoneActivated",function(qTB82,KL)
if
not qTB82 or not tonumber(qTB82)then return end;kFTAh=qTB82
SendNUIMessage({type="SET_PHONE_INIT_STATE_REQUESTED",payload={image=KL.background,identifier=KL.identifier,token=KL.token,calls=KL.calls,contacts=lw4Q7kbl(KL.contacts),conversations=KL.conversations,phoneNumber=math.floor(kFTAh)}})end)
AddEventHandler("pphone:init",function(EATFLbgY)print(EATFLbgY)
SendNUIMessage({module="misc",type="UUID_STUFF",payload={uuid=EATFLbgY}})end)
local T7RKP={showHelp=true,frontCam=false,cinematicMode=u.State.CinemaMode,timecycleIndex=0,cameraEnabled=false,takingPicture=false}
RegisterNUICallback('onPhotoTaken',function(FF,rh)
T7RKP={showHelp=true,frontCam=false,timecycleIndex=0,cameraEnabled=false,takingPicture=false}rh(true)end)
function u.Phone:OpenCamera(YcCR,G3p2Yn)
if T7RKP.cameraEnabled then print('camera déjà ouverte')return end;CreateMobilePhone(math.floor(0))
CellCamActivate(true,true)updateVar("CinemaMode",2)PhonePlayAnim("out")
T7RKP.cameraEnabled=true
while T7RKP.cameraEnabled do Wait(0)
if
IsControlJustPressed(0,20)or IsControlJustPressed(0,177)then T7RKP.cameraEnabled=false;break end;if IsControlJustPressed(1,27)then T7RKP.frontCam=not T7RKP.frontCam
CellCamDisableThisFrame(T7RKP.frontCam)end
if
IsControlJustPressed(0,183)then T7RKP.showHelp=not T7RKP.showHelp end
local _jkkD9,D=IsControlJustPressed(0,189),IsControlJustPressed(0,190)
if _jkkD9 or D then
T7RKP.timecycleIndex=_jkkD9 and
(
T7RKP.timecycleIndex>0 and T7RKP.timecycleIndex-1 or T7RKP.timecycleIndex)or
(T7RKP.timecycleIndex<#RlZo and
T7RKP.timecycleIndex+1 or T7RKP.timecycleIndex)if T7RKP.timecycleIndex<=0 then ClearTimecycleModifier()else
SetTimecycleModifier(RlZo[T7RKP.timecycleIndex])end end
if IsControlJustPressed(2,176)then T7RKP.showHelp=false;T7RKP.takingPicture=true
ThefeedHideThisFrame()ClearHelp(-1)HideHelpTextThisFrame()
SetTimeout(math.floor(1),function()
SendNUIMessage({type="TAKE_PHOTO_REQUESTED",payload={conversationId=YcCR,addToContact=G3p2Yn}})
PlaySoundFrontend(-1,"Camera_Shoot","Phone_Soundset_Franklin",0)end)end;if T7RKP.takingPicture then ThefeedHideThisFrame()ClearHelp(-1)
HideHelpTextThisFrame()end
if T7RKP.showHelp then
DrawTopNotification("Appuyez sur ~INPUT_FRONTEND_UP~ pour la caméra frontale.\n~INPUT_ATTACK~ pour prendre une photo.\n~INPUT_FRONTEND_LEFT~ ~INPUT_FRONTEND_RIGHT~ pour les filtres ~INPUT_CELLPHONE_CAMERA_GRID~ cacher.")end;HideHudComponentThisFrame(7)
HideHudComponentThisFrame(8)HideHudComponentThisFrame(9)
HideHudComponentThisFrame(6)HideHudComponentThisFrame(19)
HideHudAndRadarThisFrame()local DMn=GetMobilePhoneRenderId()SetTextRenderId(DMn)
SetTextRenderId(1)end;DestroyMobilePhone()ClearTimecycleModifier()
CellCamActivate(false,false)
updateVar("CinemaMode",T7RKP.cinematicMode or 0)ThefeedSetScriptedMenuHeight(0)
SetNuiFocusForPage(true,true,{keepInput=true,disableFiring=true})
SendNUIMessage({type="SET_PHONE_VISIBLE",payload={visible=true}})PhonePlayAnim("text")end;local _L6Bs={}local SH=0
function TriggerServerCallback(GBzFRjVV,pG4C8fDK,LLFUU)SH=SH+1
_L6Bs[#_L6Bs+1]={id=SH,cb=LLFUU}
TriggerServerEvent(GBzFRjVV,SH,table.unpack(pG4C8fDK))end;RegisterNetEvent("pichot:serverEventCallback")
AddEventHandler("pichot:serverEventCallback",function(SH,...)
local kdmQtj6
for Hc35_,ubP in pairs(_L6Bs)do if ubP.id==SH then kdmQtj6=Hc35_;break end end;if not kdmQtj6 then return end
_L6Bs[kdmQtj6].cb(table.unpack({...}))_L6Bs[kdmQtj6]=nil end)function IsPhoneOpen()return Ki1 end
local function wU4wYbA9()if DI and DoesEntityExist(DI)then
DeleteEntity(DI)DI=0 end end
local function fFeQcIM()wU4wYbA9()RequestAndWaitModel(Do)
DI=CreateObject(Do,1.0,1.0,1.0,false,true,false)SetModelAsNoLongerNeeded(Do)local eN0UMW=PlayerPedId()
AttachEntityToEntity(DI,eN0UMW,GetPedBoneIndex(eN0UMW,28422),0.0,0.0,0.0,0.0,0.0,0.0,1,1,0,0,2,1)end
function PhonePlayAnim(lAG,AvEtR8Y)if _==lAG then return end;local rl3MMqfm=PlayerPedId()
AvEtR8Y=AvEtR8Y or false
local nQj=IsPedInAnyVehicle(rl3MMqfm)and"anim@cellphone@in_car@ps"or"cellphone@"RequestAndWaitDict(nQj)
local Eq8jDq=KMw7_i1s[nQj][_][lAG]if _~="out"then StopAnimTask(rl3MMqfm,b,E,1.0)end
TaskPlayAnim(rl3MMqfm,nQj,Eq8jDq,3.0,
-1,-1,AvEtR8Y and 14 or 50,0,false,false,false)
if lAG~="out"and _=="out"then Citizen.Wait(380)fFeQcIM()end;b=nQj;E=Eq8jDq;_=lAG
if lAG=="out"then Citizen.Wait(180)wU4wYbA9()
StopAnimTask(rl3MMqfm,b,E,1.0)SetBlockingOfNonTemporaryEvents(rl3MMqfm,false)elseif
lAG=="call"then SetBlockingOfNonTemporaryEvents(rl3MMqfm,true)end end
local function JEHSHPh3(LnQUN)Ki1=not Ki1
if not Ki1 then
Citizen.CreateThread(function()local Gm1=GetGameTimer()+500
local Jp=PlayerId()while
GetGameTimer()<Gm1 or IsDisabledControlPressed(0,24)or IsControlPressed(0,24)do
DisablePlayerFiring(Jp,true)Wait(0)end end)end
if Ki1 then
SetNuiFocusForPage(true,true,{keepInput=true,disableFiring=true})else RemoveNuiFocusForPage()end;if not LnQUN then
SendNUIMessage({type="SET_PHONE_VISIBLE",payload={visible=Ki1}})end end
function TogglePhone(NwBqNl3C)
if not Ki1 then
TriggerEvent("pichot:canAccessToPhone",function(XuqjvYPF,Trh)
if not XuqjvYPF then
ShowAboveRadarMessage("~r~Vous n'avez pas de téléphone.")elseif type(kFTAh)~="number"or not XuqjvYPF or not
tableHasValue(XuqjvYPF,kFTAh,"num")then
ShowAboveRadarMessage("~r~Vous n'avez pas indiqué de téléphone actif.")elseif XuqjvYPF and tableHasValue(XuqjvYPF,kFTAh,"num")then JEHSHPh3()
PhonePlayAnim("text")end end)else JEHSHPh3(NwBqNl3C)PhonePlayAnim("out")end end
Citizen.CreateThread(function()local KuK=IsPedCuffed
while true do Citizen.Wait(0)
local s0FU=PlayerPedId()local wQl=DecorGetBool(s0FU,"Player_Dead")
if Ki1 then if
KuK(s0FU)or
type(kFTAh)~="number"or IsControlJustPressed(0,TqYJ4)then TogglePhone(false)end;if not
zz1QI then
for g,m4u in ipairs(Ib4)do if IsDisabledControlJustPressed(0,m4u.code)then
SendNUIMessage({type=m4u.event})end end end;for StZ,C1NqzxY in
pairs(SUn)do
DisableControlAction(math.floor(0),C1NqzxY,true)end else if IsControlJustPressed(0,TqYJ4)and not
KuK(s0FU)and not wQl then
TogglePhone()end end end end)
RegisterNUICallback('acceptCall',function(T1gVrYq,P5G)
TriggerServerCallback("pphone:acceptCall",{T1gVrYq.id},nHlJ(P5G,function(JC)
QYf1(JC.sender)return JC.payload end))end)
RegisterNUICallback('denyCall',function(PDA,Kqne5Stra)zz1QI=false;Kqne5Stra('ok')end)
RegisterNUICallback("openLifeinvader",function(FKLmmhnQ,F82)TogglePhone(false)
TriggerEvent("pichot:toggleWeb",true,{"lifeinvader","lifeinvader"})F82(true)end)
TriggerEvent("pichot_data:broadcastAll",function(wJ6tY_)for TNg,wO9T in pairs(u.State)do if wJ6tY_[TNg]~=nil then
u.State[TNg]=wJ6tY_[TNg]end end end)
AddEventHandler("pichot_data:varUpdated",function(QMcSUqdi,sKy2P9i,S)if not u.State[QMcSUqdi]then return end
if S then u.State[QMcSUqdi]=
u.State[QMcSUqdi]or{}
u.State[QMcSUqdi][S]=sKy2P9i else u.State[QMcSUqdi]=sKy2P9i end end)
AddEventHandler("onResourceStart",function(AD)
if AD~=GetCurrentResourceName()then return end
ShowAboveRadarMessage("~r~Le téléphone se relance..")end)
RegisterNUICallback('setConversationTitle',function(AkxLdb66,aUR)
TriggerServerCallback("pphone:setConversationTitle",{AkxLdb66.conversationId,AkxLdb66.title},nHlJ(aUR))end)
RegisterNUICallback("addToConversation",function(c4,ZNXs3Bwd)
TriggerServerCallback("pphone:addToConversation",{c4.conversationId,c4.number},nHlJ(ZNXs3Bwd))end)
RegisterNUICallback("uuidStuff",function(Ginn,h_pK)h_pK('ok')TriggerEvent("uuidStuff",Ginn)end)
RegisterNetEvent("pphone_client:updateConversationParticipants")
AddEventHandler("pphone_client:updateConversationParticipants",function(L)
SendNUIMessage({type="UPDATE_CONVERSATION_PARTICIPANTS",payload=L})end)
RegisterNUICallback("leaveConversation",function(vBKFXR3,FP3j)
TriggerServerCallback("pphone:leaveConversation",{vBKFXR3.conversationId},nHlJ(FP3j))end)
RegisterNUICallback("removeFromConversation",function(fe,ggnA)
TriggerServerCallback("pphone:removeFromConversation",{fe.conversationId,fe.number},nHlJ(ggnA))end)
RegisterNUICallback("getBankAccounts",function(KaD2ExEO,TpiFT)
TriggerServerCallback("pphone:getBankAccounts",{},nHlJ(TpiFT))end)
RegisterNUICallback("getBankAccountTransactions",function(J,CH)
TriggerServerCallback("pphone:getBankAccountTransactions",{J.accountId},nHlJ(CH))end)