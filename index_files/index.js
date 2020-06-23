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
//이미지 인덱스
var hitIdx;
//회전하기
var easingIdx;
//결정하기
var decision;
//시간
var time;
// 길이가 0인 예전 방식의 배열 생성 (가로행)
var result1 = new Array();
// 길이가 0인 예전 방식의 배열 생성
var result2 = new Array();
// 길이가 0인 예전 방식의 배열 생성
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

  // Result
  hitDecision();
});

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
    // 화면을 배열에서 랜덤으로출력해준다.
    var idx = Math.floor(Math.random() * slotImg.length);

    // 이미지 파일 조정
    if (i == middleNum - 1) {
      if (decision) {
        //이겻다고판정되면 위닝 인덱스 넣기.
        idx = hitIdx;
      }
      // 마지막에 1행에 오는 화면
      result1[slotno] = idx;
    } else if (i == middleNum) {
      // the last image on the first line
      if (decision) {
        //이겻다고판정되면 위닝 인덱스 넣기.
        idx = hitIdx;
        var obj = document.getElementById("img1");
      }
      result2[slotno] = idx;
    } else if (i == middleNum + 1) {
      if (decision) {
        //이겻다고판정되면 위닝 인덱스 넣기.
        idx = hitIdx;
      }
      // 마지막 3행에 오는 화면
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
    console.log(slotno, result1, result2, result3);
    obj.append(
      "<div class='slot'>" +
        "<img border='0'" +
        " src='Reel/" +
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
  decision = Math.random() < luckyPer; //addtional feature
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

        //score +2000
        //
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

function bling() {
  if (flag === 0) {
    document.querySelector("h1").style.color = "#d6806e";
    flag++;
  } else if (flag === 1) {
    document.querySelector("h1").style.color = "#fbb666";
    flag++;
  } else if (flag === 2) {
    document.querySelector("h1").style.color = "#f9f871";
    flag++;
  } else {
    document.querySelector("h1").style.color = "#f2ecff";
    flag = 0;
  }
}
setInterval(bling, 1000);
