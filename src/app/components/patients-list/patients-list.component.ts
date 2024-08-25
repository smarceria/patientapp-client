import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { DatePipe } from '@angular/common';
import { PhonePipe } from '../../pipes/phone.pipe';
import { AddressPipe } from '../../pipes/address.pipe';
import { ListResponse } from '../../models/list-response';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [DatePipe, PhonePipe, AddressPipe, RouterLink, FormsModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css',
})
export class PatientsListComponent implements OnInit {
  patients?: Patient[];
  totalItems!: number;
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  filter!: { field: string; text: string };

  hasDeletedRecord: boolean = false;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.pageSize = 10;
    this.currentPage = 0;

    this.filter = {
      field: '',
      text: '',
    };

    this.getPatients();
  }

  getPatients(): void {
    const p: any = {
      page: this.currentPage,
      size: this.pageSize,
    };

    if (this.filter.field) {
      p.filter = {
        [this.filter.field]: this.filter.text,
      };
    }

    this.patientService.getAll(p).subscribe({
      next: (data: ListResponse<Patient>) => {
        console.log(data);
        this.patients = data.items;
        console.log(this.patients);
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.totalItems = data.totalItems;
      },
      error: (e) => console.error(e),
    });
  }

  handleClickAddPatient(event: Event): void {
    event.preventDefault();

    this.router.navigate(['/patients/add']);
  }

  handlePageSizeChanged(event: Event): void {
    this.currentPage = 0;

    this.getPatients();
  }

  handleClickPreviousPage(event: Event): void {
    event.preventDefault();

    this.currentPage--;

    this.getPatients();
  }

  handleClickNextPage(event: Event): void {
    event.preventDefault();

    this.currentPage++;

    this.getPatients();
  }

  handleSearchFieldChanged(): void {
    if (this.filter.text) {
      this.currentPage = 0;

      this.getPatients();
    }
  }

  handleSearchTextChanged(): void {
    if (this.filter.field) {
      this.currentPage = 0;

      this.getPatients();
    }
  }

  handleClickRemove(event: Event, patient: Patient): void {
    event.preventDefault();

    console.log(patient);

    const confirmed = confirm(
      `Are you sure to delete patient record id: ${patient.id}`
    );

    console.log('confirmed', confirmed);
    if (confirmed) {
      this.patientService.delete(patient).subscribe({
        next: (data) => {
          console.log(data);

          this.getPatients();

          this.hasDeletedRecord = true;

          alert(
            `Patient record with id: ${patient.id} has been successfully removed.`
          );
        },
        error: (e) => console.error(e),
      });
    }
  }
}
