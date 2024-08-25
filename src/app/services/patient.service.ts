import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { ListResponse } from '../models/list-response';
import { HttpClient } from '@angular/common/http';

// HACK: move this to somewhere else
const API_PROTOCOL = 'http';
const API_HOST = 'localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  ping(): number {
    return new Date().getTime();
  }

  getAll(args?: {
    filter?: { pid: string; name: string };
    page: number;
    size: number;
  }): Observable<ListResponse<Patient>> {
    let url = `${API_PROTOCOL}://${API_HOST}/patient`;

    let page = 0;
    let pageSize = 10;

    const qs = [];

    if (args) {
      if (args.filter) {
        // NOTE: optimize to object-keys / js map

        // filter if filter value is set
        if (args.filter.pid) {
          qs.push(`pid=${args.filter.pid}`);
        }
        if (args.filter.name) {
          qs.push(`name=${args.filter.name}`);
        }
      }

      page = args.page || 0;

      pageSize = args.size || 10;
    }

    qs.push(`page=${page}`);
    qs.push(`size=${pageSize}`);

    const _qs = qs.join('&').trim();
    if (_qs && qs.length) {
      url += `?${_qs}`;
    }

    return this.http.get<ListResponse<Patient>>(url, { responseType: 'json' });
  }

  get(id: number): Observable<Patient> {
    // const url = '/assets/_d/patient-detail.json';
    const url = `${API_PROTOCOL}://${API_HOST}/patient/${id}`;

    return this.http.get<Patient>(url, { responseType: 'json' });
  }

  create(patient: Patient): Observable<any> {
    const url = `${API_PROTOCOL}://${API_HOST}/patient`;

    return this.http.post(url, patient);
  }

  update(patient: Patient): Observable<any> {
    const url = `${API_PROTOCOL}://${API_HOST}/patient/${patient.id}`;

    return this.http.put(url, patient);
  }

  delete(patient: Patient): Observable<any> {
    const url = `${API_PROTOCOL}://${API_HOST}/patient/${patient.id}`;

    return this.http.delete(url, { responseType: 'text' });
  }
}
