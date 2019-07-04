namespace stem {
    //% blockId=uds block="距離"
    export function getDistance() {
      pins.digitalWritePin(DigitalPin.P0, 0)
      control.waitMicros(2)
      pins.digitalWritePin(DigitalPin.P0, 1)
      control.waitMicros(20)
      pins.digitalWritePin(DigitalPin.P0, 0)
      return pins.pulseIn(DigitalPin.P1, PulseValue.High) * 153 / 29 / 2 / 100
    }
}
