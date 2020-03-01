import { GraphQLResolveInfo } from 'graphql';
import { IContext } from 'graphqls/context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Category = {
   __typename?: 'Category',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Comment = {
   __typename?: 'Comment',
  createdAt?: Maybe<Scalars['String']>,
  description: Scalars['String'],
  id: Scalars['ID'],
  postId?: Maybe<Scalars['Int']>,
  user?: Maybe<User>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createCategory: Category,
  createComment: Comment,
  createLiked: Scalars['Int'],
  createPost: Post,
  createRecomment: Comment,
  createToken: User,
  deleteCategory: Scalars['Boolean'],
  deleteComment: Scalars['Boolean'],
  deleteLiked: Scalars['Int'],
  deletePost: Scalars['Boolean'],
  login: User,
  logout: User,
  signUpWithLocal: User,
  updateCategory: Scalars['Boolean'],
  updateComment: Scalars['Boolean'],
  updatePost: Scalars['Boolean'],
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']
};


export type MutationCreateCommentArgs = {
  postId: Scalars['ID'],
  description: Scalars['String']
};


export type MutationCreateLikedArgs = {
  postId: Scalars['ID']
};


export type MutationCreatePostArgs = {
  title: Scalars['String'],
  description: Scalars['String'],
  tags: Scalars['String'],
  categoryId?: Maybe<Scalars['ID']>
};


export type MutationCreateRecommentArgs = {
  postId: Scalars['ID'],
  commentId: Scalars['ID'],
  description: Scalars['String']
};


export type MutationCreateTokenArgs = {
  userId: Scalars['String'],
  password: Scalars['String']
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']
};


export type MutationDeleteLikedArgs = {
  postId: Scalars['ID']
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};


export type MutationLoginArgs = {
  userId: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignUpWithLocalArgs = {
  userId: Scalars['String'],
  password: Scalars['String'],
  nickname: Scalars['String'],
  grant: User_Grant_Enum
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'],
  name: Scalars['String']
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['ID'],
  description: Scalars['String']
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  title: Scalars['String'],
  description: Scalars['String'],
  tags?: Maybe<Scalars['String']>,
  categoryId?: Maybe<Scalars['ID']>
};

export type Post = {
   __typename?: 'Post',
  category: Category,
  createdAt: Scalars['String'],
  description: Scalars['String'],
  id: Scalars['ID'],
  liker: Array<User>,
  tags: Array<Maybe<Tag>>,
  title: Scalars['String'],
  user: User,
};

export type Query = {
   __typename?: 'Query',
  categorys: Array<Category>,
  comments: Array<Comment>,
  post?: Maybe<Post>,
  posts: Array<Post>,
  user: User,
};


export type QueryCommentsArgs = {
  id: Scalars['ID']
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>,
  afterCursor?: Maybe<Scalars['Int']>,
  ord?: Maybe<Scalars['String']>,
  category_id?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  comments: Array<Comment>,
  grant: Scalars['Int'],
  id: Scalars['ID'],
  nickname: Scalars['String'],
  posts: Array<Post>,
  token: Scalars['String'],
  userId: Scalars['String'],
};

export enum User_Grant_Enum {
  Admin = 'ADMIN',
  Guest = 'GUEST'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Category: ResolverTypeWrapper<Category>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Comment: ResolverTypeWrapper<Comment>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  User: ResolverTypeWrapper<User>,
  Post: ResolverTypeWrapper<Post>,
  Tag: ResolverTypeWrapper<Tag>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  USER_GRANT_ENUM: User_Grant_Enum,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Category: Category,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Comment: Comment,
  Int: Scalars['Int'],
  User: User,
  Post: Post,
  Tag: Tag,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  USER_GRANT_ENUM: User_Grant_Enum,
};

export type CategoryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CommentResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  postId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>,
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'postId' | 'description'>>,
  createLiked?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateLikedArgs, 'postId'>>,
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'title' | 'description' | 'tags'>>,
  createRecomment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateRecommentArgs, 'postId' | 'commentId' | 'description'>>,
  createToken?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateTokenArgs, 'userId' | 'password'>>,
  deleteCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>,
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'commentId'>>,
  deleteLiked?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteLikedArgs, 'postId'>>,
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>,
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'userId' | 'password'>>,
  logout?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  signUpWithLocal?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpWithLocalArgs, 'userId' | 'password' | 'nickname' | 'grant'>>,
  updateCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id' | 'name'>>,
  updateComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'commentId' | 'description'>>,
  updatePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'title' | 'description'>>,
};

export type PostResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  liker?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categorys?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'id'>>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, QueryPostsArgs>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
};

export type TagResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>,
  grant?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = IContext> = {
  Category?: CategoryResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = IContext> = Resolvers<ContextType>;
