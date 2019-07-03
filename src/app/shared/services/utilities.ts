import { Injectable } from '@angular/core';

@Injectable()
export class Utilities {
    public static buildRequestURL(host: string, prefix: string = 'api') {
        return `${host}${prefix}/`;
    }

    public static JSonTryParse(value: string) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            if (value === "undefined")
                return void 0;

            return value;
        }
    }
}
