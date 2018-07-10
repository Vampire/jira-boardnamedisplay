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
// @version     2.0
// @grant       none
// ==/UserScript==

function displayBoardname() {
    // always make the board name visible outside the sidebar
    var boardNameElement = document.getElementById("ghx-board-name");
    if (boardNameElement == null) {
        setTimeout(displayBoardname, 1000);
        return;
    }

    boardNameElement.style.display = "block";

    var subnavigatorTitleElement = document.getElementsByClassName("subnavigator-title")[0];
    if (subnavigatorTitleElement == null) {
        setTimeout(displayBoardname, 1000);
        return;
    }

    var subnavigatorTitleStyle = window.getComputedStyle(subnavigatorTitleElement, null);
    var subnavigatorTitleSize = subnavigatorTitleStyle.getPropertyValue('font-size');
    var subnavigatorTitleSizeFloat = parseFloat(subnavigatorTitleStyle.getPropertyValue('font-size'));
    var boardNameStyle = window.getComputedStyle(boardNameElement, null);
    var boardNameSize = boardNameStyle.getPropertyValue('font-size');
    var boardNameSizeFloat = parseFloat(boardNameStyle.getPropertyValue('font-size'));

    // if subnavigator title has no added-value, swap sizes
    let staticSubnavigatorTitles = [
        "Active sprints",
        "Aktive Sprints",
        "Kanban board",
        "Kanban-Board"
    ];
    if (((subnavigatorTitleSizeFloat > boardNameSizeFloat)
        && staticSubnavigatorTitles.includes(subnavigatorTitleElement.textContent))
        || ((subnavigatorTitleSizeFloat < boardNameSizeFloat)
            && !staticSubnavigatorTitles.includes(subnavigatorTitleElement.textContent))) {

        boardNameElement.style.fontSize = subnavigatorTitleSize;
        boardNameElement.style.lineHeight = subnavigatorTitleStyle.getPropertyValue('line-height');
        boardNameElement.style.color = subnavigatorTitleStyle.getPropertyValue('color');
        boardNameElement.style.fontWeight = subnavigatorTitleStyle.getPropertyValue('font-weight');

        subnavigatorTitleElement.style.fontSize = boardNameSize;
        subnavigatorTitleElement.style.lineHeight = boardNameStyle.getPropertyValue('line-height');
        subnavigatorTitleElement.style.color = boardNameStyle.getPropertyValue('color');
        subnavigatorTitleElement.style.fontWeight = boardNameStyle.getPropertyValue('font-weight');
    }
    setTimeout(displayBoardname, 1000);
}

displayBoardname();
