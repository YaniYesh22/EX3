$(document).ready(function () {
    let num = 3;
    initialize(num);
    const padding = 230;
    let blackRecHeight = $(".blacks").height();
    let yellowBoxTop = parseInt($(".yellowBox").css("top"), 10);
    let blackBoxTop = parseInt($(".blackBox").css("top"), 10);
    $(".blackRec").click(function () {
        num += 3;
        initialize(num);
        blackRecHeight = $(".blacks").last().height();
        if (blackRecHeight >= $(window).width()) {
            window.alert(`You Have Reached the Size`);
            return;
        }
        let totalHeight = blackRecHeight * 2 + padding; 
        yellowBoxTop += totalHeight; 
        blackBoxTop += totalHeight; 
        $(".yellowBox").css("top", yellowBoxTop + "px"); 
        $(".blackBox").css("top", blackBoxTop + "px"); 
        $("nav, .blue").height(yellowBoxTop); 
    });
});
function initialize(num) {
    const main = $("main")[0];
    let articles = "<div class='mainContent'>";
    const letters = generateLetters(num/2); 
    for (i = 0; i < num; i++) {
        const margBot = i * (-20) +230;
        const size = i * 20 + 80;
        const letter = letters[i];
        articles += `<div class='blacks' style='width: ${size}px; height: ${size}px; margin-bottom: ${margBot};'><div class='letter' style='display: none;font-size: ${size / 2}px;top: ${size / 2}px;left: ${size / 2}px;line-height: ${size}px;'>${letter}</div></div>`;
    }
    articles += "</div>";
    main.innerHTML = articles;
    var clickCount = 0;
    var shown = [];
    var letterShown = [];
    $(".blacks").click(function () {
        clickCount++;
        $(this).find(".letter").show();
        letterShown.push($(this));
        shown.push($(this).find(".letter").text());
        if(clickCount === 2){
            if ($(this)[0] === letterShown[0][0]) {  //check if clicked the same elemnts
                letterShown.pop().find(".letter").hide();
            }
            else if(shown[0] !== shown[1]){         // check if they didnt have the same letter
                letterShown.pop().find(".letter").hide();
                letterShown.pop().find(".letter").hide();
            }
            else{                                   // when same letters are found
                letterShown[0].closest(".blacks").css("background-color", "#32d0dbcb");
                letterShown[1].closest(".blacks").css("background-color", "#32d0dbcb");
                $(letterShown.pop()).off("click");
                $(letterShown.pop()).off("click");
            }
            shown.splice(0, shown.length);
            letterShown.splice(0, letterShown.length);
            clickCount = 0;
        }
        });
}
function generateLetters(num) {
    let letters = [];
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i = 0; i < num; i++) {
        const letter = alphabets.charAt(Math.floor(Math.random() * alphabets.length));
        letters.push(letter);
        letters.push(letter);
    }
    shuffleArray(letters);
    return letters;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function assignLetters(letters) {
    let boxes = $(".blacks");
    for (i = 0; i < boxes.length; i++) {
        const letter = letters[i];
        $(boxes[i]).data("letter", letter); 
        $(boxes[i]).click(function () {
            const letter = $(this).data("letter");
            $(this).text(letter); 
        });
    }
}
