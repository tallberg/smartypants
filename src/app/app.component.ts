import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  // public input = "MXJVSGpEbkpzMDlWTnZ4TGlXWnpMN1BYZUtVSHZ4RlZHNUdUNTlXZFM2bnZPWjFVeXBWYktsUVRjbDRvckhGU2hRTUJDRkdIOCs0K1NsRkREdjQrZFVJY21kM3p5YUJuc1hLQ2I5bE11R21NSmtzbGdQRnZnUEtOV0dzU1Z1NEJoSTYvNDJkR0czcTBMY2E0NjV4ZURhRUtUajNZYW4vNTkvK0Q1U2Q2Q2hhM3F3RVdvSVRiUjh6RmdGTmNPVkxS"
  // public input = "1rUHjDnJs09VNvxLiWZzL7PXeKUHvxFVG5GT59WdS6nvOZ1UypVbKlQTcl4orHFShQMBCFGH8+4+SlFDDv4+dUIcmd3zyaBnsXKCb9lMuGmMJkslgPFvgPKNWGsSVu4BhI6/42dGG3q0Lca465xeDaEKTj3Yan/59/+D5Sd6Cha3qwEWoITbR8zFgFNcOVLR"; // unknown
  // public input = "TCQYI VN UB MOAL NNZ"; // fibo cipher
  // public input = "N VJ DCBSXNIP SVCV RITEXGCNHI"; // reverse + shift
  // public input = "VUM, PBAQ AQ I QPURK IXX IHUOP BUM WK XADE CUP DXATTEF-PORVEF OTQAFE FUMV"; // reverse shift
  // public input = "Yxmördaren Julia Blomqvist på fäktning i Schweiz";  
  public input = "";

  onInputKeyUp(event: KeyboardEvent) {
    if (event.altKey) {
      console.log(event);
      switch(event.key) {
        case 'u': this.input = this.input.toLocaleUpperCase(); break;
        case 'l': this.input = this.input.toLocaleLowerCase(); break;
        case 's': this.input = this.input.replace(/\s/g, ''); break;
      }
      event.stopPropagation();
    }
    
  }

}
