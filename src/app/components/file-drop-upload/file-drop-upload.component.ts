import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { assignFileToInput, isImageFile, isPdfOrWordFile, isVideoFile } from '../../utils/file-helpers';

export type FileDropUploadMode = 'image' | 'document' | 'video';

@Component({
  selector: 'app-file-drop-upload',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './file-drop-upload.component.html',
  styleUrl: './file-drop-upload.component.scss'
})
export class FileDropUploadComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('fileInput') private readonly fileInputRef?: ElementRef<HTMLInputElement>;

  @Input({ required: true }) label!: string;
  @Input() hint = '';
  @Input({ required: true }) accept!: string;
  @Input({ required: true }) dropTitle!: string;
  @Input() dropSub = '';
  @Input() mode: FileDropUploadMode = 'image';
  @Input() initialFileName = '';
  @Input() initialPreviewUrl: string | null = null;

  @Output() fileChange = new EventEmitter<File | null>();

  dropActive = false;
  displayName = '';
  previewUrl: string | null = null;
  /** Updated when file state or mode changes; avoids getter work each change detection. */
  hasFile = false;
  errorMsg = '';

  ngOnInit(): void {
    if (this.initialFileName) {
      this.displayName = this.initialFileName;
    }
    if (this.initialPreviewUrl) {
      this.previewUrl = this.initialPreviewUrl;
    }
    this.syncHasFile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.syncHasFile();
    }
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }

  private syncHasFile(): void {
    this.hasFile = this.mode === 'image' ? !!this.previewUrl : !!this.displayName;
  }

  onNativeChange(event: Event): void {
    this.apply((event.target as HTMLInputElement).files?.[0], event.target as HTMLInputElement);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropActive = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const next = event.relatedTarget as Node | null;
    const root = event.currentTarget as HTMLElement;
    if (!next || !root.contains(next)) {
      this.dropActive = false;
    }
  }

  onDrop(event: DragEvent, fileInput: HTMLInputElement): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropActive = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.apply(file, fileInput);
    }
  }

  clear(fileInput: HTMLInputElement): void {
    this.revokePreview();
    this.displayName = '';
    this.errorMsg = '';
    fileInput.value = '';
    this.syncHasFile();
    this.fileChange.emit(null);
  }

  /** Clears selection and preview (e.g. parent form reset). */
  reset(): void {
    const input = this.fileInputRef?.nativeElement;
    if (input) {
      this.clear(input);
    } else {
      this.revokePreview();
      this.displayName = '';
      this.errorMsg = '';
      this.syncHasFile();
      this.fileChange.emit(null);
    }
  }

  private apply(file: File | undefined, input: HTMLInputElement): void {
    if (this.mode === 'image') {
      this.applyImage(file, input);
    } else if (this.mode === 'video') {
      this.applyVideo(file, input);
    } else {
      this.applyDocument(file, input);
    }
  }

  private applyImage(file: File | undefined, input: HTMLInputElement): void {
    this.revokePreview();
    this.errorMsg = '';
    if (!file) {
      this.displayName = '';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    if (!isImageFile(file)) {
      input.value = '';
      this.displayName = '';
      this.errorMsg = 'Invalid format. Please upload an image file.';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    this.displayName = file.name;
    this.previewUrl = URL.createObjectURL(file);
    assignFileToInput(file, input);
    this.syncHasFile();
    this.fileChange.emit(file);
  }

  private applyDocument(file: File | undefined, input: HTMLInputElement): void {
    this.errorMsg = '';
    if (!file) {
      this.displayName = '';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    if (!isPdfOrWordFile(file)) {
      input.value = '';
      this.displayName = '';
      this.errorMsg = 'Invalid format. Please upload a PDF or Word document.';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    this.displayName = file.name;
    assignFileToInput(file, input);
    this.syncHasFile();
    this.fileChange.emit(file);
  }

  private applyVideo(file: File | undefined, input: HTMLInputElement): void {
    this.revokePreview();
    this.errorMsg = '';
    if (!file) {
      this.displayName = '';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    if (!isVideoFile(file)) {
      input.value = '';
      this.displayName = '';
      this.errorMsg = 'Invalid format. Please upload a video file.';
      this.syncHasFile();
      this.fileChange.emit(null);
      return;
    }
    this.displayName = file.name;
    // We optionally use previewUrl for videos if we want to preview them
    this.previewUrl = URL.createObjectURL(file);
    assignFileToInput(file, input);
    this.syncHasFile();
    this.fileChange.emit(file);
  }

  private revokePreview(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }
}
