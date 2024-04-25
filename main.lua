local beforehealth = 0
local beforearmor = 0

Citizen.CreateThread(function()
    local ped = PlayerPedId()
    while true do 
        Citizen.Wait(0)
        if beforehealth ~= GetEntityHealth(PlayerPedId()) then
            beforehealth = GetEntityHealth(PlayerPedId())
            SendNUIMessage({
                type = "hud",
                action = "loop",
                health = GetEntityHealth(PlayerPedId()) - 100
            })
        end
        if beforearmor ~= GetPedArmour(PlayerPedId()) then
            beforearmor = GetPedArmour(PlayerPedId())
            SendNUIMessage({
                type = "hud",
                action = "loop",
                armor = GetPedArmour(PlayerPedId())
            })
        end
    end
end)

-- HIDE DEFAULT HUD --
if Config.Settings.defaulthud then
    Citizen.CreateThread(function()
        local minimap = RequestScaleformMovie("minimap")
        SetRadarBigmapEnabled(true, false)
        Wait(0)
        SetRadarBigmapEnabled(false, false)
        while true do
            Wait(0)
            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
        end
    end)
end

-- DISABLE STREET NAME --
if Config.Settings.streetname then
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            HideHudComponentThisFrame(6) -- 6 = VEHICLE NAME
            HideHudComponentThisFrame(7) -- 7 = AREA NAME
            HideHudComponentThisFrame(8) -- 8 = VAHICLE CLASS
            HideHudComponentThisFrame(9) -- 9 = STREET NAME
        end
    end)
end

-- DISABLE AUTO REGENERATION --
if Config.Settings.autoregeneration then
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1)
            SetPlayerHealthRechargeMultiplier(PlayerId(), 0.0)
        end
    end)
end