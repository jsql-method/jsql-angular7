import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

/**
 * Add here external dependencies that actually you use.
 * 
 * Angular dependencies
 * - '@angular/animations' => 'ng.animations'
 * - '@angular/animations/browser': 'ng.animations.browser'
 * - '@angular/common' => 'ng.common'
 * - '@angular/compiler' => 'ng.compiler'
 * - '@angular/core' => 'ng.core'
 * - '@angular/forms' => 'ng.forms'
 * - '@angular/common/http' => 'ng.common.http'
 * - '@angular/platform-browser-dynamic' => 'ng.platformBrowserDynamic'
 * - '@angular/platform-browser' => 'ng.platformBrowser'
 * - '@angular/platform-browser/animations' => 'ng.platformBrowser.animations'
 * - '@angular/platform-server' => 'ng.platformServer'
 * - '@angular/router' => 'ng.router'
 * 
 * RxJS dependencies
 * From RxJS v6 you need only 'rxjs' and 'rxjs.operators'.
 * 
 * Other dependencies
 * - Angular libraries: refer to their global namespace
 * - TypeScript/JavaScript libraries:
 *      e.g. lodash: 'lodash' => 'lodash'
 *      
 * Also, if the dependency uses CommonJS modules, such as lodash,
 * you should also use a plugin like rollup-plugin-commonjs,
 * to explicitly specify unresolvable "named exports".
 * 
 */
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/common/http' : 'ng.common.http',
    'rxjs': 'rxjs',
    'rxjs/operators': 'rxjs.operators',
    'jsql-core': 'jsql-core'
};

export default {
    external: Object.keys(globals),
    plugins: [resolve(), sourcemaps()],
    onwarn: () => { return },
    output: {
        format: 'umd',
        name: 'ng.jsqlAngular',
        globals: globals,
        sourcemap: true,
        exports: 'named',
        amd: { id: 'jsql-angular7' }
    }
}
