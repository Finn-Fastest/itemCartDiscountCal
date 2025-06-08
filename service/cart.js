const cartServices = {};
cartServices.priceCaculate = async ({ cartItems, campaigns = [], customerPoints = 0 }) => {
    let originalTotal = cartItems.reduce((sum, item) => sum + item.price * (item?.amount || 0), 0);
    let total = originalTotal;

    const findCampaign = (type, subtype = null) => {
        return campaigns.find((c) => {
            if (c.amount < 0) throw "Amount should be greater than 0";
            if (c.type === type && (subtype ? c.subtype === subtype : true)) {
                return c;
            }
        });
    };
    const couponFixed = findCampaign("coupon", "fixed");
    const couponPercent = findCampaign("coupon", "percent");

    if (couponFixed) {
        total -= couponFixed.amount;
    } else if (couponPercent) {
        if (couponPercent.amount <= 0) throw "Percent should be greater than 0";
        total *= couponPercent.amount / 100;
    }

    const onTopCategory = findCampaign("ontop", "category");
    if (onTopCategory) {
        cartItems.forEach((item) => {
            if (item.category.toLowerCase() === onTopCategory.category.toLowerCase()) {
                total -= item.price * (onTopCategory.percent / 100);
            }
        });
    }

    const pointsDiscount = Math.min(customerPoints, total * 0.2);
    if (pointsDiscount) {
        if (pointsDiscount < total * 0.2) {
            total -= pointsDiscount;
        } else {
            throw "Points discount should be below than 20% of total price";
        }
    }

    const seasonal = findCampaign("seasonal");
    if (seasonal) {
        const thresholdCount = Math.floor(total / seasonal.threshold);
        total -= thresholdCount * seasonal.discountPerThreshold;
    }

    return {
        originalTotal,
        discountApplied: originalTotal - total,
        finalPrice: Math.max(0, Math.round(total * 100) / 100),
    };
};

module.exports = cartServices;
