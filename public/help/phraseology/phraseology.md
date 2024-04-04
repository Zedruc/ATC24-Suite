
# Controller Phraseology

Phraseology is very important on ATC24 as it is the main factor for realistic operations.  
If you are interested in controlling more professionally, this is a good guide for ICAO Phraseology.  
That being said, please read this guide for European ICAO Phraseology, or the [FAA (American) Phraseology Cheat Sheet](https://docs.google.com/spreadsheets/d/1SUjdRAweo4z7TPgQyo8BHlSswbSK2YP4stx88cUDdWQ/edit?usp=sharing).  

Both standards have their pros and cons, although - **personal opinion** -  I find the ICAO phraseology to be more clear and concise.  
If you find any mistakes in this document that need to be corrected, please contact me through following options:

- [Discord Server](https://discord.com/invite/EHxWfKEbrq)
- [GitHub issue](https://github.com/Zedruc/ATC24-Suite-Feedback/issues/new/choose)

## Delivery

The Ground Controller on ATC24 also takes the position of the Delivery controller.  
Delivery is often viewed as an "only talk" station, this is however not true at all.  
The Delivery Controller, or "Aerodrome Coordinator" is responsible for managing the capacity of the Airport and controlling when aircraft leave their Gates when the airport is very busy.

IFR Clearances have 5 main parts to them:

- Clearance limit
- Departure
- Enroute Clearance
- Initial climb
- Transponder code

### Clearance limit

This defines how far the clearance goes, for IFR flights this is always the destination Airport.  
`Cleared (to) Perth International,`

### Departure

This tells the pilot how they are cleared to depart from the aerodrome.  
This can be a SID (Standard Instrument Departure) or a Vectored Approach.  
The runway **only** has to be mentioned if a SID can be flown from multiple runways.  
In case of a vectored departure, the runway has to be mentioned.

***SID (Accessible from multiple runways)***
`ALDER1J Departure, Runway 11`  

***SID (Accessible from only one runway)***
`ALDER1J Departure`  

***Vectored Departure (Very Common on ATC24)***
`Vectored Departure Runway 11`

### Enroute Clearance

To tell the pilot how he should proceed after the SID, we say
`Flight Planned Route`

### Initial Climb

This tells the pilot how high he's allowed to climb without further instructions.  
If the SID he is on doesn't have either a Speed Restriction *nor* an Altitude Restriction (Or Vectored Departure), we simply say `Climb Flight Level 020`  
*Otherwise* we say `Climb **via SID** Flight Level 020`  
SID is pronounced as one word, not S-I-D.

### Transponser Code

Even though only vocally simulated in ATC24, the transponser would be used to identify Aircraft without mode S transponders.
To transmit the squawk, we say `Squawk XXXX` where full thousands can be pronounced as a number (E.g. 1000 "One Tousand") <- Not a Typo, you say **Tou**sand

### Full Transmission

To all you've read now, we add the current ATIS and let the Pilot know that his startup is approved, then we have the following:  
`INFORMATION A, STARTUP APPROVED, CLEARED (TO) PERTH INTERNATIONAL, ALDER1J DEPARTURE, FLIGHT PLANNED ROUTE, CLIMB VIA SID FL020, SQUAWK 1000`

## Ground

On ATC24 Ground is responsible for managing ground movements on the apron and taxiways. This includes Pushback clearances.  
Pushback clearances can have two variants:  

- `Pushback approved, FACE north/east/south/west`
- `Pushback approved, TAIL left/right`
Pretty self explanatory.

As for Taxi instructions, you can show detailed knowledge by differentiating between `Taxi VIA` and `Taxi TO`.
`Taxi VIA` **always** is followed by a `hold short`, as you tell the pilot to go to a certain clearance limit VIA a route.  
Example: `Lufthansa 201, taxi *VIA* A, A8, B, *hold short* A7`

`Taxi TO` tell the pilot to taxi TO a certain point (the clearance limit) and hold there.
Example: `Lufthansa 201, taxi *TO* holding point runway 31 via A8, B, hold short B2`

While `hold short` is already very handy, another tool to resolve possible conflicts is `give way`.  
Here you tell a pilot to let another aircraft go first, for that you tell the pilot where the other traffic is coming from and what type of traffic it is.
Example: `Lufthansa 201, give way to British Airways A320 crossing left to right at A7, after traffic has crossed continue taxi.`

## Tower

**Tower on ATC24 takes over Ground if Ground is not online**  
The ATC24 Tower also takes the Center position at the following major airports:

- Rockford (Chicago Center)
- Larnaca (Lazarus Center)
- Izolirani (Norsom Center)
- Saint Barthélemy (Sotaf Center)
- Perth (Perth Center)
- Tokyo (Tokyo Center)
- Grindavik (Keplavik Center)
- Sauthemptona (Brighton)

The Tower is responsible for giving takeoff clearances and landing clearances.  
Furthermore the Tower is responsible for choosing the Airport configuration, so which runways are used for arrival/departure.

The *Tower* **DOES NOT** give vectors or climb/descend instructions.
Tower is also not reponsible for traffic separation on final. This is Center's job.

## Center

**The Center Controller on ATC24 also takes over the Tower's job**  
Center is responsible for separating traffic and vectoring aircraft towards final.  
Alternatively he can assign STARs (Standard Terminal Arrival Route) that aircraft shall follow.  

When an aircraft is nearing the Centers Airspace border, he's responsible for *Handing Off* the traffic to the next center.
Example: `Lufthansa 201, contact Sotaf Center on 128.600.`  
(All digits are to be pronounced separately, trailing zeros can be omitted: One Two Eight DECIMAL Six)
  
## Authors

- [@zedruc](https://www.github.com/zedruc)
