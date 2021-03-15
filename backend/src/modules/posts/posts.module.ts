import { postsProviders } from './posts.providers';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PostsResolver, PostsService, ...postsProviders],
})
export class PostsModule {}
