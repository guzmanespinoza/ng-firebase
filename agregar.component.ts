import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  name:string;
  constructor( private cnn:ConexionService) { }

  ngOnInit() {
  }

  add(formData){
    console.log(formData);
    this.cnn.addItem(formData.name);
  }

}
