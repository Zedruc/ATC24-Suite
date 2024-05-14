
# ATC24-Suite

An All-in-One solution for ATC24 controllers.

[**ATC24 Suite Discord Server**](https://discord.gg/XC9tTTWMT5)

* [Roadmap](#roadmap)  
* [Contributing](#contributing)

## Issues & Suggestions

If you wish to report any bugs or want to give feedback, you are very welcome to do so!  
It greatly aids development.

    1. Open an issue and tag it either `Bug Report` or `Feedback`
    2. Describe the issue as well as possible
    3. Propose possible solutions that you think would suit the program

## Features

### Flight Strip Management

ATC24-Suite enables you to swiftly create, manage and delete flight strips by utilising intuitive keybinds.

### Built-In Ground Chart

The Suite automatically loads the correct aerodrome ground chart based on your airport selection.

### Custom Radar Screen

With the help of the Custom Radar, which is constantly updated with aerodrome data such as Runways, Cities, surrounding Terrain and [more to come](#roadmap), your situational awareness is greatly improved, aiding you with descending traffic and vectoring them in for approach.  

## Roadmap

This roadmap displays future updates and planned features.

### [M1 - [RADAR] Airport and weather information]()

![`Status Badge`](https://img.shields.io/badge/status-done-lightgreen)  
Completing Data for the Radar for every airport

### [M2 - [GENERAL] ATC24 ATIS Generator]()

![`Status Badge`](https://img.shields.io/badge/status-done-lightgreen)  
Adding a built-in ATIS generator using official ATC24 formats

### [M3 - [RADAR] Waypoints and Routings]()

![`Status Badge`](https://img.shields.io/badge/status-planned-grey)  
Adding official Waypoints and SID/STAR Routings to the Radar screen

### [M4 - [GENERAL] ATC Session Sharing]()  

![`Status Badge`](https://img.shields.io/badge/status-done-lightgreen)  
Allowing controllers to verify with Discord and open a room to share with other users (e.g. Ground/Tower split Operations)

### [M5 - [GENERAL] Controller Data Link]()  

![`Status Badge`](https://img.shields.io/badge/status-in%20preparation-orange)  
Enables controllers to send a strip over to another station (e.g. next centre controller) without being in a room. The receiving controller will be able to deny or accept the incoming strip.

### [M6 - [GENERAL] Live Flightplan Manager]()  

![`Status Badge`](https://img.shields.io/badge/status-done-lightgreen)
Automatically make flightplans, which include your aerodrome, pop up in your ATC24-Suite allowing you to make amendments as required  
and taking the tedious work of constantly checking for flightplans off controllers' hands.  

### [M6.1 - [GENERAL] Inbound/Outbound List]()  

![`Status Badge`](https://img.shields.io/badge/status-in%20preparation-orange)  
Extra window displaying inbound/outbound flights in minified format where you can choose to accept/disregard  
flights as they check in. This will help declutter the main flightstrip area.

### [M7 - [GENERAL] Sounds]()  

![`Status Badge`](https://img.shields.io/badge/status-planned-grey)  
Adding sounds to the ATC24-Suite to make it feel more lively and responsive

## Far Future  

### [M8 - [UTIL] CPDLC]()  

![`Status Badge`](https://img.shields.io/badge/status-planned-grey)  
In the full version of the suite, it is planned to have a sort of CPDLC simulated which both pilots and controllers may access to simulate CPDLC clearances

# Contributing

To contribute you can either tackle one of the roadmap items or do your own thing. Code will be reviewed by me (Zedruc) before accepting it.  
General Guideline:

1. **Do NOT** reformat a whole file and push that, as it makes code review harder, which will 100% read to rejection of pull requests.

* Default indent tab = 2 spaces

2. The only API allowed to be used is `api.zedruc.net` (Not documented as it only has one endpoint for the suite anyway), any features using external APIs I will add myself.
