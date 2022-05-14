const key = config.API_KEY;

// Input elements
const userInput = document.querySelector("#ip-input");
const submitBtn = document.querySelector("#submit-btn");

// Display elements
const results = document.querySelector(".results");

const ipDisplay = document.querySelector("#address");
const cityDisplay = document.querySelector("#city");
const timezoneDisplay = document.querySelector("#timezone");
const ispDisplay = document.querySelector("#isp");


// ip address from user input
let ipAddress = "";

// get user input
submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    ipAddress = userInput.value;
    
    // fetch IP info with user input
    const getData = async () => {
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ipAddress}`)
        const data = await res.data;

        // Abbreviate state name
        let ipState = abbrState(data.location.region);

        // Set and display searched IP Address
        results.classList.add("show");

        ipDisplay.innerHTML = data.ip;
        cityDisplay.innerHTML = `${data.location.city}, ${ipState} ${data.location.postalCode}`;
        timezoneDisplay.innerHTML = `UTC ${data.location.timezone}`;
        ispDisplay.innerHTML = data.isp;

        // Change map view when location is changed
        map.flyTo([data.location.lat, data.location.lng], 14);
        

        // Add marker to the map when location is found
        const markerIcon = L.icon({
            iconUrl: "images/icon-location.svg",
            iconSize: [40, 50],
        })
        const marker = L.marker([data.location.lat, data.location.lng], {icon: markerIcon}).addTo(map);


        // Change font size of result if too long for container
        if (data.ip.length > 10) {
            ipDisplay.classList.add("shrink");
        } else {
            ipDisplay.classList.remove("shrink");
        }
        if (data.location.city.length > 12) {
            cityDisplay.classList.add("shrink");
        } else {
            cityDisplay.classList.remove("shrink");
        }
        if (data.isp.length > 15) {
            ispDisplay.classList.add("shrink");
        } else {
            ispDisplay.classList.remove("shrink");
        }
    } 
        getData();
    
})


// SET UP LEAFLET MAP

const map = L.map('map').setView([0,0], 3);

L.tileLayer('https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=uQQV4HVr0JQbeMXWUr5w', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);



// FUNCTION TO ABBREVIATE STATE NAME

function abbrState(state){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

            for(let i = 0; i < states.length; i++){
            if(states[i][0] == state){
                return(states[i][1]);
            }
        }    
    
}