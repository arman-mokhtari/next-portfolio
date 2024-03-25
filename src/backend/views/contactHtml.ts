import { EmailParams } from "@/types";


export const htmlTemplate = ({ name, email, phoneNumber, message }: EmailParams): string => `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          direction: rtl !important;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        h2 {
          color: #555;
        }
        strong {
          color: #0000ff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>پیام از طرف کاربران</h2>
        <p><strong>نام:</strong> ${name}</p>
        <p><strong>ایمیل:</strong> ${email}</p>
        <p><strong>شماره موبایل:</strong> ${phoneNumber || "شماره تماس ارسال نشده!"}</p>
        <p><strong>پیام:</strong> ${message}</p>
      </div>
    </body>
  </html>
`;

