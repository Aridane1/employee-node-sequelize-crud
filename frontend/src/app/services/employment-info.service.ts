import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmploymentInfoService {
  endpoint: string = 'http://localhost:8080/api/employment_info';
  constructor(private httpClient: HttpClient) {}

  getAllEmploymentInfo() {
    return this.httpClient.get(this.endpoint);
  }

  getOneEmploymentInfo(id: any) {
    return this.httpClient.get(this.endpoint + `/${id}`);
  }

  createEmploymentInfo(employmentInfo: any) {
    return this.httpClient.post(this.endpoint, employmentInfo);
  }
  updateEmploymentInfo(id: number, employmentInfo: any) {
    return this.httpClient.put(this.endpoint + `/${id}`, employmentInfo);
  }
}
