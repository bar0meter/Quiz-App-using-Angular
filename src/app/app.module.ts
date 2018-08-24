import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientsModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { QuizComponent } from "./quiz/quiz.component";

@NgModule({
  declarations: [AppComponent, SignInComponent, HomeComponent, QuizComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
