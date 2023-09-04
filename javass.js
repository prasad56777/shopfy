// JavaScript code for image sliding using jQuery
$(document).ready(function() {
    const $slider = $('.slider');
    const $images = $('.slider img');
    const imageWidth = $images.first().width(); // Assuming all images have the same width
    let currentIndex = 0;
    let slideInterval;

    // Function to transition to the next slide
    function nextSlide() {
        currentIndex++;
        if (currentIndex === $images.length) {
            currentIndex = 0;
        }
        updateSlider();
    }

    // Function to update the slider position
    function updateSlider() {
        const newPosition = -currentIndex * imageWidth;
        $slider.css('transform', `translateX(${newPosition}px)`);
    }

    // Set an interval to automatically transition the slides (every 3 seconds in this example)
    slideInterval = setInterval(nextSlide, 3000);

    // Optionally, you can pause the slideshow on hover and resume on mouseout
    $slider.on('mouseenter', function() {
        clearInterval(slideInterval);
    });

    $slider.on('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 3000);
    });
});
// sc
// Function to make an API call and retrieve product data
async function fetchProducts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

// Function to render a product card
function renderCard(product) {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const productImageElement = document.createElement("img");
    productImageElement.className = "product-image";
    productImageElement.src = product.preview;
    productCard.appendChild(productImageElement);

    const productDetails = document.createElement("div");
    productDetails.className = "product-details";

    const productNameElement = document.createElement("h3");
    productNameElement.className = "product-name";
    productNameElement.innerText = product.name;

    const productBrandElement = document.createElement("h4");
    productBrandElement.className = "product-brand";
    productBrandElement.innerText = product.brand;

    const productPriceElement = document.createElement("h5");
    productPriceElement.className = "product-price";
    productPriceElement.innerText = "Rs " + product.price;

    productDetails.append(productNameElement, productBrandElement, productPriceElement);
    productCard.appendChild(productDetails);

    return productCard;
}

// Function to populate product sections based on type (clothing or accessory)
function populateProductSections(products) {
    const clothingSection = document.getElementById("clothing-section");
    const accessorySection = document.getElementById("accessory-section");

    for (var i = 0; i < products.length; i++) {
        const product = products[i];
        const productCard = renderCard(product);

        if (product.isAccessory) {
            accessorySection.appendChild(productCard);
        } else {
            clothingSection.appendChild(productCard);
        }
    }
}

// Make the API call and render the products
const apiUrl = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product';
fetchProducts(apiUrl)
    .then((products) => {
        populateProductSections(products);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
// Function to make an API call and fetch product data
function fetchProductData() {
    // Replace the URL with the actual API endpoint
    const apiUrl = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/1";
  
    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update productData with the fetched data
        productData = data;
  
        // Update product image and thumbnails based on the new data
        updateProductImages();
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }
  
  // Function to update product images and thumbnails
  // Function to update product images and thumbnails
function updateProductImages() {
    var productImageElement = document.getElementsByClassName("previewImg")[0];
  
    // Clear existing images and thumbnails
    productImageElement.innerHTML = "";
  
    // Update product main image
    var productImage = document.getElementById("productImg");
    productImage.src = productData.preview;
  
    // Create and add thumbnails
    productData.photos.forEach(function (photo, index) {
      var smallImg = document.createElement("img");
      smallImg.id = "img" + index;
      smallImg.src = photo;
      if (index === 0) {
        smallImg.classList.add("active");
      }
  
      // Add click event listener to each thumbnail
      smallImg.onclick = function () {
        addActiveClass(index);
      };
  
      productImageElement.appendChild(smallImg);
    });
  }
  
  
  
  // Function to handle image clicks and update the active image
  function addActiveClass(num) {
    var previosActiveImage = document.getElementsByClassName("active")[0];
    previosActiveImage.classList.remove("active");
    var activeCard = document.getElementById("img" + num);
    activeCard.classList.add("active");
    var productImageElement = document.getElementById("productImg");
    productImageElement.src = productData.photos[num];
  }
  
  // Initial fetch of product data
  fetchProductData();
  
  