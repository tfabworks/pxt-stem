//% weight=70 icon="\uf0c3" color=#008000 block="STEM"
namespace stem {
    let _今まで暗い: boolean = false;
    const _暗い判定閾値: number = 8;
    const _明るい判定閾値: number = 15;
    const _HYSTERESIS: number = _明るい判定閾値 - _暗い判定閾値;

    export let 暗さ判定閾値 = 31

    //% blockId=human_detection block="人が動いた"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1)
            return true;
        else
            return false;
    }

    //% blockId=is_dark block="暗い"
    export function isDark(): boolean {
        if ( input.lightLevel() < 暗さ判定閾値 )
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
}
