$(document).ready(function(){

    // Initialise the dialog box
    $(function() {
        $("#dialog-message").dialog({
            autoOpen: false,
            modal: true
        });

        // next add the onclick handler
        $("#tours").click(function() {
            $("#dialog-message").dialog("open");
            return false;
        });
    });

    // Make request to server
    var photoList = [];
    var captionList = [];
    $.getJSON('https://9ss7bxey8k.execute-api.ap-southeast-2.amazonaws.com/default/dummy_service', function(json) {
        // Add photos URL to photoList array
        for (var i = 0; i < json.Data.length; i++) {
            photoList.push(json.Data[i].node.frontmatter.cover);
            captionList.push(json.Data[i].node.excerpt);
        }

        // Assign the photo to each element
        for (var i = 0; i < photoList.length; i++) {
            $("li").eq(i).children("img").attr("src", photoList[i]);
            $("li").eq(i).children("img").attr("alt", captionList[i]);
        }

    });

    $('.cta a').click(function() {
        $('html,body').animate({
            scrollTop: $('#tours').offset().top
        }, 500);
        return false;
    });

    $('#tours li').on('click', function() {
        $('#location').val($('img', this).attr('alt'));
        $("#dialog-message").children("img").attr("src", $(this).children("img").attr("src"));
        $("#dialog-message").children("p").text($(this).children("img").attr("alt"));
    });
})
