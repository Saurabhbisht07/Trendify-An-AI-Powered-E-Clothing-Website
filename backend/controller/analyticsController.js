import Order from '../model/orderModel.js';
import User from '../model/userModel.js';

export const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalOrders = await Order.countDocuments({});
        
        const revenueResult = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        const salesOverTime = await Order.aggregate([
            {
               $addFields: {
                  dateObj: { $toDate: "$date" }
               }
            },
            {
               $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateObj" } },
                  sales: { $sum: "$amount" }
               }
            },
            { $sort: { _id: 1 } }
        ]);

        const topProducts = await Order.aggregate([
            { $unwind: "$items" },
            { 
               $group: { 
                  _id: "$items.name", 
                  sold: { $sum: { $ifNull: ["$items.quantity", 1] } } 
               } 
            },
            { $sort: { sold: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            totalUsers,
            totalOrders,
            totalRevenue,
            salesOverTime,
            topProducts
        });
    } catch (error) {
        console.error("error getting analytics", error);
        res.status(500).json({ message: "Analytics error", error: error.message });
    }
}
