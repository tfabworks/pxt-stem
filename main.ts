//% weight=70 icon="\uf0e7" color=#d2691e block="STEM"
namespace stem {
    //% blockId=magnet_switch block="磁気を検知"
    export function readMagnetSwitchStatus(): boolean {
        pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
        if (pins.digitalReadPin(DigitalPin.P0)) {
            return false;
        } else {
            return true;
        }
    }

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
        B = 3380.001
        R0 = 10000.001
        T0 = 25 + 273.15
        volt = rawVal / 1024 * 3
        R = (0 - (10000 * volt - 30000)) / volt
        temp = B * T0 / (Math.log(R / R0) * T0 + B)
        // temp = (- 0.05140683 * R ^ 3 - 0.28713975 * R ^ 2 +
        // 40.64780 * R + 143.3983) / (9.579041e-4 * R ^ 3 +
        // 0.08219358 * R ^ 2 + 0.8617257 * R + 1)
        return Math.round(temp - 273.15)
    }
}