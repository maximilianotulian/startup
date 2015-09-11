/**
 * Created by MaximilianoDaniel on 10/09/2015.
 */



//Exercise 1_6 begin
$('section:hidden').fadeIn('normal');
var inputFocus = $('input').first();
inputFocus.focus();

//Exercise 1_6 end

//Exercise 1_7,8,9 begin
$('input[type="button"]').click(function () {
    $.ajax({
        url: 'http://bootcamp.aws.af.cm/welcome/yourname',
        success: function (result) {
            console.log(result.response);
            inputFocus.val(result.response);
        },
        error: function (a, b, c) {
            inputFocus.parent().addClass('has-error');
            inputFocus.val('Not found');
        }
    });
});
//Exercise 1_7,8,9 end

