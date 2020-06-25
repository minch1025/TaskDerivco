/*---------------------
 Customize Settings
-----------------------*/
// Array of slots.
var slotImg = ["BAR.png", "2xBAR.png", "3xBAR.png", "7.png", "Cherry.png"];
// Number of slot images vertically
var slotNum = 50;
// Start position of slot
var startPos = -30 * (slotNum - 3);
// Stopped position of slot
var stopPos = -150;
// The number of the slot image in the middle (second line) at the end
var middleNum = 7;
// Array of rolling effect（jQuery easing）
var slotEasing = ["swing", "easeOutQuart", "easeOutBack", "easeOutBounce"];
// Rolling count
var slotDuration = 5;
// Jack pot percentage （1=100%、0.5=50%）
var luckyPer = 0.3;

/*---------------------
 Definitions
-----------------------*/
//Image Index
var hitIdx;
//Image Rotation
var easingIdx;
//Make a decision
var decision;
var time;
//
var result1 = new Array();
//
var result2 = new Array();
//
var result3 = new Array();

/*---------------------
 Functions
-----------------------*/
/* Initialized */
$(document).ready(function () {
  // BOX A slot create
  slotCreate($("#slots_a .wrapper"), 1);
  // BOX B slot create
  slotCreate($("#slots_b .wrapper"), 2);
  // BOX C slot create
  slotCreate($("#slots_c .wrapper"), 3);
});

/* Create Slot screen*/
function slotCreate(obj, slotno) {
  // Animation stop（Actions when Animation is in Progress）
  console.log(obj);
  console.log(slotno);

  obj.stop(true, true);
  // Clear elements in the frame
  obj.children().remove();

  // Save Last Result
  // Save Image Index on Line 1
  var save_result1 = result1[slotno];
  //save index on 2 line
  var save_result2 = result2[slotno];
  //save index on 3line
  var save_result3 = result3[slotno];

  // Create slot tag
  for (var i = 1; i <= slotNum; i++) {
    //screen showed randomly on screen array.
    var idx = Math.floor(Math.random() * slotImg.length);

    // adjust image file
    if (i == middleNum - 1) {
      // line 1 after slot rotation.
      result1[slotno] = idx;
    } else if (i == middleNum) {
      // the last image on the first line
      if (decision) {
        //If winning decision, input index.
        idx = hitIdx;
      }
      result2[slotno] = idx;
    } else if (i == middleNum + 1) {
      // line 3 after slot rotation.
      result3[slotno] = idx;
    } else if (i == slotNum - 2) {
      // the first image that appears on the first line
      if (save_result1 != undefined) {
        // Set the image index on the first line of the last result.
        idx = save_result1;
      }
    } else if (i == slotNum - 1) {
      // the first image that appears on the second line
      if (save_result2 != undefined) {
        // Set Last Result Line 2 Image INDEX
        idx = save_result2;
      }
    } else if (i == slotNum) {
      // the first image to appear on the third line
      if (save_result3 != undefined) {
        // Set the image index on the third line of the last result.
        idx = save_result3;
      }
    }

    obj.append(
      "<div class='slot'>" +
        "<img border='0'" +
        " src='Reel_img/" +
        slotImg[idx] +
        "'" +
        " width='40' height='26' />" +
        "</div>"
    );
  }

  // Set the Slot Image Start Position
  obj.css({
    "margin-top": startPos + "px",
  });
}

/* Hit Decision */
function hitDecision() {
  hitIdx = Math.floor(Math.random() * slotImg.length);
  //boolean value
  decision = Math.random() < luckyPer;
}

/* Insert batting number */
/* Slot validation */
/* Range 1-5000 */
function BattingCoin() {
  var addCredit = $("#BattingText").val();
  if (Number.isNaN(parseInt(addCredit))) {
    alert("Please insesrt number !");
  } else if (1 <= parseInt(addCredit) && parseInt(addCredit) <= 5000) {
    var currentCredit = $("#slotCredits").text();
    //console.log(typeof addCredit);
    //console.log(typeof currentCredit);
    $("#slotCredits").text(parseInt(addCredit) + parseInt(currentCredit));
  } else {
    alert("1-5000 is required!");
  }
}

/* Start Slot */
function slotStart() {
  //
  // Disabled start button
  $("#startBtn").prop("disabled", true);

  // Notice start message
  $("#slotMsg").html("GO !!");

  if ($("#slots_a .wrapper").css("margin-top") != startPos + "px") {
    // After the slot is moved, the winning decision is performed again.
    hitDecision();
  }

  // Obtaining Slot Rotation Seconds
  time = slotDuration * 2000;
  // Random rotation effects of slots
  easingIdx = Math.floor(Math.random() * slotEasing.length);

  // Slot image movement of A frame
  slotMove($("#slots_a .wrapper"), 1);
  // Slot image move of B frame slightly later
  setTimeout(function () {
    slotMove($("#slots_b .wrapper"), 2);
  }, 200);
  // Moving the slot image of C frame a little later.
  setTimeout(function () {
    slotMove($("#slots_c .wrapper"), 3);
  }, 400);

  // Processing after slot stopped (runs after seconds of rotation in jQuery queue)
  $(this)
    .delay(time + 500)
    .queue(function () {
      // Hit decision
      if (result2[1] == result2[2] && result2[1] == result2[3]) {
        // Hit message alert

        //Bingo for 2row 2line
        if (result2[1] + result2[2] + result2[3] == 12) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 1000);
        } else if (result2[1] + result2[2] + result2[3] == 9) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 150);
        } else if (result2[1] + result2[2] + result2[3] == 6) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 50);
        } else if (result2[1] + result2[2] + result2[3] == 3) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 20);
        } else if (result2[1] + result2[2] + result2[3] == 0) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 10);
        } else $("#slotMsg").html("BINGO !!!");

        //Cherry for  1 line bingo
      } else if (result1[1] == result1[2] && result1[1] == result1[3]) {
        if (result1[1] + result1[2] + result1[3] == 12) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 2000);
        }
        $("#slotMsg").html("BINGO !!!");
        // Cherry for 3 line bingo
      } else if (result3[1] == result3[2] && result3[1] == result3[3]) {
        if (result3[1] + result3[2] + result3[3] == 12) {
          var currentCredit = $("#slotCredits").text();
          $("#slotCredits").text(parseInt(currentCredit) + 4000);
        }
        $("#slotMsg").html("BINGO !!!");
      } else {
        $("#slotMsg").html("TRY AGAIN");
      }

      // active start button
      //slotCredits were - 1 coin
      if ($("#startBtn").prop("disabled", false)) {
        var td = document.getElementById("slotCredits");
        var n = Number(td.innerHTML);
        td.innerHTML = n - 1;
      }

      // Delete Queue
      $(this).dequeue();
    });
}

/* Slot image movement */
function slotMove(obj, slotno) {
  if (obj.css("margin-top") != startPos + "px") {
    //If slot was worked, slot image recreate.
    slotCreate(obj, slotno);
  }

  // Slot image movement animation.
  obj.animate(
    {
      "margin-top": stopPos + "px",
    },
    {
      duration: time,
      easing: slotEasing[easingIdx],
    }
  );
}
