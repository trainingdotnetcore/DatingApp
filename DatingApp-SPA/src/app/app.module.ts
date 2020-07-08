import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ErrorInterceptorProvider} from './_services/error.intercptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDropdownModule } from 'node_modules/ngx-bootstrap/dropdown';
import { TabsModule} from 'node_modules/ngx-bootstrap/tabs';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import {appRoutes} from './routes';
import { JwtModule } from '@auth0/angular-jwt';
import {MemberDetailResolver} from '../app/_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
export function tokenGetter(): any{
   return localStorage.getItem('token');
}

// export class CustomHammerConfig extends HammerGestureConfig {
//    overrides = {
//        pinch: { enable: false },
//        rotate: { enable: false }
//    };
// }

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      // {
      // provide: HAMMER_GESTURE_CONFIG,
      // useClass: CustomHammerConfig
      // }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
