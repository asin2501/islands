"use strict";

// var globalMapSettings = {
//                         mapId: 'map',
//                         markerIconURL: 'images/ui/marker.png',
//                         mapSettings:{
//                             zoom: 17,
//                             scrollwheel: false,
//                             center: {
//                             lat: 46.9659776,
//                                 lng: 32.0101004
//                             },
//                             disableDefaultUI: true,
//                             googleLogoDisable: true,
//                             zoomControl: true
//                         },
//                         markers:[{
//                             cord:{
//                                 lat: 46.9659776,
//                                 lng: 32.0101004
//                             }
//                         }]
//                     }

function lazyMap(settings) {



    this.$map = $('#' + settings.mapId);

    if (this.$map.length > 0) {

        this.markers = [];
        this.markersObjList = [];

        this.theme = mapTheme;

        this.resizeHandle = function() {
            var vieportWidth = window.innerWidth;
            if (vieportWidth < 768) {
                this.setCenter(this.mapSettings.center.lat, this.mapSettings.center.lng)
            } else {
                var s = (vieportWidth * 100 / (Math.pow(this.map.getZoom(), 6)));
                this.setCenter(this.mapSettings.center.lat, this.mapSettings.center.lng - s);
            }
        }


        if (settings.markers) {
            this.markers = settings.markers;
        }

        if (settings.mapSettings) {
            this.mapSettings = settings.mapSettings;
        } else {
            this.mapSettings = {
                zoom: 12,
                center: {
                    lat: 40.720,
                    lng: -73.996
                },
                disableDefaultUI: true,
                googleLogoDisable: true,
                zoomControl: true
            };
        }

        this.mapSettings.styles = settings.theme ? settings.theme : mapTheme;
        this.mapSettings.markerIcon = settings.markerIconURL;


        this._addMarkerToMap = function(x, y) {
            var pos = {};

            if (y !== undefined) {
                pos = {
                    lat: x,
                    lng: y
                }
            } else {
                pos = x;
            }

            var marker = new google.maps.Marker({
                position: pos,
                icon: this.mapSettings.markerIcon,
                map: this.map
            });


            return marker;
        }
        this.addMarker = function(x, y) {

            var marker = {};

            marker.obj = this._addMarkerToMap(x, y);


            this.markers.push(marker);

        }

        this.addAllMarkersFromData = function() {

            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.markers[i].obj = this._addMarkerToMap(this.markers[i].cord);
            }
        }

        this.removeAllMarkers = function() {
            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.markers[i].obj.setMap(null);
            }
            delete this.markers;
            this.markers = [];
        }

        this.setCenter = function(x, y) {;
            this.map.setCenter({
                lat: x,
                lng: y
            });
        }

        this.mapDiv = document.getElementById(settings.mapId);

        this.map = new google.maps.Map(this.mapDiv, this.mapSettings);
        this.addAllMarkersFromData();

        this.resizeHandle()
        var that = this;
        $(window).resize(function() {
            setTimeout(function() {
                that.resizeHandle();
            }, 200)
        })
    };
}



var mapTheme = [{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#d3d3d3"
    }]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
        "color": "#d3d3d3"
    }]
}, {
    "featureType": "transit",
    "stylers": [{
        "color": "#808080"
    }, {
        "visibility": "off"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#b3b3b3"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "weight": 1.8
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#d7d7d7"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ebebeb"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{
        "color": "#a7a7a7"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#efefef"
    }]
}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#696969"
    }]
}, {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#737373"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#d6d6d6"
    }]
}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {}, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#dadada"
    }]
}]