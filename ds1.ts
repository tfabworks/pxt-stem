namespace stem {
    /**
     * TFW-DS1で距離[cm]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=uds
    //% block="Distance[cm] || %format"
    //% group="DS1"
    export function getDistance(format:OutputNumberFormat = OutputNumberFormat.INTEGER):number {
        pins.digitalWritePin(DigitalPin.P0, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P0, 1);
        control.waitMicros(20);
        pins.digitalWritePin(DigitalPin.P0, 0);
        if ( format === OutputNumberFormat.INTEGER ){
            return Math.round(pins.pulseIn(DigitalPin.P1, PulseValue.High) * 153 / 29 / 2 / 100);
        }
        return pins.pulseIn(DigitalPin.P1, PulseValue.High) * 153 / 29 / 2 / 100;
    }
}
