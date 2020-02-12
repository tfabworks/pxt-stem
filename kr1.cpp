#include "pxt.h"
#include "mbed.h"
using namespace pxt;

namespace stem {

    Ticker tk1;
    Ticker tk2;

    const float PERIOD = 0.02;
	void set_pulse_width_p1(int pw_us);
	void set_pulse_width_p2(int pw_us);
    void generate_pwm_p1();
    void generate_pwm_p2();
    float pulse_width_us1 = 1500.0;
    float pulse_width_us2 = 1500.0;
        


    /**
     * Configure the P1 pin as an servo output
     */
    //%
	void set_pulse_width_p1(int pw_us){
        pulse_width_us1 = pw_us;
        //uBit.display.image.setPixelValue(0,0,255);
        tk1.attach(&generate_pwm_p1, 0.02);
	}

    /**
     * Configure the P2 pin as an servo output
     */
    //%
	void set_pulse_width_p2(int pw_us){
        pulse_width_us2 = pw_us;
        tk2.attach(&generate_pwm_p2, 0.02);
	}

    //%
    void stop_p1(){
        tk1.detach();
    }

    //%
    void stop_p2(){
        tk2.detach();
    }

    #ifndef DELAY_ADJUST_US
    #define DELAY_ADJUST_US 55
    /**
     * generate pwm waveform on P1
     */
    void generate_pwm_p1(){
            DigitalOut servo1(MICROBIT_PIN_P1);
            servo1 = 1;
            wait( (pulse_width_us1-60)/1000000.0 );
            servo1 = 0;
    }

    /**
     * generate pwm waveform on P2
     */
    void generate_pwm_p2(){
            DigitalOut servo2(MICROBIT_PIN_P2);
            servo2 = 1;
            wait( (pulse_width_us2-60)/1000000.0 );
            servo2 = 0;
    }
    #endif DELAY_ADJUST_US
}
