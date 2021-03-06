/*******************************************************************************
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Copyright Eelco Cramer, 2012
*******************************************************************************/

(function() {
 	"use strict";

    var util = require('util');
    var DeviceINQ = require("../lib/device-inquiry.js").DeviceINQ;
    var BluetoothSerialPort = require("../lib/bluetooth-serial-port.js").BluetoothSerialPort;
    var inquiry = new DeviceINQ();
    var btSerial = new BluetoothSerialPort();

    inquiry.on('found', function (address, name) {
        console.log('Found: ' + address + ' with name ' + name);
        
        inquiry.findSerialPortChannel(address, function(channel) {
            console.log('Found RFCOMM channel for serial port on ' + name + ': ' + channel);
            
            if (channel != -1) {
                btSerial.connect(address, channel, function() {
                    btSerial.write('1');
                });
            }
        });
    });

    inquiry.on('finnished', function() {
        console.log('scan did finnish');
    });

    inquiry.inquire();
    
    process.stdin.resume();
})();
