(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"q+Ng":function(t,e,n){"use strict";n.r(e),n.d(e,"SettingsModule",(function(){return S}));var o=n("Yvf7"),c=n("7ukE"),i=n("Fk62"),a=n("tryS"),r=n("+CJm"),s=n("vuvl"),b=n("Ub9n"),l=n("hqWh"),g=n("2j2y"),h=n("CsWY"),m=n("jHnc"),d=n("8VHZ"),u=n("dFDq"),f=n("1rLY");function p(t,e){if(1&t&&(b.Tb(0,"mat-option",13),b.zc(1),b.Sb()),2&t){const t=e.$implicit;b.kc("value",t.value),b.Bb(1),b.Bc(" ",t.label," ")}}function T(t,e){if(1&t){const t=b.Ub();b.Rb(0),b.Tb(1,"div",1),b.Tb(2,"div",4),b.Tb(3,"div",5),b.Tb(4,"mat-icon",6),b.Pb(5,"fa-icon",7),b.Sb(),b.Tb(6,"mat-form-field"),b.Tb(7,"mat-select",8),b.bc("selectionChange",(function(e){return b.rc(t),b.fc().onThemeSelect(e)})),b.yc(8,p,2,2,"mat-option",9),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Tb(9,"div",10),b.Tb(10,"div",5),b.Tb(11,"mat-icon",6),b.Pb(12,"fa-icon",11),b.Sb(),b.Tb(13,"mat-placeholder"),b.zc(14,"Auto night mode (from 21:00 to 7:00) "),b.Sb(),b.Tb(15,"mat-slide-toggle",12),b.bc("change",(function(e){return b.rc(t),b.fc().onAutoNightModeToggle(e)})),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Qb()}if(2&t){const t=e.ngIf,n=b.fc();b.Bb(7),b.kc("ngModel",t.theme),b.Bb(1),b.kc("ngForOf",n.themes),b.Bb(7),b.kc("checked",t.autoNightMode)}}const v=[{path:"",component:(()=>{class t{constructor(t){this.store=t,this.themes=[{value:"DEFAULT-THEME",label:"Blue"},{value:"BLACK-THEME",label:"Dark"}]}ngOnInit(){this.settings$=this.store.pipe(Object(a.t)(s.d))}onThemeSelect({value:t}){this.store.dispatch(Object(r.g)({theme:t}))}onAutoNightModeToggle({checked:t}){this.store.dispatch(Object(r.d)({autoNightMode:t}))}}return t.\u0275fac=function(e){return new(e||t)(b.Ob(a.h))},t.\u0275cmp=b.Ib({type:t,selectors:[["vca-settings"]],decls:8,vars:3,consts:[[1,"container"],[1,"row"],[1,"col-sm-12"],[4,"ngIf"],[1,"col-md-6","group"],[1,"icon-form-field"],["color","accent"],["icon","paint-brush","color","accent"],["placeholder","Color Theme","name","themes",3,"ngModel","selectionChange"],[3,"value",4,"ngFor","ngForOf"],[1,"col-md-6"],["icon","lightbulb","color","accent"],[3,"checked","change"],[3,"value"]],template:function(t,e){1&t&&(b.Tb(0,"div",0),b.Tb(1,"div",1),b.Tb(2,"div",2),b.Tb(3,"h1"),b.zc(4,"Settings"),b.Sb(),b.Sb(),b.Sb(),b.Pb(5,"br"),b.yc(6,T,16,3,"ng-container",3),b.gc(7,"async"),b.Sb()),2&t&&(b.Bb(6),b.kc("ngIf",b.hc(7,1,e.settings$)))},directives:[o.k,l.a,g.a,h.b,m.a,d.g,d.i,o.j,h.e,u.a,f.l],pipes:[o.b],styles:[".container[_ngcontent-%COMP%]{margin-top:20px}h1[_ngcontent-%COMP%]{margin:0 0 20px}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-transform:uppercase}h2[_ngcontent-%COMP%]{margin:0 0 10px}.group[_ngcontent-%COMP%]{margin:0 0 40px}.icon-form-field[_ngcontent-%COMP%]{position:relative;display:flex;height:65.5px;align-items:center}.icon-form-field[_ngcontent-%COMP%]   mat-placeholder[_ngcontent-%COMP%]{flex:2 1 auto}mat-icon[_ngcontent-%COMP%]{margin:0 6px 6px 0;font-size:20px}mat-form-field[_ngcontent-%COMP%]{flex:1 0 auto}"],changeDetection:0}),t})(),data:{title:"settings"}}];let M=(()=>{class t{}return t.\u0275mod=b.Mb({type:t}),t.\u0275inj=b.Lb({factory:function(e){return new(e||t)},imports:[[i.i.forChild(v)],i.i]}),t})(),S=(()=>{class t{}return t.\u0275mod=b.Mb({type:t}),t.\u0275inj=b.Lb({factory:function(e){return new(e||t)},imports:[[o.c,c.a,M]]}),t})()}}]);