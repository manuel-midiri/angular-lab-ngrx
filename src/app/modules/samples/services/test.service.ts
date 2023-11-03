import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test, TestListResult, TestRequest } from 'src/app/models/general.models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'https://frontendtest-backend.azurewebsites.net/api/Tests';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTests(): Observable<TestListResult> {
    return this.http.get<TestListResult>(`${this.baseUrl}`);
  }

  getTestById(idTest: string): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}/${idTest}`);
  }

  createTest(testData: TestRequest): Observable<Test> {
    return this.http.post<Test>(`${this.baseUrl}`, testData);
  }

  updateTest(idTest: string, testData: TestRequest): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}/${idTest}`, testData);
  }

  deleteTest(idTest: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idTest}`);
  }

}