
export declare enum CompressionSignature {
    NONE = 0,

    LZMA,
    LZHAM,
    ZSTD,
}

export declare interface CompressedSwfProps {
    id: Buffer,
    signature: number,
    metadata: Buffer,
    hash: Buffer
}

interface SupercellCompressionDecompressor {
    /**
     * Decompress .sc file to cache
     * @param filepath Filepath to compressed .sc file
     */
    decompressFile(filepath: string): string;

    /**
     * Decompress .sc file buffer
     * @param filebuffer Compressed .sc file buffer
     */
    decompress(filebuffer: Buffer): Buffer;

    /**
    * Decompress compressed file buffer with unknown compression method
    * @param filebuffer Compressed .sc file buffer
    */
    commonDecompress(filebuffer: Buffer): Buffer;

    /**
     * Get .sc file header properties
     * @param filebuffer Compresed .sc file buffer
     */
    getProps(filebuffer: Buffer): CompressedSwfProps;
}

interface SupercellCompressionCompressor {
    /**
     * Compress .sc file
     * @param filepath Filepath to decompressed .sc file
     * @param outFilepath Filepath to compressed .sc file
     */
    compressFile(filepath: string, outFilepath: string, signature: CompressionSignature): void;

    /**
     * Compress .sc file buffer
     * @param filebuffer .sc file compressed buffer
     * @param signature Compress method
     */
    compress(filebuffer: Buffer, signature: CompressionSignature): Buffer;

    /**
     * Compress .sc file buffer with specified props settings
     * @param filebuffer .sc file decompressed buffer
     * @param props .sc file header props
     */
    compress(filebuffer: Buffer, props: CompressedSwfProps): Buffer; // TODO

    /**
     * Compress data buffer with specified signature
     * @param filebuffer Decompressed data buffer
     * @param signature Buffer compression method
     */
    commonCompress(filebuffer: Buffer, signature: CompressionSignature): Buffer; // TODO
}

interface SupercellCompression {
    Decompressor: SupercellCompressionDecompressor,
    Compressor: SupercellCompressionCompressor
}

export declare const SupercellCompression: SupercellCompression;