export interface MaskSDK {
    version: number
    getProfiles(): Promise<string[]>
    isContextConnected(): Promise<boolean>
}
declare const def: Promise<MaskSDK>
export default def
