const productModel = require("../../models/productModel")

const filterProductController = async (req, res) => {
    try {
        const brandNameList = req?.body?.brandName || []
        const chipSetList = req?.body?.chipSet || []
        const GPUList = req?.body?.gpu || []
        const ramList = req?.body?.ram || []
        const screenList = req?.body?.screen || []
        const storageList = req?.body?.storage || []
        const osList = req?.body?.os || []
        const weightList = req?.body?.weight || []
        const batteryList = req?.body?.battery || []
        const minPrice = req.body.priceMin || ""
        const maxPrice = req.body.priceMax || ""

        const query = {};
        if (brandNameList.length > 0) {
            query.brandName = { $in: brandNameList };
        }
        if (chipSetList.length > 0) {
            query.chipSet = { $in: chipSetList };
        }
        if (GPUList.length > 0) {
            query.gpu = { $in: GPUList };
        }
        if (ramList.length > 0) {
            query.ram = { $in: ramList };
        }
        if (screenList.length > 0) {
            query.screen = { $in: screenList };
        }
        if (storageList.length > 0) {
            query.storage = { $in: storageList };
        }
        if (osList.length > 0) {
            query.os = { $in: osList };
        }
        if (weightList.length > 0) {
            query.weight = { $in: weightList };
        }
        if (batteryList.length > 0) {
            query.battery = { $in: batteryList };
        }
        if (minPrice && maxPrice) {
            query.sellingPrice = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.sellingPrice = { $gte: minPrice };
        } else if (maxPrice) {
            query.sellingPrice = { $lte: maxPrice };
        }
        products = await productModel.find(query);

        res.json({
            data: products,
            message: "products",
            success: true,
            error: false,

        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = filterProductController