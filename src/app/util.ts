import { Injectable } from '@angular/core';

@Injectable()
export class Util {

    makeId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    checkAlphaNumeric (test: String) {
        const Exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
        return test.match(Exp);
    }


    round(number: Number, precision: Number) {
        const shift = function (number1, precision1, reverseShift) {
            if (reverseShift) {
                precision1 = -precision1;
            }
            const numArray = ('' + number1).split('e');
            return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision1) : precision1));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    }



}
