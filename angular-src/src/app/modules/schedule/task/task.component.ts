import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {appConfig} from "../../../app.config";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private auth: AuthService) {
  }

  taskId: String;
  p: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  commentx : String;
  title: String;
  description: String;
  createdAt: Date;
  updatedAt: Date;
  comments: any;
  studentId: String;
  teacherId: String;
  taskComments = [];
  currentUser: any;

  newComment: any;

  ngOnInit() {

    this.currentUser = this.auth.getCurrentUser();

    this.taskId = this.route.snapshot.params.id

    this.getTask();
    this.getComments();


  }


  getTask() {
    this.http.get(appConfig.apiUrl + '/task/getTask/' + this.taskId, this.httpOptions).subscribe((res: any) => {
      this.title = res.data.title;
      this.description = res.data.description;
      this.createdAt = res.data.createdAt;
      this.updatedAt = res.data.updatedAt;
      this.comments = res.data.comments;
      this.studentId = res.data.studentId;
      this.teacherId = res.data.userId;
    });
  }

  getComments() {
    this.http.get(appConfig.apiUrl + '/task/getComments/' + this.taskId, this.httpOptions).subscribe((res: any) => {
      this.taskComments = res.data;

      this.taskComments.sort(function(x, y){
      return  y.createdAt - x.createdAt;
  });
    });
  }


  createNewComment(comment) {
    var commentData = {
      comment: comment,
      role: this.currentUser.role,
      taskId: this.taskId
    };
    this.http.post(appConfig.apiUrl + '/task/newComment', commentData, this.httpOptions).subscribe(
      (res: any) => {

        var commentData2 = {
          comment: comment,
          role: this.currentUser.role,
          userId: {
          name: this.currentUser.name,
          photo: this.currentUser.photo
        }
        };
        this.taskComments = this.taskComments.concat(commentData2);

        new Noty({
          type: 'success',
          text: 'Comment created successfully',
          timeout: 3000,
          progressBar: true
        }).show();
      },
      error => {
        new Noty({
          type: 'error',
          text: error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

    this.newComment = "";
    this.commentx = "";


  }


  // Tasks = []
  // TasksTitles = []
  // TasksDescriptions = []
  // TasksTeachers = []
  // TasksCreatedAt = []
  // TasksUpdatedAt = []
  // Teacher = []
  // getTasks(childId){
  //   this.http.get("http://localhost:3000/api/task/getTasks/" + childId).subscribe((res: any) => {
  //     this.Tasks = res.data;
  //     var arrayLength = this.Tasks.length;
  //     for (var i = 0; i < arrayLength; i++) {
  //       this.TasksTitles[i] = this.Tasks[i].Title;
  //       this.TasksDescriptions[i] = this.Tasks[i].Description;
  //       this.TasksCreatedAt[i] = this.Tasks[i].createdAt;
  //       this.TasksUpdatedAt[i] = this.Tasks[i].updatedAt;
  //       this.http.get(appConfig.apiUrl + '/task/getTeacher/' + this.Tasks[i].TeacherId)
  //       .subscribe((res: any) => { this.TasksTeachers[i] = res.data;
  //         var arrayLength2 = this.TasksTeachers.length;
  //         for (var i = 0; i < arrayLength2; i++) {
  //           this.Teacher[i] = this.TasksTeachers[i].firstName + this.TasksTeachers[i].lastName ;
  //         }
  //
  //       });
  //     }
  //   });
  // }
}
