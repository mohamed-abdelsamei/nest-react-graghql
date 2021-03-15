import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NotFoundException } from '@nestjs/common';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('createPost')
  create(@Args('createPostInput') createPostInput: CreatePostInput) {
    console.log(createPostInput);
    return this.postsService.create(createPostInput);
  }

  @Query('posts')
  findAll() {
    return this.postsService.findAll();
  }

  @Query('post')
  findOne(@Args('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation('updatePost')
  async update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    const post = await this.postsService.update(
      updatePostInput.id,
      updatePostInput,
    );
    if (!post) throw new NotFoundException("This Post doesn't exist");
    return post;
  }

  @Mutation('removePost')
  async remove(@Args('id') id: number) {
    return this.postsService.remove(id);
  }
}
