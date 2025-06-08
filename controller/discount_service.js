const cartModule = require("../service/cart");

const cartController = {};
cartController.priceCaculate = async (req, res) => {
    try {
        let price = await cartModule.priceCaculate({
            cartItems: req.body.cartItems,
            campaigns: req.body.campaigns,
            customerPoints: req.body.customerPoints,
        });
        res.status(200).send(price);
    } catch (e) {
        res.status(400).send(e)
    }
};

module.exports = cartController;
