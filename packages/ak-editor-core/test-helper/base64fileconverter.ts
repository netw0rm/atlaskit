const HAS_BASE64_FILE_SUPPORT =
  typeof File !== 'undefined' &&
  typeof FileReader !== 'undefined' &&
  typeof FileList !== 'undefined' &&
  typeof Blob !== 'undefined';

export class Converter {
  HAS_BASE64_FILE_SUPPORT = HAS_BASE64_FILE_SUPPORT;
  supportedTypes: Array<string>;
  maxFileSizeInBytes: number;

  constructor(
    supportedTypes: Array<string>,
    maxFileSizeInBytes: number
  ) {
    this.supportedTypes = supportedTypes;
    this.maxFileSizeInBytes = maxFileSizeInBytes;
  }

  convert(
    files: Array<File>,
    fn = (base64src: string) => {},
    errFn = (file: File) => {}
  ) {
    if (files && files[0]) {
      files.forEach((
        file: File
      ) => {
        const mimeType = file.type;
        if (
          file.size > this.maxFileSizeInBytes ||
          !this.supportedTypes.some((fileType) => mimeType.indexOf(fileType) !== -1)
        ) {
          errFn(file);
        }

        const reader = new FileReader();
        reader.onload = (
          // tslint:disable-next-line
          readerEvt: any
        ) => {
          const binarySrc: string = btoa(readerEvt.target.result);
          fn(`data:${mimeType};base64,${binarySrc}`);
        };
        reader.readAsBinaryString(file);
      });
    }
  }
}

export type convertedHandlerCallback = (imageAttrs: any) => void;

export function dropHandler(
  converter: Converter,
  e: DragEvent,
  fn: convertedHandlerCallback
) : boolean {
  if (
    !converter.HAS_BASE64_FILE_SUPPORT ||
    !(
      e.dataTransfer &&
      e.dataTransfer.files &&
      e.dataTransfer.files.length
    )
  ) {
    return false;
  }

  const files = Array.prototype.slice.call(e.dataTransfer.files);

  converter.convert(files, (src: string) => fn({ src }));

  return true;
};

export function pasteHandler(
  converter: Converter,
  e: ClipboardEvent,
  fn: convertedHandlerCallback
) : boolean {
  if (
    !converter.HAS_BASE64_FILE_SUPPORT ||
    !(
      e.clipboardData &&
      e.clipboardData.items &&
      e.clipboardData.items.length
    )
  ) {
    return false;
  }

  const items = e.clipboardData.items;
  const files = (Array.prototype.slice.call(items)).reduce((
    filesArr: Array<File>,
    item: DataTransferItem
  ) => {
    if (item.kind === 'file') {
      filesArr.push(item.getAsFile() as File);
    }
    return filesArr;
  }, []);

  if (files.length) {
    converter.convert(files, (
      src: string
    ) => fn({ src }));

    return true;
  }

  return false;
}
