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

    // Create email content
    const mailOptions = {
      from: `"ClipperCuts Barbershop" <${process.env.EMAIL_USER || 'noreply@clippercuts.com'}>`,
      to: booking.customer_email,
      subject: 'Konfirmasi Booking - ClipperCuts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333; margin-bottom: 5px;">Booking Dikonfirmasi!</h1>
            <p style="color: #666;">Terima kasih telah memilih ClipperCuts</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; font-size: 18px; margin-top: 0;">Detail Booking:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 40%;"><strong>Nama:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${booking.customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tanggal:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Waktu:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formattedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Layanan:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${serviceDetails.title} (${serviceDetails.price})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Barber:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${barberDetails.name}</td>
              </tr>
              ${booking.notes ? `
              <tr>
                <td style="padding: 8px 0;"><strong>Catatan:</strong></td>
                <td style="padding: 8px 0;">${booking.notes}</td>
              </tr>` : ''}
            </table>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>Jika ada pertanyaan atau perubahan jadwal, silakan hubungi kami.</p>
            <p>© ${new Date().getFullYear()} ClipperCuts Barbershop. All rights reserved.</p>
          </div>
        </div>
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