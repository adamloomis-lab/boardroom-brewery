// FIFA World Cup 2026 — June watch-party schedule at Boardroom Brewery.
// Boardroom is minutes from SoFi Stadium; every match shows on the big screen,
// with daily food trucks and special events. Transcribed from the client's calendar.

export type Match = { teams: string; group: string; venue: string; time: string }
export type WCDay = {
  date: string
  open: string // taproom status for the day
  foodVendors?: string
  events?: string[]
  matches: Match[]
}

export const worldCupTitle = 'June World Cup Schedule'
export const worldCupIntro =
  'The whole tournament, all month long. Boardroom is minutes from SoFi Stadium, so we’re putting every match on the big screen with daily food trucks and special events. Here’s the June lineup.'

export const worldCup: WCDay[] = [
  {
    date: 'Thursday, June 11',
    open: 'Open 11:30 am',
    foodVendors: 'Tatsu Grill 4pm',
    events: ['World Cup opens today!'],
    matches: [
      { teams: 'Mexico v South Africa', group: 'Group A', venue: 'Mexico City Stadium', time: '12:00pm' },
      { teams: 'Korea Republic v Czechia', group: 'Group A', venue: 'Estadio Guadalajara', time: '7:00pm' },
    ],
  },
  {
    date: 'Friday, June 12',
    open: 'Open 11:30 am',
    foodVendors: 'Beachside Tacos 4pm',
    events: ['World Cup at SoFi Stadium tonight!'],
    matches: [
      { teams: 'Canada v Bosnia and Herzegovina', group: 'Group B', venue: 'Toronto Stadium', time: '12:00pm' },
      { teams: 'USA v Paraguay', group: 'Group D', venue: 'SoFi Stadium', time: '6:00pm' },
    ],
  },
  {
    date: 'Saturday, June 13',
    open: 'Open 11:30 am',
    foodVendors: 'QByCDot 2pm',
    matches: [
      { teams: 'Qatar v Switzerland', group: 'Group B', venue: 'San Francisco Bay Area Stadium', time: '12:00pm' },
      { teams: 'Brazil v Morocco', group: 'Group C', venue: 'New York New Jersey Stadium', time: '3:00pm' },
      { teams: 'Haiti v Scotland', group: 'Group C', venue: 'Boston Stadium', time: '6:00pm' },
      { teams: 'Australia v Türkiye', group: 'Group D', venue: 'BC Place Vancouver', time: '9:00pm' },
    ],
  },
  {
    date: 'Sunday, June 14',
    open: 'Open Noon',
    foodVendors: 'Joes Sliders 2pm',
    matches: [
      { teams: 'Germany v Curaçao', group: 'Group E', venue: 'Houston Stadium', time: '10:00am' },
      { teams: 'Netherlands v Japan', group: 'Group F', venue: 'Dallas Stadium', time: '1:00pm' },
      { teams: 'Côte d’Ivoire v Ecuador', group: 'Group E', venue: 'Philadelphia Stadium', time: '4:00pm' },
      { teams: 'Sweden v Tunisia', group: 'Group F', venue: 'Estadio Monterrey', time: '7:00pm' },
    ],
  },
  {
    date: 'Monday, June 15',
    open: 'Closed',
    matches: [
      { teams: 'Spain v Cabo Verde', group: 'Group H', venue: 'Atlanta Stadium', time: '9:00am' },
      { teams: 'Belgium v Egypt', group: 'Group G', venue: 'Seattle Stadium', time: '12:00pm' },
      { teams: 'Saudi Arabia v Uruguay', group: 'Group H', venue: 'Miami Stadium', time: '3:00pm' },
      { teams: 'IR Iran v New Zealand', group: 'Group G', venue: 'SoFi Stadium', time: '6:00pm' },
    ],
  },
  {
    date: 'Tuesday, June 16',
    open: 'Open 11:30 am',
    matches: [
      { teams: 'France v Senegal', group: 'Group I', venue: 'New York New Jersey Stadium', time: '12:00pm' },
      { teams: 'Bolivia/Iraq/Suriname v Norway', group: 'Group I', venue: 'Boston Stadium', time: '3:00pm' },
      { teams: 'Argentina v Algeria', group: 'Group J', venue: 'Kansas City Stadium', time: '6:00pm' },
      { teams: 'Austria v Jordan', group: 'Group J', venue: 'San Francisco Bay Area Stadium', time: '9:00pm' },
    ],
  },
  {
    date: 'Wednesday, June 17',
    open: 'Open 11:30 am',
    foodVendors: 'Tatsu Grill 12pm',
    matches: [
      { teams: 'Portugal v Congo DR', group: 'Group K', venue: 'Houston Stadium', time: '10:00am' },
      { teams: 'England v Croatia', group: 'Group L', venue: 'Dallas Stadium', time: '1:00pm' },
      { teams: 'Ghana v Panama', group: 'Group L', venue: 'Toronto Stadium', time: '4:00pm' },
      { teams: 'Uzbekistan v Colombia', group: 'Group K', venue: 'Mexico City Stadium', time: '7:00pm' },
    ],
  },
  {
    date: 'Thursday, June 18',
    open: 'Open 11:30 am',
    foodVendors: 'LowerCaseDeli 4pm',
    matches: [
      { teams: 'Czechia v South Africa', group: 'Group A', venue: 'Atlanta Stadium', time: '9:00am' },
      { teams: 'Switzerland v Bosnia and Herzegovina', group: 'Group B', venue: 'SoFi Stadium', time: '12:00pm' },
      { teams: 'Canada v Qatar', group: 'Group B', venue: 'BC Place Vancouver', time: '3:00pm' },
      { teams: 'Mexico v Korea Republic', group: 'Group A', venue: 'Estadio Guadalajara', time: '6:00pm' },
    ],
  },
  {
    date: 'Friday, June 19',
    open: 'Open 11:30 am',
    foodVendors: 'Freddy’s Birria 4pm',
    matches: [
      { teams: 'USA v Australia', group: 'Group D', venue: 'Seattle Stadium', time: '12:00pm' },
      { teams: 'Scotland v Morocco', group: 'Group C', venue: 'Boston Stadium', time: '3:00pm' },
      { teams: 'Brazil v Haiti', group: 'Group C', venue: 'Philadelphia Stadium', time: '6:00pm' },
      { teams: 'Türkiye v Paraguay', group: 'Group D', venue: 'San Francisco', time: '9:00pm' },
    ],
  },
  {
    date: 'Saturday, June 20',
    open: 'Open 11:30 am',
    foodVendors: 'Beachside Tacos 2pm',
    matches: [
      { teams: 'Sweden', group: 'Group F', venue: 'Houston Stadium', time: '10:00am' },
      { teams: 'Germany v Côte d’Ivoire', group: 'Group E', venue: 'Toronto Stadium', time: '1:00pm' },
      { teams: 'Ecuador v Curaçao', group: 'Group E', venue: 'Kansas City Stadium', time: '5:00pm' },
      { teams: 'Tunisia v Japan', group: 'Group F', venue: 'Estadio Monterrey', time: '9:00pm' },
    ],
  },
  {
    date: 'Sunday, June 21, Father’s Day',
    open: 'Open 11:30 am',
    foodVendors: 'Bomba Delicacy 12pm',
    events: ['Father’s Day Game at SoFi 12pm'],
    matches: [
      { teams: 'Spain v Saudi Arabia', group: 'Group H', venue: 'Atlanta Stadium', time: '9:00am' },
      { teams: 'Belgium v IR Iran', group: 'Group G', venue: 'SoFi Stadium', time: '12:00pm' },
      { teams: 'Uruguay v Cabo Verde', group: 'Group H', venue: 'Miami Stadium', time: '3:00pm' },
      { teams: 'New Zealand v Egypt', group: 'Group G', venue: 'BC Place Vancouver', time: '6:00pm' },
    ],
  },
  {
    date: 'Monday, June 22',
    open: 'Closed',
    events: ['Game Night 6-8pm'],
    matches: [
      { teams: 'Argentina v Austria', group: 'Group J', venue: 'Dallas Stadium', time: '10:00am' },
      { teams: 'France v Bolivia/Iraq/Suriname', group: 'Group I', venue: 'Philadelphia Stadium', time: '2:00pm' },
      { teams: 'Norway v Senegal', group: 'Group I', venue: 'New York New Jersey Stadium', time: '5:00pm' },
      { teams: 'Jordan v Algeria', group: 'Group J', venue: 'San Francisco Bay Area Stadium', time: '8:00pm' },
    ],
  },
  {
    date: 'Tuesday, June 23',
    open: 'Open 11:30 am',
    foodVendors: 'Bomba Delicacy 12pm',
    matches: [
      { teams: 'Portugal v Uzbekistan', group: 'Group K', venue: 'Houston Stadium', time: '10:00am' },
      { teams: 'England v Ghana', group: 'Group L', venue: 'Boston Stadium', time: '1:00pm' },
      { teams: 'Panama v Croatia', group: 'Group L', venue: 'Toronto Stadium', time: '4:00pm' },
      { teams: 'Colombia v Congo DR', group: 'Group K', venue: 'Estadio Guadalajara', time: '7:00pm' },
    ],
  },
  {
    date: 'Wednesday, June 24',
    open: 'Open 11:30 am',
    foodVendors: 'Ana Knows Best 12pm',
    matches: [
      { teams: 'Switzerland v Canada', group: 'Group B', venue: 'BC Place Vancouver', time: '12:00pm' },
      { teams: 'Bosnia and Herzegovina v Qatar', group: 'Group B', venue: 'Seattle Stadium', time: '12:00pm' },
      { teams: 'Scotland v Brazil', group: 'Group C', venue: 'Miami Stadium', time: '3:00pm' },
      { teams: 'Morocco v Haiti', group: 'Group C', venue: 'Atlanta Stadium', time: '3:00pm' },
      { teams: 'Czechia v Mexico', group: 'Group A', venue: 'Mexico City Stadium', time: '6:00pm' },
      { teams: 'South Africa v Korea Republic', group: 'Group A', venue: 'Estadio Monterrey', time: '6:00pm' },
    ],
  },
  {
    date: 'Thursday, June 25',
    open: 'Open 12 pm',
    foodVendors: 'Beachside Tacos 4pm',
    events: ['USA vs. UEFA Playoff Winner C at SoFi 7pm', 'Hard Tech Trivia'],
    matches: [
      { teams: 'Curaçao v Côte d’Ivoire', group: 'Group E', venue: 'Philadelphia Stadium', time: '1:00pm' },
      { teams: 'Ecuador v Germany', group: 'Group E', venue: 'New York New Jersey Stadium', time: '1:00pm' },
      { teams: 'Japan v Sweden', group: 'Group F', venue: 'Dallas Stadium', time: '4:00pm' },
      { teams: 'Tunisia v Netherlands', group: 'Group F', venue: 'Kansas City Stadium', time: '4:00pm' },
      { teams: 'Türkiye v USA', group: 'Group D', venue: 'SoFi Stadium', time: '7:00pm' },
      { teams: 'Paraguay v Australia', group: 'Group D', venue: 'San Francisco Bay Area Stadium', time: '7:00pm' },
    ],
  },
  {
    date: 'Friday, June 26',
    open: 'Open 11:30 am',
    foodVendors: 'Tacos El Morenazo 12pm',
    matches: [
      { teams: 'Norway v France', group: 'Group I', venue: 'Boston Stadium', time: '12:00pm' },
      { teams: 'Senegal v Iraq', group: 'Group I', venue: 'Toronto Stadium', time: '12:00pm' },
      { teams: 'Cabo Verde v Saudi Arabia', group: 'Group H', venue: 'Houston Stadium', time: '5:00pm' },
      { teams: 'Uruguay v Spain', group: 'Group H', venue: 'Estadio Guadalajara', time: '5:00pm' },
      { teams: 'Egypt v IR Iran', group: 'Group G', venue: 'Seattle Stadium', time: '8:00pm' },
      { teams: 'New Zealand v Belgium', group: 'Group G', venue: 'BC Place Vancouver', time: '8:00pm' },
    ],
  },
  {
    date: 'Saturday, June 27',
    open: 'Open 12 pm',
    foodVendors: 'Freddy’s Birria 2pm',
    matches: [
      { teams: 'Panama v England', group: 'Group L', venue: 'New York New Jersey Stadium', time: '2:00pm' },
      { teams: 'Croatia v Ghana', group: 'Group L', venue: 'Philadelphia Stadium', time: '2:00pm' },
      { teams: 'Colombia v Portugal', group: 'Group K', venue: 'Miami Stadium', time: '4:30pm' },
      { teams: 'Congo DR v Uzbekistan', group: 'Group K', venue: 'Atlanta Stadium', time: '4:30pm' },
      { teams: 'Algeria v Austria', group: 'Group J', venue: 'Kansas City Stadium', time: '7:00pm' },
      { teams: 'Jordan v Argentina', group: 'Group J', venue: 'Dallas Stadium', time: '7:00pm' },
    ],
  },
  {
    date: 'Sunday, June 28',
    open: 'Open 11:30 am',
    foodVendors: 'Joes Sliders 12pm',
    matches: [
      { teams: 'Match 73: Group A runners-up v Group B runners-up', group: 'Round of 32', venue: 'SoFi Stadium', time: '12:00pm' },
    ],
  },
  {
    date: 'Monday, June 29',
    open: 'Closed',
    matches: [
      { teams: 'Match 76: Group C winners v Group F runners-up', group: 'Round of 32', venue: 'Houston Stadium', time: '10:00am' },
      { teams: 'Match 74: Group E winners v Group A/B/C/D/F third place', group: 'Round of 32', venue: 'Boston Stadium', time: '1:30pm' },
      { teams: 'Match 75: Group F winners v Group C runners-up', group: 'Round of 32', venue: 'Estadio Monterrey', time: '6:00pm' },
    ],
  },
  {
    date: 'Tuesday, June 30',
    open: 'Open 2 pm',
    matches: [
      { teams: 'Match 78: Group E runners-up v Group I runners-up', group: 'Round of 32', venue: 'Dallas Stadium', time: '10:00am' },
      { teams: 'Match 77: Group I winners v Group C/D/F/G/H third place', group: 'Round of 32', venue: 'New York', time: '2:00pm' },
      { teams: 'Match 79: Group A winners v Group C/E/F/H/I third place', group: 'Round of 32', venue: 'Mexico City', time: '6:00pm' },
    ],
  },
]
