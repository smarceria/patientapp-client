import { Component } from '@angular/core';
import { PatientEditorComponent } from '../patient-editor/patient-editor.component';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [PatientEditorComponent, CommonModule, RouterLink],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
})
export class AddPatientComponent {
  saved: boolean = false;
  createdPatientId: number | undefined;

  constructor(private patientService: PatientService) {}

  handleSubmitted(patient: Patient): void {
    console.log(patient);

    this.patientService.create(patient).subscribe({
      next: (data: Patient) => {
        console.log(data);

        this.saved = true;
        this.createdPatientId = data.id;

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
