import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plataforma } from '../../../models/enum/plataforma';
import { Observable } from 'rxjs';
import { Genero } from 'src/app/models/enum/genero'
//Excel 
import * as XLSX from 'xlsx'

import * as FileSaver from 'file-saver';
import { Marca } from 'src/app/models/enum/marca';



const baseUrl = 'http://localhost:8090/enums'

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  public listaPlataforma:Plataforma[]=[]
  constructor(private http: HttpClient) {

  }

  listarPlataformas():Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(baseUrl + '/PlataformaList');
  }

  listarGenero():Observable<Genero[]> {
    return this.http.get<Genero[]>(baseUrl + '/GeneroList');
  }

  listarMarcas():Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrl + '/MarcaList');
  }
  
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array',bookSST:true });
      this.openExcelFile(excelBuffer, fileName);
    }
  
  private openExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const excelFileURL = URL.createObjectURL(data);
    FileSaver(data, fileName + '.xlsx');

    
    }

    

    
}
