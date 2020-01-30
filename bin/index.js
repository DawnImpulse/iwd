#!/usr/bin/env node
"use strict";
/**
 * ISC License
 *
 * Copyright 2020, Saksham (DawnImpulse)
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
 * provided that the above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 * WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
 * OR PERFORMANCE OF THIS SOFTWARE.
 **/
Object.defineProperty(exports, "__esModule", { value: true });
/*

@info - main entry point for iwd commands

@author Saksham
@note Last Branch Update - master
     
@note Created on 2020-01-26 by Saksham
@note Updates :

*/
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
// reading package.json file
var pckjson = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, "..", "package.json"), 'utf-8'));
// tilde git url
var tilde = "https://github.com/dawnimpulse/tilde.git#";
var tildeVersion = "0.9.0";
// various color codes without using libraries
var reset = "\x1b[0m";
var red = "\x1b[31m";
var green = "\x1b[32m";
var yellow = "\x1b[33m";
var blue = "\x1b[34m";
var magenta = "\x1b[35m";
var cyan = "\x1b[36m";
var dim = "\x1b[2m";
// parsing arguments in args
var args = [];
process.argv.forEach(function (el, i) {
    if (i > 1)
        args.push(el.toLowerCase());
});
// parsing valid arguments
switch (args[0].toLowerCase()) {
    case "version":
    case "--version":
    case "-v": {
        console.log(cyan + "Version : " + pckjson.version + reset);
        break;
    }
    case "install":
    case "i": {
        var cmd = "";
        // case check for yarn
        if (args.indexOf("-y") !== -1 || args.indexOf("yarn") !== -1) {
            cmd = "yarn add ";
            // case check for debug on yarn
            if (args.indexOf("-d") !== -1 || args.indexOf("dev") !== -1)
                cmd = cmd + "--dev ";
            cmd += tilde + tildeVersion;
        }
        // case check for debug on npm
        else if (args.indexOf("-d") !== -1 || args.indexOf("dev") !== -1)
            cmd = "npm install --save-dev " + tilde + tildeVersion;
        else
            cmd = "npm install " + tilde + tildeVersion;
        // run the command
        command(cmd);
        break;
    }
    case "uninstall":
    case "remove": {
        var cmd = "";
        if (args.indexOf("-y") !== -1 || args.indexOf("yarn") !== -1)
            cmd = 'yarn remove "~"';
        else
            cmd = 'npm uninstall "~"';
        // run the command
        command(cmd);
        break;
    }
    default:
        console.log(red + "Command not found" + reset);
}
/**
 * spawn a new process
 */
function command(cmd) {
    console.log(dim + "Running command " + cyan + cmd + reset);
    var child = child_process_1.spawn(cmd, { stdio: 'inherit', shell: true });
    child.on('exit', function (code) {
        return;
    });
    child.on('error', function (err) {
        console.log(red + err + reset);
        return;
    });
}
//# sourceMappingURL=index.js.map