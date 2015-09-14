/**
 * Created by MaximilianoDaniel on 11/09/2015.
 */

var onPageReady = function () {
    var processRequest;
    var showError;
    var showComplete;
    var listLength;
    var albums;
    var showAlbum;

    showAlbum = function(album){

    };

    showError = function(xmlHttpRequest,errorText,objectException) {
        window.alert('error');
    };

    showComplete = function(xmlHttpRequest,result) {
        window.alert('complete');
    };

    processRequest = function (result) {
        listLength = result.albums.items.length;
        albums = result.albums.items;

        //window.alert('succes');
        console.log(result);

        if (listLength) {
            $.each(albums, function (i,a) {
                $.('<label>' , {
                    html: 'Name:',

                });
                console.log('album: ' + i + 'album-name: ' + a.name + '\n');
            }
1       }
    };


    showError = function (xmlHttpRequest, errorText, objectException) {
        window.alert('error');
    };

    showComplete = function (xmlHttpRequest, result) {
        //window.alert('complete');
    };

    $.ajax({
            url: 'https://api.spotify.com/v1/search?',
            type: 'get',
            dataType: 'json',
            data: {
                q: 'Rolling Stones',
                type: 'album'
            },
            success: processRequest,
            error: showError,
            complete: showComplete
        }
    );
};
$(document).on('ready', onPageReady);



