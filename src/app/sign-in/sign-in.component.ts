import { Component, OnInit } from "@angular/core";

import { SignInService } from "../sign-in.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signIn: boolean = false;
  constructor(
    private signInSer: SignInService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signInForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  loginUser() {
    let user, pass;
    user = this.signInForm.get("username").value;
    pass = this.signInForm.get("password").value;

    this.signInSer.getuser(user).subscribe(data => {
      if (data["username"] === user && data["password"] === pass) {
        console.log(`Welcome ${user}`);
        this.signIn = true;
      }
    });
  }
}
