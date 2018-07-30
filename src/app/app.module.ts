import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SiteInitComponent } from './site-init/site-init/site-init.component';
import { CatalogLoadComponent } from './catalog-load/catalog-load/catalog-load.component';
import { HotTableModule } from '@handsontable/angular';


import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: CatalogLoadComponent },
    { path: 'siteInit', component: SiteInitComponent },
    { path: 'catalogLoad', component: CatalogLoadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogLoadComponent,
    SiteInitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot( appRoutes ),
    HotTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
