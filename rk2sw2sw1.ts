namespace stem {

    /**
     * TFW-RK2の人感センサーが反応しているとき真を返します。
     */
    //% blockId=human_detection block="人が動いた"
    //% group="RK2"
    //% weight=100
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
        } else {
            return false;
        }
    }
	
   /**
     * micro:bit本体の明るさセンサーが、しきい値より暗い、かつ TFW-RK2などのボードの人感センサーが反応しているとき真を返します。
     * @param lightThreshold number of brightness - threshold, eg: 15
     */
    //% block="%lightThreshold|より暗いときに人が動いた"
    //% group="S-M1"
    //% blockId=isHumanDetectionAndDark
    //% lightThreshold.min=0 lightThreshold.max=255
    //% weight=95
    export function isHumanDetectionAndDark(lightThreshold:number): boolean {
        if (humanDetection() && brightnessDetermination(lightThreshold, DarkOrBrightSpecified_s.IS_DARK ) ) {
            return true;
        }
        return false;
    }
	
    /**
     * micro:bit本体の明るさセンサーが暗い場合（20未満）、かつ TFW-RK2などのボードの人感センサーが反応しているとき真を返します。
     */
    //% blockId=is_human_detection_and_dark
    //% block="暗いときに人が動いた"
    //% group="RK2"
    //% weight=90
    export function isHumanDetectionAndDark(): boolean {
        if (humanDetection() && isDark()) {
            return true;
        }
        return false;
    }



    /**
     * TFW-RK2, TFW-SW2, TFW-SW1 のスイッチをONします。
     */
    //% blockId=turn_on block="Switch Turn ON"
    //% group="RK2, SW2, SW1"
    //% weight=80
	//% block="制御スイッチON"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P1, 1);
        pins.digitalWritePin(DigitalPin.P0, 1)
    }

    /**
     * TFW-RK2, TFW-SW2, TFW-SW1 のスイッチをOFFします。
     */
    //% blockId=turn_off block="Switch Turn OFF"
    //% group="RK2, SW2, SW1"
    //% weight=70
    //% block="制御スイッチOFF"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    /**
     * TFW-SW1で出力をコントロールします。
     * @param duty set the duty-ratio, eg: 100
     */
    //% blockId=sw1_out
    //% block="出力を%duty|\\%にする"
    //% duty.min=0 duty.max=100
    //% group="SW1"
    //% weight=60
    export function sw1_out(duty: number): void {
        pins.analogWritePin(AnalogPin.P0, (duty / 100 * 1023));
    }
}
