import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor(
    private postService: PostService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  delete(id: string) {
    this.postService.delete(id);
  }

}
