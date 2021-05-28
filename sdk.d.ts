export interface MaskSDK {
    version: number
    getProfiles(): Promise<string[]>
    isContextConnected(): Promise<boolean>
    setPayload(
        payload: Record<string, unknown>,
        options: {
            additionText: string
        }
    ): Promise<void>
}
declare const def: Promise<MaskSDK>
export default def
