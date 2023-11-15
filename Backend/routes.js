// routes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {
  getUserByUsername,
  insertUser,
} = require("./controllers/UserController.js");

// Import sendThankYouEmail from emailer.js
const { sendThankYouEmail } = require("./emailer.js");

const {
  generateFirstPurchasePromoCode,
  generateAutoSendPromoCode,
} = require("./promoCodeController.js");

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user = user; // Store the user in the session

        // Redirect to the main index.html page after successful login
        return res.redirect("/index.html");
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User Registration Route with Promo Code
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, email, fname, lname } = req.body;

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await insertUser(
      username,
      hashedPassword,
      email,
      fname,
      lname
    );

    if (newUser) {
      // Generate and save promo code for first purchase
      const firstPurchasePromoCode = await generateFirstPurchasePromoCode(
        "FIRST20",
        20,
        // Set the valid_until date
      );

      // Send a welcome email with the promo code
      await sendWelcomeEmail(email, username, firstPurchasePromoCode.code);

      // Assign the promo code to the user if needed
      newUser.promoCode = firstPurchasePromoCode.code;

      // Session logic (ensure req.session is initialized)
      if (!req.session) {
        console.error("Session not initialized");
        return res.status(500).json({ message: "Internal Server Error" });
      }

      req.session.user = newUser;

      return res
        .status(201)
        .json({ message: "Sign-up successful", user: newUser });
    } else {
      return res.status(500).json({ message: "Sign-up failed" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Automatic Promo Code Sender
router.get("/auto-send-promo-code", async (req, res) => {
  try {
    // Generate and save promo code for auto-send
    const autoSendPromoCode = await generateAutoSendPromoCode(
      "AUTO10",
      10
      // Set the valid_until date
    );

    // Logic to send promo code to users (email or other notification)
    // ...

    res.status(200).json({ message: "Auto-send promo code successful" });
  } catch (error) {
    console.error("Error in auto-send promo code:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Protected Route
router.get("/protected-route", (req, res) => {
  if (req.session.user) {
    res.json({
      message: "This is a protected route",
      user: req.session.user,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
