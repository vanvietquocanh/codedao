var beautiful = function(title, content){
	return `<!DOCTYPE html>
				<html lang="en">
				<head>
				  <meta charset="utf-8">   <meta name="viewport" content="width=device-width">   <meta http-equiv="X-UA-Compatible" content="IE=edge">   <title></title>   <style type="text/css">
				    html,
				    body {
				      margin: 0;
				      padding: 0;
				      height: 100% !important;
				      width: 100% !important;
				    }
				    * {
				      -ms-text-size-adjust: 100%;
				      -webkit-text-size-adjust: 100%;
				    }
				    .ExternalClass {
				      width: 100%;
				    }  
				    table,
				    td {
				      mso-table-lspace: 0pt;
				      mso-table-rspace: 0pt;
				    }
				    
				    table {
				      border-spacing:0 !important;
				    }
				    .ExternalClass,
				    .ExternalClass * {
				      line-height: 100%;
				    }
				    table {
				      border-collapse: collapse;
				      margin: 0 auto;
				    }
				    img {
				      -ms-interpolation-mode:bicubic;
				    }
				    .yshortcuts a {
				      border-bottom: none !important;
				    }
				    .mobile-link--footer a {
				      color: #666666 !important;
				    }
				    img {
				      border:0 !important;
				      outline:none !important;
				      text-decoration:none !important;
				    }
				    @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
				      .email-container {
				        width: 100% !important;
				      }
				      img[class="fluid"],
				      img[class="fluid-centered"] {
				        width: 100% !important;
				        max-width: 100% !important;
				        height: auto !important;
				        margin: auto !important;
				      }
				      img[class="fluid-centered"] {
				        margin: auto !important;
				      }
				      td[class="stack-column"],
				      td[class="stack-column-center"] {
				        display: block !important;
				        width: 100% !important;
				        direction: ltr !important;
				      }
				      td[class="stack-column-center"] {
				        text-align: center !important;
				      }
				      td[class="data-table-th"] {
				        display: none !important;
				      }
				      td[class="data-table-td"],
				      td[class="data-table-td-title"] {
				        display: block !important;
				        width: 100% !important;
				        border: 0 !important;
				      }
				      td[class="data-table-td-title"] {
				        font-weight: bold;
				        color: #333333;
				        padding: 10px 0 0 0 !important;
				        border-top: 2px solid #eeeeee !important;
				      }
				      td[class="data-table-td"] {
				        padding: 5px 0 0 0 !important
				      }
				      td[class="data-table-mobile-divider"] {
				        display: block !important;
				        height: 20px;
				      }
				    }
				  </style>
				</head>
				<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#222222" style="margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;">
				<table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" bgcolor="#222222" style="border-collapse:collapse;"><tr><td>
				    <div style="display:none;font-size:1px;color:#222222;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide: all;">
				    (Optional) This text will appear in the inbox preview, but not the email body.
				  </div>
				    <table border="0" width="600" cellpadding="0" cellspacing="0" align="center" style="width:600px; margin: auto;" class="email-container">
				    <tr>
				      <td>
				                <table border="0" width="100%" cellpadding="0" cellspacing="0">
				          <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
				          <tr>
				            <td valign="middle" width="150" style="padding:5px 0; text-align:left; line-height: 1;" class="stack-column-center">
				              <h1  width="150" height="50" border="0" style="display: block; margin: auto;color:#fff">${title}</h1>
				            </td>
				            <td valign="middle" style="padding:5px 0; text-align:right; line-height:1.1; font-family: sans-serif; font-size: 13px; color:  #2980b9;" class="stack-column-center">
				              Beautiful Template
				            </td>
				          </tr>
				          <tr><td height="5" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
				        </table>
				                <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
				                    <tr>
				            <td style="padding: 4%; font-family: sans-serif; font-size: 18px; line-height: 1.3; color: #2980b9;">
				              ${content}
				            </td>
				          </tr>
				                    <tr>
				            <td width="92%" style="padding: 4%;">
				            </td>
				          </tr>
				          
				        </table>
				                
				      </td>
				    </tr>
				        <tr>
				      <td style="text-align:center; padding:4% 0; font-family:sans-serif; font-size:13px; line-height:1.2; color:#666666;">
				        <br><br>
				        <unsubscribe style="color:#2980b9; text-decoration:underline;">© 2017 - Mỹ Dung</unsubscribe>
				      </td>
				    </tr> 
				  </table>
				</td></tr></table>
				</body>
				</html>`
}
module.exports = beautiful;