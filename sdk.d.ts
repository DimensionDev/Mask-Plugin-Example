export interface MaskSDK {
    version: number
    echo<T>(x: T): Promise<T>
}
declare const def: Promise<MaskSDK>
export default def
