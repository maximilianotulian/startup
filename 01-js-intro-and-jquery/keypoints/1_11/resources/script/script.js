/**
 * Created by MaximilianoDaniel on 11/09/2015.
 */

var onPageReady = function () {
    var processRequest;
    var showError;
    var showComplete;
    var listLenght;
    var listAlbums;
    var showAlbum;

    showAlbum = function(album){

    };
    showError = function(xmlHttpRequest,errorText,objectException) {
        window.alert('error');
    };

    showComplete = function(xmlHttpRequest,result) {
        window.alert('complete');
    };

    processRequest = function(result) {
        listLenght = result.albums.items.length;
        listAlbums = result.albums.items;

        window.alert('succes');
        console.log(result);
        if(listLenght){
            $.each(listAlbums, function(index,album){
                showAlbum(album);
            })
        }

    };



    $.ajax({
            url:'https://api.spotify.com/v1/search?',
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



