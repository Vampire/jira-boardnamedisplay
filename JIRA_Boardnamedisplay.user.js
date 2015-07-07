/*
 * JIRA Boardnamedisplay - a Userscript to show the JIRA Boardname where it used to be
 * Copyright (C) 2015 Björn Kautler
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// ==UserScript==
// @name        JIRA Boardnamedisplay
// @namespace   net.kautler.greasemonkey.jira
// @description Displays the Boardname for JIRA boards
// @match       *://*/*RapidBoard*
// @version     1.0
// @grant       none
// ==/UserScript==

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function displayBoardname() {
    var boardnameElement = document.getElementById("ghx-board-name");
    if (boardnameElement != null) {
        var boardname = document.getElementsByClassName("scope-filter-trigger")[0].textContent + (boardnameElement.textContent.endsWith(":") ? ":" : "");
        if (boardnameElement.textContent != boardname) {
            boardnameElement.textContent = boardname;
        }
    }
    setTimeout(displayBoardname, 1000);
}
displayBoardname();
