import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';
import {JsqlService} from '../services/jsql.service';
import {HttpClientModule} from '@angular/common/http';


export interface JsqlConfig {
    host: string;
    path?: string;
    devKey?: string;
    apiKey?: string;
    headers?: { [key: string]: string; };
    hideErrors?: boolean;
    rxjs?: boolean;
}


// then define injectionToken
export const JsqlConfigService = new InjectionToken<JsqlConfig>(
    'JsqlConfig'
);

@NgModule({
    declarations: [
        // Pipes.
        // Directives.
        // Components.
    ],
    exports: [
        // Pipes.
        // Directives.
        // Components.
    ],
    imports: [
        HttpClientModule
    ]
})
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class JsqlModule {

    /**
     * Use in AppModule: new instance of JsqlService.
     */
    public static forRoot(config: JsqlConfig): ModuleWithProviders {
        return {
            ngModule: JsqlModule,
            providers: [
                JsqlService,
                {
                    provide: JsqlConfigService,
                    useValue: config
                }]
        };
    }

    /**
     * Use in features modules with lazy loading: new instance of JsqlService.
     */
    public static forChild(config: JsqlConfig): ModuleWithProviders {
        return {
            ngModule: JsqlModule,
            providers: [JsqlService,
                {
                    provide: JsqlConfigService,
                    useValue: config
                }]
        };
    }

}
