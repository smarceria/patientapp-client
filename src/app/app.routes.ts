import { Routes } from '@angular/router';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientsListComponent },
  { path: 'patients/add', component: AddPatientComponent },
  { path: 'patients/:id', component: EditPatientComponent },
];
