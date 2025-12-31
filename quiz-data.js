
const QUIZ_DATA = {
    astronomy: {
        unit: [
            // 30 Question Unit Quiz
            { question: "What is the primary function of a telescope?", options: ["To magnify distant objects", "To measure temperature", "To calculate mass", "To detect sound"], correctAnswer: "To magnify distant objects" },
            { question: "Who was the first to use a telescope for astronomy?", options: ["Isaac Newton", "Galileo Galilei", "Johannes Kepler", "Copernicus"], correctAnswer: "Galileo Galilei" },
            { question: "Which coordinate measures position north or south of the celestial equator?", options: ["Right Ascension", "Declination", "Altitude", "Azimuth"], correctAnswer: "Declination" },
            { question: "What is the brightest star in the night sky?", options: ["Betelgeuse", "Sirius", "Vega", "Polaris"], correctAnswer: "Sirius" },
            { question: "What type of galaxy is the Milky Way?", options: ["Elliptical", "Spiral", "Irregular", "Lenticular"], correctAnswer: "Spiral" },
            { question: "What is the leading theory for the origin of the universe?", options: ["Steady State", "Big Bang", "Oscillating Universe", "String Theory"], correctAnswer: "Big Bang" },
            { question: "About how old is the universe?", options: ["4.5 billion years", "10 billion years", "13.8 billion years", "20 billion years"], correctAnswer: "13.8 billion years" },
            { question: "What is the closest star to the Sun?", options: ["Proxima Centauri", "Sirius", "Alpha Centauri A", "Barnard's Star"], correctAnswer: "Proxima Centauri" },
            { question: "What describes a star's brightness as seen from Earth?", options: ["Absolute magnitude", "Apparent magnitude", "Luminosity", "Flux"], correctAnswer: "Apparent magnitude" },
            { question: "What is the final stage of a low-mass star like our Sun?", options: ["Neutron Star", "Black Hole", "White Dwarf", "Supernova"], correctAnswer: "White Dwarf" },
            { question: "What does Right Ascension measure?", options: ["Eastward distance along celestial equator", "Height above horizon", "Distance from the pole", "North-South position"], correctAnswer: "Eastward distance along celestial equator" },
            { question: "What is the Zenith?", options: ["The point directly below", "The point directly overhead", "The horizon", "The North Pole"], correctAnswer: "The point directly overhead" },
            { question: "Which galaxy is on a collision course with the Milky Way?", options: ["Triangulum", "Andromeda", "Whirlpool", "Sombrero"], correctAnswer: "Andromeda" },
            { question: "What fuels a main sequence star?", options: ["Nuclear Fission", "Chemical Combustion", "Nuclear Fusion", "Gravitational Collapse"], correctAnswer: "Nuclear Fusion" },
            { question: "What is a light-year a measure of?", options: ["Time", "Speed", "Distance", "Brightness"], correctAnswer: "Distance" },
            { question: "What is the Cosmic Microwave Background?", options: ["Radiation from stars", "Leftover heat from the Big Bang", "Radio waves from galaxies", "Solar wind"], correctAnswer: "Leftover heat from the Big Bang" },
            { question: "Who discovered the expansion of the universe?", options: ["Albert Einstein", "Edwin Hubble", "Carl Sagan", "Stephen Hawking"], correctAnswer: "Edwin Hubble" },
            { question: "What are the two main types of optical telescopes?", options: ["Radio and X-ray", "Refractor and Reflector", "Digital and Analog", "Lens and Mirror"], correctAnswer: "Refractor and Reflector" },
            { question: "What is the path of the Sun across the sky called?", options: ["The Equator", "The Ecliptic", "The Meridian", "The Zodiac"], correctAnswer: "The Ecliptic" },
            { question: "Which constellation contains Polaris?", options: ["Ursa Major", "Ursa Minor", "Orion", "Cassiopeia"], correctAnswer: "Ursa Minor" },
            { question: "What happens when a massive star dies?", options: ["It becomes a planet", "It turns into a White Dwarf", "It explodes as a Supernova", "It fades away"], correctAnswer: "It explodes as a Supernova" },
            { question: "What is a nebula?", options: ["A dead star", "A cloud of gas and dust", "A black hole", "A meteor"], correctAnswer: "A cloud of gas and dust" },
            { question: "How many official constellations are there?", options: ["12", "48", "88", "100"], correctAnswer: "88" },
            { question: "The expansion of the universe is...", options: ["Slowing down", "Constant", "Accelerating", "Stopping"], correctAnswer: "Accelerating" },
            { question: "What is the event horizon?", options: ["The edge of a black hole", "The surface of a star", "The center of a galaxy", "The end of the universe"], correctAnswer: "The edge of a black hole" },
            { question: "Which planet has the most extensive ring system?", options: ["Jupiter", "Uranus", "Saturn", "Neptune"], correctAnswer: "Saturn" },
            { question: "What is the term for a star system with two stars?", options: ["Binary system", "Cluster", "Constellation", "Galaxy"], correctAnswer: "Binary system" },
            { question: "What spectral class is the hottest?", options: ["M", "G", "A", "O"], correctAnswer: "O" },
            { question: "What is the study of the origin of the universe called?", options: ["Astrology", "Cosmology", "Geology", "Meteorology"], correctAnswer: "Cosmology" },
            { question: "Dark Matter makes up approximately what percentage of the universe?", options: ["5%", "27%", "68%", "90%"], correctAnswer: "27%" }
        ],
        subsections: {
            item1: [ // Telescopes
                { question: "What type of telescope uses lenses to focus light?", options: ["Reflector", "Refractor", "Catadioptric", "Radio"], correctAnswer: "Refractor" },
                { question: "Who is credited with the first astronomical use of a telescope?", options: ["Newton", "Galileo", "Kepler", "Brahe"], correctAnswer: "Galileo" },
                { question: "What is the main mirror of a reflecting telescope called?", options: ["Secondary mirror", "Primary mirror", "Eyepiece", "Objective lens"], correctAnswer: "Primary mirror" },
                { question: "Which telescope is known for orbiting Earth?", options: ["Keck", "Hubble", "VLT", "Arecibo"], correctAnswer: "Hubble" },
                { question: "What does aperture refer to?", options: ["The length of the tube", "The diameter of the main optic", "The magnification", "The weight"], correctAnswer: "The diameter of the main optic" },
                { question: "What is the disadvantage of refracting telescopes?", options: ["Chromatic aberration", "Spherical aberration", "Coma", "Diffraction"], correctAnswer: "Chromatic aberration" },
                { question: "What does the eyepiece do?", options: ["Collects light", "Magnifies the image", "Tracks stars", "Filters light"], correctAnswer: "Magnifies the image" },
                { question: "Which type of telescope combines lenses and mirrors?", options: ["Newtonian", "Dobsonian", "Catadioptric", "Galilean"], correctAnswer: "Catadioptric" },
                { question: "Radio telescopes detect which type of wave?", options: ["Visible light", "X-rays", "Radio waves", "Gamma rays"], correctAnswer: "Radio waves" },
                { question: "Where is the best place to put a telescope?", options: ["In a city", "Underwater", "High altitude, dry climate", "Near the ocean"], correctAnswer: "High altitude, dry climate" }
            ],
            item2: [ // Position Calculation
                { question: "What is the celestial equivalent of latitude?", options: ["Right Ascension", "Declination", "Azimuth", "Altitude"], correctAnswer: "Declination" },
                { question: "What is the celestial equivalent of longitude?", options: ["Right Ascension", "Declination", "Azimuth", "Altitude"], correctAnswer: "Right Ascension" },
                { question: "The point directly overhead is called the...", options: ["Nadir", "Zenith", "Horizon", "Meridian"], correctAnswer: "Zenith" },
                { question: "Altitude is measured in degrees from the...", options: ["North Pole", "Celestial Equator", "Horizon", "Zenith"], correctAnswer: "Horizon" },
                { question: "Right Ascension is usually measured in...", options: ["Degrees", "Radians", "Hours, Minutes, Seconds", "Meters"], correctAnswer: "Hours, Minutes, Seconds" },
                { question: "The path the Sun traces in the sky is the...", options: ["Equator", "Ecliptic", "Prime Meridian", "Solstice"], correctAnswer: "Ecliptic" },
                { question: "Which coordinate system depends on the observer's location?", options: ["Equatorial", "Horizontal (Alt-Az)", "Galactic", "Ecliptic"], correctAnswer: "Horizontal (Alt-Az)" },
                { question: "0 degrees declination is located at the...", options: ["North Celestial Pole", "South Celestial Pole", "Celestial Equator", "Ecliptic"], correctAnswer: "Celestial Equator" },
                { question: "Azimuth is measured clockwise from...", options: ["North", "East", "South", "West"], correctAnswer: "North" },
                { question: "What is the declination of the North Celestial Pole?", options: ["0°", "45°", "90°", "-90°"], correctAnswer: "90°" }
            ],
            item3: [ // Stars
                { question: "What is the main fuel for a star?", options: ["Helium", "Hydrogen", "Oxygen", "Iron"], correctAnswer: "Hydrogen" },
                { question: "The color of a star indicates its...", options: ["Size", "Distance", "Temperature", "Age"], correctAnswer: "Temperature" },
                { question: "Which spectral type represents the hottest stars?", options: ["M", "G", "O", "B"], correctAnswer: "O" },
                { question: "The sun is a star of which spectral type?", options: ["O", "A", "G", "M"], correctAnswer: "G" },
                { question: "What is the explosion of a massive star called?", options: ["Nova", "Supernova", "Planetary Nebula", "Solar Flare"], correctAnswer: "Supernova" },
                { question: "What is a Pulsar?", options: ["A rotating neutron star", "A binary star", "A variable star", "A white dwarf"], correctAnswer: "A rotating neutron star" },
                { question: "Stars are born in...", options: ["Black holes", "Nebulae", "Supernovae", "Planets"], correctAnswer: "Nebulae" },
                { question: "The Hertzsprung-Russell diagram plots luminosity against...", options: ["Mass", "Temperature", "Distance", "Age"], correctAnswer: "Temperature" },
                { question: "What prevents a white dwarf from collapsing?", options: ["Electron degeneracy pressure", "Neutron degeneracy pressure", "Thermal pressure", "Centrifugal force"], correctAnswer: "Electron degeneracy pressure" },
                { question: "The apparent shift of a star's position due to Earth's orbit is...", options: ["Doppler shift", "Parallax", "Precession", "Refraction"], correctAnswer: "Parallax" }
            ],
            item4: [ // Galaxies
                { question: "What is the shape of the Milky Way?", options: ["Elliptical", "Spiral", "Irregular", "Lenticular"], correctAnswer: "Spiral" },
                { question: "The Andromeda Galaxy is our...", options: ["Satellite galaxy", "Nearest major neighbor", "Farthest neighbor", "Parent galaxy"], correctAnswer: "Nearest major neighbor" },
                { question: "Galaxies are held together by...", options: ["Magnetism", "Electricity", "Gravity", "Strong nuclear force"], correctAnswer: "Gravity" },
                { question: "Which type of galaxy has little gas and dust?", options: ["Spiral", "Irregular", "Elliptical", "Barred Spiral"], correctAnswer: "Elliptical" },
                { question: "What is usually at the center of a large galaxy?", options: ["A Neutron Star", "A Supermassive Black Hole", "A White Dwarf", "A Void"], correctAnswer: "A Supermassive Black Hole" },
                { question: "Edwin Hubble classified galaxies by their...", options: ["Color", "Shape", "Size", "Distance"], correctAnswer: "Shape" },
                { question: "The Magellanic Clouds are examples of...", options: ["Spiral galaxies", "Elliptical galaxies", "Irregular galaxies", "Star clusters"], correctAnswer: "Irregular galaxies" },
                { question: "What prevents galaxies in a cluster from flying apart?", options: ["Dark Energy", "Dark Matter", "Visible Matter", "Cosmic Rays"], correctAnswer: "Dark Matter" },
                { question: "Active Galactic Nuclei (AGN) are powered by...", options: ["Supernovae", "Accretion into black holes", "Nuclear fusion", "Collisions"], correctAnswer: "Accretion into black holes" },
                { question: "The Local Group refers to...", options: ["Our solar system", "The nearest stars", "Our cluster of galaxies", "The entire universe"], correctAnswer: "Our cluster of galaxies" }
            ],
            item5: [ // Cosmology
                { question: "Cosmology is the study of...", options: ["Planets", "Stars", "The Universe as a whole", "Comets"], correctAnswer: "The Universe as a whole" },
                { question: "The universe began with the...", options: ["Big Bang", "Great Expansion", "Cosmic Start", "Genesis"], correctAnswer: "Big Bang" },
                { question: "Hubble's Law states that...", options: ["The universe is shrinking", "The universe is static", "The universe is expanding", "Gravity is constant"], correctAnswer: "The universe is expanding" },
                { question: "The Cosmic Microwave Background is...", options: ["Light from the first stars", "Leftover radiation from the Big Bang", "Radio waves from Earth", "Starlight"], correctAnswer: "Leftover radiation from the Big Bang" },
                { question: "What force is accelerating the expansion of the universe?", options: ["Gravity", "Dark Matter", "Dark Energy", "Electromagnetism"], correctAnswer: "Dark Energy" },
                { question: "The age of the universe is approximately...", options: ["4.5 billion years", "13.8 billion years", "100 billion years", "Infinite"], correctAnswer: "13.8 billion years" },
                { question: "What is the 'observable universe'?", options: ["Everything that exists", "The part of the universe light has had time to reach us from", "The Milky Way", "The Solar System"], correctAnswer: "The part of the universe light has had time to reach us from" },
                { question: "Before the Big Bang, the universe was...", options: ["A vacuum", "A singularity", "A giant star", "Already expanding"], correctAnswer: "A singularity" },
                { question: "Redshift indicates that an object is...", options: ["Moving closer", "Moving away", "Getting hotter", "Getting colder"], correctAnswer: "Moving away" },
                { question: "The most abundant element in the universe is...", options: ["Helium", "Oxygen", "Carbon", "Hydrogen"], correctAnswer: "Hydrogen" }
            ]
        }
    },
    astrophysics: {
        unit: [
            // 30 Question Unit Quiz
            { question: "Kepler's First Law states that orbits are...", options: ["Circles", "Ellipses", "Parabolas", "Lines"], correctAnswer: "Ellipses" },
            { question: "Newton's Universal Law of Gravitation depends on mass and...", options: ["Velocity", "Distance squared", "Time", "Density"], correctAnswer: "Distance squared" },
            { question: "The speed of light in a vacuum is...", options: ["Infinite", "Variable", "Constant", "Zero"], correctAnswer: "Constant" },
            { question: "Which force governs the motion of planets?", options: ["Electromagnetic", "Strong Nuclear", "Gravity", "Weak Nuclear"], correctAnswer: "Gravity" },
            { question: "Spectroscopy allows us to determine a star's...", options: ["Composition", "Exact Age", "Number of planets", "Surface features"], correctAnswer: "Composition" },
            { question: "Redshift is caused by the...", options: ["Zeeman Effect", "Doppler Effect", "Stark Effect", "Photoelectric Effect"], correctAnswer: "Doppler Effect" },
            { question: "General Relativity explains gravity as...", options: ["A force", "Curvature of spacetime", "Particle exchange", "Wave interference"], correctAnswer: "Curvature of spacetime" },
            { question: "Identify the equation for Mass-Energy Equivalence.", options: ["F=ma", "E=mc^2", "p=mv", "V=IR"], correctAnswer: "E=mc^2" },
            { question: "The Schwarzchild radius defines the size of...", options: ["A planet", "A neutron star", "The event horizon of a black hole", "The sun"], correctAnswer: "The event horizon of a black hole" },
            { question: "What breaks light into its component colors?", options: ["Mirror", "Prism", "Lens", "Filter"], correctAnswer: "Prism" },
            { question: "Stars on the Main Sequence balance gravity with...", options: ["Electron degeneracy", "Gas pressure from fusion", "Magnetic fields", "Rotation"], correctAnswer: "Gas pressure from fusion" },
            { question: "A star's luminosity depends on temperature and...", options: ["Distance", "Radius", "Density", "Rotation"], correctAnswer: "Radius" },
            { question: "Who formulated the laws of planetary motion?", options: ["Newton", "Kepler", "Copernicus", "Brahe"], correctAnswer: "Kepler" },
            { question: "Electromagnetic waves with the highest energy are...", options: ["Radio", "Visible", "UV", "Gamma rays"], correctAnswer: "Gamma rays" },
            { question: "The bending of light by gravity is called...", options: ["Reflection", "Refraction", "Gravitational Lensing", "Diffraction"], correctAnswer: "Gravitational Lensing" },
            { question: "Time dilation occurs when...", options: ["Moving at high speeds", "Sleeping", "Far from gravity", "Cold targets"], correctAnswer: "Moving at high speeds" },
            { question: "Black holes emit Hawking radiation due to...", options: ["Classical mechanics", "Quantum effects", "Nuclear fusion", "Chemical reactions"], correctAnswer: "Quantum effects" },
            { question: "The expansion rate of the universe is the...", options: ["Einstein Constant", "Hubble Constant", "Planck Constant", "Newton Constant"], correctAnswer: "Hubble Constant" },
            { question: "Type Ia supernovae are useful as...", options: ["Standard candles", "Fuel sources", "Planetary nebulas", "Black hole seeds"], correctAnswer: "Standard candles" },
            { question: "An absorption spectrum looks like...", options: ["A continuous rainbow", "Bright lines on dark background", "Dark lines on a rainbow", "Monochrome"], correctAnswer: "Dark lines on a rainbow" },
            { question: "According to Newton, for every action there is...", options: ["A stronger reaction", "No reaction", "An equal and opposite reaction", "A delayed reaction"], correctAnswer: "An equal and opposite reaction" },
            { question: "Gravitational waves are ripples in...", options: ["Air", "Water", "Spacetime", "Electromagnetic field"], correctAnswer: "Spacetime" },
            { question: "Escape velocity is the speed needed to...", options: ["Leave a planet's orbit", "Orbit a planet", "Land on a planet", "Enter atmosphere"], correctAnswer: "Leave a planet's orbit" },
            { question: "The Chandrasekhar limit determines the maximum mass of a...", options: ["Black Hole", "Neutron Star", "White Dwarf", "Planet"], correctAnswer: "White Dwarf" },
            { question: "Wien's Law relates temperature to...", options: ["Brightness", "Peak wavelength", "Mass", "Velocity"], correctAnswer: "Peak wavelength" },
            { question: "The singularity of a black hole has...", options: ["Zero density", "Infinite density", "Surface area", "Colors"], correctAnswer: "Infinite density" },
            { question: "Cosmic Inflation refers to...", options: ["Economic rise", "Rapid early expansion of universe", "Expansion of stars", "Growth of galaxies"], correctAnswer: "Rapid early expansion of universe" },
            { question: "Fusion in the sun combines Hydrogen into...", options: ["Helium", "Carbon", "Oxygen", "Iron"], correctAnswer: "Helium" },
            { question: "Which represents the longest wavelength?", options: ["Gamma", "X-ray", "Blue light", "Radio"], correctAnswer: "Radio" },
            { question: "Light behaves as both a...", options: ["Particle and Wave", "Solid and Liquid", "Gas and Plasma", "Proton and Electron"], correctAnswer: "Particle and Wave" }
        ],
        subsections: {
            item1: [ // Newton & Kepler
                { question: "Kepler's First Law states orbits are...", options: ["Circular", "Elliptical", "Parabolic", "Square"], correctAnswer: "Elliptical" },
                { question: "Kepler's Second Law is about...", options: ["Equal areas in equal time", "Action and Reaction", "Gravity strength", "Inertia"], correctAnswer: "Equal areas in equal time" },
                { question: "Kepler's Third Law relates period and...", options: ["Distance", "Mass", "Speed", "Temperature"], correctAnswer: "Distance" },
                { question: "Newton's First Law is also known as...", options: ["Law of Gravity", "Law of Inertia", "Law of Acceleration", "Law of Action"], correctAnswer: "Law of Inertia" },
                { question: "F = ma is Newton's...", options: ["First Law", "Second Law", "Third Law", "Fourth Law"], correctAnswer: "Second Law" },
                { question: "Gravity creates a force of...", options: ["Repulsion", "Attraction", "Friction", "Tension"], correctAnswer: "Attraction" },
                { question: "If mass increases, gravitational force...", options: ["Decreases", "Increases", "Stays same", "Vanishes"], correctAnswer: "Increases" },
                { question: "If distance doubles, gravitational force drops by...", options: ["2", "4", "8", "10"], correctAnswer: "4" },
                { question: "Velocity involves speed and...", options: ["Mass", "Direction", "Time", "Energy"], correctAnswer: "Direction" },
                { question: "Who refined Kepler's laws using physics?", options: ["Galileo", "Newton", "Einstein", "Hubble"], correctAnswer: "Newton" }
            ],
            item2: [ // EM Spectrum
                { question: "Which has the shortest wavelength?", options: ["Radio", "Infrared", "Visible", "Gamma Rays"], correctAnswer: "Gamma Rays" },
                { question: "Visible light is...", options: ["A small part of the spectrum", "Most of the spectrum", "None of the spectrum", "Only red light"], correctAnswer: "A small part of the spectrum" },
                { question: "Frequency is measured in...", options: ["Meters", "Seconds", "Hertz", "Joules"], correctAnswer: "Hertz" },
                { question: "Speed of light (c) equals...", options: ["Frequency x Wavelength", "Energy / Mass", "Distance / Time", "Mass x Acceleration"], correctAnswer: "Frequency x Wavelength" },
                { question: "Blue light has higher energy than...", options: ["Violet light", "Gamma rays", "Red light", "X-rays"], correctAnswer: "Red light" },
                { question: "Spectroscopy splits light using a...", options: ["Lens", "Mirror", "Prism", "Filter"], correctAnswer: "Prism" },
                { question: "Emission lines appear as...", options: ["Dark lines", "Bright lines", "Rainbow", "Black"], correctAnswer: "Bright lines" },
                { question: "Doppler shift towards red means...", options: ["Approaching", "Receding", "Heating up", "Cooling down"], correctAnswer: "Receding" },
                { question: "Infrared is sensed as...", options: ["Sound", "Colors", "Heat", "Vibration"], correctAnswer: "Heat" },
                { question: "Radio waves can penetrate...", options: ["Lead", "Dust clouds", "Stars", "Black holes"], correctAnswer: "Dust clouds" }
            ],
            item3: [ // Stellar Properties
                { question: "Luminosity is the total amount of...", options: ["Light reflected", "Energy radiated per second", "Heat stored", "Mass lost"], correctAnswer: "Energy radiated per second" },
                { question: "Apparent magnitude depends on luminosity and...", options: ["Distance", "Color", "Rotation", "Composition"], correctAnswer: "Distance" },
                { question: "Hottest stars are what color?", options: ["Red", "Yellow", "White", "Blue"], correctAnswer: "Blue" },
                { question: "Coolest stars are what color?", options: ["Blue", "White", "Yellow", "Red"], correctAnswer: "Red" },
                { question: "Radius of a star can be found using...", options: ["Kepler's Law", "Stefan-Boltzmann Law", "Newton's Law", "Hubble's Law"], correctAnswer: "Stefan-Boltzmann Law" },
                { question: "Lower magnitude numbers mean...", options: ["Dimmer object", "Brighter object", "Larger object", "Smaller object"], correctAnswer: "Brighter object" },
                { question: "Absolute magnitude is brightness at...", options: ["1 AU", "10 Parsecs", "100 Light years", "Observation point"], correctAnswer: "10 Parsecs" },
                { question: "Main sequence stars fuse...", options: ["He to C", "H to He", "C to Fe", "Si to Fe"], correctAnswer: "H to He" },
                { question: "Mass determines a star's...", options: ["Orbit", "Evolution and lifespan", "Distance", "Proper motion"], correctAnswer: "Evolution and lifespan" },
                { question: "Who created the spectral classification OBAFGKM?", options: ["Annie Jump Cannon", "Isaac Newton", "Einstein", "Ptolemy"], correctAnswer: "Annie Jump Cannon" }
            ],
            item4: [ // General Relativity
                { question: "General Relativity is a theory of...", options: ["Electromagnetism", "Gravity", "Thermodynamics", "Quantum Mechanics"], correctAnswer: "Gravity" },
                { question: "Mass tells spacetime how to...", options: ["Move", "Curve", "Expand", "Contract"], correctAnswer: "Curve" },
                { question: "Spacetime tells matter how to...", options: ["Move", "Curve", "Explode", "Stop"], correctAnswer: "Move" },
                { question: "What is the result of extreme gravity on light?", options: ["It stops", "It speeds up", "It bends (Lensing)", "It changes color"], correctAnswer: "It bends (Lensing)" },
                { question: "Time near a massive object runs...", options: ["Faster", "Slower", "Backwards", "Randomly"], correctAnswer: "Slower" },
                { question: "The Equivalence Principle links gravity and...", options: ["Acceleration", "Velocity", "Magnetism", "Heat"], correctAnswer: "Acceleration" },
                { question: "A prediction of GR detected in 2015 was...", options: ["Black holes", "Gravitational waves", "Neutrinos", "Dark energy"], correctAnswer: "Gravitational waves" },
                { question: "Precession of which planet's orbit proved GR?", options: ["Mars", "Venus", "Mercury", "Jupiter"], correctAnswer: "Mercury" },
                { question: "According to GR, nothing travels faster than...", options: ["Sound", "Light", "Gravity", "Thoughts"], correctAnswer: "Light" },
                { question: "A wormhole is a theoretical...", options: ["Star", "Shortcut in spacetime", "Planet", "Particle"], correctAnswer: "Shortcut in spacetime" }
            ],
            item5: [ // Big Bang (Kepler File in original, assume mapped to Big Bang)
                { question: "Evidence for the Big Bang includes...", options: ["Static universe", "CMB Radiation", "Shrinking galaxies", "White holes"], correctAnswer: "CMB Radiation" },
                { question: "The CMB is mostly...", options: ["Gamma rays", "Visible light", "Microwaves", "X-rays"], correctAnswer: "Microwaves" },
                { question: "Hubble found that further galaxies move...", options: ["Slower", "Faster", "Sideways", "Backwards"], correctAnswer: "Faster" },
                { question: "Elements formed in Big Bang Nucleosynthesis were...", options: ["Gold and Silver", "Hydrogen and Helium", "Carbon and Oxygen", "Iron and Lead"], correctAnswer: "Hydrogen and Helium" },
                { question: "The Big Bang happened...", options: ["Everywhere at once", "At one point in space", "On Earth", "In the Milky Way"], correctAnswer: "Everywhere at once" },
                { question: "Cosmic Inflation explains...", options: ["Why universe is flat/uniform", "Dark energy", "Black holes", "Star formation"], correctAnswer: "Why universe is flat/uniform" },
                { question: "What was the temperature of early universe?", options: ["Absolute zero", "Freezing", "Extremely hot", "Room temperature"], correctAnswer: "Extremely hot" },
                { question: "Recombination allowed...", options: ["Stars to die", "Light to travel freely", "Planets to form", "Gravity to stop"], correctAnswer: "Light to travel freely" },
                { question: "The 'Dark Ages' of the universe had...", options: ["No stars yet", "Too many stars", "Black holes only", "Aliens"], correctAnswer: "No stars yet" },
                { question: "The geometry of the universe is thought to be...", options: ["Closed", "Open", "Flat", "Sphere"], correctAnswer: "Flat" }
            ]
        }
    }
};

// Expose data globally
window.QUIZ_DATA = QUIZ_DATA;
