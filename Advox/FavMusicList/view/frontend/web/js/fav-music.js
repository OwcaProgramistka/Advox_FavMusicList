define(["ko", "uiComponent", "jquery", "jquery/jquery-storageapi"], function (
    ko,
    Component,
    $
) {
    "use strict";

    let albumsList = $.localStorage.get("albumsList")
        ? $.localStorage.get("albumsList")
        : [];
    albumsList.forEach((album) => {
        album.isTheBest = ko.observable(album.isTheBest);
    });

    return Component.extend({
        defaults: {
            album: "",
            artist: "",
            albumsList: ko.observableArray(albumsList),
            tracks: {
                album: true,
                artist: true,
            },
            listens: {
                albumsList: "onAlbumsList",
            },
        },
        handleSubmit: function () {
            let albumsListItem = {
                artist: this.artist,
                album: this.album,
                isTheBest: ko.observable(false),
            };
            this.albumsList.push(albumsListItem);
            this.artist = "";
            this.album = "";
        },
        removeAlbum: function (album) {
            this.albumsList.remove(album);
        },
        setAsBest: function (album) {
            let index = this.albumsList.indexOf(album);
            album.isTheBest(!album.isTheBest());
            this.albumsList[index] = album;

            $.localStorage.set("albumsList", ko.toJSON(this.albumsList));
        },
        onAlbumsList: function (newAlbum) {
            $.localStorage.set("albumsList", ko.toJSON(newAlbum));
        },
    });
});
