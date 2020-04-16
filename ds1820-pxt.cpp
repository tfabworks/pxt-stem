#include "pxt.h"
#include "source/DS1820.h"

using namespace pxt;

enum class Pins{
  P0=  3,
  P1=  2,
  P2=  1,
  P3=  4,
  P4=  5,
  P5=  17,
  P6=  12,
  P7=  11,
  P8=  18,
  P9=  10,
  P10= 6,
  P11= 26,
  P12= 20,
  P13= 23,
  P14= 22,
  P15= 21,
  P16= 16,
  P19= 0,
  P20= 30
};

namespace DS1820pxt { 
  float g_previous_temperature;
  DS1820 *probe;
  //%
  void cpp_init(){
    Pins pin = Pins::P0;
    if (probe != NULL) delete(probe);
    probe = new DS1820((PinName)pin);
    probe->convertTemperature(true, DS1820::all_devices);
    uBit.sleep(20);
    g_previous_temperature = probe->temperature();
  }

  //%
  float cpp_temp1dp() {
    probe->convertTemperature(true, DS1820::all_devices);
    uBit.sleep(20);
    float t = probe->temperature();
    if ( t == -1000 ) {
        return g_previous_temperature;
    }
    g_previous_temperature = t;
    return t;
  }
}
