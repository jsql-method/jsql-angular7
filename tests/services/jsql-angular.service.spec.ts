import {async, inject, TestBed} from '@angular/core/testing';
import {JsqlConfig, JsqlConfigService} from "../../src/modules/jsql.module";
import {HttpClientModule} from "@angular/common/http";
import {JsqlService} from "../../src/jsql-angular";

describe('JsqlService', () => {

    beforeEach(() => {

        let jsqlConfig = {} as JsqlConfig;
        jsqlConfig.host = 'http://localhost:18088';

        TestBed.configureTestingModule({
            providers: [
                JsqlService,
                {
                    provide: JsqlConfigService,
                    useValue: jsqlConfig
                }
            ],
            imports: [
                HttpClientModule
            ],
        });
    });

    it('should test JsqlService object',
        inject([JsqlService],
            (jsqlService: JsqlService) => {
                jsqlService.getConfig();
            })
    );

});
