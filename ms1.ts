namespace stem {
    /**
     * TFW-MS1が磁石を検知しているとき真を返します。
     */
    //% blockId=MS1_magnetDetect block="磁石が近づいた"
    //% group="MS1"
    //% weight=100
    export function MS1_magnetDetect(): boolean {
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        if (pins.digitalReadPin(DigitalPin.P15) == 0) {
            return true;
        } else {
            return false;
        }
    }
}