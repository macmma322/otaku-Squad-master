const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// Emailer Configuration
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "Gmail",
    auth: {
      user: "macmma422@gmail.com",
      pass: "vmys frjt txag xtpv", // Use the generated App Password for Gmail
    },
  })
);

// Function to send a thank-you email
async function sendWelcomeEmail(email, username, promoCode) {
  const mailOptions = {
    from: "macmma422@gmail.com",
    to: email,
    subject:
      "A Heartfelt Welcome – Thank You for Choosing [Your Company Name]!",
    text: `Dear ${username},\n\nOn behalf of the entire [Your Company Name] family, I extend to you the warmest greetings and heartfelt gratitude for becoming a part of our thriving community!\n\nYour decision to register with us speaks volumes, and we are genuinely thrilled to welcome you aboard. In a world brimming with choices, we're honored you chose [Your Company Name] as your preferred destination for all things extraordinary.\n\nAs a token of our appreciation, we're delighted to present you with an exclusive promo code: ${promoCode}. Feel free to use this code during checkout for special discounts on your purchases.\n\nAs you embark on this exciting journey with us, I want to assure you that your satisfaction is our unwavering commitment. [Your Company Name] is more than just an online marketplace; it's a haven where your desires meet exceptional products, exclusive deals, and unparalleled service.\n\nIn the coming days, anticipate a treasure trove of experiences tailored just for you. From personalized recommendations based on your preferences to early access to our latest collections, we want every interaction with [Your Company Name] to be nothing short of magical.\n\nOur website is a canvas of possibilities waiting for your exploration. Dive into a world where innovation meets style, and where every click brings you closer to discovering something extraordinary. Should you ever seek assistance, our dedicated customer support team stands ready to make your journey seamless. You can reach them at [Customer Support Email].\n\nYour trust in us is the cornerstone of our success, and we are committed to exceeding your expectations at every turn. Whether you're here for the latest trends, exclusive offers, or a unique shopping experience, [Your Company Name] is your digital home.\n\nThank you once again for choosing [Your Company Name]. We look forward to being your companion on this exciting digital adventure and creating memories that last a lifetime.\n\nWith heartfelt appreciation,\nThe [Your Company Name] Family`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Add your own error handling logic here
  }
}

// Function to send a promo code email
const sendPromoCodeEmail = async (email, promoCode) => {
  // Configure your email sending setup
  const transporter = nodemailer.createTransport({
    // Your email sending configuration
  });

  // Define the email content
  const mailOptions = {
    from: "macmma422@gmail.com",
    to: email,
    subject: "Your Promo Code is Here!",
    text: `Congratulations! You have received a promo code: ${promoCode}. Enjoy your discount!`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendPromoCodeEmail,
};
