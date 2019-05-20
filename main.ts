//% weight=70 icon="\uf0c3" color=#008000 block="STEM"
namespace stem {

    //% blockId=read_temperature block="温度"
    export function readTemperature(): number {
        return calcTemperature(pins.analogReadPin(AnalogPin.P0))
    }

    // calc temperature read from TFW-TP1; TFabWorks Temperature Sensor
    function calcTemperature(rawVal: number): number {
        let temp = 0
        let T0 = 0
        let R = 0
        let R0 = 0
        let volt = 0
        let B = 0
        B = 3380.0
        R0 = 10000.0
        T0 = 25 + 273.15
        volt = rawVal / 1024 * 3
        R = (0 - (10000 * volt - 30000)) / volt
        temp = B * T0 / (Math.log(R / R0) * T0 + B)
        // temp = (- 0.05140683 * R ^ 3 - 0.28713975 * R ^ 2 +
        // 40.64780 * R + 143.3983) / (9.579041e-4 * R ^ 3 +
        // 0.08219358 * R ^ 2 + 0.8617257 * R + 1)
        return Math.round(temp - 273.15)
    }

    //% blockId=human_detection block="人が動いた"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1)
            return true;
        else
            return false;
    }

    //% blockId=turn_on block="スイッチON"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P1, 1)
    }

    //% blockId=turn_off block="スイッチOFF"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    //% blockId=is_dark block="暗い"
    export function isDark(): boolean {
        if (input.lightLevel() < 30)
            return true;
        else
            return false;
    }
}