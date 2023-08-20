import { NextResponse } from "next/server";

import { mailOptions, transporter } from "@/config/nodemailer";


export const POST = async (req: Request) => {
    try {
        const data = await req.json();
        const { name, email, subject, message } = data;

        if (!name || !email || !subject || !message) { 
            return new NextResponse('Missing required fields', {status: 400});
        }

        await transporter.sendMail({
            ...mailOptions,
            subject: `New message from ${name} - ${subject}`,
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
            
                /* Apply Tailwind-like classes */
                .bg-blue-100 {
                  background-color: #f0f4ff;
                }
            
                .p-5 {
                  padding: 20px;
                }
            
                .text-blue-700 {
                  color: #3b82f6;
                }
            
                .text-lg {
                  font-size: 18px;
                }
            
                .border {
                  border: 1px solid #e2e8f0;
                }
            
                .rounded-xl {
                  border-radius: 8px;
                }
            
                /* Button styles */
                .button {
                  display: inline-block;
                  background-color: #3490dc;
                  color: white;
                  padding: 10px 20px;
                  border-radius: 4px;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="bg-blue-100 p-5">
                <div class="text-center">
                  <h1 class="text-blue-700 text-lg font-semibold">New Message Received.</h1>
                </div>
                <div class="border rounded-xl p-5 mt-5">
                  <p><strong class="text-blue-700">Name:</strong> ${name}</p>
                  <p><strong class="text-blue-700">Email:</strong> ${email}</p>
                  <p><strong class="text-blue-700">Message:</strong> ${message}</p>
                </div>
              </div>
            </body>
            </html>
            `
        });

        return new NextResponse(data, {status: 200});
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal server error', {status: 500});        
    }
}