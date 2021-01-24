const Place = require('../models/visitingPlaces');
const User = require('../models/users');
const Schedule = require('../models/schedules');

exports.getDashboard = async (req, res, next) => {
    try {
        const users_count = await User.find().countDocuments() - 1;
        const tourist_count_total = await User.find({ "role": "user" }).countDocuments();
        const tourist_count_in = await User.find({ "role": "user", "userstate": "in" }).countDocuments();
        const place_count = await Place.find().countDocuments();
        const place_locations = await Place.find({}, "name location");
        const schedules_count_total = await Schedule.find().countDocuments();
        const schedules_count_new = await Schedule.find({"state":"new"}).countDocuments();
        const schedules_count_canceled = await Schedule.find({"state":"cancled"}).countDocuments();
        const schedules_count_notcompleted = await Schedule.find({"state":"notcompleted"}).countDocuments();
        const schedules_count_completed = await Schedule.find({"state":"completed"}).countDocuments();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true, dashboardValues: {
                users_count : users_count,
                tourist_count_total : tourist_count_total,
                tourist_count_in : tourist_count_in,
                place_count : place_count,
                place_locations :place_locations,
                schedules_count_total : schedules_count_total,
                schedules_count_new : schedules_count_new,
                schedules_count_canceled : schedules_count_canceled,
                schedules_count_notcompleted : schedules_count_notcompleted,
                schedules_count_completed :schedules_count_completed
            }
        });
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Error while getting data' });
    }
}

exports.putUpdateAdminPassword = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const old_password = req.body.oldPassword;
        const new_password = req.body.password;

        const admin = await User.findById(user_id);
        await admin.changePassword(old_password, new_password);
        await admin.save();

        req.flash("success", "Your password is changed recently. Please login again to confirm");
        res.redirect("/auth/admin-login");
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
};
