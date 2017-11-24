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
        lat: -6.260878,
        lng: 106.781444
      },
      currentLocation :'',
      markers: []
    },
    methods: {
      deleteImages(id){
        axios.delete(`http://localhost:3000/${id}`)
        .then(res=>{
          console.log('HASIL HAPUS',res);
          location.reload();
        })
        .catch(err=>{
          console.log(err);
        })
      },
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
      axios.get('http://localhost:3000/')
      .then(response => {
        response.data.map( image =>{
          this.markers.push({
            position : {
              lat : image.latitude,
              lng : image.longitude
            }
          })
        })
        this.images.push(...response.data)
      })
      .catch(err=>{
        console.log(err);
      })
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
      Vue.$gmapDefaultResizeBus.$emit('resize');
    }
  })
