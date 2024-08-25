import { CommonModule, formatDate, JsonPipe, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../models/patient';
import { AustralianAddress } from '../../models/australian-address';

@Component({
  selector: 'app-patient-editor',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgFor, CommonModule],
  templateUrl: './patient-editor.component.html',
  styleUrl: './patient-editor.component.css',
})
export class PatientEditorComponent implements OnInit, OnChanges {
  @Output() submitted = new EventEmitter<Patient>();

  @Input() patient?: Patient = {
    address: undefined,
    dateOfBirth: undefined,
    gender: undefined,
    id: undefined,
    lastName: undefined,
    pid: undefined,
    firstName: '',
    phoneNo: '',
  };

  @Input() hideSubmitButton: boolean = false;

  genders: { value: string; label: string }[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'X', label: 'Indeterminate/Intersex/Unspecified)' },
  ];

  patientForm = this.formBuilder.group({
    pid: [''],
    firstName: ['', Validators.required],
    lastName: [''],
    dateOfBirth: [''],
    address: this.formBuilder.group({
      address: [''],
      suburb: [''],
      state: [''],
      postcode: [''],
    }),
    gender: [''],
    phoneNo: [''],
  });

  ngOnInit(): void {
    console.log('ngOnInit', this.patient);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.patient) {
      console.log('ngOnChanges', this.patient);

      if (this.patient.dateOfBirth) {
        this.patientForm
          .get('dateOfBirth')
          ?.setValue(formatDate(this.patient.dateOfBirth, 'yyyy-MM-dd', 'en'));
      }

      this.patientForm.get('pid')?.setValue(this.patient.pid || '');
      this.patientForm.get('firstName')?.setValue(this.patient.firstName || '');
      this.patientForm.get('lastName')?.setValue(this.patient.lastName || '');
      this.patientForm.get('gender')?.setValue(this.patient.gender || '');
      this.patientForm.get('phoneNo')?.setValue(this.patient.phoneNo || '');

      this.patientForm
        .get('address')
        ?.get('address')
        ?.setValue(this.patient.address?.address || '');

      this.patientForm
        .get('address')
        ?.get('suburb')
        ?.setValue(this.patient.address?.suburb || '');

      this.patientForm
        .get('address')
        ?.get('state')
        ?.setValue(this.patient.address?.state || '');

      this.patientForm
        .get('address')
        ?.get('postcode')
        ?.setValue(this.patient.address?.postcode || '');

      console.log(this.patient.id)
      if (this.patient.id && this.patient.id > -1) {
        this.patientForm.controls.pid.disable();
      } else {
        this.patientForm.controls.pid.enable();
      }
    }
  }

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn({
      form: this.patientForm.value,
      // status: this.patientForm.status,
    });

    // at this point, the form is valid

    const formValue = this.patientForm.value;

    const _patient = new Patient();

    _patient.address = new AustralianAddress();
    _patient.address.address = formValue.address?.address || '';
    _patient.address.state = formValue.address?.state || '';
    _patient.address.suburb = formValue.address?.suburb || '';
    _patient.address.postcode = formValue.address?.postcode || '';

    _patient.dateOfBirth = formValue.dateOfBirth || '';
    _patient.firstName = formValue.firstName || '';
    _patient.lastName = formValue.lastName || '';
    _patient.gender = formValue.gender || '';
    _patient.phoneNo = formValue.phoneNo || '';
    _patient.pid = formValue.pid || '';

    if (this.patient) {
      _patient.id = this.patient.id;
    }

    this.submitted.emit(_patient);
  }
}
