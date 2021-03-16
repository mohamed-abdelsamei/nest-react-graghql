import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from '../users/entities/user.entity';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Mutation('createPost')
  @UseGuards(GqlAuthGuard)
  async create(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    let post = await this.postsService.create(createPostInput, user.id);
    return await this.postsService.findOne(post.id);

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
  @UseGuards(GqlAuthGuard)
  async update(
    @CurrentUser() user: User,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const post = await this.postsService.update(
      updatePostInput.id,
      updatePostInput,
      user.id,
    );
    if (!post) throw new NotFoundException("This Post doesn't exist");
    return post;
  }

  @Mutation('removePost')
  async remove(@Args('id') id: number) {
    return this.postsService.remove(id);
  }
}
