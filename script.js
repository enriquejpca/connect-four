(function () {
    var currentPlayer = "player1";

    function switchPlayer() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        if (i < 0) {
            return;
        }
        //Check for victory.
        // console.log(checkForVictory(slots));
        //console.log("slotsInCol", slotsInCol);
        if (checkForVictory(slotsInCol)) {
            //Do victory dance
            board.addClass("scale");
            setTimeout(function () {
                showPopup();
            }, 3000);
        } else if (checkForVictory($(".row" + i))) {
            //Do victory dance
            board.addClass("scale");
            setTimeout(function () {
                showPopup();
            }, 3000);
        } else if (checkForVictoryInDiagonal(winningCombos)) {
            board.addClass("scale");
            setTimeout(function () {
                showPopup();
            }, 3000);
        }

        //If no victory was found, switch players.
        switchPlayer();
    });

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    //Victory
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function checkForVictoryInDiagonal() {
        var count = 0;
        var slots = $(".slot");
        for (var i = 0; i < winningCombos.length; i++) {
            for (var x = 0; x < winningCombos[x].length; x++) {
                if (slots.eq(winningCombos[i][x]).hasClass(currentPlayer)) {
                    count++;
                }
            }
            if (count == 4) {
                return true;
            } else {
                count = 0;
            }
        }
    }

    function showPopup() {
        var popup = $(".popup");
        console.log(popup);
        $(".popup").show();
    }

    function closePopup() {
        var close = $(".close");
        console.log(close);
        close.on("click", function () {
            $(".popup").hide();
            location.reload();
        });
    }
    closePopup();

    var board = $("#board");
    var column = board.children();

    column.on("mouseenter", function (e) {
        var sel = $(e.currentTarget);
        column.removeClass("columnplayer");
        sel.addClass("columnplayer");
    });

    var winningCombos = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38],
    ];
})();
