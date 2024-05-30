export type InputField = {
  name?: string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  isError?: boolean;
  error?: string;
  type?: string;
};

export type FInputField = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler;
  onBlur: React.FocusEventHandler;
  isError: boolean;
  error?: string;
  type?: string;
};

export type CheckField = {
  name?: any;
  label?: string;
  value?: string;
  id?: string;
  onChange?: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  isError?: boolean;
  error?: string;
  type?: string;
  description?: string;
  isIn?: boolean;
};

export type ErrorMsgType = {
  $hasError: boolean | "" | undefined;
  $maxWidth?: string;
};

export type User = {
  fullName: string;
  email: string;
  _id: string;
};

export type CrmUser = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
};

export type PaginatedResult<T> = {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type SocialMediaLinks = {
  name: string;
  link: string;
  _id: string;
};

export type Author = {
  avatar: string;
  description: string;
  email: string;
  fullName: string;
  isVerified: boolean;
  createdAt: string;
  userName: string;
  socialMediaLinks?: SocialMediaLinks[];
};

export type BranchingTags = {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
};

export type Comments = {
  createdAt: string;
  from: string;
  message: string;
  post: string;
  replies: Comments[];
  updatedAt: string;
  _id: string;
};

export type Links = {
  link: string;
  name: string;
  _id: string;
};

export type Sections = {
  image: string;
  text: string;
  _id: string;
};

export type SymbolTags = {
  createdAt: string;
  name: string;
  updatedAt: string;
  _id: string;
};

export type UserPost = {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  branchingTags: BranchingTags[];
  symbolTags?: SymbolTags[];
  author?: Author;
  comments?: Comments[];
  links?: Links[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RolesQuery = {
  roles: RoleResults<string>[];
};

export type RoleResults<T> = {
  _id: string;
  name: string;
  permissions: T[];
  createdAt: string;
  updatedAt: string;
};
