import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { id?: string, name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items',ref=> ref.orderBy('name', 'asc')/*.startAt('A').endAt('z')*/);
    // this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as Item;
        let id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listItem() {
    return this.items;
  }

  addItem(name: string) {
    // Persist a document id
    let id = this.afs.createId();
    let item: Item = { id, name };
    this.itemsCollection.doc(id).set(item);
  }

  deleteItem(item){
    this.itemDoc=this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.delete();
  }


}
