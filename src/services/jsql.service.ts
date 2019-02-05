import {Injectable, Inject} from '@angular/core';
import {Observable, Observer, of} from 'rxjs';
import * as JSQL from 'jsql-core';
import {JsqlConfig, JsqlConfigService} from "../modules/jsql.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";

function _window() : any {
    return window;
}

@Injectable({
    providedIn: 'root'
})
export class JsqlService {

    get nativeWindow() : any {
        return _window();
    }

    private jsqlInit() : any {
        return JSQL;
    }

    /**
     * https://github.com/MainaWycliffe/demo-for-building-angular-6-library
     * Stores JSQL object
     */
    public jsql: any;

    constructor(@Inject(JsqlConfigService) private config: JsqlConfig, private http: HttpClient) {

        this.jsqlInit();

        let self = this;

        /**
         * Override @request function
         * @param requestUrl
         * @param requestData
         * @param requestHeaders
         * @returns promise
         */
        this.nativeWindow.JSQL.prototype.request = function (requestUrl: string, requestData: any, requestHeaders: any, selfReference: any): any {

            let options = {
                headers: new HttpHeaders()
            };

            for (let headerName in requestHeaders) {
                if (requestHeaders.hasOwnProperty(headerName)) {
                    options.headers = options.headers.append(headerName, requestHeaders[headerName]);
                }
            }

            return self.http.post<any>(requestUrl, requestData, options);

        };

        /**
         * Overridie @wrap function
         * @param token
         * @param queryType
         * @returns promise
         */
        this.nativeWindow.JSQL.prototype.wrap = function (token: any, queryType: any, selfReference: any): any {

            let requestObservableWrapper = this.construct(token, queryType);
            requestObservableWrapper.rx = Observable.create((observer: any) => {

                requestObservableWrapper.checkAndCreateXhrPromise();

                requestObservableWrapper.xhrPromise
                    .subscribe((res: any) => {
                        requestObservableWrapper.thenRxjs(res);
                        observer.next(res);
                    }, (err: any) => {
                        requestObservableWrapper.catchRxjs(err);
                        observer.error(err);
                    });
            });

            return requestObservableWrapper;

        };

        config.rxjs = true;

        console.log('config', config);

        this.jsql = new this.nativeWindow.JSQL(config);
    }

    getConfig(): Observable<JsqlConfig> {
        return of(this.config);
    }

    public select(token: string): any {
        return this.jsql.select(token);
    }

    public selectOne(token: string): any {
        return this.jsql.selectOne(token);
    }

    public update(token: string): any {
        return this.jsql.update(token);
    }

    public insert(token: string): any {
        return this.jsql.insert(token);
    }

    public remove(token: string): any {
        return this.jsql.remove(token);
    }

    public delete(token: string): any {
        return this.jsql.delete(token);
    }

    public repo(): any {
        return this.jsql.repo();
    }

    public get(queryName: string): any {
        return this.jsql.get(queryName);
    }

    public set(queryName: string, sqlQuery: any): any {
        return this.jsql.set(queryName, sqlQuery);
    }

    public query(sqlQuery: string): any {
        return this.jsql.query(sqlQuery);
    }
    
}