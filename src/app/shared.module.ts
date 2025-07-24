import { NgModule } from '@angular/core';
import { TemplateOneModule } from './template-components/template-one/template-one.module';

@NgModule({
    imports: [
        TemplateOneModule, 
    ],
    exports: [
        TemplateOneModule,
    ],

})
export class SharedModule {}