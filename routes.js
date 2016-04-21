// app/routes.js
var path = require('path');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});
	app.get('/test', function(req, res) {
		res.render('client/index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		if(req.isAuthenticated())
			res.redirect('/profile');

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/editProfile',function(req,res){
		res.render('client/editProfile.ejs');

	});
	app.get('/home',function(req,res){
		res.render('client/home.ejs',{

			msg: 'ยินดีต้อนรับ !',
			profile : {
				stuid:'5630520921',
				firstName:'วชิรกรณ์',
				lastName:'รังสิกวานิช',
				tel:'0882391875',
				gender:'ชาย',
				faculty:'วิศวกรรมศาสตร์',
				department:'วิศวกรรมคอมพิวเตอร์',
				birthdate:'26-10-2536',
				f_address:'44/2',
				f_moo:'4',
				f_road:'สุขุมวิท',
				f_subDistrict:'เสม็ด',
				f_district:'เมือง',
				f_city:'ชลบุรี',
				f_postcode:'20000',
				f_country:'ไทย',
				s_address:'83 85 87',
				s_moo:'-',
				s_road:'ทรัพย์',
				s_subDistrict:'สี่พระยา',
				s_district:'บางรัก',
				s_city:'กรุงเทพฯ',
				s_postcode:'10500',
				s_country:'ไทย'
			},
			thesis : {
				thesisTH:'การออกแบบและวิเคราะห์อัลกอริทึมในการปิ้งลูกชิ้น',
				thesisEN:'Design and Analysis of Algorithm in Grilling LookChin',
				advisor:'ศ.ดร.บุญเสริม กิจศิริกุล',
				coadvisor:'ผศ.ดร.โปรดปราน บุณยพุกกณะ',
				scholarship:'ทุนอุดหนุนการวิจัย พัฒนาและวิศวกรรมภาครัฐ ด้านอิเล็กทรอนิกส์ คอมพิวเตอร์โทรคมนาคมและสารสนเทศ',
				award:'รางวัลระบบเอื้ออำนวยการประกอบอาหารเชิงอุตสาหกรรม',
				thconference:'การออกแบบและวิเคราะห์อัลกอริทึมในการปิ้งลูกชิ้น',
				intconference:'การออกแบบและวิเคราะห์อัลกอริทึมในการปิ้งลูกชิ้น',
				thpub:'การออกแบบและวิเคราะห์อัลกอริทึมในการปิ้งลูกชิ้น',
				intpub:'Design and Analysis of Algorithm in Grilling LookChin'

			}


		});

	});
	app.get('/mythesis', function(req, res) {
		res.render('client/mythesis.ejs'); // load the index.ejs file
	});


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
			return next();
	}
	// if they aren't redirect them to the home page
	res.redirect('/');
}