/*List of all handles to <div> tags in the HTML page*/
var all_btn = document.querySelector("#map-all-btn");
var fav_btn = document.querySelector("#map-fav-btn");
var his_btn = document.querySelector("#map-his-btn");
/*List of all the event listeners */
document.addEventListener("DOMContentLoaded",map_page_init);
all_btn.addEventListener("click",showAllHouse);
fav_btn.addEventListener("click",showFavHouse);
his_btn.addEventListener("click", showViewHouse);

// Initialize and add the map
let map;
const pos_list = [{ lat: 1.3125027012585204, lng: 103.79535446001437 }, 
                  { lat: 1.312084383000261, lng: 103.79430837402873 }, 
                  { lat: 1.3005358077027382, lng: 103.79901234507363 }, 
                  { lat: 1.305688243262237, lng: 103.78223607455757 }, 
                  { lat: 1.3007761602570163, lng: 103.84616037641358 }];
const pos_center = { lat: 1.3648480445323086, lng: 103.81261318608769};
const type_list = ['Condo', 'HDB', 'Landed'];
const bedroom = ['1', '2', '3', '4', '5', 'Studio'];
const decs_text = "This is a sample text. The house have 3 bedrooms and 2 bathrooms. You are allowed to cook in the kitchen but please do not eat in your bedroom. Please call me on the weekday from 9am to 10 pm!";
const img_src = ["https://www.investopedia.com/thmb/kZp7lYi4-3kV3w9EqVHoFjX3f3U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/buying-your-first-investment-property-top-10-tips.asp-ADD-Color-074cf6b2f8434f4fbc8d94edeb361cd6.jpg",
  "https://www.investopedia.com/thmb/kZp7lYi4-3kV3w9EqVHoFjX3f3U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/buying-your-first-investment-property-top-10-tips.asp-ADD-Color-074cf6b2f8434f4fbc8d94edeb361cd6.jpg"]

const normal_icon_url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
const like_icon_url = "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
const click_icon_url = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";

let like_list = [];
let view_list = [];
let house_list = [];
let marker_list = [];
let last_click_marker_idx = -1;
let list_status = 'none';

class House {
  constructor(id, pos, title, type, price, bedroom, floor, size, addr, num, decs){
      this.id = id;
      this.pos = pos;
      this.title = title;
      this.type = type;
      this.price = price;
      this.bedroom = bedroom;
      this.floor = floor;
      this.size = size;
      this.addr = addr;
      this.num = num;
      this.decs = decs;
  }
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createHouseList() {
  let i = 0;
  let h;
  while (i < pos_list.length) {
    h = new House(i, pos_list[i], "Condo Name/Addr "+String(i), type_list[i%type_list.length], randomInt(600, 3000), 
      bedroom[i%bedroom.length], randomInt(1, 24), randomInt(60, 200), "sample address sample address sample address", 
      randomInt(80000000, 99999999), decs_text);
    house_list.push(h);
    like_list.push(0);
    view_list.push(0);
    i++;
  }
}

function showFavHouse() {
  list_status = 'fav';
  let i = 0;
  while(i < marker_list.length) {
    if (like_list[i] == 0)
      marker_list[i].setVisible(false);
    else
      marker_list[i].setVisible(true);
    i++;
  }
  showHouseBriefInfo(true, false);
}

function showViewHouse() {
  list_status = 'view';
  let i = 0;
  while(i < marker_list.length) {
    if (view_list[i] == 0)
      marker_list[i].setVisible(false);
    else
      marker_list[i].setVisible(true);
    i++;
  }
  showHouseBriefInfo(false, true);
}

function showAllHouse() {
  list_status = 'all';
  let i = 0;
  while(i < marker_list.length) {
    marker_list[i].setVisible(true);
    i++;
  }
  showHouseBriefInfo();
}

function showHouseBriefInfo(like_bool = false, his_bool = false) {
  var houseDInfoBox = document.getElementById('house-detail-info');
  var houseBInfoBox = document.getElementById('house-brief-info');
  
  let result_num = 0;
  // clear the house infomation window before showing new info
  houseDInfoBox.style.display = "none";
  houseBInfoBox.style.display = "";
  houseBInfoBox.innerHTML = "";
  // create tables for each houses and show the info
  for (let idx in house_list) {
    // filter house list by like label or viewed label
    if (like_bool && like_list[idx] == 0)
     continue;
    else if (his_bool && view_list[idx] == 0)
      continue;
    // count number of houses
    result_num++;
    
    var brief_table = document.createElement("table");
    var linebreak = document.createElement("p");
    brief_table.setAttribute('class', 'brief-table');
    const brief_title = ["House Type", "Monthly Rent", "Bedrooms", "Level of Floor", "Size"];
    let brief_thead = brief_table.createTHead();
    let row = brief_thead.insertRow();
    let cell = row.insertCell();

    // show the images of the rental house
    let td_img = document.createElement("td");
    var house_img = document.createElement("img");
    house_img.src = img_src[0];
    // house_img.style.height = 150;
    house_img.style.width = '95%';
    td_img.appendChild(house_img);
    cell.appendChild(td_img);
    cell.rowSpan = brief_title.length + 2;

    // show rental house title
    let th_title = document.createElement("th");
    th_title.appendChild(document.createTextNode(house_list[idx].title));
    row = brief_thead.insertRow();
    cell = row.insertCell();
    cell.appendChild(th_title);
    cell.colSpan = 2;

    // show rental house info: title, type, price, bedroom, floor, size, addr, num, desc
    for (let title of brief_title) {
      row = brief_thead.insertRow();
      let th = document.createElement("td");
      let td = document.createElement("td");

      let text = document.createTextNode(title);
      th.appendChild(text);
      th.style.width = '20%';
      th.style.textAlign = "left";
      row.appendChild(th);

      switch(title) {
        case "House Type":
          text = document.createTextNode(house_list[idx].type);
          break;
        case "Monthly Rent":
          text = document.createTextNode(house_list[idx].price + " SGD");
          break;
        case "Bedrooms":
          text = document.createTextNode(house_list[idx].bedroom + " rooms");
          break;
        case "Level of Floor":
          text = document.createTextNode("#" + house_list[idx].floor);
          break;
        case "Size":
          text = document.createTextNode(house_list[idx].size + " square feets");
          break;
        default:
          text = document.createTextNode("");
          // code block
      }
      td.appendChild(text);
      td.style.width = '40%';
      row.appendChild(td);
    } 
    row = brief_thead.insertRow();
    cell = row.insertCell();
    cell.colSpan = 3;

    var line = document.createElement("hr");
    cell.appendChild(line);

    row = brief_thead.insertRow();
    cell = row.insertCell();
    cell.colSpan = 3;
    // like buttom
    var like_btn = document.createElement("button");
    like_btn.innerHTML = "Like";
    like_btn.addEventListener("click", function(){likeHouse(idx);}, false);
    like_btn.title = "Like"
    cell.appendChild(like_btn);
    // share buttom
    var share_btn = document.createElement("button");
    share_btn.innerHTML = "Share";
    share_btn.title = "Share"
    cell.appendChild(share_btn);
    // show in map buttom
    var show_map_btn = document.createElement("button");
    show_map_btn.innerHTML = "Show on Map";
    show_map_btn.title = "Show on Map"
    show_map_btn.addEventListener("click", function(){showHouse(idx);}, false);
    cell.appendChild(show_map_btn);
    // show detail info about the house buttom
    var show_detail_btn = document.createElement("button");
    show_detail_btn.innerHTML = "Show Detail Info";
    show_detail_btn.title = "Show Detail Information"
    show_detail_btn.addEventListener("click", function(){showHouseDetailInfo(idx);}, false);
    cell.appendChild(show_detail_btn);

    houseBInfoBox.appendChild(brief_table);
    houseBInfoBox.appendChild(linebreak);

    row = brief_thead.insertRow();
  }

  var result_text = document.createElement("h5");
  result_text.innerHTML = "There are " + String(result_num) + " results in the list";
  houseBInfoBox.appendChild(result_text);
  
}

function showHouseDetailInfo(idx) {
  view_list[idx] = 1;
  
  var houseBInfoBox = document.getElementById('house-brief-info');
  var houseDInfoBox = document.getElementById('house-detail-info');
  // clear the house infomation window before showing new info
  houseBInfoBox.style.display = "none";
  houseDInfoBox.style.display = "";
  houseDInfoBox.innerHTML = "";
  let i = 0;
  // show the images of the rental house
  while (i < img_src.length) {
    var house_img = document.createElement("img");
    house_img.src = img_src[i];
    houseDInfoBox.appendChild(house_img);
    if (i == 0) {
      // house_img.style.height = 200;
      house_img.style.width = '65%';
    } else {
      // house_img.style.height = 100;
      house_img.style.width = '32.5%';
    }
    i++;
  }
  
  let linebreak = document.createElement("p");
  houseDInfoBox.appendChild(linebreak);
  // like buttom
  var like_btn = document.createElement("button");
  like_btn.innerHTML = "Like";
  like_btn.addEventListener("click", function(){likeHouse(idx);}, false);
  houseDInfoBox.appendChild(like_btn);
  // share buttom
  var share_btn = document.createElement("button");
  share_btn.innerHTML = "Share";
  houseDInfoBox.appendChild(share_btn);
  // go back buttom (when click from house brief list it has a status, then go back button shows up)
  var go_back_btn = document.createElement("button");
  go_back_btn.innerHTML = "Go Back";
  houseDInfoBox.appendChild(go_back_btn);

  if (list_status == 'none')
    go_back_btn.style.display = "none";
  else
    go_back_btn.style.display = "";

  go_back_btn.addEventListener("click", function(){
    if (list_status == 'fav')
      showFavHouse();
    else if (list_status == 'view')
      showViewHouse();
    else if (list_status == 'all')
      showAllHouse();
  }, false);


  // show rental house info: type, price, bedroom, floor, size, addr, num, desc
  var brief_table = document.createElement("table");
  var detail_table = document.createElement("table");
  brief_table.setAttribute('class', 'detail-table');
  detail_table.setAttribute('class', 'detail-table');
  const brief_title = ["House Type", "Monthly Rent", "Bedroom Number", "Level of Floor", "Size", "Address", "Contact Number"];
  const detail_title = ["Detail Title 1", "Detail Title 2", "Detail Title 3"]

  let brief_thead = brief_table.createTHead();
  let row = brief_thead.insertRow();
  // show rental house title
  let th_title = document.createElement("th");
  th_title.appendChild(document.createTextNode(house_list[idx].title));
  th_title.style.fontSize = "20";

  row = brief_thead.insertRow();
  let cell = row.insertCell();
  cell.appendChild(th_title);
  cell.colSpan = 2;

  // rental house title end with a line seperator
  var line = document.createElement("hr");
  row = brief_thead.insertRow();
  cell = row.insertCell();
  cell.appendChild(line);
  cell.colSpan = 2;

  // show house brief description: type, price, bedroom, floor, size, addr, num
  for (let title of brief_title) {
    row = brief_thead.insertRow();
    let th = document.createElement("th");
    let td = document.createElement("td");

    // brief description title
    let text = document.createTextNode(title);
    th.appendChild(text);
    row.appendChild(th);
    th.style.width = '35%';
    th.style.textAlign = "left";

    // brief description value
    switch(title) {
      case "House Type":
        text = document.createTextNode(house_list[idx].type);
        break;
      case "Monthly Rent":
        text = document.createTextNode(house_list[idx].price + " SGD");
        break;
      case "Bedroom Number":
        text = document.createTextNode(house_list[idx].bedroom + " rooms");
        break;
      case "Level of Floor":
        text = document.createTextNode("#" + house_list[idx].floor);
        break;
      case "Size":
        text = document.createTextNode(house_list[idx].size + " square feets");
        break;
      case "Address":
        text = document.createTextNode(house_list[idx].addr);
        break;
      case "Contact Number":
        text = document.createTextNode("+65 " + house_list[idx].num);
        break;
      default:
        // code block
    }
    td.appendChild(text);
    row.appendChild(td);
    td.style.width = '60%';
  } 
  houseDInfoBox.appendChild(brief_table);

  // show house detail information in paragraph
  let detail_thead = detail_table.createTHead();
  for (let title of detail_title) {
    let row = detail_thead.insertRow();
    let th = document.createElement("th");
    let td = document.createElement("td");

    // paragraph title
    let text = document.createTextNode(title);
    th.appendChild(text);
    row.appendChild(th);
    th.style.width = '40%';
    th.style.textAlign = "left";

    // paragrap title end with a line seperator
    row = detail_thead.insertRow();
    var line = document.createElement("hr");
    row.appendChild(line);

    // paragrap content
    row = detail_thead.insertRow();
    text = document.createTextNode(house_list[idx].decs);
    td.appendChild(text);
    row.appendChild(td);

    // paragrap content end with a line seperator
    row = detail_thead.insertRow();
    var line = document.createElement("hr");
    row.appendChild(line);

  } 
  houseDInfoBox.appendChild(detail_table);
  
}

// click event for the like buttom
function likeHouse(idx) {
  // set the property to viewed status
  view_list[idx] = 1;
  // if the properties is liked before, status change to "not like"
  if (like_list[idx] == 1) {
    like_list[idx] = 0;
    marker_list[idx].setIcon(normal_icon_url);
  }
  // if the properties is never liked before, status change to "like"
  else {
    like_list[idx] = 1;
    marker_list[idx].setIcon(like_icon_url);
  }
}

// click event for show on map buttom and marker
function showHouse(idx) {
  // set the property to viewed status
  view_list[idx] = 1;
  // zoom in and center to the property
  map.setZoom(15);
  map.setCenter(marker_list[idx].getPosition());
  // map marker change icon (clicked marker: change status/ last clicked marker: reverse status)
  if (last_click_marker_idx != -1) {
    if (like_list[last_click_marker_idx])
      marker_list[last_click_marker_idx].setIcon(like_icon_url);
    else
      marker_list[last_click_marker_idx].setIcon(normal_icon_url)
  }
  marker_list[idx].setIcon(click_icon_url);
  last_click_marker_idx = idx;
}

async function initMap() {
  createHouseList();
  const { Map } = await google.maps.importLibrary("maps");
  // const { PinElement, Marker } = await google.maps.importLibrary("marker");

  // The map, centered at the center of Singapore
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: pos_center,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at all the rental house
  let i = 0;
  while (i < house_list.length) {
    var marker = createMarker(map, house_list[i].pos, house_list, i);
    marker_list.push(marker);
    i++;
  }
}

function createMarker(map, pos, house, idx) {
  // use different icon color to distinguish the normal properties and the user favorite one
  var icon_url;
  if (like_list[idx])
    icon_url = like_icon_url;
  else
    icon_url = normal_icon_url;

  // create a new marker
  var marker = new google.maps.Marker({       
      position: pos, 
      map: map,  // google.maps.Map 
      id: idx,
      title: house[idx].title,
      icon: {
        url: icon_url,
      }
  });
  // when user click the market, show rental house detail info in the ledf window
  google.maps.event.addListener(marker, 'click', function() { 
    list_status = 'none';
    showHouseDetailInfo(marker.id);
    showHouse(marker.id);
  }); 
  // when the mouse in on the marker, show the basic info of the property
  let infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'mouseover', function () {
    infowindow.open(map, marker);
    infowindow.setContent("<div class='infowindow-container'><div class='inner'><h4>" + house[idx].title +
    "</h4>House Type: " + house[idx].type + "</br>Bedroom Number: " + house[idx].bedroom + "</br>Monthly Rent: " + house[idx].price + " SGD</div></div>");
    
  });
  // when the mouse if off the marker, close the basic info box
  marker.addListener("mouseout", function() {
    infowindow.close();
  });

  return marker;  
}

function map_page_init() {
  initMap();
  showAllHouse();
}