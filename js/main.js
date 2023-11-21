(() => {

  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

// spiner code goes here

// creating function
  document.addEventListener("DOMContentLoaded", function () {
    const spinnerContainer = document.getElementById("spinner-container");
  // svg code for spinner
    const spinner = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style="background: none; display: block; shape-rendering: auto; width: 40px; height: 40px; margin: 8px auto;"
  >
    <circle cx="50" cy="50" fill="none" stroke="#3f3f3f" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;0.4;0.8;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;0 50 50;360 50 50;360 50 50"
      ></animateTransform>
    </circle>
  </svg>
  `;
  
    spinnerContainer.innerHTML = spinner;
  //targating spinner on load
    window.addEventListener("load", function () {
      


      // by this spinner will be removed 
      spinnerContainer.innerHTML = "";
    });
  });
  





  

  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }
// fetch api for hotspots
  function fetchInfoBoxes() {
    
    return fetch("https://swiftpixel.com/earbud/api/infoboxes")//promise
        .then(response => response.json())
        .catch(error => {
            console.error('Fetch error:', error);
            return [];

        });

        
}
// imformation for infoboxex or hotspots when hover target over here
// image h and p tag target
function loadInfoBoxes() {
    return fetchInfoBoxes().then(infoBoxes => {
        infoBoxes.forEach((box, index) => {
            const hotspot = document.getElementById(`hotspot-${index + 1}`);

            if (hotspot) {
                hotspot.innerHTML = `
                    <h3>${box.heading}</h3>
                    <p>${box.description}</p>
                    <img src="images/${box.thumbnail}" alt="${box.heading} Image"> 
                    
                    
                `;
                
            }
        });
        
    });
}

  // function getData() {


  //   fetch("https://swiftpixel.com/earbud/api/infoboxes")
  //   .then(response => response.json())
  //   .then(info => {
  //     console.log(info);

  //     let ul = document.createElement("ul");

  //     info.results.forEach(result => {

  //       const li = document.createElement("li");













// mterial api target


  function loadMaterialInfo() {
    fetch('https://swiftpixel.com/earbud/api/materials')
      .then(response => response.json())
      .then(materialListData => {
        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch(error => console.error(error));//catch and report any errors
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  loadInfoBoxes();
  loadMaterialInfo();

})();









