import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from '../../store/model/associate.model';
import { getassociatelist } from '../../store/associate/associate.selectors';
import { loadassociate } from '../../store/associate/associate.action';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {

  associateList!:Associates[];

  constructor(private dialog:MatDialog,private store:Store) { }

  ngOnInit() {
    this.store.dispatch(loadassociate());
    this.store.select(getassociatelist).subscribe((list)=>{
      this.associateList=list;
      console.log(this.associateList);
      
    });
  }

  add(){

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

}
