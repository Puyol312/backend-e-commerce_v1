// ─── Shared layout wrapper ────────────────────────────────────────────────────
const layout = (content: string) => /* html */ `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>crpl e-commerce</title>
</head>
<body style="margin:0;padding:0;background:#f2efe8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2efe8;padding:40px 16px;">
    <tr>
      <td align="center">
 
        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0"
          style="max-width:520px;background:#ffffff;border-radius:2px;box-shadow:0 2px 24px rgba(0,0,0,0.07);">
 
          <!-- Header bar -->
          <tr>
            <td style="background:#1a1a1a;padding:24px 40px;">
              <span style="color:#f2efe8;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;font-family:Georgia,serif;">
                crpl e-commerce
              </span>
            </td>
          </tr>
 
          <!-- Body -->
          <tr>
            <td style="padding:44px 40px 36px;">
              ${content}
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #ebebeb;">
              <p style="margin:0;font-size:11px;color:#b0a899;font-family:Georgia,serif;line-height:1.6;">
                Este mensaje fue enviado automáticamente. Por favor no respondas este correo.<br/>
                © ${new Date().getFullYear()} crpl e-commerce
              </p>
            </td>
          </tr>
 
        </table>
        <!-- /Card -->
 
      </td>
    </tr>
  </table>
</body>
</html>
`;
 
// ─── Template: verification code ─────────────────────────────────────────────
export const codeTemplate = (code: number) => layout(/* html */ `
  <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#888;font-family:Georgia,serif;">
    Verificación de cuenta
  </p>
  <h1 style="margin:0 0 24px;font-size:26px;font-weight:normal;color:#1a1a1a;font-family:Georgia,serif;line-height:1.2;">
    Tu código de acceso
  </h1>
  <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;font-family:Georgia,serif;">
    Usá el siguiente código para verificar tu identidad.
    Expira en <strong style="color:#1a1a1a;">10 minutos</strong>.
  </p>
 
  <!-- Code block -->
  <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="background:#f2efe8;border-left:3px solid #1a1a1a;padding:18px 32px;border-radius:1px;">
        <span style="font-size:34px;font-weight:bold;letter-spacing:0.22em;color:#1a1a1a;font-family:Georgia,serif;">
          ${code}
        </span>
      </td>
    </tr>
  </table>
 
  <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;font-family:Georgia,serif;">
    Si no solicitaste este código, ignorá este mensaje. Tu cuenta permanece segura.
  </p>
`);
 
// ─── Template: paid ───────────────────────────────────────────────────────────
export const paidTemplate = () => layout(/* html */ `
  <!-- Icon circle -->
  <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr>
      <td width="56" height="56"
        style="background:#e8f5e9;border-radius:50%;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;line-height:56px;">✓</span>
      </td>
    </tr>
  </table>
 
  <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#888;font-family:Georgia,serif;">
    Confirmación de pago
  </p>
  <h1 style="margin:0 0 24px;font-size:26px;font-weight:normal;color:#1a1a1a;font-family:Georgia,serif;line-height:1.2;">
    ¡Tu compra fue exitosa!
  </h1>
  <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;font-family:Georgia,serif;">
    Recibimos tu pago correctamente. Estamos preparando tu pedido
    y te avisaremos cuando esté en camino.
  </p>
 
  <!-- Divider -->
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr>
      <td style="border-top:1px solid #ebebeb;"></td>
    </tr>
  </table>
 
  <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;font-family:Georgia,serif;">
    ¿Tenés alguna pregunta sobre tu pedido? Respondé este correo y te ayudamos.
  </p>
`);