import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/constants';
import { User } from '../users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) { }
  async create(
    createPostInput: CreatePostInput,
    userId: number,
  ): Promise<Post> {
   return await this.postRepository.create<Post>({
      ...createPostInput,
      userId,
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne<Post>({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
  }

  async update(id: number, updatePostInput: UpdatePostInput, userId: number) {
    const post: Post = await this.postRepository.findOne<Post>({
      where: { id, userId },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
    if (!post) return null;
    Object.assign(post, updatePostInput);
    await post.save();
    return post;
  }

  async remove(id: number) {
    const post: Post = await this.postRepository.findOne<Post>({
      where: { id },
    });
    if (!post) return null;
    await post.destroy();
    return post;
  }
}
