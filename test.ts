basic.forever(function () {
    led.plotBarGraph(
    input.lightLevel(),
    0
    )
    stem.VO1_send("konnitiwa")
})
