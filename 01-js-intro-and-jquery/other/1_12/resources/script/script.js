/**
 * Created by MaximilianoDaniel on 11/09/2015.
 */
var onClickButton =  function () {

    $('#btnSearch').on('click',onPageReady);

};

var onPageReady = function () {
    var container = $('#albumList');
    var onRequestSuccess;
    var onRequestError;
    var listLength;
    var albums;
    var appendAlbum;
    var $input = $('#txtArtist').val();

    //Clean the container in each search
    container.empty();

    appendAlbum = function (album) {
        var albumItem = $('<article></article>');
        var albumName   = $('<h3>Name: ' +album.name+ ' </h3>');
        var albumType   = $('<h4>Type: '+album.album_type+'</h4>');
        var albumImage = $('<img src="'+album.images[1].url+'" alt="This image show the photo of album called: '+album.name+'" />');

        // var albumReleaseDate = ""; The guide ask for this attribute but i don't find it.
        var albumLink = $('<p> <a href=" '+album.external_urls.spotify+'"> Play the music!</a> </p>');

        albumItem.append(albumName,albumType,albumImage,albumLink);
        container.append(albumItem);
    }


    onRequestSuccess = function (result) {

        listLength = result.albums.items.length;
        albums = result.albums.items;

        console.log(result);

        if (listLength) {
            $.each(albums, function (index, album) {
                //append each album in the section container
                appendAlbum(album);
            });
        }
        else {
            container.append('<p>Album not found </p>');
        }
    };

    onRequestError = function (xhr, status, error) {
        container.append('<p>Something went wrong '+status+' '+error+'</p>');
    };

    $.ajax({
            url: 'https://api.spotify.com/v1/search?',
            type: 'get',
            dataType: 'json',
            data: {
                q: $input,
                type: 'album'
            },
            success: onRequestSuccess,
            error: onRequestError
        }
    );
};

$(document).on('ready', onClickButton);



