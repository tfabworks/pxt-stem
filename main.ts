//% weight=70 icon="\uf0e7" color=#d2691e block="STEM"
namespace stem {
    //% blockId=magnet_switch block="磁気センサ"
    export function readMagnetSwitchStatus(): boolean {
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            return true;
        } else {
            return false;
        }
    }

    //% blockId=read_temperature block="温度"
    export function readTemperature(): number {
        return calcTemperature(pins.analogReadPin(AnalogPin.P0))
    }

    // calc temperature read from TFW-TP1; TFabWorks Temperature Sensor
    function calcTemperature(rawVal: number): number {
        const B = 3380.001
        const R0 = 10000.001
        const T0 = 25 + 273.15
        const volt = rawVal / 1024 * 3
        const R = (0 - (10000 * volt - 30000)) / volt
        const temp = B * T0 / (Math.log(R / R0) * T0 + B)
        // temp = (- 0.05140683 * R ^ 3 - 0.28713975 * R ^ 2 +
        // 40.64780 * R + 143.3983) / (9.579041e-4 * R ^ 3 +
        // 0.08219358 * R ^ 2 + 0.8617257 * R + 1)
        return Math.round(temp - 273.15)
    }
}