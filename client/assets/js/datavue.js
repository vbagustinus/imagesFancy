Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDlgXFEsBMaSg4UFREFTytZ1HPuZW1P-8Y',
  },
  // Demonstrating how we can customize the name of the components
  installComponents: false,
});

  Vue.component('google-map', VueGoogleMaps.Map);
  Vue.component('google-marker', VueGoogleMaps.Marker);

  new Vue(
  {
    el: '#images',
    data: {
      images: [],
      image: '',
      resultUpload: null,
      closeModal: null,
      name: '',
      imageName: '',
      currentLocation : '',
      center: {
        lat: 10.0,
        lng: 10.0
      },
      currentLocation :'',
      markers: []
    },
    methods: {
      onFileChange(e) {
        // alert(JSON.stringify(e))
      console.log(e.target.files)
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }
      this.resultUpload = files[0]
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      // reader.readAsDataURL(file);
      reader.readAsDataURL(this.resultUpload);
      // this.createImage(files[0]);
      },
      createImage(file) {
        let data = new FormData();
        data.append('name', this.name);
        data.append('image', this.resultUpload);
        data.append('latitude', this.currentLocation.latitude);
        data.append('longitude', this.currentLocation.longitude);
        axios.post('http://localhost:3000/upload', data)
        .then((res)=> {
          console.log('HASIL KIRIM',res);
          location.reload();
        })
        .catch((err) =>{
          console.log(err);
        });
      },
      removeImage(){
        this.image = '';
        this.name = '',
        this.currentLocation = ''
      }
    },
    created () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
      axios.get('http://localhost:3000/')
      .then(response => {
        console.log(response.data);
        response.data.map( image =>{
          this.markers.push({
            position : {
              lat : image.latitude,
              lng : image.longitude
            },
            icon : {
        			url: image.url,
              origin: new google.maps.Point(96, 0),
			        size: new google.maps.Size(96, 96), 
        			scaledSize: new google.maps.Size(96, 96)
        		}
          })
        })
        this.images.push(...response.data)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  })
