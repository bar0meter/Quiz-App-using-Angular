import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadQuizService } from "../load-quiz.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  topic = "";
  quesCount = "";
  difficulty = "";
  agree;
  error: string = "";
  displayCount: string = "10";
  quizTopics = [
    { category_id: "18", name: "Computer" },
    { category_id: "19", name: "Mathematics" },
    { category_id: "31", name: "Anime/Manga" }
  ];
  difficultyLevels = ["easy", "medium", "hard"];
  constructor(private router: Router, private ser: LoadQuizService) {}

  ngOnInit() {}

  setQuesCount() {
    if (this.quesCount === "") this.displayCount = "10";
    else this.displayCount = this.quesCount;
  }

  startQuiz() {
    if (this.agree) {
      console.log(this.topic, this.quesCount, this.difficulty);
      this.ser.setQuiz(this.topic, this.quesCount, this.difficulty);
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
