# ATC24 Suite "Manual"

This handy page will tell you everything on how to use the ATC24 Suite as efficiently as possible.  
In case of questions that aren't answered here, join [the Discord!](https://discord.com/invite/EHxWfKEbrq)

## How to Handle and Manage Strips

Strips can be created/managed using following shortcuts:  

#### Creating/Deleting

- I - Create Inbound Strip
- O - Create Outbound Strip
- V - Create VFR Strip
- X - Delete Strip
- C - Cancel Deletion  

#### Moving

- A - Move strip to the previous list
- D - Move strip to the next list
- W - Move strip up
- S - Move strip down  

#### Further Info

- Q - Cycle Flight Status Back
- E - Cycle Flight Status Forward

For an explanation of the Status codes see ["Flight Statuses"](#flight-statuses)

#### Sorting in Lists (or "Columns")

You can either use the default Suite configuration with the Delivery, Ground, Tower and Approach/Departure lists, or configure the suite on your own.  
To do so simply use following shortcuts:  

- L - Create a new list to the right
- B - Delete list
- C - Cancel deletion (Same as for Strips)

Once you've created a list, you can simply rename it by clicking the name on top.
Lists will be synchronized for users joining your Room (More on Rooms under "Working with Others")

You can check all these keybinds anytime by *clicking* "Help" in the top right.

## Flight Statuses

#### Outbound

- SUG = Startup Given
- PBG = Pushback Given
- TXG = Taxi Given
- ALU = Approved Lineup
- DEP = Departure

#### Inbound

- ARR = Arriving
- IDE = Identified
- DES = Descend
- ILS = ILS Approach (Or any other approach)
- GOA = Go Around
- TXG = Taxi Given
- ONB = On Blocks (Arrived at gate - "On Block Time")

#### VFR

- SUG = Start up Given
- TXG = Taxi Given
- DEP = Depature
- TFP = Traffic Pattern

## Working with Others

The ATC24 Suite allows you to open a room using the "Create Room" Button from the Connection Panel  
![`Panel Image`](http://localhost:5500/public/help/images/connection_panel.png)  

Once you've created a room, all strips and your list configuration will be synchronized with users who join your room.  
Users can join your room with the code that appears once you've created a room using the "Join Room" button.

## Aerodrome Configuration

Using the Aerodrome Panel at the top of the Suite you can set up the Airport configuration including

- Which station you are controlling
- Which runways are active for arrival
- Which runways are active for departure

![`Panel Image`](https://zedruc.net/atc24-suite/help/images/aerodrome_panel.png)  

## ATIS Generator

The built-in ATIS Generator uses the official ATC24 ATIS Format so you can simply copy and paste the generated ATIS without having to worry about it being deleted.  

![`Panel Image`](https://zedruc.net/atc24-suite/help/images/atis_gen.png)  

## Radar Screen

The built-in Radar screen helps you keep track of aircraft in your airspace and most importantly makes vectoring way easier.  
The radar displays all important waypoints in your airspace so you can immediately tell where an aicraft is headed when reporting an inbound waypoint.  

In addition, the radar has a list to the right displaying all neighboring sectors with

- The Name + Frequency
- An approximate initial heading which will lead aircraft to the sector  

![`Panel Image`](https://zedruc.net/atc24-suite/help/images/radar.png)  

## Arrival List

The Arrival List, if enabled, helps you declutter the main working area of the suite by holding all arriving flights in that list until you *click* them to accept them.  
Only then will a strip be created for the clicked flight.  

Keybinds:
* X (Twice): Delete Arrival
* C (After pressing X once -> Red Border) Cancel Deletion
* Click: Accept arrival


![`Panel Image`](https://zedruc.net/atc24-suite/help/images/arrival_list.png)  

## Settings

The Suite gives you a handful of options to personalize it:

- `Load strips from last session upon startup`
  - If enabled, saves strips when closing the suite and loads them when opening it the next time

- `Automatically import flight plans from ATC24` (Recommended)
  - Automatically imports flight plans from the `#flight-plans` channel when departing or arriving from your airport (Requires you to be in a room)

- `Hold Arrivals in Arrival List`  
  - If enabled, flights arriving at your airport will be held in this list and don't get a strip until you click to accept them

- `Snap radar heading vector to next standard heading` (Recommended)
  - This rounds headings to a factor of 5, e.g. 241 -> 240, 237 -> 235

- `Show ocean in addition to island outline` (Recommended)
  - Displays water around the island on the radar screen

- `Put strips on top of list when moving between lists`
  - Strips will be added on top of lists when moved

- `Keep radar vector after dragging` (Recommended)
  - The radar vector will stay after dragging it
  
- `Generate IFR clearance shorthand when loading flightplan` (Recommended)
  - If enabled, generates an IFR clearance for outbound flights
  - May look something like this: `CLR ILAR ALDER1J FPL CVS FL 050 DEP [ ] ?SQ`

- `Display ground charts in dark mode`
  - Switched integrated ground charts to dark mode

- `Only receive flightplans from the event flightplans channel` (Required for Event ATCs) (NOT RECOMMENDED FOR NORMAL USAGE)
  - If enabled, you will be able to use the suite as usual but ONLY event flight plans will be imported

- `Show all flights as enroute when controlling Rockford` (Required for Event ATCs) (NOT RECOMMENDED FOR NORMAL USAGE)
  - If enabled, EVERY flightplan filed will be imported to your suite

## Authors

- [@zedruc](https://www.github.com/zedruc)
