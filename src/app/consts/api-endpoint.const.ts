import { Injectable } from "@angular/core";

//Http
import { throwError } from "rxjs";
import { Response } from "@angular/http";

@Injectable()
export class ApiEndpoint {

    public static readonly ContentTypes = Object.freeze({
        JSON: "application/json"
    });

    //===== Observable =====
    public static ExtractData(res: Response) {
        if (!res.ok)
            throw new Error("Bad response status: " + res.status);
        try {
            return res.json()
        }
        catch (error) {
            if (res.status == 200 && res["_body"].indexOf("!DOCTYPE") < 0)
                return res["_body"];
            return {};
        }
    }

    public static HandleError(error: Response | any) {
        let errMsg: string;
        let json;
        try { json = error.json(); } catch (e) { return throwError(error["_body"]); }
        if (json && json["retMsg"]) {
            console.error(json["retMsg"]);
            return throwError(json["retMsg"]);
        }
        if (error instanceof Response) {
            const body = error.json() || "";
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else
            errMsg = error.message ? error.message : error.toString();
        return throwError(errMsg);
    }
}
