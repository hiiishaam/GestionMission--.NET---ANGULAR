import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-view-mission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './view-mission-dialog.component.html'
})
export class View {
  pdfSafeUrl: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<View>,
    @Inject(MAT_DIALOG_DATA) public data: { pdfUrl: string },
    private sanitizer: DomSanitizer
  ) {
    // Sécuriser le bloburl pour Angular
    this.pdfSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.pdfUrl);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}