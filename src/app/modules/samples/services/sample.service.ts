import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sample, SampleListResult, SampleRequest } from 'src/app/models/general.models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  private baseUrl = 'https://frontendtest-backend.azurewebsites.net/api/Samples';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSamples(searchValue?: string): Observable<SampleListResult> {
    const url = searchValue ? this.baseUrl + `?name=${searchValue}` : this.baseUrl;
    return this.http.get<SampleListResult>(`${url}`);
  }

  getSampleById(id: string): Observable<Sample> {
    return this.http.get<Sample>(`${this.baseUrl}/${id}`);
  }

  createSample(sampleData: SampleRequest): Observable<Sample> {
    return this.http.post<Sample>(`${this.baseUrl}`, sampleData);
  }

  updateSample(id: string, sampleData: SampleRequest): Observable<Sample> {
    return this.http.put<Sample>(`${this.baseUrl}/${id}`, sampleData);
  }

  deleteSample(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
