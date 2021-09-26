let map = L.map('map',{ zoomControl: false }).setView([0, 0], 1);
const API_KEY = '0fa8a305ef454cb1873c2f6c6b4d7f47'
const IP = document.getElementById("IP")

const myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [38, 48],
    iconAnchor: [19, -10],

});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);  



IP.addEventListener('click',(e)=>{
    e.preventDefault
    document.getElementById('modal').style.display = 'none'
})

function setModalInfo(infos){
    
    document.getElementById('ip_address').innerText =infos.ip_address
    document.getElementById('location').innerText =infos.district
    document.getElementById('timezone').innerText =infos.time_zone.name
    document.getElementById('isp').innerText =infos.isp
    document.getElementById('modal').style.display = 'flex' 
}

function setMapLocation(latitude ,longitude,isp){
    
    L.marker([latitude, longitude], {icon: myIcon}).addTo(map)
    .bindPopup(isp)
    .openPopup();
    map.setView([latitude,longitude],13)
}
function handleResponse(res) {
    const ip_address = res.ip
    const isp = res.isp
    const time_zone = res.time_zone 
    const district = res.district
    

    const latitude = res.latitude
    const longitude = res.longitude

    
    setModalInfo({
        ip_address,
        isp,
        time_zone,
        district
    })

    setMapLocation(latitude,longitude,isp)
    
}

document.getElementById("btn_submit").addEventListener("click", function(event){
    event.preventDefault()
    _ipgeolocation.setIPAddress(IP.value)
    _ipgeolocation.getGeolocation(handleResponse,API_KEY);
    
})

