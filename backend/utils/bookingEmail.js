import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendBookingConfirmationEmail = async (userEmail, booking) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'thenailsstory1@gmail.com',
                pass: 'ptykmueaoujnjjni'
            }
        });

        const servicesList = booking.services.map(
            s => `<li style="margin-bottom:6px;"><strong>${s.name}</strong> - ₹${s.price} (${s.duration || 30} min)</li>`
        ).join('');

        const mailOptions = {
            from: 'The Nail Story <thenailsstory1@gmail.com>',
            to: userEmail,
            subject: `Appointment Confirmed - The Nail Story`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #FDF6E6; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #FDF6E6; color: #053342; padding: 15px; text-align: center;">
                        <h1>Appointment Confirmed! 💅</h1>
                    </div>
                    <div style="padding: 20px; background-color: #fff;">
                        <p>Hi <strong>${booking.name}</strong>,</p>
                        <p>Your appointment at <strong>The Nail Story</strong> is confirmed!</p>
                        <h3 style="border-bottom: 2px solid #053342; padding-bottom: 5px;">Booking Details:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Date:</strong> ${booking.date}</li>
                            <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
                            <li><strong>Phone:</strong> ${booking.phone}</li>
                        </ul>
                        <h3 style="border-bottom: 2px solid #053342; padding-bottom: 5px; margin-top: 20px;">Services:</h3>
                        <ul style="padding-left: 18px;">${servicesList}</ul>
                        <p style="font-weight: bold; font-size: 18px;">Estimated Total: ₹${booking.estimatedPrice}</p>
                        <div style="margin-top: 20px; background: #fef6ec; padding: 12px; border-radius: 8px;">
                            <p style="margin:0;">Please arrive 5 minutes early and bring any reference photos you'd like to show our nail artists.</p>
                        </div>
                        <p style="margin-top: 20px;">We look forward to pampering you soon!<br/>— The Nail Story Team</p>
                    </div>
                    <div style="background-color: #FDF6E6; color: #053342; text-align: center; padding: 10px;">
                        <p>Need help? Contact us at <a href="mailto:thenailsstory1@gmail.com" style="color: #053342; font-weight: bold;">thenailsstory1@gmail.com</a></p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Booking confirmation email sent to ${userEmail}`);
    } catch (error) {
        console.error(`❌ Error sending booking email: ${error.message}`);
        throw new Error('Failed to send booking confirmation email.');
    }
};