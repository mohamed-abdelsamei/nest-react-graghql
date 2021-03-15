import { POST_REPOSITORY } from '../../core/constants';
import { Post } from './entities/post.entity';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
