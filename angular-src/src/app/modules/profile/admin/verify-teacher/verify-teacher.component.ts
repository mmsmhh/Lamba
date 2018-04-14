import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpModule, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-verify-teacher',
  templateUrl: './verify-teacher.component.html',
  styleUrls: ['./verify-teacher.component.css'],
  animations: [routerTransition()]

})
export class VerifyTeacherComponent implements OnInit {

  public Teachers = [];
  p: number = 1;

  constructor(private httpClient: HttpClient,
              private http: Http,
              private router: Router) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/admin/teachers_verfication')
      .subscribe((res: any) => {
        this.Teachers = res.data;
      });
  }

  Accept(teacherID) {
    if (localStorage.length == 0) {
      new Noty({
        type: 'info',
        text: 'Access Denied',
        timeout: 2000,
        progressBar: true
      }).show();
      //this.router.navigate([]);
      return false;
    }

    this.httpClient.get('http://localhost:3000/api/admin/accept_teacher/' + teacherID)
    //.catch((err: any) => console.log(err))
      .subscribe(res => {
        new Noty({
          type: 'success',
          text: 'Teacher Verified Successfully',
          timeout: 2000,
          progressBar: true
        }).show();
        this.router.navigate(['/profile/admin/verify-teachers']);

      });


  }

  // Decline(teacherID) {
  //   if (localStorage.length == 0) {

  //     //this.router.navigate(['']);
  //     return false;
  //   }
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');

  //   this.http.post('http://localhost:3000/admin/decline_teacher/' +  teacherID, { headers: headers })
  //     //.catch((err: any) => console.log(err))
  //     .subscribe(res => {
  //       //this.router.navigate(['dashboard/cart']);

  //     });
  // }

}
