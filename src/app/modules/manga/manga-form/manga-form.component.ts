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
    const { title = '', currentChapter = 0, latestChapter = 0, status = '', website = '' } = data.manga
    this.form = this.fb.group({
      title: [title, Validators.required],
      currentChapter: [currentChapter],
      latestChapter: [{ value: latestChapter, disabled: false }],
      status: [status],
      website: [website],
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
