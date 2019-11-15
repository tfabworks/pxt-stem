namespace stem {
    /**
     * TFW-RK2の人感センサーが反応しているとき真を返します。
     */
    //% blockId=human_detection block="Human is moving"
    //% group="RK2"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * TFW-RK2, TFW-SW2のスイッチをONします。
     */
    //% blockId=turn_on block="Switch Turn ON"
    //% group="RK2, SW2"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P1, 1);
    }

    /**
     * TFW-RK2, TFW-SW2のスイッチをOFFします。
     */
    //% blockId=turn_off block="Switch Turn OFF"
    //% group="RK2, SW2"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P1, 0);
    }

}