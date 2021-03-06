// ==UserScript==
// @name               Better Disney+
// @namespace          https://nomike.com/
// @version            9
// @grant              GPLv3
// @match              https://www.disneyplus.com/*
// @run-at             document-idle
// @grant              GM.setValue
// @grant              GM.getValue
// @grant              GM.deleteValue
// @grant              GM.listValues
// ==/UserScript==

/*
    Better Disney+ - A userscript for enhancing your Disney+ experience
    Copyright (C) 2021 nomike <nomike@nomike.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

(async function() {

    /* svg resources */
    var svg_speed_plus = '<svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-efyt-speed-plus"></use><path id="ytp-efyt-speed-plus" d="m 11.494141,8 c -2.6853634,0 -4.8652346,2.17987 -4.8652348,4.865234 0,2.685363 2.1798714,4.865235 4.8652348,4.865235 2.685364,0 4.865234,-2.179872 4.865234,-4.865235 C 16.359375,10.17987 14.179505,8 11.494141,8 Z m -0.679688,1.4609375 h 1.359375 v 2.7246095 h 2.722656 v 1.359375 h -2.722656 v 2.722656 H 10.814453 V 13.544922 H 8.0917969 v -1.359375 h 2.7226561 z m 6.865235,-1.4550784 a 11.389523,11.389523 0 0 0 -1.66211,0.185547 c 0.60671,0.587327 1.100701,1.289573 1.44336,2.0742189 a 9.1116182,9.1116182 0 0 1 4.597656,0.9375 l 2.107422,-1.4003909 a 11.389523,11.389523 0 0 0 -6.486328,-1.796875 z m 8.365234,3.2773439 -9.667969,6.445313 a 2.2779046,2.2779046 0 0 0 0,3.224609 2.2779046,2.2779046 0 0 0 3.222656,0 z m 1.492187,1.867188 -0.0098,0.01172 -1.402344,2.107422 a 9.1116182,9.1116182 0 0 1 -0.25,8.632813 H 10.089844 A 9.1116182,9.1116182 0 0 1 8.8925783,18.830078 C 8.1084503,18.487267 7.4072416,17.993284 6.8203125,17.386719 a 11.389523,11.389523 0 0 0 1.3105468,7.654297 2.2779046,2.2779046 0 0 0 1.9589847,1.138672 h 15.773437 a 2.2779046,2.2779046 0 0 0 1.982422,-1.138672 11.389523,11.389523 0 0 0 -0.308594,-11.890625 z" fill="#fff"></path></svg>';
    var svg_speed_scroll = '<svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-efyt-speed"></use><path id="ytp-efyt-speed" d="m 27.526463,13.161756 -1.400912,2.107062 a 9.1116182,9.1116182 0 0 1 -0.250569,8.633258 H 10.089103 A 9.1116182,9.1116182 0 0 1 22.059491,11.202758 L 24.166553,9.8018471 A 11.389523,11.389523 0 0 0 8.1301049,25.041029 2.2779046,2.2779046 0 0 0 10.089103,26.179981 H 25.863592 A 2.2779046,2.2779046 0 0 0 27.845369,25.041029 11.389523,11.389523 0 0 0 27.537852,13.150367 Z M 16.376119,20.95219 a 2.2779046,2.2779046 0 0 0 3.223235,0 l 6.446471,-9.669705 -9.669706,6.44647 a 2.2779046,2.2779046 0 0 0 0,3.223235 z" fill="#fff"></path></svg>';
    var svg_speed_minus = '<svg version="1.1" viewBox="0 0 36 36" height="100%" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-efyt-speed-minus"></use><path id="ytp-efyt-speed-minus" d="M 24.505859 8 C 21.820495 8 19.640625 10.17987 19.640625 12.865234 C 19.640625 15.550597 21.820495 17.730469 24.505859 17.730469 C 27.191222 17.730469 29.371094 15.550597 29.371094 12.865234 C 29.371094 10.17987 27.191222 8 24.505859 8 z M 18.320312 8.0058594 A 11.389523 11.389523 0 0 0 11.833984 9.8027344 L 13.941406 11.203125 A 9.1116182 9.1116182 0 0 1 18.539062 10.265625 C 18.881721 9.48098 19.375712 8.7787333 19.982422 8.1914062 A 11.389523 11.389523 0 0 0 18.320312 8.0058594 z M 9.9550781 11.283203 L 16.400391 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 17.728516 L 9.9550781 11.283203 z M 21.103516 12.185547 L 23.826172 12.185547 L 25.185547 12.185547 L 26.738281 12.185547 L 27.908203 12.185547 L 27.908203 13.544922 L 25.455078 13.544922 L 25.185547 13.544922 L 23.826172 13.544922 L 23.367188 13.544922 L 21.103516 13.544922 L 21.103516 12.185547 z M 8.4628906 13.150391 A 11.389523 11.389523 0 0 0 8.1542969 25.041016 A 2.2779046 2.2779046 0 0 0 10.136719 26.179688 L 25.910156 26.179688 A 2.2779046 2.2779046 0 0 0 27.869141 25.041016 A 11.389523 11.389523 0 0 0 29.179688 17.386719 C 28.592758 17.993284 27.89155 18.487267 27.107422 18.830078 A 9.1116182 9.1116182 0 0 1 25.910156 23.902344 L 10.125 23.902344 A 9.1116182 9.1116182 0 0 1 9.875 15.269531 L 8.4726562 13.162109 L 8.4628906 13.150391 z " fill="#fff"></path></svg>';

    /* css resources */
    var tooltip_css = `.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
	font-size: 15px;
	font-weight: bold;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
`

    'use strict';

    /* load the speed from user settings */
    async function loadSpeed() {
        console.debug("Loading speed from GM settings");
        let speed = await GM.getValue("playback_speed", JSON.stringify(1.0));
        if (speed != undefined) {
            console.debug("speed[", typeof speed, "]=", speed);
            value = parseFloat(JSON.parse(speed));
            console.debug("value[", typeof value, "]=", value);
            if (isNaN(value)) {
                console.debug("value is NaN, reverting to 1.0");
                return 1.0;
            } else {
                return value;
            }
        } else {
            console.debug("speed not available yet, returning promise");
            return new Promise((resolve) => {
                window.setTimeout(() => resolve(loadSpeed()), 10);
            })
        }
    }

    /* save the speed from user settings */
    function saveSpeed(a) {
        console.debug("Saving speed=", a);
        GM.setValue("playback_speed", JSON.stringify(a));
    }

    /* Change the speed of the player.
    Call with delta=0.0 to apply the speed currently stored in settings. */
    function setSpeed(delta) {
        (async() => {
            console.debug("Changing player speed");
            let current_speed = await loadSpeed();
            console.debug("current_speed[", typeof current_speed, "]=", current_speed);

            let new_speed = Math.max(0.1, current_speed + delta).toPrecision(2);
            console.debug("new_speed[", typeof new_speed, "]=" + new_speed);


            saveSpeed(new_speed);
            document.querySelector('video').playbackRate = new_speed;
            for (tooltip of document.getElementsByClassName("tooltiptext")) {
                tooltip.innerHTML = new_speed;
            }
            saveSpeed(new_speed);
        })();
    }

    /* Create a button for altering the playback speed */
    function createSpeedButton(svg, delta, mode) {
        direction = delta > 0.0 ? "plus" : "minus"
        b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Speed " + direction);
        b.setAttribute("class", "control-icon-btn speed_" + direction + "_btn");
        b.setAttribute("role", "button");
        d = document.createElement("div");
        d.setAttribute("class", "focus-hack-div tooltip");
        d.setAttribute("tabindex", "-1");
        d.innerHTML = '<span class="tooltiptext">1.0</span>' + svg;
        b.appendChild(d);

        if (mode == "click") {
            b.onclick = function() {
                setSpeed(delta);
            };
        } else {
            b.addEventListener("wheel", event => {
                setSpeed(delta * Math.sign(event.deltaY) * -1);
            });
        }
        return b;
    }

    /* add scrollwheel capability to audio button */
    function addScrollwheelCapabilityToAudioButton() {
        console.debug("Add scrollwheel capability to audio button");
        b = document.getElementsByClassName('audio-control')[0];
        b.addEventListener("wheel", event => {
            setPlayerVolume(0.1 * Math.sign(event.deltaY) * -1);
        });
    }

    function setPlayerVolume(delta) {
        newVolume = document.querySelector('video').volume + delta;
        if (newVolume < 0.0) {
            newVolume = 0.0;
        }
        if (newVolume > 1.0) {
            newVolume = 1.0;
        }
        document.querySelector('video').volume = newVolume;
    }

    /* add the style sheet */
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = tooltip_css;
    document.head.appendChild(styleSheet);

    function addKeyListener() {
        console.debug("Add key listener");
        document.addEventListener('keypress', function(event) {
            kc = event.keyCode
            if (kc === 32) {
                document.getElementsByClassName('btm-media-client-element')[0].click();
            }
            /* Disney+ does not like seeking around like that so this is disabled for the time being */
            //         if ((kc >= 48 && kc <= 57) || (kc >= 69 && kc <= 105)) {
            //           if(event.keyCode >= 69) {
            //             seek = event.keyCode - 69;
            //           } else {
            //             seek = event.keyCode - 48
            //           }
            // 					console.debug("Duration=", document.querySelector('video').duration, " currentTime=", document.querySelector('video').duration * (seek / 10));
            //           document.querySelector('video').currentTime = document.querySelector('video').duration * (seek / 10);
            //         }
        });
    }

    /* Wait for player controls to appear and add the speed control buttons and
       apply the saved speed to the player */
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName('controls__right').length > 0 && document.getElementsByClassName('mute-btn').length > 0 && document.getElementsByClassName('speed_minus_btn').length == 0) {
            addKeyListener();
            console.debug("Apply currently saved speed to player");
            setSpeed(0.0);

            controls = document.getElementsByClassName('controls__right')[0];
            controls.insertBefore(createSpeedButton(svg_speed_plus, 0.1, "click"), controls.firstChild);
            controls.insertBefore(createSpeedButton(svg_speed_scroll, 0.1, "scroll"), controls.firstChild);
            controls.insertBefore(createSpeedButton(svg_speed_minus, -0.1, "click"), controls.firstChild);

            addScrollwheelCapabilityToAudioButton();
        }
    }, 500); // check every 500ms
})();