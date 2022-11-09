import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
  
})
export class DialogComponent implements OnInit {
  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  ProductForm !: FormGroup;
  actionBtn : string = 'Save'
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    });
     if(this.editData){
       this.actionBtn = "Update";
       this.ProductForm.controls['productName'].setValue(this.editData.productName);
       this.ProductForm.controls['category'].setValue(this.editData.category);
       this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
       this.ProductForm.controls['price'].setValue(this.editData.price);
       this.ProductForm.controls['date'].setValue(this.editData.date);
       this.ProductForm.controls['comment'].setValue(this.editData.comment);



     }
  }
  addProduct(){
    // console.log(this.ProductForm.value);
    if(!this.editData){
      if(this.ProductForm.valid){
        this.api.postProduct(this.ProductForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added Sucessfully");
            this.ProductForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            alert("Error while adding the Product")
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.ProductForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Sucessfully");
        this.ProductForm.reset();
        this.dialogRef.close('Update');
      },
      error:()=>{
        alert("Error while Updating the records!!");
      }
    })
  }

}
