import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from '../../store/model/associate.model';
import { getassociatelist } from '../../store/associate/associate.selectors';
import { loadassociate } from '../../store/associate/associate.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {

  associateList!:Associates[];
  datasource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  constructor(private dialog:MatDialog,private store:Store) { }

  ngOnInit() {
    this.store.dispatch(loadassociate());
    this.store.select(getassociatelist).subscribe((list)=>{
      this.associateList=list;
      this.datasource = new MatTableDataSource<Associates>(this.associateList);
      console.log(this.associateList);
    });
  }

  add(){
    this.openPopup(0, 'Create Associate');
  }

  openPopup(code:number,title:string){
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })
  }

  edit(id:any){

  }

  delete(id:any){

  }

}
