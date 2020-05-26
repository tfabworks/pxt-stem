namespace stem {
    /**
     * TFW-SL1で検知した音の大きさを返します（0-1023）
     */
    //% blockId=SL1_sound_pressure block="音の大きさ"
    //% group="SL1"
    export function SL1_sound_pressure(): number {
        return pins.i2cReadNumber(8, NumberFormat.UInt16BE, false)
    }
}