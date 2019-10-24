module.exports = {
  locations: [
    {
      id: 1,
      name: "Hospital",
      desc:
        "For the recently deceased in need of complex medical care the hospital is a perfect location. Staff are skilled at re-attaching severed limbs and the on-site blood bank is a life saver!",
      icon: "hospital"
    },
    {
      id: 2,
      name: "School",
      desc:
        "After suffering brain death many zombies could use support in regaining valuable life skills",
      icon: "school"
    },
    {
      id: 3,
      name: "Warehouse",
      desc:
        "This ex-Amazon Fulfillment Center now has every type of zombie. All zombies can be securely packed and shipped nation-wide within 2 days.",
      icon: "warehouse"
    }
  ],
  zombies: [
    {
      id: 1,
      location_id: 1,
      sex: "male",
      colour: "grey",
      smell: "bad"
    },
    {
      id: 2,
      location_id: 1,
      sex: "female",
      colour: "green",
      smell: "bad"
    },
    {
      id: 3,
      location_id: 1,
      sex: "male",
      colour: "aquamarine ",
      smell: "roses"
    },
    {
      id: 4,
      location_id: 2,
      sex: "female",
      colour: "grey",
      smell: "awful"
    },
    {
      id: 5,
      location_id: 2,
      sex: "female",
      colour: "pink",
      smell: "roses"
    },
    {
      id: 6,
      location_id: 3,
      colour: "grey",
      smell: "roses"
    },
    {
      id: 7,
      location_id: 3,
      sex: "male",
      colour: "aquamarine",
      smell: "awful"
    },
    {
      id: 8,
      location_id: 3,
      sex: "male",
      colour: "green",
      smell: "roses"
    },
    {
      id: 9,
      location_id: 3,
      sex: "female",
      colour: "green",
      smell: "awful"
    },
    {
      id: 10,
      location_id: 1,
      sex: "male",
      colour: "grey",
      smell: "awful"
    },
    {
      id: 11,
      location_id: 3,
      sex: "female",
      colour: "aquamarine",
      smell: "awful"
    },
    {
      id: 12,
      location_id: 2,
      sex: "male",
      colour: "teal",
      smell: "bad"
    }
  ]
};
