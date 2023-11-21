(() => {

  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");




  document.addEventListener("DOMContentLoaded", function () {
    const spinnerContainer = document.getElementById("spinner-container");
  
    const spinner = `<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <path fill="#333" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      dur="1s"
      from="0 50 50"
      to="360 50 50"
      repeatCount="indefinite" />
      </path>
      </svg>`;
  
    spinnerContainer.innerHTML = spinner;
  
    window.addEventListener("load", function () {
      // Remove the spinner once the page has fully loaded
      spinnerContainer.innerHTML = "";
    });
  });
  





  

  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function fetchInfoBoxes() {
    
    return fetch("https://swiftpixel.com/earbud/api/infoboxes")
        .then(response => response.json())
        .catch(error => {
            console.error('Fetch error:', error);
            return [];

        });

        
}

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

  //       const h3 = document.createElement("h3");
  //       h3.textContent = `${result.name.first} ${result.name.last}`;

  //       const img  = document.createElement("img");
  //       img.src = result.picture.thumbnail;

  //       const p  = document.createElement("p");
  //       p.textContent = result.email;

  //       li.appendChild(p);
  //       li.appendChild(img);
  //       li.appendChild(h3);
  //       ul.appendChild(li);
  //   });
  //   material-template.appendChild(ul);   

  //   })
  //   .catch(error => console.error(error)); //catch and report any errors
  // }

  // getData();















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









