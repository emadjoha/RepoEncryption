import { Component, OnInit } from '@angular/core';
import { patient, keySecuity } from './patient.models';
import { PatientService } from './patient.service';
declare var JSEncrypt: any;
declare var require: any;

var aesjs = require("aes-js");
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  name:string;
    decrypt = new JSEncrypt();
    encrypt = new JSEncrypt();
    decryptdata: any;
     encryptdata: any;



  title:string = 'encryption';
  patientinstance:patient = new patient();
  infoSec:keySecuity =new keySecuity();
   // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
   key= [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,17];

   key2= [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,17];
   constructor(private patientService:PatientService){
  }
  encryption(){
    // Convert text to bytes
var text = this.patientinstance.firstName+this.patientinstance.lastName+this.patientinstance.age;
var textBytes = aesjs.utils.utf8.toBytes(text);
 
// The counter is optional, and if omitted will begin at 1
var aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(5));
var encryptedBytes = aesCtr.encrypt(textBytes);
 
// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
//add to Object;
this.key.push(+this.patientinstance.age*100+5);
this.key2.push(20*100*Math.random()+1);
this.infoSec.valueAES = encryptedHex;
this.infoSec.keysecre = this.key;
this.infoSec.keySecre_2 =this.key2;
this.patientService.sendEncryption(this.infoSec).
subscribe(data=>data)
this.key.pop();
this.key2.pop();
}










  ngOnInit(){



    console.log(this.patientinstance.age);
  }




  
}
