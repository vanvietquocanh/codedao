var bassic = function(title, content){
	return `<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="utf-8"> 
				<meta name="viewport" content="width=device-width"> 
				<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
			  <title></title> 
			  <style type="text/css">
					body,
					#bodyTable {
						height:100% !important;
						width:100% !important;
						margin:0;
						padding:0;
					}
					body,
					table,
					td,
					p,
					a,
					li,
					blockquote {
						-ms-text-size-adjust:100%;
						-webkit-text-size-adjust:100%;
					}
					.thread-item.expanded .thread-body .body, .msg-body {
						width: 100% !important;
						display: block !important;
					}
			    .ReadMsgBody,
			    .ExternalClass {
						width: 100%;
						background-color: #f4f4f4;
			    }
					.ExternalClass,
					.ExternalClass p,
					.ExternalClass span,
					.ExternalClass font,
					.ExternalClass td,
					.ExternalClass div {
						line-height:100%;
			    }
			    table {
						border-spacing:0;
			    }
			    table,
			    td {
						border-collapse:collapse;
						mso-table-lspace:0pt;
						mso-table-rspace:0pt;
			    }
			    img {
			    	-ms-interpolation-mode: bicubic;
			    }
			    img,
			    a img {
			    	border:0;
			    	outline:none;
			    	text-decoration:none;	    
			    }
			    .yshortcuts a {
						border-bottom: none !important;
			    }
			    a[href^=tel],
					.mobile_link,
					.mobile_link a {
				    color:#222222 !important;
						text-decoration: underline !important;
			    }
			    @media screen and (max-device-width: 600px), screen and (max-width: 600px) {

						table[class="email-container"] {
							width: 100% !important;
						}
						table[class="fluid"] {
							width: 100% !important;
						}
						img[class="fluid"],
						img[class="force-col-center"] {
							width: 100% !important;
							max-width: 100% !important;
							height: auto !important;
						}
							img[class="force-col-center"] {
							margin: auto !important;
						}
						td[class="force-col"],
						td[class="force-col-center"] {
							display: block !important;
							width: 100% !important;
							clear: both;
						}
						td[class="force-col-center"] {
							text-align: center !important;
						}
						img[class="col-3-img-l"] {
							float: left;
							margin: 0 15px 15px 0;
						}
						img[class="col-3-img-r"] {
							float: right;
							margin: 0 0 15px 15px;
						}
						table[class="button"] {
							width: 100% !important;
						}
			         
			    }
			    @media screen and (max-device-width: 425px), screen and (max-width: 425px) {

						div[class="hh-visible"] {
							display: block !important;
						}
						
						div[class="hh-center"] {
							text-align: center;
							width: 100% !important;
						}
						table[class="hh-fluid"] {
							width: 100% !important;
						}
						img[class="hh-fluid"],
						img[class="hh-force-col-center"] {
							width: 100% !important;
							max-width: 100% !important;
							height: auto !important;
						}
						img[class="hh-force-col-center"] {
							margin: auto !important;
						}
						td[class="hh-force-col"],
						td[class="hh-force-col-center"] {
							display: block !important;
							width: 100% !important;
							clear: both;
						}
						td[class="hh-force-col-center"] {
							text-align: center !important;
						}
						img[class="col-3-img-l"],
						img[class="col-3-img-r"] {
							float: none !important;
							margin: 15px auto !important;
							text-align: center !important;
						}
			    }   
			  </style>
			</head>
			<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#f4f4f4" style="margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;">
			<table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%" bgcolor="#f4f4f4" id="bodyTable" style="border-collapse: collapse;table-layout: fixed;margin:0 auto;"><tr><td>
				<div style="display:none; visibility:hidden; opacity:0; color:transparent; height:0; width:0;line-height:0; overflow:hidden;mso-hide: all;">
					Visually hidden preheader text.
				</div>
			  <table border="0" width="600" cellpadding="0" cellspacing="0" align="center" class="email-container" style="margin: auto;">
			    <tr>
			      <td height="30" style="font-size: 0; line-height: 0;">&nbsp;</td>
			    </tr>
			  </table>
			    <table border="0" width="80%" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" style="border: 1px solid #e5e5e5;margin: auto;" class="email-container">
			      <tr>
			        <td style="border-bottom: 1px solid #e5e5e5;">
			          <table border="0" width="100%" cellpadding="0" cellspacing="0" align="center">
			            <h1 style="padding: 30px; font-family: arial, sans-serif; font-size: 30px; line-height: 22px; color: #111;color:#34495e;">${title}</h1>
			            <tr>
			              <td style="padding: 30px; font-family: arial, sans-serif; font-size: 16px; line-height: 22px; color:#fff; background: #2c3e50 ; font-weight: 500;">
			               ${content}
			              </td>
			            </tr>
			          </table>
			        </td>
			      </tr>  
			  </table>
			</td></tr></table>
			  <footer style="text-align: center">© 2017 - Mỹ Dung</footer>
			</body>
			</html>`
}
module.exports = bassic;