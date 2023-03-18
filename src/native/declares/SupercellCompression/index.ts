export declare enum CompressionSignature {
  NONE = 0,
  LZMA = 1,
  LZHAM = 2,
  ZSTD = 3,
}

interface SupercellCompressionDecompressor {
  /**
   * Decompress .sc file to cache
   * @param filepath Filepath to compressed .sc file
   */
  decompressFile: (filepath: string) => string;
  /**
   * Decompress .sc file buffer
   * @param filebuffer Compressed .sc file buffer
   */
  decompress: (filebuffer: Buffer) => Buffer;
  /**
   * Decompress compressed file buffer with unknown compression method
   * @param filebuffer Compressed .sc file buffer
   */
  commonDecompress: (filebuffer: Buffer) => Buffer;
}

interface SupercellCompressionCompressor {
  /**
   * Compress .sc file
   * @param filepath Filepath to decompressed .sc file
   * @param outFilepath Filepath to compressed .sc file
   */
  compressFile: (
    filepath: string,
    outFilepath: string,
    signature: CompressionSignature
  ) => void;
  /**
   * Compress .sc file buffer
   * @param filebuffer .sc file compressed buffer
   * @param signature Compress method
   */
  compress: (filebuffer: Buffer, signature: CompressionSignature) => Buffer;
  /**
   * Compress data buffer with specified signature
   * @param filebuffer Decompressed data buffer
   * @param signature Buffer compression method
   */
  commonCompress: (
    filebuffer: Buffer,
    signature: CompressionSignature
  ) => Buffer;
}

export interface SupercellCompression {
  Decompressor: SupercellCompressionDecompressor;
  Compressor: SupercellCompressionCompressor;
}
