$(".hud .player-health-infos .player-armor-bar").hide()
$('#l-armor').hide()
$('#l-health').css('top', '0')

window.addEventListener("message", function (e) {
    const data = e.data
    if (data.type == "hud") {
        if (data.action == "loop") {
            if (typeof data.health == "number") {
                SetPlayerHealth(data.health)
            }
            if (typeof data.armor == "number") {
                SetPlayerArmor(data.armor)
            }
        }
    }
})

SetPlayerHealth = health => {
    if (health < 0) {
        health = 0
    } else if (health == 99) {
        health = 100
    }
    if ($(".player-hp-count > h1").html() == health) return;
    $(".player-hp-count > h1").html(health)
    $(".player-hp-bar > .progress").css("width", (health / 100) * 100 + "%")
    healthColor(health)
}

SetPlayerArmor = armor => {
    if (armor < 0.1) {
        $(".hud .player-health-infos .player-armor-bar").hide()
        $('#l-armor').hide()
        $('#l-health').css('top', '0')
    } else {
        $(".hud .player-health-infos .player-armor-bar").show()
        $('#l-armor').show()
        $('#l-armor').css('top', '9px')
        $('#l-health').css('top', '33px')
    }
    $(".armor-plate").remove()
    var learmor = 100 / 4
    for (let i = 0; i < 4; i++) {
        var lecontent = ``
        if (learmor * (i + 1) <= armor) {
            lecontent = `
                <div class="armor-plate">
                    <div class="fill" style="--percentage: 100%;"></div>
                </div>
            `
        } else if (learmor * (i) <= armor & learmor * (i + 1) >= armor & ((Math.round(armor)) != (Math.round(learmor * (i))))) {
            var letruc = (learmor * (i + 1)) - armor
            letruc = (letruc - 25) * -1
            var calc = percentage(letruc, 25)
            lecontent = `
                <div class="armor-plate">
                    <div class="fill" style="--percentage: ${calc}%;"></div>
                </div>
            `
        } else {
            lecontent = `
                <div class="armor-plate"></div>
            `
        }
        $(".player-armor-bar").append(lecontent)
    }
}

function healthColor(health) {
    if (health <= 33 && health >= 10) {
        $(".hud .player-health-infos .player-hp-bar .progress").css('background', 'rgb(172, 19, 19)')
    } else if (health <= 10) {
        $(".hud .player-health-infos .player-hp-bar .progress").css('background', 'rgb(58, 1, 1)')
    } else {
        $(".hud .player-health-infos .player-hp-bar .progress").css('background', 'rgb(255, 255, 255)')
    }
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}