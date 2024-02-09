import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Manga } from '../manga.model';

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.scss']
})
export class MangaFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MangaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { manga: Manga, isEdit: boolean },
    private fb: FormBuilder,
  ) {
    const { isEdit, manga } = data
    this.form = this.fb.group({
      name: [isEdit ? manga.name : '', Validators.required],
      author: [isEdit ? manga.author : ''],
      chapter: [isEdit ? manga.chapter : ''],
      status: [isEdit ? manga.status : ''],
      link: [isEdit ? manga.link : ''],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
