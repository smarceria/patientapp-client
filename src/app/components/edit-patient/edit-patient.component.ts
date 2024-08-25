import { Component, inject, Input, OnInit } from '@angular/core';
import { PatientEditorComponent } from '../patient-editor/patient-editor.component';
import { Patient } from '../../models/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [PatientEditorComponent, CommonModule],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css',
})
export class EditPatientComponent implements OnInit {
  constructor(private patientService: PatientService) {}

  private route = inject(ActivatedRoute);
  // @Input() id!: number;

  editedPatient!: Patient;

  updated: boolean = false;

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    console.log(patientId);
    // console.log(this.id);
    if (patientId) {
      this.getPatient(parseInt(patientId));
    }
  }

  getPatient(id: number): void {
    this.patientService.get(id).subscribe({
      next: (data) => {
        console.log(data);
        this.editedPatient = data;
      },
      error: (e) => console.error(e),
    });
  }

  handleSubmitted(patient: Patient): void {
    this.patientService.update(patient).subscribe({
      next: (data: Patient) => {
        console.log(data);

        this.updated = true;

        setTimeout(() => {
          window.scrollTo(
            0,
            document.body.scrollHeight || document.documentElement.scrollHeight
          );
        }, 0);
      },
      error: (e) => console.error(e),
    });
  }
}
