import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  items: any;

  constructor(private cnn: ConexionService) {
    this.cnn.listItem().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }

  ngOnInit() {

  }

  delete(item){
    this.cnn.deleteItem(item);
  }

}
