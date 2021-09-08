import { Component, HostBinding, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/Photo';
import { PhotoService } from '../../services/photo.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  @HostBinding('class') classes = 'row'

  photo: Photo = {
    id: '',
    title: '',
    description: '',
    image: '',
    created_at: ''
  }

  update: boolean = false;

  constructor(private photoService: PhotoService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params; // aqui va el id
    const idPhoto = params.id; // params['id']
    if(idPhoto) {
      this.photoService.getPhoto(idPhoto)
        .subscribe((res: any) => {
          this.photo = res;
          console.log(this.photo)
          this.update = true;
        }, err => console.log(err))
    }
  }

  createPhoto() {
    delete this.photo.created_at;

    if(this.photo.title == '' || this.photo.image == ''){
      Swal.fire('El campo titulo o imagen es obligatorio');
    }
    else{
      this.photoService.createPhoto(this.photo)
      .subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res['message'],
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/photo']);
      }, err => console.log(err))
    }
  }

  updatePhoto() {
    delete this.photo.created_at;
    this.photoService.updatePhoto(this.photo.id, this.photo)
      .subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res['message'],
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/photo']);
    })
  }

}
