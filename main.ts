//% weight=70 icon="\uf0c3" color=#008000 block="STEM"
namespace stem {

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

    const ビットパターン_ON  = [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
    const ビットパターン_OFF = [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]
    const 繰り返し回数 = 30
    const 輸送波パルス幅 = 600
    const 輸送波周期 = 26

    function 輸送波送信ポート設定() {
        pins.analogWritePin(AnalogPin.P0, 輸送波パルス幅)
        pins.analogSetPeriod(AnalogPin.P0, 輸送波周期)
    }

    //% blockId=ir_on
    //% block="赤外線ON"
    export function ir_on() {
        輸送波送信ポート設定()

        for (let 送信回数 = 0; 送信回数 < 繰り返し回数; 送信回数++) {
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[0])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[1])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[2])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[3])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[4])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[5])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[6])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[7])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[8])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[9])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[10])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[11])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[12])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[13])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[14])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[15])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[16])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[17])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[18])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[19])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[20])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[21])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[22])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[23])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[24])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[25])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[26])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[27])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[28])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[29])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[30])
            control.waitMicros(760)
        }
    }

    //% blockId=ir_off
    //% block="赤外線OFF"
    export function ir_off() {
        輸送波送信ポート設定()

        for (let 送信回数 = 0; 送信回数 < 繰り返し回数; 送信回数++) {
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_ON[0])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[1])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[2])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[3])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[4])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[5])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[6])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[7])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[8])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[9])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[10])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[11])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[12])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[13])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[14])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[15])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[16])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[17])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[18])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[19])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[20])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[21])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[22])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[23])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[24])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[25])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[26])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[27])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[28])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[29])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P1, ビットパターン_OFF[30])
            control.waitMicros(760)
        }
    }

    //% blockId=uds block="距離"
    export function get_distance() {
      pins.digitalWritePin(DigitalPin.P0, 0)
      control.waitMicros(2)
      pins.digitalWritePin(DigitalPin.P0, 1)
      control.waitMicros(20)
      pins.digitalWritePin(DigitalPin.P0, 0)
      return pins.pulseIn(DigitalPin.P1, PulseValue.High) * 153 / 29 / 2 / 100
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
}