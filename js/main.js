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

  function loadInfoBoxes() {
    fetch('https://swiftpixel.com/earbud/api/infoboxes')
      .then(response => response.json())
      .then(hotspots => {
        console.log(hotspots);

        let ul = document.createElement("ul");

        hotspots.results.forEach(result => {

          
          const h2 = document.createElement("h2");
          

          const img  = document.createElement("img");
          img.src = result.picture.thumbnail;

          const p  = document.createElement("p");
         

          li.appendChild(p);
          li.appendChild(img);
          li.appendChild(h2);
          ul.appendChild(li);
      });
      })
      .catch(error => console.error(error));
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
