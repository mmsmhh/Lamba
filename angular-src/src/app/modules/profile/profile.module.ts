import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Http, Headers, HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './profile.component';
import {AdminComponent} from './admin/admin.component';
import {ParentComponent} from './parent/parent.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ChildComponent} from './child/child.component';
import {UnVerifiedArticlesComponent} from './admin/un-verified-articles/un-verified-articles.component';
import {VerifyArticleComponent} from './admin/verify-article/verify-article.component';
import {ViewParentComponent} from './view-profile/view-parent/view-parent.component';
import {ViewTeacherComponent} from './view-profile/view-teacher/view-teacher.component';
import {ViewChildComponent} from './view-profile/view-child/view-child.component';
import {VerifyTeacherComponent} from './admin/verify-teacher/verify-teacher.component';
import {TranslateModule} from '@ngx-translate/core';
import {DashboardComponent} from './admin/dashboard/dashboard.component'
import {StatModule} from './admin/stat/stat.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './admin/dashboard/components';
import {MyProfileComponent} from './my-profile/my-profile.component';

const appRoutes: Routes = [
  {
    path: 'me',
    component: MyProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'un-verified-articles',
        component: UnVerifiedArticlesComponent
      }
    ]
  },
  {
    path: 'admin/verify-articles/:id',
    component: VerifyArticleComponent
  },
  {
    path: 'admin/verify-teachers',
    component: VerifyTeacherComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule, HttpClientModule,
    ReactiveFormsModule, Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule,
    RouterModule.forChild(appRoutes),
    NgbModule.forRoot(),
    TranslateModule.forChild(),
    MDBBootstrapModule.forRoot(),
    NgbDropdownModule.forRoot(),
    StatModule
  ],
  declarations: [
    ProfileComponent,
    AdminComponent,
    ParentComponent,
    TeacherComponent,
    ChildComponent,
    UnVerifiedArticlesComponent,
    VerifyArticleComponent,
    VerifyTeacherComponent,
    ViewParentComponent,
    ViewTeacherComponent,
    ViewChildComponent,
    SidebarComponent,
    DashboardComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    MyProfileComponent
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [ProfileComponent, AdminComponent]

})
export class ProfileModule {
}
