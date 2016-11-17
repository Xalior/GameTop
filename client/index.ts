/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

import { GameTop } from './GameTop';

window.addEventListener('DOMContentLoaded', () => {
    // your code here
    console.log("INDEX.TS");
    window['gametop'] = new GameTop();
});