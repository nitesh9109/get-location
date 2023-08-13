async function fetchLocation(IP) {
  const res = await fetch(`https://ipapi.co/${IP}/json`);
  const data = await res.json();
  table.innerHTML = '';
  bindData(data);
}

function getIP(json) {
  inputEle.value = json.ip;
  fetchLocation(json.ip);
}

let table = document.getElementById("myTable");
let btnEle = document.getElementById("btnEle");
let inputEle = document.getElementById("inputEle");

btnEle.addEventListener('click',() => {
    fetchLocation(inputEle.value)
})

function bindData(fetchedData) {
  let ip = document.getElementById("ip");
  ip.innerHTML = fetchedData["ip"];
  for (let fetchedKey in fetchedData) {
    let displayKey = keyMapping[fetchedKey];

    if (!displayKey) {
      continue;
    }

    let row = table.insertRow();
    let keyCell = row.insertCell(0);
    let dataCell = row.insertCell(1);
    keyCell.classList.add("keys");

    if (fetchedKey == "country") {
      keyCell.innerHTML = displayKey;
      dataCell.innerHTML = `${fetchedData[fetchedKey]} | ${fetchedData["country_name"]}`;
      continue;
    }

    if (fetchedKey == "latitude") {
      keyCell.innerHTML = displayKey;
      dataCell.innerHTML = `${fetchedData[fetchedKey]} , ${fetchedData["longitude"]}`;
      continue;
    }

    if (fetchedKey == "timezone") {
      keyCell.innerHTML = displayKey;
      dataCell.innerHTML = `${fetchedData[fetchedKey]} (${fetchedData["utc_offset"]})`;
      continue;
    }

    if (fetchedKey == "currency") {
      keyCell.innerHTML = displayKey;
      dataCell.innerHTML = `${fetchedData[fetchedKey]} (${fetchedData["currency_name"]})`;
      continue;
    }

    if (fetchedKey == "languages") {
      dataCell.classList.add("lang");
    }

    keyCell.innerHTML = displayKey;
    dataCell.innerHTML = fetchedData[fetchedKey];
  }
}

let keyMapping = {
  ip: "IP Address",
  version: "Version",
  city: "City",
  region: "Region",
  postal: "Postal Code",
  country: "Country",
  country_capital: "Capital",
  country_tld: "Domain",
  latitude: "Latitude / Longitude",
  timezone: "Time Zone",
  country_calling_code: "Calling Code",
  languages: "Languages",
  org: "Org",
  currency: "Currency",
};
