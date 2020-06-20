/*---------------------
 Customize Settings
-----------------------*/
// Array of slots.
var slotImg = ["BAR.png", "2xBAR.png", "3xBAR.png", "7.png", "Cherry.png"];
// Number of slot images vertically
var slotNum = 50;
// Start position of slot
var startPos = -30 * (slotNum - 2);
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
var hitIdx;
var easingIdx;
var decision;
var time;
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();

/*---------------------
 Functions
-----------------------*/
/* Initialized */
$(document).ready(function () {
  // Hit
  hitDecision();
  // BOX A slot create
  slotCreate($("#slots_a .wrapper"), 1);
  // BOX B slot create
  slotCreate($("#slots_b .wrapper"), 2);
  // BOX C slot create
  slotCreate($("#slots_c .wrapper"), 3);
});

/* Hit Decision */
function hitDecision() {
  hitIdx = Math.floor(Math.random() * slotImg.length);
  decision = Math.random() < luckyPer; //addtional feature
}

/* Create Slot screen*/
function slotCreate(obj, slotno) {
  // Animation stop（Actions when Animation is in Progress）
  obj.stop(true, true);
  // Clear elements in the frame
  obj.children().remove();

  // Save Last Result
  // Save Image Index on Line 1
  var save_result1 = result1[slotno];
  // 2行目の画像INDEXをセーブ
  var save_result2 = result2[slotno];
  // 3行目の画像INDEXをセーブ
  var save_result3 = result3[slotno];

  // Create slot tag
  for (var i = 1; i <= slotNum; i++) {
    // 画像ファイルは配列からランダムに取得
    var idx = Math.floor(Math.random() * slotImg.length);

    // Adjusting the Image File
    if (i == middleNum - 1) {
      // 最後に1行目にくる画像
      result1[slotno] = idx;
    } else if (i == middleNum) {
      // the last image on the first line
      if (decision) {
        // Set a winning index if you decide to win.
        idx = hitIdx;
      }
      result2[slotno] = idx;
    } else if (i == middleNum + 1) {
      // The last image on line three
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
        " src='Reel/" +
        slotImg[idx] +
        "'" +
        " width='70' height='56' />" +
        "</div>"
    );
  }

  // Set the Slot Image Start Position
  obj.css({
    "margin-top": startPos + "px",
  });
}

/* Start Slot */
function slotStart() {
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
        $("#slotMsg").html("BINGO !!!");
      } else {
        // Failure message alert
        $("#slotMsg").html("TRY AGAIN");
      }

      // active start button
      $("#startBtn").prop("disabled", false);

      // Delete Queue
      $(this).dequeue();
    });
}

/* スロット画像移動 */
function slotMove(obj, slotno) {
  if (obj.css("margin-top") != startPos + "px") {
    // スロットが動いた後であれば、スロット画像を再作成
    slotCreate(obj, slotno);
  }

  // スロット画像の移動アニメーション
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
