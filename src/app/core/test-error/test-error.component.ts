import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.apiUrl + 'buggy/notfound').subscribe(response => {
      if(response)
        console.log(response)
      console.log("Without Result")
    }, error => {
      console.log(error)
    })
  }
  get500Error(){
    this.http.get(this.apiUrl + 'buggy/servererror').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
  get400Error(){
    this.http.get(this.apiUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
  get400ValidationError(){
    this.http.get(this.apiUrl + 'products/fortytwo').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
}
