/**
 * Alpine Ascents - Portal Knowledge Base & Data Source
 * Comprehensive Mountaineering Data: History, Styles, Techniques, Shelters, Hazards, Records, Clubs, Success Stories, Gear Innovation, Guidelines.
 */

// Immediate global assignment to ensure availability across all modules and browsers
const MOUNTAINEERING_DATA = {
  // 1. History of Mountaineering Timeline
  history: [
    {
      year: "1786",
      title: "The Birth of Alpinism - Mont Blanc",
      desc: "Jacques Balmat and Michel-Gabriel Paccard made the historic first ascent of Mont Blanc (4,808 m), widely recognized as the birth of modern mountaineering and the dawn of glacial exploration.",
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-flag-checkered",
      category: "Early Pioneers",
      highlight: "Chamonix Valley, Alps"
    },
    {
      year: "1854 – 1865",
      title: "The Golden Age of Alpinism",
      desc: "Commenced with Alfred Wills climbing the Wetterhorn and culminated in Edward Whymper's fateful 1865 ascent of the Matterhorn. Most major Alpine peaks were conquered during this decade of high adventure.",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-mountain-sun",
      category: "Golden Age",
      highlight: "Matterhorn & Swiss Alps"
    },
    {
      year: "1950",
      title: "First 8,000m Peak Conquered - Annapurna I",
      desc: "French climbers Maurice Herzog and Louis Lachenal reached the summit of Annapurna I (8,091 m) without supplemental oxygen, proving 8,000-meter peaks were within human reach despite catastrophic frostbite.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-award",
      category: "Himalayan Era",
      highlight: "Annapurna, Nepal"
    },
    {
      year: "1953",
      title: "First Ascent of Mount Everest (8,848.86 m)",
      desc: "Sir Edmund Hillary of New Zealand and Tenzing Norgay Sherpa of Nepal reached the roof of the world on May 29, 1953, via the South Col route on the legendary British Expedition.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-crown",
      category: "Himalayan Era",
      highlight: "Everest, Nepal/Tibet"
    },
    {
      year: "1978",
      title: "First Oxygenless Ascent of Everest",
      desc: "Reinhold Messner and Peter Habeler shattered medical dogmas by summiting Mount Everest without supplemental bottled oxygen, proving human lungs could survive the brutal hypoxia of the Death Zone.",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-wind",
      category: "Alpine Style Revolution",
      highlight: "Death Zone Pioneer"
    },
    {
      year: "1980 – 1986",
      title: "Polish Ice Warriors - Winter 8000ers",
      desc: "Led by Andrzej Zawada, Krzysztof Wielicki and Leszek Cichy made the first winter ascent of Mount Everest in -40°C hurricane winds, inaugurating the fierce golden age of Polish winter Himalayan exploration.",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-icicles",
      category: "Winter Conquests",
      highlight: "Winter Everest (-40°C)"
    },
    {
      year: "1986",
      title: "First Completion of All 14 8,000m Peaks",
      desc: "Italian legend Reinhold Messner became the first person in human history to stand atop all 14 eight-thousanders, achieving all summits without bottled oxygen and mostly in pure alpine style.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-medal",
      category: "Eight-Thousanders",
      highlight: "All 14 8000ers Clean"
    },
    {
      year: "2019 – 2021",
      title: "Project Possible & Winter K2 Conquest",
      desc: "Nirmal 'Nimsdai' Purja climbed all 14 8,000m peaks in a blistering 6 months and 6 days in 2019. In January 2021, an all-Nepali team made the historic first winter summit of K2, singing their national anthem.",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
      icon: "fa-bolt",
      category: "Modern High Speed Era",
      highlight: "K2 Winter 2021"
    }
  ],

  // 2. Types and Styles of Mountaineering
  typesAndStyles: [
    {
      id: "alpine-style",
      title: "Alpine Style (Fast & Light)",
      subtitle: "The Purest Form of High-Altitude Climbing",
      image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80",
      badge: "Pure Alpinism",
      icon: "fa-feather",
      desc: "Climbers carry all their food, fuel, shelter, and technical gear on their backs from base to summit in a single push without fixed ropes, pre-stocked camps, or supplemental oxygen.",
      pros: [
        "Maximum speed & minimal exposure time",
        "Lowest environmental footprint",
        "High sporting purity & team autonomy"
      ],
      cons: [
        "Zero margin for error in blizzards",
        "Requires peak physical conditioning",
        "Heavy packs on technical vertical ice"
      ],
      famousRoutes: "Eiger North Face, Cassin Ridge on Denali, Gasherbrum IV Shining Wall"
    },
    {
      id: "expedition-style",
      title: "Expedition (Siege) Style",
      subtitle: "Multi-Camp Logistics & Fixed Route Infrastructure",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      badge: "High-Altitude Logistics",
      icon: "fa-tents",
      desc: "Characterized by setting up a string of progressive high camps, fixing kilometers of safety ropes, employing high-altitude Sherpa support, and acclimatizing via rotations up and down.",
      pros: [
        "Higher safety buffer & retreat options",
        "Allows heavier survival gear and medical oxygen",
        "Highest summit success rate on 8000m peaks"
      ],
      cons: [
        "Substantial environmental presence",
        "Extended time spent in avalanche corridors",
        "Massive logistical and monetary investment"
      ],
      famousRoutes: "Everest South Col, K2 Abruzzi Spur, Cho Oyu Normal Route"
    },
    {
      id: "ski-mountaineering",
      title: "Ski Mountaineering (Skimo)",
      subtitle: "Summit Ascents Combined with High-Angle Ski Descents",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      badge: "Fast Descent",
      icon: "fa-person-skiing",
      desc: "Utilizes touring skins and lightweight alpine-touring bindings to skin up glaciers and summits, followed by committing descents down 45° to 55° couloirs and glaciated faces.",
      pros: [
        "Rapid descent avoids afternoon storm warming",
        "Efficient travel over deep crevasse snow bridges",
        "Olympic medal discipline"
      ],
      cons: [
        "Requires expert avalanche evaluation",
        "Heavy ski equipment on mixed rock passages",
        "High consequence falls on icy steep couloirs"
      ],
      famousRoutes: "Haute Route (Chamonix to Zermatt), Denali Orient Express Couloir"
    },
    {
      id: "big-wall-alpine",
      title: "Big Wall Alpine Climbing",
      subtitle: "Multi-Day Vertical Granite & Mixed Walls",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
      badge: "Vertical Slabs",
      icon: "fa-mountain",
      desc: "Scaling thousand-meter vertical rock walls at elevation, sleeping in suspended portaledges bolted into granite cracks, requiring aid climbing and complex hauling systems.",
      pros: [
        "Extreme vertical exposure and rock purity",
        "Allows scaling unclimbed aesthetic faces",
        "Unparalleled technical camaraderie"
      ],
      cons: [
        "Very slow upward progress",
        "Exposed to freezing storms on sheer rock faces",
        "Exhausting haul bag management"
      ],
      famousRoutes: "Trango (Nameless) Tower in Pakistan, Fitz Roy Patagonia, El Capitan"
    },
    {
      id: "winter-mountaineering",
      title: "Winter Mountaineering",
      subtitle: "Sub-Zero Alpine Combat in Hurricane Winds",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80",
      badge: "Extreme Cold",
      icon: "fa-snowflake",
      desc: "Ascending peaks between December and March when temperatures plunge to -45°C, high-velocity jet streams buffet ridgelines, and rock is glazed in hard blue water ice.",
      pros: [
        "Empty mountains with total wilderness solitude",
        "Unmatched psychological and physical test",
        "The highest badge of honor in alpinism"
      ],
      cons: [
        "Extreme risk of frostbite and hypothermia",
        "Short daylight windows require night climbs",
        "Unpredictable winter cyclonic storms"
      ],
      famousRoutes: "Eiger Nordwand Winter, K2 Winter Abruzzi, Scottish Highlands Grade V"
    },
    {
      id: "speed-alpinism",
      title: "Speed Alpinism",
      subtitle: "Ultra-Endurance Single-Day Pushes",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      badge: "Clock Racing",
      icon: "fa-stopwatch",
      desc: "Pioneered by climbers like Ueli Steck and Kilian Jornet, conquering routes that normally take 3 to 4 days in just a few hours through continuous aerobic motion.",
      pros: [
        "Carrying virtually no bivouac weight",
        "Pass through hazard zones in minutes, not hours",
        "Peak physical athletic expression"
      ],
      cons: [
        "No safety buffer if caught in a sudden storm",
        "Inability to self-rescue with minimal gear",
        "Heart rates sustained at maximum threshold"
      ],
      famousRoutes: "Matterhorn Schmid Route in 1h56m, Everest FKT from Basecamp"
    }
  ],

  // 3. Technical Skills and Protocols
  techniques: [
    {
      id: "ropework",
      title: "Glacier Travel & Crevasse Rescue Rigging",
      category: "Glacier Safety",
      summary: "Protocol for traveling roped on active glaciers and executing 3:1 Z-pulley mechanical advantage systems to haul an injured climber out of a crevasse.",
      steps: [
        "Space team members 10 to 12 meters apart on a dynamic rope with intermediate brake knots (butterfly knots) to arrest falls into crevasses.",
        "Immediately execute an ice-axe self-arrest drop if a team member punches through a snow bridge.",
        "Construct a bombproof deadman anchor using a buried snow picket or horizontal ice axe t-slot.",
        "Transfer victim load to anchor via prusik hitch, rig a 3:1 Z-pulley system with micro-traxion pulley, pad lip, and haul smoothly."
      ]
    },
    {
      id: "cramponing",
      title: "French & German Crampon Footwork",
      category: "Ice & Snow Movement",
      summary: "Classic 10-point flat-footing (French technique) vs front-pointing (German technique) on hard blue glacial ice up to 85° steepness.",
      steps: [
        "Flat-Footing (Pied Plat): Keep all 10 base crampon points in contact with the ice by rolling ankles to match slope angle up to 40°.",
        "Hybrid Technique (Pied Troisième): One foot flat-footed for rest and balance, the uphill foot front-pointing for drive.",
        "Front-Pointing (Pied Avant): Drive horizontal front tines perpendicularly into steep ice, keeping heels level or slightly lower than toes.",
        "Ice Axe Positions: Transition from Piolet-Canne (cane) to Piolet-Rampe (ramp) and Piolet-Traction (twin overhead tool pulling)."
      ]
    },
    {
      id: "acclimatization",
      title: "High-Altitude Acclimatization Physiology",
      category: "Medical & Physiology",
      summary: "Structured physiological protocols to stimulate erythropoietin (EPO), prevent Acute Mountain Sickness (AMS), HAPE, and HACE.",
      steps: [
        "Rule of Ascent: Above 3,000 meters, limit sleeping elevation gain to 300 to 500 meters per 24 hours.",
        "Climb High, Sleep Low: Ascend 600m to 800m during peak daytime for hypoxia adaptation, then drop back down to lower camp to sleep.",
        "Hydration Mandate: Drink 4 to 5 liters of electrolyte fluid daily to compensate for hyperventilation and dry arctic air.",
        "Pulse Oximeter Checks: Monitor SpO2 daily; rest if resting heart rate elevates by >20% or oxygen saturation drops under 70%."
      ]
    },
    {
      id: "fixed-ropes",
      title: "Ascender (Jumar) & Descender Fixed Line Technique",
      category: "Himalayan Protocols",
      summary: "Ascending and descending high-angle fixed lines using mechanical toothed ascenders, backup safety lanyards, and figure-eight/ATC descenders.",
      steps: [
        "Connect primary handled ascender (Jumar) above waist level directly to dynamic locking carabiner on harness master point.",
        "Attach secondary safety lanyard (cows tail) to the fixed line above the ascender for dual redundancy.",
        "At each anchor picket or snow bollard, transfer the secondary tether past the anchor FIRST before unhooking the primary ascender.",
        "On descent, use arm wrap technique for low angles, or rig an ATC/figure-8 descender with a prusik autoblock backup for vertical drops."
      ]
    },
    {
      id: "self-arrest",
      title: "Ice Axe Self-Arrest Execution",
      category: "Survival Protocols",
      summary: "Immediate reflex maneuver to arrest a sliding fall on hard snow or ice before reaching terminal velocity.",
      steps: [
        "React in under 1 second: Grasp the adze and pick firmly with dominant hand, shaft gripped near the spike with non-dominant hand.",
        "Roll onto your stomach facing the slope with the axe pressed diagonally across your sternum.",
        "Drive the steel pick progressively into the hard crust near your shoulder, arching back to apply full body weight over the pick.",
        "Kick feet wide apart and lift crampons UP away from the snow to prevent the front points from catching and causing violent cartwheels."
      ]
    },
    {
      id: "weather-eval",
      title: "Barometric Altimetry & Alpine Weather Reading",
      category: "Route Navigation",
      summary: "Interpreting rapid pressure drops, lenticular clouds, and wind shifts that signal incoming cyclonic storms.",
      steps: [
        "Calibrate barometric altimeter at known camps; a sudden elevation increase of >100m while stationary indicates a severe falling barometer.",
        "Watch for altocumulus lenticularis (lens-shaped clouds) capping peaks, indicating high-altitude jet stream winds exceeding 100 km/h.",
        "Monitor wind direction shifts: In the Northern Hemisphere, backing winds (shifting counter-clockwise) indicate advancing frontal depressions.",
        "Establish non-negotiable turnaround times (e.g. 13:00 PM) regardless of proximity to the summit to avoid descending in night storms."
      ]
    }
  ],

  // 4. Shelters and Camps
  shelters: [
    {
      title: "4-Season Geodesic Expedition Domes",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
      rating: "Wind Resistance: 130 km/h | Weight: 4.5 - 6.0 kg",
      badge: "Basecamp & High Camp Gold Standard",
      icon: "fa-campground",
      desc: "Engineered with intersecting aircraft-grade aluminum poles creating rigid triangular geodesic dome structures capable of withstanding heavy blizzard snow loads and gale-force jet stream winds.",
      features: [
        "Tear-resistant silicone-coated ripstop nylon",
        "Heavy snow skirts to weigh edges down with snow blocks",
        "Internal gear lofts and dual vestibules for melting snow"
      ]
    },
    {
      title: "Bivy Sacks & Assault Shelters",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      rating: "Weight: 450 - 900 g | Deployment: < 60 seconds",
      badge: "Ultralight Alpine Pushes",
      icon: "fa-person-shelter",
      desc: "Waterproof-breathable eVent or Gore-Tex single-person emergency envelope designed for unplanned nights on tiny rock ledges or fast-and-light summit ridge pushes.",
      features: [
        "Ultralight footprint fits on 60cm wide rock perches",
        "Built-in bug netting and storm hood breathing tube",
        "Reinforced tie-in loop allows clipping into wall anchors"
      ]
    },
    {
      title: "Snow Caves & Quinzee Shelters",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      rating: "Internal Temp: Constant 0°C to +2°C during -40°C blizzards",
      badge: "Ultimate Emergency Thermal Haven",
      icon: "fa-igloo",
      desc: "Hand-dug chambers excavated into deep wind-drifted snow banks or bergschrunds. Snow is an extraordinary insulator that preserves lifesaving interior warmth.",
      features: [
        "Entrance dug lower than sleeping shelf to trap rising warm air",
        "Angled domed ceiling prevents dripping condensation",
        "Mandatory 45° ventilation chimney kept clear of drifting snow"
      ]
    },
    {
      title: "High-Altitude Alpine Huts & Refuges",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
      rating: "Capacity: 20 - 120 climbers | Elevation: Up to 4,362 m",
      badge: "Historic European Alpinism",
      icon: "fa-house-chimney-window",
      desc: "Permanent mountain structures perched on knife-edge ridges (e.g. Solvay Hut on Matterhorn, Goûter Hut on Mont Blanc, Margherita Hut on Monte Rosa).",
      features: [
        "Solar photovoltaic power and rainwater snow-melt catchment",
        "Radio communication link with mountain rescue services",
        "Drying rooms for crampons, boots, and wet technical outerwear"
      ]
    },
    {
      title: "Big Wall Portaledges",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
      rating: "Load Rating: 350 kg | Tensile Aircraft Frame",
      badge: "Vertical Suspension",
      icon: "fa-bed",
      desc: "Suspended hanging tent systems featuring tubular aluminum perimeter frames and heavy nylon beds, designed to hang from single bolt anchors on vertical granite.",
      features: [
        "Integrated six-point suspension webbing with spreader rings",
        "Storm fly stormproof cocoon with welded urethane windows",
        "Dedicated anchor haul bag for high-angle wall hauling"
      ]
    }
  ],

  // 5. Objective & Subjective Hazards
  hazards: [
    {
      name: "Avalanches (Slab & Loose Snow)",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80",
      type: "Objective Hazard",
      severity: "Fatal Threat",
      icon: "fa-burst",
      color: "danger",
      desc: "Rapid downhill flows of snow triggered by wind loading, rapid temperature spikes, or weight of climbers. Wind slab avalanches account for over 80% of mountaineering avalanche fatalities.",
      mitigation: "Check regional avalanche bulletin, carry beacon/shovel/probe, analyze snowpack layers via pit tests, travel on ridge lines rather than open convex 30°-45° slopes."
    },
    {
      name: "Crevasses & Serac Collapses",
      image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=800&q=80",
      type: "Objective Hazard",
      severity: "High Hazard",
      icon: "fa-water-ladder",
      color: "danger",
      desc: "Deep chasms in glaciers caused by ice movement over bedrock, often hidden beneath thin snow bridges. Seracs are massive towers of glacial ice that can collapse without any acoustic warning.",
      mitigation: "Always travel roped on glaciers; cross before solar radiation warms snow bridges; never camp or rest in active serac fall zones (e.g., Khumbu Icefall)."
    },
    {
      name: "Acute Altitude Sickness (AMS, HAPE, HACE)",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      type: "Physiological Hazard",
      severity: "Critical",
      icon: "fa-lungs",
      color: "warning",
      desc: "Hypoxia caused by low atmospheric pressure. High Altitude Pulmonary Edema (fluid in lungs) and High Altitude Cerebral Edema (brain swelling) are lethal within hours if untreated.",
      mitigation: "Adhere to acclimatization pacing, carry Diamox (Acetazolamide) and Dexamethasone, carry portable Gamow hyperbaric bag, descend immediately at first signs of ataxia."
    },
    {
      name: "Rockfall & Icefall",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      type: "Objective Hazard",
      severity: "High Hazard",
      icon: "fa-gem",
      color: "danger",
      desc: "Loose stones dislodged by melting permafrost, diurnal thermal expansion, or climbers above. Accelerates to fatal bullet speeds down mountain couloirs.",
      mitigation: "Wear UIAA-certified climbing helmets; ascend couloirs in pre-dawn freezing hours; cross bowling alleys quickly one climber at a time."
    },
    {
      name: "Hypothermia & Severe Frostbite",
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      type: "Environmental Hazard",
      severity: "High Hazard",
      icon: "fa-temperature-arrow-down",
      color: "info",
      desc: "Core body temperature dropping below 35°C and tissue freezing in wind-chills approaching -50°C. Constriction of peripheral blood vessels leads to necrosis in fingers, toes, and nose.",
      mitigation: "Wear triple insulated mountaineering boots; carry chemical hand warmers; never remove gloves in freezing winds; use oxygen to maintain blood perfusion."
    },
    {
      name: "Summit Fever & Decision Fatigue",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80",
      type: "Subjective Hazard",
      severity: "Critical",
      icon: "fa-brain",
      color: "warning",
      desc: "Psychological trap where climbers prioritize reaching the summit over their own survival, ignoring deteriorating storms, depleted oxygen reserves, and strict turnaround times.",
      mitigation: "Set rigid, non-negotiable turnaround times with guides; assign designated safety veto power to teammates; remember that reaching the summit is only halfway."
    }
  ],

  // 6. World Records & Hall of Fame
  records: [
    {
      record: "Fastest Ascent of all 14 Eight-Thousanders",
      holder: "Kristin Harila & Tenjen Sherpa (2023) / Nirmal Purja (2019)",
      achievement: "92 Days (Kristin & Tenjen) | 189 Days (Nimsdai)",
      location: "Himalayas & Karakoram",
      year: "2023",
      category: "8000m",
      details: "Shattered previous multi-year records by climbing Shishapangma, Cho Oyu, Everest, K2, Annapurna, and 9 others in a single continuous seasonal whirlwind."
    },
    {
      record: "Most Summits of Mount Everest",
      holder: "Kami Rita Sherpa",
      achievement: "30 Successful Summits (as of May 2024)",
      location: "Mount Everest (8,848.86 m)",
      year: "2024",
      category: "Everest",
      details: "Known as the 'Everest Man', the legendary Nepali Sherpa guide first stood atop Everest in 1994 and has guided expeditions safely to the top for three continuous decades."
    },
    {
      record: "First Oxygenless Ascent of All 14 8000ers",
      holder: "Reinhold Messner",
      achievement: "14 Peaks Solo / Alpine Style Without Supplemental O2",
      location: "Global 8,000m Peaks",
      year: "1986",
      category: "8000m",
      details: "Completed between 1970 and 1986, establishing the pinnacle benchmark of modern sporting purity in high-altitude mountaineering."
    },
    {
      record: "First Winter Ascent of K2 (8,611 m)",
      holder: "Nirmal Purja, Mingma G, Gelje Sherpa & 7-Man Team",
      achievement: "Winter K2 Conquered (-50°C Wind Chill)",
      location: "Karakoram, Pakistan",
      year: "2021",
      category: "Winter",
      details: "Solved the last great remaining problem in world mountaineering on January 16, 2021, when ten Nepali climbers joined hands 10 meters before the summit."
    },
    {
      record: "First Woman to Summit All 14 8000ers Without Oxygen",
      holder: "Gerlinde Kaltenbrunner",
      achievement: "All 14 8000ers Clean Without Bottled Oxygen",
      location: "Himalayas & Karakoram",
      year: "2011",
      category: "8000m",
      details: "Austrian alpinist crowned her extraordinary career by summiting K2 via the demanding North Pillar from the Chinese side without supplemental oxygen."
    },
    {
      record: "Fastest Seven Summits Completion",
      holder: "Colin O'Brady",
      achievement: "131 Days (Explorers Grand Slam Record)",
      location: "Seven Continental Summits",
      year: "2016",
      category: "Seven Summits",
      details: "Summited Everest, Aconcagua, Denali, Kilimanjaro, Elbrus, Vinson Massif, and Puncak Jaya in record-shattering speed."
    },
    {
      record: "First Solo Ascent of Mount Everest Without Oxygen",
      holder: "Reinhold Messner",
      achievement: "Solo Push via North Col / Great Couloir in Monsoon",
      location: "Mount Everest, Tibet",
      year: "1980",
      category: "Everest",
      details: "Ascended completely alone during the stormy August monsoon without oxygen or radio communication, hallucinating from extreme hypoxia."
    },
    {
      record: "Matterhorn Speed Ascent Record (Hörnli Ridge)",
      holder: "Andreas Steindl",
      achievement: "3 Hours, 59 Minutes (Zermatt to Summit and Back)",
      location: "Matterhorn (4,478 m), Switzerland",
      year: "2018",
      category: "Speed",
      details: "Sprinted 2,860 vertical meters from Zermatt church square to the Matterhorn summit cross and returned in under 4 hours."
    },
    {
      record: "First Woman to Summit K2 in Winter",
      holder: "Kristin Harila",
      achievement: "K2 Winter Summit — 1st Female Ascent",
      location: "K2 (8,611 m), Karakoram, Pakistan",
      year: "2023",
      category: "Winter",
      details: "Norwegian mountaineer Kristin Harila became the first woman to stand atop K2 in brutal winter conditions, part of her record-breaking campaign to summit all 14 eight-thousanders in a single year."
    },
    {
      record: "Youngest Person to Summit Mount Everest",
      holder: "Jordan Romero",
      achievement: "Summited at Age 13 Years, 10 Months",
      location: "Mount Everest (8,848.86 m), Tibet",
      year: "2010",
      category: "Everest",
      details: "American school student Jordan Romero reached the top of the world via the North Ridge at just 13 years old, becoming the youngest person ever to stand on the highest point on Earth."
    },
    {
      record: "Fastest Ascent of Mount Everest (Solo)",
      holder: "Pemba Dorje Sherpa",
      achievement: "8 Hours, 10 Minutes (Base Camp to Summit)",
      location: "Mount Everest (8,848.86 m), Nepal",
      year: "2004",
      category: "Speed",
      details: "Nepali climbing legend Pemba Dorje Sherpa ascended from Everest Base Camp at 5,364 m to the 8,848 m summit in just over 8 hours, a speed record that remains unbroken over two decades later."
    },
    {
      record: "First Blind Person to Summit Mount Everest",
      holder: "Erik Weihenmayer",
      achievement: "First Blind Climber to Reach the Roof of the World",
      location: "Mount Everest (8,848.86 m), Nepal",
      year: "2001",
      category: "Everest",
      details: "American adventurer Erik Weihenmayer, who lost his sight at 13, reached the summit of Everest on May 25, 2001, and went on to become the first blind person to complete the Seven Summits by 2002."
    },
    {
      record: "Longest Distance Ski Descent from Himalayan Peak",
      holder: "Davo Karničar",
      achievement: "Non-Stop Ski from Everest Summit to Base Camp (12 km)",
      location: "Mount Everest, Nepal",
      year: "2000",
      category: "Speed",
      details: "Slovenian extreme skier Davo Karničar skied without removing his skis from the 8,848 m summit of Everest all the way down to Base Camp in approximately 5 hours — the most extreme ski run ever completed."
    },
    {
      record: "First Woman to Summit All 14 Eight-Thousanders",
      holder: "Oh Eun-sun",
      achievement: "All 14 × 8,000m Peaks Completed",
      location: "Himalayas & Karakoram",
      year: "2010",
      category: "8000m",
      details: "South Korean climber Oh Eun-sun became the first woman to complete all 14 eight-thousanders when she summited Annapurna I on April 27, 2010 — a decade-long quest that redefined women's high-altitude mountaineering."
    },
    {
      record: "First Winter Ascent of Annapurna I",
      holder: "Adam Bielecki & Jacek Czech",
      achievement: "Annapurna I Winter Climb (-40°C)",
      location: "Annapurna I (8,091 m), Nepal",
      year: "2023",
      category: "Winter",
      details: "Polish mountaineers Adam Bielecki and Jacek Czech made the historic first winter ascent of Annapurna I — the last 8,000m peak without a winter ascent — completing the final chapter of Himalayan winter climbing history."
    },
    {
      record: "Most Ascents of K2",
      holder: "Sher Khan Wazir",
      achievement: "7 Verified Summit Ascents of K2",
      location: "K2 (8,611 m), Karakoram, Pakistan",
      year: "2024",
      category: "8000m",
      details: "Pakistani high-altitude porter Sher Khan Wazir has reached the summit of the world's most dangerous mountain seven times — more than any other person in history — demonstrating unmatched mastery of the Savage Mountain."
    },
    {
      record: "Fastest Ascent of the Seven Summits",
      holder: "Kristin Harila",
      achievement: "Seven Summits in 31 Days",
      location: "Seven Continental Summits",
      year: "2023",
      category: "Seven Summits",
      details: "Norwegian mountaineer Kristin Harila smashed the Seven Summits speed record en route to her overall 14 eight-thousanders campaign, completing all seven continental high points in just 31 days."
    },
    {
      record: "First Ascent of Everest via New Northeast Ridge Route",
      holder: "Japanese Alpine Club Team",
      achievement: "Brand-New Technical Route on Everest",
      location: "Mount Everest, Tibet",
      year: "1995",
      category: "Everest",
      details: "A bold six-member Japanese team pioneered a brand-new line up the formidable Northeast Ridge of Everest, adding a technically demanding route to the mountain's list of established lines."
    },
    {
      record: "Oldest Person to Summit Mount Everest",
      holder: "Yuichiro Miura",
      achievement: "Summited at Age 80 Years, 224 Days",
      location: "Mount Everest (8,848.86 m), Nepal",
      year: "2013",
      category: "Everest",
      details: "Japanese ski mountaineer Yuichiro Miura reached the top of the world at age 80, becoming the oldest person ever to summit Everest — an extraordinary feat after surviving two heart surgeries in the preceding years."
    },
    {
      record: "First Winter Ascent of Nanga Parbat",
      holder: "Simone Moro, Denis Urubko & Cory Richards",
      achievement: "Nanga Parbat Winter Summit — First Winter Climb",
      location: "Nanga Parbat (8,126 m), Pakistan",
      year: "2016",
      category: "Winter",
      details: "Three elite alpinists battled ferocious blizzards and -50°C windchills to achieve the first-ever winter ascent of Nanga Parbat, one of the most coveted remaining prizes in mountaineering at the time."
    },
    {
      record: "Fastest Descent of Mont Blanc",
      holder: "Kilian Jornet",
      achievement: "Chamonix to Mont Blanc Summit & Back in 4h 57m",
      location: "Mont Blanc (4,808 m), France",
      year: "2013",
      category: "Speed",
      details: "Spanish ultrarunner and mountain athlete Kilian Jornet set the outright speed record for Mont Blanc, ascending and descending the highest peak in the Alps via the Goûter route in under 5 hours."
    },
    {
      record: "First Completion of Explorer's Grand Slam",
      holder: "Park Young-Seok",
      achievement: "14 Eight-Thousanders + North & South Poles + 7 Summits",
      location: "Global Expeditions",
      year: "2005",
      category: "Seven Summits",
      details: "South Korean adventurer Park Young-Seok became the first person ever to complete the triple challenge of the Explorer's Grand Slam — climbing all 14 eight-thousanders, all seven continental summits, and trekking to both the North and South Poles."
    },
    {
      record: "First 8,000m Peak Climbed Without Oxygen (Modern Era)",
      holder: "Maurice Herzog & Louis Lachenal",
      achievement: "Annapurna I First Ascent Without Supplemental O2",
      location: "Annapurna I (8,091 m), Nepal",
      year: "1950",
      category: "8000m",
      details: "French climbers Maurice Herzog and Louis Lachenal made the first-ever ascent of any 8,000m peak entirely without supplemental oxygen, proving the human body could survive extreme hypoxia at altitude — a landmark moment in high-altitude physiology."
    },
    {
      record: "Speed Record — Everest Base Camp to Summit",
      holder: "Lakpa Gelu Sherpa",
      achievement: "Base Camp to Summit in 10 Hours, 56 Minutes",
      location: "Mount Everest (8,848.86 m), Nepal",
      year: "2003",
      category: "Speed",
      details: "Veteran Sherpa guide Lakpa Gelu Sherpa ascended from Everest Base Camp (5,364 m) to the summit in under 11 hours via the Southeast Ridge, setting a supported speed record that stood for over a decade."
    }
  ],

  // 7. Global Mountaineering Clubs & Organizations
  organizations: [
    {
      id: "alpine-ascents",
      name: "Alpine Ascents International HQ",
      founded: 1986,
      city: "Seattle",
      country: "USA",
      lat: 47.6062,
      lng: -122.3321,
      address: "109 W John St, Seattle, WA 98119, USA",
      type: "Commercial & Guiding Pioneer",
      focus: "Premier 7 Summits expeditions, Everest, Denali, mountaineering schools.",
      website: "https://www.alpineascents.com",
      phone: "+1 (206) 378-1427"
    },
    {
      id: "the-alpine-club",
      name: "The Alpine Club (UK)",
      founded: 1857,
      city: "London",
      country: "United Kingdom",
      lat: 51.5273,
      lng: -0.0825,
      address: "55 Charlotte Road, London EC2A 3QF, UK",
      type: "World's First Mountaineering Club",
      focus: "Pioneered the Golden Age of Alpinism; archive of global exploratory expeditions.",
      website: "https://www.alpine-club.org.uk",
      phone: "+44 20 7613 0755"
    },
    {
      id: "club-alpin-francais",
      name: "Club Alpin Français (FFCAM)",
      founded: 1874,
      city: "Chamonix / Paris",
      country: "France",
      lat: 45.9237,
      lng: 6.8694,
      address: "136 Rue Paul Payot, 74400 Chamonix-Mont-Blanc, France",
      type: "National Alpine Federation",
      focus: "Manages over 120 Mont Blanc and Alps refuges; certified alpine training.",
      website: "https://www.ffcam.fr",
      phone: "+33 4 50 53 00 88"
    },
    {
      id: "sac-cas",
      name: "Swiss Alpine Club (SAC)",
      founded: 1863,
      city: "Bern",
      country: "Switzerland",
      lat: 46.9480,
      lng: 7.4474,
      address: "Monbijoustrasse 61, 3007 Bern, Switzerland",
      type: "National Alpine Federation",
      focus: "Guardian of the Swiss Alps, 153 huts, route safety topography and rescue.",
      website: "https://www.sac-cas.ch",
      phone: "+41 31 370 18 18"
    },
    {
      id: "club-alpino-italiano",
      name: "Club Alpino Italiano (CAI)",
      founded: 1863,
      city: "Milan / Turin",
      country: "Italy",
      lat: 45.4642,
      lng: 9.1900,
      address: "Via Petrella 19, 20124 Milano, Italy",
      type: "National Alpine Federation",
      focus: "Pioneered K2 1954 conquest; trail maintenance across the Dolomites and Alps.",
      website: "https://www.cai.it",
      phone: "+39 02 2057241"
    },
    {
      id: "american-alpine-club",
      name: "American Alpine Club (AAC)",
      founded: 1902,
      city: "Golden, Colorado",
      country: "USA",
      lat: 39.7555,
      lng: -105.2211,
      address: "710 10th St #100, Golden, CO 80401, USA",
      type: "National Mountaineering Body",
      focus: "Publisher of American Alpine Journal, rescue insurance, advocacy for public lands.",
      website: "https://americanalpineclub.org",
      phone: "+1 (303) 384-0110"
    },
    {
      id: "nepal-mountaineering-assoc",
      name: "Nepal Mountaineering Association (NMA)",
      founded: 1973,
      city: "Kathmandu",
      country: "Nepal",
      lat: 27.7172,
      lng: 85.3240,
      address: "Nagswo-Bhotebahal, Kathmandu, Nepal",
      type: "Himalayan Regulatory Authority",
      focus: "Issues trekking peak climbing permits, Sherpa mountaineering school training.",
      website: "https://www.nepalmountaineering.org",
      phone: "+977 1 4434525"
    },
    {
      id: "alpine-club-canada",
      name: "Alpine Club of Canada (ACC)",
      founded: 1906,
      city: "Canmore, Alberta",
      country: "Canada",
      lat: 51.0890,
      lng: -115.3590,
      address: "201 Indian Flats Rd, Canmore, AB T1W 2T8, Canada",
      type: "National Mountaineering Club",
      focus: "Extensive backcountry hut network in Canadian Rockies, ice climbing schools.",
      website: "https://www.alpineclubofcanada.ca",
      phone: "+1 (403) 678-3200"
    },
    {
      id: "uiaa",
      name: "International Climbing and Mountaineering Federation (UIAA)",
      founded: 1932,
      city: "Bern",
      country: "International",
      lat: 46.9470,
      lng: 7.4441,
      address: "Monbijoustrasse 61, Postfach, 3000 Bern 14, Switzerland",
      type: "Global Governing Body",
      focus: "Sets international safety certification standards for climbing gear, ethics & medical standards.",
      website: "https://theuiaa.org",
      phone: "+41 31 370 18 28"
    },
    {
      id: "himalayan-club",
      name: "The Himalayan Club",
      founded: 1928,
      city: "Mumbai / New Delhi",
      country: "India",
      lat: 18.9220,
      lng: 72.8347,
      address: "Post Bag 1905, Fort, Mumbai 400 001, India",
      type: "Exploratory Institution",
      focus: "Himalayan Journal publication; exploratory research across Garhwal and Karakoram.",
      website: "https://www.himalayanclub.org",
      phone: "+91 22 2491 2229"
    }
  ],

  // 8. Verified Summit Success Stories
  successStories: [
    {
      title: "100% Team Summit on Everest South Col",
      subtitle: "Season 2024 Expeditions Success Record",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      summit: "Mount Everest (8,848.86 m)",
      duration: "62 Days Expedition",
      teamSize: "9 Climbers, 12 Sherpa Sirdars",
      quote: "Standing on top of the world at 06:15 AM as the sun cast Everest's giant pyramid shadow across the Tibetan plateau was the most sacred moment of my life.",
      client: "Dr. Marcus Vance, Seattle USA",
      highlights: [
        "100% safety record with zero frostbite incidents",
        "Full medical oxygen support with 4L/min flow regulation",
        "Clean descent through Khumbu Icefall in daylight"
      ]
    },
    {
      title: "Alpine Purity on the Denali West Buttress",
      subtitle: "Unassisted Sled Haul & High Basin Push",
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80",
      summit: "Denali (6,190 m), Alaska Range",
      duration: "21 Days Glacial Traverse",
      teamSize: "6 Climbers, 2 IFMGA Guides",
      quote: "Hauling 60kg sleds across the Kahiltna glacier tested every shred of mental stamina. But standing on the summit ridge with 360 degrees of Alaskan wilderness was pure euphoria.",
      client: "Elena Rostova, Zurich Switzerland",
      highlights: [
        "Self-contained snow cave shelter at 17,200ft High Camp",
        "Ascent of the fixed lines on the Autobahn ridge",
        "Completed full Leave-No-Trace Clean Mountain protocol"
      ]
    },
    {
      title: "Matterhorn Hörnli Ridge Lightning Ascent",
      subtitle: "Technical Precision in the Swiss Pennine Alps",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      summit: "Matterhorn (4,478 m), Zermatt",
      duration: "4 Days Technical Camp",
      teamSize: "2 Climbers, 1 Lead Guide",
      quote: "Moving by headlamp on the Solvay slabs with thousands of meters of black air below is something you never forget. Alpine Ascents guides are masters of their craft.",
      client: "Julian Thorne, London UK",
      highlights: [
        "1:1 Guide-to-Climber ratio on technical Grade IV mixed rock",
        "Sunrise arrival at the Saint Bernard summit statue",
        "Safe return to Hörnli Hut before midday warming"
      ]
    },
    {
      title: "Aconcagua 360° Polish Glacier Traverse",
      subtitle: "High-Altitude Trek to the Roof of the Americas",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      summit: "Aconcagua (6,961 m), Andes",
      duration: "18 Days Expedition",
      teamSize: "8 Climbers, 3 Guides",
      quote: "The notorious Viento Blanco winds roared at 90 km/h, but our camp discipline held. Standing atop the highest point outside the Himalayas was a triumph.",
      client: "Carlos Mendoza, Santiago Chile",
      highlights: [
        "Traverse of the high-angle Guanacos Valley",
        "Summit push via the demanding Canaleta couloir",
        "Perfect acclimatization schedule with zero AMS cases"
      ]
    }
  ],

  // 9. Material Advances & Innovations
  innovations: [
    {
      title: "Gore-Tex Pro & Electrospun Nanofiber Membranes",
      category: "Technical Apparel",
      icon: "fa-shield-halved",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80",
      desc: "Modern multi-layer membranes boast hydrostatic head ratings over 28,000mm while allowing microscopic water vapor to escape during strenuous aerobic ice climbing, eliminating internal sweating that leads to hypothermia.",
      impact: "Reduced hypothermia instances by 64% on high-altitude storm descents."
    },
    {
      title: "Carbon Fiber & Forged Titanium Crampons",
      category: "Hardware Engineering",
      icon: "fa-bolt-lightning",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      desc: "Replacing traditional heavy chromoly steel with forged titanium alloy front points coupled with carbon fiber sole stabilization bars, cutting footwear weight by over 450 grams per foot.",
      impact: "Preserves vital cardiovascular energy over 12-hour high-altitude summit pushes."
    },
    {
      title: "Closed-Circuit Pulse Oxygen Delivery Systems",
      category: "Life Support",
      icon: "fa-mask-ventilator",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      desc: "Smart demand-valve regulators sync with climber breath cadence, providing concentrated oxygen only on inhalation, tripling the effective lifespan of lightweight carbon-fiber composite cylinders.",
      impact: "Reduces cylinder load on climbers in the Death Zone from 14kg to under 5kg."
    },
    {
      title: "Avalanche Airbag Systems (Supercapacitor Driven)",
      category: "Avalanche Safety",
      icon: "fa-parachute-box",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80",
      desc: "Modern electronic airbags employ ultra-fast radial fans powered by supercapacitors instead of compressed gas canisters, allowing multiple practice deployments and airline travel clearance.",
      impact: "Increases avalanche burial survival probability from 52% to over 89%."
    },
    {
      title: "Satellite Two-Way SOS & Real-Time LiDAR Topography",
      category: "Comms & Navigation",
      icon: "fa-satellite",
      image: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=800&q=80",
      desc: "Pocket-sized Iridium satellite communicators provide global two-way SOS dispatch and real-time cm-accuracy terrain hazard mapping on high-contrast AMOLED heads-up displays.",
      impact: "Search and rescue response times slashed from 36 hours to under 4 hours."
    }
  ],

  // 10. General Safety Guidelines & Interactive Checklist
  guidelines: {
    goldenRules: [
      {
        title: "Climb High, Sleep Low",
        detail: "Ascend during the daytime to acclimatize your lungs and bloodstream to reduced oxygen, then descend 300 to 500 meters to sleep."
      },
      {
        title: "Never Split The Rope Team",
        detail: "On glaciated or exposed alpine terrain, team members must remain linked and communicate every pace and change in terrain."
      },
      {
        title: "Honor The 13:00 PM Turnaround Rule",
        detail: "Regardless of how close the summit appears, turning back by 13:00 PM is mandatory to avoid descending through darkness and afternoon storms."
      },
      {
        title: "Maintain Constant 4-Liter Hydration",
        detail: "High-altitude hyperventilation leaches moisture rapidly; drink clean melted snow with electrolytes constantly to prevent blood thickening."
      },
      {
        title: "Leave No Trace (Mountain Ethics)",
        detail: "Carry out all human waste, packaging, and oxygen cylinders. Leave the alpine sanctuary cleaner than you found it for future generations."
      }
    ],
    distressSignal: {
      soundFlashes: 6,
      interval: "Equally spaced in 1 minute, followed by 1 minute silence, then repeat.",
      reply: "Search & rescue response is 3 signals per minute, repeated."
    },
    checklist: [
      { id: "c1", category: "Footwear & Hardware", item: "Double/Triple insulated mountaineering boots", required: true },
      { id: "c2", category: "Footwear & Hardware", item: "10 or 12-point steel crampons with anti-balling plates", required: true },
      { id: "c3", category: "Footwear & Hardware", item: "Technical ice axe with wrist leash and spike guard", required: true },
      { id: "c4", category: "Hardware & Protection", item: "UIAA climbing harness & locking pear carabiners (x3)", required: true },
      { id: "c5", category: "Hardware & Protection", item: "Climbing helmet with headlamp mounting clips", required: true },
      { id: "c6", category: "Avalanche Rescue", item: "Three-antenna digital avalanche transceiver (457 kHz)", required: true },
      { id: "c7", category: "Avalanche Rescue", item: "Collapsible aluminum snow probe (280cm - 320cm)", required: true },
      { id: "c8", category: "Avalanche Rescue", item: "Metal snow shovel with extendable shaft", required: true },
      { id: "c9", category: "Apparel & Shell", item: "800+ Fill power goose down summit parka with hood", required: true },
      { id: "c10", category: "Apparel & Shell", item: "Gore-Tex Pro waterproof/windproof storm shell jacket & bibs", required: true },
      { id: "c11", category: "Vision & Medical", item: "Category 4 glacier glasses with removable side shields", required: true },
      { id: "c12", category: "Survival & Comms", item: "Satellite GPS messenger / Two-way InReach SOS device", required: true }
    ]
  },

  // 11. Guided Expeditions Catalog
  expeditions: [
    {
      id: "everest",
      name: "Mount Everest South Col Expedition",
      altitude: "8,848.86 m",
      region: "Khumbu Himalayas, Nepal",
      duration: "60 Days",
      difficulty: "Extreme 8,000m",
      basePrice: 48500,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      description: "The ultimate prize in high-altitude mountaineering. Guided via the historic South Col route, featuring the Khumbu Icefall, Lhotse Face, and Hillary Step with 1:1 Sherpa support.",
      highlights: ["Luxury Basecamp geodesic domes", "State-of-the-art oxygen systems", "1:1 Lead Sherpa ratio"]
    },
    {
      id: "denali",
      name: "Denali West Buttress Expedition",
      altitude: "6,190 m",
      region: "Alaska Range, USA",
      duration: "21 Days",
      difficulty: "Strenuous High Arctic",
      basePrice: 11800,
      image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1200&q=80",
      description: "The highest peak in North America. An expedition of pure self-sufficiency hauling sleds across Kahiltna Glacier and ascending fixed lines to high camp.",
      highlights: ["Ski plane glacier landing", "World-class alpine training", "True wilderness expedition"]
    },
    {
      id: "montblanc",
      name: "Mont Blanc Classic Summit & Training",
      altitude: "4,808 m",
      region: "Chamonix Alps, France/Italy",
      duration: "6 Days",
      difficulty: "Advanced Alpine",
      basePrice: 3450,
      image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      description: "The birthplace of mountaineering. Includes comprehensive glacial skills clinic followed by summit push via Goûter Hut and Bosses Ridge.",
      highlights: ["Historic Chamonix base", "Goûter Refuge overnight", "Iconic knife-edge summit crest"]
    },
    {
      id: "matterhorn",
      name: "Matterhorn Hörnli Ridge Climb",
      altitude: "4,478 m",
      region: "Pennine Alps, Switzerland",
      duration: "5 Days",
      difficulty: "Technical Mixed Rock",
      basePrice: 4200,
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      description: "The most iconic mountain silhouette on Earth. Highly technical Grade IV rock climbing requiring precise footwork on the Moseley slabs.",
      highlights: ["Strict 1:1 IFMGA guide ratio", "Night headlamp climb", "Solvay emergency hut passage"]
    },
    {
      id: "aconcagua",
      name: "Aconcagua Polish Glacier & 360 Traverse",
      altitude: "6,961 m",
      region: "Mendoza Andes, Argentina",
      duration: "18 Days",
      difficulty: "Extreme Non-Technical",
      basePrice: 5900,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      description: "The highest summit outside the Himalayas. Circumnavigate the mountain through Vacas Valley before tackling the Canaleta couloir.",
      highlights: ["Roof of the Southern Hemisphere", "High-altitude mule baggage support", "Plaza de Mulas basecamp"]
    },
    {
      id: "kilimanjaro",
      name: "Kilimanjaro Lemosho Route Expedition",
      altitude: "5,895 m",
      region: "Tanzania, East Africa",
      duration: "8 Days",
      difficulty: "Moderate High Altitude",
      basePrice: 3800,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      description: "Ascend from tropical rainforest to the arctic summit glaciers of Uhuru Peak on the premier scenic acclimatization route.",
      highlights: ["Barranco Wall scramble", "Stargazing at Stella Point", "98% client summit success rate"]
    }
  ],

  // 12. Informative Documentary & Technique Videos
  videos: [
    {
      title: "Everest Death Zone: The Final 848 Meters",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/L7tuSgafJkc?si=LzZWnbQG1aSzxJNd",
      duration: "14:20",
      category: "Documentary",
      summary: "Cinematic expedition footage following the Alpine Ascents team ascending the Hillary Step at sunrise."
    },
    {
      title: "Mastering Ice Axe Self-Arrest & Crevasse Rescue",
      thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/1lXvWqU4URI?si=eAEXebBDSR3XxZvw",
      duration: "09:45",
      category: "Technical Guide",
      summary: "Field demonstration by senior IFMGA guides showing 3:1 Z-pulley mechanical rigging on glaciated terrain."
    },
    {
      title: "K2 Winter 2021: The Impossible Summit",
      thumbnail: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/nWkzbKyLbL0?si=vipx0hmJi9Kh2FXX",
      duration: "18:10",
      category: "Historic Feat",
      summary: "Inside look at the 10-man Nepali team conquering K2 in -50°C temperatures without frostbite."
    },
    {
      title: "Denali West Buttress: The High Latitude Challenge",
      thumbnail: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/S73sCM7LNak?si=By_ADidEAtK-Y6Mkc",
      duration: "16:35",
      category: "Expedition Film",
      summary: "Hauling expedition sleds across the Kahiltna Glacier and enduring sub-zero storms in Alaska."
    },
    {
      title: "Matterhorn Hörnli Ridge: Pure Alpine Precision",
      thumbnail: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/wPwmueSDznQ?si=8AyH_MQ9ssfa5Zw9",
      duration: "12:15",
      category: "Route Guide",
      summary: "Ascending the famous Swiss knife-edge ridge from Hörnli Hut to the Italian summit cross."
    },
    {
      title: "High Altitude Physiology & HAPE / HACE Survival",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      embedUrl: "https://youtu.be/zmOSz8MbaNM?si=rDngE90ekv3zL2y7",
      duration: "11:50",
      category: "Medical Clinic",
      summary: "Expedition physicians explain the biochemistry of acclimatization and emergency hyperbaric treatment."
    }
  ],

  // 13. High-Definition 4K Alpine Photo Archive (24 Curated Photos)
  gallery: [
    {
      title: "Mount Everest South Col at Dawn",
      category: "summits",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85",
      caption: "Golden alpenglow hitting the summit pyramid of Everest above the Western Cwm.",
      location: "Khumbu, Nepal",
      altitude: "8,848 m"
    },
    {
      title: "K2 Savage Mountain North Ridge",
      category: "summits",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
      caption: "The imposing pyramid of K2 towering over the Godwin-Austen Glacier in the Karakoram.",
      location: "Baltistan, Pakistan",
      altitude: "8,611 m"
    },
    {
      title: "Matterhorn East Face & Hörnli Crest",
      category: "summits",
      src: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85",
      caption: "The majestic four-sided pyramid of the Matterhorn caught in early morning light above Zermatt.",
      location: "Valais, Switzerland",
      altitude: "4,478 m"
    },
    {
      title: "Denali Kahiltna Glacier Landing Strip",
      category: "summits",
      src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=1600&q=85",
      caption: "Ski plane landing on the Southeast Fork of Kahiltna Glacier beneath Mount Hunter.",
      location: "Alaska Range, USA",
      altitude: "6,190 m"
    },
    {
      title: "Mont Blanc Massif & Bosses Ridge",
      category: "summits",
      src: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=85",
      caption: "Climbers ascending the snow dome of Western Europe's highest peak.",
      location: "Chamonix, France",
      altitude: "4,808 m"
    },
    {
      title: "Aconcagua Polish Glacier Panorama",
      category: "summits",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
      caption: "The highest vantage point across the Western and Southern Hemispheres.",
      location: "Mendoza, Argentina",
      altitude: "6,961 m"
    },
    {
      title: "Mount Kilimanjaro Crater Rim",
      category: "summits",
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
      caption: "Uhuru Peak wooden summit sign standing proudly above the Reusch Crater.",
      location: "Tanzania, Africa",
      altitude: "5,895 m"
    },
    {
      title: "Ama Dablam Knife-Edge Ice Crest",
      category: "summits",
      src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=85",
      caption: "The Matterhorn of the Himalayas bathed in blazing sunset orange light.",
      location: "Khumbu Valley, Nepal",
      altitude: "6,812 m"
    },
    {
      title: "Basecamp Domes Under Milky Way",
      category: "shelters",
      src: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=85",
      caption: "Illuminated geodesic expedition tents glowing under the crystalline Himalayan night sky.",
      location: "Everest Basecamp, Nepal",
      altitude: "5,364 m"
    },
    {
      title: "High Camp 17,000ft Wind Shelter",
      category: "shelters",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      caption: "Expedition camp fortified behind carved snow-block blast walls against gale-force gusts.",
      location: "Denali High Basin, Alaska",
      altitude: "5,240 m"
    },
    {
      title: "Historic Solvay Refuge Perch",
      category: "shelters",
      src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85",
      caption: "Emergency mountain hut perched on a narrow ledge 4,000 meters high on the Matterhorn.",
      location: "Hörnli Ridge, Switzerland",
      altitude: "4,003 m"
    },
    {
      title: "Snow Cave Excavation on Glacier",
      category: "shelters",
      src: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=85",
      caption: "Emergency thermal sanctuary carved directly into a deep wind-drifted bergschrund.",
      location: "Kahiltna Glacier, Alaska",
      altitude: "4,300 m"
    },
    {
      title: "Vertical Ice Wall Tooling",
      category: "technical",
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=85",
      caption: "Lead climber driving twin carbon-fiber ice tools into cascading blue glacial waterfall ice.",
      location: "Kandersteg, Switzerland",
      altitude: "2,400 m"
    },
    {
      title: "Roped Glacier Crevasse Crossing",
      category: "technical",
      src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=85",
      caption: "Rope team maintaining 12-meter tension while negotiating a delicate snow bridge.",
      location: "Mer de Glace, France",
      altitude: "3,100 m"
    },
    {
      title: "Deep Glacier Crevasse Descent",
      category: "technical",
      src: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=1600&q=85",
      caption: "Rappelling into deep cobalt blue glacier crevasses for technical rescue simulation.",
      location: "Chamonix Glacier, France",
      altitude: "3,300 m"
    },
    {
      title: "Big Wall Granite Aid Climbing",
      category: "technical",
      src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=85",
      caption: "Ascending vertical granite slabs with micro-cams and mechanical ascenders.",
      location: "Dolomites, Italy",
      altitude: "2,950 m"
    },
    {
      title: "Dusk over the Karakoram Giants",
      category: "landscapes",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
      caption: "Concordia amphitheater with views of Broad Peak, Gasherbrum, and K2.",
      location: "Baltoro Glacier, Pakistan",
      altitude: "4,600 m"
    },
    {
      title: "Glacial Lake & Towering Peaks",
      category: "landscapes",
      src: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1600&q=85",
      caption: "Pristine alpine meltwater turquoise lake reflecting rugged snowbound granite peaks.",
      location: "Banff National Park, Canada",
      altitude: "2,150 m"
    },
    {
      title: "Sunset Alpenglow over Alpine Spires",
      category: "landscapes",
      src: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
      caption: "Brilliant crimson sunset lighting the towering jagged pinnacles of Tre Cime di Lavaredo.",
      location: "Dolomites, Italy",
      altitude: "2,999 m"
    },
    {
      title: "Summit Victory Above Cloud Ocean",
      category: "summits",
      src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=85",
      caption: "Climber standing triumphant on the peak looking across a sea of fluffy stratus clouds.",
      location: "Swiss Alps",
      altitude: "4,150 m"
    },
    {
      title: "High-Altitude Storm Gathering",
      category: "landscapes",
      src: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=1600&q=85",
      caption: "Atmospheric lenticular cloud formation signaling a severe approaching polar front.",
      location: "Patagonia, Chile",
      altitude: "3,100 m"
    },
    {
      title: "Expedition Gear Staging in the Snow",
      category: "technical",
      src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1600&q=85",
      caption: "Meticulous sorting of high-altitude hardware, ropes, and insulated boots before departure.",
      location: "Chamonix Valley, France",
      altitude: "1,035 m"
    },
    {
      title: "Climber on the Summit Ridge at Sunrise",
      category: "summits",
      src: "assets/images/alpine-sunrise-ridge.jpg",
      caption: "A lone mountaineer silhouetted against a blazing golden sunrise, standing atop a knife-edge snow ridge with endless jagged peaks below.",
      location: "Himalayan Range, Nepal",
      altitude: "6,500 m"
    },
    {
      title: "Dawn on the High Glacial Plateau",
      category: "landscapes",
      src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=85",
      caption: "First rays of light piercing the cold arctic mist across endless rolling crevassed snowfields.",
      location: "Bernese Oberland, Switzerland",
      altitude: "3,800 m"
    }
  ]
};

// Guarantee global attachment on window object
if (typeof window !== 'undefined') {
  window.MOUNTAINEERING_DATA = MOUNTAINEERING_DATA;
}

// Support CommonJS export if run in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOUNTAINEERING_DATA;
}
