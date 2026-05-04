const PDF_OR_WORD_MIMES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isPdfOrWordFile(file: File): boolean {
  if (PDF_OR_WORD_MIMES.has(file.type)) {
    return true;
  }
  const n = file.name.toLowerCase();
  return n.endsWith('.pdf') || n.endsWith('.doc') || n.endsWith('.docx');
}

/** Syncs a dropped file onto a file input (picker already does this natively). */
export function assignFileToInput(file: File, input: HTMLInputElement): void {
  try {
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
  } catch {
    /* ignored */
  }
}
