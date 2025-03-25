import nodemailer from 'nodemailer';

export const sendOrderConfirmationEmail = async (userEmail, address, items, amount, orderid) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'thenailsstory1@gmail.com',
                pass: 'ptykmueaoujnjjni'
            }
        });

        // Email content
        const mailOptions = {
            from: 'The Nail Story <thenailsstory1@gmail.com>',
            to: userEmail,
            subject: `Order Confirmation - #${orderid} - The Nail Story`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #FDF6E6; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #FDF6E6; color: #053342; padding: 15px; text-align: center;">
                        <h1>Thank You for Your Order! 🎉</h1>
                    </div>
                    <div style="padding: 20px; background-color: #fff;">
                        <p>Your order has been successfully placed. Below are your order details:</p>

                        <h3 style="border-bottom: 2px solid #053342; padding-bottom: 5px;">Order Details:</h3>
                        <p><strong>Order ID:</strong> ${orderid}</p>
                        <ul style="list-style: none; padding: 0;">
                            ${items.map(item => `
                                <li style="background-color: #FDF6E6; margin: 5px 0; padding: 8px 12px; border-radius: 5px;">
                                    <strong>${item.name}</strong> x ${item.quantity} - ₹${item.price}
                                </li>
                            `).join('')}
                        </ul>
                        <p style="font-weight: bold; font-size: 18px;">Total Amount: ₹${amount}</p>

                        <h3 style="border-bottom: 2px solid #053342; padding-bottom: 5px;">Shipping Details:</h3>
                        <p>${address.firstName} ${address.lastName}</p>
                        <p>${address.street}, ${address.city}, ${address.state} - ${address.zipcode}</p>
                        <p>${address.country}</p>
                        <p><strong>Contact:</strong> ${address.phone}</p>

                        <p style="margin-top: 20px;">We will notify you once your order is shipped. Thank you for choosing <strong>The Nail Story</strong>! 💅</p>
                    </div>
                    <div style="background-color: #FDF6E6; color: #053342; text-align: center; padding: 10px;">
                        <p>Need help? Contact us at <a href="mailto:thenailsstory1@gmail.com" style="color: #053342; font-weight: bold;">thenailsstory1@gmail.com</a></p>
                    </div>
                </div>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`✅ Order confirmation email sent to ${userEmail}`);

    } catch (error) {
        console.error(`❌ Error sending email: ${error.message}`);
        throw new Error('Failed to send order confirmation email.');
    }
};
