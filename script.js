/*
 * script.js - This module hosts the main functionality of the site.
 */

/** CONSTANTS **/

const SCHEDULE_TXT_DAY_1 ="6:00|pm Opening & Introduction\n" +
  "\n" +
  "6:30|pm WS1 (Dynamic HTML)\n" +
  "\n" +
  "7:30|pm Dinner\n" +
  "\n" +
  "8:00|pm WS2 (Data Visualization)\n" +
  "\n" +
  "8:45|pm Team Formation & Work Time\n" +
  "\n" +
  "11:30|pm Conclusion of Makes Day 1\n"
const SCHEDULE_TXT_DAY_2 =
    "1:00|pm Mentor check-in/work\n" +
    "\n" +
    "2:00|pm Snacks + <activity> Break\n" +
    "\n" +
    "5:00|pm Closing + showcase\n"
const HACKER_GUIDE_URL = "https://github.com/uncommonhacks/guide";
const HELP_TXT =
  "* Use W, A, S, D to move. \n" +
  "* Click on the pins to\n" +
  "   teleport around the \n" +
  "   map.\n";
const MLH_COC_URL = "https://static.mlh.io/docs/mlh-code-of-conduct.pdf";
const HELP_BUTTON_RECT = [30, 110, 200, 250];
const HELP_MLH_COC_RECT = [115, 1135, 270, 310];
const SCHED_EXIT_RECT = [370, 415, 85, 120];
const DRAPE_EXIT_RECT = [370, 415, 35, 70];

const WORKSHOPS_INITIAL_TEXT = "Workshop Information TBA";

const PROJECTS_INITIAL_TEXT = "Project Information";

const ABOUT_INITIAL_TEXT = "The Uncommon Hacks team is bringing you Uncommon Makes," +
" a collaborative makeathon and workshop series!"+
" We will present a series of workshops and talks geared"+
" towards UChicago students interested in getting their hands dirty with web-based technologies."+
" Over the course of the event, attend workshops that showcase several cool ways to build a site,"+
" and then make an HTML page of your own! At the end, we’ll stitch all of them together in an e-quilt"+
" that will celebrate the creativity of the tech community at UChicago."+
" Join us at the MADD Center at Crerar to learn, create, and make!"

  // "Uncommon hacks is a weekend-long celebration of technology where college " +
  // "students from everywhere come to chicago to make fun, random, and innovative " +
  // "tech-related projects with friends old and new. You'll work in a small team " +
  // "to design and build a creative project from start to finish in a weekend, learning " +
  // "and having fun in the process.";

const FAQ_INITIAL_TEXT =
  "1. How can I apply to Uncommon Makes 2021? " +
  "2. If I want to go to one workshop, do I have to attend the whole event and do I have to attend both days? " +
  "3. Can I participate remotely? " +
  "4. I’ve never coded before. Will I be able to participate in the workshops? " +
  "5. Will lunch or dinner be provided? " +
  "6. The event is tomorrow and I forgot to sign up! Can I still attend? " +
  "7. I participated in Uncommon Makes in previous years. Will the event be the same? " +
  "8. I participated in Uncommon Hacks last year. Will the event be the same? " +
  "9. Do I have to come to the event with a team? " +
  "10. Will materials (computers, hardware, etc.) be provided? ";
const FAQ_ANSWER_1 =
  "Fill out our sign-up form (https://bit.ly/Makes2021Signup) and " +
  "make sure to confirm your participation during 7th Week when we " +
  "send out confirmation emails.";
const FAQ_ANSWER_2 =
  "No, you do not need to be present for two days or even an entire " +
  "day. Just indicate on the registration form which events you’ll be" + 
  "attending. However, each day of Makes will feature workshops as" +
  "well as free time to work and seek mentorship that we’d love for " +
  "you to participate in!";
const FAQ_ANSWER_3 =
  "Yes! We’ll be livestreaming the workshops and offer opportunities " + 
  "to collaborate on projects remotely.";
const FAQ_ANSWER_4 =
  "The workshops are beginner-level but they do require very basic CS " +
  "experience. You will have no problem if you have taken any CS class " +
  "before but we also welcome all students to attend.";
const FAQ_ANSWER_5 =
  "We will be providing individually packed meals on Friday; on Saturday" +
  "we will have lots of snacks and refreshments for participants.";
const FAQ_ANSWER_6 =
  "Yes, we will be accepting walk-ins on a first-come, first-served basis." +
  "If you forgot to sign up, please try to come early to ensure you get a spot.";
const FAQ_ANSWER_7 =
  "No! This year, we are splitting Makes into workshops and a makeathon to" + 
  "make it more accessible and convenient for everyone.";
const FAQ_ANSWER_8 =
  "No, Uncommon Makes is a much more informal, learning-based event. While" + 
  "we’ll have project showcases and opportunities for collaboration and mentorship," +
  "there won’t be various prize categories. Stay tuned for information about Hacks" +
  "2022 happening in April 2022!";
const FAQ_ANSWER_9 =
  "No, the event will not have any kind of competition and will not require a team." + 
  "However, workshops and projects can be done in pairs or teams if you’d like!";
const FAQ_ANSWER_10 =
  "Workshop materials such as code templates will be provided. We ask that you bring your own laptop.";
const REGISTRATION_TEXT = "Click here to register";
const REGISTRATION_URL = "https://bit.ly/Makes2021Signup";
const STEP = 3;
const SCALE = 1;
const CHARACTER_FRAME_WIDTH = 26;
const CHARACTER_FRAME_HEIGHT = 41;
const CHARACTER_CANVAS_WIDTH = SCALE * CHARACTER_FRAME_WIDTH;
const CHARACTER_CANVAS_HEIGHT = SCALE * CHARACTER_FRAME_HEIGHT;
const CLEAR_CHARACTER_DELTA_X = (CHARACTER_FRAME_WIDTH / 4) * SCALE;
const CLEAR_CHARACTER_DELTA_Y = (CHARACTER_FRAME_HEIGHT / 4) * SCALE;
const CLEAR_CHARACTER_CANVAS_WIDTH =
  2 * CLEAR_CHARACTER_DELTA_X + CHARACTER_CANVAS_WIDTH;
const CLEAR_CHARACTER_CANVAS_HEIGHT =
  2 * CLEAR_CHARACTER_DELTA_Y + CHARACTER_CANVAS_HEIGHT;
const CHARACTER_POSITIONS_LOOP = [1, 0, 1, 2];
const FACING_DOWN = 2;
const FACING_UP = 0;
const FACING_LEFT = 1;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 8;
const MOVEMENT_SPEED = 1 * SCALE;
const DEBUG = 0;
const BBFUDGE = 2 * SCALE;
const BB1XL = 110 * SCALE;
const BB1XH = BB1XL + CHARACTER_CANVAS_WIDTH;
const BB1YL = 200 * SCALE - CHARACTER_CANVAS_HEIGHT;
const BB1YH = 420 * SCALE;
const BB2XL = BB1XH;
const BB2XH = 400 * SCALE;
const BB2YH = BB1YH;
const BB2YL = BB2YH - CHARACTER_CANVAS_HEIGHT - BBFUDGE;
const BB3XL = BB2XH - CHARACTER_CANVAS_WIDTH - 3 * BBFUDGE;
const BB3XH = BB3XL + CHARACTER_CANVAS_WIDTH + 3 * BBFUDGE;
const BB3YL = BB2YH;
const BB3YH = 505 * SCALE;
const BB4XL = BB3XH;
const BB4XH = 492 * SCALE;
const BB4YH = BB3YH;
const BB4YL = BB4YH - CHARACTER_CANVAS_HEIGHT - 2 * BBFUDGE;
const BB5XH = BB4XH;
const BB5XL = BB5XH - CHARACTER_CANVAS_WIDTH - 4 * BBFUDGE;
const BB5YL = 300 * SCALE - BBFUDGE;
const BB5YH = BB4YL;
const BB6XL = BB5XH;
const BB6XH = 535 * SCALE;
const BB6YL = BB5YL * SCALE;
const BB6YH = BB6YL + CHARACTER_CANVAS_HEIGHT + 2 * BBFUDGE;
const BB7XH = BB6XH;
const BB7XL = BB7XH - CHARACTER_CANVAS_WIDTH;
const BB7YL = 220 * SCALE;
const BB7YH = BB6YL;
const BB8XH = BB4XH;
const BB8XL = BB8XH - CHARACTER_CANVAS_WIDTH - 3 * BBFUDGE;
const BB8YL = BB4YH;
const BB8YH = 610 * SCALE + BBFUDGE;
const BB9XL = BB8XH;
const BB9XH = 1036 * SCALE;
const BB9YH = BB8YH;
const BB9YL = BB9YH - CHARACTER_CANVAS_HEIGHT - 2 * BBFUDGE;
const BB10XH = BB9XH;
const BB10XL = BB10XH - CHARACTER_CANVAS_WIDTH;
const BB10YL = 500 * SCALE;
const BB10YH = BB9YL;
const BB11XL = 890 * SCALE;
const BB11XH = 1170 * SCALE;
const BB11YH = 295 * SCALE;
const BB11YL = BB11YH - CHARACTER_CANVAS_HEIGHT;


// about
const TP1XL = 105;
const TP1YL = 400;
const TP1XH = 370;
const TP1YH = 500;


// workshops
const TP2XL = 320;
const TP2YL = 210;
const TP2XH = 550;
const TP2YH = 310;

// schedule
const TP3XL = 370;
const TP3YL = 520;
const TP3XH = 550;
const TP3YH = 650;

// FAQ

const TP4XL = 600;
const TP4YL = 210;
const TP4XH = 850;
const TP4YH = 310;

// Projects
const TP5XL = 900;
const TP5YL = 210;
const TP5XH = 1250;
const TP5YH = 310;

// Register
const TP6XL = 910;
const TP6YL = 520;
const TP6XH = 1100;
const TP6YH = 650;

const BOUNDING_BOXES = [
  [110, 135, 425, 648],
  [0, 650, 490, 512],
  [130, 520, 622, 648],
  [345, 368, 240, 648],
  [625, 650, 240, 512],
  [650, 1250, 345, 370],
  [895, 920, 345, 648],
  [895, 1050, 622, 648],
  [920, 945, 220, 370],
  //   [BB6XL, BB6XH, BB6YL, BB6YH],
  //   [BB7XL, BB7XH, BB7YL, BB7YH],
  //   [BB8XL, BB8XH, BB8YL, BB8YH],
  //   [BB9XL, BB9XH, BB9YL, BB9YH],
  //   [BB10XL, BB10XH, BB10YL, BB10YH],
  //   [BB11XL, BB11XH, BB11YL, BB11YH],
  [TP1XL, TP1XH, TP1YL, TP1YH],
  [TP2XL, TP2XH, TP2YL, TP2YH],
  [TP3XL, TP3XH, TP3YL, TP3YH],
  [TP4XL, TP4XH, TP4YL, TP4YH],
  [TP5XL, TP5XH, TP5YL, TP5YH],
  [TP6XL, TP6XH, TP6YL, TP6YH]
];


const TELEPORT_BOXES = [
  [TP1XL, TP1XH, TP1YL, TP1YH],
  [TP2XL, TP2XH, TP2YL, TP2YH],
  [TP3XL, TP3XH, TP3YL, TP3YH],
  [TP4XL, TP4XH, TP4YL, TP4YH],
  [TP5XL, TP5XH, TP5YL, TP5YH],
  [TP6XL, TP6XH, TP6YL, TP6YH]
];
const TP1X = 110;
const TP1Y = 412;
const TP2X = 345;
const TP2Y = 238;
const TP3X = 474;
const TP3Y = 595;
const TP4X = 624;
const TP4Y = 234;
const TP5X = 920;
const TP5Y = 234;
const TP6X = 1012;
const TP6Y = 596;
const TELEPORT_COORDS = [
  [TP1X, TP1Y],
  [TP2X, TP2Y],
  [TP3X, TP3Y],
  [TP4X, TP4Y],
  [TP5X, TP5Y],
  [TP6X, TP6Y]
  // [TP1XL, TP1YL],
  // [TP2XL, TP2YL],
  // [TP3XL, TP3YL],
  // [TP4XL, TP4YL],
  // [TP5XL, TP5YL],
  // [TP6XL, TP6YL]
];
const faq_answers = [
  [FAQ_ANSWER_1],
  [FAQ_ANSWER_2],
  [FAQ_ANSWER_3],
  [FAQ_ANSWER_4],
  [FAQ_ANSWER_5],
  [FAQ_ANSWER_6],
  [FAQ_ANSWER_7],
  [FAQ_ANSWER_8],
  [FAQ_ANSWER_9],
  [FAQ_ANSWER_10],
];

/** GLOBAL VARIABLES **/

let canvas = document.getElementById("sketchpad");
let banner_canvas = document.getElementById("banner");
let banner_ctx = banner_canvas.getContext("2d");
let drape_canvas = document.getElementById("drape");
let drape_ctx = drape_canvas.getContext("2d");
var drape_scale = 3;

var fm_default = 5;
var fm_answerstxt = 6;
var abouttext = new Pktext(banner_canvas, banner_ctx, false, 4, fm_default);
var workshopstext = new Pktext(banner_canvas, banner_ctx, false, 4, fm_default);
var projectstext = new Pktext(banner_canvas, banner_ctx, false, 4, fm_default);

var faqs = new Pktext(banner_canvas, banner_ctx, true, 4, fm_default);
var answerstxt = new Pktext(banner_canvas, banner_ctx, false, 4, fm_answerstxt);
var registrationtxt = new Pktext(
  banner_canvas,
  banner_ctx,
  false,
  4,
  fm_default
);
var answer_index = 0;
var redraw_banner = false;
var body_font = "55px open-sans-semibold";
var answer_font = "55px open-sans-light";

var banner_state = "empty";
var banner_exit = "empty";
var prev_banner_state = "empty";

let schedule_state = false;
let schedule_exit = false;
let schedule_clear = false;
let schedule_txt_day1 = [];
let schedule_txt_day2 = [];

let ctx = canvas.getContext("2d");
let currentBoundingBoxInd = 0;
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let img = new Image();
let is_faq = 2;
let is_about = 0;
let is_registration = 0;
let keyPresses = {};
var prevX, prevY;
var positionX = 110;//300;
var positionY = 600; //512- CHARACTER_CANVAS_HEIGHT;


let uparrow_src_xl = 0;
let uparrow_src_yl = 0;
let uparrow_src_w = 100;
let uparrow_src_h = 100;
let uparrow_banner_xl = 90;
let uparrow_banner_yl = 250;
let uparrow_banner_w = 100;
let uparrow_banner_h = 100;
let uparrow_banner_rect = [90, 190, 250, 350];
let downarrow_src_xl = 0;
let downarrow_src_yl = 0;
let downarrow_src_w = 100;
let downarrow_src_h = 100;
let downarrow_banner_xl = 90;
let downarrow_banner_yl = 400;
let downarrow_banner_w = 100;
let downarrow_banner_h = 100;
let downarrow_banner_rect = [90, 190, 400, 500];
let backarrow_src_xl = 0;
let backarrow_src_yl = 0;
let backarrow_src_w = 100;
let backarrow_src_h = 100;
let backarrow_banner_xl = 90;
let backarrow_banner_yl = 70;
let backarrow_banner_w = 100;
let backarrow_banner_h = 100;
let backarrow_banner_rect = [90, 190, 70, 170];

var uparrow = new Image(10, 10);
var downarrow = new Image(10, 10);
var backarrow = new Image(10, 10);
var bannerimg = new Image(1000, 100);
var schedule = new Image(1000, 1000);

var belvedere = new Image(2730, 1780);
belvedere.src = "assets/sponsors/belvedere.png";
let belvedere_url = "http://www.belvederetrading.com/careers";
let belvedere_rect = [410, 560, 275, 375];

var cdac = new Image(1511, 1363);
cdac.src = "assets/sponsors/cdac.png";
let cdac_url = "https://cdac.uchicago.edu";
let cdac_rect = [655, 790, 260, 390];

var gs = new Image(785, 338);
gs.src = "assets/sponsors/gs_blue_transparent.png";
let gs_url = "https://www.goldmansachs.com/careers/index.html";
let gs_rect = [410, 580, 100, 175];

var imc = new Image(396, 72);
imc.src = "assets/sponsors/imc.svg";
let imc_url = "https://careers.imc.com/us/en";
let imc_rect = [505, 715, 190, 235];

var n26 = new Image(1200, 817);
n26.src = "assets/sponsors/n26.png";
let n26_url = "https://n26.com/en/careers";
let n26_rect = [440, 540, 495, 565];

var pathrise = new Image(4056, 1071);
pathrise.src = "assets/sponsors/pathrise.png";
let pathrise_url = "https://www.pathrise.com";
let pathrise_rect = [520, 700, 585, 630];

var peak6 = new Image(800, 156);
peak6.src = "assets/sponsors/peak6.png";
let peak6_url = "https://www.peak6.com/careers";
let peak6_rect = [630, 835, 120, 170];

var flt = new Image(1090, 116);
flt.src = "assets/sponsors/flt.png";
let flt_url = "https://www.fleetcor.com/en/careers.html";
let flt_rect = [500, 720, 420, 450];

var smule = new Image(2400, 1397);
smule.src = "assets/sponsors/smule.png";
let smule_url = "http://hackp.ac/mlh-stickermule-hackathons";
let smule_rect = [670, 795, 485, 560];

var help = new Image(1000, 1000);
var help_clicked = false;
let help_state = false;
let help_exit = false;
let help_clear = false;
let help_txt = [];

var sponsors_state = false;
var sponsors_clear = false;

var faq_person = new Image(100, 100);
var registration_person = new Image(100, 100);
var about_person = new Image(100, 100);
var schedule_person = new Image(100, 100);

let about_header_text = document.getElementById("about-text");
let workshops_header_text = document.getElementById("workshops-text");

let faq_header_text = document.getElementById("faq-text");
let projects_header_text = document.getElementById("projects-text");

let register_header_text = document.getElementById("register-text");
let schedule_header_text = document.getElementById("schedule-text");
let sponsors_header_text = document.getElementById("sponsors-text");
var header_text_changed = false;

/** INTERACTIONS **/

function banner_click(event) {
  var rect = banner_canvas.getBoundingClientRect();
  var scaleX = banner_canvas.width / rect.width;
  var scaleY = banner_canvas.height / rect.height;
  var x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
  var y = (event.clientY - rect.top) * scaleY;
  var farright = x >= banner_canvas.width * 0.875;
  var farleft = x <= banner_canvas.width * 0.05;
  var top = y <= banner_canvas.height / 2;
  var bottom = !top;

  if (rect_contains(uparrow_banner_rect, x, y)) {
    if (banner_state === "faq_questions") {
      faqs.change_block(-1);
    } else if (banner_state === "faq_answers") {
      answerstxt.change_block(-1);
    } else if (banner_state === "about") {
      abouttext.change_block(-1);
    }
    redraw_banner = true;
  } else if (rect_contains(downarrow_banner_rect, x, y)) {
    if (banner_state === "faq_questions") {
      faqs.change_block(1);
    } else if (banner_state === "faq_answers") {
      answerstxt.change_block(1);
    } else if (banner_state === "about") {
      abouttext.change_block(1);
    }
    redraw_banner = true;
  } else if (rect_contains(downarrow_banner_rect, x, y)) {
    if (banner_state === "faq_questions") {
      faqs.change_block(1);
    } else if (banner_state === "faq_answers") {
      answerstxt.change_block(1);
    } else if (banner_state === "about") {
      abouttext.change_block(1);
    }
    redraw_banner = true;
    
  } else if (rect_contains(backarrow_banner_rect, x, y)) {
    if (banner_state === "faq_answers") {
      banner_state = "faq_questions";
    } else if (banner_state === "faq_questions") {
      banner_exit = "faq_questions";
    } else if (banner_state === "about") {
      banner_exit = "about";
    } else if (banner_state === "projects") {
      banner_exit = "projects";
    } else if (banner_state === "workshops") {
      banner_exit = "workshops";
    } else if (banner_state === "registration") {
      banner_exit = "registration";
    }
    redraw_banner = true;
  } else if (banner_state === "faq_questions") {
    if (160 <= y && y <= 280) {
      n = 0;
    } else if (280 < y && y <= 400) {
      n = 1;
    } else if (400 < y && y <= 520) {
      n = 2;
    } else if (520 < y && y <= 640) {
      n = 3;
    } else {
      n = -1;
    }

    if (n != -1) {
      if (n + faqs.cblock < faq_answers.length) {
        answerstxt.update_text(faq_answers[n + faqs.cblock][0]);
        answer_index = n + faqs.cblock;
      }
      banner_state = "faq_answers";
      answerstxt.reset_block();
    }
    redraw_banner = true;
  } else {
    if (banner_state === "registration") {
      window.open(REGISTRATION_URL);
    } else if (banner_state === "faq_answers" && answer_index == 7) {
      window.open(HACKER_GUIDE_URL);
    } else if (banner_state === "faq_answers" && answer_index == 8) {
      window.open(MLH_COC_URL);
    }
  }
}

function draw_banner(bc, bctx, bstate) {
  banner_ctx.drawImage(bannerimg, 0, 0, 1920, 360, 0, 0, 3840, 720);
  switch (bstate) {
    case "faq_questions":
      draw_hdr(bctx, "FAQ");
      draw_text(bctx, faqs, body_font);
      banner_ctx.drawImage(
        uparrow,
        uparrow_src_xl,
        uparrow_src_xl,
        uparrow_src_w,
        uparrow_src_h,
        uparrow_banner_xl,
        uparrow_banner_yl,
        uparrow_banner_w,
        uparrow_banner_h
      );
      banner_ctx.drawImage(
        downarrow,
        downarrow_src_xl,
        downarrow_src_xl,
        downarrow_src_w,
        downarrow_src_h,
        downarrow_banner_xl,
        downarrow_banner_yl,
        downarrow_banner_w,
        downarrow_banner_h
      );
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      banner_ctx.drawImage(
        faq_person,
        0,
        0,
        510,
        425,
        banner_canvas.width * 0.75,
        banner_canvas.width * 0.0135,
        banner_canvas.width * 0.175,
        banner_canvas.width * 0.145
      );
      break;
    case "faq_answers":
      draw_hdr(bctx, "FAQ");
      draw_text(bctx, answerstxt, answer_font);
      banner_ctx.drawImage(
        uparrow,
        uparrow_src_xl,
        uparrow_src_xl,
        uparrow_src_w,
        uparrow_src_h,
        uparrow_banner_xl,
        uparrow_banner_yl,
        uparrow_banner_w,
        uparrow_banner_h
      );
      banner_ctx.drawImage(
        downarrow,
        downarrow_src_xl,
        downarrow_src_xl,
        downarrow_src_w,
        downarrow_src_h,
        downarrow_banner_xl,
        downarrow_banner_yl,
        downarrow_banner_w,
        downarrow_banner_h
      );
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      banner_ctx.drawImage(
        faq_person,
        0,
        0,
        510,
        425,
        banner_canvas.width * 0.75,
        banner_canvas.width * 0.0135,
        banner_canvas.width * 0.175,
        banner_canvas.width * 0.145
      );
      break;
    case "workshops":
      draw_hdr(bctx, "WORKSHOPS");
      draw_text(bctx, workshopstext, body_font);
      banner_ctx.drawImage(
        uparrow,
        uparrow_src_xl,
        uparrow_src_xl,
        uparrow_src_w,
        uparrow_src_h,
        uparrow_banner_xl,
        uparrow_banner_yl,
        uparrow_banner_w,
        uparrow_banner_h
      );
      banner_ctx.drawImage(
        downarrow,
        downarrow_src_xl,
        downarrow_src_xl,
        downarrow_src_w,
        downarrow_src_h,
        downarrow_banner_xl,
        downarrow_banner_yl,
        downarrow_banner_w,
        downarrow_banner_h
      );
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      break;
    case "projects":
      draw_hdr(bctx, "PROJECTS");
      draw_text(bctx, projectstext, body_font);
      banner_ctx.drawImage(
        uparrow,
        uparrow_src_xl,
        uparrow_src_xl,
        uparrow_src_w,
        uparrow_src_h,
        uparrow_banner_xl,
        uparrow_banner_yl,
        uparrow_banner_w,
        uparrow_banner_h
      );
      banner_ctx.drawImage(
        downarrow,
        downarrow_src_xl,
        downarrow_src_xl,
        downarrow_src_w,
        downarrow_src_h,
        downarrow_banner_xl,
        downarrow_banner_yl,
        downarrow_banner_w,
        downarrow_banner_h
      );
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      break;
    case "about":
      draw_hdr(bctx, "ABOUT");
      draw_text(bctx, abouttext, body_font);
      banner_ctx.drawImage(
        uparrow,
        uparrow_src_xl,
        uparrow_src_xl,
        uparrow_src_w,
        uparrow_src_h,
        uparrow_banner_xl,
        uparrow_banner_yl,
        uparrow_banner_w,
        uparrow_banner_h
      );
      banner_ctx.drawImage(
        downarrow,
        downarrow_src_xl,
        downarrow_src_xl,
        downarrow_src_w,
        downarrow_src_h,
        downarrow_banner_xl,
        downarrow_banner_yl,
        downarrow_banner_w,
        downarrow_banner_h
      );
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      banner_ctx.drawImage(
        about_person,
        0,
        0,
        564,
        435,
        banner_canvas.width * 0.77,
        banner_canvas.width * 0.0135,
        banner_canvas.width * 0.175,
        banner_canvas.width * 0.145
      );
      break;
    case "registration":
      draw_hdr(bctx, "REGISTRATION");
      draw_text(bctx, registrationtxt, body_font);
      banner_ctx.drawImage(
        backarrow,
        backarrow_src_xl,
        backarrow_src_xl,
        backarrow_src_w,
        backarrow_src_h,
        backarrow_banner_xl,
        backarrow_banner_yl,
        backarrow_banner_w,
        backarrow_banner_h
      );
      banner_ctx.drawImage(
        registration_person,
        0,
        0,
        501,
        435,
        banner_canvas.width * 0.75,
        banner_canvas.width * 0.0135,
        banner_canvas.width * 0.175,
        banner_canvas.width * 0.145
      );
      break;
    default:
      break;
  }
}

function dist(x, y, x2, y2) {
  return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
}

function draw_schedule_txt(day1, day2) {
  drape_ctx.fillStyle = "#006699";
  drape_ctx.font = "150px silkscreen";
  drape_ctx.fillText("Schedule", 500 * drape_scale, 120 * drape_scale);

  //   /* BEGIN TMP */
  //   drape_ctx.fillStyle = "#000000"
  //   drape_ctx.font = "105px silkscreen";
  //   drape_ctx.fillText("Coming Soon", 490 * drape_scale,
  //                      200 * drape_scale);
  //   /* END TMP */
  tile_pos_x = canvas.width / 2 - 136;
  tile_pos_y = canvas.height / 2 - 255;
  drape_ctx.font = "105px silkscreen";
  drape_ctx.fillText(
    "Friday, November 12",
    tile_pos_x - 220,
    tile_pos_y + 400
  );

  drape_ctx.font = "105px silkscreen";
  drape_ctx.fillText(
    "Saturday, November 13",
    tile_pos_x + 1420,
    tile_pos_y + 400
  );

  drape_ctx.fillStyle = "#000000";
  drape_ctx.font = "75px silkscreen";
  let offset = 0;
  for (var i = 0; i < day1.length; i++) {
    line = day1[i].split("|");
    if (line.length == 2) {
      drape_ctx.fillText(
        line[0],
        tile_pos_x - 220,
        tile_pos_y + 425 + 75 * (i + offset + 1)
      );
      drape_ctx.fillText(
        line[1],
        tile_pos_x + 20,
        tile_pos_y + 425 + 75 * (i + offset + 1)
      );
    } else {
      drape_ctx.fillText(
        line[0],
        tile_pos_x + 240,
        tile_pos_y + 425 + 75 * (i + offset + 1)
      );
    }
  }

  for (var i = 0; i < day2.length; i++) {
    line = day2[i].split("|");
    if(line == ""){
      continue;
    }
    drape_ctx.fillText(
      line[0],
      tile_pos_x + 1420,
      tile_pos_y + 425 + 75 * (i + 1)
    );
    drape_ctx.fillText(
      line[1],
      tile_pos_x + 1660,
      tile_pos_y + 425 + 75 * (i + 1)
    );
  }
  drape_ctx.drawImage(
    schedule_person,
    0,
    0,
    500,
    435,
    canvas.width * 2.2,
    canvas.width * 1.1,
    canvas.width * 0.325,
    canvas.width * 0.3
  );
}

function draw_help_txt(help_txt) {
  drape_ctx.fillStyle = "#006699";
  drape_ctx.font = "150px silkscreen";
  drape_ctx.fillText("Help", 558 * drape_scale, 105 * drape_scale);
  drape_ctx.fillStyle = "#000000";
  drape_ctx.font = "90px silkscreen";
  for (var i = 0; i < help_txt.length; i++) {
    drape_ctx.fillText(
      help_txt[i],
      380 * drape_scale,
      (105 + 50 * (i + 1)) * drape_scale
    );
  }
}

function draw_text(bctx, txt, font) {
  bctx.font = font;
  bctx.fillStyle = "#000000";
  txt.update_blocks();
  for (var i = 0; i < txt.lines; i++) {
    if (txt.cblock + i < txt.blocks.length) {
      bctx.fillText(
        txt.blocks[txt.cblock + i],
        txt.width * 0.06,
        txt.font_size * (i + 2)
      );
    }
  }
}

function draw_hdr(bctx, hdr) {
  bctx.font = "90px Oswald";
  bctx.fillStyle = "#006699";
  bctx.fillText(hdr, 233, 163);
}

/*
 * draw_drape
 */
function draw_drape(
  width_scale = 1,
  start_coord_coeff = 1,
  backarrow_shift = 0,
  schedule_shift = 0
) {
  drape_canvas.setAttribute("style", "display: block;");
  drape_ctx.drawImage(
    schedule,
    0,
    0,
    600,
    800,
    Math.round(370 / start_coord_coeff) * drape_scale,
    (20 + schedule_shift) * drape_scale,
    500 * drape_scale * width_scale,
    (680 - Math.round(3 * schedule_shift)) * drape_scale
  );
  drape_ctx.drawImage(
    backarrow,
    0,
    0,
    100,
    100,
    380 * drape_scale,
    (35 + backarrow_shift) * drape_scale,
    35 * drape_scale,
    35 * drape_scale
  );
}

/*
 * clear_drape
 */
function clear_drape() {
  drape_ctx.clearRect(0, 0, drape_canvas.width, drape_canvas.height);
  drape_canvas.setAttribute("style", "display: none;");
}

/*
 * draw_sponsors - Draw the sponsors.
 */
function draw_sponsors() {
  drape_ctx.fillStyle = "#006699";
  drape_ctx.font = "150px silkscreen";
  drape_ctx.fillText("Sponsors", 490 * drape_scale, 70 * drape_scale);

  drape_ctx.drawImage(
    gs,
    0,
    0,
    785,
    338,
    420 * drape_scale,
    100 * drape_scale,
    165 * drape_scale,
    75 * drape_scale
  );
  drape_ctx.drawImage(
    peak6,
    0,
    0,
    800,
    156,
    670 * drape_scale,
    110 * drape_scale,
    150 * drape_scale,
    30 * drape_scale
  );
  drape_ctx.drawImage(
    imc,
    0,
    0,
    396,
    72,
    520 * drape_scale,
    200 * drape_scale,
    206.25 * drape_scale,
    37.5 * drape_scale
  );

  drape_ctx.drawImage(
    belvedere,
    0,
    0,
    2730,
    1780,
    420 * drape_scale,
    285 * drape_scale,
    (2730 / 18) * drape_scale,
    (1780 / 18) * drape_scale
  );
  drape_ctx.drawImage(
    cdac,
    0,
    0,
    1511,
    1363,
    670 * drape_scale,
    270 * drape_scale,
    (1511 / 11) * drape_scale,
    (1363 / 11) * drape_scale
  );
  drape_ctx.drawImage(
    flt,
    0,
    0,
    1090,
    116,
    520 * drape_scale,
    430 * drape_scale,
    212.5 * drape_scale,
    22.6 * drape_scale
  );

  drape_ctx.drawImage(
    pathrise,
    0,
    0,
    4056,
    1017,
    540 * drape_scale,
    600 * drape_scale,
    (4056 / 24) * drape_scale,
    (1017 / 24) * drape_scale
  );
  drape_ctx.drawImage(
    n26,
    0,
    0,
    1200,
    817,
    460 * drape_scale,
    510 * drape_scale,
    (1200 / 14) * drape_scale,
    (817 / 14) * drape_scale
  );
  drape_ctx.drawImage(
    smule,
    0,
    0,
    2400,
    1397,
    690 * drape_scale,
    500 * drape_scale,
    (2400 / 20) * drape_scale,
    (1397 / 20) * drape_scale
  );
}

/*
 * interaction_update - this function is called in gameLoop
 * to do all of the checks for the interaction functionalities.
 *
 * Arguments: none
 *
 * Returns: none
 */
function interaction_update() {
  if (dist(positionX, positionY, 110, 600) < 45) {
    activate_help_state();
  }
  else {
    deactivate_help_state();
  }
  if (dist(positionX, positionY, TP3X, TP3Y) >= 45) {
    deactivate_schedule_state();
  }
  

  if (dist(positionX, positionY, TP4X, TP4Y) < 45) {
    if (banner_state === "faq_answers");
    else if (!(banner_exit === "faq_questions")) {
      banner_state = "faq_questions";
      baner_exit = "empty";
    } else {
      banner_state = "empty";
    }
  } else if (dist(positionX, positionY, TP6X, TP6Y) < 45) {
    if (!(banner_exit === "registration")) {
      banner_state = "registration";
      banner_exit = "empty";
    } else {
      banner_state = "empty";
    }
  } else if (dist(positionX, positionY, TP1X, TP1Y) < 45) {
    // //console.log("AAAA")
    if (!(banner_exit === "about")) {
      banner_state = "about";
      banner_exit = "empty";
    } else {
      banner_state = "empty";
    }
  } else if (dist(positionX, positionY, TP2X, TP2Y) < 45) {
    // //console.log("AAAA")
    if (!(banner_exit === "workshops")) {
      banner_state = "workshops";
      banner_exit = "empty";
    } else {
      banner_state = "empty";
    }
  } else if (dist(positionX, positionY, TP5X, TP5Y) < 45) {
    // //console.log("AAAA")
    if (!(banner_exit === "projects")) {
      banner_state = "projects";
      banner_exit = "empty";
    } else {
      banner_state = "empty";
    }
  } else if (dist(positionX, positionY, TP3X, TP3Y) < 45) {
    // schedule??
    // console.log("schedule!")
    // console.log(schedule_state)
    // console.log(schedule_clear)
    banner_state = "empty";
    banner_exit = "empty";
    if (!schedule_clear) {//if (!schedule_state && !schedule_clear) {
      activate_schedule_state();
    }
  // } else if (dist(positionX, positionY, 1115, 255) < 45) {
  //   // sponsors???
  //   banner_state = "empty";
  //   banner_exit = "empty";
  //   if (!sponsors_state && !sponsors_clear) {
  //     activate_sponsors_state();
  //   }
  } else {
    // console.log("else!");
    banner_state = "empty";
    banner_exit = "empty";
    if (schedule_state) {
      deactivate_schedule_state();
    } else if (schedule_clear) {
      schedule_clear = false;
    } else if (sponsors_state) {
      deactivate_sponsors_state();
    } else if (sponsors_clear) {
      sponsors_clear = false;
  }}

  if (banner_state != prev_banner_state || redraw_banner) {
    if (banner_state === "empty") {
      banner_canvas.style.display = "none";
      banner_ctx.clearRect(0, 0, banner_canvas.width, banner_canvas.height);
    } else {
      banner_canvas.style.display = "block";
      draw_banner(banner_canvas, banner_ctx, banner_state);
    }
    prev_banner_state = banner_state;
    redraw_banner = false;
  }
}

function rect_contains(rect, x, y) {
  var xl = rect[0];
  var xh = rect[1];
  var yl = rect[2];
  var yh = rect[3];
  var ret = false;

  if (xl <= x && x <= xh && yl <= y && y <= yh) {
    ret = true;
  }

  return ret;
}

/*
 * teleport_text_action - Increase the size of the
 * teleport texts on mousemove.
 */
function teleport_text_action(x, y) {
  if (rect_contains(TELEPORT_BOXES[0], x, y)) {
    about_header_text.setAttribute(
    //faq_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 15.5vw; top: 17vw;"
      "color: red;"
    );
    header_text_changed = true;
  } else if (rect_contains(TELEPORT_BOXES[1], x, y)) {
    workshops_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 26.2vw; top: 2.0vw;"
      "color: red;"
    );
    header_text_changed = true;
  } else if (rect_contains(TELEPORT_BOXES[2], x, y)) {
    schedule_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 26.2vw; top: 2.0vw;"
      "color: red;"
    );
    header_text_changed = true;
  } else if (rect_contains(TELEPORT_BOXES[3], x, y)) {
    faq_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 26.2vw; top: 2.0vw;"
      "color: red;"
    );
    header_text_changed = true;
  } else if (rect_contains(TELEPORT_BOXES[4], x, y)) {
    projects_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 26.2vw; top: 2.0vw;"
      "color: red;"
    );
    header_text_changed = true;
  } else if (rect_contains(TELEPORT_BOXES[5], x, y)) {
    register_header_text.setAttribute(
      "style",
      // "font-size: 2.8vw;" // left: 26.2vw; top: 2.0vw;"
      "color: red;"
    );
    header_text_changed = true;
  }else if (header_text_changed) {
    about_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );
    workshops_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );
    schedule_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );
    faq_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );
    projects_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );
    register_header_text.setAttribute(
      "style",
      // "font-size: 2.2vw;" // left: 16vw; top: 17.7vw;"
      "color: #f9e512;"
    );


    // register_header_text.setAttribute(
    //   "style",
    //   "font-size: 2.2vw;" // left: 27.5vw; top: 2.6vw;"
    // );
    // schedule_header_text.setAttribute(
    //   "style",
    //   "font-size: 2.2vw;" // left: 42.8vw; top: 34.9vw;"
    // );
    // about_header_text.setAttribute(
    //   "style",
    //   "font-size: 2.2vw;" // right: 9.7vw; top: 30vw;"
    // );
    // sponsors_header_text.setAttribute(
    //   "style",
    //   "font-size: 2.2vw;" // right: 1vw; top: 12vw;"
    // );
    header_text_changed = false;
  }
}

/*
 * activate_schedule_state - Activate schedule text.
 */
function activate_schedule_state() {
  draw_drape(2.25, 5.25, 50, 40);
  draw_schedule_txt(schedule_txt_day1, schedule_txt_day2);
  schedule_state = true;
  schedule_clear = false;
}

/*
 * deactivate_schedule_state - Deactivate schedule text.
 */
function deactivate_schedule_state() {
  clear_drape();
  schedule_state = false;
  schedule_clear = false;
}

/*
 * help_activate - Activate help text.
 */
function activate_help_state() {
  help_state = true;
  draw_drape();
  draw_help_txt(help_txt);
}

/*
 * help_deactivate - Deactivate help text.
 */
function deactivate_help_state() {
  help_state = false;
  clear_drape();
}

/*
 * activate_sponsors_state - activate sponors image
 */
function activate_sponsors_state() {
  sponsors_state = true;
  draw_drape();
  draw_sponsors();
}

/*
 * deactivate_sponsors_state
 */
function deactivate_sponsors_state() {
  sponsors_state = false;
  clear_drape();
}

/** EVENT HANDLERS **/

function bannerClickEventHandler(event) {
  /* Pass the click to the necessary handlers. */
  var store_positionX = positionX;
  var store_positionY = positionY;

  if (positionX != store_positionX || positionY != store_positionY) {
    banner_state = "empty";
  }
  banner_click(event);
  interaction_update();
  event.stopPropagation();
}

/*
 *  sketchpadClickEventHandler - Handle the click event for the canvas.
 *
 * Arguments:
 * event :: event - The event in question.
 *
 * Returns: none
 */
function sketchpadClickEventHandler(event) {
  var rect = canvas.getBoundingClientRect(); // abs. size of element
  var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
  var scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
  var x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
  var y = (event.clientY - rect.top) * scaleY;

  if (rect_contains(HELP_BUTTON_RECT, x, y)) {
    activate_help_state();
  } else {
    teleport(event);
  }

  /* Prevent the click from going to deeper DOM elements. */
  event.stopPropagation();
}

/*
 * drapeClickEventHandler
 */
function drapeClickEventHandler(event) {
  var rect = canvas.getBoundingClientRect(); // abs. size of element
  var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
  var scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
  var x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
  var y = (event.clientY - rect.top) * scaleY;
  //console.log("cx " + x + " cy " + y);
  if (help_state) {
    if (rect_contains(DRAPE_EXIT_RECT, x, y)) {
      deactivate_help_state();
    }
  } else if (schedule_state) {
    if (rect_contains(SCHED_EXIT_RECT, x, y)) {
      deactivate_schedule_state();
      schedule_clear = true;
    }
  } else if (sponsors_state) {
    if (rect_contains(DRAPE_EXIT_RECT, x, y)) {
      deactivate_sponsors_state();
      sponsors_clear = true;
    } else if (rect_contains(belvedere_rect, x, y)) {
      window.open(belvedere_url);
    } else if (rect_contains(cdac_rect, x, y)) {
      window.open(cdac_url);
    } else if (rect_contains(gs_rect, x, y)) {
      window.open(gs_url);
    } else if (rect_contains(imc_rect, x, y)) {
      window.open(imc_url);
    } else if (rect_contains(n26_rect, x, y)) {
      //console.log("n26");
      window.open(n26_url);
    } else if (rect_contains(pathrise_rect, x, y)) {
      window.open(pathrise_url);
    } else if (rect_contains(peak6_rect, x, y)) {
      window.open(peak6_url);
    } else if (rect_contains(flt_rect, x, y)) {
      window.open(flt_url);
    } else if (rect_contains(smule_rect, x, y)) {
      window.open(smule_url);
    }
  }

  /* Prevent the click from going to deeper DOM elements. */
  event.stopPropagation();
}

/*
 * sketchpadMouseMoveEventHandler - Execute this
 * handler when the mouse is on the sketchpad.
 */
function sketchpadMouseMoveEventHandler(event) {
  /* Get coordinates. */
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;
  var x = (event.clientX - rect.left) * scaleX;
  var y = (event.clientY - rect.top) * scaleY;

  /* Execute handlers. */
  teleport_text_action(x, y);
}

function keyDownListener(event) {
  keyPresses[event.key] = true;
}

function keyUpListener(event) {
  keyPresses[event.key] = false;
}

/** CHARACTER MOVEMENT **/

function legalPosition(x, y) {
  // //console.log(x, y);
  /* The character coordinates are the top-left coordinates of its image. */
  var tlx = x;
  var tly = y;
  var trx = x + CHARACTER_CANVAS_WIDTH;
  var try_ = y;
  var blx = x;
  var bly = y + CHARACTER_CANVAS_HEIGHT;
  var brx = x + CHARACTER_CANVAS_WIDTH;
  var bry = y + CHARACTER_CANVAS_HEIGHT;
  var top_left_legal = false;
  var top_right_legal = false;
  var bot_left_legal = false;
  var bot_right_legal = false;
  var legal = false;
  var bb = 0;
  var bbxl = 0;
  var bbxh = 0;
  var bbyl = 0;
  var bbyh = 0;

  /* Traverse all bounding boxes. Check that character extrema
   * are contained in at least one box. */
  for (var i = 0; i < BOUNDING_BOXES.length; i++) {
    bb = BOUNDING_BOXES[i];
    bbxl = bb[0] - CHARACTER_CANVAS_WIDTH / 2;
    bbxh = bb[1] + CHARACTER_CANVAS_WIDTH / 2;
    bbyl = bb[2] - CHARACTER_CANVAS_HEIGHT + 5;
    bbyh = bb[3] + CHARACTER_CANVAS_HEIGHT - 40;
    //console.log(bbxl, tlx, tlx, bbxh, bbyl, tly, tly, bbyh);
    if (bbxl <= tlx && tlx <= bbxh && bbyl <= tly && tly <= bbyh) {
      top_left_legal = true;
    }
    if (bbxl <= trx && trx <= bbxh && bbyl <= try_ && try_ <= bbyh) {
      top_right_legal = true;
    }
    if (bbxl <= brx && brx <= bbxh && bbyl <= bry && bry <= bbyh) {
      bot_right_legal = true;
    }
    if (bbxl <= blx && blx <= bbxh && bbyl <= bly && bly <= bbyh) {
      bot_left_legal = true;
    }

    if (
      top_left_legal &&
      top_right_legal &&
      bot_left_legal &&
      bot_right_legal
    ) {
      legal = true;
      break;
    }
  }
  //console.log(top_left_legal, top_right_legal, bot_left_legal, bot_right_legal);
  return legal;
}

/*
 * clear_character - Remove the character from the canvas.
 *
 * Arguments:
 * ctx :: CanvasRenderingContext2D - The canvas context associated
 *     with the character.
 *
 * Returns: none
 */
function clear_character(ctx) {
  ctx.clearRect(
    prevX - CLEAR_CHARACTER_DELTA_X,
    prevY - CLEAR_CHARACTER_DELTA_Y,
    CLEAR_CHARACTER_CANVAS_WIDTH,
    CLEAR_CHARACTER_CANVAS_HEIGHT
  );
}

/*
 * draw_character - Put the character to the canvas.
 *
 * Arguments:
 * canvas_x :: float - The x position on the canvas to draw the character to.
 * canvas_y :: float - The y position on the canvas to draw the character to.
 * character_frame_index_x :: int - Specifies the x offset in the character's
 *    svg file that corresponds to a unique position.
 * character_frame_index_y :: int - Specifies the y offset in the character's
 *     svg file that corresponds to a unique position.
 */
function draw_character(
  canvas_x,
  canvas_y,
  character_frame_index_x,
  character_frame_index_y
) {
  character_frame_x = character_frame_index_x * CHARACTER_FRAME_WIDTH;
  character_frame_y = character_frame_index_y * CHARACTER_FRAME_HEIGHT;
  ctx.drawImage(
    img,
    character_frame_x,
    character_frame_y,
    CHARACTER_FRAME_WIDTH,
    CHARACTER_FRAME_HEIGHT,
    canvas_x,
    canvas_y,
    CHARACTER_CANVAS_WIDTH,
    CHARACTER_CANVAS_HEIGHT
  );
}

function teleport(event) {
  var rect = canvas.getBoundingClientRect(); // abs. size of element
  var scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
  var scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
  var x = (event.clientX - rect.left) * scaleX; // scale mouse coordinates after they have
  var y = (event.clientY - rect.top) * scaleY;

  /* Do teleport. */
  for (i = 0; i < TELEPORT_BOXES.length; i++) {
    tpb = TELEPORT_BOXES[i];
    tpxl = tpb[0];
    tpxh = tpb[1];
    tpyl = tpb[2];
    tpyh = tpb[3];
    if (tpxl <= x && x <= tpxh && tpyl <= y && y <= tpyh) {
      prevX = positionX;
      prevY = positionY;
      positionX = TELEPORT_COORDS[i][0];
      positionY = TELEPORT_COORDS[i][1];
      clear_character(ctx);
      draw_character(
        positionX,
        positionY,
        CHARACTER_POSITIONS_LOOP[currentLoopIndex],
        currentDirection
      );
    }
  }
}

function moveCharacter(deltaX, deltaY, direction) {
  if (!legalPosition(positionX + deltaX, positionY + deltaY)) {
    return;
  }
  if (
    positionX + deltaX > 0 &&
    positionX + CHARACTER_CANVAS_WIDTH + deltaX < canvas.width
  ) {
    prevX = positionX;
    positionX += deltaX;
  }
  if (
    positionY + deltaY > 0 &&
    positionY + CHARACTER_CANVAS_HEIGHT + deltaY < canvas.height
  ) {
    prevY = positionY;
    positionY += deltaY;
  }
  currentDirection = direction;
}

/*
 * draw_path - This function draws all of the bounding paths to the canvas.
 *
 * Arguments: none
 *
 * Returns: none
 */
function draw_path() {
  BOUNDING_BOXES.forEach(([xMin, xMax, yMin, yMax]) => {
    ctx.beginPath();
    ctx.rect(xMin, yMin, xMax - xMin, yMax - yMin);
    ctx.stroke();
  });
  TELEPORT_BOXES.forEach(([xl, xh, yl, yh]) => {
    ctx.beginPath();
    ctx.rect(xl, yl, xh - xl, yh - yl);
    ctx.stroke();
  });
}

function character_update() {
  let hasMoved = false;
  // //console.log(positionX, positionY);
  /* Update the character's position. */
  if (keyPresses.w) {
    // console.log("w");
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.s) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
    redraw = true;
  }

  if (keyPresses.a) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.d) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  /* Update the leg movements of the character. */
  if (hasMoved) {
    redraw = true;
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CHARACTER_POSITIONS_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  } else {
    /* If the character is idle its legs should be idle. */
    if ((currentLoopIndex = 0)) {
      redraw = false;
    } else {
      redraw = true;
      currentLoopIndex = 0;
    }
  }

  if (redraw) {
    clear_character(ctx);
    draw_character(
      positionX,
      positionY,
      CHARACTER_POSITIONS_LOOP[currentLoopIndex],
      currentDirection
    );
  }
}

/*
 * gameLoop - This function wraps gameLoop_
 * so that gameLoop_ is updated every tick.
 */
function gameLoop() {
  /* Do character updates / redraws. */
  // console.log("f");
  character_update();

  /* Do interaction updates / redraws. */
  interaction_update();

  /* Misc updates. */
  if (1) {
    draw_path();
  }

  /* Callback into this function. */
  window.requestAnimationFrame(gameLoop);
}

/* INITIALIZATION */

function init() {
  /* Do static loads. */
  deactivate_schedule_state();
  uparrow.src = "./assets/up-03.svg";
  downarrow.src = "./assets/down-04.svg";
  backarrow.src = "./assets/back-02.svg";
  bannerimg.src = "./assets/box-05.svg";
  faq_person.src = "./assets/lighthouse_person_talk.png";
  registration_person.src = "./assets/mayor_talk.png";
  about_person.src = "./assets/resident_talk.png";
  schedule_person.src = "./assets/mapshop_person_talk.png";
  schedule.src = "assets/schedule.svg";
  schedule_txt_day1 = SCHEDULE_TXT_DAY_1.split("\n");
  schedule_txt_day2 = SCHEDULE_TXT_DAY_2.split("\n");
  help.src = "assets/help.svg";
  help_txt = HELP_TXT.split("\n");
  faqs.update_text(FAQ_INITIAL_TEXT);
  abouttext.update_text(ABOUT_INITIAL_TEXT);
  workshopstext.update_text(WORKSHOPS_INITIAL_TEXT);
  projectstext.update_text(PROJECTS_INITIAL_TEXT);
  registrationtxt.update_text(REGISTRATION_TEXT);

  window.addEventListener("keydown", keyDownListener);
  window.addEventListener("keyup", keyUpListener);

  canvas.addEventListener("click", sketchpadClickEventHandler);
  canvas.addEventListener("mousemove", sketchpadMouseMoveEventHandler);

  banner_canvas.setAttribute("style", "display: none;");
  banner_canvas.addEventListener("click", bannerClickEventHandler);
  banner_ctx.font = "120px Oswald";

  /* Initially drape is not displayed. */
  drape_canvas.setAttribute("style", "display: none;");
  drape_canvas.addEventListener("click", drapeClickEventHandler);

  /* Load the background. Then enter the animation frame loop. */
  img.src = "assets_new/main.png";
  img.onload = function () {
    window.requestAnimationFrame(gameLoop);
  };
}
