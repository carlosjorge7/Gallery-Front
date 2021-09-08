import { Component, HostBinding, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import Swal from 'sweetalert2';
import { Photo } from '../../models/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  photos: Photo[] = [];

 

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.getPhotos()
  }

  getPhotos() {
    this.photoService.getPhotos()
      .subscribe(res => {
        this.photos = res;
    }, err => console.log(err))
  }

  
  deletePhoto(id: string) {
    Swal.fire({
      title: '¿eliminar esta foto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.photoService.deletePhoto(id)
            .subscribe((res: any) => {
              console.log(res)
              Swal.fire(
                'Borrado!',
                res['message'],
                'success'
              );
              this.getPhotos();
          })
        }
    });
    
  }

  update(id: string) {
    console.log(id)
  }


}
