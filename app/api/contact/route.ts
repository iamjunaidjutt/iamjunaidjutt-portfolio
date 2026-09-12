import { NextResponse } from "next/server";

import { mailOptions, transporter } from "@/config/nodemailer";

export const POST = async (req: Request) => {
	try {
		const data = await req.json();
		const { name, email, subject, message } = data;

		if (!name || !email || !subject || !message) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		await transporter.sendMail({
			...mailOptions,
			subject: `New message from ${name} - Subject: ${subject}`,
			text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			html: `<!DOCTYPE html>
            <html>
            <head>
              <style>
                /* Reset some default styles for better consistency */
                body, p {
                  margin: 0;
                  padding: 0;
                }
            
                body {
                  background: #f4f1eb;
                  color: #20272c;
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .panel {
                  background: #fbfaf7;
                  border: 1px solid #d8d4cb;
                  border-radius: 8px;
                  padding: 20px;
                }
                h1, strong {
                  color: #3b6ea8;
                }
                h1 {
                  font-size: 18px;
                }
              </style>
            </head>
            <body>
              <div class="panel">
                <h1>New message received</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
                </div>
              </div>
            </body>
            </html>
            `,
		});

		return new NextResponse(data, { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Internal server error", { status: 500 });
	}
};
