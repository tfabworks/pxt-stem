namespace stem {
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
