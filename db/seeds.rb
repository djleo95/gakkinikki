# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Manufacture.create! (
  [{name: "Traditional"},
   {name: "Classic"},
   {name: "Yamaha"},
   {name: "BOSS"},
   {name: "Fender"},
   {name: "Other"},
  ])

Instrument.create(
  [
    {name: 'Guitar',
     manufacture_id: '1'},
    {name: 'Piano',
     manufacture_id: '1'},
    {name: 'Speaker',
    manufacture_id: '1'},
    {name: 'Amplifier',
     manufacture_id: '1'},
    {name: 'MIDI Controller',
     manufacture_id: '1'},
    {name: 'Equalizer',
     manufacture_id: '1'},
    {name: 'Drum',
    manufacture_id: '1'},
    {name: 'Other',
    manufacture_id: '1'},
  ])
