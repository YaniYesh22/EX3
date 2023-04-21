$(document).ready(function () {
    let num = 6;
    initialize(num);
    const padding = 230;
    let blackRecHeight = $(".blacks").height();
    let yellowBoxTop = parseInt($(".yellowBox").css("top"), 10);
    let blackBoxTop = parseInt($(".blackBox").css("top"), 10);
    $(".blackRec").click(function () {
        num += 2;
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
        const size = i * 20 + 80;
        const letter = letters[i];
        articles += `<div class='blacks' style='width: ${size}px; height: ${size}px;'><div class='letter' style='display: none; color:white; font-size: ${size / 2}px;margin-top: ${size / 10}px;margin-left: ${size / 10}px;text-align: center;line-height: ${size}px;'>${letter}</div></div>`;
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
            if(shown[0] !== shown[1]){
                letterShown.pop().find(".letter").hide();
                letterShown.pop().find(".letter").hide();
            }
            else{
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
