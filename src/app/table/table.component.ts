import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assessment } from '../mock'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  viewAssessment: boolean = false;
  updateMode: boolean = false;
  display: boolean = false;
  date: Date;
  minDateValue = new Date();
  assessmentForm: FormGroup;
  selectedAssessment: Assessment;


  assessments: Assessment[] = [{
    player: 'Example player 1',
    description: 'Example assessment',
    agent: 'Agent 1',
    assessmentDate: new Date()
  },
  {
    player: 'Example player 2',
    description: 'Example assessment',
    agent: 'Agent 2',
    assessmentDate: new Date()
  }
  ]

   
  constructor(private fb: FormBuilder) {
    this.assessmentForm = this.fb.group({
      player: ['', Validators.required],
      description: ['', Validators.required],
      agent: ['', Validators.required],
      assessmentDate: ['', Validators.required]
    });
  }

  setActiveAssessment(assessment: Assessment) {
    this.selectedAssessment = assessment;
    this.assessmentForm.controls['player'].setValue(assessment.player);
    this.assessmentForm.controls['description'].setValue(assessment.description);
    this.assessmentForm.controls['agent'].setValue(assessment.agent);
    this.assessmentForm.controls['assessmentDate'].setValue(assessment.assessmentDate);
  }

  createAssessment(newAssessment: Assessment) {
    this.assessmentForm.markAllAsTouched();
    if (this.assessmentForm.valid) {
      let day = newAssessment.assessmentDate.getDate();
      if (this.assessments.find(i => i.player == newAssessment.player && i.assessmentDate.getDate() == day)) {
        alert('Player can only have one assessment per day.')
      } else {
        this.assessments.push(newAssessment);
        this.display = false;
      }
    }
    
  }

  view(assessment: Assessment) {
    this.viewAssessment = true;
    this.setActiveAssessment(assessment);
  }
  update(assessment: Assessment) {
    this.display = true;
    this.updateMode = true;
    this.setActiveAssessment(assessment);
  }
  updateAssessment(updated: Assessment) {
    let index = this.assessments.findIndex(i => i === this.selectedAssessment)
    this.assessments[index] = updated;
    this.display = false;
  }

  delete(assessment: Assessment) {
    this.assessments.splice(this.assessments.indexOf(assessment), 1);
  }

  dialogClosed() {
    this.assessmentForm.reset();
    this.updateMode = false;
  }

  ngOnInit(): void {

  }

}
