Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDlgXFEsBMaSg4UFREFTytZ1HPuZW1P-8Y',

  },
  // Demonstrating how we can customize the name of the components
  installComponents: false,
});




document.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el:".search",
    data : {
      place : 'Singapore',
      latLng : {},
    },
    methods: {
      searchLocation: function() {
       var geocoder = new google.maps.Geocoder();
       geocoder.geocode({'address': this.searchAddressInput}, (results, status) => {
         if (status === 'OK') {
           this.currentLocation.lat = results[0].geometry.location.lat();
           this.currentLocation.lng = results[0].geometry.location.lng();
         }
       });
     }
   }
  })
})
