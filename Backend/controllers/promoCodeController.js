// promoCodeController.js
const { client } = require("./db");

const generatePromoCode = async (code, discountPercentage, validUntil, type) => {
    try {
        const result = await client.query(
            "INSERT INTO public.promocodes (code, discount_percentage, valid_until, type) VALUES ($1, $2, $3, $4) RETURNING *",
            [code, discountPercentage, validUntil, type]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error generating promo code:", error);
        return null;
    }
};

const validatePromoCode = async (code) => {
    try {
        const result = await client.query(
            "SELECT * FROM public.promocodes WHERE code = $1 AND valid_until >= NOW()",
            [code]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error validating promo code:", error);
        return null;
    }
};

module.exports = {
    generatePromoCode,
    validatePromoCode,
};