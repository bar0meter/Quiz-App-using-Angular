import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { QuizComponent } from "./quiz/quiz.component";
import { AppRoutingModule } from "./app-routing.module";
import { EvaluateComponent } from './evaluate/evaluate.component';
import { AboutQuizComponent } from './about-quiz/about-quiz.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, HomeComponent, QuizComponent, EvaluateComponent, AboutQuizComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
