import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Configure email transporter
const getEmailTransporter = () => {
  // Try to get email config
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  console.log('Email Config Check:', {
    hostConfigured: !!emailHost,
    userConfigured: !!emailUser,
    passConfigured: !!emailPass,
    host: emailHost // Don't show actual credentials
  });
  
  // Use mock if not configured
  if (!emailHost || !emailUser || !emailPass) {
    console.warn('Email configuration missing, using mock transport');
    return null;
  }
  
  // Create real transporter
  return nodemailer.createTransport({
    host: emailHost,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

export async function POST(request) {
  console.log('Email API route called');
  try {
    const data = await request.json();
    console.log('Received email request with data:', {
      hasBooking: !!data.booking,
      hasServiceDetails: !!data.serviceDetails,
      hasBarberDetails: !!data.barberDetails,
      customerEmail: data.booking?.customer_email
    });
    
    const { booking, serviceDetails, barberDetails } = data;
    
    if (!booking || !booking.customer_email) {
      console.error('Missing required booking data or email');
      return NextResponse.json(
        { success: false, error: 'Customer email is required' },
        { status: 400 }
      );
    }
    
    // Get transporter
    const transporter = getEmailTransporter();
    
    // If no transporter is available, log mock email
    if (!transporter) {
      console.log('MOCK EMAIL SENT:');
      console.log('To:', booking.customer_email);
      console.log('Subject: Konfirmasi Booking - ClipperCuts');
      console.log('Content: [HTML Email Content]');
      
      return NextResponse.json({
        success: true,
        messageId: `mock-${Date.now()}`,
        mockEmail: true
      });
    }
    
    const formattedDate = new Date(booking.date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = booking.time.replace(':', '.');
    
    console.log('Preparing email for:', booking.customer_email);

    // Create email content with improved professional design
    const mailOptions = {
      from: `"ClipperCuts Barbershop" <${process.env.EMAIL_USER || 'noreply@clippercuts.com'}>`,
      to: booking.customer_email,
      subject: 'Konfirmasi Booking - ClipperCuts Barbershop',
      html: `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Konfirmasi Booking</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; background-color: #f9f9f9;">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <!-- Header -->
            <tr>
              <td style="background-color: #2a2a2a; padding: 30px 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">ClipperCuts Barbershop</h1>
                <p style="color: #d4af37; margin: 5px 0 0; font-size: 16px; font-style: italic;">Premium Grooming Experience</p>
              </td>
            </tr>
            
            <!-- Main Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px; color: #2a2a2a; font-size: 22px; text-align: center;">Booking Anda Telah Dikonfirmasi</h2>
                
                <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                  Halo <strong>${booking.customer_name}</strong>,
                </p>
                
                <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.5;">
                  Terima kasih telah memilih ClipperCuts Barbershop. Kami dengan senang hati mengkonfirmasi booking Anda dengan detail sebagai berikut:
                </p>
                
                <!-- Booking Details Box -->
                <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; border-radius: 6px; margin-bottom: 25px;">
                  <tr>
                    <td style="padding: 25px;">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td width="140" style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">No. Booking:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">#${new Date().getTime().toString().slice(-6)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Tanggal:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${formattedDate}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Waktu:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${formattedTime}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Layanan:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${serviceDetails.title}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Harga:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${serviceDetails.price}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Barber:</td>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${barberDetails.name}</td>
                        </tr>
                        ${booking.notes ? `
                        <tr>
                          <td style="padding: 8px 0; font-weight: 600;">Catatan:</td>
                          <td style="padding: 8px 0;">${booking.notes}</td>
                        </tr>` : ''}
                      </table>
                    </td>
                  </tr>
                </table>
                
                <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                  Kami sangat menghargai kepercayaan Anda dan berkomitmen untuk memberikan pengalaman grooming terbaik. Harap datang 10 menit sebelum jadwal untuk memastikan layanan tepat waktu.
                </p>
                
                <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                  Jika Anda perlu mengubah atau membatalkan janji, mohon hubungi kami minimal 2 jam sebelumnya.
                </p>
                
                <p style="margin: 0; font-size: 16px; line-height: 1.5;">
                  Sampai jumpa di ClipperCuts Barbershop!
                </p>
              </td>
            </tr>
            
            <!-- Call to Action -->
            <tr>
              <td style="padding: 0 30px 30px;">
                <div style="background-color: #d4af37; color: #2a2a2a; text-align: center; padding: 15px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Tunjukkan email ini saat kedatangan Anda
                </div>
              </td>
            </tr>
            
            <!-- Store Info -->
            <tr>
              <td style="background-color: #f5f5f5; padding: 25px 30px; border-top: 1px solid #e0e0e0;">
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <h3 style="margin: 0 0 10px; font-size: 16px; color: #2a2a2a;">ClipperCuts Barbershop</h3>
                      <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">
                        Jl. Pogung Kidul No.2a, Pogung Kidul, Sinduadi, <br>
                        Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284<br>
                        Telp: (021) 123-4567<br>
                        Email: info@clippercuts.com
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #2a2a2a; padding: 20px 30px; text-align: center; color: #ffffff; font-size: 12px;">
                <p style="margin: 0 0 10px;">&copy; ${new Date().getFullYear()} ClipperCuts Barbershop. All rights reserved.</p>
                <p style="margin: 0;">Email ini dikirim otomatis, mohon jangan membalas.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };

    // Send email
    console.log('Attempting to send email now...');
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      return NextResponse.json({
        success: true,
        messageId: info.messageId
      });
    } catch (sendError) {
      console.error('Failed to send email:', sendError);
      return NextResponse.json(
        { success: false, error: `Email sending error: ${sendError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in email API route:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 