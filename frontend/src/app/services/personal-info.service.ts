import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  endpoint: string = 'http://localhost:8080/api/personal_info';
  constructor(private httpClient: HttpClient) {}

  getAllPersonalInfo() {
    return this.httpClient.get(this.endpoint);
  }
  getOnePersonalInfo(id: any) {
    return this.httpClient.get(this.endpoint + `/${id}`);
  }

  createPersonalInfo(personalInfo: any) {
    return this.httpClient.post(this.endpoint, personalInfo);
  }

  updatePersonalInfo(id: number, personalInfo: any) {
    return this.httpClient.put(this.endpoint + `/${id}`, personalInfo);
  }
}
