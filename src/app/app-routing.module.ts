import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { QuizComponent } from "./quiz/quiz.component";
import { EvaluateComponent } from "./evaluate/evaluate.component";
import { AboutQuizComponent } from "./about-quiz/about-quiz.component";

const routes: Routes = [
  { path: "", component: SignInComponent },
  {
    path: "home",
    component: HomeComponent
  },
  { path: "sign_in", redirectTo: "", component: SignInComponent },
  { path: "quiz", component: QuizComponent },
  { path: "evaluate", component: EvaluateComponent },
  { path: "about_quiz", component: AboutQuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
