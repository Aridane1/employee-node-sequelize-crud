import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', // Tipo de contenido (por ejemplo, application/json)
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  endpoint: string = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees() {
    return this.httpClient.get(this.endpoint);
  }

  createEmployee(employee: any, blob: any) {
    let formData = new FormData();
    formData.append('name', employee.name);
    formData.append('last_names', employee.last_name);
    formData.append('email', employee.email);
    formData.append('file', blob);

    return this.httpClient.post(this.endpoint, formData);
  }
  removeEmployee(employeId: number) {
    return this.httpClient.delete(this.endpoint + `/${employeId}`);
  }

  updateEmployee(id: number, employee: any, blob: any) {
    let formData = new FormData();
    formData.append('name', employee.name);
    formData.append('last_names', employee.last_names);
    formData.append('email', employee.email);
    formData.append('comprobar', employee.comprobar);
    formData.append('file', blob);
    return this.httpClient.put(this.endpoint + `/${id}`, formData);
  }
}
