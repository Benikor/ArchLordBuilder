import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillBuilderService } from '../skill-builder.service';

@Component({
  selector: 'app-skill-unit',
  templateUrl: './skill-unit.component.html',
  styleUrls: ['./skill-unit.component.css'],
})
export class SkillUnitComponent implements OnInit {
  @Input() skill: Skill = {} as Skill;
  @Input() increasable: boolean = false;
  @Input() decreasable: boolean = false;
  @Input() currentClass: string = '';
  displayDescription = false;

  constructor(private skillBuilderService: SkillBuilderService) {}

  ngOnInit(): void {}

  increaseSkillLevel() {
    if (this.increasable) {
      this.skillBuilderService.increaseUsedSkillPoints(
        this.skill.requiredSkillPoints[this.skill.level]
      );
      this.skillBuilderService.increaseUsedHeroicPoints(
        this.skill.requiredHeroicPoints[this.skill.level]
      );
      this.skillBuilderService.addMinLevel(
        this.skill.requiredLevels[this.skill.level]
      );
      this.skill.level++;

      if (this.skill.requirements['All Skill Points' as keyof Object]) {
        this.skillBuilderService.addRequiredSpentSkillPoints(
          Number(this.skill.requirements['All Skill Points' as keyof Object])
        );
      }

      if (this.skill.requirements['Heroic Skill Points' as keyof Object]) {
        this.skillBuilderService.addRequiredSpentHeroicPoints(
          Number(this.skill.requirements['Heroic Skill Points' as keyof Object])
        );
      }
    }
  }

  decreaseSkillLevel() {
    if (this.decreasable) {
      this.skill.level--;
      this.skillBuilderService.decreaseUsedSkillPoints(
        this.skill.requiredSkillPoints[this.skill.level]
      );
      this.skillBuilderService.decreaseUsedHeroicPoints(
        this.skill.requiredHeroicPoints[this.skill.level]
      );
      this.skillBuilderService.removeMinLevel(
        this.skill.requiredLevels[this.skill.level]
      );

      if (this.skill.requirements['All Skill Points' as keyof Object]) {
        this.skillBuilderService.removeRequiredSpentSkillPoints(
          Number(this.skill.requirements['All Skill Points' as keyof Object])
        );
      }

      if (this.skill.requirements['Heroic Skill Points' as keyof Object]) {
        this.skillBuilderService.removeRequiredSpentHeroicPoints(
          Number(this.skill.requirements['Heroic Skill Points' as keyof Object])
        );
      }
    }
  }
}
