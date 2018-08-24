import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  agree;
  error: string = "";
  constructor(private router: Router) {}

  ngOnInit() {}

  startQuiz() {
    if (this.agree) {
      this.router.navigateByUrl("/quiz");
      console.log("Starting Quiz");
    } else {
      this.error = "Please agree to terms and condition before proceeding";
    }
  }

  checkError() {
    if (this.agree) {
      this.error = "";
    }
    return;
  }
}
