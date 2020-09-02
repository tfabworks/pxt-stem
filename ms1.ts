namespace stem {
    /**
     * TFW-MS1から磁石が離れているとき真を返します。
     */
    //% blockId=MS1_magnetDetouched block="磁石が離れた"
    //% group="MS1"
    //% weight=100
    export function MS1_magnetDetouched(): boolean {
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        if (pins.digitalReadPin(DigitalPin.P15) == 1) {
            return true;
        } else {
            return false;
        }
    }
}
