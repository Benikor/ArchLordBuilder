import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../../skill';

@Component({
  selector: 'app-skill-description',
  templateUrl: './skill-description.component.html',
  styleUrls: ['./skill-description.component.css'],
})
export class SkillDescriptionComponent implements OnInit {
  @Input() skill: Skill = {} as Skill;
  @Output() showDescription = new EventEmitter<boolean>();
  levels = Array.from(Array(15).keys());

  constructor() {}

  ngOnInit(): void {}

  closeDescription(displayDescription: boolean) {
    this.showDescription.emit(displayDescription);
  }
}