//% weight=70 icon="\uf0c3" color=#008000 block="STEM"
namespace stem {
    export let lightThreshold = 20

    //% blockId=human_detection block="人が動いた"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1)
            return true;
        else
            return false;
    }

    //% blockId=is_dark block="暗い"
    export function isDark(): boolean {
        if ( input.lightLevel() < lightThreshold )
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
    export function IR_ON() {
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
    export function IR_OFF() {
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
    export function getDistance() {
      pins.digitalWritePin(DigitalPin.P0, 0)
      control.waitMicros(2)
      pins.digitalWritePin(DigitalPin.P0, 1)
      control.waitMicros(20)
      pins.digitalWritePin(DigitalPin.P0, 0)
      return pins.pulseIn(DigitalPin.P1, PulseValue.High) * 153 / 29 / 2 / 100
    }

    //% blockId=get_temperature block="温度"
    export function getTemperature(): number {
        return calcTemperature(pins.analogReadPin(AnalogPin.P0))
    }

    let B=0
    function calculate_B_constant(t: number) {
        const a = 0.01
        const b = -5.913
        const c = 4269.0267
        B = a * t ^ 2 + b * t + c;
        return B
    }

    // calc temperature read from TFW-TP1; TFabWorks Temperature Sensor
    function calcTemperature(rawVal: number): number {
        let T0 = 0
        let 反復回数 = 0
        let volt = 0
        let 温度 = 0
        let R0 = 0
        let R = 0
        let B2 = 0
    
        B2 = 3380.001
        R0 = 10000.001
        T0 = 25 + 273.15
        反復回数 = 5
    
        B2 = 3380.001
        volt = pins.analogReadPin(AnalogPin.P0) / 1024 * 3
        R = (0 - (10000 * volt - 30000)) / volt
        for (let i = 0; i < 反復回数; i++) {
            温度 = B2 * T0 / (Math.log(R / R0) * T0 + B2)
            B2 = calculate_B_constant(温度)
        }
        return 温度-273.15
    }

}
