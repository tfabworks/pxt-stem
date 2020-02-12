enum KR1_SERVO_PORT {
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

namespace stem {

    const _minAngle: number = 0;
    const _maxAngle: number = 180;
    const _stopOnNeutral: boolean = false;

    function clampDegrees(degrees: number): number {
        degrees = degrees | 0;
        degrees = Math.clamp(_minAngle, _maxAngle, degrees);
        return degrees;
    }

    /**
     * サーボモーターを指定角度へ動かします。音楽のブロックと同時に使用できます
     */
    // blockId=kr1servoSetangle block="set %KR1_SERVO_PORT angle to %degrees=protractorPicker °"
    //% blockId=kr1servoSetangle
    //% block="サーボ %KR1_SERVO_PORT 角度 %degrees=protractorPicker °"
    //% group="KR1"
    export function setAngle(port: KR1_SERVO_PORT, degrees: number): void {
        degrees = clampDegrees(degrees);
        let usec = (500000 + (2000 * (degrees * 1000 / 180))) / 1000;
        setPulseWidth(port, usec);
        return;
    }

    /**
     * 指定の幅（マイクロ秒）のサーボ信号を出力します。音楽のブロックと同時に使用できます
     * @param usec the width of the pulse in microseconds
     */
    //% blockId=kr1servoSetPulseWidth
    // block="set %KR1_SERVO_PORT pulse width %usec=protractorPicker °"
    //% block="サーボ %KR1_SERVO_PORT パルス幅 %usec|マイクロ秒"
    //% usec.min=500 usec.max=2500
    //% usec.defl=1500
    //% group="KR1"
    export function setPulseWidth(port: KR1_SERVO_PORT, usec: number): void {
        if (port == KR1_SERVO_PORT.P1) {
            set_pulse_width_p1(usec);
            return;
        }

        if (port == KR1_SERVO_PORT.P2) {
            set_pulse_width_p2(usec);
            return;
        }
        return;
    }

    /**
     * 360°連続回転サーボモーターを指定の回転速度で回転させます（-100%～100%）。音楽のブロックと同時に使用できます
     * @param speed the throttle of the motor from -100% to 100%
     */
    //% blockId=kr1servoRun block="連続回転サーボ %port 回転速度 %speed=speedPicker \\%"
    //% group="KR1"
    export function run(port: KR1_SERVO_PORT, speed: number): void {
        const degrees = clampDegrees(Math.map(speed, -100, 100, _minAngle, _maxAngle));
        const neutral = (_maxAngle - _minAngle) / 2;
        if (_stopOnNeutral && degrees == neutral) {
            stop(port);
        }
        else {
            setAngle(port, degrees);
        }
    }

    /**
     * 回転を停止させます。保持力は維持されません
     */
    //  blockId=kr1servoStop block="stop %port"
    //% blockId=kr1servoStop block="連続回転サーボ %port 止める"
    //% group="KR1"
    export function stop(port: KR1_SERVO_PORT): void {
        if (port == KR1_SERVO_PORT.P1) {
            stop_p1();
            return;
        }
        if (port == KR1_SERVO_PORT.P2) {
            stop_p2();
            return;
        }
    }

    //% shim=stem::set_pulse_width_p1
    function set_pulse_width_p1(degrees: number): void {
        return;
    }

    //% shim=stem::set_pulse_width_p2
    function set_pulse_width_p2(degrees: number): void {
        return;
    }

    //% shim=stem::stop_p1
    function stop_p1(): void {
        return;
    }

    //% shim=stem::stop_p2
    function stop_p2(): void {
        return;
    }

}
