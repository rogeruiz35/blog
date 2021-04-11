import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  content: string;
  image: string;
  title: string;

  buttonText: string = 'Crea un Post';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit(): void { }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    };

    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.image = null;

    this.buttonText = 'Post Creado !';
    setTimeout(() => this.buttonText = 'Crea un Post', 500);
    this.router.navigate(["/blog"]);
  }

  uploadImage(event) {
    let file = event.target.files[0];
    var storageRef = this.storage.ref('posts/' + file.name);
    let uploadTask = storageRef.put(file);

    uploadTask.task.on('state_changed', () => {
      uploadTask.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.image = downloadURL;
        this.uploadPercent = uploadTask.percentageChanges();
      });
    });
  }
}
