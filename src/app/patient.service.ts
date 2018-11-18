import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { patient, keySecuity } from './patient.models';

@Injectable()
export class PatientService {



  constructor(private http:HttpClient) { 

  }

  sendEncryption(patientdata:keySecuity):Observable<patient>{
    return this.http.post<patient>('/post',patientdata);
  }


}
