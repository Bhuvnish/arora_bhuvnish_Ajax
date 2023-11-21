(() => {

  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

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
      .catch(error => console.error(error));
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









