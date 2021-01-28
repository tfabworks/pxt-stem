namespace stem {
    /**
     * TFW-TP2の温度[℃]を返します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId = TP2_getTemperature
    //% block="Temperature[degC] (TP2) || %format"
    //% group="TP2"
    //% weight=100
    export function TP2_getTemperature(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
        if (format === OutputNumberFormat.INTEGER) {
            return Math.round(DS18B20.Temperature()/100.0);
        }
        return DS18B20.Temperature()/100.0;
    }
}
