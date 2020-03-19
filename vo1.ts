// "こんにちは"としゃべる
// RX P14, TX P13
namespace stem {
    let VO1_init_done = false;

    /**
     * VO1にローマ字を日本語で発声させます。エラーの場合はエラーコードを発声します。
     */
    //% blockId=vo1_send
    //% block=%command|としゃべる
    //% group="VO1"
    export function VO1_send (command: string) {
        VO1_init_if_firsttime();
        command = "" + command + '\r'
        while (VO1_checkBusy()) {
            ;
        }
        serial.writeString(command);
        basic.pause(100);
        let rcv:string = serial.readString();
        if (rcv == "E100>") {
            VO1_send("sono/ta'no+e'ra- /era-ko-/do+<NUM VAL=100>.")
        } else if (rcv == "E101>") {
            VO1_send("memori-'busokuno+e'ra- /era-ko-/do+<NUM VAL=101>.")
        } else if (rcv == "E105>") {
            VO1_send("yomika/ta/ga+wakarimasen /era-ko-/do+<NUM VAL=105>.")
        } else if (rcv == "E106>") {
            VO1_send("/era-ko-/do+<NUM VAL=106>.")
        } else if (rcv == "E107>") {
            VO1_send("/era-ko-/do+<NUM VAL=107>.")
        } else if (rcv == "E200>") {
            VO1_send("/naga'su'gi'masu+ /era-ko-/do+<NUM VAL=200>.")
        } else if (rcv == "E251>") {
            VO1_send("/era-ko-/do+<NUM VAL=251>.")
        } else if (rcv == "E254>") {
            VO1_send("/era-ko-/do+<NUM VAL=254>.")
        } else if (rcv == "E203>") {
            VO1_send("/era-ko-/do+<NUM VAL=203>.")
        }
        return;
    }

    function VO1_clearSerialBuffer () {
        while (serial.readString() != "") {
            
        }
    }

    function VO1_checkBusy(): boolean {
        VO1_clearSerialBuffer();
        serial.writeString("#V\r")
        basic.pause(100);
    
        //    if (serial.readBuffer(1).toString() == '*') {
        let rcv: string = serial.readString();
    
        //    if (serial.readString() == '*') {
        if (rcv.charAt(0) == '*') {
            return true;
        }
    
        VO1_clearSerialBuffer();
        return false;
    }

    function VO1_init() {
        serial.redirect(
            SerialPin.P13,
            SerialPin.P14,
            BaudRate.BaudRate9600
            )
            basic.pause(100);
            VO1_checkBusy(); // clear readbuffer
    }

    function VO1_init_if_firsttime(): void {
        if ( VO1_init_done == false ) {
            VO1_init();
            VO1_init_done = true;
        }
    }
}