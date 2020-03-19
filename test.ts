basic.forever(function () {
    if (stem.MS1_magnetDetect()) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.Yes)
    }
})
