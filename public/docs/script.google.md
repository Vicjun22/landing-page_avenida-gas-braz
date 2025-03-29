# Apps Script

- Segue abaixo o Script usado para o registro dos dados no Google Sheets:

```
function doPost(e) {
  var ss = SpreadsheetApp.openById("COLOCAR_ID_AQUI");
  var sheet = ss.getSheets()[0];
  
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.nome,
    data.cpf,
    data.telefone,
    data.cep,
    data.estado,
    data.cidade,
    data.bairro,
    data.rua,
    data.numeroResidencia,
    data.complemento,
    new Date()
  ]);
  
  var output = ContentService.createTextOutput("Dados salvos com sucesso");

  output.setMimeType(ContentService.MimeType.TEXT);
  output.setStatusCode(200);
  
  output.appendHeader("Access-Control-Allow-Origin", "*");
  output.appendHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  output.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  
  return output;
}
```

<i>Obs.: Substituir COLOCAR_ID_AQUI pelo seu ID fornecido pelo Google.</i>