const SHEET_NAME="Orders";
function doPost(e){
  try{
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    let sh=ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);
    if(sh.getLastRow()===0) sh.appendRow(["Timestamp","Name","Phone","Governorate","Address","Quantity","Product","Price","Page","UTM Source","UTM Medium","UTM Campaign","UTM Content"]);
    const d=JSON.parse(e.postData.contents||"{}");
    sh.appendRow([new Date(),d.name||"",d.phone||"",d.governorate||"",d.address||"",d.quantity||"1",d.product||"",d.price||"",d.page||"",d.utm_source||"",d.utm_medium||"",d.utm_campaign||"",d.utm_content||""]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}