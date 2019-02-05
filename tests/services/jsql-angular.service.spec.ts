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

    it('should test JsqlService methods object',
        async(inject([JsqlService],
            (jsqlService: JsqlService) => {

                jsqlService.select('NJiE0YnGZJcXsE1cOnFGKg')
                    .param('test', 1)
                    .rx.subscribe((res: any) => {

                    console.log('response');
                    console.log(res);

                }, (err: any) => {
                    console.log('error');
                    console.log(err);
                })

            }))
    );

});
