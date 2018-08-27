import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LoadQuizService } from "../load-quiz.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  quesCount: number;
  temp_array: number[] = [];

  @Input()
  currentQuesNo: string;

  @Output()
  navigateToQues = new EventEmitter();

  constructor(private ser: LoadQuizService) {}

  ngOnInit() {
    this.quesCount = this.ser.getQuesCount();
    for (let i = 0; i < this.quesCount; i++) this.temp_array.push(i);
  }

  goToQues(id: number) {
    this.navigateToQues.emit(id);
  }
}
