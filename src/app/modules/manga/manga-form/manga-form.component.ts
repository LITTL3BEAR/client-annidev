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
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: [''],
      chapter: ['', Validators.required],
      status: [''],
      link: [''],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.data.isEdit) {
      this.form.patchValue({
        title: this.data.manga.title,
        author: this.data.manga.author,
        chapter: this.data.manga.chapter,
        status: this.data.manga.status,
        link: this.data.manga.link
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
