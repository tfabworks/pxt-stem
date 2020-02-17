namespace stem {

    /**
     * TFW-RK2の人感センサーが反応しているとき真を返します。
     */
    //% blockId=human_detection block="Is Human moving"
    //% group="RK2"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * micro:bit本体の明るさセンサーが暗い場合（20未満）、かつ TFW-RK2の人感センサーが反応しているとき真を返します。
     */
    //% blockId=is_human_detection_and_dark
    //% block="Is Dark and Human Moving"
    //% group="RK2"
    export function isHumanDetectionAndDark(): boolean {
        if (humanDetection() && isDark()) {
            return true;
        }
        return false;
    }

    /**
     * TFW-RK2, TFW-SW2, TFW-SW1 のスイッチをONします。
     */
    //% blockId=turn_on block="Switch Turn ON"
    //% group="RK2, SW2, SW1"
    export function turnON(): void {
        if (pins.analogReadPin(AnalogPin.P1) < 25) {
            pins.digitalWritePin(DigitalPin.P1, 1);
        }
        else {
            pins.digitalWritePin(DigitalPin.P0, 1)
        }
    }

    /**
     * TFW-RK2, TFW-SW2, TFW-SW1 のスイッチをOFFします。
     */
    //% blockId=turn_off block="Switch Turn OFF"
    //% group="RK2, SW2, SW1"
    export function turnOFF(): void {
        if (pins.analogReadPin(AnalogPin.P1) < 25) {
            pins.digitalWritePin(DigitalPin.P1, 0);
        }
        else {
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
    }

    /**
     * TFW-SW1で出力をコントロールします。
     * @param duty set the duty-ratio, eg: 100
     */
    //% blockId=sw1_out
    //% block="Output %duty\\%"
    //% duty.min=0 duty.max=100
    //% group="SW1"
    export function sw1_out(duty: number): void {
        pins.analogWritePin(AnalogPin.P0, (duty / 100 * 1023));
    }
}
