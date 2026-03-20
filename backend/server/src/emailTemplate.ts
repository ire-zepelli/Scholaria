export function emergencyEmailTemplate(data: {
  name: string;
  studentId: string;
  emergencyType: string;
  timestamp: string;
  description: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <tr>
              <td align="center" style="background:#d32f2f;color:white;padding:20px;">
                <h2 style="margin:0;font-size:24px;">🚨 EMERGENCY ALERT</h2>
                <p style="margin:5px 0 0 0;font-size:14px;">Immediate Attention Required</p>
              </td>
            </tr>

            <tr>
              <td style="padding:25px;">
                <p style="font-size:16px;">
                  An emergency has been reported. Please review the details below:
                </p>

                <table width="100%" cellpadding="10" cellspacing="0"
                  style="border:1px solid #dddddd;border-collapse:collapse;margin-top:15px;">

                  <tr>
                    <td style="border:1px solid #dddddd;"><strong>Name:</strong></td>
                    <td style="border:1px solid #dddddd;">${data.name}</td>
                  </tr>

                  <tr style="background:#f9f9f9;">
                    <td style="border:1px solid #dddddd;"><strong>Student ID:</strong></td>
                    <td style="border:1px solid #dddddd;">${data.studentId}</td>
                  </tr>

                  <tr>
                    <td style="border:1px solid #dddddd;"><strong>Emergency Type:</strong></td>
                    <td style="border:1px solid #dddddd;">${data.emergencyType}</td>
                  </tr>

                  <tr>
                    <td style="border:1px solid #dddddd;"><strong>Time Reported:</strong></td>
                    <td style="border:1px solid #dddddd;">${data.timestamp}</td>
                  </tr>

                </table>

                <div style="margin-top:20px;padding:15px;background:#fff3f3;border-left:4px solid #d32f2f;">
                  <strong>Description:</strong>
                  <p style="margin:8px 0 0 0;">${data.description}</p>
                </div>

                <p style="margin-top:25px;font-size:15px;">
                  Please respond immediately according to emergency protocol.
                </p>

              </td>
            </tr>

            <tr>
              <td align="center" style="background:#f4f4f4;padding:15px;font-size:12px;color:#666;">
                This alert was generated automatically by the Emergency Alert System.<br>
                © 2026 Emergency Alert System.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
