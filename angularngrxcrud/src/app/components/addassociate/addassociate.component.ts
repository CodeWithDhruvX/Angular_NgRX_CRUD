import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, getassociatesuccess, loadassociate, updateassociate } from '../../store/associate/associate.action';
import { Associates } from '../../store/model/associate.model';
import { getassociate } from '../../store/associate/associate.selectors';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})
export class AddassociateComponent implements OnInit {
  title = 'Create Associate';
  isedit = false;
  dialogdata: any;
  associateform = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    group: this.builder.control('level1'),
    status: this.builder.control(true)
  })

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private store:Store) { }

  ngOnInit() {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getassociate).subscribe((res)=>{
      console.log(res);
      
      this.associateform.setValue({
        id:res.id,name:res.name,address:res.address,email:res.email,group:res.associategroup,
        phone:res.phone,status:res.status,type:res.type
      });
    })
  }

  closePopup(obj:any = undefined) {
    if (obj)
      this.ref.close(obj);
    else
      this.ref.close();
  }

  saveAssociate() {
    if (!this.associateform.invalid) {
      const _obj: Associates = {
        id: this.associateform.value.id as number,
        name: this.associateform.value.name as string,
        email: this.associateform.value.email as string,
        phone: this.associateform.value.phone as string,
        type: this.associateform.value.type as string,
        address: this.associateform.value.address as string,
        associategroup: this.associateform.value.group as string,
        status: this.associateform.value.status as boolean
      };
      if (_obj.id)
        this.store.dispatch(updateassociate({inputdata:_obj,length:this.data.length}))

      else
        this.store.dispatch(addassociate({ inputdata: _obj, length: this.data.length }));
      this.closePopup({ ..._obj, id: this.data.length + 1 });
    }
  }

}
