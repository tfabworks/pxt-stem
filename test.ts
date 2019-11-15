basic.forever(function () {
    if (stem.isMove()) {
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
        basic.clearScreen()
    }
    basic.pause(1000)
})
