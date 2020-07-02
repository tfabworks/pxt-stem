namespace stem {
    let EN1_init_done: boolean = false;

    /**
     * TFW-EN1で温度[℃]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_temperature block="Temperature[degC] (EN1) || %format"
    //% group="EN1"
    //% weight=100
    export function getTemperature(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat.INTEGER) {
            return Math.round(BME280_I2C.Temperature());
        }
        return BME280_I2C.Temperature();
    }

    /**
     * TFW-EN1で湿度[%]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_humidity block="Humidity[\\%] || %format"
    //% group="EN1"
    //% weight=90
    export function getHumidity(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat.INTEGER) {
            return Math.round(BME280_I2C.Humidity());
        }
        return BME280_I2C.Humidity();
    }

    /**
     * TFW-EN1で気圧[hPa]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_pressure block="Pressure[hPa] || %format"
    //% group="EN1"
    //% weight=80
    export function getPressure(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat.INTEGER) {
            return Math.round(BME280_I2C.Pressure());
        }
        return BME280_I2C.Pressure();
    }

    /**
     * TFW-EN1で基準面の気圧との差から高度差[m]を計算します。
     * @param referencePressure 基準面の気圧[hPa], eg: 1013
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_altitude block="Altitude[m] Pressure at reference level%referencePressure| || %format"
    //% group="EN1"
    //% weight=70
    export function getAltitude(referencePressure: number = 1013, format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat.INTEGER) {
            return Math.round(calcHeight(referencePressure, BME280_I2C.Pressure(), BME280_I2C.Temperature()));
        }
        return calcHeight(referencePressure, BME280_I2C.Pressure(), BME280_I2C.Temperature());
    }

    function calcHeight(P0: number, P: number, T: number) {
        let calcHeight_n = 0
        let calcHeight_xa = 0
        let calcHeight_fn = 0
        let calcHeight_kn = 0
        let calcHeight_a = 0
        let calcHeight_x = 0
        let calcHeight_Result = 0
        calcHeight_x = P0 / P
        calcHeight_a = 1 / 5.257
        calcHeight_kn = calcHeight_a
        calcHeight_fn = 1
        calcHeight_xa = 1
        for (let calcHeight_index = 0; calcHeight_index <= 4; calcHeight_index++) {
            calcHeight_n = calcHeight_index + 1
            calcHeight_xa = calcHeight_xa + calcHeight_kn * (calcHeight_x - 1) ** calcHeight_n / calcHeight_fn
            calcHeight_kn = calcHeight_kn * (calcHeight_a - calcHeight_n)
            calcHeight_fn = calcHeight_fn * (calcHeight_n + 1)
        }
        calcHeight_Result = (calcHeight_xa - 1) * (T + 273.15) / 0.0065;
        return calcHeight_Result;
    }
    
    function EN1_init_if_firsttime(): void {
        if (EN1_init_done == false) {
            BME280_I2C.Init(BME280_I2C_ADDRESS.e_0x76);
            EN1_init_done = true;
        }
    }
}

enum BME280_I2C_ADDRESS {
    e_0x76 = 0x76
};

enum BME280_I2C_SENSOR_MODE {
    e_SLEEP = 0x00,
    e_NORMAL = 0x03
};

enum BME280_I2C_SAMPLING_MODE {
    e_SKIP = 0x00,
    e_1X = 0x01,
    e_2X = 0x02,
    e_4X = 0x03,
    e_8X = 0x04,
    e_16X = 0x05
};

enum BME280_I2C_STANDBY_DURATION {
    e_1_MS = 0x01,
    e_10_MS = 0x06,
    e_20_MS = 0x07,
    e_62_5_MS = 0x01,
    e_125_MS = 0x02,
    e_250_MS = 0x03,
    e_500_MS = 0x04,
    e_1000_MS = 0x05
};

enum BME280_I2C_IIR_FILTER_COEFFICIENT {
    e_OFF = 0x00,
    e_2 = 0x01,
    e_4 = 0x02,
    e_8 = 0x03,
    e_16 = 0x04
};

namespace BME280_I2C {
    let I2CAddr = BME280_I2C_ADDRESS.e_0x76;

    function I2CWriteByte(register: number, data: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = register;
        buf[1] = data;
        pins.i2cWriteBuffer(I2CAddr, buf, false);
    }

    function I2CRead(adress: number, len: number): Buffer {
        pins.i2cWriteNumber(I2CAddr, adress, NumberFormat.UInt8BE, true);
        return pins.i2cReadBuffer(I2CAddr, len, false);
    }

    function I2CReadUint8(adress: number): number {
        pins.i2cWriteNumber(I2CAddr, adress, NumberFormat.UInt8BE, true);
        let buf = pins.i2cReadBuffer(I2CAddr, 1, false);
        return (buf.getNumber(NumberFormat.UInt8BE, 0));
    }

    let currentMode: BME280_I2C_SENSOR_MODE = BME280_I2C_SENSOR_MODE.e_SLEEP;
    let lastSensorDataTime: number = 0;

    let dig_T1: number = 0;
    let dig_T2: number = 0;
    let dig_T3: number = 0;
    let dig_P1: number = 0;
    let dig_P2: number = 0;
    let dig_P3: number = 0;
    let dig_P4: number = 0;
    let dig_P5: number = 0;
    let dig_P6: number = 0;
    let dig_P7: number = 0;
    let dig_P8: number = 0;
    let dig_P9: number = 0;

    let dig_H1: number = 0;
    let dig_H2: number = 0;
    let dig_H3: number = 0;
    let dig_H4: number = 0;
    let dig_H5: number = 0;
    let dig_H6: number = 0;

    interface Settings {
        osr_p: number;
        osr_t: number;
        osr_h: number;
        filter: number;
        standby_time: number;
    }

    let currentSettings: Settings = { osr_p: 0, osr_t: 0, osr_h: 0, filter: 0, standby_time: 0 };
    let currentSettingsIsChanged: boolean = false;

    interface MesurementData {
        pressure: number;
        temperature: number;
        humidity: number;
    };
    let currentUncompensatedData: MesurementData = { pressure: 0, temperature: 0, humidity: 0 };
    let currentCompensatedData: MesurementData = { pressure: 0, temperature: 0, humidity: 0 };
    let current_t_fine: number = 0;

    function GetCalibrationData(): void {
        let BME280_TEMP_PRESS_CALIB_DATA_ADDR = 0x88;
        let BME280_TEMP_PRESS_CALIB_DATA_LEN = 26;

        let BME280_HUMIDITY_CALIB_DATA_ADDR: number = 0xE1;
        let BME280_HUMIDITY_CALIB_DATA_LEN: number = 7;

        let buf = I2CRead(BME280_TEMP_PRESS_CALIB_DATA_ADDR, BME280_TEMP_PRESS_CALIB_DATA_LEN);

        dig_T1 = buf.getNumber(NumberFormat.UInt16LE, 0);
        dig_T2 = buf.getNumber(NumberFormat.Int16LE, 2);
        dig_T3 = buf.getNumber(NumberFormat.Int16LE, 4);

        dig_P1 = buf.getNumber(NumberFormat.UInt16LE, 6);
        dig_P2 = buf.getNumber(NumberFormat.Int16LE, 8);
        dig_P3 = buf.getNumber(NumberFormat.Int16LE, 10);
        dig_P4 = buf.getNumber(NumberFormat.Int16LE, 12);
        dig_P5 = buf.getNumber(NumberFormat.Int16LE, 14);
        dig_P6 = buf.getNumber(NumberFormat.Int16LE, 16);
        dig_P7 = buf.getNumber(NumberFormat.Int16LE, 18);
        dig_P8 = buf.getNumber(NumberFormat.Int16LE, 20);
        dig_P9 = buf.getNumber(NumberFormat.Int16LE, 22);

        dig_H1 = buf.getNumber(NumberFormat.UInt8BE, 25);

        buf = I2CRead(BME280_HUMIDITY_CALIB_DATA_ADDR, BME280_HUMIDITY_CALIB_DATA_LEN);

        dig_H2 = buf.getNumber(NumberFormat.Int16LE, 0);
        dig_H3 = buf.getNumber(NumberFormat.UInt8BE, 2);

        let E4 = buf.getNumber(NumberFormat.Int8BE, 3);
        let E5 = buf.getNumber(NumberFormat.UInt8BE, 4);
        let E6 = buf.getNumber(NumberFormat.Int8BE, 5);
        dig_H4 = E4 << 4 | (E5 & 0x0F)
        dig_H5 = E6 << 4 | (E5 >> 4)

        dig_H6 = buf.getNumber(NumberFormat.Int8BE, 6);
    }

    function SoftReset(): void {
        let BME280_RESET_ADDR = 0xE0;
        let soft_rst_cmd = 0xB6;
        I2CWriteByte(BME280_RESET_ADDR, soft_rst_cmd);
        currentMode = BME280_I2C_SENSOR_MODE.e_SLEEP;
        basic.pause(3);
    }

    function ReadSettings(): Settings {
        let BME280_CTRL_HUM_ADDR = 0xF2;
        let ret: Settings = { osr_p: 0, osr_t: 0, osr_h: 0, filter: 0, standby_time: 0 };

        let buf = I2CRead(BME280_CTRL_HUM_ADDR, 4);

        let F2 = buf.getNumber(NumberFormat.UInt8BE, 0);
        let F4 = buf.getNumber(NumberFormat.UInt8BE, 2);
        let F5 = buf.getNumber(NumberFormat.UInt8BE, 3);

        ret.osr_h = F2 & 0x07;
        ret.osr_p = (F4 & 0x1C) >> 2;
        ret.osr_t = (F4 & 0xE0) >> 5;
        ret.filter = (F5 & 0x1C) >> 2;
        ret.standby_time = (F5 & 0xE0) >> 5;
        return ret;
    }

    function WriteSettings(settings: Settings): void {
        let BME280_CTRL_HUM_ADDR = 0xF2;
        let BME280_CTRL_MEAS_ADDR = 0xF4;
        let BME280_CONFIG_ADDR = 0xF5;

        let buf = I2CRead(BME280_CTRL_HUM_ADDR, 4);

        let F2 = buf.getNumber(NumberFormat.UInt8BE, 0);
        let F4 = buf.getNumber(NumberFormat.UInt8BE, 2);
        let F5 = buf.getNumber(NumberFormat.UInt8BE, 3);

        F2 = (F2 & 0xF8) | (settings.osr_h & 0x07);
        F4 = (F4 & 0xE3) | ((settings.osr_p << 2) & 0x1C);
        F4 = (F4 & 0x1F) | ((settings.osr_t << 5) & 0xE0);
        F5 = (F5 & 0xE3) | ((settings.filter << 2) & 0x1C);
        F5 = (F5 & 0x1F) | ((settings.standby_time << 5) & 0xE0);

        I2CWriteByte(BME280_CTRL_HUM_ADDR, F2);
        I2CWriteByte(BME280_CTRL_MEAS_ADDR, F4);
        I2CWriteByte(BME280_CONFIG_ADDR, F5);
    }

    function compensate_temperature(): void {
        let var1: number;
        let var2: number;
        let temperature: number;
        let temperature_min: number = -4000;
        let temperature_max: number = 8500;

        var1 = (currentUncompensatedData.temperature / 8) - (dig_T1 * 2);
        var1 = (var1 * dig_T2) / 2048;
        var2 = (currentUncompensatedData.temperature / 16) - dig_T1;
        var2 = (((var2 * var2) / 4096) * dig_T3) / 16384;

        current_t_fine = var1 + var2;
        temperature = ((current_t_fine) * 5 + 128) / 256.0;

        if (temperature < temperature_min) {
            temperature = temperature_min;
        }
        else if (temperature > temperature_max) {
            temperature = temperature_max;
        }
        currentCompensatedData.temperature = temperature;
    }

    function compensate_pressure(): void {
        let var1: number;
        let var2: number;
        let var3: number;
        let var4: number;
        let var5: number;
        let pressure: number;
        let pressure_min: number = 30000;
        let pressure_max: number = 110000;

        var1 = (current_t_fine / 2) - 64000;
        var2 = (((var1 / 4) * (var1 / 4)) / 2048) * dig_P6;
        var2 = var2 + ((var1 * dig_P5) * 2);
        var2 = (var2 / 4) + (dig_P4 * 65536);
        var3 = (dig_P3 * (((var1 / 4) * (var1 / 4)) / 8192)) / 8;
        var4 = (dig_P2 * var1) / 2;
        var1 = (var3 + var4) / 262144;
        var1 = ((32768 + var1) * dig_P1) / 32768;

        // avoid zero div.
        if (var1 != 0) {
            var5 = 1048576 - currentUncompensatedData.pressure;
            pressure = (var5 - (var2 / 4096));

            if (pressure > 85343) {
                pressure = ((pressure * 3125) / var1) * 2;
            }
            else {
                pressure = ((pressure * 3125) << 1) / var1;
            }

            var1 = (dig_P9 * (((pressure / 8) * (pressure / 8)) / 8192)) / 4096;
            var2 = ((pressure / 4) * dig_P8) / 8192;
            pressure = pressure + (var1 + var2 + dig_P7) / 16.0;

            if (pressure < pressure_min) {
                pressure = pressure_min;
            }
            else if (pressure > pressure_max) {
                pressure = pressure_max;
            }
        } else {
            pressure = pressure_min;
        }

        currentCompensatedData.pressure = pressure;
    }

    function compensate_humidity(): void {
        let var1: number;
        let var2: number;
        let var3: number;
        let var4: number;
        let var5: number;
        let var6: number;
        let humidity: number;

        var1 = current_t_fine - 76800;
        var2 = currentUncompensatedData.humidity * 16384;
        var3 = dig_H4 * 1048576;
        var4 = dig_H5 * var1;
        var5 = (((var2 - var3) - var4) + 16384) / 32768;
        var2 = (var1 * dig_H6) / 1024;
        var3 = (var1 * dig_H3) / 2048;
        var4 = ((var2 * (var3 + 32768)) / 1024) + 2097152;
        var2 = ((var4 * dig_H2) + 8192) / 16384;
        var3 = var5 * var2;
        var4 = ((var3 / 32768) * (var3 / 32768)) / 128;
        var5 = var3 - ((var4 * dig_H1) / 16);
        var5 = Math.max(var5, 0);
        var5 = Math.min(var5, 419430400);
        humidity = var5 / 4096.0;

        currentCompensatedData.humidity = humidity;
    }

    function UpdateCompensatedData(): void {
        compensate_temperature();
        compensate_pressure();
        compensate_humidity();
    }

    function IsUpdateNeeded(): boolean {
        if (currentMode != BME280_I2C_SENSOR_MODE.e_NORMAL) {
            return false;
        }

        let currentTime = input.runningTime();
        if (lastSensorDataTime == 0 ||
            lastSensorDataTime > currentTime) {
            return true;
        }

        let ETA: number = 10;
        switch (currentSettings.standby_time) {
            case BME280_I2C_STANDBY_DURATION.e_1_MS:
                ETA += 1;
                break;
            case BME280_I2C_STANDBY_DURATION.e_10_MS:
                ETA += 10;
                break;
            case BME280_I2C_STANDBY_DURATION.e_20_MS:
                ETA += 20
                break;
            case BME280_I2C_STANDBY_DURATION.e_62_5_MS:
                ETA += 62;
                break;
            case BME280_I2C_STANDBY_DURATION.e_125_MS:
                ETA += 125;
                break;
            case BME280_I2C_STANDBY_DURATION.e_250_MS:
                ETA += 250;
                break;
            case BME280_I2C_STANDBY_DURATION.e_500_MS:
                ETA += 250;
                break;
            case BME280_I2C_STANDBY_DURATION.e_1000_MS:
                ETA += 1000;
                break;
            default:
                break;
        }

        if (lastSensorDataTime + ETA < currentTime) {
            return true;
        }

        return false;
    }

    function ReadSensorData(): void {
        let BME280_DATA_ADDR = 0xF7;
        let BME280_P_T_H_DATA_LEN = 8;

        let buf = I2CRead(BME280_DATA_ADDR, BME280_P_T_H_DATA_LEN);

        let data_xlsb: number;
        let data_lsb: number;
        let data_msb: number;

        data_msb = buf.getNumber(NumberFormat.UInt8BE, 0) << 12;
        data_lsb = buf.getNumber(NumberFormat.UInt8BE, 1) << 4;
        data_xlsb = buf.getNumber(NumberFormat.UInt8BE, 2) >> 4;
        currentUncompensatedData.pressure = data_msb | data_lsb | data_xlsb;

        data_msb = buf.getNumber(NumberFormat.UInt8BE, 3) << 12;
        data_lsb = buf.getNumber(NumberFormat.UInt8BE, 4) << 4;
        data_xlsb = buf.getNumber(NumberFormat.UInt8BE, 5) >> 4;
        currentUncompensatedData.temperature = data_msb | data_lsb | data_xlsb;

        data_lsb = buf.getNumber(NumberFormat.UInt8BE, 6) << 8;
        data_msb = buf.getNumber(NumberFormat.UInt8BE, 7);
        currentUncompensatedData.humidity = data_msb | data_lsb;

        UpdateCompensatedData();

        lastSensorDataTime = input.runningTime();
    }

    function PutDeviceToSleep(): void {
        SoftReset();
        WriteSettings(currentSettings);
        currentSettingsIsChanged = true;
    }

    function SetSamplingMode(
        t: BME280_I2C_SAMPLING_MODE = BME280_I2C_SAMPLING_MODE.e_2X,
        p: BME280_I2C_SAMPLING_MODE = BME280_I2C_SAMPLING_MODE.e_16X,
        h: BME280_I2C_SAMPLING_MODE = BME280_I2C_SAMPLING_MODE.e_1X): void {

        currentSettings.osr_t = t;
        currentSettings.osr_p = p;
        currentSettings.osr_h = h;
        currentSettingsIsChanged = true;
    }

    function SetStandbyDuration(sb: BME280_I2C_STANDBY_DURATION = BME280_I2C_STANDBY_DURATION.e_500_MS): void {
        currentSettings.standby_time = sb;
        currentSettingsIsChanged = true;
    }

    function SetIIRFilterCoefficient(coef: BME280_I2C_IIR_FILTER_COEFFICIENT = BME280_I2C_IIR_FILTER_COEFFICIENT.e_16): void {
        currentSettings.filter = coef;
        currentSettingsIsChanged = true;
    }

    function UpdateSettings(): void {
        if (currentSettingsIsChanged) {
            WriteSettings(currentSettings);
            currentSettingsIsChanged = false;
            lastSensorDataTime = 0;
        }
    }

    function SetSensorMode(mode: BME280_I2C_SENSOR_MODE = BME280_I2C_SENSOR_MODE.e_NORMAL): void {
        let BME280_PWR_CTRL_ADDR = 0xF4;

        // update osr, IIR filter, standby duration settings if those are changed.
        UpdateSettings();

        let currentReg = I2CReadUint8(BME280_PWR_CTRL_ADDR);

        if ((currentReg & 0x03) != BME280_I2C_SENSOR_MODE.e_SLEEP) {
            PutDeviceToSleep();
        }
        if (mode != BME280_I2C_SENSOR_MODE.e_SLEEP) {
            currentReg = currentReg & 0xFC | mode;
            I2CWriteByte(BME280_PWR_CTRL_ADDR, currentReg);
            currentMode = mode;
            lastSensorDataTime = 0;
        }
    }

    export function Init(
        i2cAddr: BME280_I2C_ADDRESS = BME280_I2C_ADDRESS.e_0x76): void {
        let BME280_CHIP_ID = 0x60;
        let BME280_CHIP_ID_ADDR = 0xD0;

        I2CAddr = i2cAddr;

        currentMode = BME280_I2C_SENSOR_MODE.e_SLEEP;

        let try_count = 5;

        while (try_count > 0) {
            let chip_id = I2CReadUint8(BME280_CHIP_ID_ADDR);

            if (chip_id != BME280_CHIP_ID) {
                basic.pause(10);
                --try_count;
                continue;
            }

            // reset the sensor once
            SoftReset();

            // read calibration regs.
            GetCalibrationData();

            // read current setting params.
            currentSettings = ReadSettings();
            currentSettingsIsChanged = false;

            SetSamplingMode();
            SetStandbyDuration(BME280_I2C_STANDBY_DURATION.e_1_MS);
            SetIIRFilterCoefficient();
            UpdateSettings();
            SetSensorMode();

            break;
        };
        basic.pause(100);
    };

    export function Temperature(): number {
        if (IsUpdateNeeded()) {
            ReadSensorData();
        }
        return (currentCompensatedData.temperature) / 100.0;
    }

    export function Pressure(): number {
        if (IsUpdateNeeded()) {
            ReadSensorData();
        }
        return (currentCompensatedData.pressure) / 100.0;
    }

    export function Humidity(): number {
        if (IsUpdateNeeded()) {
            ReadSensorData();
        }
        return (currentCompensatedData.humidity) / 1024.0;
    }
}

