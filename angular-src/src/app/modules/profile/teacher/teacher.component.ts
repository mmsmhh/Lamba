import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {appConfig} from "../../../app.config";


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',

  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  state: string;
  zip: number;
  street: string;
  email: string;
  about: string;
  currentUserID: String;
  currentUser: any;
  fees: number;
  phone: number;
  closeResult: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };
  token = localStorage.getItem('authentication');

  ///////////////// Schedule////////////////////////////
  public sat = [];
  public sun = [];
  public mon = [];
  public tues = [];
  public wed = [];
  public thurs = [];
  public fri = [];

  ///////////////////////////////////////////////////////////

  constructor(private router: Router,
              private http: HttpClient,
              private httpClient: HttpClient,
              private auth: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.currentUserID = this.currentUser._id;
    this.getTeacherSchedule();
  }

  onUploadFinished(event) {

    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      return;
    }
    this.currentUser.photo = response.filename;
    this.http.patch(appConfig.apiUrl + '/user/updateImage/' + this.currentUser._id, {photo: response.filename})
      .subscribe((res: any) => {
        localStorage.setItem('authentication', res.data);
        this.modalref.close();
        new Noty({
          type: 'success',
          text: "Your Image uploaded successfully!",
          timeout: 3000,
          progressBar: true
        }).show();
      }, error => {
        new Noty({
          type: 'success',
          text: error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }


  onEditInfo(): void {
    if (!this.firstName || !this.lastName || !this.email) {
      new Noty({
        type: 'error',
        text: 'All fields are required',
        timeout: 3000,
        progressBar: true
      }).show();
      return;
    }
    const user = {
      name: {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
      },
      email: this.email,
      about: this.about,
      address: {
        city: this.city,
        state: this.state,
        zip: this.zip,
        street: this.street,
      },
      fees: this.fees,
      phone: this.phone


    }
    this.httpClient.patch('http://localhost:3000/api/user/updateUser/' + this.currentUserID, {
      "email": user.email,
      "name": user.name,
      "about": user.about,
      "Address": user.address,
      "fees": user.fees,
      "phone": user.phone


    }).subscribe(
      res => {
        document.getElementById('editModal').style.display = 'none';
      },
      err => {
        document.getElementById('editModal').style.display = 'none';
      }
    );


  }

  ////////////////////////////// schedule/////////////////////////////////////////////////////
  getTeacherSchedule() {

    this.httpClient.get('http://localhost:3000/api/schedule/getTeacherSchedule/' + this.currentUserID, this.httpOptions).subscribe((res: any) => {
      this.sat = res.data.table.saturday;
      this.sun = res.data.table.sunday;
      this.mon = res.data.table.monday;
      this.tues = res.data.table.tuesday;
      this.wed = res.data.table.wednesday;
      this.thurs = res.data.table.thursday;
      this.fri = res.data.table.friday;

    });

  }


  updateTeacherSchedule(Slot, newtitle, newdescription, newurl, thisday) {
    var body = {
      title: newtitle,
      description: newdescription,
      url: newurl,
      day: thisday
    }

    this.httpClient.patch('http://localhost:3000/api/schedule/updateTeacherSchedule/' + Slot._id, body, this.httpOptions).subscribe((res: any) => {
      if (thisday == 'saturday') {
        var index = this.sat.indexOf(Slot);
        this.sat[index] = res.data;
        console.log(this.sat[index]);
      }
      if (thisday == 'sunday') {
        var index = this.sun.indexOf(Slot);
        this.sun[index] = res.data;
        console.log(this.sun[index]);
      }
      if (thisday == 'monday') {
        var index = this.mon.indexOf(Slot);
        this.mon[index] = res.data;
        console.log(this.mon[index]);
      }
      if (thisday == 'tuesday') {
        var index = this.tues.indexOf(Slot);
        this.tues[index] = res.data;
        console.log(this.tues[index]);
      }
      if (thisday == 'wednesday') {
        var index = this.wed.indexOf(Slot);
        this.wed[index] = res.data;
        console.log(this.wed[index]);
      }
      if (thisday == 'thursday') {
        var index = this.thurs.indexOf(Slot);
        this.thurs[index] = res.data;
        console.log(this.thurs[index]);
      }
      if (thisday == 'friday') {
        var index = this.fri.indexOf(Slot);
        this.fri[index] = res.data;
        console.log(this.fri[index]);
      }
    });

    this.modalref.close();

  }


  modalref: NgbModalRef;

  open(content) {
    this.modalref = this.modalService.open(content)

    this.modalref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


tasks = [];
  getTasks() {
    this.http.get(appConfig.apiUrl + '/task/getTasks/', this.httpOptions)
      .subscribe((res: any) => {
        this.tasks = res.data;
        // console.log(res.data);
      });

  }


}
