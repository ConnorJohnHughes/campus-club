const homePage = (req, res) => {
    res.render("home", { title: "Campus Club Hub" });
};

const dashboardPage = (req, res) => {
    res.render("dashboard", { title: "Member Dashboard" });
};

const adminPage = (req, res) => {
    res.render("admin", { title: "Admin Panel" });
};

export default { homePage, dashboardPage, adminPage };