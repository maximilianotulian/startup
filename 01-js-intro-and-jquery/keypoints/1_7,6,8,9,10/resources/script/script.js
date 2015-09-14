/**
 * Created by MaximilianoDaniel on 10/09/2015.
 */



var onPageReady = function () {
    var input = $('.alias');
    var button = $('#btn-hit-me');
    var section = $('section.hidden');

    section.fadeIn('normal', function () {
        input.focus();
    });

    button.click(function () {
        var inputValue = input.val() || 'guest';

        $.ajax({
            url: 'http://bootcamp.aws.af.cm/welcome/' + inputValue,
            success: function (result) {
                section.text(result.response);
            },
            error: function (request, errorTest, objectException) {
                section.addClass('has-error');
                section.text('not found');
            }
        });
    });
};

$(document).on('ready', onPageReady);



