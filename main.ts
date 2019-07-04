//% weight=70 icon="\uf0c3" color=#008000 block="STEM"
namespace stem {
    let _今まで暗い: boolean = false;
    const _暗い判定閾値: number = 8;
    const _明るい判定閾値: number = 15;
    const _HYSTERESIS: number = _明るい判定閾値 - _暗い判定閾値;

    /* 人が動いたブロック */
    //% blockId=human_detection block="人が動いた"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
        } else {
            return false;
        }
    }

    /* スイッチONブロック */
    //% blockId=turn_on block="スイッチON"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P1, 1);
    }

    /* スイッチOFFブロック */
    //% blockId=turn_off block="スイッチOFF"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P1, 0);
    }

    /* 暗いブロック */
    //% blockId=is_dark block="暗い"
    export function isDark(): boolean {
        return _isDark(_暗い判定閾値, _明るい判定閾値);

    }

    /* 明るさの平均を取る */
    function _lightLevelSampling(): number {
        const CYCLE_SAMPLE_NUM: number = 50
        let accum明るさ: number = 0;
        for (let i = 0; i < CYCLE_SAMPLE_NUM; i++) {
            accum明るさ += input.lightLevel();
            basic.pause(1);
        }
        let 明るさ = accum明るさ / CYCLE_SAMPLE_NUM;
        return 明るさ;
    }

    /* 暗い判定本体 */
    function _isDark(暗い判定閾値: number, 明るい判定閾値: number): boolean {
        if (   (暗い判定閾値 > 明るい判定閾値)
            || (暗い判定閾値 < 0)
            || (暗い判定閾値 > 255)
            || (明るい判定閾値 < 0)
            || (明るい判定閾値 > 255)) {
            control.assert(false, "threshold is abnormal");
        }

        let 現在の明るさ = _lightLevelSampling();

        const 暗い: boolean = true;
        const 明るい: boolean = false;

        if (_今まで暗い) { //現在まで暗い環境だったとき。明るいかを判定
            if (現在の明るさ > 明るい判定閾値) {
                _今まで暗い = 明るい;
                return 明るい; //現在は明るい
            }
            else {
                _今まで暗い = 暗い;
                return 暗い; //現在は暗い
            }
        }
        else { // 現在まで明るい環境だったとき。暗いかを判定
            if (現在の明るさ < 暗い判定閾値) {
                _今まで暗い = 暗い;
                return 暗い; //現在は暗い
            }
            else {
                _今まで暗い = 明るい;
                return 明るい; //現在は明るい
            }
        }
        control.assert(false);
    }

    /**
     * 暗さ閾値を指定して設定
     * @param lightThreshold number of brightness-threshold, eg: 15
     */
    //% blockId=brightness_determination block="%lightThreshold より %settingDarkOrBright"
    //% lightThreshold.min=0 lightThreshold.max=255
    export function brightnessDetermination(lightThreshold: number, settingDarkOrBright: DarkOrBrightSpecified): boolean {
        if (_HYSTERESIS < 0) { control.assert(false); }
        if (lightThreshold < 0) {
            lightThreshold = 0;
        }
        if (lightThreshold > 255) {
            lightThreshold = 255;
        }

        if (settingDarkOrBright === DarkOrBrightSpecified.IS_DARK) {
            let 暗い判定閾値: number = lightThreshold;
            let 明るい判定閾値: number = lightThreshold + _HYSTERESIS;
            if (明るい判定閾値 > 255) { 明るい判定閾値 = 255; }
            return _isDark(暗い判定閾値, 明るい判定閾値);
        }
        else if (settingDarkOrBright === DarkOrBrightSpecified.IS_BRIGHT) {
            let 暗い判定閾値: number = lightThreshold - _HYSTERESIS;
            let 明るい判定閾値: number = lightThreshold;
            if (暗い判定閾値 < 0) { 暗い判定閾値 = 0; }
            return !_isDark(暗い判定閾値, 明るい判定閾値);
        }
        control.assert(false); return false;
    }
}
