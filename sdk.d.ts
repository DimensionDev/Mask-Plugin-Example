export interface MaskSDK {
    version: number
    echo<T>(x: T): Promise<T>
    getProfiles(): Promise<string[]>
}
declare const def: Promise<MaskSDK>
export default def
